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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2, ShoppingCart, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

interface ApproveOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: {
    id: string;
    supplier: string;
    total: number;
    items: number;
  } | null;
}

export function ApproveOrderDialog({ open, onOpenChange, order }: ApproveOrderDialogProps) {
  const [notes, setNotes] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [notifySupplier, setNotifySupplier] = useState(true);

  if (!order) return null;

  const handleApprove = () => {
    toast.success(`Pedido ${order.id} aprovado com sucesso!`);
    onOpenChange(false);
    setNotes("");
    setConfirmed(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-12 w-12 rounded-xl bg-confirmed/10 flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6 text-confirmed" />
            </div>
            <div>
              <AlertDialogTitle>Aprovar Pedido de Compra</AlertDialogTitle>
              <p className="text-sm text-muted-foreground mt-1">Confirme os dados antes de aprovar</p>
            </div>
          </div>
          
          <div className="p-4 rounded-xl bg-muted/30 border my-4">
            <div className="flex items-center gap-3 mb-3">
              <ShoppingCart className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">{order.id}</p>
                <p className="text-sm text-muted-foreground">{order.supplier}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-3 border-t">
              <div>
                <p className="text-xs text-muted-foreground">Itens</p>
                <p className="font-medium">{order.items} itens</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Valor Total</p>
                <p className="font-bold text-primary">
                  R$ {order.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Observações (opcional)</Label>
              <Textarea
                placeholder="Adicione observações para o fornecedor..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="notify" 
                  checked={notifySupplier} 
                  onCheckedChange={(checked) => setNotifySupplier(checked as boolean)}
                />
                <Label htmlFor="notify" className="font-normal text-sm">
                  Notificar fornecedor por e-mail
                </Label>
              </div>

              <div className="flex items-start space-x-2 p-3 rounded-lg bg-pending/10 border border-pending/20">
                <Checkbox 
                  id="confirm" 
                  checked={confirmed} 
                  onCheckedChange={(checked) => setConfirmed(checked as boolean)}
                />
                <div>
                  <Label htmlFor="confirm" className="font-normal text-sm">
                    Confirmo que verifiquei os itens, quantidades e valores do pedido
                  </Label>
                </div>
              </div>
            </div>
          </div>

          <AlertDialogDescription className="mt-2 flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-pending shrink-0 mt-0.5" />
            <span>Após aprovação, o pedido será enviado automaticamente ao fornecedor.</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => { setNotes(""); setConfirmed(false); }}>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleApprove}
            disabled={!confirmed}
            className="bg-confirmed text-white hover:bg-confirmed/90 gap-2"
          >
            <CheckCircle2 className="h-4 w-4" />
            Aprovar Pedido
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
