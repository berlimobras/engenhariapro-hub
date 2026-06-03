import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Bot, Search } from "lucide-react";

const assistants = [
  {
    title: "Agente de Análise Estrutural",
    description: "Especialista em cálculos estruturais, dimensionamento de elementos e análise de cargas para projetos de engenharia civil.",
    href: "https://chatgpt.com/g/g-6803e6a5cb708191bea2da2da1cfc056-agente-de-analise-estrutural",
  },
  {
    title: "Engenheiro de Obra Assistente",
    description: "Assistente especializado em gestão de obras, planejamento, cronogramas e acompanhamento de construção civil.",
    href: "https://chatgpt.com/g/g-6803e85623a88191b0bcf84dce36e4ea-engenheiro-de-obra-assistente",
  },
  {
    title: "Agente de Relatórios Técnicos e ART",
    description: "Especialista na elaboração de relatórios técnicos, ARTs e documentação profissional para engenheiros civis.",
    href: "https://chatgpt.com/g/g-6803e750d53081918e3f8387aeedc54b-agente-de-relatorios-tecnicos-e-art",
  },
  {
    title: "Especialista em Normas Técnicas",
    description: "Especialista em normas ABNT, regulamentações e padrões técnicos para engenharia civil e construção.",
    href: "https://chatgpt.com/g/g-6803e9324b70819199acbe1c86f9ad03-especialista-em-normas-tecnicas",
  },
  {
    title: "Perito em Engenharia Civil",
    description: "Especialista em perícias técnicas, laudos estruturais, avaliações e investigações em engenharia civil.",
    href: "https://chatgpt.com/g/g-689eb27391b08191a218fe89f7103512-perito-eg",
  },
  {
    title: "Orça Obra Brasil",
    description: "Especialista em orçamentação de obras, composições de custos e análise de preços para o mercado brasileiro.",
    href: "https://chatgpt.com/g/g-6803e5a2d41481918a2729a637ca5283-orca-obra-brasil",
  },
  {
    title: "Engenheiro Civil Turbo",
    description: "Agente multidisciplinar para resolução rápida de problemas diversos em engenharia civil e construção.",
    href: "https://chatgpt.com/g/g-6806afd3c1a48191afb48e6c99ae2074-engenheiro-civil-turbo",
  },
  {
    title: "Planilha Engenharia Civil",
    description: "Especialista em criação e otimização de planilhas para cálculos, controles e gestão de projetos.",
    href: "https://chatgpt.com/g/g-68a5d6e96e748191b1ada0d5918ffce1-planilha-civil",
  },
  {
    title: "Especialista em Memoriais Descritivos",
    description: "Especializado na elaboração de memoriais descritivos detalhados e documentação técnica para projetos de engenharia.",
    href: "https://chatgpt.com/g/g-68a5d7e5a248819190d385c904767284-especialista-em-memoriais-descritivos",
  },
  {
    title: "Calculista Rápido",
    description: "Agente especializado em cálculos estruturais rápidos, verificações e dimensionamentos para engenharia civil.",
    href: "https://chatgpt.com/g/g-68a5d5047a108191af3496a6fe10d40c-calculista-rapido",
  },
  {
    title: "Engenharia Checklist",
    description: "Criador de checklists personalizados para controle de qualidade, verificações e acompanhamento de obras.",
    href: "https://chatgpt.com/g/g-68a5d3f8379081918d09aaa6e99d1402-engenharia-checklist",
  },
  {
    title: "Agente de Compatibilização BIM",
    description: "Especialista em compatibilização de projetos BIM, detecção de interferências e coordenação de disciplinas.",
    href: "https://chatgpt.com/g/g-68a5ccb0a144819198408d09c089a5c4-agente-de-compatibilizacao-bim",
  },
  {
    title: "Agente de Quantitativos",
    description: "Especializado em levantamento de quantitativos, medições e composições para orçamentos de obras.",
    href: "https://chatgpt.com/g/g-68a50beeba2881919b85d87f0b5fe753-agente-de-quantitativos",
  },
  {
    title: "Engenheiro de Segurança GPT",
    description: "Especialista em segurança do trabalho, normas regulamentadoras e prevenção de acidentes em obras.",
    href: "https://chatgpt.com/g/g-68a50d1104408191bfe0e6e7cf6830fa-engenheiro-de-seguranca-gpt",
  }
];

const InteligenciaTecnica = () => {
  const [search, setSearch] = useState("");
  const filtered = assistants.filter(a => a.title.toLowerCase().includes(search.toLowerCase()) || a.description.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="animate-fade-in space-y-8 pb-10">
      <PageHeader
        title="Agentes de IA Engenharia"
        description="Hub exclusivo com 14 assistentes especializados em inteligência artificial para maximizar a sua produtividade."
      />
      <div className="relative mb-8 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input 
          type="text" 
          placeholder="Pesquisar agente..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 text-sm rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary focus:outline-none transition-all shadow-sm"
        />
      </div>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((a) => (
        <a
          key={a.title}
          href={a.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col rounded-3xl border border-border/50 bg-card p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 aspect-[4/5] relative overflow-hidden"
        >
          {/* Fundo decorativo colorido bem suave */}
          <div className="absolute -top-16 -right-16 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors duration-500" />
          
          <div className="w-14 h-14 rounded-2xl bg-stone-100 flex items-center justify-center mb-6 shadow-sm border border-border/50 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
            <Bot className="w-7 h-7 text-stone-600 group-hover:text-white transition-colors" />
          </div>
          
          <h3 className="text-xl font-black text-foreground leading-tight mb-3 group-hover:text-primary transition-colors line-clamp-3">
            {a.title}
          </h3>
          
          <p className="text-sm text-muted-foreground font-medium leading-relaxed mb-auto line-clamp-5">
            {a.description}
          </p>
          
          <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-primary">
            <span>Acessar Agente</span>
            <span className="text-lg leading-none">&rarr;</span>
          </div>
        </a>
      ))}
    </div>
  </div>
  );
};

export default InteligenciaTecnica;
