import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Bell, User, Pill, Plus, Search, Clock, Calendar } from "lucide-react";

interface NewReminderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const mockPatients = [
  { id: 1, name: "Maria Silva", phone: "(11) 99999-1234" },
  { id: 2, name: "João Oliveira", phone: "(11) 98888-5678" },
  { id: 3, name: "Ana Costa", phone: "(11) 97777-9012" },
];

export function NewReminderModal({ open, onOpenChange }: NewReminderModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedPatient, setSelectedPatient] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    medication: "",
    dosage: "",
    frequency: "",
    times: ["08:00"],
    startDate: "",
    endDate: "",
  });

  const handleSubmit = () => {
    onOpenChange(false);
    setStep(1);
    setSelectedPatient(null);
    setFormData({
      medication: "",
      dosage: "",
      frequency: "",
      times: ["08:00"],
      startDate: "",
      endDate: "",
    });
  };

  const addTime = () => {
    setFormData({ ...formData, times: [...formData.times, "12:00"] });
  };

  const updateTime = (index: number, value: string) => {
    const newTimes = [...formData.times];
    newTimes[index] = value;
    setFormData({ ...formData, times: newTimes });
  };

  const removeTime = (index: number) => {
    setFormData({ ...formData, times: formData.times.filter((_, i) => i !== index) });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            {step === 1 ? "Selecionar Paciente" : "Configurar Lembrete"}
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
              <Label>Medicamento</Label>
              <div className="relative">
                <Pill className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Ex: Losartana 50mg"
                  value={formData.medication}
                  onChange={(e) => setFormData({ ...formData, medication: e.target.value })}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Dosagem</Label>
                <Input 
                  placeholder="Ex: 1 comprimido"
                  value={formData.dosage}
                  onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Frequência</Label>
                <Select 
                  value={formData.frequency} 
                  onValueChange={(value) => setFormData({ ...formData, frequency: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1x">1x ao dia</SelectItem>
                    <SelectItem value="2x">2x ao dia</SelectItem>
                    <SelectItem value="3x">3x ao dia</SelectItem>
                    <SelectItem value="4x">4x ao dia</SelectItem>
                    <SelectItem value="8h">A cada 8 horas</SelectItem>
                    <SelectItem value="12h">A cada 12 horas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Horários</Label>
                <Button variant="ghost" size="sm" onClick={addTime} className="gap-1 h-7">
                  <Plus className="h-3 w-3" />
                  Adicionar
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.times.map((time, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <div className="relative">
                      <Clock className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                      <Input 
                        type="time"
                        value={time}
                        onChange={(e) => updateTime(index, e.target.value)}
                        className="w-28 pl-7 h-8"
                      />
                    </div>
                    {formData.times.length > 1 && (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => removeTime(index)}
                      >
                        ×
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Data Início</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Data Fim</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="pl-9"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <Button variant="ghost" onClick={() => setStep(1)}>
                Voltar
              </Button>
              <Button onClick={handleSubmit} className="gap-2">
                <Bell className="h-4 w-4" />
                Criar Lembrete
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
