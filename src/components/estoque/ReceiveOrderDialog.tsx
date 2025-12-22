import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Package, CheckCircle2, AlertTriangle, Calendar } from "lucide-react";
import { toast } from "sonner";

interface ReceiveOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: {
    id: string;
    supplier: string;
    items: number;
  } | null;
}

const mockOrderItems = [
  { id: 1, name: "Seringa 5ml", orderedQty: 200, unit: "unidades", receivedQty: 200, status: "ok" },
  { id: 2, name: "Luvas de Procedimento M", orderedQty: 500, unit: "pares", receivedQty: 500, status: "ok" },
  { id: 3, name: "Dipirona 500mg", orderedQty: 50, unit: "caixas", receivedQty: 48, status: "partial" },
  { id: 4, name: "Gaze Estéril", orderedQty: 100, unit: "pacotes", receivedQty: 100, status: "ok" },
  { id: 5, name: "Álcool 70%", orderedQty: 20, unit: "litros", receivedQty: 20, status: "ok" },
];

export function ReceiveOrderDialog({ open, onOpenChange, order }: ReceiveOrderDialogProps) {
  const [items, setItems] = useState(mockOrderItems);
  const [notes, setNotes] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState("");

  if (!order) return null;

  const handleUpdateQty = (id: number, qty: number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const status = qty === item.orderedQty ? "ok" : qty < item.orderedQty ? "partial" : "excess";
        return { ...item, receivedQty: qty, status };
      }
      return item;
    }));
  };

  const hasDiscrepancy = items.some(item => item.receivedQty !== item.orderedQty);

  const handleConfirm = () => {
    toast.success(`Recebimento do pedido ${order.id} confirmado!`);
    onOpenChange(false);
    setNotes("");
    setConfirmed(false);
    setInvoiceNumber("");
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-12 w-12 rounded-xl bg-confirmed/10 flex items-center justify-center">
              <Package className="h-6 w-6 text-confirmed" />
            </div>
            <div>
              <AlertDialogTitle>Confirmar Recebimento</AlertDialogTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Pedido {order.id} • {order.supplier}
              </p>
            </div>
          </div>
        </AlertDialogHeader>

        <div className="space-y-4 flex-1 overflow-hidden">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Número da Nota Fiscal</Label>
              <Input
                placeholder="Ex: NF-12345"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Data de Recebimento</Label>
              <div className="flex items-center gap-2 h-10 px-3 rounded-md border bg-muted/30">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{new Date().toLocaleDateString('pt-BR')}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Conferência de Itens</Label>
            <ScrollArea className="h-[200px] rounded-lg border">
              <div className="p-2 space-y-2">
                {items.map((item) => (
                  <div 
                    key={item.id} 
                    className={`p-3 rounded-lg border ${
                      item.status === "partial" 
                        ? "bg-pending/5 border-pending/20" 
                        : item.status === "excess"
                        ? "bg-info/5 border-info/20"
                        : "bg-muted/20"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Pedido: {item.orderedQty} {item.unit}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <Label className="text-xs text-muted-foreground">Recebido:</Label>
                          <Input
                            type="number"
                            value={item.receivedQty}
                            onChange={(e) => handleUpdateQty(item.id, parseInt(e.target.value) || 0)}
                            className="w-20 h-8"
                          />
                        </div>
                        <Badge 
                          variant="outline" 
                          className={
                            item.status === "partial" 
                              ? "bg-pending/10 text-pending border-pending/20" 
                              : item.status === "excess"
                              ? "bg-info/10 text-info border-info/20"
                              : "bg-confirmed/10 text-confirmed border-confirmed/20"
                          }
                        >
                          {item.status === "partial" ? "Parcial" : item.status === "excess" ? "Excedente" : "OK"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {hasDiscrepancy && (
            <div className="p-3 rounded-lg bg-pending/10 border border-pending/20 flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-pending shrink-0 mt-0.5" />
              <p className="text-sm text-pending">
                Há divergência entre as quantidades pedidas e recebidas. 
                Informe o motivo nas observações.
              </p>
            </div>
          )}

          <div className="space-y-2">
            <Label>Observações {hasDiscrepancy && <span className="text-destructive">*</span>}</Label>
            <Textarea
              placeholder="Descreva qualquer ocorrência no recebimento..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="confirm-receive" 
              checked={confirmed} 
              onCheckedChange={(checked) => setConfirmed(checked as boolean)}
            />
            <Label htmlFor="confirm-receive" className="font-normal text-sm">
              Confirmo que todos os itens foram conferidos e estão em boas condições
            </Label>
          </div>
        </div>

        <AlertDialogFooter className="border-t pt-4">
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={!confirmed || !invoiceNumber || (hasDiscrepancy && !notes)}
            className="bg-confirmed text-white hover:bg-confirmed/90 gap-2"
          >
            <CheckCircle2 className="h-4 w-4" />
            Confirmar Recebimento
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
