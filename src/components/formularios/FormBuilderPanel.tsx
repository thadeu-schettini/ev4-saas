import { useState } from "react";
import {
  Plus,
  GripVertical,
  Trash2,
  ChevronDown,
  ChevronUp,
  Settings,
  AlertCircle,
  X,
} from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
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
  { value: "odontograma", label: "🦷 Odontograma" },
  { value: "mapa-corporal", label: "🏃 Mapa Corporal" },
];

// Sortable Section Component
function SortableSection({
  section,
  isExpanded,
  onToggle,
  onUpdate,
  onRemove,
  onAddField,
  onRemoveField,
  onUpdateField,
  validationErrors,
}: {
  section: FormSection;
  isExpanded: boolean;
  onToggle: () => void;
  onUpdate: (updates: Partial<FormSection>) => void;
  onRemove: () => void;
  onAddField: () => void;
  onRemoveField: (fieldId: string) => void;
  onUpdateField: (fieldId: string, updates: Partial<FormField>) => void;
  validationErrors: { [key: string]: string };
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Card ref={setNodeRef} style={style} className="p-4">
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing mt-2"
          >
            <GripVertical className="h-5 w-5 text-muted-foreground" />
          </div>

          <div className="flex-1 space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <Input
                value={section.title}
                onChange={(e) => onUpdate({ title: e.target.value })}
                className={`font-semibold ${
                  validationErrors[`section-${section.id}-title`]
                    ? "border-destructive"
                    : ""
                }`}
              />
              {validationErrors[`section-${section.id}-title`] && (
                <AlertCircle className="h-4 w-4 text-destructive shrink-0" />
              )}
              <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
                {section.fields.length} campos
              </span>
            </div>

            <Textarea
              placeholder="Descrição da seção (opcional)"
              value={section.description || ""}
              onChange={(e) => onUpdate({ description: e.target.value })}
              rows={2}
            />
          </div>

          <div className="flex gap-1">
            <Button variant="ghost" size="icon" onClick={onToggle}>
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
            <Button variant="ghost" size="icon" onClick={onRemove}>
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        </div>

        {isExpanded && (
          <SortableFieldList
            sectionId={section.id}
            fields={section.fields}
            onAddField={onAddField}
            onRemoveField={onRemoveField}
            onUpdateField={onUpdateField}
            validationErrors={validationErrors}
          />
        )}
      </div>
    </Card>
  );
}

// Sortable Field Component
function SortableField({
  sectionId,
  field,
  onUpdate,
  onRemove,
  validationErrors,
}: {
  sectionId: string;
  field: FormField;
  onUpdate: (updates: Partial<FormField>) => void;
  onRemove: () => void;
  validationErrors: { [key: string]: string };
}) {
  const [newOption, setNewOption] = useState("");
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const addOption = () => {
    if (newOption.trim()) {
      const options = field.options || [];
      onUpdate({ options: [...options, newOption.trim()] });
      setNewOption("");
    }
  };

  const removeOption = (index: number) => {
    const options = field.options || [];
    onUpdate({ options: options.filter((_, i) => i !== index) });
  };

  const needsOptions = field.type === "selecao-unica" || field.type === "selecao-multipla";
  const needsCalculation = field.type === "calculo";

  return (
    <Card ref={setNodeRef} style={style} className="p-3 bg-muted/30">
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing mt-2"
          >
            <GripVertical className="h-4 w-4 text-muted-foreground" />
          </div>

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="relative sm:col-span-1">
              <Input
                placeholder="Label do campo"
                value={field.label}
                onChange={(e) => onUpdate({ label: e.target.value })}
                className={
                  validationErrors[`field-${field.id}-label`]
                    ? "border-destructive"
                    : ""
                }
              />
              {validationErrors[`field-${field.id}-label`] && (
                <AlertCircle className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-destructive" />
              )}
            </div>

            <Select
              value={field.type}
              onValueChange={(value: any) => onUpdate({ type: value })}
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

            <div className="sm:col-span-2 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <div className="flex items-center gap-2">
                <Switch
                  checked={field.required}
                  onCheckedChange={(checked) => onUpdate({ required: checked })}
                />
                <Label className="text-xs">Obrigatório</Label>
              </div>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8">
                    <Settings className="h-3 w-3 mr-1" />
                    <span className="text-xs">Opções avançadas</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[calc(100vw-2rem)] sm:w-80">
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label className="text-xs">Chave especial</Label>
                      <Input
                        placeholder="Ex: peso, altura"
                        value={field.specialKey || ""}
                        onChange={(e) => onUpdate({ specialKey: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs">Texto de ajuda</Label>
                      <Textarea
                        placeholder="Dica para preenchimento"
                        value={field.helpText || ""}
                        onChange={(e) => onUpdate({ helpText: e.target.value })}
                        rows={2}
                      />
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <Button variant="ghost" size="icon" onClick={onRemove}>
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>

        {/* Options configuration for select fields */}
        {needsOptions && (
          <div className="pl-4 sm:pl-8 space-y-2">
            <Label className="text-xs font-medium">Opções de seleção</Label>
            <div className="space-y-2">
              {field.options?.map((option, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={option}
                    onChange={(e) => {
                      const options = [...(field.options || [])];
                      options[index] = e.target.value;
                      onUpdate({ options });
                    }}
                    className="flex-1 h-8 text-sm"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 shrink-0"
                    onClick={() => removeOption(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  placeholder="Nova opção"
                  value={newOption}
                  onChange={(e) => setNewOption(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addOption();
                    }
                  }}
                  className="flex-1 h-8 text-sm"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addOption}
                  className="h-8 w-full sm:w-auto"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Adicionar
                </Button>
              </div>
              {(!field.options || field.options.length === 0) && (
                <p className="text-xs text-muted-foreground">
                  Nenhuma opção adicionada ainda
                </p>
              )}
            </div>
          </div>
        )}

        {/* Calculation configuration */}
        {needsCalculation && (
          <div className="pl-4 sm:pl-8 space-y-2">
            <Label className="text-xs font-medium">Fórmula de cálculo</Label>
            <Textarea
              placeholder="Ex: [peso] / ([altura] * [altura])"
              value={field.calculation || ""}
              onChange={(e) => onUpdate({ calculation: e.target.value })}
              rows={3}
              className="text-xs font-mono"
            />
            <p className="text-xs text-muted-foreground">
              Use [chave] para referenciar outros campos. Ex: [peso], [altura]
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}

// Sortable Field List
function SortableFieldList({
  sectionId,
  fields,
  onAddField,
  onRemoveField,
  onUpdateField,
  validationErrors,
}: {
  sectionId: string;
  fields: FormField[];
  onAddField: () => void;
  onRemoveField: (fieldId: string) => void;
  onUpdateField: (fieldId: string, updates: Partial<FormField>) => void;
  validationErrors: { [key: string]: string };
}) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = fields.findIndex((f) => f.id === active.id);
      const newIndex = fields.findIndex((f) => f.id === over.id);
      // This would need to be handled by parent component
      console.log("Reorder fields:", { oldIndex, newIndex });
    }
  };

  return (
    <div className="space-y-3 pl-8 border-l-2 border-primary/20">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={fields} strategy={verticalListSortingStrategy}>
          {fields.map((field) => (
            <SortableField
              key={field.id}
              sectionId={sectionId}
              field={field}
              onUpdate={(updates) => onUpdateField(field.id, updates)}
              onRemove={() => onRemoveField(field.id)}
              validationErrors={validationErrors}
            />
          ))}
        </SortableContext>
      </DndContext>

      <Button
        variant="outline"
        size="sm"
        onClick={onAddField}
        className="w-full"
      >
        <Plus className="mr-2 h-4 w-4" />
        Adicionar Campo
      </Button>
    </div>
  );
}

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
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});

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

  const handleSectionDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = sections.findIndex((s) => s.id === active.id);
      const newIndex = sections.findIndex((s) => s.id === over.id);
      setSections(arrayMove(sections, oldIndex, newIndex));
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Validation
  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    sections.forEach((section) => {
      if (!section.title.trim()) {
        errors[`section-${section.id}-title`] = "Título da seção obrigatório";
      }

      section.fields.forEach((field) => {
        if (!field.label.trim()) {
          errors[`field-${field.id}-label`] = "Label do campo obrigatório";
        }
      });
    });

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-4 sm:p-6 space-y-6">
        {/* Instructions */}
        <div className="rounded-lg bg-muted/50 p-3 sm:p-4 border border-border/50">
          <p className="text-xs sm:text-sm text-muted-foreground">
            <strong className="text-foreground">Passo 1:</strong> Defina nome, especialidade e tipo de nota. 
            <strong className="text-foreground ml-2">Passo 2:</strong> Organize em seções e adicione campos.
          </p>
        </div>

        {/* Form Header */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Nome do formulário *</Label>
            <div className="relative">
              <Input
                placeholder="Ex: Avaliação fisioterapêutica"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                className={
                  validationErrors["formName"] ? "border-destructive" : ""
                }
              />
              {validationErrors["formName"] && (
                <div className="flex items-center gap-1 mt-1 text-xs text-destructive">
                  <AlertCircle className="h-3 w-3" />
                  <span>{validationErrors["formName"]}</span>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Especialidade *</Label>
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
              <Label className="text-sm font-semibold">Tipo de nota *</Label>
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
            <div>
              <h3 className="font-semibold text-sm sm:text-base">Seções e Campos</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Arraste para reordenar</p>
            </div>
            <Button size="sm" variant="outline" onClick={addSection}>
              <Plus className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Nova Seção</span>
              <span className="sm:hidden">Seção</span>
            </Button>
          </div>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleSectionDragEnd}
          >
            <SortableContext
              items={sections}
              strategy={verticalListSortingStrategy}
            >
              {sections.map((section) => (
                <SortableSection
                  key={section.id}
                  section={section}
                  isExpanded={expandedSections.includes(section.id)}
                  onToggle={() => toggleSection(section.id)}
                  onUpdate={(updates) => updateSection(section.id, updates)}
                  onRemove={() => removeSection(section.id)}
                  onAddField={() => addField(section.id)}
                  onRemoveField={(fieldId) => removeField(section.id, fieldId)}
                  onUpdateField={(fieldId, updates) =>
                    updateField(section.id, fieldId, updates)
                  }
                  validationErrors={validationErrors}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </div>
    </ScrollArea>
  );
}
