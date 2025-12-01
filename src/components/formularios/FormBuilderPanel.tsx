import { useState } from "react";
import {
  Plus,
  GripVertical,
  Trash2,
  ChevronDown,
  ChevronUp,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FormSection, FormField } from "./FormEditorModal";

interface FormBuilderPanelProps {
  formName: string;
  setFormName: (name: string) => void;
  specialty: string;
  setSpecialty: (specialty: string) => void;
  noteType: string;
  setNoteType: (type: string) => void;
  sections: FormSection[];
  setSections: (sections: FormSection[]) => void;
}

const fieldTypes = [
  { value: "texto-curto", label: "Texto Curto" },
  { value: "texto-longo", label: "Texto Longo" },
  { value: "numero", label: "Número" },
  { value: "selecao-unica", label: "Seleção Única" },
  { value: "selecao-multipla", label: "Seleção Múltipla" },
  { value: "data", label: "Data" },
  { value: "arquivo", label: "Upload de Arquivo" },
  { value: "escala", label: "Escala (0-10)" },
  { value: "calculo", label: "Cálculo Automático" },
];

export function FormBuilderPanel({
  formName,
  setFormName,
  specialty,
  setSpecialty,
  noteType,
  setNoteType,
  sections,
  setSections,
}: FormBuilderPanelProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(
    sections.map((s) => s.id)
  );

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const addSection = () => {
    const newSection: FormSection = {
      id: Date.now().toString(),
      title: `Seção ${sections.length + 1}`,
      order: sections.length + 1,
      fields: [],
    };
    setSections([...sections, newSection]);
    setExpandedSections([...expandedSections, newSection.id]);
  };

  const removeSection = (sectionId: string) => {
    setSections(sections.filter((s) => s.id !== sectionId));
    setExpandedSections(expandedSections.filter((id) => id !== sectionId));
  };

  const updateSection = (sectionId: string, updates: Partial<FormSection>) => {
    setSections(
      sections.map((s) => (s.id === sectionId ? { ...s, ...updates } : s))
    );
  };

  const addField = (sectionId: string) => {
    const newField: FormField = {
      id: Date.now().toString(),
      label: "Novo campo",
      type: "texto-curto",
      required: false,
      order: 0,
    };

    setSections(
      sections.map((s) => {
        if (s.id === sectionId) {
          return {
            ...s,
            fields: [...s.fields, { ...newField, order: s.fields.length + 1 }],
          };
        }
        return s;
      })
    );
  };

  const removeField = (sectionId: string, fieldId: string) => {
    setSections(
      sections.map((s) => {
        if (s.id === sectionId) {
          return {
            ...s,
            fields: s.fields.filter((f) => f.id !== fieldId),
          };
        }
        return s;
      })
    );
  };

  const updateField = (
    sectionId: string,
    fieldId: string,
    updates: Partial<FormField>
  ) => {
    setSections(
      sections.map((s) => {
        if (s.id === sectionId) {
          return {
            ...s,
            fields: s.fields.map((f) => (f.id === fieldId ? { ...f, ...updates } : f)),
          };
        }
        return s;
      })
    );
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-6 space-y-6">
        {/* Form Header */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Nome do modelo *</Label>
            <Input
              placeholder="Ex: Avaliação fisioterapêutica"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Especialidade *</Label>
              <Select value={specialty} onValueChange={setSpecialty}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Fisioterapia">Fisioterapia</SelectItem>
                  <SelectItem value="Odontologia">Odontologia</SelectItem>
                  <SelectItem value="Cardiologia">Cardiologia</SelectItem>
                  <SelectItem value="Dermatologia">Dermatologia</SelectItem>
                  <SelectItem value="Ginecologia">Ginecologia</SelectItem>
                  <SelectItem value="Pediatria">Pediatria</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Tipo de nota *</Label>
              <Select value={noteType} onValueChange={setNoteType}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SOAP">SOAP</SelectItem>
                  <SelectItem value="Anamnese">Anamnese</SelectItem>
                  <SelectItem value="Consulta de Retorno">
                    Consulta de Retorno
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Estrutura do formulário</h3>
            <Button size="sm" variant="outline" onClick={addSection}>
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Seção
            </Button>
          </div>

          {sections.map((section, sectionIdx) => (
            <Card key={section.id} className="p-4">
              <div className="space-y-4">
                {/* Section Header */}
                <div className="flex items-start gap-3">
                  <GripVertical className="h-5 w-5 text-muted-foreground mt-2 cursor-move" />
                  
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2">
                      <Input
                        value={section.title}
                        onChange={(e) =>
                          updateSection(section.id, { title: e.target.value })
                        }
                        className="font-semibold"
                      />
                      <span className="text-sm text-muted-foreground whitespace-nowrap">
                        {section.fields.length} campos
                      </span>
                    </div>

                    <Textarea
                      placeholder="Descrição da seção (opcional)"
                      value={section.description || ""}
                      onChange={(e) =>
                        updateSection(section.id, { description: e.target.value })
                      }
                      rows={2}
                    />
                  </div>

                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleSection(section.id)}
                    >
                      {expandedSections.includes(section.id) ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeSection(section.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>

                {/* Fields */}
                {expandedSections.includes(section.id) && (
                  <div className="space-y-3 pl-8 border-l-2 border-primary/20">
                    {section.fields.map((field) => (
                      <Card key={field.id} className="p-3 bg-muted/30">
                        <div className="flex items-start gap-3">
                          <GripVertical className="h-4 w-4 text-muted-foreground mt-2 cursor-move" />
                          
                          <div className="flex-1 grid grid-cols-2 gap-3">
                            <Input
                              placeholder="Label do campo"
                              value={field.label}
                              onChange={(e) =>
                                updateField(section.id, field.id, {
                                  label: e.target.value,
                                })
                              }
                            />

                            <Select
                              value={field.type}
                              onValueChange={(value: any) =>
                                updateField(section.id, field.id, { type: value })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {fieldTypes.map((type) => (
                                  <SelectItem key={type.value} value={type.value}>
                                    {type.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>

                            <div className="col-span-2 flex items-center gap-4">
                              <div className="flex items-center gap-2">
                                <Switch
                                  checked={field.required}
                                  onCheckedChange={(checked) =>
                                    updateField(section.id, field.id, {
                                      required: checked,
                                    })
                                  }
                                />
                                <Label className="text-xs">Obrigatório</Label>
                              </div>

                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <Settings className="h-3 w-3 mr-1" />
                                    Opções avançadas
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                  <div className="space-y-3">
                                    <div className="space-y-2">
                                      <Label className="text-xs">Chave especial</Label>
                                      <Input
                                        placeholder="Ex: peso, altura"
                                        value={field.specialKey || ""}
                                        onChange={(e) =>
                                          updateField(section.id, field.id, {
                                            specialKey: e.target.value,
                                          })
                                        }
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label className="text-xs">Texto de ajuda</Label>
                                      <Textarea
                                        placeholder="Dica para preenchimento"
                                        value={field.helpText || ""}
                                        onChange={(e) =>
                                          updateField(section.id, field.id, {
                                            helpText: e.target.value,
                                          })
                                        }
                                        rows={2}
                                      />
                                    </div>
                                  </div>
                                </PopoverContent>
                              </Popover>
                            </div>
                          </div>

                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeField(section.id, field.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </Card>
                    ))}

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addField(section.id)}
                      className="w-full"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Adicionar Campo
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}
