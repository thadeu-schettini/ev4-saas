import { useState } from "react";
import { CalendarFilters } from "@/components/CalendarFilters";
import { AppointmentListItem } from "@/components/AppointmentListItem";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FullCalendarView } from "@/components/calendar/FullCalendarView";
import "@/components/calendar/CalendarStyles.css";
import { 
  Calendar as CalendarIcon, 
  Sparkles, 
  TrendingUp, 
  Users, 
  Clock,
  PanelLeftClose,
  PanelLeft
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
    { label: "Concluídos", value: "8", icon: TrendingUp, color: "text-success" },
    { label: "Pendentes", value: "4", icon: Clock, color: "text-warning" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <div className="relative border-b border-border/50 bg-gradient-to-r from-card via-card to-muted/20 backdrop-blur-sm overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50" />
        
        <div className="relative px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Title Section */}
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 lg:h-12 lg:w-12 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
                <CalendarIcon className="h-5 w-5 lg:h-6 lg:w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl lg:text-2xl font-bold text-foreground flex items-center gap-2">
                  Agenda
                  <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                </h1>
                <p className="text-xs text-muted-foreground font-medium hidden sm:block">
                  Gerencie seus agendamentos
                </p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="hidden lg:flex items-center gap-3">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div 
                    key={index}
                    className="group px-4 py-2 rounded-xl bg-gradient-to-br from-card to-muted/30 border border-border/50 hover:border-primary/30 hover:shadow-md transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Icon className={`h-5 w-5 ${stat.color}`} />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {stat.value}
                        </div>
                        <div className="text-xs text-muted-foreground font-medium">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sidebar Toggle (Mobile/Tablet) */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden h-9 w-9"
            >
              {sidebarOpen ? <PanelLeftClose className="h-4 w-4" /> : <PanelLeft className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <CalendarFilters />

      {/* Main Content */}
      <div className="flex h-[calc(100vh-180px)]">
        {/* Left Sidebar */}
        <div className={cn(
          "border-r border-border/50 bg-card/50 backdrop-blur-sm shadow-lg transition-all duration-300 flex flex-col",
          sidebarOpen ? "w-full lg:w-[340px] xl:w-[380px]" : "w-0 overflow-hidden",
          "absolute lg:relative z-10 h-full lg:h-auto"
        )}>
          {/* Toggle Button (Desktop) */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden lg:flex absolute -right-3 top-4 z-20 h-6 w-6 rounded-full bg-card border border-border shadow-md hover:bg-primary/10"
          >
            {sidebarOpen ? <PanelLeftClose className="h-3 w-3" /> : <PanelLeft className="h-3 w-3" />}
          </Button>

          {/* Appointments List Header */}
          <div className="px-4 py-3 bg-gradient-to-r from-muted/40 to-transparent border-b border-border/30 flex-shrink-0">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-foreground flex items-center gap-2 text-sm">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <CalendarIcon className="h-4 w-4 text-primary" />
                </div>
                Agendamentos de Hoje
              </h3>
              <Badge className="bg-primary/10 text-primary border-0 text-xs font-bold px-2.5 py-1">
                {appointments.length}
              </Badge>
            </div>
          </div>

          {/* Appointments Scroll Area */}
          <ScrollArea className="flex-1">
            <div className="py-3">
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
    </div>
  );
};

export default Calendar;
