import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { History, Calendar, Stethoscope, Pill, FileText, AlertCircle, Filter, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useMemo } from "react";

type Medication = {
  name: string;
  dosage: string;
  duration: string;
};

type Consultation = {
  id: string;
  date: string;
  type: string;
  diagnosis: string[];
  medications: Medication[];
  notes: string;
  doctor: string;
};

const mockConsultations: Consultation[] = [
  {
    id: "1",
    date: "15/11/2025",
    type: "Consulta de Rotina",
    diagnosis: ["Hipertensão Arterial", "Diabetes Tipo 2"],
    medications: [
      { name: "Losartana", dosage: "50mg", duration: "1x ao dia - Contínuo" },
      { name: "Metformina", dosage: "850mg", duration: "2x ao dia - Contínuo" }
    ],
    notes: "Paciente apresentou melhora significativa nos níveis de glicemia. Manter tratamento atual.",
    doctor: "Dr. Carlos Silva"
  },
  {
    id: "2",
    date: "20/10/2025",
    type: "Retorno",
    diagnosis: ["Hipertensão Arterial", "Dislipidemia"],
    medications: [
      { name: "Losartana", dosage: "50mg", duration: "1x ao dia - Contínuo" },
      { name: "Sinvastatina", dosage: "20mg", duration: "1x ao dia à noite" }
    ],
    notes: "Ajuste de medicação para controle do colesterol. Solicitado exames de controle.",
    doctor: "Dr. Carlos Silva"
  },
  {
    id: "3",
    date: "05/09/2025",
    type: "Primeira Consulta",
    diagnosis: ["Hipertensão Arterial"],
    medications: [
      { name: "Losartana", dosage: "50mg", duration: "1x ao dia - Contínuo" }
    ],
    notes: "Diagnóstico inicial de hipertensão. Orientações sobre dieta e atividade física.",
    doctor: "Dr. Carlos Silva"
  }
];

export function ConsultationHistory() {
  const [searchDate, setSearchDate] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterDiagnosis, setFilterDiagnosis] = useState("");

  const filteredConsultations = useMemo(() => {
    return mockConsultations.filter(consultation => {
      const matchesDate = searchDate === "" || consultation.date.includes(searchDate);
      const matchesType = filterType === "all" || consultation.type === filterType;
      const matchesDiagnosis = filterDiagnosis === "" || 
        consultation.diagnosis.some(d => d.toLowerCase().includes(filterDiagnosis.toLowerCase()));
      
      return matchesDate && matchesType && matchesDiagnosis;
    });
  }, [searchDate, filterType, filterDiagnosis]);

  const clearFilters = () => {
    setSearchDate("");
    setFilterType("all");
    setFilterDiagnosis("");
  };

  const hasActiveFilters = searchDate !== "" || filterType !== "all" || filterDiagnosis !== "";

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2">
          <History className="h-4 w-4" />
          Histórico
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-[540px] p-0">
        <SheetHeader className="px-6 pt-6 pb-4 border-b space-y-4">
          <div>
            <SheetTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 rounded-lg bg-primary/10">
                <History className="h-5 w-5 text-primary" />
              </div>
              Histórico de Consultas
            </SheetTitle>
            <SheetDescription>
              Resumo das últimas consultas, diagnósticos e medicamentos prescritos
            </SheetDescription>
          </div>

          {/* Filters */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">Filtros</span>
              </div>
              {hasActiveFilters && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearFilters}
                  className="h-7 text-xs gap-1"
                >
                  <X className="h-3 w-3" />
                  Limpar
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 gap-2">
              <Input
                placeholder="Buscar por data..."
                value={searchDate}
                onChange={(e) => setSearchDate(e.target.value)}
                className="h-9 text-sm"
              />
              
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue placeholder="Tipo de consulta" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os tipos</SelectItem>
                  <SelectItem value="Consulta de Rotina">Consulta de Rotina</SelectItem>
                  <SelectItem value="Retorno">Retorno</SelectItem>
                  <SelectItem value="Primeira Consulta">Primeira Consulta</SelectItem>
                  <SelectItem value="Urgência">Urgência</SelectItem>
                </SelectContent>
              </Select>

              <Input
                placeholder="Filtrar por diagnóstico..."
                value={filterDiagnosis}
                onChange={(e) => setFilterDiagnosis(e.target.value)}
                className="h-9 text-sm"
              />
            </div>

            {hasActiveFilters && (
              <div className="text-xs text-muted-foreground">
                Exibindo {filteredConsultations.length} de {mockConsultations.length} consultas
              </div>
            )}
          </div>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-320px)]">
          <div className="px-6 py-4 space-y-4">
            {filteredConsultations.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="p-8 text-center">
                  <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm font-medium text-foreground mb-1">Nenhuma consulta encontrada</p>
                  <p className="text-xs text-muted-foreground">
                    Tente ajustar os filtros para ver mais resultados
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredConsultations.map((consultation, index) => (
              <Card key={consultation.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-5 space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span className="font-semibold text-foreground">{consultation.date}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {consultation.type}
                      </Badge>
                    </div>
                    {index === 0 && (
                      <Badge variant="default" className="bg-primary/20 text-primary hover:bg-primary/30">
                        Mais Recente
                      </Badge>
                    )}
                  </div>

                  <Separator className="my-3" />

                  {/* Diagnósticos */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <Stethoscope className="h-4 w-4 text-primary" />
                      Diagnósticos
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {consultation.diagnosis.map((diag, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs font-normal">
                          {diag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Medicamentos */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <Pill className="h-4 w-4 text-primary" />
                      Medicamentos Prescritos
                    </div>
                    <div className="space-y-2">
                      {consultation.medications.map((med, idx) => (
                        <div key={idx} className="p-3 rounded-lg bg-muted/30 border border-border/50">
                          <div className="font-medium text-sm text-foreground">{med.name}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            <span className="font-medium">{med.dosage}</span> • {med.duration}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Notas */}
                  {consultation.notes && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                        <FileText className="h-4 w-4 text-primary" />
                        Observações
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed bg-muted/20 p-3 rounded-lg border border-border/30">
                        {consultation.notes}
                      </p>
                    </div>
                  )}

                  {/* Médico */}
                  <div className="pt-2 border-t border-border/50">
                    <span className="text-xs text-muted-foreground">
                      Atendido por: <span className="font-medium text-foreground">{consultation.doctor}</span>
                    </span>
                  </div>
                </CardContent>
              </Card>
              ))
            )}

            {/* Footer info */}
            <Card className="border-dashed">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-foreground">Histórico Completo</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Exibindo as 3 últimas consultas. Para acessar o histórico completo, consulte o sistema de prontuários.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
