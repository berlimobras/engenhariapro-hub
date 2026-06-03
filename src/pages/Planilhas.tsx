import { PageHeader } from "@/components/PageHeader";
import { LinkCard } from "@/components/LinkCard";
import { Table2, Calculator, ClipboardList, BarChart3 } from "lucide-react";

const categories = [
  {
    category: "Projetos",
    items: [
      {
        title: "[8.0] Sobrado com Projeto",
        description: "Planilha completa para modelo de Sobrado.",
        href: "https://docs.google.com/spreadsheets/d/1dKxpnfaCG0GP7r1IIMcVmNUQS4e_7o70p_VRTHz4Exk/edit?usp=sharing",
        icon: <Table2 className="h-4 w-4" />,
        tag: "Sheets",
      },
      {
        title: "[8.0] Casa Térrea com Projeto",
        description: "Planilha completa para modelo de Casa Térrea.",
        href: "https://docs.google.com/spreadsheets/d/1O7te5NoKiAwpnQPtlwX3wkXTFVaKje12gmDtQKBZSl8/edit?usp=sharing",
        icon: <Table2 className="h-4 w-4" />,
        tag: "Sheets",
      },
    ],
  },
  {
    category: "Simulações",
    items: [
      {
        title: "[8.0] SIMULAÇÃO Casa térrea",
        description: "Planilha de Simulação para Casa Térrea.",
        href: "https://docs.google.com/spreadsheets/d/1borMwBsf3ykGoxn4zQnZiJMODaoNg_lkatgGFHzU3r4/edit?usp=sharing",
        icon: <Calculator className="h-4 w-4" />,
        tag: "Sheets",
      },
      {
        title: "[8.0] SIMULAÇÃO Sobrados",
        description: "Planilha de Simulação para Sobrados.",
        href: "https://docs.google.com/spreadsheets/d/17NfyN0Zugc-LpYtUztJzr9TXeKjmwduWSPkmXAqt4sk/edit?usp=sharing",
        icon: <Calculator className="h-4 w-4" />,
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
