import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Upload, FileText, Image as ImageIcon, X, Eye, Sparkles, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export type FieldType = 
  | "texto-curto" 
  | "texto-longo" 
  | "numero" 
  | "sim-nao" 
  | "data" 
  | "lista-unica" 
  | "lista-multipla" 
  | "imagens-anexos" 
  | "escala" 
  | "calculo-automatico";

export type FormField = {
  id: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: string[];
  scaleMin?: number;
  scaleMax?: number;
  calculation?: string; // Formula for automatic calculation
  placeholder?: string;
};

export type FormSection = {
  id: string;
  title: string;
  fields: FormField[];
};

type UploadedFile = {
  id: string;
  name: string;
  type: string;
  url: string;
  preview?: string;
};

type FormData = Record<string, any>;

type DynamicFormBuilderProps = {
  sections: FormSection[];
  onSubmit?: (data: FormData) => void;
  initialData?: FormData;
};

export const DynamicFormBuilder = ({ sections, onSubmit, initialData = {} }: DynamicFormBuilderProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>(initialData);
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, UploadedFile[]>>({});
  const [previewFile, setPreviewFile] = useState<UploadedFile | null>(null);
  const [aiLoadingFields, setAiLoadingFields] = useState<Record<string, boolean>>({});

  const updateFieldValue = (fieldId: string, value: any) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
  };

  const handleFileUpload = async (fieldId: string, files: FileList | null) => {
    if (!files || files.length === 0) return;

    const newFiles: UploadedFile[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileUrl = URL.createObjectURL(file);
      
      const uploadedFile: UploadedFile = {
        id: `${fieldId}-${Date.now()}-${i}`,
        name: file.name,
        type: file.type,
        url: fileUrl,
      };

      // Generate preview for images
      if (file.type.startsWith('image/')) {
        uploadedFile.preview = fileUrl;
      }

      newFiles.push(uploadedFile);
    }

    setUploadedFiles(prev => ({
      ...prev,
      [fieldId]: [...(prev[fieldId] || []), ...newFiles]
    }));

    updateFieldValue(fieldId, [...(formData[fieldId] || []), ...newFiles.map(f => f.url)]);

    toast({
      title: "Arquivos Carregados",
      description: `${newFiles.length} arquivo(s) adicionado(s) com sucesso.`,
    });
  };

  const removeFile = (fieldId: string, fileId: string) => {
    setUploadedFiles(prev => ({
      ...prev,
      [fieldId]: prev[fieldId]?.filter(f => f.id !== fileId) || []
    }));

    const remainingUrls = uploadedFiles[fieldId]
      ?.filter(f => f.id !== fileId)
      .map(f => f.url) || [];
    
    updateFieldValue(fieldId, remainingUrls);
  };

  const handleAITextAdjustment = async (fieldId: string, fieldLabel: string) => {
    const currentText = formData[fieldId] || "";
    
    if (!currentText.trim()) {
      toast({
        title: "Campo vazio",
        description: "Digite algum texto antes de usar a IA para ajustar.",
        variant: "destructive",
      });
      return;
    }

    setAiLoadingFields(prev => ({ ...prev, [fieldId]: true }));

    try {
      // Simulação de chamada à IA (em produção, chamar edge function com Lovable AI)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const improvedText = `${currentText}\n\n[Texto ajustado pela IA - melhorias na clareza e estrutura]`;
      
      updateFieldValue(fieldId, improvedText);
      
      toast({
        title: "Texto ajustado",
        description: "O texto foi melhorado pela IA.",
      });
    } catch (error) {
      toast({
        title: "Erro ao ajustar texto",
        description: "Não foi possível processar com a IA.",
        variant: "destructive",
      });
    } finally {
      setAiLoadingFields(prev => ({ ...prev, [fieldId]: false }));
    }
  };

  const renderField = (field: FormField) => {
    const value = formData[field.id];

    switch (field.type) {
      case "texto-curto":
        return (
          <div className="relative">
            <Input
              value={value || ""}
              onChange={(e) => updateFieldValue(field.id, e.target.value)}
              placeholder={field.placeholder || "Digite aqui..."}
              className="w-full pr-12"
            />
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
              onClick={() => handleAITextAdjustment(field.id, field.label)}
              disabled={aiLoadingFields[field.id]}
              title="Ajustar texto com IA"
            >
              {aiLoadingFields[field.id] ? (
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
              ) : (
                <Sparkles className="h-4 w-4 text-primary" />
              )}
            </Button>
          </div>
        );

      case "texto-longo":
        return (
          <div className="relative">
            <Textarea
              value={value || ""}
              onChange={(e) => updateFieldValue(field.id, e.target.value)}
              placeholder={field.placeholder || "Digite aqui..."}
              className="min-h-[120px] resize-none pr-12"
            />
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="absolute right-2 top-2 h-8 w-8 p-0"
              onClick={() => handleAITextAdjustment(field.id, field.label)}
              disabled={aiLoadingFields[field.id]}
              title="Ajustar texto com IA"
            >
              {aiLoadingFields[field.id] ? (
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
              ) : (
                <Sparkles className="h-4 w-4 text-primary" />
              )}
            </Button>
          </div>
        );

      case "numero":
        return (
          <Input
            type="number"
            value={value || ""}
            onChange={(e) => updateFieldValue(field.id, parseFloat(e.target.value) || "")}
            placeholder={field.placeholder || "0"}
            className="w-full"
          />
        );

      case "sim-nao":
        return (
          <RadioGroup
            value={value || ""}
            onValueChange={(val) => updateFieldValue(field.id, val)}
          >
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sim" id={`${field.id}-sim`} />
                <Label htmlFor={`${field.id}-sim`} className="cursor-pointer">Sim</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="nao" id={`${field.id}-nao`} />
                <Label htmlFor={`${field.id}-nao`} className="cursor-pointer">Não</Label>
              </div>
            </div>
          </RadioGroup>
        );

      case "data":
        return (
          <Input
            type="date"
            value={value || ""}
            onChange={(e) => updateFieldValue(field.id, e.target.value)}
            className="w-full"
          />
        );

      case "lista-unica":
        return (
          <Select value={value || ""} onValueChange={(val) => updateFieldValue(field.id, val)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma opção" />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option, idx) => (
                <SelectItem key={idx} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "lista-multipla":
        const selectedOptions = value || [];
        return (
          <div className="space-y-2">
            {field.options?.map((option, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <Checkbox
                  id={`${field.id}-${idx}`}
                  checked={selectedOptions.includes(option)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      updateFieldValue(field.id, [...selectedOptions, option]);
                    } else {
                      updateFieldValue(field.id, selectedOptions.filter((o: string) => o !== option));
                    }
                  }}
                />
                <Label htmlFor={`${field.id}-${idx}`} className="cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </div>
        );

      case "imagens-anexos":
        const files = uploadedFiles[field.id] || [];
        return (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Input
                type="file"
                multiple
                accept="image/*,application/pdf,.doc,.docx"
                onChange={(e) => handleFileUpload(field.id, e.target.files)}
                className="hidden"
                id={`file-${field.id}`}
              />
              <Label
                htmlFor={`file-${field.id}`}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md cursor-pointer hover:bg-primary/90 transition-colors"
              >
                <Upload className="h-4 w-4" />
                Carregar arquivo(s)
              </Label>
            </div>

            {files.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {files.map((file) => (
                  <div
                    key={file.id}
                    className="relative border rounded-lg p-2 hover:border-primary transition-colors"
                  >
                    {file.type.startsWith('image/') && file.preview ? (
                      <div className="aspect-square bg-muted rounded overflow-hidden mb-2">
                        <img
                          src={file.preview}
                          alt={file.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="aspect-square bg-muted rounded flex items-center justify-center mb-2">
                        <FileText className="h-8 w-8 text-muted-foreground" />
                      </div>
                    )}
                    <p className="text-xs truncate mb-2">{file.name}</p>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 h-7 text-xs"
                        onClick={() => setPreviewFile(file)}
                      >
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="h-7 w-7 p-0"
                        onClick={() => removeFile(field.id, file.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case "escala":
        const scaleValue = value || field.scaleMin || 0;
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {field.scaleMin || 0}
              </span>
              <span className="font-semibold text-lg">{scaleValue}</span>
              <span className="text-muted-foreground">
                {field.scaleMax || 10}
              </span>
            </div>
            <Slider
              value={[scaleValue]}
              onValueChange={([val]) => updateFieldValue(field.id, val)}
              min={field.scaleMin || 0}
              max={field.scaleMax || 10}
              step={1}
              className="w-full"
            />
          </div>
        );

      case "calculo-automatico":
        // Calculate value based on formula (simplified example)
        const calculatedValue = field.calculation 
          ? eval(field.calculation.replace(/\{(\w+)\}/g, (_, key) => formData[key] || 0))
          : 0;
        return (
          <div className="bg-muted/50 rounded-lg p-4 border-2 border-dashed">
            <p className="text-sm text-muted-foreground mb-1">Valor calculado automaticamente:</p>
            <p className="text-2xl font-bold text-primary">{calculatedValue}</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <div className="space-y-6">
        {sections.map((section) => (
          <Card key={section.id} className="border shadow-sm">
            <CardHeader className="pb-3 bg-muted/30">
              <CardTitle className="text-lg">{section.title}</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              {section.fields.map((field) => (
                <div key={field.id} className="space-y-2">
                  <Label className="text-sm font-medium">
                    {field.label}
                    {field.required && <span className="text-destructive ml-1">*</span>}
                  </Label>
                  {renderField(field)}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* File Preview Dialog */}
      <Dialog open={!!previewFile} onOpenChange={() => setPreviewFile(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {previewFile?.type.startsWith('image/') ? (
                <ImageIcon className="h-5 w-5" />
              ) : (
                <FileText className="h-5 w-5" />
              )}
              {previewFile?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="overflow-auto max-h-[70vh]">
            {previewFile?.type.startsWith('image/') ? (
              <img
                src={previewFile.url}
                alt={previewFile.name}
                className="w-full h-auto"
              />
            ) : previewFile?.type === 'application/pdf' ? (
              <iframe
                src={previewFile.url}
                className="w-full h-[70vh]"
                title={previewFile.name}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                <FileText className="h-16 w-16 mb-4" />
                <p>Visualização não disponível para este tipo de arquivo</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => window.open(previewFile.url, '_blank')}
                >
                  Abrir em nova aba
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
