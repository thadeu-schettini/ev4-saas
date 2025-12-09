import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Plus, Eye, Smartphone } from "lucide-react";

interface NewTemplateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const variables = [
  { key: "{{nome}}", label: "Nome do paciente" },
  { key: "{{profissional}}", label: "Nome do profissional" },
  { key: "{{data}}", label: "Data da consulta" },
  { key: "{{hora}}", label: "Hora da consulta" },
  { key: "{{clinica}}", label: "Nome da clínica" },
  { key: "{{telefone}}", label: "Telefone da clínica" },
];

export function NewTemplateModal({ open, onOpenChange }: NewTemplateModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    message: "",
  });
  const [showPreview, setShowPreview] = useState(false);

  const insertVariable = (variable: string) => {
    setFormData({ 
      ...formData, 
      message: formData.message + variable 
    });
  };

  const getPreviewMessage = () => {
    return formData.message
      .replace("{{nome}}", "Maria Silva")
      .replace("{{profissional}}", "Dr. Carlos Santos")
      .replace("{{data}}", "15/01/2025")
      .replace("{{hora}}", "14:00")
      .replace("{{clinica}}", "MedClinic")
      .replace("{{telefone}}", "(11) 3456-7890");
  };

  const handleSubmit = () => {
    onOpenChange(false);
    setFormData({ name: "", category: "", message: "" });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-green-600" />
            Novo Template WhatsApp
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Nome do Template</Label>
              <Input 
                placeholder="Ex: Confirmação de Consulta"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

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
                  <SelectItem value="appointment">Agendamento</SelectItem>
                  <SelectItem value="reminder">Lembrete</SelectItem>
                  <SelectItem value="followup">Pós-Consulta</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Mensagem</Label>
              <Textarea 
                placeholder="Digite a mensagem do template..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={6}
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground">
                {formData.message.length}/1024 caracteres
              </p>
            </div>

            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Variáveis disponíveis:</Label>
              <div className="flex flex-wrap gap-1">
                {variables.map((v) => (
                  <Badge 
                    key={v.key}
                    variant="outline" 
                    className="cursor-pointer hover:bg-primary/10 text-xs"
                    onClick={() => insertVariable(v.key)}
                  >
                    {v.key}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Pré-visualização</Label>
              <Button 
                variant="ghost" 
                size="sm" 
                className="gap-1"
                onClick={() => setShowPreview(!showPreview)}
              >
                <Eye className="h-4 w-4" />
                {showPreview ? "Esconder" : "Mostrar"}
              </Button>
            </div>

            {/* Phone Mockup */}
            <div className="mx-auto w-[280px]">
              <div className="rounded-[2.5rem] border-4 border-foreground/20 bg-foreground/5 p-2">
                <div className="rounded-[2rem] bg-card overflow-hidden">
                  {/* Status Bar */}
                  <div className="h-6 bg-muted/50 flex items-center justify-center">
                    <div className="w-20 h-1 bg-foreground/20 rounded-full" />
                  </div>
                  
                  {/* WhatsApp Header */}
                  <div className="bg-green-600 text-white p-3 flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                      <Smartphone className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">MedClinic</p>
                      <p className="text-xs text-white/70">online</p>
                    </div>
                  </div>

                  {/* Chat Area */}
                  <div className="h-[300px] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0iI2VjZTVkZCIvPgo8Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxIiBmaWxsPSIjZDBjOWMwIi8+Cjwvc3ZnPg==')] p-3 overflow-y-auto">
                    {formData.message && (
                      <div className="bg-white rounded-lg rounded-tl-none p-3 shadow-sm max-w-[220px] ml-auto">
                        <p className="text-sm whitespace-pre-wrap">
                          {showPreview ? getPreviewMessage() : formData.message}
                        </p>
                        <p className="text-[10px] text-muted-foreground text-right mt-1">
                          14:30 ✓✓
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} className="gap-2">
            <Plus className="h-4 w-4" />
            Criar Template
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
