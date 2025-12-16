import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Clock, Receipt, AlertCircle, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const pendingItems = [
  { patient: "Ana Costa", service: "Exame", value: 450, dueDate: "15/01", days: 5, status: "vencendo" },
  { patient: "Pedro Oliveira", service: "Consulta", value: 350, dueDate: "10/01", days: -5, status: "atrasado" },
  { patient: "Lucia Ferreira", service: "Procedimento", value: 800, dueDate: "20/01", days: 10, status: "em_dia" },
  { patient: "Roberto Alves", service: "Retorno", value: 200, dueDate: "08/01", days: -7, status: "atrasado" },
];

interface PendingDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  total: number;
}

export function PendingDetailModal({ open, onOpenChange, total }: PendingDetailModalProps) {
  const getStatusBadge = (status: string, days: number) => {
    if (status === "atrasado") {
      return <Badge variant="destructive" className="text-xs">{Math.abs(days)} dias atrasado</Badge>;
    }
    if (status === "vencendo") {
      return <Badge variant="secondary" className="text-xs bg-warning/20 text-warning">Vence em {days} dias</Badge>;
    }
    return <Badge variant="outline" className="text-xs">Em {days} dias</Badge>;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-warning/10">
              <Clock className="h-5 w-5 text-warning" />
            </div>
            Valores Pendentes
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-gradient-to-br from-warning/10 to-warning/5 border border-warning/20">
              <p className="text-sm text-muted-foreground">Total Pendente</p>
              <p className="text-2xl font-bold text-warning">R$ {total.toLocaleString('pt-BR')}</p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-destructive/10 to-destructive/5 border border-destructive/20">
              <p className="text-sm text-muted-foreground">Atrasados</p>
              <p className="text-2xl font-bold text-destructive">R$ 550</p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-info/10 to-info/5 border border-info/20">
              <p className="text-sm text-muted-foreground">A Vencer</p>
              <p className="text-2xl font-bold text-info">R$ 1.250</p>
            </div>
          </div>

          {/* Pending List */}
          <div className="space-y-2">
            <h4 className="font-medium text-sm text-muted-foreground">Lista de Pendências</h4>
            <div className="space-y-2">
              {pendingItems.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm ${
                      item.status === "atrasado" ? "bg-destructive/20 text-destructive" : "bg-warning/20 text-warning"
                    }`}>
                      {item.patient.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{item.patient}</p>
                      <p className="text-xs text-muted-foreground">{item.service}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="font-medium text-sm">R$ {item.value}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 justify-end">
                        <Calendar className="h-3 w-3" />
                        {item.dueDate}
                      </p>
                    </div>
                    {getStatusBadge(item.status, item.days)}
                    <Button size="sm" variant="ghost" className="h-7 text-xs">Cobrar</Button>
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
