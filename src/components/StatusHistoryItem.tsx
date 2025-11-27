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
    <div className="group relative px-4 py-3 hover:bg-gradient-to-r hover:from-muted/40 hover:to-transparent transition-all duration-300 animate-fade-in cursor-pointer">
      {/* Timeline line */}
      <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-border via-border/50 to-transparent" />
      
      <div className="flex items-start gap-4">
        {/* Timeline dot with icon */}
        <div className="relative flex-shrink-0">
          <div className={`relative z-10 h-10 w-10 rounded-xl bg-gradient-to-br ${config.gradient} flex items-center justify-center border-2 border-background group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
            <IconComponent className={`h-4 w-4 ${config.dotColor.replace('bg-', 'text-')}`} />
          </div>
          <div className={`absolute inset-0 ${config.dotColor} opacity-20 rounded-xl blur-md group-hover:blur-lg transition-all duration-300`} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 pt-1">
          <div className="flex items-start justify-between gap-2 mb-2">
            <Badge className={`${config.color} text-xs font-bold px-3 py-1 border-0 shadow-sm group-hover:shadow-md transition-shadow duration-300`}>
              {config.label}
            </Badge>
          </div>
          
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <User className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
              <span className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">{patientName}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Calendar className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
              <span className="text-muted-foreground text-xs">{serviceName}</span>
            </div>
            
            <div className="flex items-center gap-2 text-xs text-muted-foreground/80">
              <Clock className="h-3 w-3 flex-shrink-0" />
              <span>{timestamp}</span>
              <span className="text-muted-foreground/60">•</span>
              <span>{userName}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
