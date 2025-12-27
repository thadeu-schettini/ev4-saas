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
import { 
  Video, 
  Calendar, 
  Clock, 
  TrendingUp,
  Download,
  Users,
  CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TelemedicinaMetricDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  metricType: "active" | "today" | "avgTime" | "successRate";
}

const mockData = {
  active: {
    title: "Salas Ativas",
    description: "Consultas em andamento neste momento",
    value: 3,
    change: "Agora",
    icon: Video,
    color: "from-emerald-500 to-green-500",
    items: [
      { patient: "Maria Silva", professional: "Dr. Ricardo", duration: "25 min", status: "active" },
      { patient: "João Pedro", professional: "Dra. Ana Paula", duration: "13 min", status: "active" },
      { patient: "Carlos Lima", professional: "Dr. Marcos", duration: "0 min", status: "waiting" },
    ]
  },
  today: {
    title: "Consultas Hoje",
    description: "Total de teleconsultas realizadas hoje",
    value: 12,
    change: "+4",
    icon: Calendar,
    color: "from-blue-500 to-cyan-500",
    items: [
      { time: "09:30", patient: "Ana Costa", professional: "Dr. Ricardo", status: "completed" },
      { time: "08:45", patient: "Pedro Almeida", professional: "Dra. Ana Paula", status: "completed" },
      { time: "10:03", patient: "Maria Silva", professional: "Dr. Ricardo", status: "active" },
    ]
  },
  avgTime: {
    title: "Tempo Médio",
    description: "Duração média das teleconsultas",
    value: "28 min",
    change: "-3 min",
    icon: Clock,
    color: "from-amber-500 to-orange-500",
    breakdown: [
      { specialty: "Clínico Geral", time: "25 min" },
      { specialty: "Cardiologia", time: "32 min" },
      { specialty: "Dermatologia", time: "28 min" },
    ]
  },
  successRate: {
    title: "Taxa de Sucesso",
    description: "Consultas finalizadas com êxito",
    value: "98.5%",
    change: "+0.5%",
    icon: TrendingUp,
    color: "from-violet-500 to-purple-500",
    breakdown: [
      { label: "Finalizadas com sucesso", value: 985, percent: 98.5 },
      { label: "Problemas técnicos", value: 10, percent: 1 },
      { label: "No-show", value: 5, percent: 0.5 },
    ]
  },
};

const statusColors: Record<string, string> = {
  active: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  waiting: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  completed: "bg-blue-500/10 text-blue-600 border-blue-500/20",
};

export function TelemedicinaMetricDetailModal({ 
  open, 
  onOpenChange, 
  metricType 
}: TelemedicinaMetricDetailModalProps) {
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
              <p className="text-xs text-muted-foreground mt-1">Variação</p>
            </div>
          </div>

          {/* Items List */}
          {'items' in data && (
            <ScrollArea className="h-[260px]">
              <div className="space-y-2">
                {(data.items as any[]).map((item: any, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 rounded-xl border bg-card"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Video className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{item.patient}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.professional} {item.time && `· ${item.time}`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {item.duration && (
                        <span className="text-sm text-muted-foreground">{item.duration}</span>
                      )}
                      <Badge className={statusColors[item.status]}>
                        {item.status === "active" ? "Em andamento" : 
                         item.status === "waiting" ? "Aguardando" : "Finalizada"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}

          {/* Breakdown */}
          {'breakdown' in data && (
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Detalhamento</h4>
              <div className="space-y-2">
                {(data.breakdown as any[]).map((item: any, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-xl border bg-card"
                  >
                    <span className="text-sm">{item.specialty || item.label}</span>
                    <span className="font-semibold">
                      {item.time || (item.percent !== undefined ? `${item.percent}%` : item.value)}
                    </span>
                  </div>
                ))}
              </div>
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