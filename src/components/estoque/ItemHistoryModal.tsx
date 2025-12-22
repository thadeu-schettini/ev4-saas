import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  History, 
  TrendingUp, 
  TrendingDown, 
  Package,
  Calendar,
  Download,
  Filter
} from "lucide-react";
import { useState } from "react";

interface ItemHistoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: {
    id: number;
    name: string;
    unit: string;
  } | null;
}

const mockHistory = [
  { id: 1, type: "entry", quantity: 100, reason: "Compra", date: "10/01/2025 14:32", user: "Maria Silva", notes: "Pedido PC-2025-001", balanceAfter: 450 },
  { id: 2, type: "exit", quantity: 15, reason: "Uso em procedimento", date: "08/01/2025 09:15", user: "Dr. João", notes: "Consulta #1234", balanceAfter: 350 },
  { id: 3, type: "exit", quantity: 20, reason: "Uso em procedimento", date: "05/01/2025 16:45", user: "Dra. Ana", notes: "Consulta #1230", balanceAfter: 365 },
  { id: 4, type: "entry", quantity: 50, reason: "Devolução", date: "02/01/2025 11:20", user: "Maria Silva", notes: "Item devolvido do consultório 3", balanceAfter: 385 },
  { id: 5, type: "exit", quantity: 30, reason: "Vencido/Descartado", date: "28/12/2024 08:00", user: "Carlos", notes: "Lote LT-2024-045 vencido", balanceAfter: 335 },
  { id: 6, type: "entry", quantity: 200, reason: "Compra", date: "20/12/2024 10:30", user: "Maria Silva", notes: "Pedido PC-2024-089", balanceAfter: 365 },
  { id: 7, type: "exit", quantity: 45, reason: "Uso em procedimento", date: "15/12/2024 14:00", user: "Dr. Pedro", notes: "Procedimentos diversos", balanceAfter: 165 },
  { id: 8, type: "exit", quantity: 10, reason: "Perda/Dano", date: "10/12/2024 09:30", user: "Carlos", notes: "Embalagem danificada", balanceAfter: 210 },
];

export function ItemHistoryModal({ open, onOpenChange, item }: ItemHistoryModalProps) {
  const [filterType, setFilterType] = useState("all");
  const [filterPeriod, setFilterPeriod] = useState("30");

  if (!item) return null;

  const filteredHistory = mockHistory.filter(h => {
    if (filterType === "all") return true;
    return h.type === filterType;
  });

  const totalEntries = mockHistory.filter(h => h.type === "entry").reduce((sum, h) => sum + h.quantity, 0);
  const totalExits = mockHistory.filter(h => h.type === "exit").reduce((sum, h) => sum + h.quantity, 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader className="border-b pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-info/20 to-info/5 flex items-center justify-center">
                <History className="h-6 w-6 text-info" />
              </div>
              <div>
                <DialogTitle>Histórico de Movimentações</DialogTitle>
                <p className="text-sm text-muted-foreground mt-1">{item.name}</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Exportar
            </Button>
          </div>
        </DialogHeader>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-3 py-4">
          <div className="p-3 rounded-xl bg-confirmed/10 border border-confirmed/20">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-confirmed" />
              <span className="text-sm text-confirmed">Entradas</span>
            </div>
            <p className="text-xl font-bold text-confirmed mt-1">+{totalEntries} {item.unit}</p>
          </div>
          <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20">
            <div className="flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-destructive" />
              <span className="text-sm text-destructive">Saídas</span>
            </div>
            <p className="text-xl font-bold text-destructive mt-1">-{totalExits} {item.unit}</p>
          </div>
          <div className="p-3 rounded-xl bg-muted/30 border">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Saldo</span>
            </div>
            <p className="text-xl font-bold mt-1">+{totalEntries - totalExits} {item.unit}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 pb-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Filtros:</span>
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[140px] h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="entry">Entradas</SelectItem>
              <SelectItem value="exit">Saídas</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterPeriod} onValueChange={setFilterPeriod}>
            <SelectTrigger className="w-[140px] h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Últimos 7 dias</SelectItem>
              <SelectItem value="30">Últimos 30 dias</SelectItem>
              <SelectItem value="90">Últimos 90 dias</SelectItem>
              <SelectItem value="365">Último ano</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Timeline */}
        <ScrollArea className="flex-1 pr-4">
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
            
            <div className="space-y-4">
              {filteredHistory.map((mov, idx) => (
                <div key={mov.id} className="relative pl-10">
                  {/* Timeline dot */}
                  <div className={`absolute left-0 top-3 h-8 w-8 rounded-full border-2 border-background flex items-center justify-center ${
                    mov.type === "entry" ? "bg-confirmed" : "bg-destructive"
                  }`}>
                    {mov.type === "entry" ? (
                      <TrendingUp className="h-4 w-4 text-white" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-white" />
                    )}
                  </div>

                  <div className="p-4 rounded-xl bg-muted/20 border hover:bg-muted/30 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-lg font-bold ${mov.type === "entry" ? "text-confirmed" : "text-destructive"}`}>
                            {mov.type === "entry" ? "+" : "-"}{mov.quantity} {item.unit}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {mov.reason}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{mov.notes}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {mov.date}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Por: {mov.user}</p>
                      </div>
                    </div>
                    <div className="pt-2 border-t mt-2">
                      <p className="text-xs text-muted-foreground">
                        Saldo após: <span className="font-medium">{mov.balanceAfter} {item.unit}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
