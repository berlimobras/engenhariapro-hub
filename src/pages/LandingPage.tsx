import { Button } from '@/components/ui/button';
import { HardHat, ArrowRight, Check, AlertTriangle, XCircle, TrendingUp, Users, Bot, FileText, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();

  const plans = [
    {
      name: 'Mensal',
      price: 57,
      period: 'mês',
      description: 'Pagamento recorrente mês a mês',
      features: [
        'Acesso total às ferramentas',
        'Relatórios financeiros',
        'Cadastro de obras',
        'Cadastro de funcionários',
        'Inteligência Técnica liberada',
        'Modelos de planilhas e contratos',
      ],
      recommended: false,
    },
    {
      name: 'Anual',
      price: 57,
      period: 'mês',
      description: 'Pagamento único de R$ 684/ano',
      features: [
        'Todos os recursos do Mensal',
        '1 ano de acesso ininterrupto',
        'Suporte prioritário VIP',
        'Acesso a novos recursos em 1ª mão',
        'Sem surpresas na fatura mensal',
      ],
      recommended: true,
    },
  ];

  const handleCTA = () => {
    // Redireciona para o cadastro. 
    // Após logar, o sistema o jogará para dentro, onde ele poderá ir na aba de Planos.
    navigate('/register');
  };

  const dores = [
    "Não saber exatamente se uma obra está dando lucro ou prejuízo até o final.",
    "Perder o controle de quais funcionários estão ativos e quanto estão custando.",
    "Gastar horas tentando redigir contratos ou montar relatórios no computador.",
    "Ficar sem saber o que postar no Instagram para atrair novos clientes."
  ];

  const features = [
    {
      title: "Controle de Obras e Orçamento",
      desc: "Saiba quanto foi orçado e quanto já foi gasto em cada projeto com alertas visuais claros.",
      icon: <TrendingUp className="w-6 h-6 text-emerald-500" />
    },
    {
      title: "Gestão de Equipe",
      desc: "Cadastre funcionários, salários, cargos e saiba exatamente com quem você pode contar na obra.",
      icon: <Users className="w-6 h-6 text-blue-500" />
    },
    {
      title: "Inteligência Técnica Exclusiva",
      desc: "Agentes de IA (Engenheiros, Arquitetos) prontos para tirar dúvidas técnicas direto no sistema.",
      icon: <Bot className="w-6 h-6 text-purple-500" />
    },
    {
      title: "Contratos, Planilhas e Checklists",
      desc: "Acesso imediato a dezenas de modelos padrões prontos para download e uso na hora.",
      icon: <FileText className="w-6 h-6 text-orange-500" />
    },
    {
      title: "Marketing Descomplicado",
      desc: "Um gerador de imagens e dezenas de prompts de IA para bombar as redes sociais da sua empresa.",
      icon: <Smartphone className="w-6 h-6 text-pink-500" />
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 font-sans selection:bg-accent/30 text-slate-50">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-24 pb-32 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-semibold mb-6"
          >
            <HardHat className="w-4 h-4" />
            Feito para quem vive de projetos e obras
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight max-w-5xl mx-auto"
          >
            O fim da desorganização nas suas obras e na sua equipe.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Gerencie custos, acompanhe funcionários, acesse contratos prontos e use Inteligência Artificial para resolver problemas do dia a dia. 
            <strong className="text-slate-200"> Tudo em um sistema simples, criado para quem não tem tempo a perder.</strong>
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button 
              size="lg" 
              onClick={() => {
                document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-accent hover:bg-accent/90 text-white px-8 py-6 text-lg rounded-xl font-bold shadow-[0_0_40px_-10px_rgba(var(--accent),0.5)] transition-all hover:scale-105 w-full sm:w-auto"
            >
              Ver Planos
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/login')}
              className="border-slate-700 bg-transparent hover:bg-slate-800 text-slate-300 px-8 py-6 text-lg rounded-xl font-bold transition-all w-full sm:w-auto"
            >
              Já tenho conta
            </Button>
          </motion.div>
        </div>
      </section>

      {/* 2. DORES REAIS */}
      <section className="py-24 bg-slate-950 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Você se identifica com isso no dia a dia?</h2>
            <p className="text-slate-400 text-lg">A maioria dos construtores perde noites de sono por causa desses exatos problemas.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {dores.map((dor, i) => (
              <div key={i} className="bg-slate-900/50 border border-red-500/10 p-6 rounded-2xl flex items-start gap-4">
                <XCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
                <p className="text-slate-300 text-lg leading-relaxed">{dor}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. A SOLUÇÃO */}
      <section className="py-24 bg-slate-900/30 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">O "Obra do Mestre" centraliza todo o seu negócio.</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Nós criamos apenas as ferramentas que você realmente precisa usar na prática, sem menus confusos ou complexidade desnecessária.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feat, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 p-8 rounded-3xl hover:border-accent/30 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mb-6">
                  {feat.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feat.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PREÇOS */}
      <section id="pricing" className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Escolha o plano ideal para a sua empresa
            </h2>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-500">
              <AlertTriangle className="w-5 h-5" />
              <p className="font-medium text-sm">Acesso completo e imediato assim que assinar. Sem período grátis.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={plan.name}
                className={`relative rounded-3xl border transition-all ${
                  plan.recommended
                    ? 'border-accent bg-gradient-to-br from-accent/10 to-slate-900 ring-2 ring-accent shadow-[0_0_30px_-15px_rgba(var(--accent),0.5)]'
                    : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'
                } p-8 md:p-10`}
              >
                {plan.recommended && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <span className="inline-block bg-accent text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                      RECOMENDADO (MAIOR ECONOMIA)
                    </span>
                  </div>
                )}

                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-sm text-slate-400 mb-8 h-10">{plan.description}</p>

                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-slate-400 text-xl font-medium">R$</span>
                    <span className="text-5xl font-extrabold text-white">{plan.price}</span>
                    <span className="text-slate-400 font-medium">/{plan.period}</span>
                  </div>
                </div>

                <Button
                  onClick={handleCTA}
                  className={`w-full mb-10 py-6 rounded-xl text-lg font-bold flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] ${
                    plan.recommended
                      ? 'bg-accent hover:bg-accent/90 text-white'
                      : 'bg-white hover:bg-slate-100 text-slate-900'
                  }`}
                >
                  Criar Conta e Assinar
                  <ArrowRight className="w-5 h-5" />
                </Button>

                <div className="space-y-4">
                  <p className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">O que está incluso:</p>
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                      <span className="text-slate-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 bg-slate-950 py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-300">
            <HardHat className="w-6 h-6 text-accent" />
            <span className="text-xl font-bold">Obra do Mestre</span>
          </div>
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Obra do Mestre. Transformando a gestão na construção civil.
          </p>
        </div>
      </footer>
    </div>
  );
}
