import { useState } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { useFuncionarios, useCreateFuncionario } from '@/hooks/useFuncionarios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PageHeader } from '@/components/PageHeader';
import { toast } from 'sonner';
import { Plus, Trash2, Users, Zap } from 'lucide-react';
import { seedDatabase } from '@/lib/seedData';

export default function Funcionarios() {
  const { adminUser } = useAdmin();
  const { data: funcionarios = [], isLoading, refetch } = useFuncionarios(adminUser.companyId);
  const createFuncionario = useCreateFuncionario();
  const [showForm, setShowForm] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    phone: '',
    email: '',
    role: '',
    salary: '',
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
      toast.error('Nome do funcionário é obrigatório');
      return;
    }

    createFuncionario.mutate(
      {
        company_id: adminUser.companyId,
        name: formData.name,
        cpf: formData.cpf || undefined,
        phone: formData.phone || undefined,
        email: formData.email || undefined,
        role: formData.role || undefined,
        salary: formData.salary ? parseFloat(formData.salary) : undefined,
        status: 'ativo',
      },
      {
        onSuccess: () => {
          toast.success('Funcionário adicionado com sucesso!');
          setFormData({ name: '', cpf: '', phone: '', email: '', role: '', salary: '' });
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
        <div className="rounded-lg border border-border bg-card p-6">
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
                <Label htmlFor="salary">Salário (R$)</Label>
                <Input
                  id="salary"
                  type="number"
                  placeholder="Ex: 3000.00"
                  value={formData.salary}
                  onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                  className="mt-1.5"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button type="submit" disabled={createFuncionario.isPending}>
                {createFuncionario.isPending ? 'Salvando...' : 'Salvar Funcionário'}
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
            Novo Funcionário
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
              className="rounded-lg border border-border bg-card p-4 flex items-start justify-between"
            >
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{func.name}</h3>
                {func.role && (
                  <p className="text-sm text-muted-foreground">Função: {func.role}</p>
                )}
                {func.phone && (
                  <p className="text-sm text-muted-foreground">Tel: {func.phone}</p>
                )}
                {func.salary && (
                  <p className="text-sm text-muted-foreground">
                    Salário: R$ {func.salary.toLocaleString('pt-BR')}
                  </p>
                )}
                <span className={`inline-block mt-2 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  func.status === 'ativo'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {func.status}
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
