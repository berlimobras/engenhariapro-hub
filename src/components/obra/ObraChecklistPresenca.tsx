import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarDays, CheckCircle2, AlertCircle, Clock, Save, History, ChevronRight } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export default function ObraChecklistPresenca({ obra }: { obra: any }) {
  const queryClient = useQueryClient();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'edit' | 'view'>('edit');
  const [presencasForm, setPresencasForm] = useState<Record<string, string>>({}); // { funcId: status }

  // Buscar equipe da obra
  const { data: equipe = [], isLoading: isLoadingEquipe } = useQuery({
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

  // Fetch all presences for history log
  const { data: allPresencas = [], isLoading: isLoadingHistory } = useQuery({
    queryKey: ['obra_presencas_history', obra.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('obra_presencas')
        .select('date, created_at, updated_at')
        .eq('obra_id', obra.id)
        .order('date', { ascending: false });
      if (error) throw error;
      return data;
    }
  });

  // Group history by date
  const groupedHistory = allPresencas.reduce((acc: any, curr: any) => {
    if (!acc[curr.date]) {
      acc[curr.date] = curr; // keeping the first one for timestamp reference
    }
    return acc;
  }, {});
  const historyEntries = Object.values(groupedHistory);

  // Buscar presenças do mês atual (apenas para colorir o calendário futuramente)
  // Mas por enquanto vamos buscar as presenças do dia selecionado quando o Modal abrir.
  const fetchPresencasDoDia = async (date: Date) => {
    const localDateStr = date.toLocaleDateString('en-CA'); // Formato YYYY-MM-DD
    const { data, error } = await supabase
      .from('obra_presencas')
      .select('*')
      .eq('obra_id', obra.id)
      .eq('date', localDateStr);
    
    if (error) throw error;
    
    // Transformar em mapa para o form
    const map: Record<string, string> = {};
    if (data) {
      data.forEach(p => {
        map[p.funcionario_id] = p.status;
      });
    }
    setPresencasForm(map);
  };

  const handleDayClick = async (date: Date | undefined, mode: 'edit' | 'view' = 'edit') => {
    if (!date) return;
    setSelectedDate(date);
    await fetchPresencasDoDia(date);
    setDialogMode(mode);
    setIsDialogOpen(true);
  };

  const savePresencas = useMutation({
    mutationFn: async () => {
      if (!selectedDate) return;
      const localDateStr = selectedDate.toLocaleDateString('en-CA'); // Formato YYYY-MM-DD
      
      // Deleta presenças antigas desse dia para essa obra
      await supabase
        .from('obra_presencas')
        .delete()
        .eq('obra_id', obra.id)
        .eq('date', localDateStr);

      // Insere as novas
      const inserts = Object.entries(presencasForm).map(([funcId, status]) => ({
        obra_id: obra.id,
        funcionario_id: funcId,
        date: localDateStr,
        status: status
      }));

      if (inserts.length > 0) {
        const { error } = await supabase
          .from('obra_presencas')
          .insert(inserts);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success('Presenças salvas com sucesso!');
      setIsDialogOpen(false);
      queryClient.invalidateQueries({ queryKey: ['obra_presencas', obra.id] });
      queryClient.invalidateQueries({ queryKey: ['obra_presencas_history', obra.id] });
    },
    onError: (err: any) => toast.error('Erro ao salvar: ' + err.message)
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <CalendarDays className="h-5 w-5 text-primary" /> Diárias & Presença
        </h3>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="rounded-2xl border-0 shadow-sm bg-card flex flex-col items-center p-6">
          <h4 className="font-semibold text-lg mb-4 self-start">Calendário da Obra</h4>
          <p className="text-sm text-muted-foreground self-start mb-4">
            Selecione um dia abaixo para fazer a chamada dos funcionários alocados na obra. O valor será contabilizado no fechamento financeiro.
          </p>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => handleDayClick(date, 'edit')}
            className="rounded-xl border bg-card/50 shadow-sm"
          />
        </Card>

        <Card className="rounded-2xl border-0 shadow-sm bg-card">
          <CardHeader>
            <CardTitle className="text-base">Como funciona?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
              <p><strong>Presente (Integral):</strong> Contabiliza 100% do valor da diária cadastrada para o funcionário.</p>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
              <p><strong>Meio Período:</strong> Contabiliza apenas 50% do valor da diária (meia diária).</p>
            </div>
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
              <p><strong>Falta:</strong> Não contabiliza nenhum valor para o dia. Mantém o registro histórico de ausência.</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* HISTÓRICO DE CHAMADAS */}
      <Card className="rounded-2xl border-0 shadow-sm bg-card mt-6">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <History className="h-5 w-5 text-primary" /> Histórico de Registros (Log)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoadingHistory ? (
            <p className="text-sm text-muted-foreground">Carregando histórico...</p>
          ) : historyEntries.length === 0 ? (
            <p className="text-sm text-muted-foreground border border-dashed p-6 rounded-xl text-center">
              Nenhuma chamada registrada até o momento.
            </p>
          ) : (
            <div className="space-y-3">
              {historyEntries.map((entry: any) => {
                const parts = entry.date.split('-');
                const localDateStr = `${parts[2]}/${parts[1]}/${parts[0]}`;
                const updatedAt = entry.updated_at ? new Date(entry.updated_at) : new Date(entry.created_at);
                
                return (
                  <div 
                    key={entry.date}
                    onClick={() => {
                      const jsDate = new Date(Number(parts[0]), Number(parts[1])-1, Number(parts[2]));
                      handleDayClick(jsDate, 'view');
                    }}
                    className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-background hover:bg-muted/30 cursor-pointer transition-colors"
                  >
                    <div>
                      <p className="font-semibold text-foreground">Chamada do dia {localDateStr}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Última alteração em {updatedAt.toLocaleDateString('pt-BR')} às {updatedAt.toLocaleTimeString('pt-BR', { hour: '2-digit', minute:'2-digit' })}
                      </p>
                    </div>
                    <Button variant="ghost" size="icon" className="shrink-0 text-muted-foreground">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px] bg-card rounded-2xl">
          <DialogHeader>
            <DialogTitle>Chamada - {selectedDate?.toLocaleDateString('pt-BR')}</DialogTitle>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            {isLoadingEquipe ? (
              <p className="text-center text-muted-foreground">Carregando equipe...</p>
            ) : equipe.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">
                Nenhum funcionário alocado nesta obra ainda. Adicione membros na aba "Equipe" primeiro.
              </p>
            ) : (
              <div className="space-y-3">
                {equipe.map((membro: any) => (
                  <div key={membro.id} className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-muted/20">
                    <div>
                      <p className="font-semibold">{membro.funcionario?.name}</p>
                      <p className="text-xs text-muted-foreground">{membro.funcionario?.role || 'Função não definida'}</p>
                    </div>
                    <div className="w-36 flex justify-end">
                      {dialogMode === 'view' ? (
                        <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                          (presencasForm[membro.funcionario_id] || 'presente') === 'presente' ? 'bg-emerald-100 text-emerald-800' :
                          presencasForm[membro.funcionario_id] === 'meio_periodo' ? 'bg-blue-100 text-blue-800' :
                          'bg-rose-100 text-rose-800'
                        }`}>
                          {(presencasForm[membro.funcionario_id] || 'presente') === 'presente' ? 'Presente' :
                           presencasForm[membro.funcionario_id] === 'meio_periodo' ? 'Meio Período' : 'Falta'}
                        </span>
                      ) : (
                        <Select 
                          value={presencasForm[membro.funcionario_id] || 'presente'} 
                          onValueChange={(val) => setPresencasForm({...presencasForm, [membro.funcionario_id]: val})}
                        >
                          <SelectTrigger className="h-8 w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="presente">Presente</SelectItem>
                            <SelectItem value="meio_periodo">Meio Período</SelectItem>
                            <SelectItem value="falta">Falta</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            {dialogMode === 'view' ? (
              <>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Fechar</Button>
                <Button onClick={() => setDialogMode('edit')}>Editar Chamada</Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
                <Button onClick={() => savePresencas.mutate()} disabled={savePresencas.isPending || equipe.length === 0}>
                  <Save className="h-4 w-4 mr-2" /> 
                  {savePresencas.isPending ? 'Salvando...' : 'Salvar Chamada'}
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
