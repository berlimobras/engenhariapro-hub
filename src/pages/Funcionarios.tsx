import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '@/contexts/AdminContext';
import { useFuncionarios, useCreateFuncionario, useUpdateFuncionario, useDeleteFuncionario } from '@/hooks/useFuncionarios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PageHeader } from '@/components/PageHeader';
import { toast } from 'sonner';
import { Plus, Trash2, Users, Pencil, Briefcase } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Funcionarios() {
  const { adminUser } = useAdmin();
  const { data: funcionarios = [], isLoading } = useFuncionarios(adminUser.companyId);
  const createFuncionario = useCreateFuncionario();
  const deleteFuncionario = useDeleteFuncionario();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    phone: '',
    email: '',
    photo_url: '',
    role: '',
    salary: '',
    payment_type: 'diaria',
  });

  // Agrupando funcionários por função
  const groupedFuncionarios = funcionarios.reduce((acc, func) => {
    const role = func.role?.trim() || 'Outros';
    if (!acc[role]) acc[role] = [];
    acc[role].push(func);
    return acc;
  }, {} as Record<string, typeof funcionarios>);
  
  const sortedRoles = Object.keys(groupedFuncionarios).sort();

  // The editing is now handled in the FuncionarioPerfil page
  // We only use the form here for CREATION

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este funcionário?')) {
      deleteFuncionario.mutate({ id, company_id: adminUser.companyId }, {
        onSuccess: () => toast.success('Funcionário excluído com sucesso!'),
        onError: (err: any) => toast.error('Erro ao excluir: ' + err.message)
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error('Nome do funcionário é obrigatório');
      return;
    }

    const payload = {
      company_id: adminUser.companyId,
      name: formData.name,
      cpf: formData.cpf || undefined,
      phone: formData.phone || undefined,
      email: formData.email || undefined,
      photo_url: formData.photo_url || undefined,
      role: formData.role || undefined,
      salary: formData.salary ? parseFloat(formData.salary) : undefined,
      payment_type: formData.payment_type,
    };

    createFuncionario.mutate(
      { ...payload, status: 'ativo' },
      {
        onSuccess: () => {
          toast.success('Funcionário adicionado com sucesso!');
          setFormData({ name: '', cpf: '', phone: '', email: '', photo_url: '', role: '', salary: '', payment_type: 'diaria' });
          setShowForm(false);
        },
        onError: (error: any) => {
          toast.error('Erro ao adicionar funcionário: ' + error.message);
        },
      }
    );
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Funcionários"
        description="Gerencie sua equipe de trabalho"
      />

      {/* Form */}
      {showForm && (
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Novo Funcionário</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Nome *</Label>
              <Input
                id="name"
                placeholder="Ex: João Silva"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1.5"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cpf">CPF</Label>
                <Input
                  id="cpf"
                  placeholder="000.000.000-00"
                  value={formData.cpf}
                  onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  placeholder="(11) 99999-9999"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="mt-1.5"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="joao@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="photo_url">Link da Foto (Opcional)</Label>
                <Input
                  id="photo_url"
                  placeholder="https://..."
                  value={formData.photo_url}
                  onChange={(e) => setFormData({ ...formData, photo_url: e.target.value })}
                  className="mt-1.5"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="role">Função</Label>
                <Input
                  id="role"
                  placeholder="Ex: Pedreiro, Eletricista"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label>Tipo de Pagamento</Label>
                <Select
                  value={formData.payment_type}
                  onValueChange={(val) => setFormData({ ...formData, payment_type: val })}
                >
                  <SelectTrigger className="mt-1.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="diaria">Por Diária</SelectItem>
                    <SelectItem value="fixo">Mensal Fixo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="salary">Valor Base (R$)</Label>
                <Input
                  id="salary"
                  type="number"
                  placeholder={formData.payment_type === 'diaria' ? "Ex: 150.00" : "Ex: 3000.00"}
                  value={formData.salary}
                  onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                  className="mt-1.5"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button type="submit" disabled={createFuncionario.isPending}>
                {createFuncionario.isPending ? 'Salvando...' : 'Adicionar Funcionário'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowForm(false);
                  setFormData({ name: '', cpf: '', phone: '', email: '', photo_url: '', role: '', salary: '', payment_type: 'diaria' });
                }}
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
          Novo Funcionário
        </Button>
      )}

      {/* List */}
      {isLoading ? (
        <div className="text-center py-12">Carregando funcionários...</div>
      ) : funcionarios.length === 0 ? (
        <div className="rounded-lg border border-border bg-card/50 p-12 text-center">
          <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4 opacity-50" />
          <p className="text-muted-foreground">Nenhum funcionário cadastrado</p>
          <p className="text-sm text-muted-foreground mt-2">
            Clique em "Novo Funcionário" para começar
          </p>
        </div>
      ) : (
        <div className="space-y-10">
          {sortedRoles.map(role => (
            <div key={role} className="space-y-4">
              <h3 className="text-xl font-black text-foreground flex items-center gap-2 border-b border-border/50 pb-2">
                <Briefcase className="w-5 h-5 text-primary" />
                {role}
                <span className="text-sm font-medium text-muted-foreground ml-2 bg-stone-100 px-2 py-0.5 rounded-full">{groupedFuncionarios[role].length}</span>
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {groupedFuncionarios[role].map((func) => (
                  <div
                    key={func.id}
                    onClick={() => navigate(`/funcionarios/${func.id}`)}
                    className="group relative flex flex-col items-center text-center rounded-3xl border border-border/50 bg-card p-5 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1 aspect-square"
                  >
                    <div className="w-20 h-20 rounded-full bg-stone-100 flex items-center justify-center mb-4 overflow-hidden ring-4 ring-white shadow-sm">
                      {func.photo_url ? (
                        <img src={func.photo_url} alt={func.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-2xl font-black text-stone-400">{func.name.charAt(0).toUpperCase()}</span>
                      )}
                    </div>
                    
                    <h3 className="font-bold text-foreground text-sm group-hover:text-primary transition-colors line-clamp-1">{func.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{func.phone || 'Sem telefone'}</p>
                    
                    <div className="mt-auto pt-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-xl text-[9px] uppercase tracking-wider font-black ${
                        func.status === 'ativo'
                          ? 'bg-emerald-100/80 text-emerald-700'
                          : 'bg-stone-100/80 text-stone-700'
                      }`}>
                        {func.status}
                      </span>
                    </div>

                    <button
                      className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-red-50 text-stone-400 hover:text-red-500 rounded-full shadow-sm backdrop-blur-sm transition-colors opacity-0 group-hover:opacity-100 z-10"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(func.id);
                      }}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
