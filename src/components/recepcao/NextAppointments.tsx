import { Clock, User, Stethoscope, CheckCircle2, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const nextAppointments = [
  {
    id: 1,
    patient: "Maria Silva",
    initials: "MS",
    time: "09:30",
    timeUntil: "Em 5 minutos",
    professional: "Dr. João Santos",
    service: "Consulta Cardiologia",
    status: "confirmed",
    urgent: false
  },
  {
    id: 2,
    patient: "Carlos Oliveira",
    initials: "CO",
    time: "10:00",
    timeUntil: "Em 35 minutos",
    professional: "Dra. Ana Costa",
    service: "Consulta Dermatologia",
    status: "waiting",
    urgent: false
  },
  {
    id: 3,
    patient: "Pedro Santos",
    initials: "PS",
    time: "10:30",
    timeUntil: "Em 1 hora",
    professional: "Dr. João Santos",
    service: "Retorno Cardiologia",
    status: "pending",
    urgent: true
  }
];

export const NextAppointments = () => {
  return (
    <div className="p-4 sm:p-5 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 animate-fade-in [animation-delay:100ms]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base sm:text-lg font-semibold text-foreground flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Próximos Atendimentos
        </h3>
        <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
          {nextAppointments.length} pacientes
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {nextAppointments.map((apt, index) => (
          <div
            key={apt.id}
            className={`group p-4 bg-gradient-to-br from-background to-background/50 rounded-xl border transition-all duration-300 hover:shadow-lg animate-fade-in ${
              apt.urgent
                ? 'border-warning/50 hover:border-warning'
                : 'border-border/50 hover:border-primary/30'
            }`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {apt.urgent && (
              <Badge variant="destructive" className="mb-2 text-xs">
                <AlertCircle className="h-3 w-3 mr-1" />
                Urgente
              </Badge>
            )}
            
            <div className="flex items-start gap-3 mb-3">
              <Avatar className="h-12 w-12 border-2 border-primary/20 group-hover:border-primary/40 transition-colors">
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                  {apt.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-foreground truncate">{apt.patient}</h4>
                <p className="text-xs text-muted-foreground">{apt.service}</p>
              </div>
            </div>

            <div className="space-y-2 mb-3">
              <div className="flex items-center gap-2 text-xs">
                <Clock className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                <span className="font-semibold text-foreground">{apt.time}</span>
                <span className="text-muted-foreground">• {apt.timeUntil}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Stethoscope className="h-3.5 w-3.5 flex-shrink-0" />
                <span className="truncate">{apt.professional}</span>
              </div>
            </div>

            <Button
              size="sm"
              className="w-full bg-gradient-to-r from-primary to-primary-glow hover:shadow-md transition-all duration-300"
            >
              <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
              Check-in
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
