import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Users, Activity, Calendar, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const patients = [
  { name: "Maria Silva", plan: "Pré-natal", progress: 67, sessions: "4/6" },
  { name: "João Santos", plan: "Fisioterapia", progress: 40, sessions: "4/10" },
  { name: "Ana Costa", plan: "Check-up", progress: 100, sessions: "3/3" },
  { name: "Carlos Lima", plan: "Dermatologia", progress: 25, sessions: "2/8" },
];

interface TreatmentPatientsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TreatmentPatientsModal({ open, onOpenChange }: TreatmentPatientsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500 to-green-500">
              <Users className="h-5 w-5 text-white" />
            </div>
            Pacientes em Tratamento
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-green-500/5 border border-emerald-500/20">
              <p className="text-sm text-muted-foreground">Em Tratamento</p>
              <p className="text-2xl font-bold text-emerald-600">104</p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-success/10 to-success/5 border border-success/20">
              <p className="text-sm text-muted-foreground">Finalizando</p>
              <p className="text-2xl font-bold text-success">18</p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
              <p className="text-sm text-muted-foreground">Novos</p>
              <p className="text-2xl font-bold text-primary">+12</p>
            </div>
          </div>

          {/* Patients List */}
          <div className="space-y-2">
            <h4 className="font-medium text-sm text-muted-foreground">Progresso dos Pacientes</h4>
            <div className="space-y-3">
              {patients.map((patient, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-600 font-medium text-sm">
                        {patient.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{patient.name}</p>
                        <p className="text-xs text-muted-foreground">{patient.plan}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">{patient.sessions} sessões</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={patient.progress} className="h-2 flex-1" />
                    <span className="text-xs font-medium text-muted-foreground w-10 text-right">{patient.progress}%</span>
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
