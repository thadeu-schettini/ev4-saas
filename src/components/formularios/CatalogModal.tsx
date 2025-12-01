import { useState } from "react";
import { X, Plus, Search } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface CatalogModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface SystemTemplate {
  id: string;
  name: string;
  specialty: string;
  type: string;
  version: string;
  sections: Array<{
    title: string;
    fields: Array<{
      label: string;
      type: string;
    }>;
  }>;
}

const systemTemplates: SystemTemplate[] = [
  {
    id: "1",
    name: "Exame odontológico inicial",
    specialty: "Odontologia",
    type: "Anamnese",
    version: "Versão 1",
    sections: [
      {
        title: "Queixa e histórico",
        fields: [
          { label: "Queixa principal", type: "Texto longo" },
          { label: "Histórico odontológico", type: "Texto longo" },
        ],
      },
      {
        title: "Exame clínico",
        fields: [
          { label: "Exame da cavidade oral", type: "Texto longo" },
          { label: "Condição periodontal", type: "Texto longo" },
        ],
      },
      {
        title: "Imagens e plano",
        fields: [
          { label: "Radiografias / imagens", type: "Upload de arquivo" },
          { label: "Fotos intraorais", type: "Upload de arquivo" },
          { label: "Plano de tratamento", type: "Texto longo" },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "Avaliação fisioterapêutica",
    specialty: "Fisioterapia",
    type: "Anamnese",
    version: "Versão 1",
    sections: [
      {
        title: "Queixa e dor",
        fields: [
          { label: "Queixa principal", type: "Texto longo" },
          { label: "Escala de dor (0-10)", type: "Escala" },
        ],
      },
      {
        title: "Exame funcional",
        fields: [
          { label: "Amplitude de movimentos", type: "Texto longo" },
          { label: "Força muscular", type: "Texto curto" },
          { label: "Limitações funcionais", type: "Texto longo" },
        ],
      },
      {
        title: "Objetivos e plano",
        fields: [
          { label: "Objetivos terapêuticos", type: "Texto longo" },
          { label: "Plano de tratamento", type: "Texto longo" },
        ],
      },
    ],
  },
  {
    id: "3",
    name: "Avaliação cardiológica inicial",
    specialty: "Cardiologia",
    type: "Anamnese",
    version: "Versão 1",
    sections: [
      {
        title: "História clínica",
        fields: [
          { label: "Queixa principal", type: "Texto longo" },
          { label: "História cardiovascular", type: "Texto longo" },
          { label: "Fatores de risco", type: "Seleção múltipla" },
        ],
      },
      {
        title: "Exame físico",
        fields: [
          { label: "Pressão arterial", type: "Texto curto" },
          { label: "Frequência cardíaca", type: "Texto curto" },
          { label: "Ausculta cardíaca", type: "Texto longo" },
        ],
      },
    ],
  },
  {
    id: "4",
    name: "Anamnese dermatológica",
    specialty: "Dermatologia",
    type: "Anamnese",
    version: "Versão 1",
    sections: [
      {
        title: "Queixa e histórico",
        fields: [
          { label: "Queixa principal", type: "Texto longo" },
          { label: "Tempo de evolução", type: "Texto curto" },
        ],
      },
      {
        title: "Exame dermatológico",
        fields: [
          { label: "Descrição das lesões", type: "Texto longo" },
          { label: "Fotos das lesões", type: "Upload de arquivo" },
        ],
      },
    ],
  },
  {
    id: "5",
    name: "Anamnese ginecológica",
    specialty: "Ginecologia",
    type: "Anamnese",
    version: "Versão 1",
    sections: [
      {
        title: "História ginecológica",
        fields: [
          { label: "Queixa principal", type: "Texto longo" },
          { label: "Ciclo menstrual", type: "Texto curto" },
          { label: "Métodos contraceptivos", type: "Seleção única" },
        ],
      },
      {
        title: "Exame ginecológico",
        fields: [
          { label: "Exame físico", type: "Texto longo" },
          { label: "Observações", type: "Texto longo" },
        ],
      },
    ],
  },
  {
    id: "6",
    name: "Anamnese pediátrica",
    specialty: "Pediatria",
    type: "Anamnese",
    version: "Versão 1",
    sections: [
      {
        title: "História da criança",
        fields: [
          { label: "Queixa principal", type: "Texto longo" },
          { label: "Histórico de nascimento", type: "Texto longo" },
          { label: "Vacinação", type: "Seleção múltipla" },
        ],
      },
      {
        title: "Exame físico",
        fields: [
          { label: "Peso e altura", type: "Texto curto" },
          { label: "Desenvolvimento", type: "Texto longo" },
        ],
      },
    ],
  },
];

export function CatalogModal({ open, onOpenChange }: CatalogModalProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<SystemTemplate | null>(
    systemTemplates[0]
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("todas");

  const filteredTemplates = systemTemplates.filter((template) => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty =
      specialtyFilter === "todas" || template.specialty === specialtyFilter;
    return matchesSearch && matchesSpecialty;
  });

  const handleAddToAccount = () => {
    toast.success("Modelo adicionado à sua conta com sucesso!");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl h-[90vh] p-0 gap-0">
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold">Catálogo de formulários clínicos do sistema</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Modelos disponíveis • {systemTemplates.length} modelos
              </p>
            </div>
            <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar template..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por especialidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas</SelectItem>
                <SelectItem value="Odontologia">Odontologia</SelectItem>
                <SelectItem value="Fisioterapia">Fisioterapia</SelectItem>
                <SelectItem value="Cardiologia">Cardiologia</SelectItem>
                <SelectItem value="Dermatologia">Dermatologia</SelectItem>
                <SelectItem value="Ginecologia">Ginecologia</SelectItem>
                <SelectItem value="Pediatria">Pediatria</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Split Screen Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left: Templates List */}
          <div className="w-full lg:w-2/5 border-r">
            <ScrollArea className="h-full">
              <div className="p-4 space-y-2">
                {filteredTemplates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template)}
                    className={`w-full text-left p-4 rounded-lg border transition-all ${
                      selectedTemplate?.id === template.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50 hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-sm">{template.name}</h3>
                      <Badge variant="secondary" className="text-xs">
                        Sistema
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">
                        {template.specialty} • {template.type}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Right: Preview */}
          <div className="hidden lg:flex flex-col flex-1">
            {selectedTemplate ? (
              <>
                <div className="p-6 border-b">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-1">{selectedTemplate.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{selectedTemplate.specialty}</span>
                        <span>•</span>
                        <span>{selectedTemplate.type}</span>
                        <span>•</span>
                        <span>{selectedTemplate.version}</span>
                      </div>
                    </div>
                    <Button onClick={handleAddToAccount}>
                      <Plus className="mr-2 h-4 w-4" />
                      Adicionar à conta
                    </Button>
                  </div>
                </div>

                <ScrollArea className="flex-1">
                  <div className="p-6 space-y-6">
                    {selectedTemplate.sections.map((section, idx) => (
                      <div key={idx} className="space-y-4">
                        <h4 className="font-semibold text-foreground">{section.title}</h4>
                        <div className="space-y-3 pl-4 border-l-2 border-primary/20">
                          {section.fields.map((field, fieldIdx) => (
                            <div key={fieldIdx} className="space-y-1">
                              <label className="text-sm font-medium text-foreground">
                                {field.label}
                              </label>
                              <div className="text-xs text-muted-foreground">{field.type}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                Selecione um template para visualizar
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
