import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowDownCircle, ArrowUpCircle, Package } from "lucide-react";

interface StockMovementModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: {
    id: number;
    name: string;
    quantity: number;
    unit: string;
  } | null;
  type: "entry" | "exit";
}

export function StockMovementModal({ open, onOpenChange, item, type }: StockMovementModalProps) {
  const [quantity, setQuantity] = useState("");
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    onOpenChange(false);
    setQuantity("");
    setReason("");
    setNotes("");
  };

  if (!item) return null;

  const isEntry = type === "entry";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isEntry ? (
              <ArrowDownCircle className="h-5 w-5 text-confirmed" />
            ) : (
              <ArrowUpCircle className="h-5 w-5 text-destructive" />
            )}
            {isEntry ? "Registrar Entrada" : "Registrar Saída"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Item Info */}
          <div className="p-4 rounded-xl bg-muted/30 border">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-muted-foreground">
                  Estoque atual: {item.quantity} {item.unit}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Quantidade</Label>
            <Input 
              type="number"
              placeholder="0"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            {quantity && (
              <p className="text-sm text-muted-foreground">
                Novo estoque: {isEntry ? item.quantity + Number(quantity) : item.quantity - Number(quantity)} {item.unit}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Motivo</Label>
            <RadioGroup value={reason} onValueChange={setReason}>
              {isEntry ? (
                <>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="compra" id="compra" />
                    <Label htmlFor="compra" className="font-normal">Compra</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="doacao" id="doacao" />
                    <Label htmlFor="doacao" className="font-normal">Doação</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="devolucao" id="devolucao" />
                    <Label htmlFor="devolucao" className="font-normal">Devolução</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ajuste" id="ajuste" />
                    <Label htmlFor="ajuste" className="font-normal">Ajuste de inventário</Label>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="uso" id="uso" />
                    <Label htmlFor="uso" className="font-normal">Uso em procedimento</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="vencido" id="vencido" />
                    <Label htmlFor="vencido" className="font-normal">Vencido/Descartado</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="perda" id="perda" />
                    <Label htmlFor="perda" className="font-normal">Perda/Dano</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ajuste" id="ajuste" />
                    <Label htmlFor="ajuste" className="font-normal">Ajuste de inventário</Label>
                  </div>
                </>
              )}
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Observações (opcional)</Label>
            <Textarea 
              placeholder="Informações adicionais..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleSubmit} 
              className="gap-2"
              variant={isEntry ? "default" : "destructive"}
            >
              {isEntry ? (
                <ArrowDownCircle className="h-4 w-4" />
              ) : (
                <ArrowUpCircle className="h-4 w-4" />
              )}
              {isEntry ? "Registrar Entrada" : "Registrar Saída"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
