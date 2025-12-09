import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Send, User, FileText, Search, CheckCircle2 } from "lucide-react";

interface NewTriagemModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const mockPatients = [
  { id: 1, name: "Maria Silva", phone: "(11) 99999-1234", nextAppointment: "Hoje, 14:00" },
  { id: 2, name: "João Oliveira", phone: "(11) 98888-5678", nextAppointment: "Hoje, 15:30" },
  { id: 3, name: "Ana Costa", phone: "(11) 97777-9012", nextAppointment: "Amanhã, 09:00" },
  { id: 4, name: "Pedro Mendes", phone: "(11) 96666-3456", nextAppointment: "Amanhã, 10:30" },
];

const mockTemplates = [
  { id: 1, name: "Triagem Geral", questions: 12 },
  { id: 2, name: "Pré-Consulta Cardiologia", questions: 18 },
  { id: 3, name: "Avaliação Pediátrica", questions: 15 },
  { id: 4, name: "Check-up Preventivo", questions: 20 },
];

export function NewTriagemModal({ open, onOpenChange }: NewTriagemModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPatients, setSelectedPatients] = useState<number[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [step, setStep] = useState<1 | 2>(1);

  const togglePatient = (id: number) => {
    setSelectedPatients(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const handleSend = () => {
    onOpenChange(false);
    setStep(1);
    setSelectedPatients([]);
    setSelectedTemplate("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Send className="h-5 w-5 text-primary" />
            {step === 1 ? "Selecionar Pacientes" : "Escolher Template"}
          </DialogTitle>
        </DialogHeader>

        {step === 1 ? (
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

            <ScrollArea className="h-[300px]">
              <div className="space-y-2">
                {mockPatients.map((patient) => (
                  <div
                    key={patient.id}
                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      selectedPatients.includes(patient.id) 
                        ? "bg-primary/5 border-primary/30" 
                        : "hover:bg-muted/50"
                    }`}
                    onClick={() => togglePatient(patient.id)}
                  >
                    <Checkbox checked={selectedPatients.includes(patient.id)} />
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

            <div className="flex items-center justify-between pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                {selectedPatients.length} paciente(s) selecionado(s)
              </p>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                  Cancelar
                </Button>
                <Button 
                  onClick={() => setStep(2)} 
                  disabled={selectedPatients.length === 0}
                >
                  Próximo
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {mockTemplates.map((template) => (
                <div
                  key={template.id}
                  className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                    selectedTemplate === String(template.id)
                      ? "bg-primary/5 border-primary/30"
                      : "hover:bg-muted/50"
                  }`}
                  onClick={() => setSelectedTemplate(String(template.id))}
                >
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{template.name}</p>
                    <p className="text-sm text-muted-foreground">{template.questions} perguntas</p>
                  </div>
                  {selectedTemplate === String(template.id) && (
                    <CheckCircle2 className="h-5 w-5 text-primary ml-auto" />
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <Button variant="ghost" onClick={() => setStep(1)}>
                Voltar
              </Button>
              <Button 
                onClick={handleSend} 
                disabled={!selectedTemplate}
                className="gap-2"
              >
                <Send className="h-4 w-4" />
                Enviar Triagem
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
