import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Stethoscope, 
  Zap, 
  DollarSign, 
  Star, 
  Search,
  TrendingUp,
  Clock,
  Users,
  Download
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceMetricDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  metricType: "total" | "active" | "revenue" | "popular";
}

const mockData = {
  total: {
    title: "Total de Serviços",
    description: "Todos os serviços cadastrados na clínica",
    value: 24,
    change: "+3",
    icon: Stethoscope,
    color: "from-blue-400/60 to-blue-500/60",
    items: [
      { id: 1, name: "Consulta Cardiologia", category: "Consulta", uses: 248, status: "active" },
      { id: 2, name: "Eletrocardiograma", category: "Exame", uses: 312, status: "active" },
      { id: 3, name: "Ecocardiograma", category: "Exame", uses: 87, status: "active" },
      { id: 4, name: "Limpeza de Pele", category: "Procedimento", uses: 64, status: "inactive" },
    ]
  },
  active: {
    title: "Serviços Ativos",
    description: "Serviços disponíveis para agendamento",
    value: 21,
    change: "+2",
    icon: Zap,
    color: "from-emerald-400/60 to-emerald-500/60",
    items: [
      { id: 1, name: "Consulta Cardiologia", category: "Consulta", uses: 248, status: "active" },
      { id: 2, name: "Eletrocardiograma", category: "Exame", uses: 312, status: "active" },
      { id: 3, name: "Ecocardiograma", category: "Exame", uses: 87, status: "active" },
    ]
  },
  revenue: {
    title: "Receita Média",
    description: "Valor médio por serviço realizado",
    value: "R$ 215",
    change: "+8%",
    icon: DollarSign,
    color: "from-amber-400/60 to-amber-500/60",
    items: [
      { id: 1, name: "Pequena Cirurgia", category: "Procedimento", revenue: "R$ 450", count: 23 },
      { id: 2, name: "Ecocardiograma", category: "Exame", revenue: "R$ 350", count: 87 },
      { id: 3, name: "Consulta Ginecologia", category: "Consulta", revenue: "R$ 240", count: 142 },
    ]
  },
  popular: {
    title: "Mais Utilizado",
    description: "Serviço com maior número de utilizações",
    value: "ECG",
    change: "312x",
    icon: Star,
    color: "from-violet-400/60 to-violet-500/60",
    items: [
      { id: 1, name: "Eletrocardiograma", category: "Exame", uses: 312, rank: 1 },
      { id: 2, name: "Consulta Cardiologia", category: "Consulta", uses: 248, rank: 2 },
      { id: 3, name: "Consulta Dermatologia", category: "Consulta", uses: 186, rank: 3 },
    ]
  },
};

const statusColors: Record<string, string> = {
  active: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  inactive: "bg-muted text-muted-foreground border-border",
};

export function ServiceMetricDetailModal({ 
  open, 
  onOpenChange, 
  metricType 
}: ServiceMetricDetailModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  
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
          {/* Summary */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-muted/50 text-center">
              <p className="text-2xl font-bold">{data.value}</p>
              <p className="text-xs text-muted-foreground mt-1">Valor Atual</p>
            </div>
            <div className="p-4 rounded-xl bg-muted/50 text-center">
              <p className="text-2xl font-bold text-emerald-600">{data.change}</p>
              <p className="text-xs text-muted-foreground mt-1">Variação</p>
            </div>
            <div className="p-4 rounded-xl bg-muted/50 text-center">
              <p className="text-2xl font-bold">{data.items.length}</p>
              <p className="text-xs text-muted-foreground mt-1">Registros</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar serviços..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Items List */}
          <Tabs defaultValue="list">
            <TabsList className="w-full">
              <TabsTrigger value="list" className="flex-1">Lista</TabsTrigger>
              <TabsTrigger value="chart" className="flex-1">Gráfico</TabsTrigger>
            </TabsList>

            <TabsContent value="list" className="mt-4">
              <ScrollArea className="h-[280px]">
                <div className="space-y-2">
                  {data.items.map((item: any) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 rounded-xl border bg-card hover:shadow-sm transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Stethoscope className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.category}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {item.uses && (
                          <div className="text-right">
                            <p className="text-sm font-medium">{item.uses}x</p>
                            <p className="text-xs text-muted-foreground">utilizações</p>
                          </div>
                        )}
                        {item.revenue && (
                          <div className="text-right">
                            <p className="text-sm font-medium">{item.revenue}</p>
                            <p className="text-xs text-muted-foreground">{item.count} realizados</p>
                          </div>
                        )}
                        {item.status && (
                          <Badge className={statusColors[item.status]}>
                            {item.status === "active" ? "Ativo" : "Inativo"}
                          </Badge>
                        )}
                        {item.rank && (
                          <Badge variant="outline" className="font-bold">
                            #{item.rank}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="chart" className="mt-4">
              <div className="h-[280px] flex items-center justify-center bg-muted/30 rounded-xl">
                <div className="text-center text-muted-foreground">
                  <TrendingUp className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Gráfico disponível em breve</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
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