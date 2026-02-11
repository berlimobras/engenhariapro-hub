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
import { useLocation } from "react-router-dom";
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
  const location = useLocation();

  return (
    <aside className="hidden lg:flex lg:w-[260px] lg:flex-col lg:border-r lg:border-border bg-sidebar h-screen sticky top-0">
      {/* Brand */}
      <div className="flex h-14 items-center gap-2.5 px-5 border-b border-border">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <HardHat className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="text-sm font-semibold text-foreground tracking-tight">
          EngenhariaPro 🍌
        </span>
        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </div>

      {/* Main nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <p className="px-2 mb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          Principal
        </p>
        {mainNav.map((item) => (
          <NavLink
            key={item.url}
            to={item.url}
            end={item.url === "/"}
            className="flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            activeClassName="bg-sidebar-accent text-foreground font-medium"
          >
            <item.icon className="h-4 w-4 shrink-0" />
            <span>{item.title}</span>
          </NavLink>
        ))}

        <div className="my-4 border-t border-border" />

        <p className="px-2 mb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          Sistema
        </p>
        {secondaryNav.map((item) => (
          <NavLink
            key={item.url}
            to={item.url}
            className="flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            activeClassName="bg-sidebar-accent text-foreground font-medium"
          >
            <item.icon className="h-4 w-4 shrink-0" />
            <span>{item.title}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-border px-5 py-3">
        <p className="text-[11px] text-muted-foreground">v1.0 — EngenhariaPro Hub</p>
      </div>
    </aside>
  );
}
