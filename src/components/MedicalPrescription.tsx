import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Trash2, Plus, FileText, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SignaturePad } from "@/components/SignaturePad";

type Medication = {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  route: string;
  duration: string;
  totalQuantity: string;
  observations: string;
  continuousUse: boolean;
};

export const MedicalPrescription = () => {
  const { toast } = useToast();
  const [medications, setMedications] = useState<Medication[]>([
    {
      id: "1",
      name: "",
      dosage: "",
      frequency: "",
      route: "",
      duration: "",
      totalQuantity: "",
      observations: "",
      continuousUse: false,
    },
  ]);
  const [diagnosis, setDiagnosis] = useState("");
  const [patientInstructions, setPatientInstructions] = useState("");
  const [prescriptionType, setPrescriptionType] = useState("");
  const [allowedRefills, setAllowedRefills] = useState("");
  const [validity, setValidity] = useState("");

  const addMedication = () => {
    const newMedication: Medication = {
      id: Date.now().toString(),
      name: "",
      dosage: "",
      frequency: "",
      route: "",
      duration: "",
      totalQuantity: "",
      observations: "",
      continuousUse: false,
    };
    setMedications([...medications, newMedication]);
  };

  const removeMedication = (id: string) => {
    if (medications.length === 1) {
      toast({
        title: "Ação não permitida",
        description: "Deve haver pelo menos um medicamento na prescrição.",
        variant: "destructive",
      });
      return;
    }
    setMedications(medications.filter((med) => med.id !== id));
  };

  const updateMedication = (id: string, field: keyof Medication, value: string | boolean) => {
    setMedications(
      medications.map((med) =>
        med.id === id ? { ...med, [field]: value } : med
      )
    );
  };

  const handleSavePrescription = () => {
    // Validate at least one medication has a name
    const hasValidMedication = medications.some((med) => med.name.trim() !== "");
    
    if (!hasValidMedication) {
      toast({
        title: "Prescrição Incompleta",
        description: "Adicione pelo menos um medicamento antes de salvar.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Prescrição Salva",
      description: "A prescrição foi salva com sucesso.",
    });
  };

  const handlePostConsultationInstructions = () => {
    toast({
      title: "Instruções Geradas",
      description: "Instruções pós-consulta foram preparadas.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-2xl font-semibold text-foreground">Prescrição</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={handlePostConsultationInstructions}
          >
            <FileText className="h-4 w-4" />
            Instruções pós-consulta
          </Button>
        </div>
      </div>

      {/* Medications */}
      <div className="space-y-4">
        {medications.map((medication, index) => (
          <Card key={medication.id} className="border shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium">
                  Medicamento {index + 1}
                </CardTitle>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeMedication(medication.id)}
                >
                  Remover
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* First Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`name-${medication.id}`}>Nome do medicamento</Label>
                  <Input
                    id={`name-${medication.id}`}
                    value={medication.name}
                    onChange={(e) =>
                      updateMedication(medication.id, "name", e.target.value)
                    }
                    placeholder="Ex: Paracetamol"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`dosage-${medication.id}`}>Dosagem</Label>
                  <Input
                    id={`dosage-${medication.id}`}
                    value={medication.dosage}
                    onChange={(e) =>
                      updateMedication(medication.id, "dosage", e.target.value)
                    }
                    placeholder="Ex: 500mg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`frequency-${medication.id}`}>Frequência</Label>
                  <Input
                    id={`frequency-${medication.id}`}
                    value={medication.frequency}
                    onChange={(e) =>
                      updateMedication(medication.id, "frequency", e.target.value)
                    }
                    placeholder="Ex: 8/8h"
                  />
                </div>
              </div>

              {/* Second Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`route-${medication.id}`}>Via</Label>
                  <Select
                    value={medication.route}
                    onValueChange={(value) =>
                      updateMedication(medication.id, "route", value)
                    }
                  >
                    <SelectTrigger id={`route-${medication.id}`}>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="oral">Oral</SelectItem>
                      <SelectItem value="intravenosa">Intravenosa</SelectItem>
                      <SelectItem value="intramuscular">Intramuscular</SelectItem>
                      <SelectItem value="subcutanea">Subcutânea</SelectItem>
                      <SelectItem value="topica">Tópica</SelectItem>
                      <SelectItem value="inalatoria">Inalatória</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`duration-${medication.id}`}>Duração (dias)</Label>
                  <Input
                    id={`duration-${medication.id}`}
                    value={medication.duration}
                    onChange={(e) =>
                      updateMedication(medication.id, "duration", e.target.value)
                    }
                    placeholder="Ex: 7"
                    type="number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`totalQuantity-${medication.id}`}>Quantidade total</Label>
                  <Input
                    id={`totalQuantity-${medication.id}`}
                    value={medication.totalQuantity}
                    onChange={(e) =>
                      updateMedication(medication.id, "totalQuantity", e.target.value)
                    }
                    placeholder="Ex: 21 comprimidos"
                  />
                </div>
              </div>

              {/* Observations */}
              <div className="space-y-2">
                <Label htmlFor={`observations-${medication.id}`}>Observações</Label>
                <Textarea
                  id={`observations-${medication.id}`}
                  value={medication.observations}
                  onChange={(e) =>
                    updateMedication(medication.id, "observations", e.target.value)
                  }
                  placeholder="Instruções adicionais sobre o medicamento..."
                  className="min-h-[80px] resize-none"
                />
              </div>

              {/* Continuous Use Switch */}
              <div className="flex items-center space-x-2">
                <Switch
                  id={`continuous-${medication.id}`}
                  checked={medication.continuousUse}
                  onCheckedChange={(checked) =>
                    updateMedication(medication.id, "continuousUse", checked)
                  }
                />
                <Label htmlFor={`continuous-${medication.id}`} className="cursor-pointer">
                  Uso contínuo
                </Label>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Add Medication Button */}
        <Button variant="outline" onClick={addMedication} className="w-full gap-2">
          <Plus className="h-4 w-4" />
          Adicionar medicamento
        </Button>
      </div>

      {/* Diagnosis and Patient Instructions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="diagnosis">Diagnóstico</Label>
          <Textarea
            id="diagnosis"
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            placeholder="CID-10 e descrição do diagnóstico..."
            className="min-h-[120px] resize-none"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="patient-instructions">Instruções ao paciente</Label>
          <Textarea
            id="patient-instructions"
            value={patientInstructions}
            onChange={(e) => setPatientInstructions(e.target.value)}
            placeholder="Orientações gerais, cuidados, retorno..."
            className="min-h-[120px] resize-none"
          />
        </div>
      </div>

      {/* Prescription Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="prescription-type">Tipo de prescrição</Label>
          <Select value={prescriptionType} onValueChange={setPrescriptionType}>
            <SelectTrigger id="prescription-type">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="comum">Comum</SelectItem>
              <SelectItem value="controlada">Controlada</SelectItem>
              <SelectItem value="especial">Especial</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="allowed-refills">Repetições permitidas</Label>
          <Input
            id="allowed-refills"
            value={allowedRefills}
            onChange={(e) => setAllowedRefills(e.target.value)}
            placeholder="Número de repetições"
            type="number"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="validity">Validade</Label>
          <Input
            id="validity"
            value={validity}
            onChange={(e) => setValidity(e.target.value)}
            type="date"
          />
        </div>
      </div>

      {/* Signature Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Assinatura do Profissional</CardTitle>
        </CardHeader>
        <CardContent>
          <SignaturePad />
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSavePrescription} size="lg" className="gap-2">
          <FileText className="h-4 w-4" />
          Salvar prescrição
        </Button>
      </div>
    </div>
  );
};
