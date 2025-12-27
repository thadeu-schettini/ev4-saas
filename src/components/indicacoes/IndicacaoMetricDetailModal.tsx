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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Users, 
  Gift, 
  TrendingUp,
  Search,
  Download,
  Star,
  CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";

interface IndicacaoMetricDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  metricType: "referrals" | "earnings";
}

const mockData = {
  referrals: {
    title: "Indicações Ativas",
    description: "Total de indicações convertidas e ativas",
    value: 12,
    change: "+3 este mês",
    icon: Users,
    color: "from-primary/60 to-primary/80",
    items: [
      { id: 1, name: "Dra. Ana Silva", date: "27/11/2024", status: "Ativa", reward: "R$ 15,00" },
      { id: 2, name: "Dr. Carlos Mendes", date: "25/11/2024", status: "Pendente", reward: "Aguardando" },
      { id: 3, name: "Dra. Maria Santos", date: "20/11/2024", status: "Ativa", reward: "R$ 15,00" },
      { id: 4, name: "Dr. Pedro Lima", date: "15/11/2024", status: "Ativa", reward: "R$ 15,00" },
    ]
  },
  earnings: {
    title: "Ganhos do Mês",
    description: "Total de recompensas recebidas neste mês",
    value: "R$ 180,00",
    change: "+R$ 45,00",
    icon: Gift,
    color: "from-success/60 to-success/80",
    items: [
      { id: 1, name: "Dra. Ana Silva - Ativação", date: "27/11/2024", amount: "R$ 15,00" },
      { id: 2, name: "Missão Completa - 1 indicação", date: "25/11/2024", amount: "R$ 25,00" },
      { id: 3, name: "Dra. Maria Santos - Ativação", date: "20/11/2024", amount: "R$ 15,00" },
      { id: 4, name: "Bônus Semanal", date: "18/11/2024", amount: "R$ 50,00" },
    ]
  },
};

export function IndicacaoMetricDetailModal({ 
  open, 
  onOpenChange, 
  metricType 
}: IndicacaoMetricDetailModalProps) {
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
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-muted/50 text-center">
              <p className="text-2xl font-bold">{data.value}</p>
              <p className="text-xs text-muted-foreground mt-1">Valor Atual</p>
            </div>
            <div className="p-4 rounded-xl bg-muted/50 text-center">
              <p className="text-2xl font-bold text-emerald-600">{data.change}</p>
              <p className="text-xs text-muted-foreground mt-1">Variação</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Items List */}
          <ScrollArea className="h-[300px]">
            <div className="space-y-2">
              {data.items.map((item: any) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 rounded-xl border bg-card hover:shadow-sm transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {item.name.split(' ').slice(0, 2).map((n: string) => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {item.status && (
                      <Badge className={item.status === "Ativa" 
                        ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                        : "bg-amber-500/10 text-amber-600 border-amber-500/20"
                      }>
                        {item.status}
                      </Badge>
                    )}
                    <span className="text-sm font-semibold text-primary">
                      {item.reward || item.amount}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fechar
          </Button>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}