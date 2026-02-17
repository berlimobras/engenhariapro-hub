import { PageHeader } from "@/components/PageHeader";
import { LinkCard } from "@/components/LinkCard";
import { Image, FileImage, Layout, Video } from "lucide-react";

const templates = [
  {
    title: "Posts de Obra",
    description: "Templates para Instagram com fotos de antes e depois da obra.",
    href: "https://canva.com",
    icon: <Image className="h-4 w-4" />,
    tag: "Canva",
  },
  {
    title: "Stories Profissionais",
    description: "Modelos de stories com dicas de construção e reforma.",
    href: "https://canva.com",
    icon: <FileImage className="h-4 w-4" />,
    tag: "Canva",
  },
  {
    title: "Cartão Digital",
    description: "Cartão de visita digital editável para engenheiros e mestres de obras.",
    href: "https://canva.com",
    icon: <Layout className="h-4 w-4" />,
    tag: "Canva",
  },
  {
    title: "Vídeos de Portfólio",
    description: "Template para criar vídeos de apresentação dos seus projetos.",
    href: "https://canva.com",
    icon: <Video className="h-4 w-4" />,
    tag: "Canva",
  },
];

const Marketing = () => (
  <div className="animate-fade-in">
    <PageHeader
      title="Marketing Profissional"
      description="Templates editáveis para divulgar seu trabalho."
    />
    <div className="grid gap-3 sm:grid-cols-2">
      {templates.map((t) => (
        <LinkCard key={t.title} {...t} />
      ))}
    </div>
  </div>
);

export default Marketing;
