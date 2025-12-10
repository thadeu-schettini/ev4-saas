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
  Download,
  Sparkles,
  PartyPopper
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
        <DialogContent className="sm:max-w-md bg-card/95 backdrop-blur-xl border-2 border-primary/20 rounded-2xl shadow-2xl overflow-hidden">
          {/* Confetti Effect */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full animate-[confetti_1s_ease-out_forwards]"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: '-10px',
                  backgroundColor: ['#22c55e', '#3b82f6', '#f59e0b', '#ec4899', '#8b5cf6'][Math.floor(Math.random() * 5)],
                  animationDelay: `${Math.random() * 0.5}s`,
                }}
              />
            ))}
          </div>

          <div className="flex flex-col items-center py-8 text-center relative z-10">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-success to-success/70 flex items-center justify-center mb-4 animate-[bounce-in_0.6s_ease-out]">
                <CheckCircle2 className="h-12 w-12 text-success-foreground" />
              </div>
              <div className="absolute -top-2 -right-2 animate-[spin_2s_linear_infinite]">
                <Sparkles className="h-8 w-8 text-warning" />
              </div>
              <div className="absolute -bottom-1 -left-2 animate-[bounce_1s_ease-in-out_infinite]">
                <PartyPopper className="h-6 w-6 text-info" />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold mb-2 animate-[fade-in_0.3s_ease-out_0.3s_both]">
              Pagamento Confirmado!
            </h2>
            <p className="text-muted-foreground mb-6 animate-[fade-in_0.3s_ease-out_0.4s_both]">
              Seu pagamento de <span className="font-bold text-success">R$ {defaultPayment.value.toFixed(2)}</span> foi processado com sucesso.
            </p>
            
            <div className="w-full p-4 rounded-xl bg-gradient-to-br from-success/10 to-success/5 border border-success/20 mb-6 animate-[scale-in_0.3s_ease-out_0.5s_both]">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Comprovante</span>
                <span className="font-mono font-bold">#PAY-{Date.now().toString().slice(-6)}</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-2">
                <span className="text-muted-foreground">Data</span>
                <span className="font-medium">{new Date().toLocaleDateString('pt-BR')}</span>
              </div>
            </div>

            <div className="flex gap-3 w-full animate-[fade-in_0.3s_ease-out_0.6s_both]">
              <Button variant="outline" className="flex-1 gap-2 hover:scale-105 transition-transform">
                <Download className="h-4 w-4" />
                Comprovante
              </Button>
              <Button 
                className="flex-1 hover:scale-105 transition-transform" 
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
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-primary/70 animate-[scale-in_0.2s_ease-out]">
              <CreditCard className="h-5 w-5 text-primary-foreground" />
            </div>
            Realizar Pagamento
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh]">
          <div className="py-4 space-y-4">
            {/* Payment Summary */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-warning/10 to-warning/5 border border-warning/20 animate-[fade-in_0.3s_ease-out]">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-warning/20 animate-pulse">
                  <AlertCircle className="h-5 w-5 text-warning" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{defaultPayment.description}</h4>
                  <p className="text-sm text-muted-foreground">Vencimento: {defaultPayment.dueDate}</p>
                  <p className="text-2xl font-bold mt-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                    R$ {defaultPayment.value.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <Tabs value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as any)}>
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="pix" className="gap-2 transition-all data-[state=active]:scale-105">
                  <QrCode className="h-4 w-4" />
                  PIX
                </TabsTrigger>
                <TabsTrigger value="card" className="gap-2 transition-all data-[state=active]:scale-105">
                  <CreditCard className="h-4 w-4" />
                  Cartão
                </TabsTrigger>
                <TabsTrigger value="boleto" className="gap-2 transition-all data-[state=active]:scale-105">
                  <FileText className="h-4 w-4" />
                  Boleto
                </TabsTrigger>
              </TabsList>

              {/* PIX */}
              <TabsContent value="pix" className="space-y-4 mt-4 animate-[fade-in_0.3s_ease-out]">
                <div className="flex flex-col items-center p-6 rounded-xl bg-muted/30">
                  <div className="w-48 h-48 bg-card rounded-xl flex items-center justify-center border-2 border-dashed border-border mb-4 animate-pulse relative overflow-hidden">
                    <QrCode className="h-32 w-32 text-foreground/80" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent" />
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
                        className={cn(
                          "transition-all duration-300",
                          copied && "bg-success/10 border-success text-success"
                        )}
                      >
                        {copied ? (
                          <Check className="h-4 w-4 animate-[scale-in_0.2s_ease-out]" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-3 rounded-lg bg-info/10 text-sm animate-[fade-in_0.3s_ease-out_0.2s_both]">
                  <Clock className="h-4 w-4 text-info animate-pulse" />
                  <span>O pagamento é confirmado em até 30 segundos</span>
                </div>
              </TabsContent>

              {/* Card */}
              <TabsContent value="card" className="space-y-4 mt-4 animate-[fade-in_0.3s_ease-out]">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Número do Cartão</Label>
                    <Input 
                      placeholder="0000 0000 0000 0000"
                      value={cardData.number}
                      onChange={(e) => setCardData({...cardData, number: e.target.value})}
                      className="transition-all focus:scale-[1.01]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Nome no Cartão</Label>
                    <Input 
                      placeholder="Nome como está no cartão"
                      value={cardData.name}
                      onChange={(e) => setCardData({...cardData, name: e.target.value})}
                      className="transition-all focus:scale-[1.01]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Validade</Label>
                      <Input 
                        placeholder="MM/AA"
                        value={cardData.expiry}
                        onChange={(e) => setCardData({...cardData, expiry: e.target.value})}
                        className="transition-all focus:scale-[1.01]"
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
                        className="transition-all focus:scale-[1.01]"
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
                            "p-3 rounded-lg border-2 text-center transition-all duration-300",
                            "hover:scale-105 active:scale-95",
                            cardData.installments === n
                              ? "border-primary bg-primary/10 shadow-md shadow-primary/20"
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
              <TabsContent value="boleto" className="space-y-4 mt-4 animate-[fade-in_0.3s_ease-out]">
                <div className="p-6 rounded-xl bg-muted/30 text-center">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                    <Building2 className="h-8 w-8 text-muted-foreground" />
                  </div>
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
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)} 
            className="flex-1 hover:scale-105 transition-transform"
          >
            Cancelar
          </Button>
          <Button 
            onClick={handlePayment} 
            className="flex-1 gap-2 hover:scale-105 transition-transform"
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
