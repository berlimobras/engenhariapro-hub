import { motion } from "framer-motion";
import { ToolCard } from "@/components/ToolCard";
import {
  Brain,
  Table2,
  FileText,
  Megaphone,
  CheckSquare,
  Wrench,
  FileSpreadsheet,
  HardHat,
  ArrowRight,
  Zap,
  FolderOpen,
  Users,
} from "lucide-react";

const tools = [
  {
    title: "Planilha de Orçamento",
    description: "Template completo de orçamento para obras com cálculos automáticos.",
    icon: <FileSpreadsheet className="h-5 w-5" />,
    url: "https://docs.google.com/spreadsheets",
    tag: "Google Sheets",
  },
  {
    title: "Modelo de Contrato",
    description: "Contrato padrão para prestação de serviços de engenharia.",
    icon: <FileText className="h-5 w-5" />,
    url: "https://docs.google.com",
    tag: "Google Docs",
  },
  {
    title: "Templates Marketing",
    description: "Posts profissionais para Instagram e Facebook editáveis no Canva.",
    icon: <Megaphone className="h-5 w-5" />,
    url: "https://canva.com",
    tag: "Canva",
  },
  {
    title: "Assistente IA",
    description: "ChatGPT configurado para dúvidas técnicas de engenharia civil.",
    icon: <Brain className="h-5 w-5" />,
    url: "https://chat.openai.com",
    tag: "ChatGPT",
  },
  {
    title: "Checklist de Obra",
    description: "Checklists completos para todas as etapas construtivas.",
    icon: <CheckSquare className="h-5 w-5" />,
    url: "https://notion.so",
    tag: "Notion",
  },
  {
    title: "Cálculo de Estruturas",
    description: "Planilhas para dimensionamento de vigas, pilares e lajes.",
    icon: <Wrench className="h-5 w-5" />,
    url: "https://docs.google.com/spreadsheets",
    tag: "Google Sheets",
  },
  {
    title: "Gestão de Projetos",
    description: "Quadro Kanban para gerenciar múltiplas obras simultaneamente.",
    icon: <Table2 className="h-5 w-5" />,
    url: "https://trello.com",
    tag: "Trello",
  },
  {
    title: "Memorial Descritivo",
    description: "Template profissional de memorial descritivo para projetos.",
    icon: <HardHat className="h-5 w-5" />,
    url: "https://docs.google.com",
    tag: "Google Docs",
  },
];

const stats = [
  {
    label: "Ferramentas",
    value: "8+",
    icon: <Zap className="h-4 w-4" />,
    bg: "bg-accent/10 dark:bg-accent/15",
    iconBg: "bg-accent",
  },
  {
    label: "Projetos",
    value: "12",
    icon: <FolderOpen className="h-4 w-4" />,
    bg: "bg-primary/6 dark:bg-primary/20",
    iconBg: "bg-primary",
  },
  {
    label: "Membros",
    value: "340",
    icon: <Users className="h-4 w-4" />,
    bg: "bg-green-50 dark:bg-green-900/20",
    iconBg: "bg-green-500",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] } },
};

const Dashboard = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-8 pb-4"
    >
      {/* ── Hero Banner ─────────────────────────────────── */}
      <motion.div
        variants={itemVariants}
        className="relative overflow-hidden rounded-2xl p-7 md:p-9 text-white"
        style={{
          background: "linear-gradient(135deg, #001f3d 0%, #003a70 55%, #00509e 100%)",
        }}
      >
        {/* Decorative blur circles */}
        <div className="pointer-events-none absolute -right-12 -top-12 h-56 w-56 rounded-full bg-white/5 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-8 right-1/3 h-40 w-40 rounded-full bg-accent/20 blur-2xl" />

        <div className="relative max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/15 px-3 py-1 text-xs font-semibold text-accent mb-4">
            <Zap className="h-3 w-3" />
            Hub Premium Ativo
          </span>

          <h1 className="text-2xl sm:text-3xl font-extrabold leading-tight mb-3">
            Hub Engenharia Pro
          </h1>
          <p className="text-sm sm:text-base text-blue-200/80 leading-relaxed mb-6 max-w-xl">
            Acesse todas as ferramentas que você precisa para gerenciar suas obras
            com excelência e eficiência profissional.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-primary bg-white shadow-md
                         hover:bg-orange-50 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
            >
              Explorar ferramentas
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
            <button
              className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white
                         border border-white/20 bg-white/8 hover:bg-white/15 backdrop-blur-sm
                         hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
            >
              Ver tutoriais
            </button>
          </div>
        </div>
      </motion.div>

      {/* ── Stats Row ───────────────────────────────────── */}
      <motion.div variants={itemVariants} className="grid grid-cols-3 gap-3 sm:gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className={`rounded-2xl border border-border ${s.bg} p-4 flex items-center gap-3 transition-all hover:shadow-card`}
          >
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${s.iconBg} text-white shadow-sm`}>
              {s.icon}
            </div>
            <div className="min-w-0">
              <p className="text-xl font-extrabold text-foreground leading-none">{s.value}</p>
              <p className="text-[11px] text-muted-foreground font-medium mt-0.5">{s.label}</p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* ── Tools Grid ──────────────────────────────────── */}
      <motion.div variants={itemVariants}>
        {/* Section header */}
        <div className="flex items-center justify-between mb-5">
          <div className="section-title mb-0">
            <h2 className="text-base font-bold text-foreground">Ferramentas Disponíveis</h2>
          </div>
          <button className="text-xs font-semibold text-accent hover:text-accent/80 transition-colors flex items-center gap-1">
            Ver todas <ArrowRight className="h-3 w-3" />
          </button>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.title}
              variants={itemVariants}
              custom={i}
            >
              <ToolCard {...tool} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
