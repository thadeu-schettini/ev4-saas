import { useState, useEffect } from "react";
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
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Ticket,
  Percent,
  DollarSign,
  Calendar as CalendarIcon,
  ShoppingCart,
  CreditCard,
  Clock,
  RefreshCw,
  Infinity,
  Users,
  Sparkles,
  Zap,
  Save,
} from "lucide-react";

interface Coupon {
  id: string;
  code: string;
  name: string;
  description: string;
  scope: string;
  type: string;
  percentOff: number | null;
  amountOffCents: number | null;
  duration: string;
  durationInMonths: number | null;
  currency: string;
  validFrom: Date;
  validTo: Date | null;
  active: boolean;
  maxRedemptions: number | null;
  maxPerCustomer: number;
  currentRedemptions: number;
  totalSavings: number;
  uniqueCustomers: number;
  partnerId: string | null;
}

interface CouponEditModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  coupon: Coupon | null;
}

const mockPartners = [
  { id: "1", name: "Dr. Carlos Mendes" },
  { id: "2", name: "Maria Influencer" },
  { id: "3", name: "João Silva" },
];

export const CouponEditModal = ({ open, onOpenChange, coupon }: CouponEditModalProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [scope, setScope] = useState<"CLINIC_CHECKOUT" | "SUBSCRIPTION">("CLINIC_CHECKOUT");
  const [type, setType] = useState<"PERCENT" | "FIXED">("PERCENT");
  const [percentOff, setPercentOff] = useState("");
  const [amountOff, setAmountOff] = useState("");
  const [duration, setDuration] = useState<"ONCE" | "REPEATING" | "FOREVER">("ONCE");
  const [durationInMonths, setDurationInMonths] = useState("");
  const [validFrom, setValidFrom] = useState<Date>();
  const [validTo, setValidTo] = useState<Date>();
  const [active, setActive] = useState(true);
  const [selectedPartner, setSelectedPartner] = useState("");
  const [maxRedemptions, setMaxRedemptions] = useState("");
  const [maxPerCustomer, setMaxPerCustomer] = useState("");

  useEffect(() => {
    if (coupon) {
      setName(coupon.name);
      setDescription(coupon.description || "");
      setScope(coupon.scope as "CLINIC_CHECKOUT" | "SUBSCRIPTION");
      setType(coupon.type as "PERCENT" | "FIXED");
      setPercentOff(coupon.percentOff?.toString() || "");
      setAmountOff(coupon.amountOffCents ? (coupon.amountOffCents / 100).toString() : "");
      setDuration(coupon.duration as "ONCE" | "REPEATING" | "FOREVER");
      setDurationInMonths(coupon.durationInMonths?.toString() || "");
      setValidFrom(coupon.validFrom);
      setValidTo(coupon.validTo || undefined);
      setActive(coupon.active);
      setSelectedPartner(coupon.partnerId || "");
      setMaxRedemptions(coupon.maxRedemptions?.toString() || "");
      setMaxPerCustomer(coupon.maxPerCustomer?.toString() || "");
    }
  }, [coupon]);

  if (!coupon) return null;

  const handleSave = () => {
    console.log("Saving coupon:", { name, description, scope, type, percentOff, amountOff, duration, durationInMonths, validFrom, validTo, active, selectedPartner, maxRedemptions, maxPerCustomer });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Ticket className="h-5 w-5 text-primary" />
            </div>
            <div>
              <span>Editar Cupom</span>
              <code className="ml-2 px-2 py-0.5 rounded bg-muted text-sm font-mono">{coupon.code}</code>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Active Toggle */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
            <div className="flex items-center gap-3">
              <Zap className="h-5 w-5 text-amber-500" />
              <div>
                <p className="font-medium">Status do Cupom</p>
                <p className="text-xs text-muted-foreground">Ativar ou desativar o cupom</p>
              </div>
            </div>
            <Switch checked={active} onCheckedChange={setActive} className="data-[state=checked]:bg-emerald-500" />
          </div>

          {/* Name & Description */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Nome do Cupom</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Descrição</Label>
              <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} />
            </div>
          </div>

          {/* Discount */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Tipo de Desconto</Label>
              <Tabs value={type} onValueChange={(v) => setType(v as "PERCENT" | "FIXED")}>
                <TabsList className="grid grid-cols-2 w-full">
                  <TabsTrigger value="PERCENT"><Percent className="h-4 w-4 mr-1" />%</TabsTrigger>
                  <TabsTrigger value="FIXED"><DollarSign className="h-4 w-4 mr-1" />R$</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="space-y-2">
              <Label>Valor</Label>
              {type === "PERCENT" ? (
                <Input type="number" min="1" max="100" value={percentOff} onChange={(e) => setPercentOff(e.target.value)} placeholder="20" />
              ) : (
                <Input type="number" min="0.01" step="0.01" value={amountOff} onChange={(e) => setAmountOff(e.target.value)} placeholder="50.00" />
              )}
            </div>
          </div>

          {/* Validity */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Início</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("w-full justify-start", !validFrom && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {validFrom ? format(validFrom, "dd/MM/yyyy", { locale: ptBR }) : "Selecionar"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={validFrom} onSelect={setValidFrom} locale={ptBR} /></PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label>Fim</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("w-full justify-start", !validTo && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {validTo ? format(validTo, "dd/MM/yyyy", { locale: ptBR }) : "Sem limite"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={validTo} onSelect={setValidTo} locale={ptBR} /></PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Limits */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Limite Total</Label>
              <Input type="number" min="1" value={maxRedemptions} onChange={(e) => setMaxRedemptions(e.target.value)} placeholder="Ilimitado" />
            </div>
            <div className="space-y-2">
              <Label>Por Cliente</Label>
              <Input type="number" min="1" value={maxPerCustomer} onChange={(e) => setMaxPerCustomer(e.target.value)} placeholder="1" />
            </div>
          </div>

          {/* Partner */}
          <div className="space-y-2">
            <Label>Parceiro Vinculado</Label>
            <Select value={selectedPartner} onValueChange={setSelectedPartner}>
              <SelectTrigger><SelectValue placeholder="Nenhum parceiro" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Nenhum</SelectItem>
                {mockPartners.map((p) => (<SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button onClick={handleSave} className="gap-2"><Save className="h-4 w-4" />Salvar Alterações</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
