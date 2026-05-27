-- ObraDoMestre - Complete Database Schema
-- Execute this SQL in your Supabase project

-- ============================================================================
-- 1. PROFILES TABLE (extends auth.users)
-- ============================================================================

CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT UNIQUE,
  subscription_status TEXT DEFAULT 'trialing', -- 'trialing', 'active', 'past_due', 'canceled'
  subscription_plan TEXT, -- 'pro', 'enterprise'
  trial_ends_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS for profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Trigger to auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, trial_ends_at)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NOW() + INTERVAL '14 days'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();


-- ============================================================================
-- 2. COMPANIES TABLE (Multi-tenant)
-- ============================================================================

CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  cnpj TEXT UNIQUE,
  phone TEXT,
  email TEXT,
  address TEXT,
  logo_url TEXT,
  website TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE companies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view companies they own or are members of"
  ON companies FOR SELECT
  USING (
    owner_id = auth.uid() OR
    id IN (
      SELECT company_id FROM company_members WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Owners can update their companies"
  ON companies FOR UPDATE
  USING (owner_id = auth.uid());

CREATE POLICY "Users can create companies"
  ON companies FOR INSERT
  WITH CHECK (owner_id = auth.uid());


-- ============================================================================
-- 3. COMPANY MEMBERS TABLE (Permissions)
-- ============================================================================

CREATE TABLE company_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'member', -- 'owner', 'admin', 'member'
  invited_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  joined_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(company_id, user_id)
);

ALTER TABLE company_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members can view members of their companies"
  ON company_members FOR SELECT
  USING (
    company_id IN (
      SELECT id FROM companies WHERE owner_id = auth.uid()
    ) OR
    user_id = auth.uid()
  );

CREATE POLICY "Company owners can manage members"
  ON company_members FOR ALL
  USING (
    company_id IN (
      SELECT id FROM companies WHERE owner_id = auth.uid()
    )
  );


-- ============================================================================
-- 4. OBRAS TABLE (Projects/Constructions)
-- ============================================================================

CREATE TABLE obras (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  address TEXT,
  status TEXT DEFAULT 'planejamento', -- 'planejamento', 'em_andamento', 'pausada', 'concluida', 'cancelada'
  start_date DATE,
  end_date DATE,
  client_name TEXT,
  client_phone TEXT,
  client_email TEXT,
  budget_estimated DECIMAL(12,2),
  budget_actual DECIMAL(12,2) DEFAULT 0,
  description TEXT,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE obras ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view obras from their companies"
  ON obras FOR SELECT
  USING (
    company_id IN (
      SELECT id FROM companies
      WHERE owner_id = auth.uid()
         OR id IN (SELECT company_id FROM company_members WHERE user_id = auth.uid())
    )
  );

CREATE POLICY "Users can create obras in their companies"
  ON obras FOR INSERT
  WITH CHECK (
    company_id IN (
      SELECT id FROM companies
      WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can update obras in their companies"
  ON obras FOR UPDATE
  USING (
    company_id IN (
      SELECT id FROM companies
      WHERE owner_id = auth.uid()
    )
  );


-- ============================================================================
-- 5. FUNCIONÁRIOS TABLE (Employees)
-- ============================================================================

CREATE TABLE funcionarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  cpf TEXT UNIQUE,
  phone TEXT,
  email TEXT,
  role TEXT, -- 'pedreiro', 'eletricista', 'encanador', etc
  salary DECIMAL(10,2),
  hire_date DATE,
  status TEXT DEFAULT 'ativo', -- 'ativo', 'inativo', 'ferias'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE funcionarios ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view funcionarios from their companies"
  ON funcionarios FOR SELECT
  USING (
    company_id IN (
      SELECT id FROM companies
      WHERE owner_id = auth.uid()
         OR id IN (SELECT company_id FROM company_members WHERE user_id = auth.uid())
    )
  );

CREATE POLICY "Users can manage funcionarios in their companies"
  ON funcionarios FOR ALL
  USING (
    company_id IN (
      SELECT id FROM companies WHERE owner_id = auth.uid()
    )
  );


-- ============================================================================
-- 6. OBRA_FUNCIONÁRIOS TABLE (Employee-Project Allocation)
-- ============================================================================

CREATE TABLE obra_funcionarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  obra_id UUID NOT NULL REFERENCES obras(id) ON DELETE CASCADE,
  funcionario_id UUID NOT NULL REFERENCES funcionarios(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE,
  daily_rate DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(obra_id, funcionario_id)
);

ALTER TABLE obra_funcionarios ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view work allocations from their companies"
  ON obra_funcionarios FOR SELECT
  USING (
    obra_id IN (
      SELECT id FROM obras WHERE company_id IN (
        SELECT id FROM companies
        WHERE owner_id = auth.uid()
           OR id IN (SELECT company_id FROM company_members WHERE user_id = auth.uid())
      )
    )
  );

CREATE POLICY "Users can manage work allocations in their companies"
  ON obra_funcionarios FOR ALL
  USING (
    obra_id IN (
      SELECT id FROM obras WHERE company_id IN (
        SELECT id FROM companies WHERE owner_id = auth.uid()
      )
    )
  );


-- ============================================================================
-- 7. MATERIAIS TABLE (Material Catalog)
-- ============================================================================

CREATE TABLE materiais (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  unit TEXT, -- 'm²', 'kg', 'un', 'l', etc
  category TEXT, -- 'cimento', 'tijolos', 'concreto', etc
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(company_id, name)
);

ALTER TABLE materiais ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view materiais from their companies"
  ON materiais FOR SELECT
  USING (
    company_id IN (
      SELECT id FROM companies
      WHERE owner_id = auth.uid()
         OR id IN (SELECT company_id FROM company_members WHERE user_id = auth.uid())
    )
  );

CREATE POLICY "Users can manage materiais in their companies"
  ON materiais FOR ALL
  USING (
    company_id IN (
      SELECT id FROM companies WHERE owner_id = auth.uid()
    )
  );


-- ============================================================================
-- 8. OBRA_MATERIAIS TABLE (Materials Used in Projects)
-- ============================================================================

CREATE TABLE obra_materiais (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  obra_id UUID NOT NULL REFERENCES obras(id) ON DELETE CASCADE,
  material_id UUID NOT NULL REFERENCES materiais(id) ON DELETE CASCADE,
  quantity DECIMAL(10,2) NOT NULL,
  unit_cost DECIMAL(10,2) NOT NULL,
  total_cost DECIMAL(12,2) GENERATED ALWAYS AS (quantity * unit_cost) STORED,
  supplier TEXT,
  purchase_date DATE,
  status TEXT DEFAULT 'solicitado', -- 'solicitado', 'comprado', 'entregue'
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE obra_materiais ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view obra_materiais from their companies"
  ON obra_materiais FOR SELECT
  USING (
    obra_id IN (
      SELECT id FROM obras WHERE company_id IN (
        SELECT id FROM companies
        WHERE owner_id = auth.uid()
           OR id IN (SELECT company_id FROM company_members WHERE user_id = auth.uid())
      )
    )
  );

CREATE POLICY "Users can manage obra_materiais in their companies"
  ON obra_materiais FOR ALL
  USING (
    obra_id IN (
      SELECT id FROM obras WHERE company_id IN (
        SELECT id FROM companies WHERE owner_id = auth.uid()
      )
    )
  );


-- ============================================================================
-- 9. TRANSAÇÕES TABLE (Financial Transactions)
-- ============================================================================

CREATE TABLE transacoes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  obra_id UUID REFERENCES obras(id) ON DELETE SET NULL,
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  type TEXT NOT NULL, -- 'receita', 'despesa'
  category TEXT, -- 'mao_de_obra', 'materiais', 'aluguel', 'cliente_pagamento', etc
  description TEXT NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  status TEXT DEFAULT 'pendente', -- 'pendente', 'pago', 'cancelado'
  payment_method TEXT, -- 'dinheiro', 'cheque', 'transferencia', 'cartao'
  notes TEXT,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE transacoes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view transacoes from their companies"
  ON transacoes FOR SELECT
  USING (
    company_id IN (
      SELECT id FROM companies
      WHERE owner_id = auth.uid()
         OR id IN (SELECT company_id FROM company_members WHERE user_id = auth.uid())
    )
  );

CREATE POLICY "Users can manage transacoes in their companies"
  ON transacoes FOR ALL
  USING (
    company_id IN (
      SELECT id FROM companies WHERE owner_id = auth.uid()
    )
  );


-- ============================================================================
-- 10. TRIGGERS & FUNCTIONS (Auto-calculations)
-- ============================================================================

-- Function to update obra's budget_actual when transacoes change
CREATE OR REPLACE FUNCTION update_obra_budget_actual()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
    UPDATE obras
    SET budget_actual = COALESCE((
      SELECT SUM(CASE WHEN type = 'despesa' THEN amount ELSE -amount END)
      FROM transacoes
      WHERE obra_id = COALESCE(NEW.obra_id, OLD.obra_id)
    ), 0)
    WHERE id = COALESCE(NEW.obra_id, OLD.obra_id);
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE obras
    SET budget_actual = COALESCE((
      SELECT SUM(CASE WHEN type = 'despesa' THEN amount ELSE -amount END)
      FROM transacoes
      WHERE obra_id = OLD.obra_id
    ), 0)
    WHERE id = OLD.obra_id;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_update_obra_budget_actual
AFTER INSERT OR UPDATE OR DELETE ON transacoes
FOR EACH ROW
EXECUTE FUNCTION update_obra_budget_actual();

-- Function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply update_updated_at trigger to tables
CREATE TRIGGER trg_profiles_updated_at BEFORE UPDATE ON profiles
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_companies_updated_at BEFORE UPDATE ON companies
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_obras_updated_at BEFORE UPDATE ON obras
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_funcionarios_updated_at BEFORE UPDATE ON funcionarios
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_materiais_updated_at BEFORE UPDATE ON materiais
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_obra_materiais_updated_at BEFORE UPDATE ON obra_materiais
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_transacoes_updated_at BEFORE UPDATE ON transacoes
FOR EACH ROW EXECUTE FUNCTION update_updated_at();


-- ============================================================================
-- 11. INDEXES (Performance)
-- ============================================================================

CREATE INDEX idx_companies_owner_id ON companies(owner_id);
CREATE INDEX idx_company_members_user_id ON company_members(user_id);
CREATE INDEX idx_company_members_company_id ON company_members(company_id);
CREATE INDEX idx_obras_company_id ON obras(company_id);
CREATE INDEX idx_obras_status ON obras(status);
CREATE INDEX idx_obras_created_by ON obras(created_by);
CREATE INDEX idx_funcionarios_company_id ON funcionarios(company_id);
CREATE INDEX idx_obra_funcionarios_obra_id ON obra_funcionarios(obra_id);
CREATE INDEX idx_obra_funcionarios_funcionario_id ON obra_funcionarios(funcionario_id);
CREATE INDEX idx_materiais_company_id ON materiais(company_id);
CREATE INDEX idx_obra_materiais_obra_id ON obra_materiais(obra_id);
CREATE INDEX idx_obra_materiais_material_id ON obra_materiais(material_id);
CREATE INDEX idx_transacoes_company_id ON transacoes(company_id);
CREATE INDEX idx_transacoes_obra_id ON transacoes(obra_id);
CREATE INDEX idx_transacoes_type ON transacoes(type);
CREATE INDEX idx_transacoes_date ON transacoes(date);
CREATE INDEX idx_transacoes_status ON transacoes(status);
