import { CalendarFilters } from "@/components/CalendarFilters";
import { AppointmentListItem } from "@/components/AppointmentListItem";
import { StatusHistoryItem } from "@/components/StatusHistoryItem";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar as CalendarIcon, History, Sparkles } from "lucide-react";

const Calendar = () => {
  const appointments = [
    { time: "09:20 - 09:50", patientName: "Paciente 28 Sanford", status: "confirmed" as const },
    { time: "10:05 - 10:35", patientName: "Paciente 5 Zieme", status: "cancelled" as const },
    { time: "12:05 - 12:35", patientName: "Paciente 7 Cruickshank", status: "completed" as const },
    { time: "13:00 - 13:30", patientName: "Paciente 36 Sanford", status: "pending" as const },
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
      {/* Header with gradient */}
      <div className="relative border-b border-border/50 bg-gradient-to-r from-card to-card/80 backdrop-blur-sm overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50" />
        <div className="relative p-6 flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center shadow-lg">
            <CalendarIcon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              Agenda
              <Sparkles className="h-5 w-5 text-primary animate-pulse" />
            </h1>
            <p className="text-sm text-muted-foreground font-medium">Gerencie seus agendamentos</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <CalendarFilters />

      {/* Main Content */}
      <div className="flex h-[calc(100vh-200px)]">
        {/* Left Sidebar with modern design */}
        <div className="w-96 border-r border-border/50 bg-card/50 backdrop-blur-sm flex flex-col shadow-lg">
          {/* Appointments List */}
          <div className="flex-1 overflow-hidden">
            <div className="p-4 bg-gradient-to-r from-muted/40 to-transparent border-b border-border/30">
              <h3 className="font-bold text-foreground flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-primary" />
                Agendamentos de Hoje
                <span className="ml-auto text-xs font-semibold px-2 py-1 rounded-full bg-primary/10 text-primary">
                  {appointments.length}
                </span>
              </h3>
            </div>
            <ScrollArea className="h-full">
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
          </div>

          {/* Status History with timeline */}
          <div className="border-t border-border/50 bg-gradient-to-b from-muted/20 to-muted/40">
            <div className="p-4 flex items-center justify-between bg-gradient-to-r from-muted/60 to-transparent">
              <h3 className="font-bold text-foreground text-sm flex items-center gap-2">
                <History className="h-4 w-4 text-primary" />
                Histórico de Status
              </h3>
              <span className="text-xs text-muted-foreground font-semibold px-2 py-1 rounded-full bg-background/80">
                Últimas 5
              </span>
            </div>
            <ScrollArea className="h-96">
              <div className="py-2">
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

        {/* Calendar Grid Area - Modern Placeholder */}
        <div className="flex-1 bg-gradient-to-br from-background to-muted/10 p-8">
          <div className="h-full rounded-2xl border-2 border-dashed border-primary/20 bg-gradient-to-br from-card/50 to-transparent backdrop-blur-sm flex flex-col items-center justify-center gap-4 hover:border-primary/40 transition-all duration-500 group">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative h-24 w-24 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center border border-primary/20 group-hover:scale-110 transition-transform duration-500">
                <CalendarIcon className="h-12 w-12 text-primary" />
              </div>
            </div>
            <div className="text-center space-y-2">
              <p className="text-muted-foreground text-lg font-semibold">
                Calendário Semanal
              </p>
              <p className="text-muted-foreground/60 text-sm max-w-md">
                Visualização em grade dos agendamentos será exibida aqui com funcionalidades de arrastar e soltar
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
