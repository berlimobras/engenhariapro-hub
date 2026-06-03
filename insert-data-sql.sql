-- Desabilitar constraints temporariamente
ALTER TABLE companies DISABLE TRIGGER ALL;
ALTER TABLE obras DISABLE TRIGGER ALL;
ALTER TABLE funcionarios DISABLE TRIGGER ALL;
ALTER TABLE transacoes DISABLE TRIGGER ALL;

-- Inserir empresa (sem owner_id)
DELETE FROM companies WHERE id = '550e8400-e29b-41d4-a716-446655440000';
INSERT INTO companies (id, name) VALUES ('550e8400-e29b-41d4-a716-446655440000', 'ObraDoMestre Demo');

-- Inserir obras
DELETE FROM obras WHERE company_id = '550e8400-e29b-41d4-a716-446655440000';
INSERT INTO obras (id, company_id, name, address, client_name, budget_estimated, budget_actual, status)
VALUES
  ('550e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440000', 'Condomínio Residencial Flor do Vale', 'Rua Principal, 123 - São Paulo, SP', 'Maria Silva Construções', 150000, 85000, 'em_andamento'),
  ('550e8400-e29b-41d4-a716-446655440012', '550e8400-e29b-41d4-a716-446655440000', 'Reforma Comercial Centro', 'Avenida Paulista, 1000 - São Paulo, SP', 'João Santos Empresa', 75000, 62000, 'em_andamento'),
  ('550e8400-e29b-41d4-a716-446655440013', '550e8400-e29b-41d4-a716-446655440000', 'Casa Residencial Zona Norte', 'Rua das Flores, 456 - São Paulo, SP', 'Carlos Oliveira', 120000, 120000, 'concluida'),
  ('550e8400-e29b-41d4-a716-446655440014', '550e8400-e29b-41d4-a716-446655440000', 'Edifício Comercial Mega', 'Av. Brasil, 2000 - São Paulo, SP', 'Empreendimentos Brasil Ltda', 500000, 250000, 'planejamento'),
  ('550e8400-e29b-41d4-a716-446655440015', '550e8400-e29b-41d4-a716-446655440000', 'Reforma Residencial Zona Leste', 'Rua do Comércio, 789 - São Paulo, SP', 'Ana Costa', 45000, 0, 'planejamento');

-- Inserir funcionários
DELETE FROM funcionarios WHERE company_id = '550e8400-e29b-41d4-a716-446655440000';
INSERT INTO funcionarios (id, company_id, name, cpf, phone, email, role, salary, status)
VALUES
  ('550e8400-e29b-41d4-a716-446655440021', '550e8400-e29b-41d4-a716-446655440000', 'Pedro Silva', '123.456.789-00', '(11) 98765-4321', 'pedro@example.com', 'Mestre de Obra', 5500, 'ativo'),
  ('550e8400-e29b-41d4-a716-446655440022', '550e8400-e29b-41d4-a716-446655440000', 'João Santos', '234.567.890-11', '(11) 97654-3210', 'joao@example.com', 'Pedreiro', 3200, 'ativo'),
  ('550e8400-e29b-41d4-a716-446655440023', '550e8400-e29b-41d4-a716-446655440000', 'Carlos Oliveira', '345.678.901-22', '(11) 96543-2109', 'carlos@example.com', 'Eletricista', 3800, 'ativo'),
  ('550e8400-e29b-41d4-a716-446655440024', '550e8400-e29b-41d4-a716-446655440000', 'Fernando Costa', '456.789.012-33', '(11) 95432-1098', 'fernando@example.com', 'Encanador', 3500, 'ativo'),
  ('550e8400-e29b-41d4-a716-446655440025', '550e8400-e29b-41d4-a716-446655440000', 'Roberto Gomes', '567.890.123-44', '(11) 94321-0987', 'roberto@example.com', 'Pintor', 2800, 'ativo'),
  ('550e8400-e29b-41d4-a716-446655440026', '550e8400-e29b-41d4-a716-446655440000', 'Anderson Lima', '678.901.234-55', '(11) 93210-9876', 'anderson@example.com', 'Ajudante Geral', 2200, 'ativo'),
  ('550e8400-e29b-41d4-a716-446655440027', '550e8400-e29b-41d4-a716-446655440000', 'Mariana Souza', '789.012.345-66', '(11) 92109-8765', 'mariana@example.com', 'Administrativo', 2500, 'ativo'),
  ('550e8400-e29b-41d4-a716-446655440028', '550e8400-e29b-41d4-a716-446655440000', 'Gustavo Ferreira', '890.123.456-77', '(11) 91098-7654', 'gustavo@example.com', 'Carpinteiro', 3400, 'ativo');

-- Inserir transações
DELETE FROM transacoes WHERE company_id = '550e8400-e29b-41d4-a716-446655440000';
INSERT INTO transacoes (id, company_id, obra_id, type, amount, description)
VALUES
  ('550e8400-e29b-41d4-a716-446655440031', '550e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440011', 'receita', 50000, 'Recebimento parcial cliente'),
  ('550e8400-e29b-41d4-a716-446655440032', '550e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440011', 'despesa', 35000, 'Compra de materiais'),
  ('550e8400-e29b-41d4-a716-446655440033', '550e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440011', 'despesa', 15000, 'Folha de pagamento'),
  ('550e8400-e29b-41d4-a716-446655440034', '550e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440012', 'receita', 40000, 'Adiantamento cliente'),
  ('550e8400-e29b-41d4-a716-446655440035', '550e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440012', 'despesa', 22000, 'Mão de obra'),
  ('550e8400-e29b-41d4-a716-446655440036', '550e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440013', 'receita', 60000, 'Pagamento final'),
  ('550e8400-e29b-41d4-a716-446655440037', '550e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440013', 'despesa', 60000, 'Custos finais'),
  ('550e8400-e29b-41d4-a716-446655440038', '550e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440014', 'receita', 100000, 'Adiantamento inicial'),
  ('550e8400-e29b-41d4-a716-446655440039', '550e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440014', 'despesa', 150000, 'Compra de materiais e equipamentos');

-- Reabilitar constraints
ALTER TABLE companies ENABLE TRIGGER ALL;
ALTER TABLE obras ENABLE TRIGGER ALL;
ALTER TABLE funcionarios ENABLE TRIGGER ALL;
ALTER TABLE transacoes ENABLE TRIGGER ALL;

-- Sucesso!
SELECT 'Dados de exemplo inseridos com sucesso!' as status;
