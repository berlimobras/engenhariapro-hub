import { PageHeader } from "@/components/PageHeader";
import { User, CreditCard, Bell, Palette } from "lucide-react";

const sections = [
  {
    title: "Perfil",
    description: "Gerencie suas informações pessoais.",
    icon: <User className="h-4 w-4" />,
  },
  {
    title: "Assinatura",
    description: "Gerencie seu plano e método de pagamento.",
    icon: <CreditCard className="h-4 w-4" />,
  },
  {
    title: "Notificações",
    description: "Configure alertas e preferências de comunicação.",
    icon: <Bell className="h-4 w-4" />,
  },
  {
    title: "Aparência",
    description: "Personalize o tema e preferências visuais.",
    icon: <Palette className="h-4 w-4" />,
  },
];

const Configuracoes = () => (
  <div className="animate-fade-in">
    <PageHeader
      title="Configurações"
      description="Personalize sua experiência na plataforma."
    />
    <div className="space-y-3">
      {sections.map((s) => (
        <button
          key={s.title}
          className="flex w-full items-center gap-4 rounded-lg border border-border bg-card p-4 text-left transition-colors hover:bg-accent"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-secondary text-muted-foreground">
            {s.icon}
          </div>
          <div>
            <h3 className="text-sm font-medium text-foreground">{s.title}</h3>
            <p className="text-xs text-muted-foreground">{s.description}</p>
          </div>
        </button>
      ))}
    </div>
  </div>
);

export default Configuracoes;
