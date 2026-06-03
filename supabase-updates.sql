-- ==========================================
-- ATUALIZAÇÕES DO BANCO DE DADOS (GESTAO DE OBRAS)
-- ==========================================

-- 1. Adicionar o campo "extra_value" (bônus/extra) na alocação do funcionário na obra
ALTER TABLE obra_funcionarios
ADD COLUMN IF NOT EXISTS extra_value DECIMAL(10,2) DEFAULT 0;

-- 2. Tabela de Checklist de Presenças (Diárias)
CREATE TABLE IF NOT EXISTS obra_presencas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  obra_id UUID NOT NULL REFERENCES obras(id) ON DELETE CASCADE,
  funcionario_id UUID NOT NULL REFERENCES funcionarios(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'presente', -- 'presente', 'falta', 'meio_periodo'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(obra_id, funcionario_id, date)
);

ALTER TABLE obra_presencas ENABLE ROW LEVEL SECURITY;

-- Como estamos rodando em modo teste/demo com RLS desativado, 
-- vamos desativar o RLS nesta nova tabela também para evitar problemas de permissão.
ALTER TABLE obra_presencas DISABLE ROW LEVEL SECURITY;

-- Políticas de segurança (caso o RLS seja ativado no futuro)
CREATE POLICY "Users can view presencas from their companies"
  ON obra_presencas FOR SELECT
  USING (
    obra_id IN (
      SELECT id FROM obras WHERE company_id IN (
        SELECT id FROM companies
        WHERE owner_id = auth.uid()
      )
    )
  );

CREATE POLICY "Users can manage presencas in their companies"
  ON obra_presencas FOR ALL
  USING (
    obra_id IN (
      SELECT id FROM obras WHERE company_id IN (
        SELECT id FROM companies WHERE owner_id = auth.uid()
      )
    )
  );

-- Trigger de atualização de timestamp
DROP TRIGGER IF EXISTS trg_obra_presencas_updated_at ON obra_presencas;
CREATE TRIGGER trg_obra_presencas_updated_at BEFORE UPDATE ON obra_presencas
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Confirmação
SELECT 'Tabela de presenças e campos extras criados com sucesso!' as status;
