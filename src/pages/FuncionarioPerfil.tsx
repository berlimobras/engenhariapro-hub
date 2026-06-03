import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAdmin } from '@/contexts/AdminContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Copy, User, Save, CheckCircle2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

export default function FuncionarioPerfil() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { adminUser } = useAdmin();
  const queryClient = useQueryClient();
  const [copiedPix, setCopiedPix] = useState(false);

  const { data: funcionario, isLoading } = useQuery({
    queryKey: ['funcionario', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('funcionarios')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!id
  });

  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    phone: '',
    email: '',
    role: '',
    salary: '',
    pix: '',
    observacoes: '',
    payment_type: 'diaria'
  });

  // Sync data to form once loaded
  if (funcionario && !formData.name && funcionario.name) {
    setFormData({
      name: funcionario.name || '',
      cpf: funcionario.cpf || '',
      phone: funcionario.phone || '',
      email: funcionario.email || '',
      role: funcionario.role || '',
      salary: funcionario.salary ? String(funcionario.salary) : '',
      pix: funcionario.pix || '',
      observacoes: funcionario.observacoes || '',
      payment_type: funcionario.payment_type || 'diaria'
    });
  }

  const updateFuncionario = useMutation({
    mutationFn: async (payload: any) => {
      const { error } = await supabase
        .from('funcionarios')
        .update(payload)
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('Perfil atualizado com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['funcionario', id] });
      queryClient.invalidateQueries({ queryKey: ['funcionarios'] });
    },
    onError: (err: any) => {
      toast.error('Erro ao atualizar: ' + err.message);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFuncionario.mutate({
      name: formData.name,
      cpf: formData.cpf,
      phone: formData.phone,
      email: formData.email,
      role: formData.role, // Pode conter múltiplas funções separadas por vírgula
      salary: formData.salary ? parseFloat(formData.salary) : null,
      pix: formData.pix,
      observacoes: formData.observacoes,
      payment_type: formData.payment_type
    });
  };

  const copyPix = () => {
    if (formData.pix) {
      navigator.clipboard.writeText(formData.pix);
      setCopiedPix(true);
      toast.success('Chave PIX copiada!');
      setTimeout(() => setCopiedPix(false), 2000);
    }
  };

  if (isLoading) {
    return <div className="text-center py-12">Carregando perfil...</div>;
  }

  if (!funcionario) {
    return (
      <div className="text-center py-12 space-y-4">
        <p className="text-muted-foreground">Funcionário não encontrado.</p>
        <Button onClick={() => navigate('/funcionarios')} variant="outline">Voltar</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/funcionarios')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <PageHeader
          title={funcionario.name}
          description="Perfil e edição do funcionário"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card className="rounded-2xl shadow-sm border-0 bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" /> Informações Pessoais
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Nome Completo</Label>
                    <Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div>
                    <Label>Função (pode colocar mais de uma)</Label>
                    <Input value={formData.role} placeholder="Ex: Pedreiro, Eletricista" onChange={e => setFormData({...formData, role: e.target.value})} />
                  </div>
                  <div>
                    <Label>CPF</Label>
                    <Input value={formData.cpf} onChange={e => setFormData({...formData, cpf: e.target.value})} />
                  </div>
                  <div>
                    <Label>Telefone</Label>
                    <Input value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                  </div>
                  <div>
                    <Label>Tipo de Pagamento</Label>
                    <Select
                      value={formData.payment_type}
                      onValueChange={(val) => setFormData({ ...formData, payment_type: val })}
                    >
                      <SelectTrigger className="mt-1.5 bg-background">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="diaria">Por Diária</SelectItem>
                        <SelectItem value="fixo">Mensal Fixo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Valor Base (R$)</Label>
                    <Input type="number" placeholder={formData.payment_type === 'diaria' ? "Ex: 150" : "Ex: 3000"} value={formData.salary} onChange={e => setFormData({...formData, salary: e.target.value})} className="mt-1.5" />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                  </div>
                </div>

                <div className="mt-4">
                  <Label>Chave PIX</Label>
                  <div className="flex gap-2 mt-1.5">
                    <Input value={formData.pix} placeholder="Ex: cpf, celular, email..." onChange={e => setFormData({...formData, pix: e.target.value})} />
                    <Button type="button" variant="secondary" onClick={copyPix} title="Copiar PIX" className="shrink-0">
                      {copiedPix ? <CheckCircle2 className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="mt-4">
                  <Label>Observações</Label>
                  <Textarea 
                    value={formData.observacoes} 
                    placeholder="Anotações extras, banco, acordos..." 
                    onChange={e => setFormData({...formData, observacoes: e.target.value})} 
                    className="h-24 resize-none mt-1.5"
                  />
                </div>

                <div className="pt-4">
                  <Button type="submit" className="gap-2" disabled={updateFuncionario.isPending}>
                    <Save className="h-4 w-4" /> 
                    {updateFuncionario.isPending ? 'Salvando...' : 'Salvar Alterações'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="rounded-2xl shadow-sm border-0 bg-card">
            <CardHeader>
              <CardTitle className="text-base">Histórico de Obras</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Em breve: Relatório cruzando em quais obras este funcionário está alocado e as diárias puxadas pelo sistema financeiro.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
