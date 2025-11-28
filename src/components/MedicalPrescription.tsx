import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Trash2, Plus, FileText, ChevronDown, ChevronUp, Pill } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SignaturePad } from "@/components/SignaturePad";
import { StampUpload } from "@/components/StampUpload";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

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
  const [activeMedicationId, setActiveMedicationId] = useState<string>("1");
  const [diagnosis, setDiagnosis] = useState("");
  const [patientInstructions, setPatientInstructions] = useState("");
  const [postConsultationInstructions, setPostConsultationInstructions] = useState("");
  const [isGeneratingInstructions, setIsGeneratingInstructions] = useState(false);
  const [instructionsGeneratedByAI, setInstructionsGeneratedByAI] = useState(false);
  const [instructionsValidatedByDoctor, setInstructionsValidatedByDoctor] = useState(false);
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
    setActiveMedicationId(newMedication.id);
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

    // Validate AI-generated content has been validated by doctor
    if (instructionsGeneratedByAI && !instructionsValidatedByDoctor) {
      toast({
        title: "Validação Necessária",
        description: "Você deve validar as instruções geradas por IA antes de salvar.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Prescrição Salva",
      description: "A prescrição foi salva com sucesso.",
    });
  };

  const handleGenerateInstructions = async () => {
    setIsGeneratingInstructions(true);
    
    try {
      // Simula chamada de IA (substituir por chamada real)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const generatedText = `INSTRUÇÕES PÓS-CONSULTA:

1. REPOUSO E ATIVIDADES:
   - Repouso relativo nas primeiras 48 horas
   - Evitar atividades físicas intensas por 7 dias
   - Retomar atividades gradualmente

2. MEDICAÇÃO:
   - Seguir rigorosamente os horários prescritos
   - Não interromper o tratamento sem orientação médica
   - Tomar os medicamentos com água, preferencialmente após refeições

3. SINAIS DE ALERTA - RETORNAR IMEDIATAMENTE SE:
   - Febre persistente acima de 38°C
   - Dor intensa não controlada com medicação
   - Sangramento ou secreções anormais
   - Dificuldade para respirar
   - Reações alérgicas (coceira, inchaço, falta de ar)

4. CUIDADOS GERAIS:
   - Manter boa hidratação (mínimo 2 litros de água/dia)
   - Alimentação leve e balanceada
   - Higiene adequada das mãos

5. RETORNO:
   - Agendar consulta de retorno em 7-10 dias
   - Trazer todos os exames realizados
   - Anotar dúvidas para discutir na próxima consulta

Em caso de dúvidas ou emergências, entre em contato com a clínica.`;

      setPostConsultationInstructions(generatedText);
      setInstructionsGeneratedByAI(true);
      setInstructionsValidatedByDoctor(false);
      
      toast({
        title: "Instruções Geradas com IA",
        description: "Revise e valide o conteúdo antes de salvar.",
      });
    } catch (error) {
      toast({
        title: "Erro ao gerar instruções",
        description: "Tente novamente ou escreva manualmente.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingInstructions(false);
    }
  };

  const handleInstructionsChange = (value: string) => {
    setPostConsultationInstructions(value);
    // Se o médico editar o texto gerado por IA, considerar que está validando
    if (instructionsGeneratedByAI && value !== postConsultationInstructions) {
      setInstructionsValidatedByDoctor(true);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-2xl font-semibold text-foreground">Prescrição</h2>
      </div>

      {/* Medications */}
      <div className="space-y-4">
        {medications.map((medication, index) => {
          const isExpanded = activeMedicationId === medication.id;
          const hasContent = medication.name || medication.dosage || medication.frequency;
          
          return (
            <Collapsible
              key={medication.id}
              open={isExpanded}
              onOpenChange={(open) => {
                if (open) {
                  setActiveMedicationId(medication.id);
                }
              }}
            >
              <Card className="border shadow-sm">
                <CollapsibleTrigger asChild>
                  <CardHeader className="pb-3 cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <Pill className="h-5 w-5 text-primary flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          {isExpanded ? (
                            <CardTitle className="text-lg font-medium">
                              Medicamento {index + 1}
                            </CardTitle>
                          ) : (
                            <div className="space-y-1">
                              <CardTitle className="text-base font-medium truncate">
                                {medication.name || `Medicamento ${index + 1}`}
                              </CardTitle>
                              {hasContent && (
                                <div className="space-y-0.5">
                                  {[
                                    medication.dosage,
                                    medication.frequency,
                                    medication.route,
                                    medication.duration && `${medication.duration} dias`,
                                  ]
                                    .filter(Boolean)
                                    .join(" • ") && (
                                    <p className="text-sm text-muted-foreground">
                                      {[
                                        medication.dosage,
                                        medication.frequency,
                                        medication.route,
                                        medication.duration && `${medication.duration} dias`,
                                      ]
                                        .filter(Boolean)
                                        .join(" • ")}
                                    </p>
                                  )}
                                  {medication.totalQuantity && (
                                    <p className="text-xs text-muted-foreground">
                                      Quantidade: {medication.totalQuantity}
                                    </p>
                                  )}
                                  {medication.observations && (
                                    <p className="text-xs text-muted-foreground truncate">
                                      Obs: {medication.observations}
                                    </p>
                                  )}
                                  {medication.continuousUse && (
                                    <p className="text-xs text-primary font-medium">
                                      Uso contínuo
                                    </p>
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {isExpanded && (
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeMedication(medication.id);
                            }}
                          >
                            Remover
                          </Button>
                        )}
                        {isExpanded ? (
                          <ChevronUp className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                
                <CollapsibleContent>
                  <CardContent className="space-y-4 pt-0">
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
                </CollapsibleContent>
              </Card>
            </Collapsible>
          );
        })}

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

      {/* Post-Consultation Instructions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Instruções Pós-Consulta</CardTitle>
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={handleGenerateInstructions}
              disabled={isGeneratingInstructions}
            >
              {isGeneratingInstructions ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  Gerando...
                </>
              ) : (
                <>
                  <FileText className="h-4 w-4" />
                  Gerar com IA
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            id="post-consultation-instructions"
            value={postConsultationInstructions}
            onChange={(e) => handleInstructionsChange(e.target.value)}
            placeholder="Escreva as instruções pós-consulta ou gere com IA..."
            className="min-h-[200px] resize-none"
          />
          
          {instructionsGeneratedByAI && (
            <div className="space-y-3 p-4 rounded-lg border border-amber-500/50 bg-amber-50 dark:bg-amber-950/20">
              <div className="flex items-start gap-2">
                <div className="h-5 w-5 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">!</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-amber-900 dark:text-amber-100">
                    Conteúdo gerado por Inteligência Artificial
                  </p>
                  <p className="text-xs text-amber-700 dark:text-amber-200 mt-1">
                    Este conteúdo foi gerado automaticamente por IA e requer validação médica obrigatória antes de ser usado.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 pt-2 border-t border-amber-500/30">
                <Switch
                  id="instructions-validated"
                  checked={instructionsValidatedByDoctor}
                  onCheckedChange={setInstructionsValidatedByDoctor}
                />
                <Label 
                  htmlFor="instructions-validated" 
                  className="cursor-pointer text-sm text-amber-900 dark:text-amber-100 leading-tight"
                >
                  Confirmo que revisei, validei e assumo total responsabilidade pelo conteúdo gerado pela IA
                </Label>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

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

      {/* Professional Credentials Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Credenciais do Profissional</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <SignaturePad />
          <div className="border-t pt-6">
            <StampUpload />
          </div>
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
