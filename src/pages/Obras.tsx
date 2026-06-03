import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAdmin } from '@/contexts/AdminContext';
import { useObras, useCreateObra, useDeleteObra } from '@/hooks/useObras';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PageHeader } from '@/components/PageHeader';
import { toast } from 'sonner';
import { Plus, Trash2, Building2, ArrowRight } from 'lucide-react';

export default function Obras() {
  const { adminUser } = useAdmin();
  const { data: obras = [], isLoading } = useObras(adminUser.companyId);
  const createObra = useCreateObra();
  const deleteObra = useDeleteObra();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    client_name: '',
    budget_estimated: '',
  });

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta obra?')) {
      deleteObra.mutate({ id, company_id: adminUser.companyId }, {
        onSuccess: () => toast.success('Obra excluída com sucesso!'),
        onError: (err: any) => toast.error('Erro ao excluir: ' + err.message)
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error('Nome da obra é obrigatório');
      return;
    }

    createObra.mutate(
      {
        company_id: adminUser.companyId,
        name: formData.name,
        address: formData.address || undefined,
        client_name: formData.client_name || undefined,
        budget_estimated: formData.budget_estimated ? parseFloat(formData.budget_estimated) : undefined,
        status: 'planejamento',
      },
      {
        onSuccess: () => {
          toast.success('Obra criada com sucesso!');
          setFormData({ name: '', address: '', client_name: '', budget_estimated: '' });
          setShowForm(false);
        },
        onError: (error: any) => {
          toast.error('Erro ao criar obra: ' + error.message);
        },
      }
    );
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Obras"
        description="Gerencie todas as suas obras e projetos"
      />

      {/* Form */}
      {showForm && (
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="text-lg font-semibold mb-4">Nova Obra</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Nome da Obra *</Label>
              <Input
                id="name"
                placeholder="Ex: Condomínio Residencial A"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="address">Endereço</Label>
              <Input
                id="address"
                placeholder="Ex: Rua Principal, 123"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="client">Cliente</Label>
              <Input
                id="client"
                placeholder="Ex: João da Silva"
                value={formData.client_name}
                onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="budget">Orçamento Estimado (R$)</Label>
              <Input
                id="budget"
                type="number"
                placeholder="Ex: 50000.00"
                value={formData.budget_estimated}
                onChange={(e) => setFormData({ ...formData, budget_estimated: e.target.value })}
                className="mt-1.5"
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit" disabled={createObra.isPending}>
                {createObra.isPending ? 'Salvando...' : 'Salvar Obra'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowForm(false)}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Button */}
      {!showForm && (
        <Button onClick={() => setShowForm(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Nova Obra
        </Button>
      )}

      {/* List */}
      {isLoading ? (
        <div className="text-center py-12">Carregando obras...</div>
      ) : obras.length === 0 ? (
        <div className="rounded-2xl border border-border/50 bg-card/30 p-12 text-center shadow-sm">
          <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4 opacity-30" />
          <p className="text-muted-foreground font-medium">Nenhuma obra cadastrada</p>
          <p className="text-sm text-muted-foreground mt-1">
            Clique em "Nova Obra" para começar
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {obras.map((obra) => (
            <div
              key={obra.id}
              className="rounded-2xl border-0 shadow-sm bg-card p-5 flex items-start justify-between hover-lift transition-all"
            >
              <div className="flex-1">
                <h3 className="text-lg font-bold text-foreground mb-1">{obra.name}</h3>
                {obra.address && (
                  <p className="text-sm text-muted-foreground mb-1">{obra.address}</p>
                )}
                {obra.client_name && (
                  <p className="text-sm text-muted-foreground mb-1">Cliente: <span className="font-medium text-foreground/80">{obra.client_name}</span></p>
                )}
                {obra.budget_estimated && (
                  <p className="text-sm text-muted-foreground mb-3">
                    Orçamento: <span className="font-semibold text-foreground">R$ {obra.budget_estimated.toLocaleString('pt-BR')}</span>
                  </p>
                )}
                <span className={`inline-flex px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                  obra.status === 'em_andamento'
                    ? 'bg-emerald-100/80 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400'
                    : obra.status === 'planejamento'
                    ? 'bg-blue-100/80 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400'
                    : 'bg-gray-100/80 text-gray-700 dark:bg-gray-500/20 dark:text-gray-400'
                }`}>
                  {obra.status.replace(/_/g, ' ')}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/obras/${obra.id}`}>
                    Gerenciar <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive"
                  onClick={() => handleDelete(obra.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
