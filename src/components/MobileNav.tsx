import {
  LayoutDashboard,
  Brain,
  Table2,
  BookOpen,
  Menu,
  Megaphone,
  FileText,
  CheckSquare,
  Bell,
  Settings,
  HardHat,
  X,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";

const bottomItems = [
  { title: "Home", url: "/", icon: LayoutDashboard },
  { title: "IA", url: "/inteligencia", icon: Brain },
  { title: "Planilhas", url: "/planilhas", icon: Table2 },
  { title: "Prompts", url: "/prompts", icon: BookOpen },
  { title: "Mais", url: "#menu", icon: Menu },
];

const fullMenu = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Inteligência Técnica", url: "/inteligencia", icon: Brain },
  { title: "Marketing", url: "/marketing", icon: Megaphone },
  { title: "Planilhas & Orçamentos", url: "/planilhas", icon: Table2 },
  { title: "Biblioteca de Prompts", url: "/prompts", icon: BookOpen },
  { title: "Contratos & Docs", url: "/contratos", icon: FileText },
  { title: "Checklists", url: "/checklists", icon: CheckSquare },
  { title: "Atualizações", url: "/atualizacoes", icon: Bell },
  { title: "Configurações", url: "/configuracoes", icon: Settings },
];

export function MobileNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* ── Full-screen drawer menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 lg:hidden bg-sidebar"
          >
            {/* Header */}
            <div className="flex h-16 items-center justify-between px-5 border-b border-sidebar-border">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent">
                  <HardHat className="h-4.5 w-4.5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">EngenhariaPro</p>
                  <p className="text-[10px] text-sidebar-foreground/50">Hub de Ferramentas</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <button
                  onClick={() => setMenuOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-sidebar-accent text-sidebar-foreground hover:text-white transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Nav links */}
            <nav className="px-4 py-5 space-y-1 overflow-y-auto h-[calc(100vh-64px)]">
              <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-sidebar-foreground/40">
                Principal
              </p>
              {fullMenu.slice(0, 7).map((item) => (
                <Link
                  key={item.url}
                  to={item.url}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all ${(item.url === "/" ? location.pathname === "/" : location.pathname.startsWith(item.url))
                      ? "bg-accent/15 text-white border border-accent/20"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-white"
                    }`}
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sidebar-foreground/10">
                    <item.icon className="h-3.5 w-3.5" />
                  </div>
                  <span>{item.title}</span>
                </Link>
              ))}

              <div className="my-4 border-t border-sidebar-border" />

              <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-sidebar-foreground/40">
                Sistema
              </p>
              {fullMenu.slice(7).map((item) => (
                <Link
                  key={item.url}
                  to={item.url}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all ${location.pathname.startsWith(item.url)
                      ? "bg-accent/15 text-white border border-accent/20"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-white"
                    }`}
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sidebar-foreground/10">
                    <item.icon className="h-3.5 w-3.5" />
                  </div>
                  <span>{item.title}</span>
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Bottom tab bar ── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden border-t border-border bg-card/95 backdrop-blur-md">
        <div className="flex h-[60px] items-center justify-around px-2 safe-area-bottom">
          {bottomItems.map((item) => {
            if (item.url === "#menu") {
              return (
                <button
                  key="menu"
                  onClick={() => setMenuOpen(true)}
                  className="flex flex-col items-center gap-1 min-w-[52px] text-muted-foreground hover:text-foreground transition-colors"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl hover:bg-muted transition-colors">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <span className="text-[9px] font-semibold">{item.title}</span>
                </button>
              );
            }

            const isActive =
              item.url === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(item.url);

            return (
              <Link
                key={item.url}
                to={item.url}
                className="flex flex-col items-center gap-1 min-w-[52px] transition-colors"
              >
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-xl transition-all duration-200 ${isActive
                      ? "bg-primary text-white shadow-sm scale-105"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                >
                  <item.icon className="h-5 w-5" />
                </div>
                <span
                  className={`text-[9px] font-semibold transition-colors ${isActive ? "text-primary" : "text-muted-foreground"
                    }`}
                >
                  {item.title}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
