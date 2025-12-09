import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeftRight, User, Stethoscope, Search, ArrowRight, Send, AlertCircle } from "lucide-react";

interface NewInterconsultaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const mockPatients = [
  { id: 1, name: "Maria Silva", age: 45, phone: "(11) 99999-1234" },
  { id: 2, name: "João Oliveira", age: 32, phone: "(11) 98888-5678" },
  { id: 3, name: "Ana Costa", age: 28, phone: "(11) 97777-9012" },
];

const mockProfessionals = [
  { id: 1, name: "Dr. Carlos Santos", specialty: "Clínico Geral" },
  { id: 2, name: "Dra. Ana Lima", specialty: "Cardiologia" },
  { id: 3, name: "Dr. Pedro Mendes", specialty: "Ortopedia" },
  { id: 4, name: "Dra. Lucia Fernandes", specialty: "Endocrinologia" },
  { id: 5, name: "Dr. Roberto Silva", specialty: "Nefrologia" },
];

export function NewInterconsultaModal({ open, onOpenChange }: NewInterconsultaModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedPatient, setSelectedPatient] = useState<number | null>(null);
  const [selectedProfessional, setSelectedProfessional] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    reason: "",
    priority: "normal",
    notes: "",
  });

  const handleSubmit = () => {
    onOpenChange(false);
    setStep(1);
    setSelectedPatient(null);
    setSelectedProfessional(null);
    setFormData({ reason: "", priority: "normal", notes: "" });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ArrowLeftRight className="h-5 w-5 text-primary" />
            {step === 1 ? "Selecionar Paciente" : 
             step === 2 ? "Encaminhar Para" : 
             "Detalhes da Interconsulta"}
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
                      <p className="text-sm text-muted-foreground">{patient.age} anos • {patient.phone}</p>
                    </div>
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
                {mockProfessionals.map((prof) => (
                  <div
                    key={prof.id}
                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      selectedProfessional === prof.id 
                        ? "bg-primary/5 border-primary/30" 
                        : "hover:bg-muted/50"
                    }`}
                    onClick={() => setSelectedProfessional(prof.id)}
                  >
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <Stethoscope className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{prof.name}</p>
                      <Badge variant="outline" className="text-xs mt-1">
                        {prof.specialty}
                      </Badge>
                    </div>
                    {selectedProfessional === prof.id && (
                      <ArrowRight className="h-5 w-5 text-primary" />
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="flex items-center justify-between pt-4 border-t">
              <Button variant="ghost" onClick={() => setStep(1)}>
                Voltar
              </Button>
              <Button onClick={() => setStep(3)} disabled={!selectedProfessional}>
                Próximo
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            {/* Summary */}
            <div className="flex items-center justify-center gap-4 p-4 rounded-xl bg-muted/30">
              <div className="text-center">
                <Avatar className="h-12 w-12 mx-auto">
                  <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/5">
                    <User className="h-6 w-6 text-primary" />
                  </AvatarFallback>
                </Avatar>
                <p className="text-sm font-medium mt-2">
                  {mockPatients.find(p => p.id === selectedPatient)?.name}
                </p>
              </div>
              <ArrowRight className="h-6 w-6 text-primary" />
              <div className="text-center">
                <div className="h-12 w-12 mx-auto rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <Stethoscope className="h-6 w-6 text-primary" />
                </div>
                <p className="text-sm font-medium mt-2">
                  {mockProfessionals.find(p => p.id === selectedProfessional)?.name}
                </p>
                <Badge variant="outline" className="text-xs">
                  {mockProfessionals.find(p => p.id === selectedProfessional)?.specialty}
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Motivo da Interconsulta</Label>
              <Textarea 
                placeholder="Descreva o motivo do encaminhamento..."
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Prioridade</Label>
              <RadioGroup 
                value={formData.priority} 
                onValueChange={(value) => setFormData({ ...formData, priority: value })}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="normal" id="normal" />
                  <Label htmlFor="normal" className="font-normal">Normal</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="urgent" id="urgent" />
                  <Label htmlFor="urgent" className="font-normal flex items-center gap-1">
                    <AlertCircle className="h-3 w-3 text-destructive" />
                    Urgente
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Observações Adicionais (opcional)</Label>
              <Textarea 
                placeholder="Informações complementares..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={2}
              />
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <Button variant="ghost" onClick={() => setStep(2)}>
                Voltar
              </Button>
              <Button onClick={handleSubmit} className="gap-2">
                <Send className="h-4 w-4" />
                Enviar Interconsulta
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
