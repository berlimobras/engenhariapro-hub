import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, CircleDollarSign, CalendarDays } from 'lucide-react';

export default function ObraVisaoGeral({ obra }: { obra: any }) {
  const progress =
    obra.budget_estimated && obra.budget_estimated > 0
      ? Math.min(((obra.budget_actual || 0) / obra.budget_estimated) * 100, 100)
      : 0;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orçamento Estimado</CardTitle>
            <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {obra.budget_estimated ? obra.budget_estimated.toLocaleString('pt-BR') : '0'}
            </div>
            <p className="text-xs text-muted-foreground">Valor previsto para o projeto</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gasto Real (Aproximado)</CardTitle>
            <CircleDollarSign className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {obra.budget_actual ? obra.budget_actual.toLocaleString('pt-BR') : '0'}
            </div>
            <p className="text-xs text-muted-foreground">Valor já consumido</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status do Projeto</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">
              {obra.status.replace(/_/g, ' ')}
            </div>
            <div className="mt-2 h-2 w-full bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-primary"
                style={{ width: `${progress}%` }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações Detalhadas</CardTitle>
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
        </CardContent>
      </Card>
    </div>
  );
}
