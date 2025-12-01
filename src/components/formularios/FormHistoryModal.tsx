import { useState } from "react";
import { X, Clock, RotateCcw, GitCompare } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

interface FormHistoryModalProps {
  formId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FormVersion {
  id: string;
  version: number;
  timestamp: Date;
  author: string;
  changes: string;
  fieldsCount: number;
  sectionsCount: number;
}

const mockVersions: FormVersion[] = [
  {
    id: "v5",
    version: 5,
    timestamp: new Date(2025, 11, 1, 10, 30),
    author: "Dr. João Silva",
    changes: "Publicado formulário com alterações finais",
    fieldsCount: 15,
    sectionsCount: 3,
  },
  {
    id: "v4",
    version: 4,
    timestamp: new Date(2025, 11, 1, 9, 15),
    author: "Dr. João Silva",
    changes: "Adicionado campo de observações gerais",
    fieldsCount: 15,
    sectionsCount: 3,
  },
  {
    id: "v3",
    version: 3,
    timestamp: new Date(2025, 10, 30, 16, 45),
    author: "Maria Santos",
    changes: "Reorganizado seções e removido campos duplicados",
    fieldsCount: 14,
    sectionsCount: 3,
  },
  {
    id: "v2",
    version: 2,
    timestamp: new Date(2025, 10, 30, 14, 20),
    author: "Dr. João Silva",
    changes: "Adicionada seção de sinais vitais",
    fieldsCount: 17,
    sectionsCount: 4,
  },
  {
    id: "v1",
    version: 1,
    timestamp: new Date(2025, 10, 30, 10, 0),
    author: "Maria Santos",
    changes: "Versão inicial criada a partir do catálogo",
    fieldsCount: 12,
    sectionsCount: 2,
  },
];

export function FormHistoryModal({
  formId,
  open,
  onOpenChange,
}: FormHistoryModalProps) {
  const [selectedVersions, setSelectedVersions] = useState<string[]>([]);
  const [compareMode, setCompareMode] = useState(false);

  const handleVersionSelect = (versionId: string) => {
    if (compareMode) {
      setSelectedVersions((prev) => {
        if (prev.includes(versionId)) {
          return prev.filter((id) => id !== versionId);
        }
        if (prev.length >= 2) {
          return [prev[1], versionId];
        }
        return [...prev, versionId];
      });
    }
  };

  const handleRestore = (version: FormVersion) => {
    toast.success(`Versão ${version.version} restaurada com sucesso!`);
    onOpenChange(false);
  };

  const handleCompare = () => {
    if (selectedVersions.length !== 2) {
      toast.error("Selecione exatamente 2 versões para comparar");
      return;
    }
    toast.info("Abrindo comparação de versões...");
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl h-[80vh] p-0 gap-0">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b bg-muted/30">
          <div>
            <h2 className="text-lg font-bold">Histórico de Versões</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Visualize, compare e restaure versões anteriores
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={compareMode ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setCompareMode(!compareMode);
                setSelectedVersions([]);
              }}
            >
              <GitCompare className="mr-2 h-4 w-4" />
              {compareMode ? "Cancelar" : "Comparar"}
            </Button>
            {compareMode && selectedVersions.length === 2 && (
              <Button size="sm" onClick={handleCompare}>
                Visualizar Comparação
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Versions List */}
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-3">
            {mockVersions.map((version, idx) => (
              <Card
                key={version.id}
                className={`p-4 transition-all cursor-pointer ${
                  compareMode
                    ? selectedVersions.includes(version.id)
                      ? "border-primary bg-primary/5"
                      : "hover:border-primary/50"
                    : "hover:shadow-md"
                }`}
                onClick={() => handleVersionSelect(version.id)}
              >
                <div className="flex items-start gap-4">
                  {compareMode && (
                    <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-primary bg-background">
                      {selectedVersions.includes(version.id) && (
                        <div className="w-3 h-3 rounded-full bg-primary" />
                      )}
                    </div>
                  )}

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">Versão {version.version}</h3>
                        {idx === 0 && (
                          <Badge variant="default" className="text-xs">
                            Atual
                          </Badge>
                        )}
                      </div>
                      {!compareMode && idx !== 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRestore(version);
                          }}
                        >
                          <RotateCcw className="mr-2 h-3 w-3" />
                          Restaurar
                        </Button>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{formatDate(version.timestamp)}</span>
                        <span>•</span>
                        <span>{version.author}</span>
                      </div>

                      <p className="text-sm">{version.changes}</p>

                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{version.sectionsCount} seções</span>
                        <span>•</span>
                        <span>{version.fieldsCount} campos</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
