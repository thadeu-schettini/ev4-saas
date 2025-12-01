import { useState, useEffect } from "react";
import { Save, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FormBuilderPanel } from "./FormBuilderPanel";
import { FormPreviewPanel } from "./FormPreviewPanel";
import { toast } from "sonner";

interface FormEditorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formData: any;
}

export interface FormSection {
  id: string;
  title: string;
  description?: string;
  order: number;
  fields: FormField[];
}

export interface FormField {
  id: string;
  label: string;
  type:
    | "texto-curto"
    | "texto-longo"
    | "numero"
    | "selecao-unica"
    | "selecao-multipla"
    | "data"
    | "arquivo"
    | "escala"
    | "calculo";
  required: boolean;
  specialKey?: string;
  helpText?: string;
  options?: string[];
  min?: number;
  max?: number;
  calculation?: string;
  order: number;
}

export function FormEditorModal({ open, onOpenChange, formData }: FormEditorModalProps) {
  const [formName, setFormName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [noteType, setNoteType] = useState("");
  const [sections, setSections] = useState<FormSection[]>([]);

  useEffect(() => {
    if (formData) {
      setFormName(formData.name || "");
      setSpecialty(formData.specialty || "");
      setNoteType(formData.type || "");
      // Load existing sections/fields if editing
    } else {
      // Reset for new form
      setFormName("");
      setSpecialty("");
      setNoteType("");
      setSections([
        {
          id: "1",
          title: "Seção 1",
          order: 1,
          fields: [],
        },
      ]);
    }
  }, [formData, open]);

  const handleSave = (publish: boolean = false) => {
    if (!formName || !specialty || !noteType) {
      toast.error("Preencha nome, especialidade e tipo de nota");
      return;
    }

    // Validate sections and fields
    const errors: string[] = [];
    sections.forEach((section, idx) => {
      if (!section.title.trim()) {
        errors.push(`Seção ${idx + 1} precisa de um título`);
      }
      section.fields.forEach((field, fieldIdx) => {
        if (!field.label.trim()) {
          errors.push(
            `Campo ${fieldIdx + 1} da seção "${section.title}" precisa de um label`
          );
        }
      });
    });

    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error));
      return;
    }

    toast.success(
      publish ? "Formulário publicado com sucesso!" : "Rascunho salvo com sucesso!"
    );
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl w-[95vw] max-h-[95vh] h-[95vh] p-0 gap-0 overflow-hidden [&>button]:hidden">
        {/* Header */}
        <div className="border-b bg-muted/30">
          <div className="flex items-center justify-between p-3 sm:p-4 gap-2">
            <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
              <h2 className="text-base sm:text-lg font-bold truncate">
                {formData ? "Editar Formulário" : "Construtor de Formulários"}
              </h2>
            </div>

            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              <Button variant="outline" size="sm" onClick={() => handleSave(false)} className="text-xs sm:text-sm">
                <Save className="h-3 sm:h-4 w-3 sm:w-4 sm:mr-2" />
                <span className="hidden sm:inline">Rascunho</span>
                <span className="sm:hidden">Salvar</span>
              </Button>
              <Button size="sm" onClick={() => handleSave(true)} className="text-xs sm:text-sm">
                <span className="hidden sm:inline">Publicar</span>
                <span className="sm:hidden">OK</span>
              </Button>
              <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)} className="h-8 w-8 shrink-0">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Instructions */}
          <div className="px-3 sm:px-4 pb-3 text-xs sm:text-sm text-muted-foreground">
            <p className="hidden lg:block">
              Configure à esquerda e veja o resultado em tempo real à direita
            </p>
            <p className="lg:hidden">
              Configure seu formulário abaixo
            </p>
          </div>
        </div>

        {/* Split Screen Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left: Builder */}
          <div className="w-full lg:w-1/2 border-r">
            <FormBuilderPanel
              formName={formName}
              setFormName={setFormName}
              specialty={specialty}
              setSpecialty={setSpecialty}
              noteType={noteType}
              setNoteType={setNoteType}
              sections={sections}
              setSections={setSections}
            />
          </div>

          {/* Right: Preview */}
          <div className="hidden lg:block w-full lg:w-1/2 bg-muted/10">
            <FormPreviewPanel
              formName={formName}
              specialty={specialty}
              noteType={noteType}
              sections={sections}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
