import { useState } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { useObras, useCreateObra } from '@/hooks/useObras';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PageHeader } from '@/components/PageHeader';
import { toast } from 'sonner';
import { Plus, Trash2, Building2, Zap } from 'lucide-react';
import { seedDatabase } from '@/lib/seedData';

export default function Obras() {
  const { adminUser } = useAdmin();
  const { data: obras = [], isLoading, refetch } = useObras(adminUser.companyId);
  const createObra = useCreateObra();
  const [showForm, setShowForm] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    client_name: '',
    budget_estimated: '',
  });

  const handlePopulateExamples = async () => {
    setIsSeeding(true);
    const result = await seedDatabase(adminUser.companyId);
    setIsSeeding(false);

    if (result.success) {
      toast.success('Dados de exemplo adicionados com sucesso!');
      refetch();
    } else {
      toast.error('Erro ao adicionar dados de exemplo');
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

      {/* Buttons */}
      {!showForm && (
        <div className="flex gap-2">
          <Button onClick={() => setShowForm(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Nova Obra
          </Button>
          <Button
            onClick={handlePopulateExamples}
            disabled={isSeeding}
            variant="outline"
            className="gap-2"
          >
            <Zap className="h-4 w-4" />
            {isSeeding ? 'Carregando exemplos...' : 'Carregar Exemplos'}
          </Button>
        </div>
      )}

      {/* List */}
      {isLoading ? (
        <div className="text-center py-12">Carregando obras...</div>
      ) : obras.length === 0 ? (
        <div className="rounded-lg border border-border bg-card/50 p-12 text-center">
          <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4 opacity-50" />
          <p className="text-muted-foreground">Nenhuma obra cadastrada</p>
          <p className="text-sm text-muted-foreground mt-2">
            Clique em "Nova Obra" para começar
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {obras.map((obra) => (
            <div
              key={obra.id}
              className="rounded-lg border border-border bg-card p-4 flex items-start justify-between"
            >
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{obra.name}</h3>
                {obra.address && (
                  <p className="text-sm text-muted-foreground">{obra.address}</p>
                )}
                {obra.client_name && (
                  <p className="text-sm text-muted-foreground">Cliente: {obra.client_name}</p>
                )}
                {obra.budget_estimated && (
                  <p className="text-sm text-muted-foreground">
                    Orçamento: R$ {obra.budget_estimated.toLocaleString('pt-BR')}
                  </p>
                )}
                <span className={`inline-block mt-2 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  obra.status === 'em_andamento'
                    ? 'bg-green-100 text-green-700'
                    : obra.status === 'planejamento'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {obra.status.replace(/_/g, ' ')}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
