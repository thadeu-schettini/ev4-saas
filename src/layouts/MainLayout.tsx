import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Outlet } from "react-router-dom";

interface MainLayoutProps {
  children?: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <main className="flex-1 overflow-auto">
          {/* Mobile header with menu trigger */}
          <div className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b border-border/50 bg-background/80 px-4 backdrop-blur-sm lg:hidden">
            <SidebarTrigger className="shrink-0" />
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/70">
                <span className="text-sm font-bold text-primary-foreground">M</span>
              </div>
              <span className="font-semibold text-foreground">MedClinic</span>
            </div>
          </div>
          {/* Page content with transition animation */}
          <div className="animate-fade-in">
            {children || <Outlet />}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
