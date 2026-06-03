import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Pickaxe, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // User Data
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Company Data
  const [companyName, setCompanyName] = useState('');
  const [averageProjects, setAverageProjects] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (!name || !email || !password) {
        toast.error('Preencha todos os campos pessoais');
        return;
      }
      setStep(2);
      return;
    }

    try {
      setLoading(true);
      
      // 1. Criar usuário no Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          }
        }
      });

      if (authError) throw authError;

      if (!authData.user) {
        throw new Error('Falha ao criar usuário.');
      }

      // 2. Criar a Empresa vinculada a este usuário (owner_id)
      const { data: companyData, error: companyError } = await supabase
        .from('companies')
        .insert({
          owner_id: authData.user.id,
          name: companyName,
          // Vamos salvar a média de obras no campo 'description' ou website provisoriamente
          website: averageProjects ? `Média de Obras: ${averageProjects}` : null
        })
        .select('id')
        .single();

      if (companyError) throw companyError;

      toast.success('Conta criada com sucesso! Bem-vindo(a).');
      navigate('/');
      
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-stone-900 text-orange-500 p-3 rounded-lg flex items-center justify-center">
              <Pickaxe className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-black uppercase tracking-tighter text-stone-900 leading-none m-0">SISTEMA</h1>
              <h1 className="text-3xl font-black uppercase tracking-widest text-orange-600 leading-none m-0">GESTÃO</h1>
            </div>
          </div>
        </div>

        <Card className="rounded-2xl border-stone-200 shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Criar sua conta</CardTitle>
            <CardDescription className="text-center">
              {step === 1 ? 'Primeiro, conte-nos sobre você' : 'Agora, detalhes da sua Construtora/Empresa'}
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleRegister}>
            <CardContent className="space-y-4">
              
              {step === 1 && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input 
                      id="name" 
                      placeholder="João da Silva" 
                      required 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="seu@email.com" 
                      required 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Senha</Label>
                    <Input 
                      id="password" 
                      type="password"
                      placeholder="Mínimo 6 caracteres"
                      required
                      minLength={6}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Nome da Empresa</Label>
                    <Input 
                      id="companyName" 
                      placeholder="Ex: Construtora Silva" 
                      required 
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="averageProjects">Média de Obras (por mês)</Label>
                    <Input 
                      id="averageProjects" 
                      type="number"
                      placeholder="Ex: 5" 
                      required 
                      value={averageProjects}
                      onChange={(e) => setAverageProjects(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Logo da Empresa (Opcional)</Label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center text-stone-500 cursor-not-allowed bg-stone-50">
                      <p className="text-sm">Upload de logo em breve. Você poderá alterar sua logo dentro do sistema.</p>
                    </div>
                  </div>
                </>
              )}

            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700" disabled={loading}>
                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                {step === 1 ? 'Avançar' : (loading ? 'Criando Conta...' : 'Finalizar Cadastro')}
              </Button>
              {step === 2 && (
                <Button type="button" variant="ghost" onClick={() => setStep(1)} disabled={loading}>
                  Voltar
                </Button>
              )}
              {step === 1 && (
                <div className="text-center text-sm text-stone-500">
                  Já tem uma conta?{' '}
                  <Link to="/login" className="text-orange-600 hover:underline font-semibold">
                    Fazer login
                  </Link>
                </div>
              )}
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
