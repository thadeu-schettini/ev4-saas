import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  LayoutGrid,
  Calendar as CalendarIcon,
  Search,
  Bell,
  Users,
  DollarSign,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Menu
} from "lucide-react";
import { ViewSelector } from "@/components/recepcao/ViewSelector";
import { TimelineView } from "@/components/recepcao/TimelineView";
import { KanbanView } from "@/components/recepcao/KanbanView";
import { HybridDashboard } from "@/components/recepcao/HybridDashboard";
import { SmartGrid } from "@/components/recepcao/SmartGrid";
import { QuickActions } from "@/components/recepcao/QuickActions";
import { AlertsPanel } from "@/components/recepcao/AlertsPanel";
import { NextAppointments } from "@/components/recepcao/NextAppointments";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

type ViewType = "timeline" | "kanban" | "hybrid" | "grid";

const Recepcao = () => {
  const [currentView, setCurrentView] = useState<ViewType>("hybrid");
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderView = () => {
    switch (currentView) {
      case "timeline":
        return <TimelineView searchQuery={searchQuery} />;
      case "kanban":
        return <KanbanView searchQuery={searchQuery} />;
      case "hybrid":
        return <HybridDashboard searchQuery={searchQuery} />;
      case "grid":
        return <SmartGrid searchQuery={searchQuery} />;
      default:
        return <HybridDashboard searchQuery={searchQuery} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-primary/3 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/8 rounded-full blur-3xl animate-pulse [animation-delay:1s]" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="border-b border-border/50 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 py-4 sm:py-6">
              {/* Top bar */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 sm:gap-4">
                  <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                    <SheetTrigger asChild className="lg:hidden">
                      <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                        <Menu className="h-5 w-5" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-80 p-0">
                      <div className="p-4 space-y-4">
                        <QuickActions />
                        <AlertsPanel />
                      </div>
                    </SheetContent>
                  </Sheet>
                  
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                      Recepção
                    </h1>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      27 de Novembro, 2025 • Quinta-feira
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative hover:bg-primary/10"
                  >
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full animate-pulse" />
                  </Button>
                </div>
              </div>

              {/* Search and View Selector */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar paciente, profissional ou serviço..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-background/50 backdrop-blur-sm border-border/50 focus:border-primary/50"
                  />
                </div>
                <ViewSelector currentView={currentView} onViewChange={setCurrentView} />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex gap-6">
            {/* Main View Area - Agendamentos em Foco */}
            <div className="flex-1">
              {renderView()}
            </div>

            {/* Informações Complementares - Desktop */}
            <div className="hidden lg:block w-80 flex-shrink-0">
              <div className="sticky top-32 space-y-4">
                <QuickActions />
                <AlertsPanel />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recepcao;
