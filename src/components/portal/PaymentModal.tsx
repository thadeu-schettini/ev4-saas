import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { 
  CreditCard, 
  QrCode, 
  FileText, 
  Copy, 
  Check, 
  Shield,
  Clock,
  AlertCircle,
  Smartphone,
  Building2,
  CheckCircle2,
  Download
} from "lucide-react";
import { toast } from "sonner";

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  payment?: {
    id: number;
    description: string;
    value: number;
    dueDate: string;
  };
}

const pixCode = "00020126580014br.gov.bcb.pix0136123e4567-e89b-12d3-a456-426614174000520400005303986540528005802BR5925MEDCLINIC SAUDE LTDA6009SAO PAULO62070503***6304ABCD";

export function PaymentModal({ open, onOpenChange, payment }: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "card" | "boleto">("pix");
  const [copied, setCopied] = useState(false);
  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
    installments: "1"
  });
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixCode);
    setCopied(true);
    toast.success("Código PIX copiado!");
    setTimeout(() => setCopied(false), 3000);
  };

  const handlePayment = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
      toast.success("Pagamento realizado com sucesso!");
    }, 2000);
  };

  const defaultPayment = payment || {
    id: 1,
    description: "Consulta Dermatologia",
    value: 280,
    dueDate: "20/12/2024"
  };

  if (success) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md bg-card/95 backdrop-blur-xl border-2 border-primary/20 rounded-2xl shadow-2xl">
          <div className="flex flex-col items-center py-8 text-center">
            <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mb-4 animate-in zoom-in">
              <CheckCircle2 className="h-10 w-10 text-success" />
            </div>
            <h2 className="text-xl font-bold mb-2">Pagamento Confirmado!</h2>
            <p className="text-muted-foreground mb-6">
              Seu pagamento de R$ {defaultPayment.value.toFixed(2)} foi processado com sucesso.
            </p>
            
            <div className="w-full p-4 rounded-xl bg-muted/30 mb-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Comprovante</span>
                <span className="font-mono">#PAY-{Date.now().toString().slice(-6)}</span>
              </div>
            </div>

            <div className="flex gap-3 w-full">
              <Button variant="outline" className="flex-1 gap-2">
                <Download className="h-4 w-4" />
                Comprovante
              </Button>
              <Button 
                className="flex-1" 
                onClick={() => {
                  setSuccess(false);
                  onOpenChange(false);
                }}
              >
                Fechar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-hidden bg-card/95 backdrop-blur-xl border-2 border-primary/20 rounded-2xl shadow-2xl">
        <DialogHeader className="pb-4 border-b">
          <DialogTitle className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-primary/70">
              <CreditCard className="h-5 w-5 text-primary-foreground" />
            </div>
            Realizar Pagamento
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh]">
          <div className="py-4 space-y-4">
            {/* Payment Summary */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-warning/10 to-warning/5 border border-warning/20">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-warning mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium">{defaultPayment.description}</h4>
                  <p className="text-sm text-muted-foreground">Vencimento: {defaultPayment.dueDate}</p>
                  <p className="text-2xl font-bold mt-2">R$ {defaultPayment.value.toFixed(2)}</p>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <Tabs value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as any)}>
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="pix" className="gap-2">
                  <QrCode className="h-4 w-4" />
                  PIX
                </TabsTrigger>
                <TabsTrigger value="card" className="gap-2">
                  <CreditCard className="h-4 w-4" />
                  Cartão
                </TabsTrigger>
                <TabsTrigger value="boleto" className="gap-2">
                  <FileText className="h-4 w-4" />
                  Boleto
                </TabsTrigger>
              </TabsList>

              {/* PIX */}
              <TabsContent value="pix" className="space-y-4 mt-4">
                <div className="flex flex-col items-center p-6 rounded-xl bg-muted/30">
                  <div className="w-48 h-48 bg-card rounded-xl flex items-center justify-center border-2 border-dashed border-border mb-4">
                    <QrCode className="h-32 w-32 text-foreground/80" />
                  </div>
                  <p className="text-sm text-muted-foreground text-center mb-4">
                    Escaneie o QR Code com o app do seu banco
                  </p>
                  
                  <div className="w-full">
                    <Label className="text-xs text-muted-foreground">Ou copie o código PIX</Label>
                    <div className="flex gap-2 mt-1">
                      <Input 
                        value={pixCode.slice(0, 40) + "..."}
                        readOnly 
                        className="font-mono text-xs"
                      />
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={handleCopyPix}
                      >
                        {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-3 rounded-lg bg-info/10 text-sm">
                  <Clock className="h-4 w-4 text-info" />
                  <span>O pagamento é confirmado em até 30 segundos</span>
                </div>
              </TabsContent>

              {/* Card */}
              <TabsContent value="card" className="space-y-4 mt-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Número do Cartão</Label>
                    <Input 
                      placeholder="0000 0000 0000 0000"
                      value={cardData.number}
                      onChange={(e) => setCardData({...cardData, number: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Nome no Cartão</Label>
                    <Input 
                      placeholder="Nome como está no cartão"
                      value={cardData.name}
                      onChange={(e) => setCardData({...cardData, name: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Validade</Label>
                      <Input 
                        placeholder="MM/AA"
                        value={cardData.expiry}
                        onChange={(e) => setCardData({...cardData, expiry: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>CVV</Label>
                      <Input 
                        placeholder="000"
                        type="password"
                        maxLength={4}
                        value={cardData.cvv}
                        onChange={(e) => setCardData({...cardData, cvv: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Parcelas</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {["1", "2", "3"].map((n) => (
                        <button
                          key={n}
                          onClick={() => setCardData({...cardData, installments: n})}
                          className={cn(
                            "p-3 rounded-lg border-2 text-center transition-all",
                            cardData.installments === n
                              ? "border-primary bg-primary/10"
                              : "border-border hover:border-primary/50"
                          )}
                        >
                          <p className="font-semibold">{n}x</p>
                          <p className="text-xs text-muted-foreground">
                            R$ {(defaultPayment.value / parseInt(n)).toFixed(2)}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-3 rounded-lg bg-success/10 text-sm">
                  <Shield className="h-4 w-4 text-success" />
                  <span>Pagamento 100% seguro com criptografia</span>
                </div>
              </TabsContent>

              {/* Boleto */}
              <TabsContent value="boleto" className="space-y-4 mt-4">
                <div className="p-6 rounded-xl bg-muted/30 text-center">
                  <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h4 className="font-medium mb-2">Boleto Bancário</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    O boleto será gerado e enviado para seu e-mail. O prazo de compensação é de até 3 dias úteis.
                  </p>
                  <Badge variant="outline" className="text-warning border-warning/30">
                    <Clock className="h-3 w-3 mr-1" />
                    Vencimento: {defaultPayment.dueDate}
                  </Badge>
                </div>

                <div className="flex items-center gap-2 p-3 rounded-lg bg-info/10 text-sm">
                  <Smartphone className="h-4 w-4 text-info" />
                  <span>Você também receberá o boleto por WhatsApp</span>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>

        <div className="flex gap-3 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
            Cancelar
          </Button>
          <Button 
            onClick={handlePayment} 
            className="flex-1 gap-2"
            disabled={processing}
          >
            {processing ? (
              <>
                <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Processando...
              </>
            ) : (
              <>
                {paymentMethod === "pix" ? "Confirmar PIX" :
                 paymentMethod === "card" ? "Pagar Agora" : "Gerar Boleto"}
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
