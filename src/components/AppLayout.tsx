import { Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { ThemeToggle } from "./ThemeToggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Loader2 } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";

export function AppLayout() {
  const { isLoading } = useAdmin();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50 text-orange-600">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Desktop sidebar */}
      <AppSidebar />

      {/* Main content area */}
      <main className="flex-1 min-w-0 flex flex-col">
        {/* Mobile top header */}
        <header className="lg:hidden flex h-16 items-center justify-between px-4 border-b border-border bg-card sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="-ml-2">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-72 bg-sidebar border-r-0">
                {/* Re-using AppSidebar inner layout without the 'hidden' classes wrapper */}
                <div className="flex flex-col h-full overflow-hidden">
                  <AppSidebar isMobile />
                </div>
              </SheetContent>
            </Sheet>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-[12px] font-black text-white">OM</span>
              </div>
              <span className="text-base font-bold text-foreground tracking-tight">Obradomestre</span>
            </div>
          </div>
          <ThemeToggle />
        </header>

        {/* Page content */}
        <div className="flex-1 px-4 py-6 lg:px-8 lg:py-8 pb-10 max-w-screen-xl w-full mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
