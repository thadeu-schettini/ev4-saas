import { AlertCircle, Clock, DollarSign, FileX } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const alerts = [
  {
    id: 1,
    type: "warning",
    icon: Clock,
    title: "3 pacientes sem confirmação",
    description: "Agendamentos de hoje aguardando confirmação",
    action: "Enviar lembrete",
    color: "text-warning"
  },
  {
    id: 2,
    type: "info",
    icon: AlertCircle,
    title: "Dr. Silva com 15min de atraso",
    description: "Consultas seguintes podem atrasar",
    action: "Notificar pacientes",
    color: "text-accent"
  },
  {
    id: 3,
    type: "error",
    icon: DollarSign,
    title: "5 cobranças pendentes",
    description: "R$ 1.250 em pagamentos atrasados",
    action: "Ver detalhes",
    color: "text-destructive"
  }
];

export const AlertsPanel = () => {
  return (
    <div className="p-4 sm:p-5 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base sm:text-lg font-semibold text-foreground flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-warning" />
          Alertas do Dia
        </h3>
        <Badge variant="secondary" className="text-xs">
          {alerts.length} alertas
        </Badge>
      </div>

      <div className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="group p-3 sm:p-4 bg-background/50 rounded-lg border border-border/50 hover:border-primary/30 hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-start gap-3">
              <div className={`h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                <alert.icon className={`h-5 w-5 ${alert.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-foreground mb-1">{alert.title}</h4>
                <p className="text-xs text-muted-foreground mb-2">{alert.description}</p>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 text-xs hover:bg-primary/10 hover:border-primary/30"
                >
                  {alert.action}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
