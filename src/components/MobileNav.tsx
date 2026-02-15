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
  LogOut,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";

import { motion, AnimatePresence } from "framer-motion";

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
  const { signOut, user } = { signOut: () => { }, user: null }; // Mocked or removed


  return (
    <>
      {/* Full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background lg:hidden"
          >
            <div className="flex h-14 items-center justify-between px-5 border-b border-border">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <HardHat className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="text-sm font-semibold text-foreground">EngenhariaPro</span>
              </div>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <button
                  onClick={() => setMenuOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-accent"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
            <nav className="px-4 py-4 space-y-1">
              {fullMenu.map((item) => (
                <Link
                  key={item.url}
                  to={item.url}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors ${location.pathname === item.url
                    ? "bg-accent text-foreground font-medium"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              ))}
              <div className="my-2 border-t border-border" />
              {/* Auth elements removed */}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background lg:hidden">
        <div className="flex h-16 items-center justify-around px-2 pb-safe">
          {bottomItems.map((item) => {
            if (item.url === "#menu") {
              return (
                <button
                  key="menu"
                  onClick={() => setMenuOpen(true)}
                  className="flex flex-col items-center gap-1 text-muted-foreground"
                >
                  <item.icon className="h-5 w-5" />
                  <span className="text-[10px]">{item.title}</span>
                </button>
              );
            }
            const isActive = item.url === "/" ? location.pathname === "/" : location.pathname.startsWith(item.url);
            return (
              <Link
                key={item.url}
                to={item.url}
                className={`flex flex-col items-center gap-1 transition-colors ${isActive ? "text-primary" : "text-muted-foreground"
                  }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-[10px]">{item.title}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
