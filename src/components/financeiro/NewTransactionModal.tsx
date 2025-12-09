import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { 
  CalendarIcon, 
  ArrowUpRight, 
  ArrowDownRight,
  X,
  Receipt,
  User,
  FileText,
  CreditCard,
  Repeat,
  Tag
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface NewTransactionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const categories = {
  receita: [
    { value: "consulta", label: "Consulta" },
    { value: "retorno", label: "Retorno" },
    { value: "exame", label: "Exame" },
    { value: "procedimento", label: "Procedimento" },
    { value: "outros", label: "Outros" },
  ],
  despesa: [
    { value: "aluguel", label: "Aluguel" },
    { value: "salarios", label: "Salários" },
    { value: "materiais", label: "Materiais" },
    { value: "equipamentos", label: "Equipamentos" },
    { value: "contas", label: "Contas (luz, água, internet)" },
    { value: "marketing", label: "Marketing" },
    { value: "manutencao", label: "Manutenção" },
    { value: "outros", label: "Outros" },
  ],
};

const paymentMethods = [
  { value: "dinheiro", label: "Dinheiro" },
  { value: "pix", label: "PIX" },
  { value: "credito", label: "Cartão de Crédito" },
  { value: "debito", label: "Cartão de Débito" },
  { value: "transferencia", label: "Transferência Bancária" },
  { value: "boleto", label: "Boleto" },
];

const patients = [
  { value: "maria-silva", label: "Maria Silva" },
  { value: "joao-santos", label: "João Santos" },
  { value: "ana-costa", label: "Ana Costa" },
  { value: "carlos-lima", label: "Carlos Lima" },
  { value: "pedro-oliveira", label: "Pedro Oliveira" },
];

export function NewTransactionModal({ open, onOpenChange }: NewTransactionModalProps) {
  const [type, setType] = useState<"receita" | "despesa">("receita");
  const [date, setDate] = useState<Date>(new Date());
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [patient, setPatient] = useState("");
  const [notes, setNotes] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurringFrequency, setRecurringFrequency] = useState("");
  const [isInstallment, setIsInstallment] = useState(false);
  const [installments, setInstallments] = useState("1");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description.trim()) {
      toast.error("Preencha a descrição da transação");
      return;
    }
    
    if (!value || parseFloat(value) <= 0) {
      toast.error("Informe um valor válido");
      return;
    }
    
    if (!category) {
      toast.error("Selecione uma categoria");
      return;
    }
    
    if (!paymentMethod) {
      toast.error("Selecione a forma de pagamento");
      return;
    }

    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success(
      type === "receita" 
        ? "Receita registrada com sucesso!" 
        : "Despesa registrada com sucesso!"
    );
    
    // Reset form
    setDescription("");
    setValue("");
    setCategory("");
    setPaymentMethod("");
    setPatient("");
    setNotes("");
    setIsRecurring(false);
    setRecurringFrequency("");
    setIsInstallment(false);
    setInstallments("1");
    setLoading(false);
    onOpenChange(false);
  };

  const resetForm = () => {
    setDescription("");
    setValue("");
    setCategory("");
    setPaymentMethod("");
    setPatient("");
    setNotes("");
    setIsRecurring(false);
    setRecurringFrequency("");
    setIsInstallment(false);
    setInstallments("1");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Receipt className="h-5 w-5" />
            Nova Transação
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Transaction Type Toggle */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => { setType("receita"); resetForm(); }}
              className={cn(
                "flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all duration-200",
                type === "receita"
                  ? "border-emerald-500 bg-emerald-500/10 text-emerald-600"
                  : "border-border hover:border-emerald-500/50 hover:bg-emerald-500/5"
              )}
            >
              <div className={cn(
                "h-10 w-10 rounded-full flex items-center justify-center",
                type === "receita" ? "bg-emerald-500/20" : "bg-muted"
              )}>
                <ArrowUpRight className="h-5 w-5" />
              </div>
              <div className="text-left">
                <p className="font-semibold">Receita</p>
                <p className="text-xs text-muted-foreground">Entrada de dinheiro</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => { setType("despesa"); resetForm(); }}
              className={cn(
                "flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all duration-200",
                type === "despesa"
                  ? "border-red-500 bg-red-500/10 text-red-600"
                  : "border-border hover:border-red-500/50 hover:bg-red-500/5"
              )}
            >
              <div className={cn(
                "h-10 w-10 rounded-full flex items-center justify-center",
                type === "despesa" ? "bg-red-500/20" : "bg-muted"
              )}>
                <ArrowDownRight className="h-5 w-5" />
              </div>
              <div className="text-left">
                <p className="font-semibold">Despesa</p>
                <p className="text-xs text-muted-foreground">Saída de dinheiro</p>
              </div>
            </button>
          </div>

          {/* Main Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Description */}
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="description" className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                Descrição *
              </Label>
              <Input
                id="description"
                placeholder={type === "receita" ? "Ex: Consulta - Paciente X" : "Ex: Conta de luz"}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={200}
              />
            </div>

            {/* Value */}
            <div className="space-y-2">
              <Label htmlFor="value">Valor (R$) *</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  R$
                </span>
                <Input
                  id="value"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0,00"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Date */}
            <div className="space-y-2">
              <Label>Data *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "dd/MM/yyyy", { locale: ptBR }) : "Selecione a data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(d) => d && setDate(d)}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-muted-foreground" />
                Categoria *
              </Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories[type].map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Payment Method */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                Forma de Pagamento *
              </Label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {paymentMethods.map((method) => (
                    <SelectItem key={method.value} value={method.value}>
                      {method.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Patient (only for receita) */}
            {type === "receita" && (
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  Paciente
                </Label>
                <Select value={patient} onValueChange={setPatient}>
                  <SelectTrigger>
                    <SelectValue placeholder="Vincular a paciente" />
                  </SelectTrigger>
                  <SelectContent>
                    {patients.map((p) => (
                      <SelectItem key={p.value} value={p.value}>
                        {p.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Installments (only for credito) */}
            {paymentMethod === "credito" && (
              <div className="md:col-span-2 space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-sm">Parcelar pagamento</p>
                      <p className="text-xs text-muted-foreground">Dividir em múltiplas parcelas</p>
                    </div>
                  </div>
                  <Switch
                    checked={isInstallment}
                    onCheckedChange={setIsInstallment}
                  />
                </div>
                
                {isInstallment && (
                  <div className="grid grid-cols-2 gap-4 pl-4 border-l-2 border-primary/30">
                    <div className="space-y-2">
                      <Label>Número de Parcelas</Label>
                      <Select value={installments} onValueChange={setInstallments}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num}x de R$ {value ? (parseFloat(value) / num).toFixed(2) : "0,00"}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-end">
                      <div className="p-3 rounded-lg bg-primary/10 text-primary w-full text-center">
                        <p className="text-xs text-muted-foreground">Valor da parcela</p>
                        <p className="font-bold text-lg">
                          R$ {value ? (parseFloat(value) / parseInt(installments)).toFixed(2) : "0,00"}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Recurring Transaction */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border">
                <div className="flex items-center gap-3">
                  <Repeat className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-sm">Transação recorrente</p>
                    <p className="text-xs text-muted-foreground">Repetir automaticamente</p>
                  </div>
                </div>
                <Switch
                  checked={isRecurring}
                  onCheckedChange={setIsRecurring}
                />
              </div>
              
              {isRecurring && (
                <div className="pl-4 border-l-2 border-primary/30">
                  <Label>Frequência</Label>
                  <Select value={recurringFrequency} onValueChange={setRecurringFrequency}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Selecione a frequência" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Semanal</SelectItem>
                      <SelectItem value="biweekly">Quinzenal</SelectItem>
                      <SelectItem value="monthly">Mensal</SelectItem>
                      <SelectItem value="quarterly">Trimestral</SelectItem>
                      <SelectItem value="yearly">Anual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            {/* Notes */}
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="notes">Observações</Label>
              <Textarea
                id="notes"
                placeholder="Anotações adicionais sobre a transação..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                maxLength={500}
              />
            </div>
          </div>

          {/* Summary Card */}
          {value && parseFloat(value) > 0 && (
            <div className={cn(
              "p-4 rounded-xl border-2",
              type === "receita" 
                ? "border-emerald-500/30 bg-emerald-500/5" 
                : "border-red-500/30 bg-red-500/5"
            )}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {type === "receita" ? "Valor a receber" : "Valor a pagar"}
                  </p>
                  <p className={cn(
                    "text-2xl font-bold",
                    type === "receita" ? "text-emerald-600" : "text-red-600"
                  )}>
                    {type === "receita" ? "+" : "-"}R$ {parseFloat(value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <div className={cn(
                  "h-12 w-12 rounded-full flex items-center justify-center",
                  type === "receita" ? "bg-emerald-500/20" : "bg-red-500/20"
                )}>
                  {type === "receita" ? (
                    <ArrowUpRight className={cn("h-6 w-6", type === "receita" ? "text-emerald-600" : "text-red-600")} />
                  ) : (
                    <ArrowDownRight className="h-6 w-6 text-red-600" />
                  )}
                </div>
              </div>
              {isInstallment && paymentMethod === "credito" && (
                <p className="text-sm text-muted-foreground mt-2">
                  {installments}x de R$ {(parseFloat(value) / parseInt(installments)).toFixed(2)}
                </p>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              disabled={loading}
              className={cn(
                type === "receita" 
                  ? "bg-emerald-600 hover:bg-emerald-700" 
                  : "bg-red-600 hover:bg-red-700"
              )}
            >
              {loading ? "Salvando..." : `Registrar ${type === "receita" ? "Receita" : "Despesa"}`}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
