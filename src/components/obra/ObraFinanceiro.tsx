import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CircleDollarSign, TrendingDown, Users, PackageSearch } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export default function ObraFinanceiro({ obra }: { obra: any }) {
  // Buscar equipe alocada (para pegar os valores das diárias)
  const { data: equipe = [] } = useQuery({
    queryKey: ['obra_equipe', obra.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('obra_funcionarios')
        .select('*, funcionario:funcionarios(*)')
        .eq('obra_id', obra.id);
      if (error) throw error;
      return data;
    }
  });

  // Buscar presenças marcadas
  const { data: presencas = [] } = useQuery({
    queryKey: ['obra_presencas_all', obra.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('obra_presencas')
        .select('*')
        .eq('obra_id', obra.id);
      if (error) throw error;
      return data;
    }
  });

  // Buscar materiais da obra
  const { data: obraMateriais = [] } = useQuery({
    queryKey: ['obra_materiais_all', obra.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('obra_materiais')
        .select('*')
        .eq('obra_id', obra.id);
      if (error) throw error;
      return data;
    }
  });

  // Cálculo de Custo de Equipe (Diárias)
  let custoEquipe = 0;
  presencas.forEach((p: any) => {
    if (p.status === 'falta') return;
    
    // Acha a taxa diária do funcionário
    const alocacao = equipe.find((e: any) => e.funcionario_id === p.funcionario_id);
    if (alocacao) {
      let valorDiaria = alocacao.daily_rate || 0;
      if (p.status === 'meio_periodo') {
        valorDiaria = valorDiaria / 2;
      }
      custoEquipe += valorDiaria;
    }
  });

  // Cálculo de bônus extra por finalizar a obra/etapa (soma todos os extras configurados)
  const custoExtraEquipe = equipe.reduce((acc: number, e: any) => acc + (e.extra_value || 0), 0);

  // Cálculo de Custo de Materiais (Estoque Comprado)
  const custoMateriais = obraMateriais.reduce((acc: number, m: any) => acc + (m.quantity * m.unit_cost), 0);

  const custoTotal = custoEquipe + custoMateriais; // Não somamos custoExtra automaticamente para não poluir o dia a dia

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <CircleDollarSign className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Resumo Financeiro da Obra</h3>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="rounded-2xl border-0 shadow-sm bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Custo Total Atual</CardTitle>
            <TrendingDown className="h-4 w-4 text-rose-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-rose-600">
              R$ {custoTotal.toLocaleString('pt-BR')}
            </div>
            <p className="text-xs text-muted-foreground mt-2">Soma de presenças reais + materiais pagos</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mt-4">
        <Card className="rounded-2xl border border-border/50 bg-card shadow-sm">
          <CardHeader className="pb-3 border-b border-border/50">
            <CardTitle className="text-base flex items-center gap-2">
              <Users className="h-4 w-4" /> Custos com Mão de Obra
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Total de Diárias Pagas:</span>
              <span className="font-semibold text-lg">R$ {custoEquipe.toLocaleString('pt-BR')}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Bônus / Extras Pendentes (Final de Obra):</span>
              <span className="font-semibold text-emerald-600">R$ {custoExtraEquipe.toLocaleString('pt-BR')}</span>
            </div>
            <div className="flex justify-between items-center text-sm pt-3 border-t border-dashed">
              <span className="text-muted-foreground">Presenças Registradas:</span>
              <span className="font-bold">{presencas.filter((p:any) => p.status !== 'falta').length} dias trabalhados</span>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-border/50 bg-card shadow-sm">
          <CardHeader className="pb-3 border-b border-border/50">
            <CardTitle className="text-base flex items-center gap-2">
              <PackageSearch className="h-4 w-4" /> Custos com Materiais
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Total de Compras Registradas:</span>
              <span className="font-semibold text-lg">R$ {custoMateriais.toLocaleString('pt-BR')}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Itens em Estoque:</span>
              <span className="font-bold">{obraMateriais.length} lançamentos</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
