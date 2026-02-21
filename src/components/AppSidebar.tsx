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
    <aside className="hidden lg:flex lg:w-[260px] lg:flex-col h-screen sticky top-0"
      style={{ background: "linear-gradient(180deg, #3d1a8e 0%, #2d0f6b 100%)" }}>

      {/* Brand */}
      <div className="flex h-16 items-center gap-3 px-6 border-b border-white/10">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl"
          style={{ background: "linear-gradient(135deg, #FF6B9D, #ff8fab)" }}>
          <HardHat className="h-5 w-5 text-white" />
        </div>
        <div>
          <span className="text-sm font-bold text-white tracking-tight block">EngenhariaPro</span>
          <span className="text-[10px] text-purple-300 font-medium">Hub de Ferramentas</span>
        </div>
      </div>

      {/* User greeting */}
      <div className="px-6 py-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full"
            style={{ background: "linear-gradient(135deg, #6C63FF, #9b59b6)" }}>
            <span className="text-sm font-bold text-white">EP</span>
          </div>
          <div>
            <p className="text-xs text-purple-300 font-medium">Bem-vindo de volta!</p>
            <p className="text-sm font-bold text-white">Engenheiro Pro</p>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="flex-1 overflow-y-auto px-4 py-5 space-y-1">
        <p className="px-3 mb-3 text-[10px] font-bold uppercase tracking-widest text-purple-400">
          Principal
        </p>
        {mainNav.map((item) => (
          <NavLink
            key={item.url}
            to={item.url}
            end={item.url === "/"}
            className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm text-purple-200 transition-all hover:bg-white/10 hover:text-white"
            activeClassName="bg-white/15 text-white font-semibold shadow-inner"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10">
              <item.icon className="h-4 w-4" />
            </div>
            <span>{item.title}</span>
          </NavLink>
        ))}

        <div className="my-4 border-t border-white/10" />

        <p className="px-3 mb-3 text-[10px] font-bold uppercase tracking-widest text-purple-400">
          Sistema
        </p>
        {secondaryNav.map((item) => (
          <NavLink
            key={item.url}
            to={item.url}
            className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm text-purple-200 transition-all hover:bg-white/10 hover:text-white"
            activeClassName="bg-white/15 text-white font-semibold"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10">
              <item.icon className="h-4 w-4" />
            </div>
            <span>{item.title}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-white/10">
        <div className="rounded-2xl p-3"
          style={{ background: "linear-gradient(135deg, rgba(108,99,255,0.3), rgba(155,89,182,0.3))" }}>
          <p className="text-[11px] font-semibold text-white mb-0.5">🚀 Engenharia Pro</p>
          <p className="text-[10px] text-purple-300">Plano Premium Ativo</p>
        </div>
      </div>
    </aside>
  );
}
