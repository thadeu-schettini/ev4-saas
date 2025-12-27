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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  TrendingUp, 
  MessageSquare, 
  Send, 
  ThumbsUp,
  Download,
  Star,
  Calendar
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NPSMetricDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  metricType: "nps" | "responses" | "responseRate" | "promoters";
}

const mockData = {
  nps: {
    title: "NPS Atual",
    description: "Net Promoter Score do período",
    value: 85,
    change: "+7",
    icon: TrendingUp,
    color: "from-primary/60 to-primary/80",
    zones: [
      { label: "Zona de Excelência", range: "70-100", color: "bg-emerald-500" },
      { label: "Zona de Qualidade", range: "50-69", color: "bg-amber-500" },
      { label: "Zona de Aperfeiçoamento", range: "0-49", color: "bg-red-500" },
    ]
  },
  responses: {
    title: "Respostas",
    description: "Total de respostas recebidas",
    value: 342,
    change: "+12%",
    icon: MessageSquare,
    color: "from-blue-500/60 to-blue-600/60",
    items: [
      { date: "Hoje", count: 12, promoters: 9, detractors: 1 },
      { date: "Ontem", count: 18, promoters: 14, detractors: 2 },
      { date: "2 dias atrás", count: 15, promoters: 11, detractors: 1 },
    ]
  },
  responseRate: {
    title: "Taxa de Resposta",
    description: "Percentual de pacientes que responderam",
    value: "68%",
    change: "+5%",
    icon: Send,
    color: "from-violet-500/60 to-violet-600/60",
    breakdown: [
      { channel: "WhatsApp", rate: 78, total: 420 },
      { channel: "E-mail", rate: 45, total: 280 },
      { channel: "SMS", rate: 62, total: 150 },
    ]
  },
  promoters: {
    title: "Promotores",
    description: "Pacientes com notas 9 e 10",
    value: "65%",
    change: "+3%",
    icon: ThumbsUp,
    color: "from-emerald-500/60 to-emerald-600/60",
    recentPromoters: [
      { name: "Maria Silva", score: 10, comment: "Excelente atendimento!" },
      { name: "João Oliveira", score: 9, comment: "Muito satisfeito" },
      { name: "Ana Costa", score: 10, comment: "Recomendo a todos" },
    ]
  },
};

export function NPSMetricDetailModal({ 
  open, 
  onOpenChange, 
  metricType 
}: NPSMetricDetailModalProps) {
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

          {/* NPS Zones */}
          {metricType === "nps" && (
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Zonas de NPS</h4>
              <div className="space-y-2">
                {(data as any).zones.map((zone: any, idx: number) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-lg border">
                    <div className={cn("h-3 w-3 rounded-full", zone.color)} />
                    <span className="flex-1 text-sm">{zone.label}</span>
                    <Badge variant="outline">{zone.range}</Badge>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Progress value={data.value as number} className="h-4" />
              </div>
            </div>
          )}

          {/* Response Items */}
          {metricType === "responses" && (
            <ScrollArea className="h-[260px]">
              <div className="space-y-2">
                {(data as any).items.map((item: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between p-4 rounded-xl border bg-card">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{item.date}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-bold">{item.count}</span>
                      <div className="flex gap-2">
                        <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                          {item.promoters} promotores
                        </Badge>
                        <Badge className="bg-red-500/10 text-red-600 border-red-500/20">
                          {item.detractors} detratores
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}

          {/* Response Rate Breakdown */}
          {metricType === "responseRate" && (
            <div className="space-y-3">
              {(data as any).breakdown.map((item: any, idx: number) => (
                <div key={idx} className="p-4 rounded-xl border bg-card space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{item.channel}</span>
                    <span className="text-lg font-bold">{item.rate}%</span>
                  </div>
                  <Progress value={item.rate} className="h-2" />
                  <p className="text-xs text-muted-foreground">{item.total} enviados</p>
                </div>
              ))}
            </div>
          )}

          {/* Recent Promoters */}
          {metricType === "promoters" && (
            <ScrollArea className="h-[260px]">
              <div className="space-y-2">
                {(data as any).recentPromoters.map((item: any, idx: number) => (
                  <div key={idx} className="flex items-start gap-3 p-4 rounded-xl border bg-card">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-emerald-500/10 text-emerald-600">
                        {item.name.split(' ').map((n: string) => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{item.name}</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                          <span className="font-bold">{item.score}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{item.comment}</p>
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