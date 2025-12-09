import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Activity, 
  Users, 
  Clock, 
  CheckCircle2,
  AlertCircle,
  Zap
} from "lucide-react";

const realtimeData = [
  {
    label: "Em Atendimento",
    value: 5,
    icon: Activity,
    color: "text-success",
    bgColor: "bg-success/10",
    borderColor: "border-success/30",
    pulse: true
  },
  {
    label: "Na Espera",
    value: 8,
    icon: Clock,
    color: "text-warning",
    bgColor: "bg-warning/10",
    borderColor: "border-warning/30",
    pulse: false
  },
  {
    label: "Finalizados Hoje",
    value: 18,
    icon: CheckCircle2,
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/30",
    pulse: false
  },
  {
    label: "Próximos 30min",
    value: 3,
    icon: Zap,
    color: "text-info",
    bgColor: "bg-info/10",
    borderColor: "border-info/30",
    pulse: true
  }
];

export function RealtimeStats() {
  const totalToday = 24;
  const completedToday = 18;
  const progressPercent = Math.round((completedToday / totalToday) * 100);

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        {/* Header with live indicator */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
              <div className="absolute inset-0 h-2 w-2 rounded-full bg-success/50 animate-ping" />
            </div>
            <span className="text-sm font-semibold text-foreground">Tempo Real</span>
          </div>
          <Badge variant="outline" className="text-xs">
            {progressPercent}% do dia
          </Badge>
        </div>

        {/* Progress bar for day completion */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
            <span>Progresso do dia</span>
            <span>{completedToday}/{totalToday} atendimentos</span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-primary-glow rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-2">
          {realtimeData.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className={`p-3 rounded-lg ${stat.bgColor} border ${stat.borderColor} transition-all duration-200 hover:shadow-md`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                  {stat.pulse && (
                    <div className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                  )}
                </div>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-[10px] text-muted-foreground">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Alert section */}
        <div className="mt-3 p-2 rounded-lg bg-warning/10 border border-warning/20 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-warning flex-shrink-0" />
          <span className="text-xs text-warning">2 pacientes aguardando há mais de 15min</span>
        </div>
      </CardContent>
    </Card>
  );
}
