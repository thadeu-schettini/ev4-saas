import { Clock, User, Video, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const appointments = [
  {
    id: 1,
    patient: "Maria Silva",
    time: "09:00",
    type: "Consulta",
    mode: "presencial",
    status: "confirmado",
    professional: "Dr. Ricardo",
  },
  {
    id: 2,
    patient: "João Santos",
    time: "09:30",
    type: "Retorno",
    mode: "online",
    status: "aguardando",
    professional: "Dra. Ana",
  },
  {
    id: 3,
    patient: "Ana Oliveira",
    time: "10:00",
    type: "Exame",
    mode: "presencial",
    status: "confirmado",
    professional: "Dr. Carlos",
  },
  {
    id: 4,
    patient: "Carlos Mendes",
    time: "10:30",
    type: "Consulta",
    mode: "domiciliar",
    status: "confirmado",
    professional: "Dr. Ricardo",
  },
  {
    id: 5,
    patient: "Paula Costa",
    time: "11:00",
    type: "Consulta",
    mode: "presencial",
    status: "pendente",
    professional: "Dra. Ana",
  },
];

const statusStyles = {
  confirmado: "bg-success/10 text-success border-success/20",
  aguardando: "bg-warning/10 text-warning border-warning/20",
  pendente: "bg-muted text-muted-foreground border-muted",
};

const statusLabels = {
  confirmado: "Confirmado",
  aguardando: "Aguardando",
  pendente: "Pendente",
};

const modeIcons = {
  presencial: User,
  online: Video,
  domiciliar: MapPin,
};

export function UpcomingAppointments() {
  return (
    <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Próximos Agendamentos</h3>
          <p className="text-sm text-muted-foreground">Hoje, {new Date().toLocaleDateString("pt-BR")}</p>
        </div>
        <Badge variant="secondary" className="gap-1">
          <Clock className="h-3 w-3" />
          {appointments.length} agendados
        </Badge>
      </div>
      
      <div className="space-y-3">
        {appointments.map((appointment) => {
          const ModeIcon = modeIcons[appointment.mode as keyof typeof modeIcons];
          return (
            <div
              key={appointment.id}
              className="group flex items-center gap-4 rounded-xl border border-border/50 bg-background/50 p-4 transition-all duration-200 hover:border-primary/20 hover:bg-primary/5"
            >
              <Avatar className="h-10 w-10 shrink-0">
                <AvatarFallback className="bg-primary/10 text-primary font-medium text-sm">
                  {appointment.patient.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-foreground truncate">{appointment.patient}</p>
                  <ModeIcon className="h-4 w-4 text-muted-foreground shrink-0" />
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{appointment.time}</span>
                  <span>•</span>
                  <span>{appointment.type}</span>
                  <span>•</span>
                  <span className="truncate">{appointment.professional}</span>
                </div>
              </div>
              
              <Badge
                variant="outline"
                className={cn(
                  "shrink-0",
                  statusStyles[appointment.status as keyof typeof statusStyles]
                )}
              >
                {statusLabels[appointment.status as keyof typeof statusLabels]}
              </Badge>
            </div>
          );
        })}
      </div>
    </div>
  );
}