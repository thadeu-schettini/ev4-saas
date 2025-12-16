import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, MapPin } from "lucide-react";

const scheduledPatients = [
  { name: "Maria Silva", date: "Hoje", time: "09:00", service: "Consulta", professional: "Dr. Ricardo" },
  { name: "João Santos", date: "Hoje", time: "10:30", service: "Retorno", professional: "Dra. Ana" },
  { name: "Ana Costa", date: "Amanhã", time: "14:00", service: "Exame", professional: "Dr. Ricardo" },
  { name: "Carlos Lima", date: "Amanhã", time: "15:30", service: "Procedimento", professional: "Dra. Ana" },
  { name: "Paula Souza", date: "18/01", time: "09:00", service: "Consulta", professional: "Dr. Ricardo" },
];

interface ScheduledPatientsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  scheduled: number;
}

export function ScheduledPatientsModal({ open, onOpenChange, scheduled }: ScheduledPatientsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            Pacientes com Agenda
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
              <p className="text-sm text-muted-foreground">Total Agendados</p>
              <p className="text-2xl font-bold text-primary">{scheduled}</p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-success/10 to-success/5 border border-success/20">
              <p className="text-sm text-muted-foreground">Hoje</p>
              <p className="text-2xl font-bold text-success">2</p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-info/10 to-info/5 border border-info/20">
              <p className="text-sm text-muted-foreground">Esta Semana</p>
              <p className="text-2xl font-bold text-info">5</p>
            </div>
          </div>

          {/* Scheduled List */}
          <div className="space-y-2">
            <h4 className="font-medium text-sm text-muted-foreground">Próximos Agendamentos</h4>
            <div className="space-y-2">
              {scheduledPatients.map((patient, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium text-sm">
                      {patient.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{patient.name}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {patient.professional}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-right">
                    <div>
                      <p className="text-sm font-medium">{patient.date}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 justify-end">
                        <Clock className="h-3 w-3" />
                        {patient.time}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs">{patient.service}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
