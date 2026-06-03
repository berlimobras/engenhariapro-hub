import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, Plus, Trash2, Save, X } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAdmin } from '@/contexts/AdminContext';
import { toast } from 'sonner';

export default function ObraEquipe({ obra }: { obra: any }) {
  const { adminUser } = useAdmin();
  const queryClient = useQueryClient();
  const [showAdd, setShowAdd] = useState(false);
  const [selectedFunc, setSelectedFunc] = useState('');
  const [selectedPaymentType, setSelectedPaymentType] = useState('diaria');
  const [dailyRate, setDailyRate] = useState('');
  const [extraValue, setExtraValue] = useState('');
  const [notes, setNotes] = useState(''); // If we need to add notes to the allocation

  // Buscar todos os funcionários da empresa
  const { data: todosFuncionarios = [] } = useQuery({
    queryKey: ['funcionarios', adminUser.companyId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('funcionarios')
        .select('*')
        .eq('company_id', adminUser.companyId)
        .eq('status', 'ativo');
      if (error) throw error;
      return data;
    }
  });

  // Buscar equipe alocada na obra
  const { data: equipe = [], isLoading } = useQuery({
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

  const alocarMembro = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from('obra_funcionarios')
        .insert({
          obra_id: obra.id,
          funcionario_id: selectedFunc,
          start_date: new Date().toISOString().split('T')[0],
          daily_rate: dailyRate ? parseFloat(dailyRate) : 0,
          extra_value: extraValue ? parseFloat(extraValue) : 0
        });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('Membro alocado com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['obra_equipe', obra.id] });
      setShowAdd(false);
      setSelectedFunc('');
      setDailyRate('');
      setExtraValue('');
    },
    onError: (err: any) => toast.error('Erro ao alocar membro: ' + err.message)
  });

  const removerMembro = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('obra_funcionarios')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('Membro removido da obra!');
      queryClient.invalidateQueries({ queryKey: ['obra_equipe', obra.id] });
    }
  });

  const handleAlocar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFunc) {
      toast.error('Selecione um funcionário');
      return;
    }
    alocarMembro.mutate();
  };

  // Filtrar funcionários que já estão na obra para não mostrar no Select
  const funcionariosDisponiveis = todosFuncionarios.filter(
    (f: any) => !equipe.some((eq: any) => eq.funcionario_id === f.id)
  );

  const handleSelectFunc = (val: string) => {
    setSelectedFunc(val);
    const func = todosFuncionarios.find((f: any) => f.id === val);
    if (func && func.salary) {
      setDailyRate(String(func.salary));
      setSelectedPaymentType(func.payment_type || 'diaria');
    } else {
      setDailyRate('');
      setSelectedPaymentType('diaria');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" /> Equipe Alocada
        </h3>
        {!showAdd && (
          <Button onClick={() => setShowAdd(true)} size="sm" className="rounded-full">
            <Plus className="h-4 w-4 mr-1" /> Adicionar Membro
          </Button>
        )}
      </div>

      {showAdd && (
        <Card className="rounded-2xl border-primary/20 bg-primary/5 shadow-none">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-center">
              <CardTitle className="text-base font-semibold text-primary">Alocar novo funcionário na obra</CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setShowAdd(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAlocar} className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Selecione o Funcionário</Label>
                  <Select value={selectedFunc} onValueChange={handleSelectFunc}>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Escolher..." />
                    </SelectTrigger>
                    <SelectContent>
                      {funcionariosDisponiveis.map((f: any) => (
                        <SelectItem key={f.id} value={f.id}>
                          {f.name} {f.role ? `(${f.role})` : ''}
                        </SelectItem>
                      ))}
                      {funcionariosDisponiveis.length === 0 && (
                        <SelectItem value="none" disabled>Todos já alocados</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Valor Base - {selectedPaymentType === 'diaria' ? 'Diária' : 'Mensal Fixo'} (R$)</Label>
                  <Input 
                    type="number" 
                    placeholder="Ex: 150" 
                    value={dailyRate} 
                    onChange={e => setDailyRate(e.target.value)} 
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Bônus / Extra Fixo (R$)</Label>
                  <Input 
                    type="number" 
                    placeholder="Ex: 500" 
                    value={extraValue} 
                    onChange={e => setExtraValue(e.target.value)} 
                    className="bg-background"
                  />
                  <p className="text-[10px] text-muted-foreground">Opcional. Adicionado no fechamento.</p>
                </div>
              </div>
              <div className="pt-2">
                <Button type="submit" disabled={alocarMembro.isPending}>
                  {alocarMembro.isPending ? 'Salvando...' : 'Confirmar Alocação'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {isLoading ? (
          <p className="text-center py-8 text-muted-foreground">Carregando equipe...</p>
        ) : equipe.length === 0 ? (
          <Card className="rounded-2xl shadow-sm border-dashed">
            <CardContent className="py-12 text-center text-muted-foreground">
              <Users className="h-10 w-10 mx-auto opacity-20 mb-3" />
              Nenhum funcionário alocado nesta obra ainda. <br />
              Clique no botão acima para puxar os funcionários do seu sistema para esta obra.
            </CardContent>
          </Card>
        ) : (
          equipe.map((membro: any) => (
            <Card key={membro.id} className="rounded-2xl border-0 shadow-sm bg-card">
              <CardContent className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="font-bold text-lg">{membro.funcionario?.name}</div>
                  <div className="text-sm text-muted-foreground font-medium">Função principal: {membro.funcionario?.role || 'Não definido'}</div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right text-sm bg-muted/50 px-4 py-2 rounded-xl">
                    <div className="text-foreground font-semibold">Diária: <span className="text-primary">R$ {membro.daily_rate}</span></div>
                    {membro.extra_value > 0 && (
                      <div className="text-emerald-600 font-bold text-xs mt-1">+ R$ {membro.extra_value} extra acordado</div>
                    )}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive shrink-0"
                    onClick={() => {
                      if(confirm('Remover membro desta obra?')) removerMembro.mutate(membro.id);
                    }}
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
