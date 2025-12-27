import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Calendar, 
  Timer, 
  Star, 
  UserCheck,
  Download,
  TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ProdutividadeMetricDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  metricType: "consultations" | "duration" | "satisfaction" | "returnRate";
}

const mockData = {
  consultations: {
    title: "Total Consultas",
    description: "Consultas realizadas no período",
    value: "513",
    change: "+12%",
    icon: Calendar,
    color: "from-primary/60 to-primary/80",
    breakdown: [
      { name: "Dr. Carlos Santos", value: 156, percent: 30 },
      { name: "Dra. Ana Lima", value: 98, percent: 19 },
      { name: "Dra. Beatriz Rocha", value: 187, percent: 36 },
      { name: "Dr. Pedro Mendes", value: 72, percent: 14 },
    ]
  },
  duration: {
    title: "Tempo Médio",
    description: "Duração média das consultas",
    value: "31 min",
    change: "-5%",
    icon: Timer,
    color: "from-blue-500/60 to-blue-600/60",
    breakdown: [
      { name: "Clínico Geral", value: "28 min", percent: 90 },
      { name: "Cardiologia", value: "35 min", percent: 113 },
      { name: "Pediatria", value: "22 min", percent: 71 },
      { name: "Ortopedia", value: "40 min", percent: 129 },
    ]
  },
  satisfaction: {
    title: "Satisfação Média",
    description: "Avaliação média dos pacientes",
    value: "4.75",
    change: "+0.2",
    icon: Star,
    color: "from-amber-500/60 to-amber-600/60",
    breakdown: [
      { name: "Dr. Carlos Santos", value: "4.8", percent: 96 },
      { name: "Dra. Ana Lima", value: "4.9", percent: 98 },
      { name: "Dra. Beatriz Rocha", value: "4.7", percent: 94 },
      { name: "Dr. Pedro Mendes", value: "4.6", percent: 92 },
    ]
  },
  returnRate: {
    title: "Taxa de Retorno",
    description: "Pacientes que retornaram para novas consultas",
    value: "35%",
    change: "+3%",
    icon: UserCheck,
    color: "from-emerald-500/60 to-emerald-600/60",
    breakdown: [
      { name: "Cardiologia", value: "45%", percent: 45 },
      { name: "Ortopedia", value: "38%", percent: 38 },
      { name: "Clínico Geral", value: "32%", percent: 32 },
      { name: "Pediatria", value: "28%", percent: 28 },
    ]
  },
};

export function ProdutividadeMetricDetailModal({ 
  open, 
  onOpenChange, 
  metricType 
}: ProdutividadeMetricDetailModalProps) {
  const data = mockData[metricType];
  const Icon = data.icon;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh]">
        <DialogHeader className="pb-4 border-b">
          <div className="flex items-center gap-3">
            <div className={cn("p-2.5 rounded-xl bg-gradient-to-br shadow-lg", data.color)}>
              <Icon className="h-5 w-5 text-white" />
            </div>
            <div>
              <DialogTitle>{data.title}</DialogTitle>
              <p className="text-sm text-muted-foreground mt-0.5">
                {data.description}
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="py-4 space-y-5">
          {/* Main Value */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-primary/5 text-center border border-primary/20">
              <p className="text-3xl font-bold text-primary">{data.value}</p>
              <p className="text-xs text-muted-foreground mt-1">Valor Atual</p>
            </div>
            <div className="p-4 rounded-xl bg-emerald-500/5 text-center border border-emerald-500/20">
              <p className="text-3xl font-bold text-emerald-600">{data.change}</p>
              <p className="text-xs text-muted-foreground mt-1">vs. Período Anterior</p>
            </div>
          </div>

          {/* Breakdown */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">Detalhamento</h4>
            <ScrollArea className="h-[260px]">
              <div className="space-y-2">
                {data.breakdown.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 rounded-xl border bg-card hover:shadow-sm transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-primary text-sm">
                          {item.name.split(' ').slice(0, 2).map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold">{item.value}</span>
                      <Badge 
                        variant="outline" 
                        className={cn(
                          item.percent >= 100 
                            ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" 
                            : "bg-muted"
                        )}
                      >
                        {item.percent}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fechar
          </Button>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Exportar Relatório
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}