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
  Building2,
  Users,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { ThemeToggle } from "./ThemeToggle";

const gestaoNav = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Obras", url: "/obras", icon: Building2 },
  { title: "Funcionários", url: "/funcionarios", icon: Users },
];

const ferramentasNav = [
  { title: "Inteligência Técnica", url: "/ferramentas/inteligencia", icon: Brain },
  { title: "Marketing", url: "/ferramentas/marketing", icon: Megaphone },
  { title: "Planilhas & Orçamentos", url: "/ferramentas/planilhas", icon: Table2 },
  { title: "Biblioteca de Prompts", url: "/ferramentas/prompts", icon: BookOpen },
  { title: "Contratos & Docs", url: "/ferramentas/contratos", icon: FileText },
  { title: "Checklists", url: "/ferramentas/checklists", icon: CheckSquare },
];

const sistemaNav = [
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
        {/* GESTÃO */}
        <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-sidebar-foreground/40">
          Gestão
        </p>

        {gestaoNav.map((item) => (
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

        {/* FERRAMENTAS */}
        <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-sidebar-foreground/40">
          Ferramentas
        </p>

        {ferramentasNav.map((item) => (
          <NavLink
            key={item.url}
            to={item.url}
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

        {/* SISTEMA */}
        <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-sidebar-foreground/40">
          Sistema
        </p>

        {sistemaNav.map((item) => (
          <NavLink
            key={item.url}
            to={item.url}
            className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-sidebar-foreground/75 font-medium transition-all duration-150 hover:bg-sidebar-accent hover:text-white"
            activeClassName="bg-accent/15 text-white font-semibold border border-accent/20"
          >
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sidebar-foreground/10 group-hover:bg-white/10 transition-colors">
              <item.icon className="h-3.5 w-3.5" />
            </div>
            <span className="truncate">{item.title}</span>
          </NavLink>
        ))}
      </nav>

      {/* User info */}
      <div className="px-4 pb-5 shrink-0">
        <div className="rounded-xl bg-sidebar-accent/30 p-3 border border-sidebar-border">
          <p className="text-[10px] text-sidebar-foreground/60 font-medium mb-1">LOGADO COMO</p>
          <p className="text-xs font-semibold text-white">Admin Local</p>
          <p className="text-[10px] text-sidebar-foreground/60">admin@obradomestre.local</p>
        </div>
      </div>
    </aside>
  );
}
