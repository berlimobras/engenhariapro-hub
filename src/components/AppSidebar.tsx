import {
  LayoutDashboard,
  Brain,
  Megaphone,
  Table2,
  BookOpen,
  FileText,
  CheckSquare,
  Bell,
  Settings,
  HardHat,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { ThemeToggle } from "./ThemeToggle";

const mainNav = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Inteligência Técnica", url: "/inteligencia", icon: Brain },
  { title: "Marketing", url: "/marketing", icon: Megaphone },
  { title: "Planilhas & Orçamentos", url: "/planilhas", icon: Table2 },
  { title: "Biblioteca de Prompts", url: "/prompts", icon: BookOpen },
  { title: "Contratos & Docs", url: "/contratos", icon: FileText },
  { title: "Checklists", url: "/checklists", icon: CheckSquare },
];

const secondaryNav = [
  { title: "Atualizações", url: "/atualizacoes", icon: Bell },
  { title: "Configurações", url: "/configuracoes", icon: Settings },
];

export function AppSidebar() {
  return (
    <aside className="hidden lg:flex lg:w-64 lg:flex-col h-screen sticky top-0 bg-sidebar border-r border-sidebar-border">

      {/* Logo / Brand */}
      <div className="flex h-16 items-center gap-3 px-5 border-b border-sidebar-border shrink-0">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent shadow-sm">
          <HardHat className="h-5 w-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-white leading-none truncate">EngenhariaPro</p>
          <p className="text-[10px] text-sidebar-foreground/60 mt-0.5 font-medium">Hub de Ferramentas</p>
        </div>
        <ThemeToggle />
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-5 space-y-0.5">
        <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-sidebar-foreground/40">
          Principal
        </p>

        {mainNav.map((item) => (
          <NavLink
            key={item.url}
            to={item.url}
            end={item.url === "/"}
            className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-sidebar-foreground/75 font-medium transition-all duration-150 hover:bg-sidebar-accent hover:text-white"
            activeClassName="bg-accent/15 text-white font-semibold border border-accent/20"
          >
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sidebar-foreground/10 group-hover:bg-white/10 transition-colors">
              <item.icon className="h-3.5 w-3.5" />
            </div>
            <span className="truncate">{item.title}</span>
          </NavLink>
        ))}

        <div className="my-4 border-t border-sidebar-border" />

        <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-sidebar-foreground/40">
          Sistema
        </p>

        {secondaryNav.map((item) => (
          <NavLink
            key={item.url}
            to={item.url}
            className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-sidebar-foreground/75 font-medium transition-all duration-150 hover:bg-sidebar-accent hover:text-white"
            activeClassName="bg-accent/15 text-white font-semibold border border-accent/20"
          >
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sidebar-foreground/10 group-hover:bg-white/10 transition-colors">
              <item.icon className="h-3.5 w-3.5" />
            </div>
            <span>{item.title}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer CTA */}
      <div className="px-4 pb-5 shrink-0">
        <div className="rounded-xl p-3.5 border border-accent/25"
          style={{ background: "linear-gradient(135deg, rgba(255,140,0,0.15) 0%, rgba(0,31,61,0.4) 100%)" }}>
          <div className="flex items-center gap-2.5 mb-2">
            <div className="h-6 w-6 rounded-md bg-accent/80 flex items-center justify-center">
              <span className="text-[10px] text-white font-bold">★</span>
            </div>
            <p className="text-xs font-bold text-white">Plano Premium</p>
          </div>
          <p className="text-[10px] text-sidebar-foreground/60 leading-relaxed">
            Todas as ferramentas desbloqueadas
          </p>
        </div>
      </div>
    </aside>
  );
}
