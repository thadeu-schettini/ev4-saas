import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Upload, Monitor, Tablet, Smartphone } from "lucide-react";
import { FormSection } from "./FormEditorModal";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface FormPreviewPanelProps {
  formName: string;
  specialty: string;
  noteType: string;
  sections: FormSection[];
}

type DeviceType = "desktop" | "tablet" | "mobile";

export function FormPreviewPanel({
  formName,
  specialty,
  noteType,
  sections,
}: FormPreviewPanelProps) {
  const [device, setDevice] = useState<DeviceType>("desktop");

  const deviceSizes = {
    desktop: "max-w-full",
    tablet: "max-w-[768px]",
    mobile: "max-w-[375px]",
  };

  const renderField = (field: any) => {
    switch (field.type) {
      case "texto-curto":
        return (
          <Input
            placeholder="Digite aqui..."
            disabled
            className="bg-background"
          />
        );

      case "texto-longo":
        return (
          <Textarea
            placeholder="Digite aqui..."
            disabled
            className="bg-background"
            rows={4}
          />
        );

      case "numero":
        return (
          <Input
            type="number"
            placeholder="0"
            disabled
            className="bg-background"
          />
        );

      case "selecao-unica":
        return (
          <RadioGroup disabled>
            {field.options && field.options.length > 0 ? (
              field.options.map((option: string, index: number) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`${field.id}-${index}`} />
                  <Label htmlFor={`${field.id}-${index}`}>{option}</Label>
                </div>
              ))
            ) : (
              <div className="text-sm text-muted-foreground">
                Nenhuma opção configurada
              </div>
            )}
          </RadioGroup>
        );

      case "selecao-multipla":
        return (
          <div className="space-y-2">
            {field.options && field.options.length > 0 ? (
              field.options.map((option: string, index: number) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox id={`${field.id}-${index}`} disabled />
                  <Label htmlFor={`${field.id}-${index}`}>{option}</Label>
                </div>
              ))
            ) : (
              <div className="text-sm text-muted-foreground">
                Nenhuma opção configurada
              </div>
            )}
          </div>
        );

      case "data":
        return (
          <div className="border rounded-md p-3 bg-background">
            <div className="text-sm text-muted-foreground">Seletor de data</div>
          </div>
        );

      case "arquivo":
        return (
          <div className="border-2 border-dashed rounded-md p-6 text-center bg-background">
            <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Clique ou arraste arquivos
            </p>
          </div>
        );

      case "escala":
        return (
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0 (mínimo)</span>
              <span>10 (máximo)</span>
            </div>
            <Input
              type="range"
              min="0"
              max="10"
              disabled
              className="w-full"
            />
          </div>
        );

      case "calculo":
        return (
          <div className="p-3 bg-primary/5 border border-primary/20 rounded-md">
            <p className="text-sm font-medium mb-1">Cálculo automático</p>
            {field.calculation ? (
              <p className="text-xs text-muted-foreground font-mono">
                {field.calculation}
              </p>
            ) : (
              <p className="text-xs text-muted-foreground">
                Nenhuma fórmula configurada
              </p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Preview Header */}
      <div className="p-4 sm:p-6 border-b bg-background">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-lg font-bold">Pré-visualização</h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Visualização em tempo real
            </p>
          </div>
          <Badge variant="secondary">Ao vivo</Badge>
        </div>
        
        {/* Device Selector */}
        <div className="flex items-center gap-2 mt-4">
          <span className="text-xs text-muted-foreground mr-2">Dispositivo:</span>
          <Button
            variant={device === "desktop" ? "default" : "outline"}
            size="sm"
            onClick={() => setDevice("desktop")}
            className="h-8 px-3"
          >
            <Monitor className="h-4 w-4" />
          </Button>
          <Button
            variant={device === "tablet" ? "default" : "outline"}
            size="sm"
            onClick={() => setDevice("tablet")}
            className="h-8 px-3"
          >
            <Tablet className="h-4 w-4" />
          </Button>
          <Button
            variant={device === "mobile" ? "default" : "outline"}
            size="sm"
            onClick={() => setDevice("mobile")}
            className="h-8 px-3"
          >
            <Smartphone className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Preview Content */}
      <ScrollArea className="flex-1">
        <div className="flex justify-center p-4 sm:p-6 bg-muted/20">
          <div className={cn("w-full space-y-4 sm:space-y-6 transition-all duration-300", deviceSizes[device])}>
            {/* Form Header Preview */}
            {formName && (
              <Card className="p-4 sm:p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">{formName}</h2>
                <div className="flex flex-wrap gap-2">
                  {specialty && <Badge variant="outline" className="text-xs">{specialty}</Badge>}
                  {noteType && <Badge variant="outline" className="text-xs">{noteType}</Badge>}
                </div>
              </Card>
            )}

            {/* Sections Preview */}
            {sections.length === 0 ? (
              <Card className="p-8 sm:p-12 text-center">
                <p className="text-sm sm:text-base text-muted-foreground">
                  Adicione seções e campos para visualizar o formulário
                </p>
              </Card>
            ) : (
              sections.map((section) => (
                <Card key={section.id} className="p-4 sm:p-6">
                  <div className="mb-4">
                    <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1">
                      {section.title}
                    </h3>
                    {section.description && (
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {section.description}
                      </p>
                    )}
                  </div>

                  {section.fields.length === 0 ? (
                    <p className="text-xs sm:text-sm text-muted-foreground italic">
                      Nenhum campo nesta seção
                    </p>
                  ) : (
                    <div className="space-y-3 sm:space-y-4">
                      {section.fields.map((field) => (
                        <div key={field.id} className="space-y-2">
                          <Label className="flex items-center gap-2 text-sm">
                            {field.label}
                            {field.required && (
                              <span className="text-destructive">*</span>
                            )}
                          </Label>
                          {field.helpText && (
                            <p className="text-xs text-muted-foreground">
                              {field.helpText}
                            </p>
                          )}
                          {renderField(field)}
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              ))
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
