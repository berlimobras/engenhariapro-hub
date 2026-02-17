import { ExternalToolCard } from "@/components/ExternalToolCard";
import {
  Brain,
  Table2,
  FileText,
  Megaphone,
  CheckSquare,
  Wrench,
  FileSpreadsheet,
  HardHat,
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

const Dashboard = () => {
  return (
    <div className="animate-fade-in space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 text-white">
        <div className="absolute inset-0 bg-grid-white/[0.05]" />
        <div className="relative">
          <h1 className="mb-2 text-3xl font-bold">Hub Engenharia Pro</h1>
          <p className="text-slate-300 max-w-2xl">
            Acesse todas as ferramentas que você precisa para gerenciar suas obras com excelência.
          </p>
        </div>
      </div>

      {/* Tools Grid */}
      <div>
        <h2 className="mb-6 text-xl font-semibold text-foreground">
          Ferramentas Disponíveis
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tools.map((tool) => (
            <ExternalToolCard key={tool.title} {...tool} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
