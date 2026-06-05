import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { HardHat, ArrowRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';

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
      price: 684,
      currency: 'BRL',
      period: 'ano',
      description: 'Economia e tranquilidade o ano todo',
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur">
        <div className="max-w-screen-xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center">
                <HardHat className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">ObraDoMestre</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Logado como: <span className="text-foreground font-semibold">{user?.email}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-screen-xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Escolha seu Plano
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Comece com 14 dias grátis. Sem cartão de crédito obrigatório.
          </p>

          {/* Trial info */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block rounded-lg border border-accent/20 bg-accent/5 px-6 py-3"
          >
            <p className="text-sm text-foreground">
              ✨ Você tem <span className="font-bold">14 dias gratuitos</span> para explorar todos os recursos
            </p>
          </motion.div>
        </div>

        {/* Plans grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-2xl border transition-all ${
                plan.recommended
                  ? 'border-accent bg-gradient-to-br from-accent/10 to-accent/5 ring-2 ring-accent'
                  : 'border-border bg-card hover:border-accent/50'
              } p-8`}
            >
              {plan.recommended && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="inline-block bg-accent text-white text-xs font-bold px-4 py-1 rounded-full">
                    RECOMENDADO
                  </span>
                </div>
              )}

              <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
              <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>

              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
              </div>

              <Button
                onClick={() => handleSubscribe(plan.name)}
                disabled={loading}
                className={`w-full mb-8 py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 ${
                  plan.recommended
                    ? 'bg-accent hover:bg-accent/90 text-white'
                    : 'bg-primary/10 hover:bg-primary/20 text-foreground border border-primary/20'
                }`}
              >
                {loading ? 'Processando...' : 'Assinar agora'}
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
            </motion.div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground text-center mb-12">Dúvidas?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-2">
                Posso mudar de plano depois?
              </h3>
              <p className="text-sm text-muted-foreground">
                Sim! Você pode fazer upgrade ou downgrade a qualquer momento. A cobrança será ajustada proporcionalmente.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-2">
                O que acontece após os 14 dias?
              </h3>
              <p className="text-sm text-muted-foreground">
                Você precisará escolher um plano pago para continuar usando o sistema. Sem plano ativo, apenas leitura.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-2">
                Há descontos anuais?
              </h3>
              <p className="text-sm text-muted-foreground">
                Sim! Pagando anualmente, você economiza 20% em comparação com a cobrança mensal.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-2">
                Como funciona o reembolso?
              </h3>
              <p className="text-sm text-muted-foreground">
                Garantia de 30 dias! Se não gostar, devolvemos 100% do seu dinheiro. Sem perguntas.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border bg-card/50 backdrop-blur mt-20">
        <div className="max-w-screen-xl mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          © 2026 ObraDoMestre. Todos os direitos reservados.
        </div>
      </div>
    </div>
  );
}
