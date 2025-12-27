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
  Users, 
  DollarSign, 
  TrendingUp, 
  Clock,
  Flame,
  Download,
  Phone
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PipelineMetricDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  metricType: "total" | "value" | "conversion" | "avgTime" | "reengage";
}

const mockData = {
  total: {
    title: "Total no Pipeline",
    description: "Pacientes em todas as etapas do funil",
    value: 110,
    change: "+15",
    icon: Users,
    color: "from-primary to-primary/80",
    byStage: [
      { stage: "Primeiro Contato", count: 28, color: "bg-slate-500" },
      { stage: "Qualificação", count: 15, color: "bg-blue-500" },
      { stage: "Agendamento", count: 12, color: "bg-amber-500" },
      { stage: "Consulta Realizada", count: 8, color: "bg-emerald-500" },
      { stage: "Fechamento", count: 5, color: "bg-purple-500" },
      { stage: "Fidelizado", count: 42, color: "bg-pink-500" },
    ]
  },
  value: {
    title: "Valor Potencial",
    description: "Receita estimada do pipeline atual",
    value: "R$ 45.2k",
    change: "+R$ 8.5k",
    icon: DollarSign,
    color: "from-emerald-500 to-emerald-600",
    breakdown: [
      { stage: "Agendamento", value: "R$ 12.5k", percent: 28 },
      { stage: "Fechamento", value: "R$ 18.2k", percent: 40 },
      { stage: "Qualificação", value: "R$ 14.5k", percent: 32 },
    ]
  },
  conversion: {
    title: "Taxa de Conversão",
    description: "Percentual de leads convertidos",
    value: "32%",
    change: "+4%",
    icon: TrendingUp,
    color: "from-amber-500 to-amber-600",
    funnel: [
      { stage: "Contato → Qualificação", rate: 54 },
      { stage: "Qualificação → Agendamento", rate: 80 },
      { stage: "Agendamento → Consulta", rate: 67 },
      { stage: "Consulta → Fechamento", rate: 63 },
    ]
  },
  avgTime: {
    title: "Tempo Médio",
    description: "Dias médios em cada etapa",
    value: "5.2 dias",
    change: "-0.8 dias",
    icon: Clock,
    color: "from-blue-500 to-blue-600",
    byStage: [
      { stage: "Primeiro Contato", days: 2.1 },
      { stage: "Qualificação", days: 3.5 },
      { stage: "Agendamento", days: 1.8 },
      { stage: "Fechamento", days: 4.2 },
    ]
  },
  reengage: {
    title: "Reengajar",
    description: "Pacientes que precisam de follow-up",
    value: 23,
    change: "Urgente",
    icon: Flame,
    color: "from-red-500 to-red-600",
    patients: [
      { name: "Luciana Ferreira", lastVisit: "6 meses", action: "Lembrete de retorno", urgency: "high" },
      { name: "Marcos Oliveira", lastVisit: "4 meses", action: "Promoção especial", urgency: "medium" },
      { name: "Sandra Costa", lastVisit: "8 meses", action: "Ligação pessoal", urgency: "high" },
    ]
  },
};

const urgencyColors: Record<string, string> = {
  high: "bg-red-500/10 text-red-600 border-red-500/20",
  medium: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  low: "bg-blue-500/10 text-blue-600 border-blue-500/20",
};

export function PipelineMetricDetailModal({ 
  open, 
  onOpenChange, 
  metricType 
}: PipelineMetricDetailModalProps) {
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
              <p className={cn(
                "text-3xl font-bold",
                metricType === "reengage" ? "text-red-600" : "text-emerald-600"
              )}>
                {data.change}
              </p>
              <p className="text-xs text-muted-foreground mt-1">Variação</p>
            </div>
          </div>

          {/* By Stage */}
          {'byStage' in data && metricType !== 'avgTime' && (
            <ScrollArea className="h-[260px]">
              <div className="space-y-2">
                {(data.byStage as any[]).map((item: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl border bg-card">
                    <div className="flex items-center gap-3">
                      <div className={cn("h-3 w-3 rounded-full", item.color)} />
                      <span className="font-medium">{item.stage}</span>
                    </div>
                    <span className="text-lg font-bold">{item.count}</span>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}

          {/* Avg Time By Stage */}
          {metricType === 'avgTime' && (
            <div className="space-y-2">
              {(data as any).byStage.map((item: any, idx: number) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl border bg-card">
                  <span className="font-medium">{item.stage}</span>
                  <span className="text-lg font-bold">{item.days} dias</span>
                </div>
              ))}
            </div>
          )}

          {/* Breakdown */}
          {'breakdown' in data && (
            <div className="space-y-2">
              {(data.breakdown as any[]).map((item: any, idx: number) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl border bg-card">
                  <span className="font-medium">{item.stage}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">{item.value}</span>
                    <Badge variant="outline">{item.percent}%</Badge>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Funnel */}
          {'funnel' in data && (
            <div className="space-y-2">
              {(data.funnel as any[]).map((item: any, idx: number) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl border bg-card">
                  <span className="text-sm">{item.stage}</span>
                  <Badge className={item.rate >= 70 
                    ? "bg-emerald-500/10 text-emerald-600" 
                    : item.rate >= 50 
                    ? "bg-amber-500/10 text-amber-600"
                    : "bg-red-500/10 text-red-600"
                  }>
                    {item.rate}%
                  </Badge>
                </div>
              ))}
            </div>
          )}

          {/* Reengage Patients */}
          {'patients' in data && (
            <ScrollArea className="h-[260px]">
              <div className="space-y-2">
                {(data.patients as any[]).map((item: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between p-4 rounded-xl border bg-card">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-red-500/10 text-red-600">
                          {item.name.split(' ').map((n: string) => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Última visita: {item.lastVisit}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={urgencyColors[item.urgency]}>
                        {item.action}
                      </Badge>
                      <Button size="icon" variant="ghost" className="h-8 w-8">
                        <Phone className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
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