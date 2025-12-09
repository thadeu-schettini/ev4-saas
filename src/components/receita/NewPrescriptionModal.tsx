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
import { FileDigit, User, Pill, Plus, Search, Trash2, GripVertical } from "lucide-react";

interface NewPrescriptionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const mockPatients = [
  { id: 1, name: "Maria Silva", phone: "(11) 99999-1234" },
  { id: 2, name: "João Oliveira", phone: "(11) 98888-5678" },
  { id: 3, name: "Ana Costa", phone: "(11) 97777-9012" },
];

interface Medication {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

export function NewPrescriptionModal({ open, onOpenChange }: NewPrescriptionModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedPatient, setSelectedPatient] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [prescriptionType, setPrescriptionType] = useState("comum");
  const [medications, setMedications] = useState<Medication[]>([
    { id: 1, name: "", dosage: "", frequency: "", duration: "", instructions: "" }
  ]);

  const addMedication = () => {
    setMedications([
      ...medications, 
      { id: Date.now(), name: "", dosage: "", frequency: "", duration: "", instructions: "" }
    ]);
  };

  const removeMedication = (id: number) => {
    if (medications.length > 1) {
      setMedications(medications.filter(m => m.id !== id));
    }
  };

  const updateMedication = (id: number, field: keyof Medication, value: string) => {
    setMedications(medications.map(m => 
      m.id === id ? { ...m, [field]: value } : m
    ));
  };

  const handleSubmit = () => {
    onOpenChange(false);
    setStep(1);
    setSelectedPatient(null);
    setMedications([{ id: 1, name: "", dosage: "", frequency: "", duration: "", instructions: "" }]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileDigit className="h-5 w-5 text-primary" />
            {step === 1 ? "Selecionar Paciente" : "Prescrever Medicamentos"}
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
                    <div>
                      <p className="font-medium">{patient.name}</p>
                      <p className="text-sm text-muted-foreground">{patient.phone}</p>
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
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Tipo de Receita</Label>
              <Select value={prescriptionType} onValueChange={setPrescriptionType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="comum">Comum</SelectItem>
                  <SelectItem value="antimicrobiano">Antimicrobiano</SelectItem>
                  <SelectItem value="controlado">Controlado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Medicamentos</Label>
                <Button variant="ghost" size="sm" onClick={addMedication} className="gap-1 h-7">
                  <Plus className="h-3 w-3" />
                  Adicionar
                </Button>
              </div>

              <ScrollArea className="h-[300px] pr-4">
                <div className="space-y-4">
                  {medications.map((med, index) => (
                    <div key={med.id} className="p-4 rounded-xl border bg-muted/20 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                          <Badge variant="outline">{index + 1}</Badge>
                        </div>
                        {medications.length > 1 && (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-7 w-7 text-destructive"
                            onClick={() => removeMedication(med.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>

                      <div className="space-y-2">
                        <div className="relative">
                          <Pill className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input 
                            placeholder="Nome do medicamento (ex: Losartana 50mg)"
                            value={med.name}
                            onChange={(e) => updateMedication(med.id, "name", e.target.value)}
                            className="pl-9"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <Input 
                          placeholder="Dosagem"
                          value={med.dosage}
                          onChange={(e) => updateMedication(med.id, "dosage", e.target.value)}
                        />
                        <Input 
                          placeholder="Frequência"
                          value={med.frequency}
                          onChange={(e) => updateMedication(med.id, "frequency", e.target.value)}
                        />
                        <Input 
                          placeholder="Duração"
                          value={med.duration}
                          onChange={(e) => updateMedication(med.id, "duration", e.target.value)}
                        />
                      </div>

                      <Textarea 
                        placeholder="Instruções especiais (opcional)"
                        value={med.instructions}
                        onChange={(e) => updateMedication(med.id, "instructions", e.target.value)}
                        rows={2}
                      />
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <Button variant="ghost" onClick={() => setStep(1)}>
                Voltar
              </Button>
              <Button onClick={handleSubmit} className="gap-2">
                <FileDigit className="h-4 w-4" />
                Gerar Receita
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
