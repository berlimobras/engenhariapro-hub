import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { HardHat, ArrowRight, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Onboarding() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [companyName, setCompanyName] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handleCreateCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from('companies').insert({
        owner_id: user?.id,
        name: companyName,
        cnpj,
        email,
        phone,
        address,
      });

      if (error) {
        toast.error(error.message || 'Erro ao criar empresa');
      } else {
        toast.success('Empresa criada com sucesso!');
        navigate('/planos');
      }
    } catch (error) {
      toast.error('Erro ao criar empresa');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center">
              <HardHat className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">ObraDoMestre</span>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="flex gap-2 mb-12 justify-center">
          <div
            className={`h-2 rounded-full transition-all ${
              step >= 1 ? 'w-12 bg-accent' : 'w-2 bg-border'
            }`}
          />
          <div
            className={`h-2 rounded-full transition-all ${
              step >= 2 ? 'w-12 bg-accent' : 'w-2 bg-border'
            }`}
          />
        </div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-2xl p-8 shadow-2xl"
        >
          {step === 1 && (
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="h-10 w-10 rounded-lg bg-accent/20 flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Criar Empresa</h1>
                  <p className="text-sm text-muted-foreground mt-1">
                    Passo 1 de 2 — Informações básicas
                  </p>
                </div>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-4">
                <div>
                  <Label htmlFor="companyName" className="text-sm font-medium">
                    Nome da Empresa *
                  </Label>
                  <Input
                    id="companyName"
                    type="text"
                    placeholder="Construtora ABC"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    disabled={loading}
                    className="mt-1.5"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="cnpj" className="text-sm font-medium">
                    CNPJ
                  </Label>
                  <Input
                    id="cnpj"
                    type="text"
                    placeholder="00.000.000/0000-00"
                    value={cnpj}
                    onChange={(e) => setCnpj(e.target.value)}
                    disabled={loading}
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="contato@empresa.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-sm font-medium">
                    Telefone
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(11) 9999-9999"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={loading}
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="address" className="text-sm font-medium">
                    Endereço
                  </Label>
                  <Input
                    id="address"
                    type="text"
                    placeholder="Rua Exemplo, 123"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    disabled={loading}
                    className="mt-1.5"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full mt-6 bg-accent hover:bg-accent/90 text-white font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2"
                >
                  Próximo
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            </div>
          )}

          {step === 2 && (
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Tudo pronto!</h1>
              <p className="text-sm text-muted-foreground mb-8">
                Escolha um plano para começar a usar o ObraDoMestre
              </p>

              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Sua empresa <span className="font-semibold text-foreground">{companyName}</span> foi criada com sucesso.
                </p>

                <div className="rounded-lg border border-accent/20 bg-accent/5 p-4">
                  <p className="text-sm text-foreground">
                    Você terá acesso a uma <span className="font-semibold">avaliação gratuita de 14 dias</span> antes de precisar escolher um plano pago.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <Button
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="flex-1"
                  disabled={loading}
                >
                  Voltar
                </Button>
                <Button
                  onClick={handleCreateCompany}
                  disabled={loading}
                  className="flex-1 bg-accent hover:bg-accent/90 text-white font-semibold"
                >
                  {loading ? 'Criando...' : 'Criar Empresa'}
                </Button>
              </div>
            </div>
          )}
        </motion.div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-8">
          © 2026 ObraDoMestre. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
}
