import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { HardHat, ArrowRight } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      toast.error(error.message || 'Erro ao fazer login');
    } else {
      toast.success('Login realizado com sucesso!');
      navigate('/');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center">
              <HardHat className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">ObraDoMestre</span>
          </div>
        </div>

        {/* Card */}
        <div className="bg-card border border-border rounded-2xl p-8 shadow-2xl">
          <h1 className="text-2xl font-bold text-foreground mb-2">Bem-vindo</h1>
          <p className="text-sm text-muted-foreground mb-8">
            Faça login para continuar sua jornada
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="mt-1.5"
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-sm font-medium">
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="mt-1.5"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full mt-6 bg-accent hover:bg-accent/90 text-white font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2"
            >
              {loading ? 'Entrando...' : 'Entrar'}
              {!loading && <ArrowRight className="h-4 w-4" />}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground text-center">
              Não tem conta?{' '}
              <Link to="/auth/register" className="text-accent hover:text-accent/80 font-semibold">
                Registre-se aqui
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-8">
          © 2026 ObraDoMestre. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
}
