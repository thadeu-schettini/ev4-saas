import { useState } from "react";
import { CalendarFilters } from "@/components/CalendarFilters";
import { AppointmentListItem } from "@/components/AppointmentListItem";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FullCalendarView } from "@/components/calendar/FullCalendarView";
import { PageContainer } from "@/components/ui/page-container";
import { PageHeader } from "@/components/ui/page-header";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import "@/components/calendar/CalendarStyles.css";
import { 
  Calendar as CalendarIcon, 
  TrendingUp, 
  Users, 
  Clock,
  ListFilter,
  Plus,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const Calendar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hideUpcoming, setHideUpcoming] = useState(true); // Hidden by default
  const isMobile = useIsMobile();
  
  const appointments = [
    { time: "09:00", patientName: "Maria Silva", status: "confirmed" as const, service: "Consulta Geral", professional: "Dr. João Santos" },
    { time: "10:00", patientName: "Carlos Oliveira", status: "pending" as const, service: "Retorno", professional: "Dra. Ana Lima" },
    { time: "11:30", patientName: "Ana Costa", status: "completed" as const, service: "Exame", professional: "Dr. João Santos" },
    { time: "14:00", patientName: "Pedro Souza", status: "cancelled" as const, service: "Primeira Consulta", professional: "Dra. Ana Lima" },
    { time: "15:00", patientName: "Julia Martins", status: "confirmed" as const, service: "Acompanhamento", professional: "Dr. João Santos" },
    { time: "16:00", patientName: "Lucas Ferreira", status: "pending" as const, service: "Procedimento", professional: "Dr. João Santos" },
  ];

  const stats = [
    { label: "Agendamentos", value: "12", icon: Users, color: "text-primary" },
    { label: "Concluídos", value: "8", icon: TrendingUp, color: "text-success" },
    { label: "Pendentes", value: "4", icon: Clock, color: "text-warning" },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-3 bg-gradient-to-r from-primary/10 to-primary/5 border-b border-border/30 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <CalendarIcon className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-foreground">
                Agendamentos de Hoje
              </h3>
              <p className="text-xs text-muted-foreground">
                {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'short' })}
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="text-xs font-semibold bg-primary/10 text-primary border-primary/20">
            {appointments.length}
          </Badge>
        </div>
      </div>

      {/* Stats - Compact */}
      <div className="grid grid-cols-3 gap-2 p-3 border-b border-border/30 bg-muted/20">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div 
              key={index}
              className="text-center p-2 rounded-lg bg-card/80 border border-border/50 hover:border-primary/30 transition-colors"
            >
              <Icon className={`h-4 w-4 mx-auto mb-1 ${stat.color}`} />
              <div className="text-lg font-bold text-foreground">{stat.value}</div>
              <div className="text-[10px] text-muted-foreground truncate">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Appointments List */}
      <ScrollArea className="flex-1">
        <div className="p-3 space-y-2">
          {appointments.map((apt, index) => (
            <AppointmentListItem
              key={index}
              time={apt.time}
              patientName={apt.patientName}
              status={apt.status}
              service={apt.service}
              professional={apt.professional}
            />
          ))}
        </div>
      </ScrollArea>

      {/* Footer Action */}
      <div className="p-3 border-t border-border/30 bg-card/50">
        <Button className="w-full gap-2" size="sm">
          <Plus className="h-4 w-4" />
          Novo Agendamento
        </Button>
      </div>
    </div>
  );

  return (
    <PageContainer>
      <PageHeader
        title="Agenda"
        description="Gerencie seus agendamentos"
        icon={CalendarIcon}
        iconColor="from-violet-500 to-purple-600"
      >
        {/* Desktop Stats */}
        <div className="hidden lg:flex items-center gap-2">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50 border border-border/50 hover:border-primary/30 transition-colors"
              >
                <Icon className={`h-4 w-4 ${stat.color}`} />
                <span className="text-sm font-semibold">{stat.value}</span>
                <span className="text-xs text-muted-foreground">{stat.label}</span>
              </div>
            );
          })}
        </div>

        {/* Mobile: Drawer for appointments list */}
        <div className="flex items-center gap-2">
          {isMobile ? (
            <Drawer open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <DrawerTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <ListFilter className="h-4 w-4" />
                  <span>Hoje</span>
                  <Badge variant="secondary" className="h-5 w-5 p-0 flex items-center justify-center text-[10px]">
                    {appointments.length}
                  </Badge>
                </Button>
              </DrawerTrigger>
              <DrawerContent className="max-h-[85vh]">
                <DrawerHeader className="sr-only">
                  <DrawerTitle>Agendamentos de Hoje</DrawerTitle>
                </DrawerHeader>
                <div className="h-[75vh]">
                  <SidebarContent />
                </div>
              </DrawerContent>
            </Drawer>
          ) : (
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 lg:hidden">
                  <ListFilter className="h-4 w-4" />
                  <span>Hoje</span>
                  <Badge variant="secondary" className="h-5 w-5 p-0 flex items-center justify-center text-[10px]">
                    {appointments.length}
                  </Badge>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[340px] p-0">
                <SheetHeader className="sr-only">
                  <SheetTitle>Agendamentos de Hoje</SheetTitle>
                </SheetHeader>
                <SidebarContent />
              </SheetContent>
            </Sheet>
          )}
          
          <Button className="gap-2" size="sm">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Novo Agendamento</span>
          </Button>
        </div>
      </PageHeader>

      {/* Filters - Collapsible on mobile */}
      <div className="px-4 sm:px-6 pt-3">
        <CalendarFilters 
          hideUpcoming={hideUpcoming}
          onHideUpcomingChange={setHideUpcoming}
        />
      </div>

      {/* Main Content - Desktop with sidebar, Mobile full calendar */}
      <div className="flex flex-1 min-h-0 px-4 sm:px-6 py-4 gap-4">
        {/* Desktop Sidebar - Hidden on tablet/mobile or when hideUpcoming is true */}
        {!hideUpcoming && (
          <div className="hidden xl:flex flex-col w-[360px] border border-border/50 bg-card/50 backdrop-blur-sm rounded-xl overflow-hidden flex-shrink-0">
            <SidebarContent />
          </div>
        )}

        {/* Calendar Area - Full width on mobile/tablet */}
        <div className="flex-1 min-w-0">
          <FullCalendarView />
        </div>
      </div>
    </PageContainer>
  );
};

export default Calendar;
