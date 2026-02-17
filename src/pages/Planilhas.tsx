import { PageHeader } from "@/components/PageHeader";
import { LinkCard } from "@/components/LinkCard";
import { Table2, Calculator, ClipboardList, BarChart3 } from "lucide-react";

const categories = [
  {
    category: "Orçamento",
    items: [
      {
        title: "Orçamento Geral de Obra",
        description: "Planilha completa com composição de custos, BDI e cronograma.",
        href: "https://docs.google.com/spreadsheets",
        icon: <Table2 className="h-4 w-4" />,
        tag: "Sheets",
      },
      {
        title: "Comparativo de Fornecedores",
        description: "Compare preços e condições de múltiplos fornecedores.",
        href: "https://docs.google.com/spreadsheets",
        icon: <BarChart3 className="h-4 w-4" />,
        tag: "Sheets",
      },
    ],
  },
  {
    category: "Medições",
    items: [
      {
        title: "Medição de Serviços",
        description: "Template para registro e acompanhamento de medições em obra.",
        href: "https://docs.google.com/spreadsheets",
        icon: <Calculator className="h-4 w-4" />,
        tag: "Sheets",
      },
      {
        title: "Controle de Materiais",
        description: "Planilha para gerenciar entrada e saída de materiais.",
        href: "https://docs.google.com/spreadsheets",
        icon: <ClipboardList className="h-4 w-4" />,
        tag: "Sheets",
      },
    ],
  },
];

const Planilhas = () => (
  <div className="animate-fade-in">
    <PageHeader
      title="Planilhas & Orçamentos"
      description="Templates organizados por categoria para gestão de obra."
    />
    {categories.map((cat) => (
      <div key={cat.category} className="mb-8">
        <h2 className="mb-3 text-sm font-medium text-foreground">{cat.category}</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {cat.items.map((item) => (
            <LinkCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    ))}
  </div>
);

export default Planilhas;
