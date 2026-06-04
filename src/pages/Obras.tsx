import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAdmin } from '@/contexts/AdminContext';
import { useObras, useCreateObra, useDeleteObra } from '@/hooks/useObras';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PageHeader } from '@/components/PageHeader';
import { toast } from 'sonner';
import { Plus, Trash2, Building2, ImageIcon, MapPin, LockKeyhole } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { UpgradeModal } from '@/components/UpgradeModal';

export default function Obras() {
  const { adminUser } = useAdmin();
  const { data: obras = [], isLoading } = useObras(adminUser.companyId);
  const createObra = useCreateObra();
  const deleteObra = useDeleteObra();
  const navigate = useNavigate();
  const { isSubscribed } = useSubscription();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    client_name: '',
    budget_estimated: '',
    image_url: '',
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
        image_url: formData.image_url || undefined,
        status: 'planejamento',
      },
      {
        onSuccess: () => {
          toast.success('Obra criada com sucesso!');
          setFormData({ name: '', address: '', client_name: '', budget_estimated: '', image_url: '' });
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
              <Label htmlFor="image_url">Link da Foto Principal</Label>
              <Input
                id="image_url"
                placeholder="Ex: https://site.com/foto-da-obra.jpg"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {obras.map((obra) => (
            <div
              key={obra.id}
              onClick={() => {
                if (!isSubscribed) {
                  setShowUpgradeModal(true);
                } else {
                  navigate(`/obras/${obra.id}`);
                }
              }}
              className="group relative flex flex-col rounded-3xl border border-border/50 bg-card overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1 aspect-[4/5]"
            >
              {!isSubscribed && (
                <div className="absolute inset-0 z-20 bg-background/80 backdrop-blur-[2px] flex items-center justify-center transition-all group-hover:bg-background/90">
                  <div className="bg-amber-500 text-white p-3 rounded-full shadow-lg">
                    <LockKeyhole className="w-6 h-6" />
                  </div>
                </div>
              )}
              {/* Image Header */}
              <div className="h-2/5 w-full bg-stone-100 relative overflow-hidden">
                {obra.image_url ? (
                  <img src={obra.image_url} alt={obra.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-stone-300 group-hover:bg-stone-200 transition-colors duration-500">
                    <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">Sem Imagem</span>
                  </div>
                )}
                {/* Delete button absolutely positioned */}
                <button
                  className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-red-50 text-stone-400 hover:text-red-500 rounded-full shadow-sm backdrop-blur-sm transition-colors opacity-0 group-hover:opacity-100 z-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(obra.id);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-5">
                <div className="mb-auto">
                  <h3 className="text-xl font-black text-foreground tracking-tight leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">{obra.name}</h3>
                  {obra.address && (
                    <p className="text-sm text-muted-foreground flex items-center gap-1.5 line-clamp-1 mb-2 font-medium">
                      <MapPin className="w-3.5 h-3.5" />
                      {obra.address}
                    </p>
                  )}
                </div>
                
                <div className="mt-4 pt-4 border-t border-border/50">
                  {obra.budget_estimated && (
                    <p className="text-xs text-muted-foreground mb-3 font-semibold tracking-wide uppercase">
                      Orçamento: <span className="font-bold text-foreground block mt-0.5 text-base normal-case tracking-normal">R$ {obra.budget_estimated.toLocaleString('pt-BR')}</span>
                    </p>
                  )}
                  <span className={`inline-flex px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                    obra.status === 'em_andamento'
                      ? 'bg-emerald-100/80 text-emerald-700'
                      : obra.status === 'planejamento'
                      ? 'bg-blue-100/80 text-blue-700'
                      : 'bg-stone-100/80 text-stone-700'
                  }`}>
                    {obra.status.replace(/_/g, ' ')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <UpgradeModal 
        isOpen={showUpgradeModal} 
        onClose={() => setShowUpgradeModal(false)} 
        featureName="Acesso as Obras e Relatórios"
      />
    </div>
  );
}
