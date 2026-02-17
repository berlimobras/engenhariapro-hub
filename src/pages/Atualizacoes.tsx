import { PageHeader } from "@/components/PageHeader";
import { motion } from "framer-motion";
import { Sparkles, Wrench, FileText } from "lucide-react";

const updates = [
  {
    date: "10 Fev 2026",
    title: "Novos templates de Marketing",
    description: "Adicionamos 4 novos templates editáveis no Canva para divulgação profissional.",
    icon: <Sparkles className="h-4 w-4" />,
    type: "Novo",
  },
  {
    date: "05 Fev 2026",
    title: "Melhoria na organização de Planilhas",
    description: "Planilhas agora organizadas por categoria: Orçamento e Medições.",
    icon: <Wrench className="h-4 w-4" />,
    type: "Melhoria",
  },
  {
    date: "01 Fev 2026",
    title: "Biblioteca de Prompts lançada",
    description: "Nova seção com prompts otimizados para assistentes de IA.",
    icon: <FileText className="h-4 w-4" />,
    type: "Novo",
  },
];

const Atualizacoes = () => (
  <div className="animate-fade-in">
    <PageHeader
      title="Atualizações"
      description="Novidades e melhorias da plataforma."
    />
    <div className="space-y-4">
      {updates.map((u, i) => (
        <motion.div
          key={i}
          className="flex gap-4 rounded-lg border border-border bg-card p-4"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-secondary text-muted-foreground">
            {u.icon}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-medium text-foreground">{u.title}</span>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                u.type === "Novo"
                  ? "bg-primary/10 text-primary"
                  : "bg-secondary text-muted-foreground"
              }`}>
                {u.type}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">{u.description}</p>
            <p className="mt-1.5 text-[11px] text-muted-foreground/70">{u.date}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

export default Atualizacoes;
