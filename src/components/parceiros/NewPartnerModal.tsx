import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  Users,
  Percent,
  DollarSign,
  Building2,
  Star,
  User,
  CheckCircle2,
  Sparkles,
  Zap,
  Mail,
  Phone,
  Globe,
  Ticket,
  Link2,
  Copy,
  QrCode,
} from "lucide-react";

interface NewPartnerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const mockCoupons = [
  { id: "1", code: "WELCOME20", name: "Boas-vindas 20%" },
  { id: "2", code: "FIDELIDADE50", name: "Fidelidade Premium" },
  { id: "3", code: "PARCEIRO10", name: "Parceiro Exclusivo" },
];

export const NewPartnerModal = ({ open, onOpenChange }: NewPartnerModalProps) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [type, setType] = useState<"INDIVIDUAL" | "CLINIC" | "INFLUENCER" | "COMPANY">("INDIVIDUAL");
  const [commissionType, setCommissionType] = useState<"PERCENT" | "FIXED">("PERCENT");
  const [commissionRate, setCommissionRate] = useState("");
  const [fixedCommission, setFixedCommission] = useState("");
  const [selectedCoupons, setSelectedCoupons] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [sendInvite, setSendInvite] = useState(true);

  const toggleCoupon = (couponId: string) => {
    setSelectedCoupons((prev) =>
      prev.includes(couponId)
        ? prev.filter((id) => id !== couponId)
        : [...prev, couponId]
    );
  };

  const handleCreate = () => {
    console.log("Creating partner:", {
      name,
      email,
      phone,
      company,
      website,
      type,
      commissionType,
      commissionRate,
      fixedCommission,
      selectedCoupons,
      notes,
      sendInvite,
    });
    onOpenChange(false);
    resetForm();
  };

  const resetForm = () => {
    setStep(1);
    setName("");
    setEmail("");
    setPhone("");
    setCompany("");
    setWebsite("");
    setType("INDIVIDUAL");
    setCommissionType("PERCENT");
    setCommissionRate("");
    setFixedCommission("");
    setSelectedCoupons([]);
    setNotes("");
    setSendInvite(true);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <span>Novo Parceiro Afiliado</span>
              <DialogDescription className="font-normal mt-0.5">
                Cadastre um novo parceiro e defina as regras de comissão
              </DialogDescription>
            </div>
          </DialogTitle>
        </DialogHeader>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-6 px-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={cn(
                  "h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium transition-all",
                  step >= s
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {step > s ? <CheckCircle2 className="h-4 w-4" /> : s}
              </div>
              <span
                className={cn(
                  "ml-2 text-sm hidden sm:inline",
                  step >= s ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {s === 1 && "Dados"}
                {s === 2 && "Comissão"}
                {s === 3 && "Cupons"}
              </span>
              {s < 3 && (
                <div
                  className={cn(
                    "h-0.5 w-12 mx-4 rounded-full transition-all",
                    step > s ? "bg-primary" : "bg-muted"
                  )}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className="space-y-6">
            {/* Partner Type */}
            <div className="space-y-3">
              <Label>Tipo de Parceiro</Label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "INDIVIDUAL", label: "Individual", icon: User, desc: "Pessoa física" },
                  { value: "CLINIC", label: "Clínica", icon: Building2, desc: "Parceria clínica" },
                  { value: "INFLUENCER", label: "Influencer", icon: Star, desc: "Criador de conteúdo" },
                  { value: "COMPANY", label: "Empresa", icon: Building2, desc: "Parceria corporativa" },
                ].map((item) => (
                  <div
                    key={item.value}
                    className={cn(
                      "p-4 rounded-xl border-2 cursor-pointer transition-all",
                      type === item.value
                        ? "border-primary bg-primary/5"
                        : "border-muted hover:border-muted-foreground/20"
                    )}
                    onClick={() => setType(item.value as any)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "h-10 w-10 rounded-lg flex items-center justify-center",
                        type === item.value ? "bg-primary/10" : "bg-muted"
                      )}>
                        <item.icon className={cn(
                          "h-5 w-5",
                          type === item.value ? "text-primary" : "text-muted-foreground"
                        )} />
                      </div>
                      <div>
                        <p className="font-medium">{item.label}</p>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo *</Label>
              <Input
                id="name"
                placeholder="Nome do parceiro"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="parceiro@email.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    placeholder="(11) 99999-9999"
                    className="pl-10"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Company & Website */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Empresa</Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="company"
                    placeholder="Nome da empresa"
                    className="pl-10"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="website"
                    placeholder="https://..."
                    className="pl-10"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Send Invite */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
              <div className="flex items-center gap-3">
                <Zap className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Enviar convite por e-mail</p>
                  <p className="text-xs text-muted-foreground">O parceiro receberá acesso ao portal</p>
                </div>
              </div>
              <Switch
                checked={sendInvite}
                onCheckedChange={setSendInvite}
                className="data-[state=checked]:bg-primary"
              />
            </div>
          </div>
        )}

        {/* Step 2: Commission */}
        {step === 2 && (
          <div className="space-y-6">
            {/* Commission Type */}
            <div className="space-y-3">
              <Label>Tipo de Comissão</Label>
              <Tabs value={commissionType} onValueChange={(v) => setCommissionType(v as "PERCENT" | "FIXED")}>
                <TabsList className="grid grid-cols-2 w-full">
                  <TabsTrigger value="PERCENT" className="gap-2">
                    <Percent className="h-4 w-4" />
                    Percentual
                  </TabsTrigger>
                  <TabsTrigger value="FIXED" className="gap-2">
                    <DollarSign className="h-4 w-4" />
                    Valor Fixo
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Commission Value */}
            <div className="space-y-2">
              <Label>{commissionType === "PERCENT" ? "Percentual de Comissão" : "Valor por Indicação"}</Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {commissionType === "PERCENT" ? "%" : "R$"}
                </div>
                {commissionType === "PERCENT" ? (
                  <Input
                    type="number"
                    min="1"
                    max="50"
                    placeholder="15"
                    value={commissionRate}
                    onChange={(e) => setCommissionRate(e.target.value)}
                    className="pl-10 text-2xl font-bold h-14"
                  />
                ) : (
                  <Input
                    type="number"
                    min="0.01"
                    step="0.01"
                    placeholder="50.00"
                    value={fixedCommission}
                    onChange={(e) => setFixedCommission(e.target.value)}
                    className="pl-10 text-2xl font-bold h-14"
                  />
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {commissionType === "PERCENT"
                  ? "O parceiro receberá esse percentual do valor de cada indicação convertida"
                  : "O parceiro receberá esse valor fixo por cada indicação convertida"}
              </p>
            </div>

            {/* Commission Tiers Preview */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-primary/5 to-transparent border">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-4 w-4 text-primary" />
                <p className="font-medium">Sistema de Tiers</p>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Parceiros podem subir de nível com base no volume de indicações
              </p>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { tier: "Bronze", min: "0-24", bonus: "+0%" },
                  { tier: "Prata", min: "25-49", bonus: "+2%" },
                  { tier: "Ouro", min: "50-99", bonus: "+5%" },
                  { tier: "Platina", min: "100+", bonus: "+10%" },
                ].map((t) => (
                  <div key={t.tier} className="text-center p-2 rounded-lg bg-background">
                    <p className="text-xs font-medium">{t.tier}</p>
                    <p className="text-xs text-muted-foreground">{t.min}</p>
                    <Badge variant="secondary" className="mt-1 text-xs">{t.bonus}</Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Observações</Label>
              <Textarea
                id="notes"
                placeholder="Notas sobre o acordo com este parceiro..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>
          </div>
        )}

        {/* Step 3: Link Coupons */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="space-y-3">
              <Label>Vincular Cupons</Label>
              <p className="text-sm text-muted-foreground">
                Selecione os cupons que serão associados a este parceiro para tracking de indicações
              </p>

              <div className="space-y-2">
                {mockCoupons.map((coupon) => (
                  <div
                    key={coupon.id}
                    className={cn(
                      "p-4 rounded-xl border-2 cursor-pointer transition-all",
                      selectedCoupons.includes(coupon.id)
                        ? "border-primary bg-primary/5"
                        : "border-muted hover:border-muted-foreground/20"
                    )}
                    onClick={() => toggleCoupon(coupon.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "h-10 w-10 rounded-lg flex items-center justify-center",
                          selectedCoupons.includes(coupon.id) ? "bg-primary/10" : "bg-muted"
                        )}>
                          <Ticket className={cn(
                            "h-5 w-5",
                            selectedCoupons.includes(coupon.id) ? "text-primary" : "text-muted-foreground"
                          )} />
                        </div>
                        <div>
                          <code className="font-mono font-bold">{coupon.code}</code>
                          <p className="text-sm text-muted-foreground">{coupon.name}</p>
                        </div>
                      </div>
                      {selectedCoupons.includes(coupon.id) && (
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Referral Link Preview */}
            <div className="p-4 rounded-xl bg-muted/50 space-y-3">
              <div className="flex items-center gap-2">
                <Link2 className="h-4 w-4 text-muted-foreground" />
                <Label>Link de Indicação</Label>
              </div>
              <div className="flex gap-2">
                <Input
                  readOnly
                  value={`https://clinica.com/r/${name ? name.toLowerCase().replace(/\s+/g, "-") : "parceiro"}`}
                  className="font-mono text-sm"
                />
                <Button variant="outline" size="icon">
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <QrCode className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Este link será gerado automaticamente após o cadastro
              </p>
            </div>

            {/* Summary */}
            <div className="p-4 rounded-xl border bg-gradient-to-br from-emerald-50 to-transparent dark:from-emerald-950/20">
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Resumo do Cadastro
              </h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Parceiro:</span>
                  <p className="font-medium">{name || "-"}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Tipo:</span>
                  <p className="font-medium">{type}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Comissão:</span>
                  <p className="font-medium">
                    {commissionType === "PERCENT"
                      ? `${commissionRate || 0}%`
                      : `R$ ${fixedCommission || "0,00"}`}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Cupons:</span>
                  <p className="font-medium">{selectedCoupons.length} vinculados</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between pt-4 border-t">
          <Button
            variant="outline"
            onClick={() => step > 1 ? setStep(step - 1) : onOpenChange(false)}
          >
            {step > 1 ? "Voltar" : "Cancelar"}
          </Button>
          <Button
            onClick={() => step < 3 ? setStep(step + 1) : handleCreate()}
            className="gap-2"
          >
            {step < 3 ? "Continuar" : "Criar Parceiro"}
            {step === 3 && <Sparkles className="h-4 w-4" />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
