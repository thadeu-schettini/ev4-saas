import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <main className="flex-1 overflow-auto">
          {/* Mobile header with menu trigger */}
          <div className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b border-border/50 bg-background/80 px-4 backdrop-blur-sm lg:hidden">
            <SidebarTrigger asChild>
              <Button variant="ghost" size="icon" className="shrink-0">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SidebarTrigger>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/70">
                <span className="text-sm font-bold text-primary-foreground">M</span>
              </div>
              <span className="font-semibold text-foreground">MedClinic</span>
            </div>
          </div>
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
