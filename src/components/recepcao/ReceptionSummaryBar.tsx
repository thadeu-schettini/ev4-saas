import { Users, Clock, CheckCircle2, AlertCircle, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

interface SummaryItem {
  icon: React.ElementType;
  label: string;
  value: string | number;
  accentType?: "default" | "success" | "warning" | "muted";
}

const summaryItems: SummaryItem[] = [
  {
    icon: Users,
    label: "Sala de Espera",
    value: 4,
    accentType: "default",
  },
  {
    icon: Clock,
    label: "Em Atendimento",
    value: 2,
    accentType: "success",
  },
  {
    icon: CheckCircle2,
    label: "Realizados",
    value: 12,
    accentType: "muted",
  },
  {
    icon: AlertCircle,
    label: "Pendentes",
    value: 5,
    accentType: "warning",
  },
  {
    icon: DollarSign,
    label: "A Cobrar",
    value: "R$ 1.2k",
    accentType: "default",
  },
];

const accentStyles = {
  default: {
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    valueColor: "text-foreground",
  },
  success: {
    iconBg: "bg-success/10",
    iconColor: "text-success",
    valueColor: "text-foreground",
  },
  warning: {
    iconBg: "bg-warning/10",
    iconColor: "text-warning",
    valueColor: "text-foreground",
  },
  muted: {
    iconBg: "bg-muted",
    iconColor: "text-muted-foreground",
    valueColor: "text-foreground",
  },
};

export function ReceptionSummaryBar() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {summaryItems.map((item, index) => {
        const styles = accentStyles[item.accentType || "default"];
        
        return (
          <div
            key={item.label}
            className={cn(
              "group relative flex items-center gap-3 p-3 rounded-xl",
              "bg-card border border-border/50",
              "hover:border-border hover:shadow-sm transition-all duration-200",
              "animate-fade-in"
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div
              className={cn(
                "h-9 w-9 rounded-lg flex items-center justify-center flex-shrink-0",
                styles.iconBg
              )}
            >
              <item.icon className={cn("h-4 w-4", styles.iconColor)} />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground truncate">{item.label}</p>
              <p className={cn("text-lg font-semibold", styles.valueColor)}>{item.value}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
