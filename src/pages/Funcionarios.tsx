import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '@/contexts/AdminContext';
import { useFuncionarios, useCreateFuncionario, useUpdateFuncionario, useDeleteFuncionario } from '@/hooks/useFuncionarios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PageHeader } from '@/components/PageHeader';
import { toast } from 'sonner';
import { Plus, Trash2, Users, Pencil } from 'lucide-react';
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
    role: '',
    salary: '',
    payment_type: 'diaria',
  });

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
      role: formData.role || undefined,
      salary: formData.salary ? parseFloat(formData.salary) : undefined,
      payment_type: formData.payment_type,
    };

    createFuncionario.mutate(
      { ...payload, status: 'ativo' },
      {
        onSuccess: () => {
          toast.success('Funcionário adicionado com sucesso!');
          setFormData({ name: '', cpf: '', phone: '', email: '', role: '', salary: '', payment_type: 'diaria' });
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
                  setFormData({ name: '', cpf: '', phone: '', email: '', role: '', salary: '', payment_type: 'diaria' });
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
        <div className="grid gap-4">
          {funcionarios.map((func) => (
            <div
              key={func.id}
              onClick={() => navigate(`/funcionarios/${func.id}`)}
              className="rounded-2xl border border-border/50 bg-card p-5 flex items-start justify-between cursor-pointer hover:border-primary/30 hover:shadow-md transition-all group"
            >
              <div className="flex-1">
                <h3 className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors">{func.name}</h3>
                {func.role && (
                  <p className="text-sm text-muted-foreground mt-1 font-medium">{func.role}</p>
                )}
                <div className="flex gap-4 mt-2">
                  {func.phone && (
                    <p className="text-sm text-muted-foreground">Tel: {func.phone}</p>
                  )}
                  {func.salary && (
                    <p className="text-sm text-muted-foreground">
                      {func.payment_type === 'diaria' ? 'Diária Base' : 'Salário Base'}: R$ {func.salary.toLocaleString('pt-BR')}
                    </p>
                  )}
                </div>
                <span className={`inline-block mt-3 px-2.5 py-0.5 rounded-full text-[11px] uppercase tracking-wider font-bold ${
                  func.status === 'ativo'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-stone-100 text-stone-700'
                }`}>
                  {func.status}
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                  onClick={(e) => {
                    e.stopPropagation(); // Evita navegar pra página de perfil
                    handleDelete(func.id);
                  }}
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
