import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  FileText, 
  Search, 
  Upload,
  FileType,
  File,
  Image,
  FileSpreadsheet,
  Send,
  X,
  Plus
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface SendDocumentsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const availableDocuments = [
  { id: "1", name: "Termo de Consentimento.pdf", type: "pdf", size: "245 KB", category: "Consentimentos" },
  { id: "2", name: "Preparação para Exame.pdf", type: "pdf", size: "128 KB", category: "Orientações" },
  { id: "3", name: "Tabela de Preços 2024.xlsx", type: "excel", size: "89 KB", category: "Financeiro" },
  { id: "4", name: "Mapa de Localização.png", type: "image", size: "512 KB", category: "Geral" },
  { id: "5", name: "Formulário de Anamnese.pdf", type: "pdf", size: "156 KB", category: "Formulários" },
];

const getFileIcon = (type: string) => {
  switch (type) {
    case "pdf": return FileText;
    case "excel": return FileSpreadsheet;
    case "image": return Image;
    default: return File;
  }
};

const getFileColor = (type: string) => {
  switch (type) {
    case "pdf": return "text-red-500 bg-red-500/10";
    case "excel": return "text-emerald-500 bg-emerald-500/10";
    case "image": return "text-blue-500 bg-blue-500/10";
    default: return "text-muted-foreground bg-muted";
  }
};

export function SendDocumentsModal({ open, onOpenChange }: SendDocumentsModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const filteredDocs = availableDocuments.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleDocument = (docId: string) => {
    setSelectedDocs(prev =>
      prev.includes(docId)
        ? prev.filter(id => id !== docId)
        : [...prev, docId]
    );
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setUploadedFiles(prev => [...prev, ...Array.from(files)]);
    }
  };

  const removeUploadedFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSend = () => {
    if (selectedDocs.length === 0 && uploadedFiles.length === 0) {
      toast.error("Selecione pelo menos um documento");
      return;
    }
    toast.success(`${selectedDocs.length + uploadedFiles.length} documento(s) enviado(s)!`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader className="pb-4 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 shadow-lg">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <div>
              <DialogTitle>Enviar Documentos</DialogTitle>
              <p className="text-sm text-muted-foreground mt-0.5">
                Selecione ou envie arquivos
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="py-4 space-y-5">
          {/* Upload Area */}
          <div>
            <Label className="mb-2 block">Upload de Arquivo</Label>
            <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-xl cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-all">
              <Upload className="h-8 w-8 text-muted-foreground mb-2" />
              <span className="text-sm text-muted-foreground">
                Clique para selecionar ou arraste arquivos
              </span>
              <input
                type="file"
                multiple
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
          </div>

          {/* Uploaded Files */}
          {uploadedFiles.length > 0 && (
            <div className="space-y-2">
              <Label>Arquivos Selecionados</Label>
              <div className="space-y-2">
                {uploadedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <File className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium truncate max-w-[200px]">
                          {file.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {(file.size / 1024).toFixed(0)} KB
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => removeUploadedFile(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Library */}
          <div className="space-y-3">
            <Label>Biblioteca de Documentos</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar documentos..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <ScrollArea className="h-[200px]">
              <div className="space-y-2">
                {filteredDocs.map((doc) => {
                  const Icon = getFileIcon(doc.type);
                  const isSelected = selectedDocs.includes(doc.id);
                  
                  return (
                    <button
                      key={doc.id}
                      onClick={() => toggleDocument(doc.id)}
                      className={cn(
                        "w-full flex items-center justify-between p-3 rounded-xl border-2 transition-all text-left",
                        isSelected
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <Checkbox checked={isSelected} />
                        <div className={cn("p-2 rounded-lg", getFileColor(doc.type))}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{doc.name}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <Badge variant="outline" className="text-xs">
                              {doc.category}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{doc.size}</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </ScrollArea>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <span className="text-sm text-muted-foreground">
            {selectedDocs.length + uploadedFiles.length} arquivo(s) selecionado(s)
          </span>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSend} className="gap-2">
              <Send className="h-4 w-4" />
              Enviar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
