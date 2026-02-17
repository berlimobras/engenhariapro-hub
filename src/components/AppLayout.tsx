import { Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { MobileNav } from "./MobileNav";

export function AppLayout() {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <AppSidebar />
      <main className="flex-1 min-w-0">
        <div className="px-4 py-6 lg:px-8 lg:py-8 pb-24 lg:pb-8">
          <Outlet />
        </div>
      </main>
      <MobileNav />
    </div>
  );
}
