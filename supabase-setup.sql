-- ========================================
-- SCRIPT DE CONFIGURAÇÃO SUPABASE
-- Hub Engenharia Pro - Sistema de Permissões
-- ========================================

-- 1. Criar tabela de roles/permissões
CREATE TABLE IF NOT EXISTS user_roles (
  id uuid references auth.users on delete cascade primary key,
  role text not null default 'user',
  created_at timestamp with time zone default now(),
  constraint valid_role check (role in ('user', 'admin'))
);

-- 2. Habilitar RLS (Row Level Security)
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Usuários podem ver seu próprio role
CREATE POLICY "Users can view own role"
  ON user_roles FOR SELECT
  USING (auth.uid() = id);

-- 4. Policy: Apenas admins podem modificar roles
CREATE POLICY "Only admins can update roles"
  ON user_roles FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- 5. Função para criar role automaticamente quando novo usuário se cadastra
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  -- Verificar se é o email admin
  IF NEW.email = 'berlimobras@gmail.com' THEN
    INSERT INTO public.user_roles (id, role)
    VALUES (NEW.id, 'admin');
  ELSE
    INSERT INTO public.user_roles (id, role)
    VALUES (NEW.id, 'user');
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Trigger para executar a função quando novo usuário é criado
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 7. Adicionar role admin manualmente para o email especificado (se já existir)
-- Execute este comando APÓS criar a conta berlimobras@gmail.com
-- INSERT INTO user_roles (id, role)
-- SELECT id, 'admin' FROM auth.users WHERE email = 'berlimobras@gmail.com'
-- ON CONFLICT (id) DO UPDATE SET role = 'admin';

-- ========================================
-- INSTRUÇÕES DE USO:
-- ========================================
-- 1. Abra o Supabase Dashboard (https://supabase.com/dashboard)
-- 2. Vá em "SQL Editor"
-- 3. Cole ESTE SCRIPT COMPLETO
-- 4. Clique em "Run"
-- 5. Pronto! O sistema de permissões está configurado
-- ========================================
