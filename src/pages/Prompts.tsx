import { PageHeader } from "@/components/PageHeader";
import { LinkCard } from "@/components/LinkCard";
import { BookOpen, Hammer, Ruler, HardHat } from "lucide-react";
import { useState } from "react";

const allPrompts = [
  {
    title: "Cálculo de Materiais",
    description: "Prompts para calcular quantidades de areia, cimento, brita e ferro.",
    href: "https://notion.so",
    icon: <Ruler className="h-4 w-4" />,
    tag: "Cálculos",
  },
  {
    title: "Orçamento Detalhado",
    description: "Prompts para gerar orçamentos completos com IA.",
    href: "https://notion.so",
    icon: <BookOpen className="h-4 w-4" />,
    tag: "Orçamento",
  },
  {
    title: "Laudos e Relatórios",
    description: "Prompts para gerar estrutura de laudos técnicos.",
    href: "https://notion.so",
    icon: <HardHat className="h-4 w-4" />,
    tag: "Relatórios",
  },
  {
    title: "Planejamento de Obra",
    description: "Prompts para criar cronogramas e sequência de etapas.",
    href: "https://notion.so",
    icon: <Hammer className="h-4 w-4" />,
    tag: "Planejamento",
  },
];

const tags = ["Todos", "Cálculos", "Orçamento", "Relatórios", "Planejamento"];

const Prompts = () => {
  const [activeTag, setActiveTag] = useState("Todos");

  const filtered = activeTag === "Todos" ? allPrompts : allPrompts.filter((p) => p.tag === activeTag);

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Biblioteca de Prompts"
        description="Prompts otimizados para usar com assistentes de IA."
      />

      <div className="mb-6 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              activeTag === tag
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-accent"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {filtered.map((p) => (
          <LinkCard key={p.title} {...p} />
        ))}
      </div>
    </div>
  );
};

export default Prompts;
