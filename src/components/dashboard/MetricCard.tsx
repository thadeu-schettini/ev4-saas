import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  iconGradient?: string;
  description?: string;
  index?: number;
}

export function MetricCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  iconGradient = "from-primary to-primary/80",
  description,
  index = 0,
}: MetricCardProps) {
  return (
    <div 
      className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary/20 hover:-translate-y-1 animate-fade-in opacity-0"
      style={{ 
        animationDelay: `${index * 50}ms`,
        animationFillMode: "forwards"
      }}
    >
      {/* Background gradient on hover */}
      <div className={cn(
        "absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-5 bg-gradient-to-br",
        iconGradient
      )} />
      
      <div className="relative flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold tracking-tight text-foreground">
              {value}
            </h3>
            {change && (
              <span
                className={cn(
                  "text-sm font-medium",
                  changeType === "positive" && "text-success",
                  changeType === "negative" && "text-destructive",
                  changeType === "neutral" && "text-muted-foreground"
                )}
              >
                {change}
              </span>
            )}
          </div>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
        
        <div className={cn(
          "rounded-xl p-3 bg-gradient-to-br shadow-lg group-hover:scale-110 transition-transform duration-300",
          iconGradient
        )}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );
}