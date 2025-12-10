import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  FileText, 
  Download, 
  Share2, 
  Printer,
  Calendar,
  User,
  Building2,
  CheckCircle2,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Sparkles
} from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Document {
  id: number;
  name: string;
  date: string;
  type: string;
}

interface DocumentViewerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  document: Document | null;
}

export function DocumentViewerModal({ open, onOpenChange, document }: DocumentViewerModalProps) {
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate document loading
  useState(() => {
    if (open) {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 800);
    }
  });

  if (!document) return null;

  const handleDownload = () => {
    toast.success("Download iniciado", {
      description: `Baixando ${document.name}...`
    });
  };

  const handleShare = () => {
    toast.success("Link copiado!", {
      description: "O link do documento foi copiado para a área de transferência."
    });
  };

  const handlePrint = () => {
    toast.info("Preparando impressão...");
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case "Exame": return "🔬";
      case "Receita": return "💊";
      case "Atestado": return "📋";
      case "Laudo": return "📄";
      default: return "📄";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Exame": return "bg-info/10 text-info border-info/20";
      case "Receita": return "bg-success/10 text-success border-success/20";
      case "Atestado": return "bg-warning/10 text-warning border-warning/20";
      case "Laudo": return "bg-primary/10 text-primary border-primary/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-hidden bg-card/95 backdrop-blur-xl border-2 border-primary/20 rounded-2xl shadow-2xl">
        <DialogHeader className="pb-4 border-b">
          <DialogTitle className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-primary/70 animate-[scale-in_0.2s_ease-out]">
              <FileText className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="animate-[fade-in_0.2s_ease-out]">{document.name}</span>
                <Badge className={cn(getTypeColor(document.type), "animate-[scale-in_0.2s_ease-out_0.1s_both]")}>
                  {document.type}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground font-normal mt-0.5 animate-[fade-in_0.2s_ease-out_0.2s_both]">
                Emitido em {document.date}
              </p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="flex gap-4 py-4">
          {/* Document Preview */}
          <div className="flex-1">
            <div className="bg-muted/30 rounded-xl p-4 h-[400px] overflow-hidden">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-4 pb-4 border-b animate-[fade-in_0.3s_ease-out]">
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 hover:scale-110 transition-transform"
                    onClick={() => setZoom(Math.max(50, zoom - 25))}
                  >
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <span className="text-sm min-w-[60px] text-center font-medium">{zoom}%</span>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 hover:scale-110 transition-transform"
                    onClick={() => setZoom(Math.min(200, zoom + 25))}
                  >
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 hover:scale-110 hover:rotate-90 transition-all"
                    onClick={handleRotate}
                  >
                    <RotateCw className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-2 hover:scale-105 transition-transform" 
                    onClick={handlePrint}
                  >
                    <Printer className="h-4 w-4" />
                    Imprimir
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-2 hover:scale-105 transition-transform" 
                    onClick={handleShare}
                  >
                    <Share2 className="h-4 w-4" />
                    Compartilhar
                  </Button>
                  <Button 
                    size="sm" 
                    className="gap-2 hover:scale-105 transition-transform" 
                    onClick={handleDownload}
                  >
                    <Download className="h-4 w-4" />
                    Baixar
                  </Button>
                </div>
              </div>

              {/* Document Content */}
              <ScrollArea className="h-[300px]">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 animate-pulse">
                      <FileText className="h-8 w-8 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground">Carregando documento...</p>
                  </div>
                ) : (
                  <div 
                    className="bg-card rounded-lg p-6 shadow-sm border mx-auto transition-all duration-300 animate-[fade-in_0.5s_ease-out]"
                    style={{ 
                      transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
                      transformOrigin: "top center",
                      width: "100%",
                      maxWidth: "500px"
                    }}
                  >
                    <div className="text-center mb-6">
                      <div className="text-5xl mb-2 animate-[bounce-in_0.5s_ease-out]">
                        {getDocumentIcon(document.type)}
                      </div>
                      <h2 className="text-xl font-bold">{document.type}</h2>
                      <p className="text-sm text-muted-foreground">MedClinic Saúde</p>
                      <div className="flex items-center justify-center gap-1 mt-2">
                        <Sparkles className="h-4 w-4 text-warning animate-pulse" />
                        <span className="text-xs text-muted-foreground">Documento Digital Verificado</span>
                      </div>
                    </div>

                    <div className="space-y-4 text-sm">
                      <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/30 transition-all hover:bg-muted/50 hover:scale-[1.02]">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Paciente</p>
                          <p className="font-medium">Maria Silva Santos</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/30 transition-all hover:bg-muted/50 hover:scale-[1.02]">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Data de Emissão</p>
                          <p className="font-medium">{document.date}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/30 transition-all hover:bg-muted/50 hover:scale-[1.02]">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Profissional</p>
                          <p className="font-medium">Dr. Ricardo Carvalho</p>
                          <p className="text-xs text-muted-foreground">CRM 123456 - SP</p>
                        </div>
                      </div>

                      {document.type === "Exame" && (
                        <div className="p-4 rounded-lg border animate-[fade-in_0.3s_ease-out]">
                          <h4 className="font-medium mb-3 flex items-center gap-2">
                            <span>Resultados</span>
                            <Badge variant="outline" className="text-xs">Normal</Badge>
                          </h4>
                          <div className="space-y-2 text-xs">
                            {[
                              { label: "Hemoglobina", value: "14.2 g/dL", status: "normal" },
                              { label: "Glicose", value: "92 mg/dL", status: "normal" },
                              { label: "Colesterol Total", value: "185 mg/dL", status: "normal" }
                            ].map((item, index) => (
                              <div 
                                key={item.label}
                                className="flex justify-between p-2 rounded bg-muted/30 transition-all hover:bg-muted/50"
                                style={{ animationDelay: `${index * 100}ms` }}
                              >
                                <span>{item.label}</span>
                                <span className="font-medium text-success">{item.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {document.type === "Receita" && (
                        <div className="p-4 rounded-lg border animate-[fade-in_0.3s_ease-out]">
                          <h4 className="font-medium mb-3">Prescrição</h4>
                          <div className="space-y-3 text-xs">
                            {[
                              { med: "Losartana 50mg", dosage: "1 comprimido por dia, pela manhã" },
                              { med: "AAS 100mg", dosage: "1 comprimido por dia, após almoço" }
                            ].map((item, index) => (
                              <div 
                                key={item.med}
                                className="p-3 bg-muted/30 rounded transition-all hover:bg-muted/50 hover:scale-[1.01]"
                                style={{ animationDelay: `${index * 100}ms` }}
                              >
                                <p className="font-medium">{item.med}</p>
                                <p className="text-muted-foreground">{item.dosage}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="pt-4 border-t text-center">
                        <div className="inline-flex items-center gap-2 text-success animate-pulse">
                          <CheckCircle2 className="h-4 w-4" />
                          <span className="text-xs font-medium">Documento Verificado</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </ScrollArea>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
