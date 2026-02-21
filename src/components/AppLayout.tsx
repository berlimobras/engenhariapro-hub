import { Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { MobileNav } from "./MobileNav";

export function AppLayout() {
  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Desktop sidebar */}
      <AppSidebar />

      {/* Main content area */}
      <main className="flex-1 min-w-0 flex flex-col">
        {/* Mobile top header */}
        <header className="lg:hidden flex h-14 items-center justify-between px-4 border-b border-border bg-card sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-[10px] font-black text-white">EP</span>
            </div>
            <span className="text-sm font-bold text-foreground">EngenhariaPro</span>
          </div>
          {/* ThemeToggle shown in MobileNav drawer */}
        </header>

        {/* Page content */}
        <div className="flex-1 px-4 py-6 lg:px-8 lg:py-8 pb-24 lg:pb-10 max-w-screen-xl w-full mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Mobile bottom nav */}
      <MobileNav />
    </div>
  );
}
