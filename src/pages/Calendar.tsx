import { CalendarFilters } from "@/components/CalendarFilters";
import { AppointmentListItem } from "@/components/AppointmentListItem";
import { StatusHistoryItem } from "@/components/StatusHistoryItem";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, History, Sparkles, ChevronLeft, ChevronRight, TrendingUp, Users, Clock } from "lucide-react";

const Calendar = () => {
  const appointments = [
    { time: "09:20 - 09:50", patientName: "Paciente 28 Sanford", status: "confirmed" as const },
    { time: "10:05 - 10:35", patientName: "Paciente 5 Zieme", status: "cancelled" as const },
    { time: "12:05 - 12:35", patientName: "Paciente 7 Cruickshank", status: "completed" as const },
    { time: "13:00 - 13:30", patientName: "Paciente 36 Sanford", status: "pending" as const },
  ];

  const stats = [
    { label: "Agendamentos", value: "12", icon: Users, color: "text-primary" },
    { label: "Concluídos", value: "8", icon: TrendingUp, color: "text-success" },
    { label: "Pendentes", value: "4", icon: Clock, color: "text-warning" },
  ];

  const statusHistory = [
    {
      status: "rescheduled" as const,
      patientName: "Paciente 36 Sanford",
      serviceName: "Consulta Ortopedia",
      timestamp: "27/11/2025 08:57",
      userName: "Demo EV4"
    },
    {
      status: "confirmed" as const,
      patientName: "Paciente 36 Sanford",
      serviceName: "Consulta Ortopedia",
      timestamp: "27/11/2025 08:57",
      userName: "Demo EV4"
    },
    {
      status: "no_show" as const,
      patientName: "Paciente 36 Sanford",
      serviceName: "Consulta Ortopedia",
      timestamp: "27/11/2025 08:57",
      userName: "Demo EV4"
    },
    {
      status: "completed" as const,
      patientName: "Paciente 36 Sanford",
      serviceName: "Consulta Ortopedia",
      timestamp: "27/11/2025 08:57",
      userName: "Demo EV4"
    },
    {
      status: "confirmed" as const,
      patientName: "Paciente 36 Sanford",
      serviceName: "Consulta Ortopedia",
      timestamp: "27/11/2025 08:57",
      userName: "Demo EV4"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Enhanced Header */}
      <div className="relative border-b border-border/50 bg-gradient-to-r from-card via-card to-muted/20 backdrop-blur-sm overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50" />
        
        <div className="relative px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            {/* Title Section */}
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
                <CalendarIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  Agenda
                  <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                </h1>
                <p className="text-xs text-muted-foreground font-medium">Gerencie seus agendamentos</p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="flex items-center gap-3">
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
          </div>

          {/* Date Navigation */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="icon"
                className="h-9 w-9 hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all duration-300"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <div className="px-6 py-2 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-primary" />
                  <span className="text-sm font-bold text-foreground">27 de Novembro, 2025</span>
                  <Badge variant="secondary" className="ml-2 bg-primary/10 text-primary border-0 text-xs">
                    Hoje
                  </Badge>
                </div>
              </div>

              <Button 
                variant="outline" 
                size="icon"
                className="h-9 w-9 hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all duration-300"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <Button 
              variant="outline" 
              size="sm"
              className="h-9 px-4 hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all duration-300 font-semibold"
            >
              Ir para Hoje
            </Button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <CalendarFilters />

      {/* Main Content */}
      <div className="flex h-[calc(100vh-250px)]">
        {/* Left Sidebar - Optimized */}
        <div className="w-[380px] border-r border-border/50 bg-card/50 backdrop-blur-sm flex flex-col shadow-lg">
          {/* Appointments List */}
          <div className="flex-1 overflow-hidden flex flex-col">
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
          </div>

          {/* Status History - Compact */}
          <div className="border-t border-border/50 bg-gradient-to-b from-muted/20 to-muted/40 flex-shrink-0">
            <div className="px-4 py-3 flex items-center justify-between bg-gradient-to-r from-muted/60 to-transparent">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <History className="h-4 w-4 text-primary" />
                </div>
                <h3 className="font-bold text-foreground text-sm">
                  Histórico de Status
                </h3>
              </div>
              <Badge variant="secondary" className="text-xs font-semibold bg-background/80 border-0">
                5 recentes
              </Badge>
            </div>
            <ScrollArea className="h-[320px]">
              <div className="pb-2">
                {statusHistory.map((item, index) => (
                  <StatusHistoryItem
                    key={index}
                    status={item.status}
                    patientName={item.patientName}
                    serviceName={item.serviceName}
                    timestamp={item.timestamp}
                    userName={item.userName}
                  />
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* Calendar Grid Area - Enhanced Placeholder */}
        <div className="flex-1 bg-gradient-to-br from-background to-muted/10 p-6">
          <div className="h-full rounded-2xl border-2 border-dashed border-primary/20 bg-gradient-to-br from-card/50 via-card/30 to-transparent backdrop-blur-sm flex flex-col items-center justify-center gap-6 hover:border-primary/40 transition-all duration-500 group relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9ImN1cnJlbnRDb2xvciIgb3BhY2l0eT0iMC4wNSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIgY2xhc3M9InRleHQtcHJpbWFyeSIvPjwvc3ZnPg==')] opacity-40" />
            
            <div className="relative z-10 flex flex-col items-center gap-6">
              {/* Icon with glow */}
              <div className="relative">
                <div className="absolute inset-0 bg-primary/30 rounded-full blur-3xl group-hover:blur-2xl transition-all duration-500 animate-pulse" />
                <div className="relative h-28 w-28 rounded-3xl bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 flex items-center justify-center border-2 border-primary/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-xl">
                  <CalendarIcon className="h-14 w-14 text-primary" />
                </div>
              </div>

              {/* Text content */}
              <div className="text-center space-y-3 max-w-lg">
                <h3 className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
                  Calendário Semanal
                  <Sparkles className="h-5 w-5 text-primary animate-pulse" />
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Visualização em grade dos agendamentos com funcionalidades de arrastar e soltar, edição rápida e sincronização em tempo real
                </p>
              </div>

              {/* Feature badges */}
              <div className="flex items-center gap-2 flex-wrap justify-center">
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-xs font-semibold px-3 py-1">
                  Drag & Drop
                </Badge>
                <Badge variant="secondary" className="bg-success/10 text-success border-success/20 text-xs font-semibold px-3 py-1">
                  Tempo Real
                </Badge>
                <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20 text-xs font-semibold px-3 py-1">
                  Multi-profissional
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
