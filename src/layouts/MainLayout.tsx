import { useState, useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Outlet, useLocation } from "react-router-dom";
import { CommandPalette } from "@/components/CommandPalette";
import { ThemeToggle } from "@/components/ThemeToggle";
import { OnboardingTour } from "@/components/OnboardingTour";
import { InternalChat } from "@/components/InternalChat";
import { Button } from "@/components/ui/button";
import {
  Home,
  Calendar,
  Users,
  UserCog,
  FileText,
  ClipboardList,
  Settings,
  Gift,
  CreditCard,
  DollarSign,
  Building2,
  Search,
} from "lucide-react";

interface MainLayoutProps {
  children?: React.ReactNode;
}

const pageInfo: Record<string, { title: string; icon: React.ElementType }> = {
  "/": { title: "Dashboard", icon: Home },
  "/calendar": { title: "Agenda", icon: Calendar },
  "/recepcao": { title: "Recepção", icon: Building2 },
  "/pacientes": { title: "Pacientes", icon: Users },
  "/prontuario": { title: "Prontuário", icon: FileText },
  "/profissionais": { title: "Profissionais", icon: UserCog },
  "/formularios-clinicos": { title: "Formulários", icon: ClipboardList },
  "/financeiro": { title: "Financeiro", icon: DollarSign },
  "/indicacoes": { title: "Indicações", icon: Gift },
  "/billing": { title: "Faturamento", icon: CreditCard },
  "/configuracoes": { title: "Configurações", icon: Settings },
  "/meu-perfil": { title: "Meu Perfil", icon: UserCog },
  "/ajuda": { title: "Ajuda", icon: Settings },
};

export function MainLayout({ children }: MainLayoutProps) {
  const location = useLocation();
  const [commandOpen, setCommandOpen] = useState(false);
  const currentPage = pageInfo[location.pathname] || { title: "MedClinic", icon: Home };
  const PageIcon = currentPage.icon;

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Command palette keyboard shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-background overflow-hidden">
        <AppSidebar />
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Mobile header with menu trigger */}
          <div className="sticky top-0 z-40 flex h-14 items-center gap-2 border-b border-border/50 bg-background/80 px-3 sm:px-4 backdrop-blur-sm lg:hidden">
            <SidebarTrigger className="shrink-0" />
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/70 shrink-0">
                <PageIcon className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground truncate">{currentPage.title}</span>
            </div>
            {/* Mobile Actions */}
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 shrink-0"
              onClick={() => setCommandOpen(true)}
            >
              <Search className="h-4 w-4" />
            </Button>
            <InternalChat />
            <div data-theme-toggle className="shrink-0">
              <ThemeToggle variant="minimal" />
            </div>
          </div>

          {/* Desktop header bar */}
          <div className="hidden lg:flex sticky top-0 z-40 h-12 items-center justify-end gap-2 border-b border-border/50 bg-background/80 px-4 backdrop-blur-sm">
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-3 gap-2 text-muted-foreground"
              onClick={() => setCommandOpen(true)}
            >
              <Search className="h-3.5 w-3.5" />
              <span className="text-sm">Buscar...</span>
              <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                <span className="text-xs">⌘</span>K
              </kbd>
            </Button>
            <InternalChat />
            <div data-theme-toggle>
              <ThemeToggle />
            </div>
          </div>

          {/* Page content with transition animation */}
          <div className="flex-1 overflow-auto animate-fade-in">
            {children || <Outlet />}
          </div>
        </main>

        {/* Command Palette */}
        <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />

        {/* Onboarding Tour */}
        <OnboardingTour />
      </div>
    </SidebarProvider>
  );
}