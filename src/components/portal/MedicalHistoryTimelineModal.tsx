import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Stethoscope,
  FileText,
  Pill,
  FlaskConical,
  Download,
  Eye,
  ChevronDown,
  ChevronUp,
  User,
  Clock,
  MapPin,
  Activity,
  Heart,
  Thermometer,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MedicalHistoryTimelineModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type EventType = "consultation" | "exam" | "prescription";

interface TimelineEvent {
  id: string;
  type: EventType;
  date: string;
  time: string;
  title: string;
  description: string;
  professional?: string;
  specialty?: string;
  location?: string;
  status: "completed" | "pending" | "cancelled";
  details?: {
    diagnosis?: string;
    notes?: string;
    medications?: string[];
    vitalSigns?: {
      pressure?: string;
      heartRate?: string;
      temperature?: string;
      oxygen?: string;
    };
    examType?: string;
    results?: string;
  };
}

const mockEvents: TimelineEvent[] = [
  {
    id: "1",
    type: "consultation",
    date: "2024-01-15",
    time: "09:30",
    title: "Consulta de Rotina",
    description: "Avaliação geral de saúde",
    professional: "Dr. Carlos Silva",
    specialty: "Clínico Geral",
    location: "Sala 3",
    status: "completed",
    details: {
      diagnosis: "Paciente saudável, sem alterações significativas",
      notes: "Manter acompanhamento semestral. Recomendado exercícios físicos regulares.",
      vitalSigns: {
        pressure: "120/80 mmHg",
        heartRate: "72 bpm",
        temperature: "36.5°C",
        oxygen: "98%",
      },
    },
  },
  {
    id: "2",
    type: "exam",
    date: "2024-01-15",
    time: "10:00",
    title: "Hemograma Completo",
    description: "Exame de sangue para avaliação geral",
    professional: "Lab. Central",
    status: "completed",
    details: {
      examType: "Laboratorial",
      results: "Todos os valores dentro da normalidade",
    },
  },
  {
    id: "3",
    type: "prescription",
    date: "2024-01-15",
    time: "09:45",
    title: "Receita Médica",
    description: "Prescrição de medicamentos",
    professional: "Dr. Carlos Silva",
    status: "completed",
    details: {
      medications: ["Vitamina D 2000UI - 1x ao dia", "Ômega 3 1000mg - 1x ao dia"],
    },
  },
  {
    id: "4",
    type: "consultation",
    date: "2023-12-10",
    time: "14:00",
    title: "Consulta Cardiológica",
    description: "Avaliação cardiovascular de rotina",
    professional: "Dra. Ana Beatriz",
    specialty: "Cardiologia",
    location: "Sala 5",
    status: "completed",
    details: {
      diagnosis: "Coração saudável, sem alterações no ECG",
      notes: "Continuar com atividades físicas moderadas. Retorno em 1 ano.",
      vitalSigns: {
        pressure: "118/75 mmHg",
        heartRate: "68 bpm",
        temperature: "36.4°C",
        oxygen: "99%",
      },
    },
  },
  {
    id: "5",
    type: "exam",
    date: "2023-12-10",
    time: "13:30",
    title: "Eletrocardiograma",
    description: "ECG de repouso",
    professional: "Dra. Ana Beatriz",
    status: "completed",
    details: {
      examType: "Cardiológico",
      results: "Ritmo sinusal normal, sem alterações isquêmicas",
    },
  },
  {
    id: "6",
    type: "consultation",
    date: "2023-11-05",
    time: "11:00",
    title: "Consulta Dermatológica",
    description: "Avaliação de manchas na pele",
    professional: "Dr. Roberto Mendes",
    specialty: "Dermatologia",
    location: "Sala 2",
    status: "completed",
    details: {
      diagnosis: "Melasma leve",
      notes: "Uso de protetor solar FPS 50+. Retorno em 3 meses para reavaliação.",
    },
  },
  {
    id: "7",
    type: "prescription",
    date: "2023-11-05",
    time: "11:15",
    title: "Receita Dermatológica",
    description: "Tratamento para melasma",
    professional: "Dr. Roberto Mendes",
    status: "completed",
    details: {
      medications: [
        "Ácido Azelaico 20% - aplicar à noite",
        "Protetor Solar FPS 50+ - reaplicar a cada 3h",
      ],
    },
  },
  {
    id: "8",
    type: "exam",
    date: "2023-10-20",
    time: "08:00",
    title: "Ultrassonografia Abdominal",
    description: "Avaliação de órgãos abdominais",
    professional: "Dr. Paulo Henrique",
    status: "completed",
    details: {
      examType: "Imagem",
      results: "Fígado, vesícula, pâncreas e rins sem alterações",
    },
  },
];

const typeConfig: Record<EventType, { icon: typeof Stethoscope; color: string; label: string }> = {
  consultation: {
    icon: Stethoscope,
    color: "from-primary/20 to-primary/5 border-primary/30",
    label: "Consulta",
  },
  exam: {
    icon: FlaskConical,
    color: "from-info/20 to-info/5 border-info/30",
    label: "Exame",
  },
  prescription: {
    icon: Pill,
    color: "from-success/20 to-success/5 border-success/30",
    label: "Receita",
  },
};

export function MedicalHistoryTimelineModal({
  open,
  onOpenChange,
}: MedicalHistoryTimelineModalProps) {
  const [activeTab, setActiveTab] = useState<"all" | EventType>("all");
  const [expandedEvents, setExpandedEvents] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>("all");

  const filteredEvents = mockEvents.filter((event) => {
    const typeMatch = activeTab === "all" || event.type === activeTab;
    const yearMatch = selectedYear === "all" || event.date.startsWith(selectedYear);
    return typeMatch && yearMatch;
  });

  const groupedEvents = filteredEvents.reduce((acc, event) => {
    const month = new Date(event.date).toLocaleDateString("pt-BR", {
      month: "long",
      year: "numeric",
    });
    if (!acc[month]) acc[month] = [];
    acc[month].push(event);
    return acc;
  }, {} as Record<string, TimelineEvent[]>);

  const toggleExpand = (id: string) => {
    setExpandedEvents((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  const years = [...new Set(mockEvents.map((e) => e.date.split("-")[0]))];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 gap-0 overflow-hidden">
        <DialogHeader className="p-6 pb-4 border-b border-border/50 bg-gradient-to-r from-primary/5 via-transparent to-info/5">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-xl">Histórico Médico</DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Timeline completa de consultas, exames e prescrições
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="p-4 border-b border-border/50 bg-muted/30">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
              <TabsList className="grid grid-cols-4 w-full sm:w-auto">
                <TabsTrigger value="all" className="text-xs sm:text-sm">
                  Todos
                </TabsTrigger>
                <TabsTrigger value="consultation" className="text-xs sm:text-sm">
                  <Stethoscope className="h-3.5 w-3.5 mr-1.5 hidden sm:inline" />
                  Consultas
                </TabsTrigger>
                <TabsTrigger value="exam" className="text-xs sm:text-sm">
                  <FlaskConical className="h-3.5 w-3.5 mr-1.5 hidden sm:inline" />
                  Exames
                </TabsTrigger>
                <TabsTrigger value="prescription" className="text-xs sm:text-sm">
                  <Pill className="h-3.5 w-3.5 mr-1.5 hidden sm:inline" />
                  Receitas
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="text-sm bg-background border border-border rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="all">Todos os anos</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-4 mt-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-3 h-3 rounded-full bg-primary/50" />
              <span>{mockEvents.filter((e) => e.type === "consultation").length} Consultas</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-3 h-3 rounded-full bg-info/50" />
              <span>{mockEvents.filter((e) => e.type === "exam").length} Exames</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-3 h-3 rounded-full bg-success/50" />
              <span>{mockEvents.filter((e) => e.type === "prescription").length} Receitas</span>
            </div>
          </div>
        </div>

        <ScrollArea className="flex-1 max-h-[calc(90vh-280px)]">
          <div className="p-6">
            {Object.entries(groupedEvents).map(([month, events], groupIndex) => (
              <div key={month} className="mb-8 last:mb-0">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                  <Badge variant="outline" className="text-xs font-medium capitalize">
                    {month}
                  </Badge>
                  <div className="h-px flex-1 bg-gradient-to-l from-border to-transparent" />
                </div>

                <div className="relative">
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/30 via-info/30 to-success/30" />

                  <div className="space-y-4">
                    {events.map((event, index) => {
                      const config = typeConfig[event.type];
                      const Icon = config.icon;
                      const isExpanded = expandedEvents.includes(event.id);

                      return (
                        <div
                          key={event.id}
                          className={cn(
                            "relative pl-14 animate-fade-in",
                            "transition-all duration-300"
                          )}
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <div
                            className={cn(
                              "absolute left-4 top-4 w-4 h-4 rounded-full border-2 bg-background z-10",
                              event.type === "consultation" && "border-primary",
                              event.type === "exam" && "border-info",
                              event.type === "prescription" && "border-success"
                            )}
                          />

                          <div
                            className={cn(
                              "rounded-xl border-2 overflow-hidden transition-all duration-300",
                              "bg-gradient-to-br",
                              config.color,
                              isExpanded && "shadow-lg"
                            )}
                          >
                            <button
                              onClick={() => toggleExpand(event.id)}
                              className="w-full text-left p-4 hover:bg-background/50 transition-colors"
                            >
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex items-start gap-3">
                                  <div
                                    className={cn(
                                      "p-2 rounded-lg",
                                      event.type === "consultation" && "bg-primary/10",
                                      event.type === "exam" && "bg-info/10",
                                      event.type === "prescription" && "bg-success/10"
                                    )}
                                  >
                                    <Icon
                                      className={cn(
                                        "h-5 w-5",
                                        event.type === "consultation" && "text-primary",
                                        event.type === "exam" && "text-info",
                                        event.type === "prescription" && "text-success"
                                      )}
                                    />
                                  </div>
                                  <div>
                                    <h4 className="font-semibold text-foreground">{event.title}</h4>
                                    <p className="text-sm text-muted-foreground mt-0.5">
                                      {event.description}
                                    </p>
                                    <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-muted-foreground">
                                      <span className="flex items-center gap-1">
                                        <Clock className="h-3.5 w-3.5" />
                                        {new Date(event.date).toLocaleDateString("pt-BR")} às{" "}
                                        {event.time}
                                      </span>
                                      {event.professional && (
                                        <span className="flex items-center gap-1">
                                          <User className="h-3.5 w-3.5" />
                                          {event.professional}
                                        </span>
                                      )}
                                      {event.location && (
                                        <span className="flex items-center gap-1">
                                          <MapPin className="h-3.5 w-3.5" />
                                          {event.location}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge
                                    variant="outline"
                                    className={cn(
                                      "text-xs",
                                      event.type === "consultation" &&
                                        "border-primary/30 text-primary",
                                      event.type === "exam" && "border-info/30 text-info",
                                      event.type === "prescription" &&
                                        "border-success/30 text-success"
                                    )}
                                  >
                                    {config.label}
                                  </Badge>
                                  {isExpanded ? (
                                    <ChevronUp className="h-5 w-5 text-muted-foreground" />
                                  ) : (
                                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                                  )}
                                </div>
                              </div>
                            </button>

                            {isExpanded && event.details && (
                              <div className="px-4 pb-4 border-t border-border/50 bg-background/50 animate-fade-in">
                                <div className="pt-4 space-y-4">
                                  {event.details.vitalSigns && (
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                      <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                                          <Activity className="h-3.5 w-3.5" />
                                          Pressão
                                        </div>
                                        <p className="font-semibold text-sm">
                                          {event.details.vitalSigns.pressure}
                                        </p>
                                      </div>
                                      <div className="p-3 rounded-lg bg-destructive/5 border border-destructive/10">
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                                          <Heart className="h-3.5 w-3.5" />
                                          Freq. Cardíaca
                                        </div>
                                        <p className="font-semibold text-sm">
                                          {event.details.vitalSigns.heartRate}
                                        </p>
                                      </div>
                                      <div className="p-3 rounded-lg bg-warning/5 border border-warning/10">
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                                          <Thermometer className="h-3.5 w-3.5" />
                                          Temperatura
                                        </div>
                                        <p className="font-semibold text-sm">
                                          {event.details.vitalSigns.temperature}
                                        </p>
                                      </div>
                                      <div className="p-3 rounded-lg bg-info/5 border border-info/10">
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                                          <Activity className="h-3.5 w-3.5" />
                                          Saturação
                                        </div>
                                        <p className="font-semibold text-sm">
                                          {event.details.vitalSigns.oxygen}
                                        </p>
                                      </div>
                                    </div>
                                  )}

                                  {event.details.diagnosis && (
                                    <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
                                      <h5 className="text-xs font-medium text-muted-foreground mb-1">
                                        Diagnóstico
                                      </h5>
                                      <p className="text-sm">{event.details.diagnosis}</p>
                                    </div>
                                  )}

                                  {event.details.notes && (
                                    <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
                                      <h5 className="text-xs font-medium text-muted-foreground mb-1">
                                        Observações
                                      </h5>
                                      <p className="text-sm">{event.details.notes}</p>
                                    </div>
                                  )}

                                  {event.details.medications && (
                                    <div className="p-3 rounded-lg bg-success/5 border border-success/10">
                                      <h5 className="text-xs font-medium text-muted-foreground mb-2">
                                        Medicamentos Prescritos
                                      </h5>
                                      <ul className="space-y-1.5">
                                        {event.details.medications.map((med, i) => (
                                          <li key={i} className="flex items-center gap-2 text-sm">
                                            <Pill className="h-3.5 w-3.5 text-success" />
                                            {med}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}

                                  {event.details.results && (
                                    <div className="p-3 rounded-lg bg-info/5 border border-info/10">
                                      <h5 className="text-xs font-medium text-muted-foreground mb-1">
                                        Resultado
                                      </h5>
                                      <p className="text-sm">{event.details.results}</p>
                                    </div>
                                  )}

                                  <div className="flex gap-2 pt-2">
                                    <Button variant="outline" size="sm" className="flex-1">
                                      <Eye className="h-4 w-4 mr-2" />
                                      Ver Documento
                                    </Button>
                                    <Button variant="outline" size="sm" className="flex-1">
                                      <Download className="h-4 w-4 mr-2" />
                                      Baixar PDF
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}

            {filteredEvents.length === 0 && (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="font-medium text-muted-foreground">Nenhum registro encontrado</h3>
                <p className="text-sm text-muted-foreground/70 mt-1">
                  Não há registros para os filtros selecionados
                </p>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
