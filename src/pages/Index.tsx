import { useAdmin } from '@/contexts/AdminContext';
import { useMetrics } from '@/hooks/useMetrics';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import {
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  Building2, TrendingUp, TrendingDown, Users,
} from 'lucide-react';

const OBRA_STATUS_COLORS: Record<string, string> = {
  em_andamento: '#10b981',
  planejamento: '#3b82f6',
  pausada: '#f59e0b',
  concluida: '#6b7280',
  cancelada: '#ef4444',
};

const RECEIT_COLOR = '#10b981';
const DESPESA_COLOR = '#ef4444';

export default function Dashboard() {
  const { adminUser } = useAdmin();
  const { data: metrics, isLoading } = useMetrics(adminUser.companyId);

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="text-center py-12">Carregando métricas...</div>
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="space-y-8">
        <div className="text-center py-12">Nenhuma métrica disponível</div>
      </div>
    );
  }

  const obrasAtivas = metrics.obrasPorStatus.find(
    (s) => s.status === 'em_andamento',
  )?.count || 0;

  return (
    <div className="space-y-8 pb-6">
      {/* ════════════════════════════════════════════════════════════
          ROW 1: KPI CARDS (4 columns)
      ════════════════════════════════════════════════════════════ */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {/* Obras Ativas */}
        <Card className="border-0 shadow-sm bg-card hover-lift transition-all rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-5">
            <CardTitle className="text-[13px] font-semibold text-muted-foreground uppercase tracking-wider">
              Obras Ativas
            </CardTitle>
            <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
              <Building2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent className="pb-5">
            <div className="text-2xl font-bold text-foreground">{obrasAtivas}</div>
            <div className="flex items-center gap-1 mt-2">
              <span className="inline-block h-2 w-2 rounded-full bg-blue-600" />
              <p className="text-xs text-muted-foreground">em andamento</p>
            </div>
          </CardContent>
        </Card>

        {/* Receita Total */}
        <Card className="border-0 shadow-sm bg-card hover-lift transition-all rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-5">
            <CardTitle className="text-[13px] font-semibold text-muted-foreground uppercase tracking-wider">
              Receita Total
            </CardTitle>
            <div className="h-8 w-8 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            </div>
          </CardHeader>
          <CardContent className="pb-5">
            <div className="text-2xl font-bold text-foreground">
              R$ {(metrics.receitaTotal / 1000).toFixed(1)}K
            </div>
            <div className="flex items-center gap-1 mt-2">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-600" />
              <p className="text-xs text-muted-foreground">total de receitas</p>
            </div>
          </CardContent>
        </Card>

        {/* Despesas Total */}
        <Card className="border-0 shadow-sm bg-card hover-lift transition-all rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-5">
            <CardTitle className="text-[13px] font-semibold text-muted-foreground uppercase tracking-wider">
              Despesas Total
            </CardTitle>
            <div className="h-8 w-8 rounded-full bg-rose-100 dark:bg-rose-900/40 flex items-center justify-center">
              <TrendingDown className="h-4 w-4 text-rose-600 dark:text-rose-400" />
            </div>
          </CardHeader>
          <CardContent className="pb-5">
            <div className="text-2xl font-bold text-foreground">
              R$ {(metrics.despesaTotal / 1000).toFixed(1)}K
            </div>
            <div className="flex items-center gap-1 mt-2">
              <span className="inline-block h-2 w-2 rounded-full bg-rose-600" />
              <p className="text-xs text-muted-foreground">total de despesas</p>
            </div>
          </CardContent>
        </Card>

        {/* Funcionários Ativos */}
        <Card className="border-0 shadow-sm bg-card hover-lift transition-all rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-5">
            <CardTitle className="text-[13px] font-semibold text-muted-foreground uppercase tracking-wider">
              Funcionários Ativos
            </CardTitle>
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent className="pb-5">
            <div className="text-2xl font-bold text-foreground">
              {metrics.funcionariosAtivos}
            </div>
            <div className="flex items-center gap-1 mt-2">
              <span className="inline-block h-2 w-2 rounded-full bg-accent" />
              <p className="text-xs text-muted-foreground">em ativo</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ════════════════════════════════════════════════════════════
          ROW 2: CHARTS (2 columns)
      ════════════════════════════════════════════════════════════ */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        {/* Bar Chart: Receita vs Despesa por Obra */}
        <Card className="border-0 shadow-sm bg-card rounded-2xl">
          <CardHeader>
            <CardTitle className="text-base font-bold">Receita vs Despesa por Obra</CardTitle>
          </CardHeader>
          <CardContent>
            {metrics.receitaDespesaPorObra.length > 0 ? (
              <ChartContainer
                config={{
                  receita: { label: 'Receita', color: RECEIT_COLOR },
                  despesa: { label: 'Despesa', color: DESPESA_COLOR },
                }}
              >
                <BarChart
                  data={metrics.receitaDespesaPorObra.map((d) => ({
                    name: d.name.length > 15 ? d.name.substring(0, 15) + '...' : d.name,
                    receita: d.receita,
                    despesa: d.despesa,
                  }))}
                  layout="vertical"
                  height={300}
                  margin={{ left: 120, right: 20, top: 5, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="transparent" />
                  <XAxis type="number" tick={{ fontSize: 12 }} />
                  <YAxis dataKey="name" type="category" width={115} tick={{ fontSize: 11 }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="receita" fill={RECEIT_COLOR} radius={[0, 4, 4, 0]} />
                  <Bar dataKey="despesa" fill={DESPESA_COLOR} radius={[0, 4, 4, 0]} />
                </BarChart>
              </ChartContainer>
            ) : (
              <div className="flex items-center justify-center h-72 text-muted-foreground">
                Nenhuma obra com transações
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pie Chart: Obras por Status */}
        <Card className="border-0 shadow-sm bg-card rounded-2xl">
          <CardHeader>
            <CardTitle className="text-base font-bold">Distribuição de Obras por Status</CardTitle>
          </CardHeader>
          <CardContent>
            {metrics.obrasPorStatus.length > 0 ? (
              <ChartContainer
                config={{
                  count: { label: 'Quantidade', color: 'var(--color-bg)' },
                }}
              >
                <PieChart height={300}>
                  <Pie
                    data={metrics.obrasPorStatus}
                    dataKey="count"
                    nameKey="status"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    label={({ name, count }) => `${name}: ${count}`}
                  >
                    {metrics.obrasPorStatus.map((entry) => (
                      <Cell
                        key={`cell-${entry.status}`}
                        fill={OBRA_STATUS_COLORS[entry.status] || '#999'}
                      />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ChartContainer>
            ) : (
              <div className="flex items-center justify-center h-72 text-muted-foreground">
                Nenhuma obra cadastrada
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* ════════════════════════════════════════════════════════════
          ROW 3: TABLES (2 columns)
      ════════════════════════════════════════════════════════════ */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        {/* Obras Recentes */}
        <Card className="border-0 shadow-sm bg-card rounded-2xl">
          <CardHeader>
            <CardTitle className="text-base font-bold">Obras Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            {metrics.obrasRecentes.length > 0 ? (
              <div className="space-y-4">
                {metrics.obrasRecentes.map((obra) => {
                  const progress =
                    obra.budget_estimated && obra.budget_estimated > 0
                      ? Math.min(
                        ((obra.budget_actual || 0) / obra.budget_estimated) * 100,
                        100,
                      )
                      : 0;

                  return (
                    <div key={obra.id} className="space-y-2 pb-4 border-b border-border/40 last:border-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-foreground truncate">
                            {obra.name}
                          </p>
                          {obra.client_name && (
                            <p className="text-xs text-muted-foreground">
                              Cliente: {obra.client_name}
                            </p>
                          )}
                        </div>
                        <Badge
                          variant="secondary"
                          className={`ml-2 shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border-0 ${
                            obra.status === 'em_andamento'
                              ? 'bg-emerald-100/80 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400'
                              : obra.status === 'planejamento'
                              ? 'bg-blue-100/80 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400'
                              : 'bg-gray-100/80 text-gray-700 dark:bg-gray-500/20 dark:text-gray-400'
                          }`}
                        >
                          {obra.status.replace(/_/g, ' ')}
                        </Badge>
                      </div>
                      {obra.budget_estimated && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Orçamento</span>
                            <span>
                              {progress.toFixed(0)}%
                            </span>
                          </div>
                          <Progress value={progress} className="h-1.5" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                Nenhuma obra cadastrada
              </div>
            )}
          </CardContent>
        </Card>

        {/* Top Funcionários por Salário */}
        <Card className="border-0 shadow-sm bg-card rounded-2xl">
          <CardHeader>
            <CardTitle className="text-base font-bold">Top Funcionários por Salário</CardTitle>
          </CardHeader>
          <CardContent>
            {metrics.topFuncionarios.length > 0 ? (
              <div className="space-y-3">
                {metrics.topFuncionarios.map((func, idx) => (
                  <div
                    key={func.id}
                    className="flex items-start justify-between pb-3 border-b border-border/40 last:border-0"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-muted-foreground w-5 text-center">
                          #{idx + 1}
                        </span>
                        <p className="font-medium text-sm text-foreground truncate">
                          {func.name}
                        </p>
                      </div>
                      {func.role && (
                        <p className="text-xs text-muted-foreground ml-7">
                          {func.role}
                        </p>
                      )}
                    </div>
                    <div className="text-right ml-2 shrink-0">
                      <p className="font-semibold text-sm text-foreground">
                        R$ {(func.salary || 0).toLocaleString('pt-BR')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                Nenhum funcionário cadastrado
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
