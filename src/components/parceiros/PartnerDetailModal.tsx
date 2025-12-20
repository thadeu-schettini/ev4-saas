import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Users,
  Copy,
  Edit,
  MoreHorizontal,
  TrendingUp,
  DollarSign,
  Percent,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  Target,
  Zap,
  Mail,
  Phone,
  Globe,
  Building2,
  Star,
  Wallet,
  Send,
  Download,
  FileText,
  Receipt,
  ArrowUpRight,
  ArrowDownRight,
  Ticket,
  Link2,
  QrCode,
  ExternalLink,
  TrendingDown,
  UserPlus,
  Eye,
  Ban,
  Printer,
  Share2,
  BarChart3,
  HandCoins,
  Banknote,
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Partner {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string | null;
  type: string;
  status: string;
  avatar: string | null;
  commissionRate: number | null;
  commissionType: string;
  fixedCommission: number | null;
  totalEarnings: number;
  pendingEarnings: number;
  paidEarnings: number;
  totalReferrals: number;
  activeReferrals: number;
  conversionRate: number;
  couponsLinked: number;
  createdAt: Date;
  lastPayoutAt: Date | null;
  tier: string;
}

interface PartnerDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  partner: Partner | null;
}

// Mock commission history
const mockCommissions = [
  {
    id: "1",
    date: new Date("2024-12-15"),
    type: "REFERRAL",
    description: "Indicação convertida - Maria Silva",
    couponCode: "PARCEIRO10",
    baseValue: 50000,
    commissionValue: 7500,
    status: "PENDING",
  },
  {
    id: "2",
    date: new Date("2024-12-12"),
    type: "REFERRAL",
    description: "Indicação convertida - João Santos",
    couponCode: "WELCOME20",
    baseValue: 35000,
    commissionValue: 5250,
    status: "PENDING",
  },
  {
    id: "3",
    date: new Date("2024-12-10"),
    type: "BONUS",
    description: "Bônus tier Gold atingido",
    couponCode: null,
    baseValue: 0,
    commissionValue: 10000,
    status: "PAID",
  },
  {
    id: "4",
    date: new Date("2024-12-05"),
    type: "REFERRAL",
    description: "Indicação convertida - Ana Oliveira",
    couponCode: "PARCEIRO10",
    baseValue: 45000,
    commissionValue: 6750,
    status: "PAID",
  },
  {
    id: "5",
    date: new Date("2024-12-01"),
    type: "PAYOUT",
    description: "Payout processado via PIX",
    couponCode: null,
    baseValue: 0,
    commissionValue: -85000,
    status: "PAID",
  },
];

// Mock linked coupons
const mockLinkedCoupons = [
  {
    id: "1",
    code: "PARCEIRO10",
    name: "Parceiro Exclusivo",
    redemptions: 45,
    revenue: 125000,
    active: true,
  },
  {
    id: "2",
    code: "WELCOME20",
    name: "Boas-vindas 20%",
    redemptions: 23,
    revenue: 67500,
    active: true,
  },
  {
    id: "3",
    code: "FIDELIDADE50",
    name: "Fidelidade Premium",
    redemptions: 12,
    revenue: 35000,
    active: false,
  },
];

// Mock payouts
const mockPayouts = [
  {
    id: "1",
    date: new Date("2024-12-01"),
    amount: 85000,
    method: "PIX",
    reference: "PIX-2024120001",
    status: "COMPLETED",
  },
  {
    id: "2",
    date: new Date("2024-11-01"),
    amount: 72000,
    method: "PIX",
    reference: "PIX-2024110001",
    status: "COMPLETED",
  },
  {
    id: "3",
    date: new Date("2024-10-01"),
    amount: 58000,
    method: "TED",
    reference: "TED-2024100001",
    status: "COMPLETED",
  },
];

export const PartnerDetailModal = ({ open, onOpenChange, partner }: PartnerDetailModalProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isActive, setIsActive] = useState(partner?.status === "ACTIVE");

  if (!partner) return null;

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case "PLATINUM":
        return (
          <Badge className="bg-gradient-to-r from-slate-300 via-slate-100 to-slate-300 text-slate-800 border-slate-300 gap-1">
            <Star className="h-3 w-3 fill-current" />
            Platina
          </Badge>
        );
      case "GOLD":
        return (
          <Badge className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 text-amber-900 border-amber-400 gap-1">
            <Star className="h-3 w-3 fill-current" />
            Ouro
          </Badge>
        );
      case "SILVER":
        return (
          <Badge className="bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 text-gray-700 border-gray-300 gap-1">
            <Star className="h-3 w-3 fill-current" />
            Prata
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gradient-to-r from-orange-300 via-orange-200 to-orange-300 text-orange-800 border-orange-300 gap-1">
            <Star className="h-3 w-3 fill-current" />
            Bronze
          </Badge>
        );
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "CLINIC":
        return <Badge variant="outline" className="gap-1"><Building2 className="h-3 w-3" />Clínica</Badge>;
      case "INFLUENCER":
        return <Badge variant="outline" className="gap-1"><Star className="h-3 w-3" />Influencer</Badge>;
      case "COMPANY":
        return <Badge variant="outline" className="gap-1"><Building2 className="h-3 w-3" />Empresa</Badge>;
      default:
        return <Badge variant="outline" className="gap-1"><Users className="h-3 w-3" />Individual</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return <Badge className="bg-amber-500/10 text-amber-600 border-amber-200">Pendente</Badge>;
      case "PAID":
        return <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-200">Pago</Badge>;
      case "COMPLETED":
        return <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-200">Concluído</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const tierProgress = partner.tier === "PLATINUM" ? 100 
    : partner.tier === "GOLD" ? 75 
    : partner.tier === "SILVER" ? 50 
    : 25;

  const nextTierReferrals = partner.tier === "BRONZE" ? 25 
    : partner.tier === "SILVER" ? 50 
    : partner.tier === "GOLD" ? 100 
    : 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] p-0 overflow-hidden">
        {/* Header with Gradient */}
        <div className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 border-b">
          <div className="absolute inset-0 bg-grid-primary/5 [mask-image:linear-gradient(0deg,transparent,black)]" />
          
          <div className="relative flex items-start justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20 ring-4 ring-primary/10">
                <AvatarImage src={partner.avatar || undefined} />
                <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
                  {partner.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-semibold">{partner.name}</h2>
                  {getTierBadge(partner.tier)}
                  {getTypeBadge(partner.type)}
                </div>
                {partner.company && (
                  <p className="text-sm text-muted-foreground mt-0.5">{partner.company}</p>
                )}
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Mail className="h-3.5 w-3.5" />
                    {partner.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="h-3.5 w-3.5" />
                    {partner.phone}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-background rounded-lg px-3 py-2 border">
                <span className="text-sm text-muted-foreground">Status:</span>
                <Switch
                  checked={isActive}
                  onCheckedChange={setIsActive}
                  className="data-[state=checked]:bg-emerald-500"
                />
                <span className={`text-sm font-medium ${isActive ? "text-emerald-600" : "text-muted-foreground"}`}>
                  {isActive ? "Ativo" : "Inativo"}
                </span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="gap-2">
                    <Edit className="h-4 w-4" />
                    Editar
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2">
                    <Send className="h-4 w-4" />
                    Processar Payout
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2">
                    <Ticket className="h-4 w-4" />
                    Vincular Cupom
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2">
                    <Printer className="h-4 w-4" />
                    Imprimir Relatório
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-5 gap-4 mt-6">
            <div className="bg-background/80 backdrop-blur rounded-xl p-4 border">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <UserPlus className="h-4 w-4" />
                <span className="text-xs">Indicações</span>
              </div>
              <p className="text-2xl font-bold">{partner.totalReferrals}</p>
              <p className="text-xs text-muted-foreground">{partner.activeReferrals} ativos</p>
            </div>
            <div className="bg-background/80 backdrop-blur rounded-xl p-4 border">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <DollarSign className="h-4 w-4" />
                <span className="text-xs">Total Ganho</span>
              </div>
              <p className="text-2xl font-bold text-emerald-600">R$ {(partner.totalEarnings / 100).toLocaleString("pt-BR")}</p>
            </div>
            <div className="bg-background/80 backdrop-blur rounded-xl p-4 border">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Wallet className="h-4 w-4" />
                <span className="text-xs">Pendente</span>
              </div>
              <p className="text-2xl font-bold text-amber-600">R$ {(partner.pendingEarnings / 100).toLocaleString("pt-BR")}</p>
            </div>
            <div className="bg-background/80 backdrop-blur rounded-xl p-4 border">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Target className="h-4 w-4" />
                <span className="text-xs">Conversão</span>
              </div>
              <p className="text-2xl font-bold">{partner.conversionRate.toFixed(1)}%</p>
            </div>
            <div className="bg-background/80 backdrop-blur rounded-xl p-4 border">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                {partner.commissionType === "PERCENT" ? <Percent className="h-4 w-4" /> : <DollarSign className="h-4 w-4" />}
                <span className="text-xs">Comissão</span>
              </div>
              <p className="text-2xl font-bold">
                {partner.commissionType === "PERCENT" 
                  ? `${partner.commissionRate}%` 
                  : `R$ ${((partner.fixedCommission || 0) / 100).toFixed(2)}`}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
          <div className="border-b px-6">
            <TabsList className="h-12 bg-transparent p-0 gap-6">
              <TabsTrigger 
                value="overview" 
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-12 px-0"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Visão Geral
              </TabsTrigger>
              <TabsTrigger 
                value="commissions"
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-12 px-0"
              >
                <Receipt className="h-4 w-4 mr-2" />
                Extrato
              </TabsTrigger>
              <TabsTrigger 
                value="coupons"
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-12 px-0"
              >
                <Ticket className="h-4 w-4 mr-2" />
                Cupons
              </TabsTrigger>
              <TabsTrigger 
                value="payouts"
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-12 px-0"
              >
                <Banknote className="h-4 w-4 mr-2" />
                Payouts
              </TabsTrigger>
            </TabsList>
          </div>

          <ScrollArea className="h-[400px]">
            <div className="p-6">
              {/* Overview Tab */}
              <TabsContent value="overview" className="mt-0 space-y-6">
                {/* Tier Progress */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Star className="h-4 w-4 text-amber-500" />
                      Progresso de Tier
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Nível Atual</span>
                        {getTierBadge(partner.tier)}
                      </div>
                      <Progress value={tierProgress} className="h-3" />
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{partner.totalReferrals} indicações</span>
                        {nextTierReferrals > 0 && (
                          <span>{nextTierReferrals - partner.totalReferrals} para o próximo nível</span>
                        )}
                      </div>
                      <div className="grid grid-cols-4 gap-2 pt-2">
                        {[
                          { tier: "Bronze", min: 0, color: "bg-orange-200" },
                          { tier: "Prata", min: 25, color: "bg-gray-300" },
                          { tier: "Ouro", min: 50, color: "bg-amber-400" },
                          { tier: "Platina", min: 100, color: "bg-slate-300" },
                        ].map((t) => (
                          <div 
                            key={t.tier} 
                            className={`text-center p-2 rounded-lg ${
                              partner.totalReferrals >= t.min ? t.color : "bg-muted"
                            }`}
                          >
                            <p className="text-xs font-medium">{t.tier}</p>
                            <p className="text-xs opacity-70">{t.min}+ indicações</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Referral Link */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Link2 className="h-4 w-4" />
                      Link de Indicação
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Input
                        readOnly
                        value={`https://clinica.com/r/${partner.name.toLowerCase().replace(/\s+/g, "-")}`}
                        className="font-mono text-sm"
                      />
                      <Button variant="outline" size="icon">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <QrCode className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Informações</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Cadastro</span>
                        <span className="font-medium">
                          {format(partner.createdAt, "dd/MM/yyyy", { locale: ptBR })}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Último Payout</span>
                        <span className="font-medium">
                          {partner.lastPayoutAt 
                            ? format(partner.lastPayoutAt, "dd/MM/yyyy", { locale: ptBR })
                            : "Nunca"}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Cupons Ativos</span>
                        <span className="font-medium">{partner.couponsLinked}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Performance</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Média por indicação</span>
                        <span className="font-medium">
                          R$ {partner.totalReferrals > 0 
                            ? ((partner.totalEarnings / partner.totalReferrals) / 100).toFixed(2)
                            : "0,00"}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Este mês</span>
                        <span className="font-medium text-emerald-600 flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          +12 indicações
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Ranking</span>
                        <Badge variant="secondary">#3 do mês</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Commissions Tab */}
              <TabsContent value="commissions" className="mt-0">
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">Extrato de Comissões</CardTitle>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Download className="h-4 w-4" />
                        Exportar
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Data</TableHead>
                          <TableHead>Descrição</TableHead>
                          <TableHead>Cupom</TableHead>
                          <TableHead className="text-right">Base</TableHead>
                          <TableHead className="text-right">Comissão</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockCommissions.map((commission) => (
                          <TableRow key={commission.id}>
                            <TableCell className="font-medium">
                              {format(commission.date, "dd/MM/yyyy", { locale: ptBR })}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                {commission.type === "REFERRAL" && <UserPlus className="h-4 w-4 text-emerald-500" />}
                                {commission.type === "BONUS" && <Star className="h-4 w-4 text-amber-500" />}
                                {commission.type === "PAYOUT" && <Banknote className="h-4 w-4 text-blue-500" />}
                                <span className="text-sm">{commission.description}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              {commission.couponCode ? (
                                <code className="px-2 py-0.5 rounded bg-muted text-xs font-mono">
                                  {commission.couponCode}
                                </code>
                              ) : (
                                <span className="text-muted-foreground">-</span>
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              {commission.baseValue > 0 
                                ? `R$ ${(commission.baseValue / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`
                                : "-"}
                            </TableCell>
                            <TableCell className={`text-right font-medium ${
                              commission.commissionValue >= 0 ? "text-emerald-600" : "text-blue-600"
                            }`}>
                              {commission.commissionValue >= 0 ? "+" : ""}
                              R$ {(commission.commissionValue / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                            </TableCell>
                            <TableCell>
                              {getStatusBadge(commission.status)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Coupons Tab */}
              <TabsContent value="coupons" className="mt-0">
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">Cupons Vinculados</CardTitle>
                      <Button size="sm" className="gap-2">
                        <Ticket className="h-4 w-4" />
                        Vincular Cupom
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockLinkedCoupons.map((coupon) => (
                        <div 
                          key={coupon.id}
                          className="flex items-center justify-between p-4 rounded-xl border hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${
                              coupon.active ? "bg-primary/10" : "bg-muted"
                            }`}>
                              <Ticket className={`h-6 w-6 ${coupon.active ? "text-primary" : "text-muted-foreground"}`} />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <code className="font-mono font-bold">{coupon.code}</code>
                                {coupon.active ? (
                                  <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-200">Ativo</Badge>
                                ) : (
                                  <Badge variant="secondary">Inativo</Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">{coupon.name}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-6">
                            <div className="text-right">
                              <p className="text-lg font-bold">{coupon.redemptions}</p>
                              <p className="text-xs text-muted-foreground">resgates</p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-emerald-600">
                                R$ {(coupon.revenue / 100).toLocaleString("pt-BR")}
                              </p>
                              <p className="text-xs text-muted-foreground">receita</p>
                            </div>
                            <Button variant="ghost" size="icon">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Payouts Tab */}
              <TabsContent value="payouts" className="mt-0 space-y-4">
                {/* Pending Payout Alert */}
                {partner.pendingEarnings > 0 && (
                  <Card className="border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                            <HandCoins className="h-6 w-6 text-amber-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-amber-800 dark:text-amber-200">
                              Saldo disponível para payout
                            </h4>
                            <p className="text-2xl font-bold text-amber-600">
                              R$ {(partner.pendingEarnings / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                            </p>
                          </div>
                        </div>
                        <Button className="bg-amber-600 hover:bg-amber-700 text-white gap-2">
                          <Send className="h-4 w-4" />
                          Processar Payout
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Histórico de Payouts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Data</TableHead>
                          <TableHead>Referência</TableHead>
                          <TableHead>Método</TableHead>
                          <TableHead className="text-right">Valor</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockPayouts.map((payout) => (
                          <TableRow key={payout.id}>
                            <TableCell className="font-medium">
                              {format(payout.date, "dd/MM/yyyy", { locale: ptBR })}
                            </TableCell>
                            <TableCell>
                              <code className="text-xs font-mono bg-muted px-2 py-0.5 rounded">
                                {payout.reference}
                              </code>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{payout.method}</Badge>
                            </TableCell>
                            <TableCell className="text-right font-bold">
                              R$ {(payout.amount / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                            </TableCell>
                            <TableCell>
                              {getStatusBadge(payout.status)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
