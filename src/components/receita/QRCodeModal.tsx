import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QrCode, Download, Share2, Copy, Smartphone, User, Calendar } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface QRCodeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  prescription: {
    id: number;
    patient: string;
    date: string;
    medications: { name: string }[];
  } | null;
}

export function QRCodeModal({ open, onOpenChange, prescription }: QRCodeModalProps) {
  if (!prescription) return null;

  const prescriptionCode = `RX-${prescription.id}-${Date.now().toString(36).toUpperCase()}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://receita.digital/${prescriptionCode}`);
    toast({
      title: "Link copiado!",
      description: "O link da receita foi copiado para a área de transferência.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5 text-primary" />
            QR Code da Receita
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Patient Info */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{prescription.patient}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{prescription.date}</span>
            </div>
          </div>

          {/* QR Code Display */}
          <div className="flex flex-col items-center py-6">
            <div className="h-48 w-48 rounded-2xl bg-white p-4 shadow-lg">
              {/* Simulated QR Code Pattern */}
              <div className="h-full w-full bg-gradient-to-br from-foreground to-foreground/80 rounded-lg relative overflow-hidden">
                <div className="absolute inset-2 bg-white rounded-sm">
                  <div className="h-full w-full grid grid-cols-8 grid-rows-8 gap-0.5 p-1">
                    {[...Array(64)].map((_, i) => (
                      <div 
                        key={i} 
                        className={`${Math.random() > 0.5 ? 'bg-foreground' : 'bg-white'} rounded-[1px]`}
                      />
                    ))}
                  </div>
                </div>
                {/* Corner markers */}
                <div className="absolute top-2 left-2 h-6 w-6 border-4 border-foreground rounded-sm bg-white">
                  <div className="absolute inset-1 bg-foreground rounded-[1px]" />
                </div>
                <div className="absolute top-2 right-2 h-6 w-6 border-4 border-foreground rounded-sm bg-white">
                  <div className="absolute inset-1 bg-foreground rounded-[1px]" />
                </div>
                <div className="absolute bottom-2 left-2 h-6 w-6 border-4 border-foreground rounded-sm bg-white">
                  <div className="absolute inset-1 bg-foreground rounded-[1px]" />
                </div>
              </div>
            </div>
            <Badge variant="outline" className="mt-4 font-mono">
              {prescriptionCode}
            </Badge>
          </div>

          {/* Medications */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Medicamentos:</p>
            <div className="flex flex-wrap gap-2">
              {prescription.medications.map((med, index) => (
                <Badge key={index} variant="secondary">
                  {med.name}
                </Badge>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="p-3 rounded-lg bg-info/5 border border-info/20">
            <p className="text-sm text-info">
              O paciente pode apresentar este QR Code na farmácia para validar a receita.
            </p>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <Button variant="outline" className="gap-2" onClick={handleCopyLink}>
              <Copy className="h-4 w-4" />
              Copiar Link
            </Button>
            <Button variant="outline" className="gap-2">
              <Smartphone className="h-4 w-4" />
              Enviar WhatsApp
            </Button>
            <Button variant="outline" className="gap-2">
              <Share2 className="h-4 w-4" />
              Compartilhar
            </Button>
            <Button className="gap-2">
              <Download className="h-4 w-4" />
              Baixar QR
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
