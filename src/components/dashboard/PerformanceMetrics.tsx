import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Target, 
  TrendingUp, 
  Clock, 
  Star,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

const performanceData = [
  {
    label: "Taxa de Conversão",
    value: 78,
    target: 85,
    change: 5,
    positive: true,
    icon: Target,
    color: "text-primary",
    bgColor: "bg-primary"
  },
  {
    label: "Satisfação do Paciente",
    value: 94,
    target: 90,
    change: 2,
    positive: true,
    icon: Star,
    color: "text-warning",
    bgColor: "bg-warning"
  },
  {
    label: "Pontualidade",
    value: 88,
    target: 95,
    change: -3,
    positive: false,
    icon: Clock,
    color: "text-info",
    bgColor: "bg-info"
  },
  {
    label: "Retenção de Pacientes",
    value: 92,
    target: 90,
    change: 4,
    positive: true,
    icon: TrendingUp,
    color: "text-success",
    bgColor: "bg-success"
  }
];

export function PerformanceMetrics() {
  const overallScore = Math.round(
    performanceData.reduce((acc, item) => acc + item.value, 0) / performanceData.length
  );

  return (
    <Card className="flex-1 flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Performance Geral</CardTitle>
            <CardDescription>Indicadores-chave de desempenho</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="h-14 w-14 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border-2 border-primary/30">
                <span className="text-lg font-bold text-primary">{overallScore}%</span>
              </div>
              <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-success flex items-center justify-center">
                <ArrowUpRight className="h-3 w-3 text-success-foreground" />
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 flex-1 flex flex-col justify-between">
        {performanceData.map((item, index) => {
          const Icon = item.icon;
          const isAboveTarget = item.value >= item.target;
          
          return (
            <div 
              key={index}
              className="group p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`h-8 w-8 rounded-lg ${item.bgColor}/10 flex items-center justify-center`}>
                    <Icon className={`h-4 w-4 ${item.color}`} />
                  </div>
                  <span className="text-sm font-medium text-foreground">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant="secondary" 
                    className={`text-xs ${item.positive ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}`}
                  >
                    {item.positive ? <ArrowUpRight className="h-3 w-3 mr-0.5" /> : <ArrowDownRight className="h-3 w-3 mr-0.5" />}
                    {item.positive ? '+' : ''}{item.change}%
                  </Badge>
                  <span className="text-lg font-bold text-foreground">{item.value}%</span>
                </div>
              </div>
              
              <div className="relative">
                <Progress value={item.value} className="h-2" />
                <div 
                  className="absolute top-0 h-2 w-0.5 bg-foreground/50"
                  style={{ left: `${item.target}%` }}
                />
              </div>
              
              <div className="flex items-center justify-between mt-1">
                <span className="text-[10px] text-muted-foreground">0%</span>
                <span className={`text-[10px] ${isAboveTarget ? 'text-success' : 'text-warning'}`}>
                  Meta: {item.target}%
                </span>
                <span className="text-[10px] text-muted-foreground">100%</span>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
