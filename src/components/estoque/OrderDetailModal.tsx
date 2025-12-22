import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  ShoppingCart, 
  Building2, 
  Calendar, 
  Package, 
  Truck,
  CheckCircle2,
  Clock,
  DollarSign,
  FileText,
  Download,
  Printer,
  AlertTriangle,
  XCircle,
  MapPin
} from "lucide-react";
import { toast } from "sonner";

interface OrderDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: {
    id: string;
    supplier: string;
    date: string;
    items: number;
    total: number;
    status: string;
    urgency: string;
    deliveryDate?: string;
    expectedDate?: string;
    cancelReason?: string;
  } | null;
}

const statusConfig = {
  pending: { label: "Pendente", color: "bg-pending/10 text-pending border-pending/20", icon: Clock },
  approved: { label: "Aprovado", color: "bg-info/10 text-info border-info/20", icon: CheckCircle2 },
  transit: { label: "Em Trânsito", color: "bg-primary/10 text-primary border-primary/20", icon: Truck },
  delivered: { label: "Entregue", color: "bg-confirmed/10 text-confirmed border-confirmed/20", icon: Package },
  cancelled: { label: "Cancelado", color: "bg-destructive/10 text-destructive border-destructive/20", icon: XCircle }
};

const mockOrderItems = [
  { id: 1, name: "Seringa 5ml", quantity: 200, unit: "unidades", unitPrice: 0.32, total: 64.00 },
  { id: 2, name: "Luvas de Procedimento M", quantity: 500, unit: "pares", unitPrice: 0.45, total: 225.00 },
  { id: 3, name: "Dipirona 500mg", quantity: 50, unit: "caixas", unitPrice: 8.50, total: 425.00 },
  { id: 4, name: "Gaze Estéril", quantity: 100, unit: "pacotes", unitPrice: 3.20, total: 320.00 },
  { id: 5, name: "Álcool 70%", quantity: 20, unit: "litros", unitPrice: 12.00, total: 240.00 },
];

const mockTimeline = [
  { id: 1, action: "Pedido criado", date: "07/01/2025 09:30", user: "Maria Silva", icon: FileText },
  { id: 2, action: "Pedido aprovado", date: "07/01/2025 11:45", user: "Dr. Carlos", icon: CheckCircle2 },
  { id: 3, action: "Enviado ao fornecedor", date: "07/01/2025 14:00", user: "Sistema", icon: Building2 },
  { id: 4, action: "Confirmação do fornecedor", date: "08/01/2025 08:15", user: "MedSupply Ltda", icon: CheckCircle2 },
  { id: 5, action: "Em trânsito", date: "09/01/2025 10:00", user: "Transportadora XYZ", icon: Truck },
];

export function OrderDetailModal({ open, onOpenChange, order }: OrderDetailModalProps) {
  if (!order) return null;

  const StatusIcon = statusConfig[order.status as keyof typeof statusConfig]?.icon || Clock;

  const handlePrint = () => {
    toast.success("Preparando impressão...");
  };

  const handleDownload = () => {
    toast.success("Download iniciado!");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="border-b pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`h-14 w-14 rounded-2xl flex items-center justify-center ${
                order.urgency === "urgent" 
                  ? "bg-gradient-to-br from-destructive/20 to-destructive/5" 
                  : "bg-gradient-to-br from-primary/20 to-primary/5"
              }`}>
                <ShoppingCart className={`h-7 w-7 ${
                  order.urgency === "urgent" ? "text-destructive" : "text-primary"
                }`} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <DialogTitle className="text-xl">{order.id}</DialogTitle>
                  {order.urgency === "urgent" && (
                    <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Urgente
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className={statusConfig[order.status as keyof typeof statusConfig]?.color}>
                    <StatusIcon className="h-3 w-3 mr-1" />
                    {statusConfig[order.status as keyof typeof statusConfig]?.label}
                  </Badge>
                  <span className="text-sm text-muted-foreground">• Criado em {order.date}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2" onClick={handlePrint}>
                <Printer className="h-4 w-4" />
                Imprimir
              </Button>
              <Button variant="outline" size="sm" className="gap-2" onClick={handleDownload}>
                <Download className="h-4 w-4" />
                PDF
              </Button>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-4">
          <div className="grid grid-cols-3 gap-6 py-4">
            {/* Left: Order Info & Items */}
            <div className="col-span-2 space-y-6">
              {/* Supplier Info */}
              <div className="p-4 rounded-xl bg-muted/20 border">
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-primary" />
                  Fornecedor
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Nome</p>
                    <p className="font-medium">{order.supplier}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Contato</p>
                    <p className="font-medium">(11) 3456-7890</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-muted-foreground">Endereço</p>
                    <p className="font-medium">Rua das Indústrias, 123 - São Paulo, SP</p>
                  </div>
                </div>
              </div>

              {/* Items List */}
              <div>
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <Package className="h-4 w-4 text-primary" />
                  Itens do Pedido ({mockOrderItems.length})
                </h4>
                <div className="rounded-xl border overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted/30">
                      <tr>
                        <th className="text-left p-3 text-sm font-medium">Item</th>
                        <th className="text-center p-3 text-sm font-medium">Qtd</th>
                        <th className="text-right p-3 text-sm font-medium">Unitário</th>
                        <th className="text-right p-3 text-sm font-medium">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockOrderItems.map((item, idx) => (
                        <tr key={item.id} className={idx !== mockOrderItems.length - 1 ? "border-b" : ""}>
                          <td className="p-3">
                            <p className="font-medium">{item.name}</p>
                          </td>
                          <td className="p-3 text-center text-muted-foreground">
                            {item.quantity} {item.unit}
                          </td>
                          <td className="p-3 text-right text-muted-foreground">
                            R$ {item.unitPrice.toFixed(2)}
                          </td>
                          <td className="p-3 text-right font-medium">
                            R$ {item.total.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-muted/20 border-t">
                      <tr>
                        <td colSpan={3} className="p-3 text-right font-medium">Total do Pedido</td>
                        <td className="p-3 text-right text-lg font-bold text-primary">
                          R$ {order.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* Delivery Info */}
              {order.status === "transit" && (
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Truck className="h-4 w-4 text-primary" />
                    Informações de Entrega
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Transportadora</p>
                      <p className="font-medium">Transportadora XYZ</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Código de Rastreio</p>
                      <p className="font-medium font-mono">BR123456789SP</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Previsão de Entrega</p>
                      <p className="font-medium">{order.expectedDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <p className="font-medium">Em trânsito - São Paulo, SP</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Cancel Reason */}
              {order.status === "cancelled" && order.cancelReason && (
                <div className="p-4 rounded-xl bg-destructive/5 border border-destructive/20">
                  <h4 className="font-medium mb-2 flex items-center gap-2 text-destructive">
                    <XCircle className="h-4 w-4" />
                    Motivo do Cancelamento
                  </h4>
                  <p className="text-sm">{order.cancelReason}</p>
                </div>
              )}
            </div>

            {/* Right: Timeline */}
            <div className="space-y-4">
              <h4 className="font-medium flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                Linha do Tempo
              </h4>
              
              <div className="relative">
                <div className="absolute left-3 top-0 bottom-0 w-px bg-border" />
                
                <div className="space-y-4">
                  {mockTimeline.map((event, idx) => (
                    <div key={event.id} className="relative pl-8">
                      <div className={`absolute left-0 top-1 h-6 w-6 rounded-full border-2 border-background flex items-center justify-center ${
                        idx === 0 ? "bg-primary" : "bg-muted"
                      }`}>
                        <event.icon className={`h-3 w-3 ${idx === 0 ? "text-white" : "text-muted-foreground"}`} />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{event.action}</p>
                        <p className="text-xs text-muted-foreground">{event.date}</p>
                        <p className="text-xs text-muted-foreground">Por: {event.user}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="my-4" />

              {/* Summary */}
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-muted/20 border">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    Data do Pedido
                  </div>
                  <p className="font-medium mt-1">{order.date}</p>
                </div>
                
                {order.expectedDate && (
                  <div className="p-3 rounded-lg bg-muted/20 border">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Truck className="h-4 w-4" />
                      Previsão de Entrega
                    </div>
                    <p className="font-medium mt-1">{order.expectedDate}</p>
                  </div>
                )}

                {order.deliveryDate && (
                  <div className="p-3 rounded-lg bg-confirmed/10 border border-confirmed/20">
                    <div className="flex items-center gap-2 text-sm text-confirmed">
                      <CheckCircle2 className="h-4 w-4" />
                      Entregue em
                    </div>
                    <p className="font-medium mt-1 text-confirmed">{order.deliveryDate}</p>
                  </div>
                )}

                <div className="p-3 rounded-lg bg-muted/20 border">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <DollarSign className="h-4 w-4" />
                    Valor Total
                  </div>
                  <p className="text-xl font-bold text-primary mt-1">
                    R$ {order.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
