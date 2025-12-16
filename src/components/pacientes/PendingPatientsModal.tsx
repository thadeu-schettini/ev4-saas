import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Clock, DollarSign, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const pendingPatients = [
  { name: "Pedro Oliveira", type: "Financeiro", amount: "R$ 350", days: 15 },
  { name: "Lucia Ferreira", type: "Documentação", amount: null, days: 7 },
  { name: "Roberto Alves", type: "Financeiro", amount: "R$ 200", days: 30 },
  { name: "Camila Rodrigues", type: "Retorno", amount: null, days: 45 },
];

interface PendingPatientsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pending: number;
}

export function PendingPatientsModal({ open, onOpenChange, pending }: PendingPatientsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-warning/10">
              <AlertCircle className="h-5 w-5 text-warning" />
            </div>
            Pacientes com Pendências
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-gradient-to-br from-warning/10 to-warning/5 border border-warning/20">
              <p className="text-sm text-muted-foreground">Total Pendências</p>
              <p className="text-2xl font-bold text-warning">{pending}</p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-destructive/10 to-destructive/5 border border-destructive/20">
              <p className="text-sm text-muted-foreground">Financeiras</p>
              <p className="text-2xl font-bold text-destructive">2</p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-info/10 to-info/5 border border-info/20">
              <p className="text-sm text-muted-foreground">Documentação</p>
              <p className="text-2xl font-bold text-info">1</p>
            </div>
          </div>

          {/* Pending List */}
          <div className="space-y-2">
            <h4 className="font-medium text-sm text-muted-foreground">Lista de Pendências</h4>
            <div className="space-y-2">
              {pendingPatients.map((patient, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-warning/20 flex items-center justify-center text-warning font-medium text-sm">
                      {patient.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{patient.name}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {patient.days} dias
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={patient.type === "Financeiro" ? "destructive" : "secondary"} className="text-xs">
                      {patient.type}
                    </Badge>
                    {patient.amount && (
                      <Badge variant="outline" className="text-xs">{patient.amount}</Badge>
                    )}
                    <Button size="sm" variant="ghost" className="h-7 text-xs">Resolver</Button>
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
