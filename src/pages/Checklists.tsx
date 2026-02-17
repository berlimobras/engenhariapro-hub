import { PageHeader } from "@/components/PageHeader";
import { LinkCard } from "@/components/LinkCard";
import { CheckSquare, Shovel, Droplets, Zap, Paintbrush } from "lucide-react";

const checklists = [
  {
    title: "Checklist de Fundação",
    description: "Todas as etapas de conferência para fase de fundação.",
    href: "https://notion.so",
    icon: <Shovel className="h-4 w-4" />,
    tag: "Notion",
  },
  {
    title: "Checklist Hidráulico",
    description: "Conferência completa de instalações hidráulicas.",
    href: "https://notion.so",
    icon: <Droplets className="h-4 w-4" />,
    tag: "Notion",
  },
  {
    title: "Checklist Elétrico",
    description: "Verificação de instalações elétricas antes do fechamento.",
    href: "https://notion.so",
    icon: <Zap className="h-4 w-4" />,
    tag: "Notion",
  },
  {
    title: "Checklist de Acabamento",
    description: "Conferência final de pintura, pisos e revestimentos.",
    href: "https://notion.so",
    icon: <Paintbrush className="h-4 w-4" />,
    tag: "Notion",
  },
];

const Checklists = () => (
  <div className="animate-fade-in">
    <PageHeader
      title="Organização & Checklists"
      description="Checklists duplicáveis para cada fase da obra."
    />
    <div className="grid gap-3 sm:grid-cols-2">
      {checklists.map((c) => (
        <LinkCard key={c.title} {...c} />
      ))}
    </div>
  </div>
);

export default Checklists;
