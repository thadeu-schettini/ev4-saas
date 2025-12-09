import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type Period = "week" | "month" | "quarter";

interface PeriodSelectorProps {
  value: Period;
  onChange: (period: Period) => void;
  className?: string;
}

const periods: { value: Period; label: string }[] = [
  { value: "week", label: "Semana" },
  { value: "month", label: "Mês" },
  { value: "quarter", label: "Trimestre" },
];

export function PeriodSelector({ value, onChange, className }: PeriodSelectorProps) {
  return (
    <div className={cn("inline-flex rounded-lg bg-muted/50 p-1", className)}>
      {periods.map((period) => (
        <Button
          key={period.value}
          variant="ghost"
          size="sm"
          onClick={() => onChange(period.value)}
          className={cn(
            "h-7 px-3 text-xs font-medium transition-all duration-200",
            value === period.value
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground hover:bg-transparent"
          )}
        >
          {period.label}
        </Button>
      ))}
    </div>
  );
}
