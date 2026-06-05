import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ArrowRight, Check } from 'lucide-react';

export default function Planos() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const plans = [
    {
      name: 'Mensal',
      price: 57,
      currency: 'BRL',
      period: 'mês',
      description: 'Acesso completo, pagamento mensal',
      features: [
        'Acesso total às ferramentas',
        'Relatórios financeiros',
        'Cadastro de obras',
        'Cadastro de funcionários',
        'Inteligência Técnica liberada',
        'Suporte por email',
      ],
      recommended: false,
    },
    {
      name: 'Anual',
      price: 57,
      currency: 'BRL',
      period: 'mês',
      description: 'Pagamento único de R$ 684/ano',
      features: [
        'Todos os recursos do Mensal',
        '1 ano de acesso ininterrupto',
        'Suporte prioritário VIP',
        'Acesso a novos recursos',
        'Sem surpresas na fatura mensal',
      ],
      recommended: true,
    },
  ];

  const handleSubscribe = async (planName: string) => {
    setLoading(true);
    try {
      if (!user) {
        toast.error('Você precisa estar logado para assinar.');
        return;
      }
      
      const response = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planName,
          userId: user.id,
          userEmail: user.email,
          returnUrl: window.location.origin,
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error(data.error || 'Erro ao criar sessão de pagamento');
      }
    } catch (error) {
      console.error(error);
      toast.error('Erro ao processar pagamento');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto pt-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">Desbloqueie o Sistema Completo</h1>
        <p className="text-muted-foreground">Assine agora e tenha acesso ilimitado a todas as ferramentas e IA.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative rounded-2xl border transition-all ${
              plan.recommended
                ? 'border-accent bg-accent/5 ring-2 ring-accent'
                : 'border-border bg-card'
            } p-8`}
          >
            {plan.recommended && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="inline-block bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">
                  RECOMENDADO
                </span>
              </div>
            )}

            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
            <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>

            <div className="mb-8">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-foreground">R$ {plan.price}</span>
                <span className="text-muted-foreground">/{plan.period}</span>
              </div>
            </div>

            <Button
              onClick={() => handleSubscribe(plan.name)}
              disabled={loading}
              className={`w-full mb-8 py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 ${
                plan.recommended
                  ? 'bg-accent hover:bg-accent/90 text-white'
                  : ''
              }`}
            >
              {loading ? 'Redirecionando...' : 'Assinar Agora'}
              <ArrowRight className="h-4 w-4" />
            </Button>

            <div className="space-y-3">
              {plan.features.map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
