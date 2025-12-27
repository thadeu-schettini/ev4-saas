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
import { Progress } from "@/components/ui/progress";
import { 
  Target, 
  TrendingUp, 
  Clock, 
  Sparkles,
  Download,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PrevisaoMetricDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  metricType: "precision" | "savings" | "optimized" | "predictions";
}

const mockData = {
  precision: {
    title: "Precisão do Modelo",
    description: "Taxa de acerto das previsões de demanda",
    value: "94%",
    change: "+2%",
    icon: Target,
    color: "from-primary/60 to-primary/80",
    details: [
      { label: "Previsões Corretas", value: "1.456", subtext: "nos últimos 30 dias" },
      { label: "Taxa de Erro", value: "6%", subtext: "margem aceitável" },
      { label: "Confiabilidade", value: "Alta", subtext: "modelo estável" },
    ],
    history: [
      { period: "Esta semana", value: 94 },
      { period: "Semana passada", value: 92 },
      { period: "Há 2 semanas", value: 91 },
      { period: "Há 3 semanas", value: 89 },
    ]
  },
  savings: {
    title: "Economia Estimada",
    description: "Economia gerada pela otimização de agenda",
    value: "R$ 12.5k",
    change: "+18%",
    icon: TrendingUp,
    color: "from-emerald-500/60 to-emerald-600/60",
    details: [
      { label: "Redução No-Shows", value: "R$ 5.2k", subtext: "menos faltas" },
      { label: "Otimização Horários", value: "R$ 4.8k", subtext: "melhor ocupação" },
      { label: "Eficiência Operacional", value: "R$ 2.5k", subtext: "menos ociosidade" },
    ],
    history: [
      { period: "Este mês", value: 12500 },
      { period: "Mês passado", value: 10600 },
      { period: "Há 2 meses", value: 9800 },
    ]
  },
  optimized: {
    title: "Horários Otimizados",
    description: "Horários ajustados automaticamente pelo sistema",
    value: "23",
    change: "+5",
    icon: Clock,
    color: "from-blue-500/60 to-blue-600/60",
    details: [
      { label: "Manhã", value: "12", subtext: "horários ajustados" },
      { label: "Tarde", value: "8", subtext: "horários ajustados" },
      { label: "Noite", value: "3", subtext: "horários ajustados" },
    ],
    history: []
  },
  predictions: {
    title: "Previsões Hoje",
    description: "Número de previsões geradas hoje",
    value: "156",
    change: "Atualizado agora",
    icon: Sparkles,
    color: "from-violet-500/60 to-violet-600/60",
    details: [
      { label: "Alta Confiança", value: "124", subtext: ">90% certeza" },
      { label: "Média Confiança", value: "28", subtext: "70-90% certeza" },
      { label: "Baixa Confiança", value: "4", subtext: "<70% certeza" },
    ],
    history: []
  },
};

export function PrevisaoMetricDetailModal({ 
  open, 
  onOpenChange, 
  metricType 
}: PrevisaoMetricDetailModalProps) {
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
          <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border">
            <p className="text-4xl font-bold text-primary">{data.value}</p>
            <Badge variant="secondary" className="mt-2 text-emerald-600">
              {data.change}
            </Badge>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-3 gap-3">
            {data.details.map((detail, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-muted/50 text-center">
                <p className="text-lg font-bold">{detail.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{detail.label}</p>
                <p className="text-[10px] text-muted-foreground/70">{detail.subtext}</p>
              </div>
            ))}
          </div>

          {/* History */}
          {data.history.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Histórico</h4>
              <ScrollArea className="h-[160px]">
                <div className="space-y-2">
                  {data.history.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-xl border bg-card"
                    >
                      <span className="text-sm text-muted-foreground">{item.period}</span>
                      <span className="font-semibold">
                        {typeof item.value === 'number' && item.value > 1000 
                          ? `R$ ${(item.value / 1000).toFixed(1)}k` 
                          : metricType === 'precision' ? `${item.value}%` : item.value
                        }
                      </span>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
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