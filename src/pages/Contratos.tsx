import { PageHeader } from "@/components/PageHeader";
import { LinkCard } from "@/components/LinkCard";
import { FileText, Shield, Handshake, ScrollText } from "lucide-react";

const docs = [
  {
    title: "Contrato de Prestação de Serviços",
    description: "Modelo completo para formalizar serviços de obra.",
    href: "https://docs.google.com",
    icon: <Handshake className="h-4 w-4" />,
    tag: "Google Docs",
  },
  {
    title: "Contrato de Empreitada",
    description: "Template para contratos de empreitada global ou parcial.",
    href: "https://docs.google.com",
    icon: <FileText className="h-4 w-4" />,
    tag: "Google Docs",
  },
  {
    title: "Termo de Responsabilidade",
    description: "Documento de responsabilidade técnica para obras.",
    href: "https://docs.google.com",
    icon: <Shield className="h-4 w-4" />,
    tag: "Google Docs",
  },
  {
    title: "Distrato de Obra",
    description: "Modelo para encerrar contratos de forma documentada.",
    href: "https://docs.google.com",
    icon: <ScrollText className="h-4 w-4" />,
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
