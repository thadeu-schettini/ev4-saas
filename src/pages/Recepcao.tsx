import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Bell,
  Menu,
  Building2,
  Plus
} from "lucide-react";
import { PageContainer } from "@/components/ui/page-container";
import { PageHeader } from "@/components/ui/page-header";
import { PageContent } from "@/components/ui/page-container";
import { ViewSelector } from "@/components/recepcao/ViewSelector";
import { TimelineView } from "@/components/recepcao/TimelineView";
import { KanbanView } from "@/components/recepcao/KanbanView";
import { HybridDashboard } from "@/components/recepcao/HybridDashboard";
import { SmartGrid } from "@/components/recepcao/SmartGrid";
import { QuickActions } from "@/components/recepcao/QuickActions";
import { AlertsPanel } from "@/components/recepcao/AlertsPanel";
import { QueueManagementView } from "@/components/recepcao/QueueManagementView";
import { AdvancedFilters } from "@/components/recepcao/AdvancedFilters";
import { RoomStatusPanel } from "@/components/recepcao/RoomStatusPanel";
import { PendingConfirmations } from "@/components/recepcao/PendingConfirmations";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type ViewType = "timeline" | "kanban" | "hybrid" | "grid" | "queue";

const Recepcao = () => {
  const [currentView, setCurrentView] = useState<ViewType>("hybrid");
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const [activeFilters, setActiveFilters] = useState({
    professionals: [] as string[],
    services: [] as string[],
    modes: [] as string[],
    status: [] as string[],
  });

  const availableFilters = {
    professionals: ["Dr. João Santos", "Dra. Ana Costa", "Dra. Paula Lima", "Dr. Pedro Alves"],
    services: ["Consulta Psicológica", "Fisioterapia", "Nutrição", "Consulta Médica"],
    modes: ["Presencial", "Online", "Domiciliar"],
    status: ["Confirmado", "Aguardando", "Realizado", "Cancelado"],
  };

  const handleFilterChange = (category: keyof typeof activeFilters, value: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((item) => item !== value)
        : [...prev[category], value],
    }));
  };

  const handleClearFilters = () => {
    setActiveFilters({
      professionals: [],
      services: [],
      modes: [],
      status: [],
    });
  };

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
      case "queue":
        return <QueueManagementView searchQuery={searchQuery} />;
      default:
        return <HybridDashboard searchQuery={searchQuery} />;
    }
  };

  return (
    <PageContainer>
      <PageHeader
        icon={Building2}
        title="Recepção"
        description={new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
        iconGradient="from-orange-500 to-red-600"
        actions={
          <div className="flex items-center gap-2">
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-0">
                <div className="p-4">
                  <Accordion type="single" collapsible defaultValue="confirmations" className="space-y-2">
                    <AccordionItem value="confirmations" className="border rounded-lg bg-card">
                      <AccordionTrigger className="px-4 hover:no-underline">
                        <span className="font-semibold">Confirmações Pendentes</span>
                      </AccordionTrigger>
                      <AccordionContent className="px-4">
                        <PendingConfirmations />
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="rooms" className="border rounded-lg bg-card">
                      <AccordionTrigger className="px-4 hover:no-underline">
                        <span className="font-semibold">Status das Salas</span>
                      </AccordionTrigger>
                      <AccordionContent className="px-4">
                        <RoomStatusPanel />
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="actions" className="border rounded-lg bg-card">
                      <AccordionTrigger className="px-4 hover:no-underline">
                        <span className="font-semibold">Ações Rápidas</span>
                      </AccordionTrigger>
                      <AccordionContent className="px-4">
                        <QuickActions />
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="alerts" className="border rounded-lg bg-card">
                      <AccordionTrigger className="px-4 hover:no-underline">
                        <span className="font-semibold">Alertas do Dia</span>
                      </AccordionTrigger>
                      <AccordionContent className="px-4">
                        <AlertsPanel />
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </SheetContent>
            </Sheet>
            <Button variant="ghost" size="icon" className="relative hover:bg-primary/10">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full animate-pulse" />
            </Button>
            <Button className="gap-2 hidden sm:flex">
              <Plus className="h-4 w-4" />
              Novo Check-in
            </Button>
          </div>
        }
      />

      <PageContent>
        {/* Search and View Selector */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar paciente, profissional ou serviço..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background/50 backdrop-blur-sm border-border/50 focus:border-primary/50"
            />
          </div>
          <div className="flex gap-2">
            <AdvancedFilters
              filters={availableFilters}
              activeFilters={activeFilters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />
            <ViewSelector currentView={currentView} onViewChange={setCurrentView} />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex gap-6">
          <div className="flex-1">
            {renderView()}
          </div>

          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-32">
              <Accordion type="single" collapsible defaultValue="confirmations" className="space-y-2">
                <AccordionItem value="confirmations" className="border rounded-lg bg-card">
                  <AccordionTrigger className="px-4 hover:no-underline">
                    <span className="font-semibold">Confirmações Pendentes</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4">
                    <PendingConfirmations />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="rooms" className="border rounded-lg bg-card">
                  <AccordionTrigger className="px-4 hover:no-underline">
                    <span className="font-semibold">Status das Salas</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4">
                    <RoomStatusPanel />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="actions" className="border rounded-lg bg-card">
                  <AccordionTrigger className="px-4 hover:no-underline">
                    <span className="font-semibold">Ações Rápidas</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4">
                    <QuickActions />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="alerts" className="border rounded-lg bg-card">
                  <AccordionTrigger className="px-4 hover:no-underline">
                    <span className="font-semibold">Alertas do Dia</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4">
                    <AlertsPanel />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </PageContent>
    </PageContainer>
  );
};

export default Recepcao;