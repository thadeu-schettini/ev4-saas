import { Users, Clock, CheckCircle2, AlertCircle, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

interface SummaryItem {
  icon: React.ElementType;
  label: string;
  value: string | number;
  color: string;
  bgColor: string;
}

const summaryItems: SummaryItem[] = [
  {
    icon: Users,
    label: "Sala de Espera",
    value: 4,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Clock,
    label: "Em Atendimento",
    value: 2,
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    icon: CheckCircle2,
    label: "Realizados",
    value: 12,
    color: "text-confirmed",
    bgColor: "bg-confirmed/10",
  },
  {
    icon: AlertCircle,
    label: "Pendentes",
    value: 5,
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  {
    icon: DollarSign,
    label: "A Cobrar",
    value: "R$ 1.2k",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
];

export function ReceptionSummaryBar() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {summaryItems.map((item, index) => (
        <div
          key={item.label}
          className={cn(
            "group relative flex items-center gap-3 p-3 rounded-xl",
            "bg-card/50 backdrop-blur-sm border border-border/50",
            "hover:border-primary/30 hover:shadow-md transition-all duration-300",
            "animate-fade-in"
          )}
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div
            className={cn(
              "h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0",
              "group-hover:scale-110 transition-transform duration-300",
              item.bgColor
            )}
          >
            <item.icon className={cn("h-5 w-5", item.color)} />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground truncate">{item.label}</p>
            <p className={cn("text-lg font-bold", item.color)}>{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
