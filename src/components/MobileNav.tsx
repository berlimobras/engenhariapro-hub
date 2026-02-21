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
      {/* Full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-0 z-50 lg:hidden"
            style={{ background: "linear-gradient(180deg, #3d1a8e 0%, #2d0f6b 100%)" }}
          >
            {/* Header */}
            <div className="flex h-16 items-center justify-between px-5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-2xl"
                  style={{ background: "linear-gradient(135deg, #FF6B9D, #ff8fab)" }}>
                  <HardHat className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-bold text-white">EngenhariaPro</span>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Nav items */}
            <nav className="px-4 py-5 space-y-1">
              {fullMenu.map((item) => (
                <Link
                  key={item.url}
                  to={item.url}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition-all ${location.pathname === item.url
                      ? "bg-white/15 text-white font-semibold"
                      : "text-purple-200 hover:bg-white/10 hover:text-white"
                    }`}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10">
                    <item.icon className="h-4 w-4" />
                  </div>
                  <span>{item.title}</span>
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom bar */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40 lg:hidden"
        style={{
          background: "white",
          boxShadow: "0 -4px 24px rgba(108,99,255,0.12)",
          borderRadius: "24px 24px 0 0",
        }}
      >
        <div className="flex h-16 items-center justify-around px-4">
          {bottomItems.map((item) => {
            if (item.url === "#menu") {
              return (
                <button
                  key="menu"
                  onClick={() => setMenuOpen(true)}
                  className="flex flex-col items-center gap-1 text-gray-400"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl">
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
                className="flex flex-col items-center gap-1"
              >
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-2xl transition-all ${isActive ? "text-white" : "text-gray-400"
                    }`}
                  style={
                    isActive
                      ? { background: "linear-gradient(135deg, #6C63FF, #9b59b6)" }
                      : {}
                  }
                >
                  <item.icon className="h-5 w-5" />
                </div>
                <span
                  className={`text-[9px] font-bold ${isActive ? "text-purple-600" : "text-gray-400"
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
