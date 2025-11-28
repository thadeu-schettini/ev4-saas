import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Printer, FileText, Pill, Download } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";
import { getStoredSignature } from "@/components/SignaturePad";

type PrintSection = {
  id: string;
  label: string;
  defaultChecked: boolean;
};

const prescriptionSections: PrintSection[] = [
  { id: "header", label: "Cabeçalho do Médico", defaultChecked: true },
  { id: "patient", label: "Dados do Paciente", defaultChecked: true },
  { id: "diagnosis", label: "Diagnóstico", defaultChecked: true },
  { id: "medications", label: "Medicações Prescritas", defaultChecked: true },
  { id: "instructions", label: "Instruções ao Paciente", defaultChecked: true },
  { id: "signature", label: "Assinatura e CRM", defaultChecked: true },
];

const medicalRecordSections: PrintSection[] = [
  { id: "header", label: "Cabeçalho", defaultChecked: true },
  { id: "patient", label: "Dados do Paciente", defaultChecked: true },
  { id: "vitals", label: "Sinais Vitais", defaultChecked: true },
  { id: "consultation", label: "Dados da Consulta", defaultChecked: true },
  { id: "diagnosis", label: "Diagnóstico", defaultChecked: true },
  { id: "plan", label: "Plano Terapêutico", defaultChecked: false },
];

type PrintPreviewProps = {
  type: "prescription" | "medical-record";
  triggerLabel?: string;
};

export const PrintPreview = ({ type, triggerLabel }: PrintPreviewProps) => {
  const { toast } = useToast();
  const sections = type === "prescription" ? prescriptionSections : medicalRecordSections;
  const [selectedSections, setSelectedSections] = useState<string[]>(
    sections.filter(s => s.defaultChecked).map(s => s.id)
  );
  const [template, setTemplate] = useState<"complete" | "simple">("complete");
  const savedSignature = getStoredSignature();

  const toggleSection = (sectionId: string) => {
    setSelectedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handlePrint = () => {
    window.print();
    toast({
      title: "Documento Enviado",
      description: "O documento foi enviado para impressão.",
    });
  };

  const handleDownloadPDF = () => {
    toast({
      title: "Gerando PDF",
      description: "O PDF está sendo gerado. Aguarde o download...",
    });
    // Implement PDF generation logic
  };

  const renderPrescriptionPreview = () => {
    return (
      <div className="bg-white text-black p-8 space-y-6 min-h-[800px]">
        {/* Header */}
        {selectedSections.includes("header") && (
          <div className="border-b-2 border-primary pb-4">
            <h1 className="text-2xl font-bold text-primary">Dr. João da Silva</h1>
            <p className="text-sm">Cardiologista - CRM/SP 123456</p>
            <p className="text-sm">Rua das Clínicas, 123 - São Paulo/SP</p>
            <p className="text-sm">Tel: (11) 1234-5678 | Email: dr.joao@clinica.com.br</p>
          </div>
        )}

        {/* Patient Info */}
        {selectedSections.includes("patient") && (
          <div className="space-y-1">
            <h2 className="text-lg font-bold mb-2">Dados do Paciente</h2>
            <p><span className="font-semibold">Nome:</span> Paciente 13 Ebert-Lynch</p>
            <p><span className="font-semibold">Data de Nascimento:</span> 15/03/1996</p>
            <p><span className="font-semibold">Data da Consulta:</span> {format(new Date(), "dd/MM/yyyy", { locale: ptBR })}</p>
          </div>
        )}

        {/* Diagnosis */}
        {selectedSections.includes("diagnosis") && (
          <div className="space-y-1">
            <h2 className="text-lg font-bold mb-2">Diagnóstico</h2>
            <p>CID-10: I10 - Hipertensão Arterial Sistêmica</p>
            <p className="text-sm text-gray-600">Hipertensão Arterial em melhor controle após ajuste medicamentoso.</p>
          </div>
        )}

        {/* Medications */}
        {selectedSections.includes("medications") && (
          <div className="space-y-2">
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
              <Pill className="h-5 w-5" />
              Prescrição Médica
            </h2>
            
            <div className="space-y-4 border-l-4 border-primary pl-4">
              <div className="space-y-1">
                <p className="font-semibold">1. Losartana Potássica 50mg</p>
                <p className="text-sm"><span className="font-medium">Posologia:</span> Tomar 1 comprimido pela manhã</p>
                <p className="text-sm"><span className="font-medium">Duração:</span> Uso contínuo</p>
                <p className="text-sm"><span className="font-medium">Quantidade:</span> 30 comprimidos</p>
              </div>

              <div className="space-y-1">
                <p className="font-semibold">2. Hidroclorotiazida 25mg</p>
                <p className="text-sm"><span className="font-medium">Posologia:</span> Tomar 1 comprimido pela manhã</p>
                <p className="text-sm"><span className="font-medium">Duração:</span> Uso contínuo</p>
                <p className="text-sm"><span className="font-medium">Quantidade:</span> 30 comprimidos</p>
              </div>

              <div className="space-y-1">
                <p className="font-semibold">3. Atenolol 25mg</p>
                <p className="text-sm"><span className="font-medium">Posologia:</span> Tomar 1 comprimido à noite</p>
                <p className="text-sm"><span className="font-medium">Duração:</span> Uso contínuo</p>
                <p className="text-sm"><span className="font-medium">Quantidade:</span> 30 comprimidos</p>
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        {selectedSections.includes("instructions") && (
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <h2 className="text-lg font-bold mb-2">Instruções ao Paciente</h2>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Tomar as medicações nos horários indicados</li>
              <li>Manter dieta com restrição de sal</li>
              <li>Praticar atividade física regular (caminhada 30min/dia)</li>
              <li>Monitorar a pressão arterial em casa 2x/semana</li>
              <li>Retornar em 30 dias para reavaliação</li>
            </ul>
          </div>
        )}

        {/* Signature */}
        {selectedSections.includes("signature") && (
          <div className="pt-12 mt-8 border-t">
            <div className="text-center space-y-4">
              {savedSignature && (
                <div className="flex justify-center mb-2">
                  <img 
                    src={savedSignature} 
                    alt="Assinatura do médico" 
                    className="h-16 object-contain"
                  />
                </div>
              )}
              <div className="w-64 mx-auto border-t-2 border-gray-800 pt-2">
                <p className="font-bold">Dr. João da Silva</p>
                <p className="text-sm">CRM/SP 123456</p>
                <p className="text-xs text-gray-600">Cardiologista</p>
              </div>
              <p className="text-xs text-gray-500 mt-4">
                {format(new Date(), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
              </p>
            </div>
          </div>
        )}

        {/* Footer with prescription info */}
        {template === "complete" && (
          <div className="text-xs text-gray-500 mt-8 pt-4 border-t">
            <p><span className="font-semibold">Tipo:</span> Prescrição Comum</p>
            <p><span className="font-semibold">Validade:</span> 30 dias a partir da data de emissão</p>
            <p><span className="font-semibold">Repetições:</span> Não permitido</p>
          </div>
        )}
      </div>
    );
  };

  const renderMedicalRecordPreview = () => {
    return (
      <div className="bg-white text-black p-8 space-y-6 min-h-[800px]">
        {/* Header */}
        {selectedSections.includes("header") && (
          <div className="text-center border-b-2 border-primary pb-4">
            <h1 className="text-2xl font-bold text-primary">Prontuário Médico</h1>
            <p className="text-sm">Clínica Médica São Paulo</p>
          </div>
        )}

        {/* Patient Info */}
        {selectedSections.includes("patient") && (
          <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
            <div>
              <p className="text-sm font-semibold text-gray-600">Paciente</p>
              <p className="font-bold">Paciente 13 Ebert-Lynch</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-600">Data de Nascimento</p>
              <p>15/03/1996 (28 anos)</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-600">Médico</p>
              <p>Dr. João da Silva (CRM/SP 123456)</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-600">Data da Consulta</p>
              <p>{format(new Date(), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}</p>
            </div>
          </div>
        )}

        {/* Vital Signs */}
        {selectedSections.includes("vitals") && (
          <div>
            <h2 className="text-lg font-bold mb-3">Sinais Vitais</h2>
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                <p className="text-sm text-red-600 font-semibold">PA</p>
                <p className="text-xl font-bold">130/85</p>
                <p className="text-xs text-gray-600">mmHg</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-600 font-semibold">FC</p>
                <p className="text-xl font-bold">72</p>
                <p className="text-xs text-gray-600">bpm</p>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                <p className="text-sm text-orange-600 font-semibold">Temp</p>
                <p className="text-xl font-bold">36.7</p>
                <p className="text-xs text-gray-600">°C</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                <p className="text-sm text-green-600 font-semibold">SpO₂</p>
                <p className="text-xl font-bold">99</p>
                <p className="text-xs text-gray-600">%</p>
              </div>
            </div>
          </div>
        )}

        {/* SOAP */}
        {selectedSections.includes("consultation") && (
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-bold text-primary mb-2">Subjetivo</h3>
              <p className="text-sm">Paciente refere melhora dos sintomas. Sem queixas de cefaleia ou tonturas.</p>
            </div>
            <div>
              <h3 className="text-base font-bold text-primary mb-2">Objetivo</h3>
              <p className="text-sm">Exame físico sem alterações significativas. Ausculta cardíaca normal. Ausculta pulmonar sem ruídos adventícios.</p>
            </div>
          </div>
        )}

        {/* Diagnosis */}
        {selectedSections.includes("diagnosis") && (
          <div>
            <h3 className="text-base font-bold text-primary mb-2">Avaliação</h3>
            <p className="text-sm font-semibold">CID-10: I10 - Hipertensão Arterial Sistêmica</p>
            <p className="text-sm mt-1">Hipertensão Arterial em melhor controle após ajuste medicamentoso. Paciente apresenta boa adesão ao tratamento.</p>
          </div>
        )}

        {/* Plan */}
        {selectedSections.includes("plan") && (
          <div>
            <h3 className="text-base font-bold text-primary mb-2">Plano</h3>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Manter medicação atual</li>
              <li>Orientado sobre dieta hipossódica</li>
              <li>Incentivar atividade física regular</li>
              <li>Solicitado: Hemograma, Glicemia, Colesterol Total e Frações</li>
              <li>Retorno em 30 dias com resultados</li>
            </ul>
          </div>
        )}
      </div>
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Printer className="h-4 w-4" />
          {triggerLabel || (type === "prescription" ? "Imprimir Prescrição" : "Imprimir Prontuário")}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-7xl max-h-[95vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {type === "prescription" ? (
              <>
                <Pill className="h-5 w-5 text-primary" />
                Preview de Impressão - Prescrição Médica
              </>
            ) : (
              <>
                <FileText className="h-5 w-5 text-primary" />
                Preview de Impressão - Prontuário
              </>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-4 h-[80vh]">
          {/* Left Panel - Options */}
          <div className="space-y-4">
            {/* Template Selection */}
            <Card>
              <CardContent className="pt-6">
                <Label className="text-sm font-semibold mb-3 block">Formato</Label>
                <Tabs value={template} onValueChange={(v) => setTemplate(v as any)}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="complete">Completo</TabsTrigger>
                    <TabsTrigger value="simple">Simples</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardContent>
            </Card>

            {/* Section Selection */}
            <Card>
              <CardContent className="pt-6">
                <Label className="text-sm font-semibold mb-3 block">Seções para Incluir</Label>
                <ScrollArea className="h-[300px] pr-3">
                  <div className="space-y-3">
                    {sections.map((section) => (
                      <div key={section.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={section.id}
                          checked={selectedSections.includes(section.id)}
                          onCheckedChange={() => toggleSection(section.id)}
                        />
                        <Label
                          htmlFor={section.id}
                          className="text-sm cursor-pointer flex-1"
                        >
                          {section.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-2">
              <Button onClick={handlePrint} className="w-full gap-2">
                <Printer className="h-4 w-4" />
                Imprimir
              </Button>
              <Button onClick={handleDownloadPDF} variant="outline" className="w-full gap-2">
                <Download className="h-4 w-4" />
                Baixar PDF
              </Button>
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="col-span-2 border-2 rounded-lg overflow-hidden">
            <ScrollArea className="h-full">
              <div className="bg-gray-100 p-4">
                <div className="bg-white shadow-lg mx-auto" style={{ width: "210mm", minHeight: "297mm" }}>
                  {type === "prescription" ? renderPrescriptionPreview() : renderMedicalRecordPreview()}
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
