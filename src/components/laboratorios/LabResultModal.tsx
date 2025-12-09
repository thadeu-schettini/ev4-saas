import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { FlaskConical, Download, Printer, Share2, AlertCircle, CheckCircle2, User, Calendar, FileText } from "lucide-react";

interface LabResultModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  result: {
    id: number;
    patient: string;
    exam: string;
    lab: string;
    requestDate: string;
    resultDate: string | null;
    professional: string;
    hasAlerts: boolean;
    alertDescription?: string;
  } | null;
}

const mockResultData = [
  { name: "Hemoglobina", value: "11.2", reference: "12.0 - 16.0 g/dL", status: "low" },
  { name: "Hematócrito", value: "34.5", reference: "36.0 - 46.0 %", status: "low" },
  { name: "Leucócitos", value: "7.500", reference: "4.000 - 11.000 /mm³", status: "normal" },
  { name: "Plaquetas", value: "245.000", reference: "150.000 - 400.000 /mm³", status: "normal" },
  { name: "VCM", value: "88", reference: "80 - 100 fL", status: "normal" },
  { name: "HCM", value: "29", reference: "27 - 32 pg", status: "normal" },
  { name: "CHCM", value: "33", reference: "32 - 36 g/dL", status: "normal" },
  { name: "RDW", value: "13.5", reference: "11.5 - 14.5 %", status: "normal" },
];

export function LabResultModal({ open, onOpenChange, result }: LabResultModalProps) {
  if (!result) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <FlaskConical className="h-6 w-6 text-primary" />
              </div>
              <div>
                <DialogTitle>{result.exam}</DialogTitle>
                <p className="text-sm text-muted-foreground mt-1">{result.lab}</p>
              </div>
            </div>
            {result.hasAlerts && (
              <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
                <AlertCircle className="h-3 w-3 mr-1" />
                Alerta
              </Badge>
            )}
          </div>
        </DialogHeader>

        {/* Patient & Dates Info */}
        <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-muted/30">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Paciente</p>
              <p className="font-medium">{result.patient}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Solicitante</p>
              <p className="font-medium">{result.professional}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Data Solicitação</p>
              <p className="font-medium">{result.requestDate}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-confirmed" />
            <div>
              <p className="text-xs text-muted-foreground">Data Resultado</p>
              <p className="font-medium text-confirmed">{result.resultDate}</p>
            </div>
          </div>
        </div>

        {/* Alert */}
        {result.hasAlerts && result.alertDescription && (
          <div className="flex items-start gap-2 p-3 rounded-lg bg-destructive/5 border border-destructive/20">
            <AlertCircle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
            <p className="text-sm text-destructive">{result.alertDescription}</p>
          </div>
        )}

        {/* Results Table */}
        <ScrollArea className="h-[300px]">
          <div className="space-y-2">
            <div className="grid grid-cols-4 gap-4 px-4 py-2 text-xs font-medium text-muted-foreground">
              <span>Exame</span>
              <span className="text-center">Resultado</span>
              <span className="text-center">Referência</span>
              <span className="text-center">Status</span>
            </div>
            <Separator />
            {mockResultData.map((item, index) => (
              <div 
                key={index} 
                className={`grid grid-cols-4 gap-4 px-4 py-3 rounded-lg ${
                  item.status !== "normal" ? "bg-destructive/5" : ""
                }`}
              >
                <span className="font-medium">{item.name}</span>
                <span className={`text-center font-semibold ${
                  item.status === "low" ? "text-destructive" :
                  item.status === "high" ? "text-destructive" :
                  ""
                }`}>
                  {item.value}
                </span>
                <span className="text-center text-muted-foreground text-sm">{item.reference}</span>
                <span className="text-center">
                  {item.status === "normal" ? (
                    <CheckCircle2 className="h-4 w-4 text-confirmed mx-auto" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-destructive mx-auto" />
                  )}
                </span>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Printer className="h-4 w-4" />
              Imprimir
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Share2 className="h-4 w-4" />
              Compartilhar
            </Button>
          </div>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Baixar PDF
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
