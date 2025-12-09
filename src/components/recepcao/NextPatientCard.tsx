import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, User, Phone, Play, ArrowRight, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

interface NextPatient {
  name: string;
  time: string;
  service: string;
  professional: string;
  phone: string;
  isUrgent?: boolean;
  waitingTime?: number;
}

const nextPatient: NextPatient = {
  name: "Maria Silva",
  time: "14:30",
  service: "Consulta Cardiologia",
  professional: "Dr. João Santos",
  phone: "+55 11 98765-4321",
  isUrgent: false,
  waitingTime: 5,
};

export function NextPatientCard() {
  const handleStartAttendance = () => {
    toast.success(`Iniciando atendimento de ${nextPatient.name}`);
  };

  const handleCallPatient = () => {
    toast.info(`Chamando ${nextPatient.name}...`);
  };

  return (
    <div className="relative overflow-hidden rounded-xl border border-primary/30 bg-gradient-to-br from-primary/5 via-card to-card p-4 sm:p-5 shadow-sm">
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
      
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
            <span className="text-sm font-medium text-muted-foreground">Próximo Paciente</span>
          </div>
          {nextPatient.isUrgent && (
            <Badge className="bg-destructive/10 text-destructive border-destructive/20">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Urgente
            </Badge>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-start gap-4 flex-1">
            <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 ring-2 ring-primary/20">
              <span className="text-lg font-bold text-primary">
                {nextPatient.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground text-lg truncate">{nextPatient.name}</h3>
              <p className="text-sm text-muted-foreground truncate">{nextPatient.service}</p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {nextPatient.time}
                </span>
                <span className="flex items-center gap-1">
                  <User className="h-3.5 w-3.5" />
                  {nextPatient.professional}
                </span>
              </div>
              {nextPatient.waitingTime !== undefined && nextPatient.waitingTime > 0 && (
                <Badge variant="secondary" className="mt-2 bg-warning/10 text-warning">
                  Aguardando há {nextPatient.waitingTime} min
                </Badge>
              )}
            </div>
          </div>

          <div className="flex sm:flex-col gap-2 sm:justify-center">
            <Button
              size="sm"
              className="flex-1 sm:flex-none gap-2"
              onClick={handleStartAttendance}
            >
              <Play className="h-4 w-4" />
              <span className="hidden sm:inline">Iniciar</span>
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="flex-1 sm:flex-none gap-2"
              onClick={handleCallPatient}
            >
              <ArrowRight className="h-4 w-4" />
              <span className="hidden sm:inline">Chamar</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
