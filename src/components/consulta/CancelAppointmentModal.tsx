import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { 
  XCircle, 
  AlertTriangle, 
  Calendar,
  Clock,
  User,
  MessageSquare
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface CancelAppointmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appointment?: {
    id: string;
    date: string;
    time: string;
    professional: string;
    service: string;
  };
  onConfirm?: () => void;
}

const cancelReasons = [
  { id: "conflict", label: "Conflito de horário", description: "Tenho outro compromisso" },
  { id: "health", label: "Motivo de saúde", description: "Não estou me sentindo bem" },
  { id: "personal", label: "Motivo pessoal", description: "Questões pessoais ou familiares" },
  { id: "financial", label: "Motivo financeiro", description: "Imprevistos financeiros" },
  { id: "other", label: "Outro motivo", description: "Especificar nos comentários" },
];

export function CancelAppointmentModal({ open, onOpenChange, appointment, onConfirm }: CancelAppointmentModalProps) {
  const [selectedReason, setSelectedReason] = useState("");
  const [comments, setComments] = useState("");
  const [isConfirming, setIsConfirming] = useState(false);

  const handleCancel = () => {
    if (!selectedReason) {
      toast.error("Selecione um motivo para o cancelamento");
      return;
    }
    
    setIsConfirming(true);
    setTimeout(() => {
      toast.success("Consulta cancelada com sucesso", {
        description: "Uma notificação foi enviada para a clínica."
      });
      onOpenChange(false);
      setIsConfirming(false);
      setSelectedReason("");
      setComments("");
      onConfirm?.();
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader className="pb-4 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-red-500 to-rose-500 shadow-lg">
              <XCircle className="h-5 w-5 text-white" />
            </div>
            <div>
              <DialogTitle>Cancelar Consulta</DialogTitle>
              <p className="text-sm text-muted-foreground mt-0.5">
                Esta ação não poderá ser desfeita
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="py-4 space-y-5">
          {/* Appointment Summary */}
          <div className="p-4 rounded-xl bg-muted/50 border space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{appointment?.date || "Data não informada"}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{appointment?.time || "Horário"} - {appointment?.service || "Consulta"}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <User className="h-4 w-4 text-muted-foreground" />
              <span>{appointment?.professional || "Profissional"}</span>
            </div>
          </div>

          {/* Warning */}
          <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-amber-600 mb-1">Atenção</p>
              <p className="text-muted-foreground">
                Cancelamentos com menos de 24h de antecedência podem estar sujeitos a políticas da clínica.
              </p>
            </div>
          </div>

          {/* Reason Selection */}
          <div className="space-y-3">
            <Label>Motivo do cancelamento *</Label>
            <RadioGroup value={selectedReason} onValueChange={setSelectedReason}>
              <div className="space-y-2">
                {cancelReasons.map((reason) => (
                  <label
                    key={reason.id}
                    className={cn(
                      "flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all",
                      selectedReason === reason.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <RadioGroupItem value={reason.id} className="mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">{reason.label}</p>
                      <p className="text-xs text-muted-foreground">{reason.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* Comments */}
          <div className="space-y-2">
            <Label htmlFor="comments" className="flex items-center gap-2">
              <MessageSquare className="h-3.5 w-3.5 text-muted-foreground" />
              Comentários adicionais
            </Label>
            <Textarea
              id="comments"
              placeholder="Informações adicionais sobre o cancelamento..."
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <div className="flex gap-2 pt-4 border-t">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onOpenChange(false)}
            disabled={isConfirming}
          >
            Voltar
          </Button>
          <Button
            variant="destructive"
            className="flex-1 gap-2"
            onClick={handleCancel}
            disabled={isConfirming || !selectedReason}
          >
            {isConfirming ? (
              <>
                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Cancelando...
              </>
            ) : (
              <>
                <XCircle className="h-4 w-4" />
                Confirmar Cancelamento
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
