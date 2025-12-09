import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GitBranch, Plus, Trash2, GripVertical, Clock, Zap, ArrowRight } from "lucide-react";

interface NewProtocolModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface ProtocolStep {
  id: number;
  name: string;
  timing: string;
  type: string;
}

export function NewProtocolModal({ open, onOpenChange }: NewProtocolModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    trigger: "",
    triggerDescription: "",
  });
  
  const [steps, setSteps] = useState<ProtocolStep[]>([
    { id: 1, name: "", timing: "", type: "exame" }
  ]);

  const addStep = () => {
    setSteps([...steps, { id: Date.now(), name: "", timing: "", type: "exame" }]);
  };

  const removeStep = (id: number) => {
    if (steps.length > 1) {
      setSteps(steps.filter(s => s.id !== id));
    }
  };

  const updateStep = (id: number, field: keyof ProtocolStep, value: string) => {
    setSteps(steps.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const handleSubmit = () => {
    onOpenChange(false);
    setFormData({ name: "", description: "", category: "", trigger: "", triggerDescription: "" });
    setSteps([{ id: 1, name: "", timing: "", type: "exame" }]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <GitBranch className="h-5 w-5 text-primary" />
            Novo Protocolo Clínico
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-150px)] pr-4">
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Nome do Protocolo</Label>
                <Input 
                  placeholder="Ex: Acompanhamento Diabetes Tipo 2"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Descrição</Label>
                <Textarea 
                  placeholder="Descreva o objetivo e indicação do protocolo..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Categoria</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="endocrinologia">Endocrinologia</SelectItem>
                      <SelectItem value="cardiologia">Cardiologia</SelectItem>
                      <SelectItem value="obstetricia">Obstetrícia</SelectItem>
                      <SelectItem value="ortopedia">Ortopedia</SelectItem>
                      <SelectItem value="pediatria">Pediatria</SelectItem>
                      <SelectItem value="geral">Geral</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Tipo de Gatilho</Label>
                  <Select 
                    value={formData.trigger} 
                    onValueChange={(value) => setFormData({ ...formData, trigger: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="diagnostico">Diagnóstico (CID)</SelectItem>
                      <SelectItem value="procedimento">Após Procedimento</SelectItem>
                      <SelectItem value="idade">Faixa Etária</SelectItem>
                      <SelectItem value="manual">Ativação Manual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {formData.trigger && (
                <div className="space-y-2">
                  <Label>Descrição do Gatilho</Label>
                  <div className="relative">
                    <Zap className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder={
                        formData.trigger === "diagnostico" ? "Ex: Diagnóstico CID E11" :
                        formData.trigger === "procedimento" ? "Ex: Após cirurgia ortopédica" :
                        formData.trigger === "idade" ? "Ex: Pacientes acima de 60 anos" :
                        "Ex: Quando indicado pelo profissional"
                      }
                      value={formData.triggerDescription}
                      onChange={(e) => setFormData({ ...formData, triggerDescription: e.target.value })}
                      className="pl-9"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Steps */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Etapas do Protocolo</Label>
                <Button variant="ghost" size="sm" onClick={addStep} className="gap-1 h-7">
                  <Plus className="h-3 w-3" />
                  Adicionar Etapa
                </Button>
              </div>

              <div className="space-y-3">
                {steps.map((step, index) => (
                  <div key={step.id} className="relative">
                    {index > 0 && (
                      <div className="absolute -top-3 left-6 h-3 w-px bg-border" />
                    )}
                    <div className="flex items-start gap-3 p-4 rounded-xl border bg-muted/20">
                      <div className="flex flex-col items-center gap-1 pt-1">
                        <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                        <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                          {index + 1}
                        </div>
                      </div>

                      <div className="flex-1 space-y-3">
                        <div className="grid grid-cols-3 gap-3">
                          <div className="col-span-2 space-y-1">
                            <Label className="text-xs">Nome da Etapa</Label>
                            <Input 
                              placeholder="Ex: Exame HbA1c"
                              value={step.name}
                              onChange={(e) => updateStep(step.id, "name", e.target.value)}
                            />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs">Tipo</Label>
                            <Select 
                              value={step.type} 
                              onValueChange={(value) => updateStep(step.id, "type", value)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="exame">Exame</SelectItem>
                                <SelectItem value="consulta">Consulta</SelectItem>
                                <SelectItem value="procedimento">Procedimento</SelectItem>
                                <SelectItem value="medicacao">Medicação</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
                          <Input 
                            placeholder="Ex: A cada 3 meses, 7 dias após, Anual..."
                            value={step.timing}
                            onChange={(e) => updateStep(step.id, "timing", e.target.value)}
                          />
                        </div>
                      </div>

                      {steps.length > 1 && (
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-destructive shrink-0"
                          onClick={() => removeStep(step.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    {index < steps.length - 1 && (
                      <div className="flex justify-center py-1">
                        <ArrowRight className="h-4 w-4 text-muted-foreground rotate-90" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} className="gap-2">
            <Plus className="h-4 w-4" />
            Criar Protocolo
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
