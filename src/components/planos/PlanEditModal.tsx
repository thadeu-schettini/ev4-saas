import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  Layers,
  Save,
  DollarSign,
  Calendar,
  CheckCircle2,
  X,
} from "lucide-react";
import { toast } from "sonner";

interface Plan {
  id: number;
  name: string;
  description: string;
  sessions: number;
  price: number;
  services: string[];
  active: boolean;
  patients: number;
  completion: number;
  category: string;
  popular?: boolean;
}

interface PlanEditModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plan: Plan | null;
}

export function PlanEditModal({ open, onOpenChange, plan }: PlanEditModalProps) {
  const [formData, setFormData] = useState({
    name: plan?.name || "",
    description: plan?.description || "",
    sessions: plan?.sessions || 1,
    price: plan?.price || 0,
    validity: 90,
    active: plan?.active ?? true,
  });
  const [isSaving, setIsSaving] = useState(false);

  if (!plan) return null;

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Plano atualizado com sucesso!");
      onOpenChange(false);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-primary/70 to-primary/50 shadow-sm">
              <Layers className="h-3.5 w-3.5 text-white" />
            </div>
            <div>
              <DialogTitle>Editar Plano</DialogTitle>
              <p className="text-sm text-muted-foreground">{plan.name}</p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Status Toggle */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border">
            <div className="flex items-center gap-3">
              <div className={cn(
                "p-2 rounded-lg",
                formData.active ? "bg-emerald-500/10" : "bg-muted"
              )}>
                {formData.active ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                ) : (
                  <X className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
              <div>
                <p className="font-medium">Status do Plano</p>
                <p className="text-sm text-muted-foreground">
                  {formData.active ? "Plano ativo e disponível" : "Plano inativo"}
                </p>
              </div>
            </div>
            <Switch
              checked={formData.active}
              onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
            />
          </div>

          <div className="space-y-2">
            <Label>Nome do Plano</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ex: Fisioterapia Lombar"
            />
          </div>

          <div className="space-y-2">
            <Label>Descrição</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Descreva o plano..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                Sessões
              </Label>
              <Input
                type="number"
                value={formData.sessions}
                onChange={(e) => setFormData({ ...formData, sessions: parseInt(e.target.value) || 1 })}
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                Preço (R$)
              </Label>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
              />
            </div>
            <div className="space-y-2">
              <Label>Validade (dias)</Label>
              <Input
                type="number"
                value={formData.validity}
                onChange={(e) => setFormData({ ...formData, validity: parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-muted/30 border">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{plan.patients}</p>
              <p className="text-sm text-muted-foreground">Pacientes ativos</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-emerald-600">{plan.completion}%</p>
              <p className="text-sm text-muted-foreground">Taxa de conclusão</p>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={isSaving} className="gap-2">
            {isSaving ? (
              "Salvando..."
            ) : (
              <>
                <Save className="h-4 w-4" />
                Salvar
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
