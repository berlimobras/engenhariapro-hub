import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { PackageSearch, Plus, Receipt, Trash2, Edit2, Minus } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAdmin } from '@/contexts/AdminContext';
import { toast } from 'sonner';

export default function ObraMateriais({ obra }: { obra: any }) {
  const { adminUser } = useAdmin();
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [consumeModal, setConsumeModal] = useState<{isOpen: boolean, mat: any, qty: string}>({ isOpen: false, mat: null, qty: '' });
  
  const [formData, setFormData] = useState({
    material_name: '',
    quantity: '',
    unit_cost: '',
    used_quantity: '',
  });

  // Buscar materiais cadastrados nesta obra
  const { data: obraMateriais = [], isLoading } = useQuery({
    queryKey: ['obra_materiais', obra.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('obra_materiais')
        .select('*, material:materiais(*)')
        .eq('obra_id', obra.id)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    }
  });

  const saveMaterial = useMutation({
    mutationFn: async () => {
      let materialId = '';

      // 1. Procurar se o material já existe no catálogo
      const { data: existingMat } = await supabase
        .from('materiais')
        .select('id')
        .eq('company_id', adminUser.companyId)
        .ilike('name', formData.material_name)
        .single();

      if (existingMat) {
        materialId = existingMat.id;
      } else {
        // 2. Se não existir, criar no catálogo
        const { data: newMat, error: matError } = await supabase
          .from('materiais')
          .insert({
            company_id: adminUser.companyId,
            name: formData.material_name,
            category: 'geral'
          })
          .select('id')
          .single();
        if (matError) throw matError;
        materialId = newMat.id;
      }

      // 3. Salvar na obra_materiais
      if (editingId) {
        const { error } = await supabase
          .from('obra_materiais')
          .update({
            quantity: parseFloat(formData.quantity),
            used_quantity: parseFloat(formData.used_quantity) || 0,
            unit_cost: parseFloat(formData.unit_cost)
          })
          .eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('obra_materiais')
          .insert({
            obra_id: obra.id,
            material_id: materialId,
            quantity: parseFloat(formData.quantity),
            used_quantity: parseFloat(formData.used_quantity) || 0,
            unit_cost: parseFloat(formData.unit_cost),
            status: 'entregue'
          });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success(editingId ? 'Material atualizado!' : 'Material adicionado ao estoque!');
      queryClient.invalidateQueries({ queryKey: ['obra_materiais', obra.id] });
      queryClient.invalidateQueries({ queryKey: ['dashboard_metrics'] });
      resetForm();
    },
    onError: (err: any) => toast.error('Erro ao salvar: ' + err.message)
  });

  const deleteMaterial = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('obra_materiais').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('Registro apagado!');
      queryClient.invalidateQueries({ queryKey: ['obra_materiais', obra.id] });
      queryClient.invalidateQueries({ queryKey: ['dashboard_metrics'] });
    }
  });

  const handleConsume = useMutation({
    mutationFn: async ({ id, used_quantity, consumeAmount }: { id: string, used_quantity: number, consumeAmount: number }) => {
      const { error } = await supabase
        .from('obra_materiais')
        .update({ used_quantity: used_quantity + consumeAmount })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('Consumo registrado!');
      queryClient.invalidateQueries({ queryKey: ['obra_materiais', obra.id] });
    }
  });

  const resetForm = () => {
    setFormData({ material_name: '', quantity: '', unit_cost: '', used_quantity: '' });
    setShowForm(false);
    setEditingId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.material_name || !formData.quantity || !formData.unit_cost) {
      toast.error('Preencha os campos obrigatórios');
      return;
    }
    saveMaterial.mutate();
  };

  const handleEdit = (item: any) => {
    setFormData({
      material_name: item.material?.name || '',
      quantity: String(item.quantity),
      unit_cost: String(item.unit_cost),
      used_quantity: String(item.used_quantity || 0)
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <PackageSearch className="h-5 w-5 text-primary" /> Estoque de Materiais
        </h3>
        {!showForm && (
          <Button onClick={() => setShowForm(true)} size="sm" className="rounded-full">
            <Plus className="h-4 w-4 mr-1" /> Adicionar Material
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {showForm && (
          <Card className="rounded-2xl border-primary/20 bg-primary/5 shadow-none max-w-3xl">
            <CardHeader className="pb-4 border-b border-border/50">
              <CardTitle className="text-base font-semibold text-primary">
                {editingId ? 'Editar Material' : 'Nova Entrada de Material'}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label>Nome do Material *</Label>
                  <Input 
                    placeholder="Ex: Cimento CP II, Areia Média..." 
                    value={formData.material_name}
                    onChange={e => setFormData({...formData, material_name: e.target.value})}
                    disabled={!!editingId} // Não permite mudar o nome ao editar (para simplificar)
                    className="bg-background mt-1.5"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Qtd. Comprada *</Label>
                    <Input 
                      type="number" 
                      placeholder="Ex: 50" 
                      value={formData.quantity}
                      onChange={e => setFormData({...formData, quantity: e.target.value})}
                      className="bg-background mt-1.5"
                    />
                  </div>
                  <div>
                    <Label>Custo Unitário (R$) *</Label>
                    <Input 
                      type="number" 
                      step="0.01"
                      placeholder="Ex: 35.90" 
                      value={formData.unit_cost}
                      onChange={e => setFormData({...formData, unit_cost: e.target.value})}
                      className="bg-background mt-1.5"
                    />
                  </div>
                  <div>
                    <Label>Qtd. Já Usada</Label>
                    <Input 
                      type="number" 
                      placeholder="Ex: 0" 
                      value={formData.used_quantity}
                      onChange={e => setFormData({...formData, used_quantity: e.target.value})}
                      className="bg-background mt-1.5"
                    />
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button type="submit" disabled={saveMaterial.isPending}>
                    {saveMaterial.isPending ? 'Salvando...' : 'Salvar Estoque'}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>Cancelar</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {isLoading ? (
          <p className="text-center py-8 text-muted-foreground">Carregando estoque...</p>
        ) : obraMateriais.length === 0 ? (
          <Card className="rounded-2xl border-dashed shadow-sm">
            <CardContent className="py-12 text-center text-muted-foreground">
              <Receipt className="h-10 w-10 mx-auto opacity-20 mb-3" />
              Nenhum material no estoque desta obra. <br />
              Adicione os materiais comprados para controlar o consumo e o custo total da obra.
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {obraMateriais.map((mat: any) => {
              const estoqueRestante = mat.quantity - (mat.used_quantity || 0);
              const valorTotal = mat.quantity * mat.unit_cost;
              const percentualUsado = Math.min(100, Math.round(((mat.used_quantity || 0) / mat.quantity) * 100));

              return (
                <div key={mat.id} className="flex flex-col justify-between p-4 rounded-xl border border-border bg-card shadow-sm hover:border-primary/30 transition-all">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-bold text-foreground text-lg">{mat.material?.name}</h4>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        Registrado em {new Date(mat.created_at).toLocaleDateString('pt-BR')} às {new Date(mat.created_at).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={() => handleEdit(mat)}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => {
                        if(confirm('Apagar material do estoque? O valor será removido do custo financeiro.')) deleteMaterial.mutate(mat.id);
                      }}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                    <div className="bg-muted/30 rounded-lg p-2">
                      <p className="text-[10px] uppercase text-muted-foreground font-bold">Comprado</p>
                      <p className="font-semibold">{mat.quantity}</p>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-2">
                      <p className="text-[10px] uppercase text-muted-foreground font-bold">Consumido</p>
                      <p className="font-semibold text-rose-600">{mat.used_quantity || 0}</p>
                    </div>
                    <div className="bg-primary/5 rounded-lg p-2">
                      <p className="text-[10px] uppercase text-primary font-bold">Em Estoque</p>
                      <p className="font-bold text-primary text-lg leading-none mt-1">{estoqueRestante}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-border/50 pt-3">
                    <div className="flex items-center gap-2">
                      <Button 
                        size="sm" 
                        variant="secondary" 
                        className="h-8 gap-1 rounded-full text-xs"
                        onClick={() => {
                          setConsumeModal({ isOpen: true, mat: mat, qty: '' });
                        }}
                      >
                        <Minus className="h-3 w-3" /> Registrar Consumo
                      </Button>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-muted-foreground uppercase font-semibold">Custo Total</p>
                      <p className="font-bold text-foreground">R$ {valorTotal.toLocaleString('pt-BR')}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Dialog open={consumeModal.isOpen} onOpenChange={(open) => setConsumeModal({ ...consumeModal, isOpen: open })}>
        <DialogContent className="sm:max-w-[400px] rounded-2xl border-primary/20 bg-card">
          <DialogHeader>
            <DialogTitle>Registrar Consumo</DialogTitle>
            <DialogDescription>
              Material: <strong>{consumeModal.mat?.material?.name}</strong>
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label>Quantidade Consumida</Label>
            <Input 
              type="number"
              placeholder="Ex: 5"
              value={consumeModal.qty}
              onChange={(e) => setConsumeModal({ ...consumeModal, qty: e.target.value })}
              className="mt-2 bg-background"
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConsumeModal({ isOpen: false, mat: null, qty: '' })}>
              Cancelar
            </Button>
            <Button onClick={() => {
              if(consumeModal.qty && !isNaN(Number(consumeModal.qty))) {
                handleConsume.mutate({ 
                  id: consumeModal.mat.id, 
                  used_quantity: consumeModal.mat.used_quantity || 0, 
                  consumeAmount: Number(consumeModal.qty) 
                });
                setConsumeModal({ isOpen: false, mat: null, qty: '' });
              }
            }}>
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
