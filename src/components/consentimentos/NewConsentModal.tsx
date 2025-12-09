import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { FileSignature, User, FileText, Search, Send, CheckCircle2, Calendar } from "lucide-react";

interface NewConsentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const mockPatients = [
  { id: 1, name: "Maria Silva", phone: "(11) 99999-1234", nextAppointment: "Hoje, 14:00" },
  { id: 2, name: "João Oliveira", phone: "(11) 98888-5678", nextAppointment: "Hoje, 15:30" },
  { id: 3, name: "Ana Costa", phone: "(11) 97777-9012", nextAppointment: "Amanhã, 09:00" },
];

const mockTemplates = [
  { id: 1, name: "Consentimento Cirúrgico Geral", category: "Cirurgia" },
  { id: 2, name: "Consentimento para Exame Invasivo", category: "Exames" },
  { id: 3, name: "Consentimento Anestesia", category: "Anestesia" },
  { id: 4, name: "Consentimento Tratamento Estético", category: "Estética" },
  { id: 5, name: "Consentimento Ortodontia", category: "Odontologia" },
];

export function NewConsentModal({ open, onOpenChange }: NewConsentModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedPatient, setSelectedPatient] = useState<number | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    procedure: "",
    appointmentDate: "",
    sendWhatsApp: true,
    sendEmail: false,
  });

  const handleSubmit = () => {
    onOpenChange(false);
    setStep(1);
    setSelectedPatient(null);
    setSelectedTemplate(null);
    setFormData({ procedure: "", appointmentDate: "", sendWhatsApp: true, sendEmail: false });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileSignature className="h-5 w-5 text-primary" />
            {step === 1 ? "Selecionar Paciente" : 
             step === 2 ? "Escolher Template" : 
             "Configurar Envio"}
          </DialogTitle>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar paciente..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            <ScrollArea className="h-[250px]">
              <div className="space-y-2">
                {mockPatients.map((patient) => (
                  <div
                    key={patient.id}
                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      selectedPatient === patient.id 
                        ? "bg-primary/5 border-primary/30" 
                        : "hover:bg-muted/50"
                    }`}
                    onClick={() => setSelectedPatient(patient.id)}
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/5">
                        <User className="h-5 w-5 text-primary" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">{patient.name}</p>
                      <p className="text-sm text-muted-foreground">{patient.phone}</p>
                    </div>
                    <Badge variant="outline">{patient.nextAppointment}</Badge>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setStep(2)} disabled={!selectedPatient}>
                Próximo
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <ScrollArea className="h-[300px]">
              <div className="space-y-2">
                {mockTemplates.map((template) => (
                  <div
                    key={template.id}
                    className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                      selectedTemplate === template.id 
                        ? "bg-primary/5 border-primary/30" 
                        : "hover:bg-muted/50"
                    }`}
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{template.name}</p>
                      <Badge variant="outline" className="text-xs mt-1">
                        {template.category}
                      </Badge>
                    </div>
                    {selectedTemplate === template.id && (
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="flex items-center justify-between pt-4 border-t">
              <Button variant="ghost" onClick={() => setStep(1)}>
                Voltar
              </Button>
              <Button onClick={() => setStep(3)} disabled={!selectedTemplate}>
                Próximo
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            {/* Summary */}
            <div className="p-4 rounded-xl bg-muted/30 space-y-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/5">
                    <User className="h-5 w-5 text-primary" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">
                    {mockPatients.find(p => p.id === selectedPatient)?.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {mockPatients.find(p => p.id === selectedPatient)?.phone}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  {mockTemplates.find(t => t.id === selectedTemplate)?.name}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Procedimento</Label>
              <Input 
                placeholder="Ex: Cirurgia de Catarata"
                value={formData.procedure}
                onChange={(e) => setFormData({ ...formData, procedure: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Data do Procedimento</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="date"
                  value={formData.appointmentDate}
                  onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label>Enviar via</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="whatsapp"
                    checked={formData.sendWhatsApp}
                    onCheckedChange={(checked) => setFormData({ ...formData, sendWhatsApp: !!checked })}
                  />
                  <Label htmlFor="whatsapp" className="font-normal">WhatsApp</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="email"
                    checked={formData.sendEmail}
                    onCheckedChange={(checked) => setFormData({ ...formData, sendEmail: !!checked })}
                  />
                  <Label htmlFor="email" className="font-normal">E-mail</Label>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <Button variant="ghost" onClick={() => setStep(2)}>
                Voltar
              </Button>
              <Button onClick={handleSubmit} className="gap-2">
                <Send className="h-4 w-4" />
                Enviar Consentimento
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
