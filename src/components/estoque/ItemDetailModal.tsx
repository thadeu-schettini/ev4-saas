import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { 
  Package, 
  Save, 
  TrendingUp, 
  TrendingDown, 
  Calendar,
  AlertTriangle,
  CheckCircle2,
  History,
  DollarSign,
  Building2,
  Barcode,
  Clock,
  Edit3,
  X
} from "lucide-react";
import { toast } from "sonner";

interface ItemDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: {
    id: number;
    name: string;
    category: string;
    quantity: number;
    minQuantity: number;
    unit: string;
    lastOrder: string;
    status: string;
    price: number;
    supplier: string;
  } | null;
}

const mockMovements = [
  { id: 1, type: "entry", quantity: 100, reason: "Compra", date: "10/01/2025", user: "Maria Silva", notes: "Pedido PC-2025-001" },
  { id: 2, type: "exit", quantity: 15, reason: "Uso em procedimento", date: "08/01/2025", user: "Dr. João", notes: "Consulta #1234" },
  { id: 3, type: "exit", quantity: 20, reason: "Uso em procedimento", date: "05/01/2025", user: "Dra. Ana", notes: "Consulta #1230" },
  { id: 4, type: "entry", quantity: 50, reason: "Devolução", date: "02/01/2025", user: "Maria Silva", notes: "" },
  { id: 5, type: "exit", quantity: 30, reason: "Vencido/Descartado", date: "28/12/2024", user: "Carlos", notes: "Lote vencido" },
];

const mockBatches = [
  { id: 1, batchNumber: "LT-2025-001", quantity: 200, expiryDate: "15/06/2025", status: "ok" },
  { id: 2, batchNumber: "LT-2024-089", quantity: 150, expiryDate: "28/02/2025", status: "expiring" },
  { id: 3, batchNumber: "LT-2024-045", quantity: 100, expiryDate: "10/01/2025", status: "expired" },
];

export function ItemDetailModal({ open, onOpenChange, item }: ItemDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: item?.name || "",
    category: item?.category || "",
    minQuantity: item?.minQuantity?.toString() || "",
    price: item?.price?.toString() || "",
    supplier: item?.supplier || "",
    description: ""
  });

  if (!item) return null;

  const getStockPercentage = (current: number, min: number) => {
    return Math.min((current / (min * 2)) * 100, 100);
  };

  const stockValue = item.quantity * item.price;

  const handleSave = () => {
    toast.success("Item atualizado com sucesso!");
    setIsEditing(false);
  };

  const stats = [
    { label: "Quantidade", value: item.quantity, suffix: item.unit, icon: Package, color: "text-primary" },
    { label: "Valor Total", value: `R$ ${stockValue.toFixed(2)}`, icon: DollarSign, color: "text-confirmed" },
    { label: "Consumo/Mês", value: "45", suffix: item.unit, icon: TrendingDown, color: "text-pending" },
    { label: "Dias Restantes", value: "~12", icon: Clock, color: "text-info" }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="border-b pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent flex items-center justify-center">
                <Package className="h-7 w-7 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-xl">{item.name}</DialogTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline">{item.category}</Badge>
                  <Badge 
                    variant="outline" 
                    className={
                      item.status === "critical" 
                        ? "bg-destructive/10 text-destructive border-destructive/20" 
                        : item.status === "low" 
                        ? "bg-pending/10 text-pending border-pending/20"
                        : "bg-confirmed/10 text-confirmed border-confirmed/20"
                    }
                  >
                    {item.status === "critical" && <AlertTriangle className="h-3 w-3 mr-1" />}
                    {item.status === "low" && <TrendingDown className="h-3 w-3 mr-1" />}
                    {item.status === "ok" && <CheckCircle2 className="h-3 w-3 mr-1" />}
                    {item.status === "critical" ? "Crítico" : item.status === "low" ? "Baixo" : "Normal"}
                  </Badge>
                </div>
              </div>
            </div>
            <Button
              variant={isEditing ? "destructive" : "outline"}
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
              className="gap-2"
            >
              {isEditing ? <X className="h-4 w-4" /> : <Edit3 className="h-4 w-4" />}
              {isEditing ? "Cancelar" : "Editar"}
            </Button>
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-4">
          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-3 py-4">
            {stats.map((stat, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-muted/30 border">
                <div className="flex items-center gap-2 mb-1">
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  <span className="text-xs text-muted-foreground">{stat.label}</span>
                </div>
                <p className="text-lg font-bold">
                  {stat.value}
                  {stat.suffix && <span className="text-sm font-normal text-muted-foreground ml-1">{stat.suffix}</span>}
                </p>
              </div>
            ))}
          </div>

          {/* Stock Progress */}
          <div className="p-4 rounded-xl bg-muted/20 border mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Nível de Estoque</span>
              <span className="text-sm text-muted-foreground">{item.quantity} / {item.minQuantity * 2} {item.unit}</span>
            </div>
            <Progress 
              value={getStockPercentage(item.quantity, item.minQuantity)} 
              className={`h-3 ${
                item.status === "critical" ? "[&>div]:bg-destructive" :
                item.status === "low" ? "[&>div]:bg-pending" :
                "[&>div]:bg-confirmed"
              }`}
            />
            <p className="text-xs text-muted-foreground mt-2">
              Mínimo recomendado: {item.minQuantity} {item.unit}
            </p>
          </div>

          <Tabs defaultValue="details" className="w-full">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="details">Detalhes</TabsTrigger>
              <TabsTrigger value="batches">Lotes & Validade</TabsTrigger>
              <TabsTrigger value="history">Histórico</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4 mt-4">
              {isEditing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Nome do Item</Label>
                      <Input 
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Categoria</Label>
                      <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Materiais">Materiais</SelectItem>
                          <SelectItem value="Medicamentos">Medicamentos</SelectItem>
                          <SelectItem value="Limpeza">Limpeza</SelectItem>
                          <SelectItem value="Equipamentos">Equipamentos</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Quantidade Mínima</Label>
                      <Input 
                        type="number"
                        value={formData.minQuantity}
                        onChange={(e) => setFormData({ ...formData, minQuantity: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Preço Unitário (R$)</Label>
                      <Input 
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Fornecedor</Label>
                      <Input 
                        value={formData.supplier}
                        onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Observações</Label>
                    <Textarea 
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-muted/20 border">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <Building2 className="h-4 w-4" />
                        Fornecedor
                      </div>
                      <p className="font-medium">{item.supplier}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-muted/20 border">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <DollarSign className="h-4 w-4" />
                        Preço Unitário
                      </div>
                      <p className="font-medium">R$ {item.price.toFixed(2)} / {item.unit}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-muted/20 border">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <Calendar className="h-4 w-4" />
                        Último Pedido
                      </div>
                      <p className="font-medium">{item.lastOrder}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-muted/20 border">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <Barcode className="h-4 w-4" />
                        Código
                      </div>
                      <p className="font-medium font-mono">EST-{String(item.id).padStart(5, '0')}</p>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="batches" className="mt-4">
              <div className="space-y-3">
                {mockBatches.map((batch) => (
                  <div 
                    key={batch.id} 
                    className={`p-4 rounded-xl border ${
                      batch.status === "expired" 
                        ? "bg-destructive/5 border-destructive/20" 
                        : batch.status === "expiring"
                        ? "bg-pending/5 border-pending/20"
                        : "bg-muted/20"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                          batch.status === "expired" 
                            ? "bg-destructive/10" 
                            : batch.status === "expiring"
                            ? "bg-pending/10"
                            : "bg-muted/50"
                        }`}>
                          <Barcode className={`h-5 w-5 ${
                            batch.status === "expired" 
                              ? "text-destructive" 
                              : batch.status === "expiring"
                              ? "text-pending"
                              : "text-muted-foreground"
                          }`} />
                        </div>
                        <div>
                          <p className="font-medium font-mono">{batch.batchNumber}</p>
                          <p className="text-sm text-muted-foreground">{batch.quantity} {item.unit}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge 
                          variant="outline" 
                          className={
                            batch.status === "expired" 
                              ? "bg-destructive/10 text-destructive border-destructive/20" 
                              : batch.status === "expiring"
                              ? "bg-pending/10 text-pending border-pending/20"
                              : "bg-confirmed/10 text-confirmed border-confirmed/20"
                          }
                        >
                          {batch.status === "expired" ? "Vencido" : batch.status === "expiring" ? "Próximo do vencimento" : "Válido"}
                        </Badge>
                        <p className="text-sm text-muted-foreground mt-1">Validade: {batch.expiryDate}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="history" className="mt-4">
              <div className="space-y-3">
                {mockMovements.map((mov) => (
                  <div key={mov.id} className="flex items-start gap-3 p-3 rounded-xl bg-muted/20 border">
                    <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${
                      mov.type === "entry" ? "bg-confirmed/10" : "bg-destructive/10"
                    }`}>
                      {mov.type === "entry" ? (
                        <TrendingUp className="h-4 w-4 text-confirmed" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-destructive" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">
                          {mov.type === "entry" ? "+" : "-"}{mov.quantity} {item.unit}
                        </p>
                        <span className="text-xs text-muted-foreground">{mov.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{mov.reason}</p>
                      {mov.notes && (
                        <p className="text-xs text-muted-foreground mt-1 italic">{mov.notes}</p>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">Por: {mov.user}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </ScrollArea>

        {isEditing && (
          <div className="flex items-center justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancelar
            </Button>
            <Button className="gap-2" onClick={handleSave}>
              <Save className="h-4 w-4" />
              Salvar Alterações
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
