import { useState } from "react";
import { CalendarFilters } from "@/components/CalendarFilters";
import { AppointmentListItem } from "@/components/AppointmentListItem";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FullCalendarView } from "@/components/calendar/FullCalendarView";
import { PageContainer } from "@/components/ui/page-container";
import { PageHeader } from "@/components/ui/page-header";
import "@/components/calendar/CalendarStyles.css";
import { 
  Calendar as CalendarIcon, 
  TrendingUp, 
  Users, 
  Clock,
  PanelLeftClose,
  PanelLeft,
  Plus
} from "lucide-react";
import { cn } from "@/lib/utils";

const Calendar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const appointments = [
    { time: "09:00 - 09:30", patientName: "Maria Silva", status: "confirmed" as const },
    { time: "10:00 - 10:30", patientName: "Carlos Oliveira", status: "pending" as const },
    { time: "11:30 - 12:00", patientName: "Ana Costa", status: "completed" as const },
    { time: "14:00 - 14:45", patientName: "Pedro Souza", status: "cancelled" as const },
    { time: "15:00 - 15:30", patientName: "Julia Martins", status: "confirmed" as const },
    { time: "16:00 - 17:00", patientName: "Lucas Ferreira", status: "pending" as const },
  ];

  const stats = [
    { label: "Agendamentos", value: "12", icon: Users, color: "text-primary" },
    { label: "Concluídos", value: "8", icon: TrendingUp, color: "text-emerald-600" },
    { label: "Pendentes", value: "4", icon: Clock, color: "text-amber-600" },
  ];

  return (
    <PageContainer>
      <PageHeader
        title="Agenda"
        description="Gerencie seus agendamentos"
        icon={CalendarIcon}
        iconColor="from-violet-500 to-purple-600"
      >
        <div className="hidden lg:flex items-center gap-2">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50 border border-border/50"
              >
                <Icon className={`h-4 w-4 ${stat.color}`} />
                <span className="text-sm font-semibold">{stat.value}</span>
                <span className="text-xs text-muted-foreground">{stat.label}</span>
              </div>
            );
          })}
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Novo Agendamento</span>
        </Button>
      </PageHeader>

      {/* Filters */}
      <CalendarFilters />

      {/* Main Content */}
      <div className="flex h-[calc(100vh-180px)]">
        {/* Left Sidebar */}
        <div className={cn(
          "border-r border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 flex flex-col",
          sidebarOpen ? "w-full lg:w-[340px] xl:w-[380px]" : "w-0 overflow-hidden",
          "absolute lg:relative z-10 h-full lg:h-auto"
        )}>
          {/* Toggle Button (Desktop) */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden lg:flex absolute -right-3 top-4 z-20 h-6 w-6 rounded-full bg-card border border-border shadow-md hover:bg-muted"
          >
            {sidebarOpen ? <PanelLeftClose className="h-3 w-3" /> : <PanelLeft className="h-3 w-3" />}
          </Button>

          {/* Appointments List Header */}
          <div className="px-4 py-3 bg-muted/30 border-b border-border/30 flex-shrink-0">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm text-foreground">
                Agendamentos de Hoje
              </h3>
              <Badge variant="secondary" className="text-xs font-medium">
                {appointments.length}
              </Badge>
            </div>
          </div>

          {/* Appointments Scroll Area */}
          <ScrollArea className="flex-1">
            <div className="py-2">
              {appointments.map((apt, index) => (
                <AppointmentListItem
                  key={index}
                  time={apt.time}
                  patientName={apt.patientName}
                  status={apt.status}
                />
              ))}
            </div>
          </ScrollArea>

          {/* Quick Stats (Mobile) */}
          <div className="lg:hidden p-4 border-t border-border/30 bg-muted/20">
            <div className="grid grid-cols-3 gap-2">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div 
                    key={index}
                    className="text-center p-2 rounded-lg bg-card border border-border/50"
                  >
                    <Icon className={`h-4 w-4 mx-auto mb-1 ${stat.color}`} />
                    <div className="text-lg font-bold text-foreground">{stat.value}</div>
                    <div className="text-[10px] text-muted-foreground">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Calendar Area */}
        <div className={cn(
          "flex-1 transition-all duration-300",
          !sidebarOpen && "lg:ml-0"
        )}>
          <FullCalendarView />
        </div>
      </div>

      {/* Mobile toggle */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed bottom-4 right-4 h-12 w-12 rounded-full shadow-lg z-50"
      >
        {sidebarOpen ? <PanelLeftClose className="h-5 w-5" /> : <PanelLeft className="h-5 w-5" />}
      </Button>
    </PageContainer>
  );
};

export default Calendar;
