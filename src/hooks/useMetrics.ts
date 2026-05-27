import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Obra } from './useObras';
import { Funcionario } from './useFuncionarios';

export interface Metrics {
  obrasPorStatus: { status: string; count: number }[];
  receitaTotal: number;
  despesaTotal: number;
  margemLucro: number;
  funcionariosAtivos: number;
  folhaPagamento: number;
  receitaDespesaPorObra: { obraId: string; name: string; receita: number; despesa: number }[];
  obrasRecentes: Obra[];
  topFuncionarios: Funcionario[];
}

export function useMetrics(companyId: string) {
  return useQuery({
    queryKey: ['metrics', companyId],
    queryFn: async (): Promise<Metrics> => {
      // Query 1: Obras por status
      const { data: obrasData } = await supabase
        .from('obras')
        .select('status')
        .eq('company_id', companyId);

      const obrasPorStatus = [
        { status: 'planejamento', count: 0 },
        { status: 'em_andamento', count: 0 },
        { status: 'pausada', count: 0 },
        { status: 'concluida', count: 0 },
        { status: 'cancelada', count: 0 },
      ];

      obrasData?.forEach((obra) => {
        const item = obrasPorStatus.find((s) => s.status === obra.status);
        if (item) item.count++;
      });

      // Query 2: Receitas e despesas totais
      const { data: transacoesData } = await supabase
        .from('transacoes')
        .select('type, amount')
        .eq('company_id', companyId);

      const receitaTotal = transacoesData
        ?.filter((t) => t.type === 'receita')
        .reduce((sum, t) => sum + (t.amount || 0), 0) || 0;

      const despesaTotal = transacoesData
        ?.filter((t) => t.type === 'despesa')
        .reduce((sum, t) => sum + (t.amount || 0), 0) || 0;

      // Query 3: Receita e despesa por obra
      const { data: obrasComTransacoes } = await supabase
        .from('obras')
        .select('id, name, budget_estimated, budget_actual')
        .eq('company_id', companyId)
        .order('created_at', { ascending: false });

      const receitaDespesaPorObra =
        obrasComTransacoes?.map((obra) => {
          const obraTransacoes = transacoesData?.filter((t) => t.obra_id === obra.id) || [];
          const receita = obraTransacoes
            .filter((t) => t.type === 'receita')
            .reduce((sum, t) => sum + (t.amount || 0), 0);
          const despesa = obraTransacoes
            .filter((t) => t.type === 'despesa')
            .reduce((sum, t) => sum + (t.amount || 0), 0);

          return {
            obraId: obra.id,
            name: obra.name,
            receita,
            despesa,
          };
        }) || [];

      // Query 4: Funcionários ativos
      const { data: funcionariosData } = await supabase
        .from('funcionarios')
        .select('id, name, role, salary, status')
        .eq('company_id', companyId)
        .eq('status', 'ativo')
        .order('salary', { ascending: false });

      const funcionariosAtivos = funcionariosData?.length || 0;

      const folhaPagamento = funcionariosData
        ?.reduce((sum, f) => sum + (f.salary || 0), 0) || 0;

      // Query 5: Obras recentes
      const { data: obrasRecentes } = await supabase
        .from('obras')
        .select('*')
        .eq('company_id', companyId)
        .order('created_at', { ascending: false })
        .limit(5);

      // Query 6: Top 5 funcionários por salário
      const topFuncionarios = funcionariosData?.slice(0, 5) || [];

      return {
        obrasPorStatus: obrasPorStatus.filter((s) => s.count > 0),
        receitaTotal,
        despesaTotal,
        margemLucro: receitaTotal - despesaTotal,
        funcionariosAtivos,
        folhaPagamento,
        receitaDespesaPorObra,
        obrasRecentes: (obrasRecentes as Obra[]) || [],
        topFuncionarios: (topFuncionarios as Funcionario[]) || [],
      };
    },
    enabled: !!companyId,
    refetchIntervalInBackground: 60000, // Refetch a cada 60s
  });
}
