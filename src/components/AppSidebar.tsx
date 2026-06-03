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
import { useAdmin } from "@/contexts/AdminContext";

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

export function AppSidebar({ isMobile }: { isMobile?: boolean }) {
  const { adminUser } = useAdmin();
  const isMaster = adminUser?.email?.toLowerCase() === 'berlimobras@gmail.com';

  if (isMobile) {
    return (
      <aside className="flex flex-col h-full bg-sidebar">
        {/* Logo / Brand */}
        <div className="flex h-20 items-center gap-3 px-6 shrink-0 mt-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary shadow-sm text-white">
            <HardHat className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-base font-bold text-sidebar-foreground leading-tight truncate">Obradomestre</p>
            <p className="text-[11px] text-sidebar-foreground/50 font-medium">Hub de Ferramentas</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1 scrollbar-hide">
          <p className="px-4 mb-2 text-[11px] font-bold uppercase tracking-widest text-sidebar-foreground/40 mt-2">Gestão</p>
          {gestaoNav.map((item) => (
            <NavLink key={item.url} to={item.url} end={item.url === "/"} className="group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-sidebar-foreground/80 font-medium transition-all duration-200 hover:bg-sidebar-accent/5 hover:text-sidebar-foreground" activeClassName="bg-primary text-white font-semibold shadow-md shadow-primary/25">
              <item.icon className="h-4 w-4 opacity-80" />
              <span className="truncate">{item.title}</span>
            </NavLink>
          ))}

          <div className="my-4 border-t border-sidebar-border" />
          <p className="px-4 mb-2 mt-4 text-[11px] font-bold uppercase tracking-widest text-sidebar-foreground/40">Ferramentas</p>
          {ferramentasNav.map((item) => (
            <NavLink key={item.url} to={item.url} className="group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-sidebar-foreground/80 font-medium transition-all duration-200 hover:bg-sidebar-accent/5 hover:text-sidebar-foreground" activeClassName="bg-primary text-white font-semibold shadow-md shadow-primary/25">
              <item.icon className="h-4 w-4 opacity-80" />
              <span className="truncate">{item.title}</span>
            </NavLink>
          ))}

          <div className="my-4 border-t border-sidebar-border" />
          <p className="px-4 mb-2 mt-4 text-[11px] font-bold uppercase tracking-widest text-sidebar-foreground/40">Sistema</p>
          {sistemaNav.map((item) => (
            <NavLink key={item.url} to={item.url} className="group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-sidebar-foreground/80 font-medium transition-all duration-200 hover:bg-sidebar-accent/5 hover:text-sidebar-foreground" activeClassName="bg-primary text-white font-semibold shadow-md shadow-primary/25">
              <item.icon className="h-4 w-4 opacity-80" />
              <span className="truncate">{item.title}</span>
            </NavLink>
          ))}
        </nav>

        {isMaster && (
          <>
            <div className="my-4 border-t border-sidebar-border" />
            <p className="px-4 mb-2 mt-4 text-[11px] font-bold uppercase tracking-widest text-sidebar-foreground/40 text-orange-600">Master Admin</p>
            <NavLink to="/admin/dashboard" className="group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-sidebar-foreground/80 font-medium transition-all duration-200 hover:bg-orange-600/10 hover:text-orange-600" activeClassName="bg-orange-600 text-white font-semibold shadow-md shadow-orange-600/25">
              <Building2 className="h-4 w-4 opacity-80" />
              <span className="truncate">Portal Master (SaaS)</span>
            </NavLink>
          </>
        )}

        {/* User info */}
        <div className="px-4 pb-6 pt-2 shrink-0 bg-sidebar">
          <div className="flex items-center gap-3 rounded-2xl bg-sidebar-accent/5 p-3 hover:bg-sidebar-accent/10 transition-colors border border-border/50">
            <div className="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
              {adminUser?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-sidebar-foreground truncate">{adminUser?.name || 'Usuário'}</p>
              <p className="text-[11px] text-sidebar-foreground/50 truncate">{adminUser?.companyName || adminUser?.email}</p>
            </div>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="hidden lg:flex lg:w-64 lg:flex-col h-[calc(100vh-2rem)] m-4 rounded-[2rem] bg-sidebar shadow-md border-0 sticky top-4 overflow-hidden shrink-0 z-40">

      {/* Logo / Brand */}
      <div className="flex h-20 items-center gap-3 px-6 shrink-0 mt-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary shadow-sm text-white">
          <HardHat className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-base font-bold text-sidebar-foreground leading-tight truncate">Obradomestre</p>
          <p className="text-[11px] text-sidebar-foreground/50 font-medium">Hub de Ferramentas</p>
        </div>
        <ThemeToggle />
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1 scrollbar-hide">
        {/* GESTÃO */}
        <p className="px-4 mb-2 text-[11px] font-bold uppercase tracking-widest text-sidebar-foreground/40 mt-2">
          Gestão
        </p>

        {gestaoNav.map((item) => (
          <NavLink
            key={item.url}
            to={item.url}
            end={item.url === "/"}
            className="group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-sidebar-foreground/80 font-medium transition-all duration-200 hover:bg-sidebar-accent/5 hover:text-sidebar-foreground"
            activeClassName="bg-primary text-white font-semibold shadow-md shadow-primary/25"
          >
            <item.icon className="h-4 w-4 opacity-80" />
            <span className="truncate">{item.title}</span>
          </NavLink>
        ))}

        <div className="my-4 border-t border-sidebar-border" />

        {/* FERRAMENTAS */}
        <p className="px-4 mb-2 mt-4 text-[11px] font-bold uppercase tracking-widest text-sidebar-foreground/40">
          Ferramentas
        </p>

        {ferramentasNav.map((item) => (
          <NavLink
            key={item.url}
            to={item.url}
            className="group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-sidebar-foreground/80 font-medium transition-all duration-200 hover:bg-sidebar-accent/5 hover:text-sidebar-foreground"
            activeClassName="bg-primary text-white font-semibold shadow-md shadow-primary/25"
          >
            <item.icon className="h-4 w-4 opacity-80" />
            <span className="truncate">{item.title}</span>
          </NavLink>
        ))}

        <div className="my-4 border-t border-sidebar-border" />

        {/* SISTEMA */}
        <p className="px-4 mb-2 mt-4 text-[11px] font-bold uppercase tracking-widest text-sidebar-foreground/40">
          Sistema
        </p>

        {sistemaNav.map((item) => (
          <NavLink
            key={item.url}
            to={item.url}
            className="group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-sidebar-foreground/80 font-medium transition-all duration-200 hover:bg-sidebar-accent/5 hover:text-sidebar-foreground"
            activeClassName="bg-primary text-white font-semibold shadow-md shadow-primary/25"
          >
            <item.icon className="h-4 w-4 opacity-80" />
            <span className="truncate">{item.title}</span>
          </NavLink>
        ))}
        {isMaster && (
          <>
            <div className="my-4 border-t border-sidebar-border" />
            <p className="px-4 mb-2 mt-4 text-[11px] font-bold uppercase tracking-widest text-sidebar-foreground/40 text-orange-600">Master Admin</p>
            <NavLink to="/admin/dashboard" className="group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-sidebar-foreground/80 font-medium transition-all duration-200 hover:bg-orange-600/10 hover:text-orange-600" activeClassName="bg-orange-600 text-white font-semibold shadow-md shadow-orange-600/25">
              <Building2 className="h-4 w-4 opacity-80" />
              <span className="truncate">Portal Master (SaaS)</span>
            </NavLink>
          </>
        )}
      </nav>

      {/* User info */}
      <div className="px-4 pb-6 pt-2 shrink-0 bg-sidebar">
        <div className="flex items-center gap-3 rounded-2xl bg-sidebar-accent/5 p-3 hover:bg-sidebar-accent/10 transition-colors cursor-pointer border border-border/50">
          <div className="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
            {adminUser?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-sidebar-foreground truncate">{adminUser?.name || 'Usuário'}</p>
            <p className="text-[11px] text-sidebar-foreground/50 truncate">{adminUser?.companyName || adminUser?.email}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
