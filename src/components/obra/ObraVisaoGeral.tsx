import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, CircleDollarSign, CalendarDays } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export default function ObraVisaoGeral({ obra, setActiveTab }: { obra: any, setActiveTab?: (tab: string) => void }) {

  // Fetch Checklists
  const { data: checklists = [], isLoading } = useQuery({
    queryKey: ['obra_checklists', obra.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('obra_checklists')
        .select('*')
        .eq('obra_id', obra.id)
        .order('created_at', { ascending: true });
      if (error) throw error;
      return data;
    },
    enabled: !!obra.id
  });

  // Calculate Progress based on Checklist
  const totalTasks = checklists.length;
  const completedTasks = checklists.filter((t: any) => t.is_completed).length;
  const progress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card 
          className="rounded-2xl border-0 shadow-sm bg-card hover:shadow-md transition-shadow cursor-pointer hover:border-primary/30 border border-transparent"
          onClick={() => setActiveTab && setActiveTab('processos')}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progresso da Obra</CardTitle>
            <Building2 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{progress}%</div>
            <div className="mt-2 space-y-1">
              <Progress value={progress} className="h-2" />
              <p className="text-[11px] text-muted-foreground text-right">{completedTasks} de {totalTasks} tarefas concluídas</p>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="rounded-2xl border-0 shadow-sm bg-card hover:shadow-md transition-shadow cursor-pointer hover:border-emerald-600/30 border border-transparent"
          onClick={() => setActiveTab && setActiveTab('financeiro')}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orçamento Estimado</CardTitle>
            <CircleDollarSign className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {obra.budget_estimated ? obra.budget_estimated.toLocaleString('pt-BR') : '0'}
            </div>
            <p className="text-xs text-muted-foreground">Valor previsto para o projeto</p>
          </CardContent>
        </Card>

        <Card 
          className="rounded-2xl border-0 shadow-sm bg-card hover:shadow-md transition-shadow cursor-pointer hover:border-rose-600/30 border border-transparent"
          onClick={() => setActiveTab && setActiveTab('financeiro')}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Custo Atual</CardTitle>
            <CircleDollarSign className="h-4 w-4 text-rose-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rose-600">
              R$ {obra.budget_actual ? obra.budget_actual.toLocaleString('pt-BR') : '0'}
            </div>
            <p className="text-xs text-muted-foreground">Total de despesas pagas</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="rounded-2xl border-0 shadow-sm bg-card">
          <CardHeader>
            <CardTitle>Detalhes da Obra</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2 items-center">
              <strong className="w-24 text-muted-foreground">Cliente:</strong>
              <span>{obra.client_name || 'Não informado'}</span>
            </div>
            <div className="flex gap-2 items-center">
              <strong className="w-24 text-muted-foreground">Endereço:</strong>
              <span>{obra.address || 'Não informado'}</span>
            </div>
            <div className="flex gap-2 items-center">
              <strong className="w-24 text-muted-foreground">Início:</strong>
              <span className="flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                {obra.start_date ? new Date(obra.start_date).toLocaleDateString('pt-BR') : 'Não definido'}
              </span>
            </div>
            <div className="flex gap-2 items-center">
              <strong className="w-24 text-muted-foreground">Previsão Fim:</strong>
              <span className="flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                {obra.end_date ? new Date(obra.end_date).toLocaleDateString('pt-BR') : 'Não definido'}
              </span>
            </div>
            
            <div className="pt-4 border-t border-border mt-4">
              <Button variant="outline" className="w-full text-primary border-primary/20 hover:bg-primary/5">Editar Informações</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
