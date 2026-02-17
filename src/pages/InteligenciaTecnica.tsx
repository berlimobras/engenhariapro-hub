import { PageHeader } from "@/components/PageHeader";
import { LinkCard } from "@/components/LinkCard";
import { Brain, MessageSquare, Lightbulb, Calculator } from "lucide-react";

const assistants = [
  {
    title: "Assistente Estrutural",
    description: "Especialista em cálculos e normas estruturais. Tire dúvidas sobre vigas, pilares e fundações.",
    href: "https://chat.openai.com",
    icon: <Brain className="h-4 w-4" />,
    tag: "ChatGPT",
  },
  {
    title: "Assistente de Orçamento",
    description: "Ajuda com estimativas de custo, levantamento de materiais e composições de BDI.",
    href: "https://chat.openai.com",
    icon: <Calculator className="h-4 w-4" />,
    tag: "ChatGPT",
  },
  {
    title: "Consultor de Normas",
    description: "Consulte normas ABNT, NBRs e regulamentações técnicas com IA especializada.",
    href: "https://chat.openai.com",
    icon: <Lightbulb className="h-4 w-4" />,
    tag: "ChatGPT",
  },
  {
    title: "Assistente Geral",
    description: "Chat livre para qualquer dúvida relacionada à construção civil.",
    href: "https://chat.openai.com",
    icon: <MessageSquare className="h-4 w-4" />,
    tag: "ChatGPT",
  },
];

const InteligenciaTecnica = () => (
  <div className="animate-fade-in">
    <PageHeader
      title="Inteligência Técnica"
      description="Assistentes de IA especializados em engenharia civil."
    />
    <div className="grid gap-3 sm:grid-cols-2">
      {assistants.map((a) => (
        <LinkCard key={a.title} {...a} />
      ))}
    </div>
  </div>
);

export default InteligenciaTecnica;
