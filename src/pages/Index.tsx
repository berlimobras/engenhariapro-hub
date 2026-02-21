import { motion } from "framer-motion";
import { ToolCard } from "@/components/ToolCard";
import {
  Brain, Table2, FileText, Megaphone, CheckSquare, Wrench,
  FileSpreadsheet, HardHat, ArrowRight, Zap, FolderOpen, Users, Bell,
} from "lucide-react";

/* ─── Data ─────────────────────────────────────────────── */
const tools = [
  { title: "Planilha de Orçamento", description: "Template completo de orçamento para obras com cálculos automáticos e fórmulas pré-configuradas.", icon: <FileSpreadsheet className="h-6 w-6" />, url: "https://docs.google.com/spreadsheets", tag: "Google Sheets" },
  { title: "Modelo de Contrato", description: "Contrato padrão para prestação de serviços de engenharia civil.", icon: <FileText className="h-6 w-6" />, url: "https://docs.google.com", tag: "Google Docs" },
  { title: "Templates Marketing", description: "Posts profissionais para Instagram e Facebook editáveis no Canva.", icon: <Megaphone className="h-6 w-6" />, url: "https://canva.com", tag: "Canva" },
  { title: "Assistente IA", description: "ChatGPT configurado para dúvidas técnicas de engenharia civil.", icon: <Brain className="h-6 w-6" />, url: "https://chat.openai.com", tag: "ChatGPT" },
  { title: "Checklist de Obra", description: "Checklists completos para todas as etapas construtivas do projeto.", icon: <CheckSquare className="h-6 w-6" />, url: "https://notion.so", tag: "Notion" },
  { title: "Cálculo de Estruturas", description: "Planilhas para dimensionamento de vigas, pilares e lajes de concreto.", icon: <Wrench className="h-6 w-6" />, url: "https://docs.google.com/spreadsheets", tag: "Google Sheets" },
  { title: "Gestão de Projetos", description: "Quadro Kanban para gerenciar múltiplas obras simultaneamente.", icon: <Table2 className="h-6 w-6" />, url: "https://trello.com", tag: "Trello" },
  { title: "Memorial Descritivo", description: "Template profissional de memorial descritivo para projetos de engenharia.", icon: <HardHat className="h-6 w-6" />, url: "https://docs.google.com", tag: "Google Docs" },
];

const stats = [
  { label: "Ferramentas", value: "8+", icon: <Zap className="h-5 w-5" />, color: "bg-accent" },
  { label: "Projetos Ativos", value: "12", icon: <FolderOpen className="h-5 w-5" />, color: "bg-primary" },
  { label: "Membros", value: "340+", icon: <Users className="h-5 w-5" />, color: "bg-emerald-500" },
  { label: "Novidades", value: "3", icon: <Bell className="h-5 w-5" />, color: "bg-sky-500" },
];

/* ─── Animations ────────────────────────────────────────── */
const fade = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ─── Component ─────────────────────────────────────────── */
const Dashboard = () => (
  <div className="space-y-8 pb-6">

    {/* ══════════════════════════════════════════
        HERO BANNER
    ══════════════════════════════════════════ */}
    <motion.section
      variants={fade}
      initial="hidden"
      animate="show"
      className="relative overflow-hidden rounded-3xl text-white"
      style={{ background: "linear-gradient(135deg, #001020 0%, #001f3d 50%, #003a70 100%)" }}
    >
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute top-0 right-0 w-80 h-80 rounded-full opacity-30"
        style={{ background: "radial-gradient(circle, #ff8c00 0%, transparent 70%)", transform: "translate(40%, -40%)" }} />
      <div className="pointer-events-none absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, #ffffff 0%, transparent 70%)", transform: "translate(-30%, 40%)" }} />

      <div className="relative px-7 py-9 md:px-10 md:py-11 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        {/* Text */}
        <div className="max-w-xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/15 px-4 py-1.5 text-xs font-bold text-accent mb-5">
            <Zap className="h-3.5 w-3.5" />
            Hub Premium Ativo
          </div>

          <h1 className="text-3xl sm:text-4xl font-black leading-[1.15] mb-4">
            Bem-vindo ao<br />
            <span className="text-accent">Hub Engenharia Pro</span>
          </h1>
          <p className="text-blue-200/75 text-sm sm:text-base leading-relaxed mb-7 max-w-lg">
            Todas as ferramentas, templates e recursos que você precisa para gerenciar obras com
            excelência e profissionalismo.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3">
            <button className="inline-flex items-center gap-2.5 rounded-xl px-6 py-3 text-sm font-bold text-primary bg-white shadow-lg hover:bg-orange-50 hover:scale-[1.03] active:scale-[0.97] transition-all duration-200">
              Explorar Ferramentas
              <ArrowRight className="h-4 w-4" />
            </button>
            <button className="inline-flex items-center gap-2.5 rounded-xl px-6 py-3 text-sm font-semibold text-white border border-white/20 bg-white/10 hover:bg-white/18 hover:scale-[1.03] active:scale-[0.97] transition-all duration-200">
              Ver Tutoriais
            </button>
          </div>
        </div>

        {/* Right visual card */}
        <div className="hidden md:flex md:flex-col gap-3 shrink-0 w-56">
          {stats.slice(0, 3).map((s) => (
            <div key={s.label} className="flex items-center gap-3 rounded-2xl bg-white/8 border border-white/10 px-4 py-3 backdrop-blur-sm">
              <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${s.color} text-white shadow-sm`}>
                {s.icon}
              </div>
              <div>
                <p className="text-lg font-black text-white leading-none">{s.value}</p>
                <p className="text-[10px] text-blue-200/60 font-medium mt-0.5">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>

    {/* ══════════════════════════════════════════
        STATS ROW (mobile)
    ══════════════════════════════════════════ */}
    <motion.div
      variants={fade}
      initial="hidden"
      animate="show"
      custom={1}
      className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:hidden"
    >
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          variants={fade}
          custom={i * 0.5 + 1}
          className="rounded-2xl border border-border bg-card p-4 flex items-center gap-3 hover:shadow-card transition-shadow"
        >
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${s.color} text-white shadow-sm`}>
            {s.icon}
          </div>
          <div>
            <p className="text-xl font-black text-foreground leading-none">{s.value}</p>
            <p className="text-[10px] text-muted-foreground font-medium mt-0.5">{s.label}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>

    {/* ══════════════════════════════════════════
        TOOLS GRID
    ══════════════════════════════════════════ */}
    <section>
      {/* Section header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="h-7 w-1 rounded-full bg-accent" />
          <h2 className="text-lg font-bold text-foreground">Ferramentas Disponíveis</h2>
          <span className="rounded-full bg-accent/10 border border-accent/20 px-2.5 py-0.5 text-xs font-bold text-accent">
            {tools.length}
          </span>
        </div>
        <button className="text-xs font-semibold text-accent hover:text-accent/70 flex items-center gap-1 transition-colors">
          Ver todas <ArrowRight className="h-3 w-3" />
        </button>
      </div>

      {/* Cards grid — 2 columns on mobile, 3 on md, 4 on xl */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {tools.map((tool, i) => (
          <motion.div key={tool.title} variants={fade} initial="hidden" animate="show" custom={i * 0.5 + 2}>
            <ToolCard {...tool} />
          </motion.div>
        ))}
      </div>
    </section>

  </div>
);

export default Dashboard;
