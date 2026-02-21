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
  TrendingUp,
  Users,
  Star,
} from "lucide-react";

const tools = [
  {
    title: "Planilha de Orçamento",
    description: "Template completo de orçamento para obras com cálculos automáticos.",
    icon: <FileSpreadsheet className="h-6 w-6" />,
    url: "https://docs.google.com/spreadsheets",
    tag: "Google Sheets",
  },
  {
    title: "Modelo de Contrato",
    description: "Contrato padrão para prestação de serviços de engenharia.",
    icon: <FileText className="h-6 w-6" />,
    url: "https://docs.google.com",
    tag: "Google Docs",
  },
  {
    title: "Templates Marketing",
    description: "Posts profissionais para Instagram e Facebook editáveis.",
    icon: <Megaphone className="h-6 w-6" />,
    url: "https://canva.com",
    tag: "Canva",
  },
  {
    title: "Assistente IA",
    description: "ChatGPT configurado para tirar dúvidas técnicas de engenharia.",
    icon: <Brain className="h-6 w-6" />,
    url: "https://chat.openai.com",
    tag: "ChatGPT",
  },
  {
    title: "Checklist de Obra",
    description: "Checklists completos para todas as etapas construtivas.",
    icon: <CheckSquare className="h-6 w-6" />,
    url: "https://notion.so",
    tag: "Notion",
  },
  {
    title: "Cálculo de Estruturas",
    description: "Planilhas para dimensionamento de vigas, pilares e lajes.",
    icon: <Wrench className="h-6 w-6" />,
    url: "https://docs.google.com/spreadsheets",
    tag: "Google Sheets",
  },
  {
    title: "Gestão de Projetos",
    description: "Quadro Kanban para gerenciar múltiplas obras simultaneamente.",
    icon: <Table2 className="h-6 w-6" />,
    url: "https://trello.com",
    tag: "Trello",
  },
  {
    title: "Memorial Descritivo",
    description: "Template profissional de memorial descritivo para projetos.",
    icon: <HardHat className="h-6 w-6" />,
    url: "https://docs.google.com",
    tag: "Google Docs",
  },
];

const stats = [
  { label: "Ferramentas", value: "8+", icon: <Star className="h-5 w-5" />, color: "#FF6B9D" },
  { label: "Projetos Ativos", value: "12", icon: <TrendingUp className="h-5 w-5" />, color: "#6C63FF" },
  { label: "Membros", value: "340", icon: <Users className="h-5 w-5" />, color: "#4CAF50" },
];

const Dashboard = () => {
  return (
    <div className="space-y-8">

      {/* Hero Section */}
      <div
        className="relative overflow-hidden rounded-3xl p-7 text-white"
        style={{ background: "linear-gradient(135deg, #6C63FF 0%, #9b59b6 60%, #c0392b 100%)" }}
      >
        {/* Decorative circles */}
        <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/10" />
        <div className="absolute -right-4 top-16 h-24 w-24 rounded-full bg-white/5" />
        <div className="absolute bottom-0 left-1/3 h-32 w-32 rounded-full bg-white/5" />

        <div className="relative">
          <p className="text-purple-200 text-sm font-medium mb-1">Olá, Engenheiro! 👋</p>
          <h1 className="text-3xl font-extrabold mb-2 leading-tight">
            Hub Engenharia Pro
          </h1>
          <p className="text-purple-100 text-sm max-w-lg leading-relaxed mb-6">
            Acesse todas as ferramentas que você precisa para gerenciar suas obras com excelência e eficiência.
          </p>

          <div className="flex gap-3 flex-wrap">
            <button
              className="inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-bold text-purple-700 transition-all hover:scale-105 active:scale-95"
              style={{ background: "white" }}
            >
              🚀 Explorar ferramentas
            </button>
            <button
              className="inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-bold text-white border border-white/30 transition-all hover:bg-white/10"
            >
              📖 Ver Tutoriais
            </button>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-3xl bg-white p-4 flex items-center gap-3"
            style={{ boxShadow: "0 6px 24px rgba(108,99,255,0.10)" }}
          >
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-white"
              style={{ background: stat.color }}
            >
              {stat.icon}
            </div>
            <div>
              <p className="text-xl font-extrabold text-gray-800">{stat.value}</p>
              <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tools Grid */}
      <div>
        {/* Section title */}
        <div className="flex items-center gap-3 mb-5">
          <div
            className="h-7 w-1.5 rounded-full"
            style={{ background: "linear-gradient(180deg, #6C63FF, #FF6B9D)" }}
          />
          <h2 className="text-lg font-bold text-gray-800">Ferramentas Disponíveis</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tools.map((tool) => (
            <ToolCard key={tool.title} {...tool} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
