import { PageHeader } from "@/components/PageHeader";
import { LinkCard } from "@/components/LinkCard";
import { FileText, Shield, Handshake, ScrollText } from "lucide-react";

const docs = [
  {
    title: "Construção por Administração",
    description: "Contrato padrão para construção por administração.",
    href: "https://docs.google.com/document/d/17NZyeUw7xdaqYTMSSRDu8JxndH4ezqdftJ96V5QutGE/edit?usp=sharing",
    icon: <Handshake className="h-4 w-4" />,
    tag: "Google Docs",
  },
  {
    title: "Construção por Empreitada",
    description: "Contrato padrão para construção por empreitada.",
    href: "https://docs.google.com/document/d/1Q_s945I7tBzXEdexRDP8XqmApxMGX8QQqwHlt9ziSkw/edit?usp=sharing",
    icon: <FileText className="h-4 w-4" />,
    tag: "Google Docs",
  },
];

const Contratos = () => (
  <div className="animate-fade-in">
    <PageHeader
      title="Contratos & Documentos"
      description="Modelos de documentos prontos para usar e personalizar."
    />
    <div className="grid gap-3 sm:grid-cols-2">
      {docs.map((d) => (
        <LinkCard key={d.title} {...d} />
      ))}
    </div>
  </div>
);

export default Contratos;
