# 🎯 Instruções de Configuração do Supabase

Siga estes passos para configurar o sistema de permissões de administrador no seu projeto.

## 📋 Passo 1: Executar Script SQL

1. Acesse o **Supabase Dashboard**: https://supabase.com/dashboard
2. Selecione seu projeto
3. No menu lateral, clique em **SQL Editor**
4. Clique em **New Query**
5. Copie TODO o conteúdo do arquivo `supabase-setup.sql`
6. Cole no editor SQL
7. Clique em **Run** (ou pressione Ctrl+Enter)

✅ Você verá mensagens de sucesso confirmando a criação da tabela e das policies.

## 📋 Passo 2: Configurar Autenticação (Opcional)

Para permitir cadastro sem confirmação de email durante testes:

1. No Supabase Dashboard, vá em **Authentication** → **Settings**
2. Procure por **Email Confirmations**
3. Desabilite "Enable email confirmations" (temporariamente para testes)
4. Clique em **Save**

> **Importante**: Em produção, você deve RE-HABILITAR a confirmação de email por segurança.

## 📋 Passo 3: Criar Conta Admin

1. No seu aplicativo, crie uma conta com o email: **berlimobras@gmail.com**
2. O trigger automático do banco de dados atribuirá o role "admin" para esse email
3. Faça login normalmente - você será automaticamente redirecionado para `/admin/dashboard`

## 📋 Passo 4: Testar

### Teste 1: Usuário Normal
- Crie uma conta com qualquer outro email
- Faça login
- Você deve ser direcionado para a página principal (Dashboard com ferramentas)

### Teste 2: Administrador
- Faça login com berlimobras@gmail.com
- Você deve ser automaticamente redirecionado para `/admin/dashboard`
- Se tentar acessar `/`, será redirecionado de volta para `/admin/dashboard`

### Teste 3: Proteção de Rota
- Faça logout
- Tente acessar diretamente `https://seu-app.com/admin/dashboard`
- Você deve ser redirecionado para `/login`

## 🔧 Erros Comuns

### "Cannot find table user_roles"
- Você não executou o script SQL ou houve erro na execução
- Volte ao SQL Editor e execute novamente

### "Admin não é redirecionado"
- Verifique se você criou a conta DEPOIS de executar o script SQL
- Se criou antes, execute este comando no SQL Editor:
```sql
INSERT INTO user_roles (id, role)
SELECT id, 'admin' FROM auth.users WHERE email = 'berlimobras@gmail.com'
ON CONFLICT (id) DO UPDATE SET role = 'admin';
```

### "Erro ao criar conta"
- Verifique se a confirmação de email está DESABILITADA nas settings
- Ou aguarde o email de confirmação chegar

## ✅ Pronto!

Após seguir todos os passos, seu sistema de permissões está configurado e funcionando.
