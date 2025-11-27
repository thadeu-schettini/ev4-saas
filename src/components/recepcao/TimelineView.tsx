import { AppointmentListItem } from "@/components/AppointmentListItem";
import { Clock, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface TimelineViewProps {
  searchQuery: string;
}

const appointments = [
  {
    patientName: "Paciente 35 Glover",
    patientInitials: "PG",
    phone: "551910419730",
    time: "08:50",
    status: "pending" as const,
    service: "Consulta Cardiologia",
    professional: "Dr(a). Rollin Durgan",
    payment: "Sem pagamento",
    price: "Sem preço"
  },
  {
    patientName: "Paciente 12 Heller",
    patientInitials: "PH",
    phone: "551910135795",
    time: "11:30",
    status: "pending" as const,
    service: "Consulta Dermatologia",
    professional: "Dr(a). Brayan O'Keefe",
    payment: "Sem pagamento",
    price: "Sem preço"
  },
  {
    patientName: "Paciente 7 Cruickshank",
    patientInitials: "PC",
    phone: "551910074070",
    time: "12:05",
    status: "completed" as const,
    service: "Consulta Dermatologia",
    professional: "Dr(a). Cleta Bogisich",
    payment: "Pago",
    price: "R$ 210,00"
  }
];

export const TimelineView = ({ searchQuery }: TimelineViewProps) => {
  const filteredAppointments = appointments.filter(apt =>
    searchQuery === "" ||
    apt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    apt.professional.toLowerCase().includes(searchQuery.toLowerCase()) ||
    apt.service.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group by time periods
  const morning = filteredAppointments.filter(apt => {
    const hour = parseInt(apt.time.split(':')[0]);
    return hour < 12;
  });

  const afternoon = filteredAppointments.filter(apt => {
    const hour = parseInt(apt.time.split(':')[0]);
    return hour >= 12 && hour < 18;
  });

  const evening = filteredAppointments.filter(apt => {
    const hour = parseInt(apt.time.split(':')[0]);
    return hour >= 18;
  });

  const TimelineSection = ({ title, items, icon }: { title: string, items: typeof appointments, icon: React.ReactNode }) => {
    if (items.length === 0) return null;

    return (
      <div className="animate-fade-in">
        <div className="flex items-center gap-3 mb-4">
          {icon}
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <Badge variant="secondary">{items.length}</Badge>
        </div>
        <div className="space-y-3 ml-8 border-l-2 border-border/50 pl-6 relative">
          {items.map((apt, index) => (
            <div key={index} className="relative">
              <div className="absolute -left-[29px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background" />
              <AppointmentListItem {...apt} />
            </div>
          ))}
        </div>
        <Separator className="my-8" />
      </div>
    );
  };

  return (
    <div className="p-4 sm:p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 animate-fade-in [animation-delay:200ms]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
          <Calendar className="h-6 w-6 text-primary" />
          Timeline do Dia
        </h2>
      </div>

      <div className="space-y-0">
        <TimelineSection 
          title="Manhã" 
          items={morning}
          icon={<Clock className="h-5 w-5 text-warning" />}
        />
        <TimelineSection 
          title="Tarde" 
          items={afternoon}
          icon={<Clock className="h-5 w-5 text-primary" />}
        />
        <TimelineSection 
          title="Noite" 
          items={evening}
          icon={<Clock className="h-5 w-5 text-accent" />}
        />
      </div>

      {filteredAppointments.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
          <p className="text-muted-foreground">Nenhum agendamento encontrado</p>
        </div>
      )}
    </div>
  );
};
