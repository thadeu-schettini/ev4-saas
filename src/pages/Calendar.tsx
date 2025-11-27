import { CalendarFilters } from "@/components/CalendarFilters";
import { AppointmentListItem } from "@/components/AppointmentListItem";
import { StatusHistoryItem } from "@/components/StatusHistoryItem";
import { ScrollArea } from "@/components/ui/scroll-area";

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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-card p-6">
        <h1 className="text-3xl font-bold text-foreground">Agenda</h1>
      </div>

      {/* Filters */}
      <CalendarFilters />

      {/* Main Content */}
      <div className="flex h-[calc(100vh-180px)]">
        {/* Left Sidebar */}
        <div className="w-96 border-r border-border/50 bg-card flex flex-col">
          {/* Appointments List */}
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="divide-y divide-border/50">
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

          {/* Status History */}
          <div className="border-t border-border/50">
            <div className="p-4 flex items-center justify-between bg-muted/30">
              <h3 className="font-semibold text-foreground text-sm">Histórico de status</h3>
              <span className="text-xs text-muted-foreground">Últimas 5 alterações</span>
            </div>
            <ScrollArea className="h-80">
              <div>
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

        {/* Calendar Grid Area - Placeholder */}
        <div className="flex-1 bg-background p-6">
          <div className="h-full rounded-lg border-2 border-dashed border-border/50 flex items-center justify-center">
            <p className="text-muted-foreground text-lg">
              Área do calendário semanal (a ser implementado)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
