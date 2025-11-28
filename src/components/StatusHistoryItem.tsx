import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, Sparkles } from "lucide-react";

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
    color: "bg-warning text-warning-foreground",
    icon: Calendar,
    gradient: "from-warning/10 to-warning/5",
    dotColor: "bg-warning"
  },
  confirmed: {
    label: "CONFIRMADA",
    color: "bg-primary text-primary-foreground",
    icon: Sparkles,
    gradient: "from-primary/10 to-primary/5",
    dotColor: "bg-primary"
  },
  no_show: {
    label: "NÃO COMPARECEU",
    color: "bg-destructive text-destructive-foreground",
    icon: Clock,
    gradient: "from-destructive/10 to-destructive/5",
    dotColor: "bg-destructive"
  },
  completed: {
    label: "CONCLUÍDA",
    color: "bg-success text-success-foreground",
    icon: Sparkles,
    gradient: "from-success/10 to-success/5",
    dotColor: "bg-success"
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
  const IconComponent = config.icon;

  return (
    <div className="group relative px-3 py-2 hover:bg-muted/30 transition-all duration-200 cursor-pointer border-l-2 border-transparent hover:border-primary/50">
      <div className="flex items-center gap-2.5">
        {/* Compact icon */}
        <div className={`h-7 w-7 rounded-lg bg-gradient-to-br ${config.gradient} flex items-center justify-center flex-shrink-0`}>
          <IconComponent className={`h-3.5 w-3.5 ${config.dotColor.replace('bg-', 'text-')}`} />
        </div>

        {/* Condensed content */}
        <div className="flex-1 min-w-0 flex items-center gap-2">
          <Badge className={`${config.color} text-[10px] font-semibold px-2 py-0.5 border-0`}>
            {config.label}
          </Badge>
          <span className="font-medium text-foreground text-xs truncate">{patientName}</span>
          <span className="text-muted-foreground/60 text-xs">•</span>
          <span className="text-muted-foreground text-[10px] truncate">{serviceName}</span>
        </div>

        {/* Compact timestamp */}
        <div className="text-[10px] text-muted-foreground/70 flex-shrink-0">
          {timestamp.split(' ')[1]}
        </div>
      </div>
    </div>
  );
};
