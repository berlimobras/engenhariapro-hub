import { supabase } from './supabase';

export const obrasExemplo = [
  {
    name: 'Condomínio Residencial Flor do Vale',
    address: 'Rua Principal, 123 - São Paulo, SP',
    client_name: 'Maria Silva Construções',
    budget_estimated: 150000,
    budget_actual: 85000,
    status: 'em_andamento' as const,
  },
  {
    name: 'Reforma Comercial Centro',
    address: 'Avenida Paulista, 1000 - São Paulo, SP',
    client_name: 'João Santos Empresa',
    budget_estimated: 75000,
    budget_actual: 62000,
    status: 'em_andamento' as const,
  },
  {
    name: 'Casa Residencial Zona Norte',
    address: 'Rua das Flores, 456 - São Paulo, SP',
    client_name: 'Carlos Oliveira',
    budget_estimated: 120000,
    budget_actual: 120000,
    status: 'concluida' as const,
  },
  {
    name: 'Edificio Comercial Mega',
    address: 'Av. Brasil, 2000 - São Paulo, SP',
    client_name: 'Empreendimentos Brasil Ltda',
    budget_estimated: 500000,
    budget_actual: 250000,
    status: 'planejamento' as const,
  },
  {
    name: 'Reforma Residencial Zona Leste',
    address: 'Rua do Comércio, 789 - São Paulo, SP',
    client_name: 'Ana Costa',
    budget_estimated: 45000,
    budget_actual: 0,
    status: 'planejamento' as const,
  },
];

export const funcionariosExemplo = [
  {
    name: 'Pedro Silva',
    cpf: '123.456.789-00',
    phone: '(11) 98765-4321',
    email: 'pedro@example.com',
    role: 'Mestre de Obra',
    salary: 5500,
    status: 'ativo' as const,
  },
  {
    name: 'João Santos',
    cpf: '234.567.890-11',
    phone: '(11) 97654-3210',
    email: 'joao@example.com',
    role: 'Pedreiro',
    salary: 3200,
    status: 'ativo' as const,
  },
  {
    name: 'Carlos Oliveira',
    cpf: '345.678.901-22',
    phone: '(11) 96543-2109',
    email: 'carlos@example.com',
    role: 'Eletricista',
    salary: 3800,
    status: 'ativo' as const,
  },
  {
    name: 'Fernando Costa',
    cpf: '456.789.012-33',
    phone: '(11) 95432-1098',
    email: 'fernando@example.com',
    role: 'Encanador',
    salary: 3500,
    status: 'ativo' as const,
  },
  {
    name: 'Roberto Gomes',
    cpf: '567.890.123-44',
    phone: '(11) 94321-0987',
    email: 'roberto@example.com',
    role: 'Pintor',
    salary: 2800,
    status: 'ativo' as const,
  },
  {
    name: 'Anderson Lima',
    cpf: '678.901.234-55',
    phone: '(11) 93210-9876',
    email: 'anderson@example.com',
    role: 'Ajudante Geral',
    salary: 2200,
    status: 'ativo' as const,
  },
  {
    name: 'Mariana Souza',
    cpf: '789.012.345-66',
    phone: '(11) 92109-8765',
    email: 'mariana@example.com',
    role: 'Administrativo',
    salary: 2500,
    status: 'ativo' as const,
  },
  {
    name: 'Gustavo Ferreira',
    cpf: '890.123.456-77',
    phone: '(11) 91098-7654',
    email: 'gustavo@example.com',
    role: 'Carpinteiro',
    salary: 3400,
    status: 'ativo' as const,
  },
];

export const transacoesExemplo = (companyId: string, obraIds: string[]) => [
  { obra_id: obraIds[0], type: 'receita', amount: 50000, description: 'Recebimento parcial cliente' },
  { obra_id: obraIds[0], type: 'despesa', amount: 35000, description: 'Compra de materiais' },
  { obra_id: obraIds[0], type: 'despesa', amount: 15000, description: 'Folha de pagamento' },
  { obra_id: obraIds[1], type: 'receita', amount: 40000, description: 'Adiantamento cliente' },
  { obra_id: obraIds[1], type: 'despesa', amount: 22000, description: 'Mão de obra' },
  { obra_id: obraIds[2], type: 'receita', amount: 60000, description: 'Pagamento final' },
  { obra_id: obraIds[2], type: 'despesa', amount: 60000, description: 'Custos finais' },
];

export async function seedDatabase(companyId: string) {
  try {
    // Criar obras
    const { data: obrasData, error: obrasError } = await supabase
      .from('obras')
      .insert(
        obrasExemplo.map((obra) => ({
          ...obra,
          company_id: companyId,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }))
      )
      .select();

    if (obrasError) {
      console.error('Erro ao criar obras:', obrasError);
      return { success: false, error: obrasError };
    }

    const obraIds = obrasData?.map((o) => o.id) || [];

    // Criar funcionários
    const { data: funcionariosData, error: funcionariosError } = await supabase
      .from('funcionarios')
      .insert(
        funcionariosExemplo.map((func) => ({
          ...func,
          company_id: companyId,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }))
      )
      .select();

    if (funcionariosError) {
      console.error('Erro ao criar funcionários:', funcionariosError);
      return { success: false, error: funcionariosError };
    }

    // Criar transações
    const transacoes = transacoesExemplo(companyId, obraIds);
    const { error: transacoesError } = await supabase
      .from('transacoes')
      .insert(
        transacoes.map((t) => ({
          ...t,
          company_id: companyId,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }))
      );

    if (transacoesError) {
      console.error('Erro ao criar transações:', transacoesError);
      return { success: false, error: transacoesError };
    }

    return { success: true, data: { obras: obrasData, funcionarios: funcionariosData } };
  } catch (error) {
    console.error('Erro ao fazer seed:', error);
    return { success: false, error };
  }
}
