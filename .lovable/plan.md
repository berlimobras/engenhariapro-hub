

# Controle de Acesso com Supabase Externo + Perfil Completo

## Visao Geral
Implementar autenticacao completa com Supabase externo, incluindo tabela de perfis, controle de rotas protegidas e paginas de login/cadastro funcionais.

## Pre-requisitos (acoes suas, antes da implementacao)

### 1. Conectar o Supabase ao projeto Lovable
- No Lovable, va em **Settings > Supabase** e conecte seu projeto Supabase externo (URL + chave anon)
- Isso instalara automaticamente o pacote `@supabase/supabase-js` e criara o cliente

### 2. Configurar Resend no Supabase
- No painel do Supabase, va em **Authentication > Email Templates** e configure o Resend como provedor SMTP customizado em **Project Settings > Authentication > SMTP Settings**
- Isso e feito diretamente no dashboard do Supabase, nao no Lovable

---

## Implementacao (o que o Lovable fara apos conexao)

### Passo 1 - Banco de Dados (Migrations)
Criar as seguintes tabelas e funcoes:

**Tabela `profiles`:**
- `id` (uuid, FK para auth.users, ON DELETE CASCADE)
- `full_name` (text)
- `avatar_url` (text)
- `cargo` (text - ex: "Mestre de Obras", "Engenheiro Civil")
- `telefone` (text)
- `created_at`, `updated_at` (timestamps)

**Tabela `user_roles`** (separada por seguranca):
- `id` (uuid)
- `user_id` (uuid, FK para auth.users)
- `role` (enum: admin, user)

**Funcao `has_role`** (security definer para evitar recursao RLS)

**Trigger** para criar perfil automaticamente no signup

**Politicas RLS:**
- Usuarios so podem ler/editar seu proprio perfil
- Admins podem ver todos os perfis

### Passo 2 - Cliente Supabase
Recriar `src/lib/supabase.ts` usando as variaveis de ambiente do Supabase conectado (geradas automaticamente pelo Lovable).

### Passo 3 - Contexto de Autenticacao
Criar `src/contexts/AuthContext.tsx` com:
- Estado do usuario autenticado
- Listener `onAuthStateChange` (configurado ANTES de `getSession`)
- Funcoes de login, cadastro e logout
- Carregamento do perfil do usuario logado

### Passo 4 - Rota Protegida
Criar componente `src/components/ProtectedRoute.tsx` que:
- Verifica se o usuario esta logado
- Redireciona para `/login` se nao estiver
- Mostra loading enquanto verifica

### Passo 5 - Atualizar Login e Cadastro
- `Login.tsx`: Conectar ao `supabase.auth.signInWithPassword`
- `Cadastro.tsx`: Conectar ao `supabase.auth.signUp` com `emailRedirectTo: window.location.origin`

### Passo 6 - Atualizar App.tsx
- Envolver rotas com `AuthProvider`
- Proteger todas as rotas internas com `ProtectedRoute`
- Manter `/login` e `/cadastro` como rotas publicas

### Passo 7 - Botao de Logout
- Adicionar opcao de logout no sidebar e menu mobile

---

## Resultado Final
- Tela de login e cadastro funcionais com Supabase real
- Rotas protegidas (so acessa logado)
- Perfil do usuario armazenado no banco
- Controle de roles (admin/user) preparado para uso futuro
- Emails de confirmacao via Resend (configurado no Supabase)

