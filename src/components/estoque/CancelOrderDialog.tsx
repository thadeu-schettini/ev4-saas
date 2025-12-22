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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AlertTriangle, XCircle, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

interface CancelOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: {
    id: string;
    supplier: string;
    total: number;
  } | null;
}

export function CancelOrderDialog({ open, onOpenChange, order }: CancelOrderDialogProps) {
  const [reason, setReason] = useState("");
  const [customReason, setCustomReason] = useState("");

  if (!order) return null;

  const handleCancel = () => {
    const finalReason = reason === "other" ? customReason : reason;
    toast.success(`Pedido ${order.id} cancelado! Motivo: ${finalReason}`);
    onOpenChange(false);
    setReason("");
    setCustomReason("");
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-12 w-12 rounded-xl bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <AlertDialogTitle>Cancelar Pedido</AlertDialogTitle>
              <p className="text-sm text-muted-foreground mt-1">Esta ação não pode ser desfeita</p>
            </div>
          </div>
          
          <div className="p-4 rounded-xl bg-muted/30 border my-4">
            <div className="flex items-center gap-3">
              <ShoppingCart className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">{order.id}</p>
                <p className="text-sm text-muted-foreground">
                  {order.supplier} • R$ {order.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-3">
              <Label>Motivo do Cancelamento</Label>
              <RadioGroup value={reason} onValueChange={setReason}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Fornecedor sem estoque" id="no-stock" />
                  <Label htmlFor="no-stock" className="font-normal">Fornecedor sem estoque</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Preço alterado" id="price" />
                  <Label htmlFor="price" className="font-normal">Preço alterado</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Prazo de entrega incompatível" id="deadline" />
                  <Label htmlFor="deadline" className="font-normal">Prazo de entrega incompatível</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Pedido duplicado" id="duplicate" />
                  <Label htmlFor="duplicate" className="font-normal">Pedido duplicado</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other" className="font-normal">Outro motivo</Label>
                </div>
              </RadioGroup>
            </div>

            {reason === "other" && (
              <div className="space-y-2">
                <Label>Descreva o motivo</Label>
                <Textarea
                  placeholder="Informe o motivo do cancelamento..."
                  value={customReason}
                  onChange={(e) => setCustomReason(e.target.value)}
                  rows={3}
                />
              </div>
            )}
          </div>

          <AlertDialogDescription className="mt-4">
            O fornecedor será notificado sobre o cancelamento deste pedido.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => { setReason(""); setCustomReason(""); }}>
            Voltar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleCancel}
            disabled={!reason || (reason === "other" && !customReason)}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 gap-2"
          >
            <XCircle className="h-4 w-4" />
            Confirmar Cancelamento
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
