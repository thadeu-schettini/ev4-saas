import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  Receipt, 
  Plus, 
  Trash2, 
  CreditCard, 
  Banknote, 
  Smartphone,
  FileText,
  Calendar,
  User,
  DollarSign,
  Tag,
  CheckCircle2,
  Clock,
  Sparkles,
  Building2,
  Phone,
  Mail,
  MapPin,
  X,
  Download,
  Printer,
  CalendarDays,
  TrendingUp
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface BillingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appointment: {
    patientName: string;
    patientPhone: string;
    service: string;
    date: string;
    time: string;
    value: number;
  };
}

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export const BillingModal = ({ open, onOpenChange, appointment }: BillingModalProps) => {
  const [dueDate, setDueDate] = useState(appointment.date);
  const [description, setDescription] = useState(appointment.service);
  const [items, setItems] = useState<InvoiceItem[]>([
    {
      id: "1",
      description: appointment.service,
      quantity: 1,
      unitPrice: appointment.value,
      total: appointment.value
    }
  ]);
  const [paymentMethod, setPaymentMethod] = useState("pix");
  const [status, setStatus] = useState("pendente");
  const [discountCode, setDiscountCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [observations, setObservations] = useState("");
  const [installments, setInstallments] = useState(1);
  const installmentInterval = 30; // Padrão mensal

  const paymentMethods = [
    { id: "pix", label: "PIX", icon: Smartphone, color: "text-teal-500" },
    { id: "money", label: "Dinheiro", icon: Banknote, color: "text-green-500" },
    { id: "credit", label: "Crédito", icon: CreditCard, color: "text-blue-500" },
    { id: "debit", label: "Débito", icon: CreditCard, color: "text-purple-500" },
  ];

  const statusOptions = [
    { value: "pendente", label: "Pendente", color: "bg-orange-500", textColor: "text-orange-600" },
    { value: "confirmado", label: "Confirmado", color: "bg-green-500", textColor: "text-green-600" },
  ];

  const calculateTotal = () => {
    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    const discount = discountApplied ? subtotal * 0.1 : 0;
    const total = subtotal - discount;
    const installmentValue = total / installments;
    return { subtotal, discount, total, installmentValue };
  };

  const calculateInstallmentDates = () => {
    const dates = [];
    const baseDate = new Date(dueDate);
    
    for (let i = 0; i < installments; i++) {
      const installmentDate = new Date(baseDate);
      installmentDate.setDate(baseDate.getDate() + (i * installmentInterval));
      dates.push(installmentDate.toISOString().split('T')[0]);
    }
    
    return dates;
  };

  const handlePrint = () => {
    window.print();
    toast.success("Preparando impressão", {
      description: "O recibo está sendo preparado para impressão"
    });
  };

  const handleDownloadPDF = () => {
    toast.success("Download iniciado", {
      description: "O recibo em PDF será baixado em breve",
      action: {
        label: "Ver arquivo",
        onClick: () => console.log("Abrir PDF"),
      },
    });
  };

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: "",
      quantity: 1,
      unitPrice: 0,
      total: 0
    };
    setItems([...items, newItem]);
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        if (field === "quantity" || field === "unitPrice") {
          updated.total = updated.quantity * updated.unitPrice;
        }
        return updated;
      }
      return item;
    }));
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const validateDiscount = () => {
    if (discountCode.toUpperCase() === "CLINICA50" || discountCode.toUpperCase() === "DESCONTO10") {
      setDiscountApplied(true);
      toast.success("Cupom aplicado!", {
        description: "10% de desconto aplicado ao total"
      });
    } else {
      toast.error("Cupom inválido", {
        description: "O código inserido não é válido"
      });
    }
  };

  const handleRegisterPayment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const totals = calculateTotal();
      toast.success("Pagamento registrado!", {
        description: `Cobrança de R$ ${totals.total.toFixed(2)} registrada com sucesso`,
        action: {
          label: "Ver Recibo",
          onClick: () => console.log("Abrir recibo"),
        },
      });
      onOpenChange(false);
    }, 1000);
  };

  const totals = calculateTotal();
  const currentStatus = statusOptions.find(s => s.value === status);
  const currentPaymentMethod = paymentMethods.find(m => m.id === paymentMethod);
  const installmentDates = calculateInstallmentDates();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] w-full lg:max-w-[1400px] max-h-[95vh] p-0 gap-0 overflow-hidden bg-background">
        {/* Header */}
        <div className="relative px-4 md:px-6 py-4 md:py-5 border-b border-border bg-gradient-to-r from-background via-muted/20 to-background">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.08),transparent_60%)]" />
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="p-2 md:p-3 bg-primary/10 rounded-xl">
                <Receipt className="h-5 w-5 md:h-6 md:w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-lg md:text-2xl font-bold text-foreground flex items-center gap-2">
                  Registro de Cobrança
                  <Badge variant="outline" className="text-xs hidden sm:flex">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Preview ao vivo
                  </Badge>
                </h2>
                <p className="text-xs md:text-sm text-muted-foreground mt-0.5">
                  Formulário à esquerda • Visualização do recibo à direita
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Split Screen Layout */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 h-[calc(95vh-120px)]">
          {/* Left: Form */}
          <ScrollArea className="h-full lg:border-r border-border">
            <div className="p-6 space-y-6">
              {/* Patient Info */}
              <div className="p-4 md:p-5 bg-muted/30 rounded-xl border border-border space-y-3">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" />
                  Informações do Paciente
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Nome:</span>
                    <p className="font-semibold">{appointment.patientName}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Telefone:</span>
                    <p className="font-semibold">{appointment.patientPhone}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Serviço:</span>
                    <p className="font-semibold">{appointment.service}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Data:</span>
                    <p className="font-semibold">{appointment.date} às {appointment.time}</p>
                  </div>
                </div>
              </div>

              {/* Due Date */}
              <div>
                <Label htmlFor="dueDate" className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  Data de Vencimento
                </Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="h-11"
                />
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description" className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  Descrição da Cobrança
                </Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  placeholder="Adicione detalhes sobre a cobrança..."
                  className="resize-none"
                />
              </div>

              {/* Items - Enhanced */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-semibold flex items-center gap-2">
                    <Receipt className="h-4 w-4 text-primary" />
                    Itens da Fatura
                  </Label>
                  <Button
                    onClick={addItem}
                    size="sm"
                    variant="outline"
                    className="gap-2 h-8 text-xs"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Novo
                  </Button>
                </div>

                <div className="space-y-2">
                  {items.map((item, index) => (
                    <div key={item.id} className="group p-4 bg-card rounded-lg border border-border hover:border-primary/30 transition-all">
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="flex-1">
                            <Input
                              value={item.description}
                              onChange={(e) => updateItem(item.id, "description", e.target.value)}
                              placeholder="Descrição do item"
                              className="h-9 font-medium"
                            />
                          </div>
                          {items.length > 1 && (
                            <Button
                              onClick={() => removeItem(item.id)}
                              size="icon"
                              variant="ghost"
                              className="h-9 w-9 text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <Label className="text-xs text-muted-foreground mb-1.5">Quantidade</Label>
                            <Input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => updateItem(item.id, "quantity", Number(e.target.value))}
                              className="h-9"
                            />
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground mb-1.5">Valor Unit.</Label>
                            <Input
                              type="number"
                              step="0.01"
                              min="0"
                              value={item.unitPrice}
                              onChange={(e) => updateItem(item.id, "unitPrice", Number(e.target.value))}
                              className="h-9"
                            />
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground mb-1.5">Total</Label>
                            <div className="h-9 flex items-center justify-end px-3 bg-primary/5 rounded-md font-bold text-sm text-primary border border-primary/20">
                              R$ {item.total.toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Subtotal Display */}
                <div className="p-4 bg-muted/30 rounded-lg border border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-muted-foreground">Subtotal dos Itens</span>
                    <span className="text-lg font-bold text-foreground">
                      R$ {totals.subtotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Method & Installments - Integrated */}
              <div className="p-5 bg-gradient-to-br from-card to-muted/30 rounded-xl border border-border space-y-5">
                <div>
                  <Label className="text-sm font-semibold mb-3 flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-primary" />
                    Forma de Pagamento
                  </Label>
                  <div className="grid grid-cols-2 gap-2 md:gap-3">
                    {paymentMethods.map((method) => {
                      const Icon = method.icon;
                      return (
                        <button
                          key={method.id}
                          onClick={() => setPaymentMethod(method.id)}
                          className={cn(
                            "p-3 md:p-4 rounded-xl border-2 transition-all text-left",
                            paymentMethod === method.id
                              ? "border-primary bg-primary/5 shadow-md"
                              : "border-border hover:border-primary/50"
                          )}
                        >
                          <Icon className={cn("h-4 w-4 md:h-5 md:w-5 mb-2", method.color)} />
                          <p className="text-xs md:text-sm font-semibold">{method.label}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Installments - Only for Credit */}
                {paymentMethod === "credit" && (
                  <>
                    <Separator />

                    <div className="space-y-3">
                      <Label className="text-sm font-semibold flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-primary" />
                        Parcelamento Mensal
                      </Label>
                      
                      <div>
                        <Label htmlFor="installments" className="text-xs text-muted-foreground mb-2">
                          Número de Parcelas
                        </Label>
                        <Select 
                          value={installments.toString()} 
                          onValueChange={(value) => setInstallments(Number(value))}
                        >
                          <SelectTrigger id="installments" className="h-11">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                              <SelectItem key={num} value={num.toString()}>
                                {num === 1 ? "À vista" : `${num}x de R$ ${(totals.total / num).toFixed(2)}`}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {installments > 1 && (
                        <div className="p-4 bg-primary/5 rounded-lg border border-primary/20 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Valor de cada parcela</span>
                            <span className="text-lg font-bold text-primary">
                              R$ {totals.installmentValue.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">
                              Primeira parcela vence em
                            </span>
                            <span className="font-semibold">
                              {new Date(dueDate).toLocaleDateString('pt-BR')}
                            </span>
                          </div>
                          {installmentDates.length > 1 && (
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-muted-foreground">
                                Última parcela vence em
                              </span>
                              <span className="font-semibold">
                                {new Date(installmentDates[installmentDates.length - 1]).toLocaleDateString('pt-BR')}
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* Status */}
              <div>
                <Label className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Status da Cobrança
                </Label>
                <div className="flex gap-3">
                  {statusOptions.map((option) => (
                    <Button
                      key={option.value}
                      onClick={() => setStatus(option.value)}
                      variant={status === option.value ? "default" : "outline"}
                      className={cn(
                        "flex-1 h-12",
                        status === option.value && "shadow-lg"
                      )}
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Discount */}
              <div>
                <Label htmlFor="discount" className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <Tag className="h-4 w-4 text-primary" />
                  Cupom de Desconto
                  <Badge variant="outline" className="text-xs ml-auto">Opcional</Badge>
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="discount"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                    placeholder="Digite o código"
                    className="h-11 font-mono"
                    disabled={discountApplied}
                  />
                  <Button
                    onClick={validateDiscount}
                    variant={discountApplied ? "secondary" : "default"}
                    disabled={!discountCode || discountApplied}
                    className="h-11 px-6"
                  >
                    {discountApplied ? "Aplicado" : "Validar"}
                  </Button>
                </div>
                {discountApplied && (
                  <div className="mt-2 p-3 bg-success/10 rounded-lg border border-success/20">
                    <p className="text-sm text-success font-medium flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4" />
                      Desconto de 10% aplicado!
                    </p>
                  </div>
                )}
              </div>

              {/* Observations */}
              <div>
                <Label htmlFor="observations" className="text-sm font-semibold mb-2">
                  Observações Adicionais
                </Label>
                <Textarea
                  id="observations"
                  value={observations}
                  onChange={(e) => setObservations(e.target.value)}
                  rows={3}
                  placeholder="Notas internas ou informações complementares..."
                  className="resize-none"
                />
              </div>
            </div>
          </ScrollArea>

          {/* Right: Receipt Preview - Hidden on Mobile */}
          <ScrollArea className="hidden lg:block h-full bg-muted/20">
            <div className="p-6">
              <div className="max-w-[600px] mx-auto">
                {/* Preview Label */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    Preview do Recibo
                  </h3>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={handlePrint}
                      size="sm"
                      variant="outline"
                      className="gap-2 h-8"
                    >
                      <Printer className="h-3.5 w-3.5" />
                      Imprimir
                    </Button>
                    <Button
                      onClick={handleDownloadPDF}
                      size="sm"
                      variant="outline"
                      className="gap-2 h-8"
                    >
                      <Download className="h-3.5 w-3.5" />
                      PDF
                    </Button>
                  </div>
                </div>

                {/* Receipt */}
                <div className="bg-card rounded-xl border-2 border-border shadow-2xl overflow-hidden">
                  {/* Receipt Header */}
                  <div className="p-8 bg-gradient-to-br from-primary/5 to-primary/10 border-b border-border">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Building2 className="h-5 w-5 text-primary" />
                          <h3 className="text-xl font-bold">Clínica Médica</h3>
                        </div>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <p className="flex items-center gap-2">
                            <MapPin className="h-3.5 w-3.5" />
                            Rua Exemplo, 123 - Centro
                          </p>
                          <p className="flex items-center gap-2">
                            <Phone className="h-3.5 w-3.5" />
                            (11) 1234-5678
                          </p>
                          <p className="flex items-center gap-2">
                            <Mail className="h-3.5 w-3.5" />
                            contato@clinica.com.br
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className={cn(
                          "inline-flex px-3 py-1.5 rounded-full text-xs font-semibold mb-2",
                          currentStatus?.color,
                          "text-white"
                        )}>
                          {currentStatus?.label}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          #{Date.now().toString().slice(-8)}
                        </p>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    {/* Patient Info */}
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground mb-2">DADOS DO PACIENTE</p>
                      <div className="space-y-1">
                        <p className="font-semibold">{appointment.patientName}</p>
                        <p className="text-sm text-muted-foreground">{appointment.patientPhone}</p>
                      </div>
                    </div>
                  </div>

                  {/* Receipt Body */}
                  <div className="p-8 space-y-6">
                    {/* Description */}
                    {description && (
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground mb-2">DESCRIÇÃO</p>
                        <p className="text-sm">{description}</p>
                      </div>
                    )}

                    {/* Items */}
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground mb-3">ITENS</p>
                      <div className="space-y-2">
                        {items.filter(item => item.description).map((item, index) => (
                          <div key={item.id} className="flex justify-between items-start p-3 bg-muted/30 rounded-lg">
                            <div className="flex-1">
                              <p className="font-semibold text-sm">{item.description || `Item ${index + 1}`}</p>
                              <p className="text-xs text-muted-foreground">
                                {item.quantity}x R$ {item.unitPrice.toFixed(2)}
                              </p>
                            </div>
                            <p className="font-bold">R$ {item.total.toFixed(2)}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Totals */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-semibold">R$ {totals.subtotal.toFixed(2)}</span>
                      </div>
                      {discountApplied && (
                        <div className="flex justify-between text-sm text-success">
                          <span className="flex items-center gap-1.5">
                            <Tag className="h-3.5 w-3.5" />
                            Desconto (10%)
                          </span>
                          <span className="font-semibold">- R$ {totals.discount.toFixed(2)}</span>
                        </div>
                      )}
                      <Separator />
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-lg font-bold">Total</span>
                        <span className="text-3xl font-black bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
                          R$ {totals.total.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <Separator />

                    {/* Payment Info */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Método de Pagamento</span>
                        <span className="font-semibold flex items-center gap-2">
                          {currentPaymentMethod && (
                            <>
                              <currentPaymentMethod.icon className={cn("h-4 w-4", currentPaymentMethod.color)} />
                              {currentPaymentMethod.label}
                            </>
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">
                          {installments > 1 ? "Primeira Parcela" : "Vencimento"}
                        </span>
                        <span className="font-semibold">{dueDate}</span>
                      </div>
                    </div>

                    {/* Installments Info - Only for Credit */}
                    {paymentMethod === "credit" && installments > 1 && (
                      <>
                        <Separator />
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <p className="text-xs font-semibold text-muted-foreground flex items-center gap-2">
                              <CalendarDays className="h-3.5 w-3.5" />
                              PARCELAMENTO
                            </p>
                            <Badge variant="outline" className="text-xs">
                              {installments}x parcelas
                            </Badge>
                          </div>
                          
                          <div className="space-y-3">
                            <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-muted-foreground">Valor de cada parcela</span>
                                <span className="text-xl font-bold text-primary">
                                  R$ {totals.installmentValue.toFixed(2)}
                                </span>
                              </div>
                              <div className="flex items-center justify-between text-xs pt-2 border-t border-primary/20">
                                <span className="text-muted-foreground">Total parcelado</span>
                                <span className="font-semibold">
                                  {installments}x de R$ {totals.installmentValue.toFixed(2)}
                                </span>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div className="p-2.5 bg-muted/30 rounded">
                                <p className="text-muted-foreground mb-1">Primeira parcela</p>
                                <p className="font-semibold">
                                  {new Date(installmentDates[0]).toLocaleDateString('pt-BR')}
                                </p>
                              </div>
                              <div className="p-2.5 bg-muted/30 rounded">
                                <p className="text-muted-foreground mb-1">Última parcela</p>
                                <p className="font-semibold">
                                  {new Date(installmentDates[installmentDates.length - 1]).toLocaleDateString('pt-BR')}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {observations && (
                      <>
                        <Separator />
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground mb-2">OBSERVAÇÕES</p>
                          <p className="text-sm text-muted-foreground">{observations}</p>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Receipt Footer */}
                  <div className="p-6 bg-muted/30 border-t border-border text-center">
                    <p className="text-xs text-muted-foreground">
                      Documento gerado eletronicamente em {new Date().toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-border p-4 bg-background flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
            <div className="text-left">
              <p className="text-xs text-muted-foreground">
                {paymentMethod === "credit" && installments > 1 ? `Total (${installments}x)` : "Total da Cobrança"}
              </p>
              <p className="text-xl md:text-2xl font-black bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
                R$ {totals.total.toFixed(2)}
              </p>
              {paymentMethod === "credit" && installments > 1 && (
                <p className="text-xs text-muted-foreground mt-0.5">
                  {installments}x de R$ {totals.installmentValue.toFixed(2)}
                </p>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {discountApplied && (
                <Badge variant="outline" className="text-success border-success/20">
                  <Tag className="h-3 w-3 mr-1" />
                  10% OFF
                </Badge>
              )}
              {paymentMethod === "credit" && installments > 1 && (
                <Badge variant="outline" className="text-primary border-primary/20">
                  <CalendarDays className="h-3 w-3 mr-1" />
                  {installments}x
                </Badge>
              )}
            </div>
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
              className="flex-1 sm:flex-none sm:min-w-[120px]"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleRegisterPayment}
              disabled={loading || items.some(i => !i.description || i.total === 0)}
              className="flex-1 sm:flex-none sm:min-w-[200px] gap-2 shadow-xl bg-gradient-to-r from-primary to-primary-glow hover:shadow-2xl hover:scale-105 transition-all"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processando
                </div>
              ) : (
                <>
                  <Receipt className="h-4 w-4" />
                  Registrar Pagamento
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
