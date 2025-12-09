import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Flame } from "lucide-react";

// Mock data for heatmap - represents slot utilization by hour and day
const heatmapData = [
  { day: "Seg", slots: [85, 92, 88, 95, 78, 90, 72, 88, 85, 60, 45, 30] },
  { day: "Ter", slots: [78, 88, 92, 100, 85, 88, 80, 75, 70, 55, 40, 25] },
  { day: "Qua", slots: [90, 95, 88, 92, 80, 85, 78, 82, 75, 50, 35, 20] },
  { day: "Qui", slots: [82, 88, 90, 95, 88, 92, 85, 80, 72, 58, 42, 28] },
  { day: "Sex", slots: [88, 92, 95, 98, 90, 88, 82, 78, 68, 52, 38, 22] },
  { day: "Sáb", slots: [65, 75, 80, 85, 70, 60, 45, 35, 25, 15, 10, 5] },
];

const hours = ["07h", "08h", "09h", "10h", "11h", "12h", "13h", "14h", "15h", "16h", "17h", "18h"];

const getHeatColor = (value: number) => {
  if (value >= 90) return "bg-destructive/80 hover:bg-destructive";
  if (value >= 75) return "bg-warning/70 hover:bg-warning/90";
  if (value >= 50) return "bg-success/60 hover:bg-success/80";
  if (value >= 25) return "bg-primary/40 hover:bg-primary/60";
  return "bg-muted/60 hover:bg-muted";
};

const getHeatLabel = (value: number) => {
  if (value >= 90) return "Alta demanda";
  if (value >= 75) return "Demanda moderada";
  if (value >= 50) return "Demanda normal";
  if (value >= 25) return "Baixa demanda";
  return "Muito baixa";
};

export function SlotHeatmap() {
  const avgOccupancy = Math.round(
    heatmapData.reduce((acc, day) => 
      acc + day.slots.reduce((s, v) => s + v, 0) / day.slots.length, 0
    ) / heatmapData.length
  );

  const peakHour = hours[3]; // 10h based on mock data
  const peakDay = "Sex";

  return (
    <Card className="overflow-hidden flex-1 flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <Flame className="h-5 w-5 text-warning" />
              Mapa de Calor - Ocupação
            </CardTitle>
            <CardDescription>Horários mais procurados da semana</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {avgOccupancy}% média
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        {/* Peak indicators */}
        <div className="flex flex-wrap gap-3 mb-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-destructive/10 border border-destructive/20">
            <div className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
            <span className="text-xs font-medium text-destructive">Pico: {peakDay} às {peakHour}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-success/10 border border-success/20">
            <div className="w-2 h-2 rounded-full bg-success" />
            <span className="text-xs font-medium text-success">Melhor horário: Sáb 17h</span>
          </div>
        </div>

        {/* Heatmap Grid */}
        <TooltipProvider>
          <div className="overflow-x-auto">
            <div className="min-w-[500px]">
              {/* Hours header */}
              <div className="flex mb-1">
                <div className="w-10 flex-shrink-0" />
                {hours.map((hour) => (
                  <div 
                    key={hour} 
                    className="flex-1 text-center text-[10px] font-medium text-muted-foreground"
                  >
                    {hour}
                  </div>
                ))}
              </div>

              {/* Heatmap rows */}
              <div className="space-y-1">
                {heatmapData.map((dayData) => (
                  <div key={dayData.day} className="flex items-center gap-1">
                    <div className="w-10 text-xs font-medium text-muted-foreground flex-shrink-0">
                      {dayData.day}
                    </div>
                    <div className="flex-1 flex gap-0.5">
                      {dayData.slots.map((value, idx) => (
                        <Tooltip key={idx}>
                          <TooltipTrigger asChild>
                            <div
                              className={`flex-1 h-7 rounded-sm cursor-pointer transition-all duration-200 ${getHeatColor(value)}`}
                            />
                          </TooltipTrigger>
                          <TooltipContent className="bg-card border-border">
                            <div className="text-xs">
                              <p className="font-semibold">{dayData.day} - {hours[idx]}</p>
                              <p className="text-muted-foreground">{value}% ocupado</p>
                              <p className={`font-medium ${value >= 90 ? 'text-destructive' : value >= 75 ? 'text-warning' : 'text-success'}`}>
                                {getHeatLabel(value)}
                              </p>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TooltipProvider>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-4 pt-3 border-t border-border/50">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-muted/60" />
            <span className="text-[10px] text-muted-foreground">0-25%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-primary/40" />
            <span className="text-[10px] text-muted-foreground">25-50%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-success/60" />
            <span className="text-[10px] text-muted-foreground">50-75%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-warning/70" />
            <span className="text-[10px] text-muted-foreground">75-90%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-destructive/80" />
            <span className="text-[10px] text-muted-foreground">90-100%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
