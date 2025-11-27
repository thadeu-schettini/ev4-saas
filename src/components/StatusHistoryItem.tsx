import { Badge } from "@/components/ui/badge";

interface StatusHistoryItemProps {
  status: "rescheduled" | "confirmed" | "no_show" | "completed";
  patientName: string;
  serviceName: string;
  timestamp: string;
  userName: string;
}

const statusConfig = {
  rescheduled: {
    label: "REAGENDADO",
    color: "bg-warning text-warning-foreground"
  },
  confirmed: {
    label: "CONFIRMADA",
    color: "bg-primary text-primary-foreground"
  },
  no_show: {
    label: "NÃO COMPARECEU",
    color: "bg-destructive text-destructive-foreground"
  },
  completed: {
    label: "CONCLUÍDA",
    color: "bg-success text-success-foreground"
  }
};

export const StatusHistoryItem = ({ 
  status, 
  patientName, 
  serviceName, 
  timestamp, 
  userName 
}: StatusHistoryItemProps) => {
  const config = statusConfig[status];

  return (
    <div className="p-3 border-b border-border/50 hover:bg-muted/20 transition-colors duration-200 animate-fade-in">
      <div className="flex items-start gap-3">
        <Badge className={`${config.color} text-xs font-bold px-2 py-0.5 border-0`}>
          {config.label}
        </Badge>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2">
            <span className="font-semibold text-foreground text-sm">{patientName}</span>
            <span className="text-muted-foreground text-xs">• {serviceName}</span>
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {timestamp} • {userName}
          </div>
        </div>
      </div>
    </div>
  );
};
