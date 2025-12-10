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
  RotateCw
} from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

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

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case "Exame": return "🔬";
      case "Receita": return "💊";
      case "Atestado": return "📋";
      case "Laudo": return "📄";
      default: return "📄";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-hidden bg-card/95 backdrop-blur-xl border-2 border-primary/20 rounded-2xl shadow-2xl">
        <DialogHeader className="pb-4 border-b">
          <DialogTitle className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-primary/70">
              <FileText className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span>{document.name}</span>
                <Badge variant="outline">{document.type}</Badge>
              </div>
              <p className="text-sm text-muted-foreground font-normal mt-0.5">
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
              <div className="flex items-center justify-between mb-4 pb-4 border-b">
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => setZoom(Math.max(50, zoom - 25))}
                  >
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <span className="text-sm min-w-[60px] text-center">{zoom}%</span>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => setZoom(Math.min(200, zoom + 25))}
                  >
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <RotateCw className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="gap-2" onClick={handlePrint}>
                    <Printer className="h-4 w-4" />
                    Imprimir
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2" onClick={handleShare}>
                    <Share2 className="h-4 w-4" />
                    Compartilhar
                  </Button>
                  <Button size="sm" className="gap-2" onClick={handleDownload}>
                    <Download className="h-4 w-4" />
                    Baixar
                  </Button>
                </div>
              </div>

              {/* Mock Document Content */}
              <ScrollArea className="h-[300px]">
                <div 
                  className="bg-card rounded-lg p-6 shadow-sm border mx-auto"
                  style={{ 
                    transform: `scale(${zoom / 100})`,
                    transformOrigin: "top center",
                    width: "100%",
                    maxWidth: "500px"
                  }}
                >
                  <div className="text-center mb-6">
                    <div className="text-4xl mb-2">{getDocumentIcon(document.type)}</div>
                    <h2 className="text-xl font-bold">{document.type}</h2>
                    <p className="text-sm text-muted-foreground">MedClinic Saúde</p>
                  </div>

                  <div className="space-y-4 text-sm">
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/30">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Paciente</p>
                        <p className="font-medium">Maria Silva Santos</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/30">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Data de Emissão</p>
                        <p className="font-medium">{document.date}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/30">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Profissional</p>
                        <p className="font-medium">Dr. Ricardo Carvalho</p>
                        <p className="text-xs text-muted-foreground">CRM 123456 - SP</p>
                      </div>
                    </div>

                    {document.type === "Exame" && (
                      <div className="p-4 rounded-lg border">
                        <h4 className="font-medium mb-3">Resultados</h4>
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between">
                            <span>Hemoglobina</span>
                            <span className="font-medium">14.2 g/dL</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Glicose</span>
                            <span className="font-medium">92 mg/dL</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Colesterol Total</span>
                            <span className="font-medium">185 mg/dL</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {document.type === "Receita" && (
                      <div className="p-4 rounded-lg border">
                        <h4 className="font-medium mb-3">Prescrição</h4>
                        <div className="space-y-3 text-xs">
                          <div className="p-2 bg-muted/30 rounded">
                            <p className="font-medium">Losartana 50mg</p>
                            <p className="text-muted-foreground">1 comprimido por dia, pela manhã</p>
                          </div>
                          <div className="p-2 bg-muted/30 rounded">
                            <p className="font-medium">AAS 100mg</p>
                            <p className="text-muted-foreground">1 comprimido por dia, após almoço</p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="pt-4 border-t text-center">
                      <div className="inline-flex items-center gap-2 text-success">
                        <CheckCircle2 className="h-4 w-4" />
                        <span className="text-xs font-medium">Documento Verificado</span>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
