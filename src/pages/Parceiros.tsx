import { useState } from "react";
import { PageContainer } from "@/components/ui/page-container";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
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
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Users,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  TrendingUp,
  DollarSign,
  Ticket,
  Calendar,
  Copy,
  Eye,
  Edit,
  Trash2,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowUpRight,
  Target,
  Zap,
  Gift,
  BarChart3,
  PieChart,
  Wallet,
  CreditCard,
  ArrowDownRight,
  Building2,
  Mail,
  Phone,
  Globe,
  Star,
  Award,
  TrendingDown,
  Banknote,
  Receipt,
  FileText,
  Send,
  UserPlus,
  Link2,
  ExternalLink,
  Percent,
  HandCoins,
} from "lucide-react";
import { NewPartnerModal } from "@/components/parceiros/NewPartnerModal";
import { PartnerDetailModal } from "@/components/parceiros/PartnerDetailModal";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

// Mock data for partners
const mockPartners = [
  {
    id: "1",
    name: "Dr. Carlos Mendes",
    email: "carlos@clinicamendes.com.br",
    phone: "(11) 99999-1234",
    company: "Clínica Mendes Odontologia",
    type: "CLINIC",
    status: "ACTIVE",
    avatar: null,
    commissionRate: 15,
    commissionType: "PERCENT",
    fixedCommission: null,
    totalEarnings: 4520000, // centavos
    pendingEarnings: 350000,
    paidEarnings: 4170000,
    totalReferrals: 89,
    activeReferrals: 67,
    conversionRate: 75.3,
    couponsLinked: 3,
    createdAt: new Date("2024-01-15"),
    lastPayoutAt: new Date("2024-12-01"),
    tier: "GOLD",
  },
  {
    id: "2",
    name: "Maria Influencer",
    email: "maria@influencer.com",
    phone: "(21) 98888-5678",
    company: "Maria Health Content",
    type: "INFLUENCER",
    status: "ACTIVE",
    avatar: null,
    commissionRate: 20,
    commissionType: "PERCENT",
    fixedCommission: null,
    totalEarnings: 8750000,
    pendingEarnings: 1200000,
    paidEarnings: 7550000,
    totalReferrals: 234,
    activeReferrals: 189,
    conversionRate: 80.8,
    couponsLinked: 5,
    createdAt: new Date("2023-11-20"),
    lastPayoutAt: new Date("2024-12-10"),
    tier: "PLATINUM",
  },
  {
    id: "3",
    name: "João Silva",
    email: "joao@parceiro.com",
    phone: "(31) 97777-9012",
    company: null,
    type: "INDIVIDUAL",
    status: "ACTIVE",
    avatar: null,
    commissionRate: null,
    commissionType: "FIXED",
    fixedCommission: 5000, // R$50 por indicação
    totalEarnings: 125000,
    pendingEarnings: 25000,
    paidEarnings: 100000,
    totalReferrals: 25,
    activeReferrals: 18,
    conversionRate: 72.0,
    couponsLinked: 1,
    createdAt: new Date("2024-06-01"),
    lastPayoutAt: new Date("2024-11-15"),
    tier: "BRONZE",
  },
  {
    id: "4",
    name: "Empresa ABC Saúde",
    email: "parceria@abcsaude.com.br",
    phone: "(11) 3333-4444",
    company: "ABC Saúde Corporativa",
    type: "COMPANY",
    status: "PENDING",
    avatar: null,
    commissionRate: 12,
    commissionType: "PERCENT",
    fixedCommission: null,
    totalEarnings: 0,
    pendingEarnings: 0,
    paidEarnings: 0,
    totalReferrals: 0,
    activeReferrals: 0,
    conversionRate: 0,
    couponsLinked: 0,
    createdAt: new Date("2024-12-15"),
    lastPayoutAt: null,
    tier: "BRONZE",
  },
  {
    id: "5",
    name: "Antigo Parceiro",
    email: "antigo@parceiro.com",
    phone: "(41) 96666-7890",
    company: "Parceiro Desativado LTDA",
    type: "COMPANY",
    status: "INACTIVE",
    avatar: null,
    commissionRate: 10,
    commissionType: "PERCENT",
    fixedCommission: null,
    totalEarnings: 890000,
    pendingEarnings: 0,
    paidEarnings: 890000,
    totalReferrals: 45,
    activeReferrals: 0,
    conversionRate: 0,
    couponsLinked: 0,
    createdAt: new Date("2023-05-10"),
    lastPayoutAt: new Date("2024-08-01"),
    tier: "SILVER",
  },
];

// Mock pending payouts
const mockPendingPayouts = [
  {
    id: "1",
    partnerId: "1",
    partnerName: "Dr. Carlos Mendes",
    amount: 350000,
    referrals: 12,
    periodStart: new Date("2024-12-01"),
    periodEnd: new Date("2024-12-15"),
  },
  {
    id: "2",
    partnerId: "2",
    partnerName: "Maria Influencer",
    amount: 1200000,
    referrals: 45,
    periodStart: new Date("2024-12-01"),
    periodEnd: new Date("2024-12-15"),
  },
  {
    id: "3",
    partnerId: "3",
    partnerName: "João Silva",
    amount: 25000,
    referrals: 5,
    periodStart: new Date("2024-12-01"),
    periodEnd: new Date("2024-12-15"),
  },
];

const Parceiros = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [newPartnerOpen, setNewPartnerOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<typeof mockPartners[0] | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  // Calculate totals
  const totalPartners = mockPartners.length;
  const activePartners = mockPartners.filter((p) => p.status === "ACTIVE").length;
  const totalEarnings = mockPartners.reduce((acc, p) => acc + p.totalEarnings, 0);
  const pendingPayouts = mockPartners.reduce((acc, p) => acc + p.pendingEarnings, 0);
  const totalReferrals = mockPartners.reduce((acc, p) => acc + p.totalReferrals, 0);

  const filteredPartners = mockPartners.filter((partner) => {
    const matchesSearch =
      partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (partner.company?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);

    if (activeTab === "all") return matchesSearch;
    if (activeTab === "active") return matchesSearch && partner.status === "ACTIVE";
    if (activeTab === "pending") return matchesSearch && partner.status === "PENDING";
    if (activeTab === "inactive") return matchesSearch && partner.status === "INACTIVE";
    return matchesSearch;
  });

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-200">Ativo</Badge>;
      case "PENDING":
        return <Badge className="bg-amber-500/10 text-amber-600 border-amber-200">Pendente</Badge>;
      case "INACTIVE":
        return <Badge className="bg-muted text-muted-foreground">Inativo</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
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

  const handleViewPartner = (partner: typeof mockPartners[0]) => {
    setSelectedPartner(partner);
    setDetailOpen(true);
  };

  return (
    <PageContainer>
      <PageHeader
        title="Parceiros & Afiliados"
        description="Gerencie parceiros, comissões por indicação e acompanhe pagamentos"
      />

      {/* Hero Metrics Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 mb-8">
        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Parceiros</p>
                <h3 className="text-3xl font-bold mt-1">{totalPartners}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-emerald-500 font-medium">{activePartners} ativos</span>
                </p>
              </div>
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Users className="h-7 w-7 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total em Comissões</p>
                <h3 className="text-3xl font-bold mt-1">
                  R$ {(totalEarnings / 100).toLocaleString("pt-BR", { minimumFractionDigits: 0 })}
                </h3>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-emerald-500" />
                  <span className="text-emerald-500 font-medium">+18.2%</span> este mês
                </p>
              </div>
              <div className="h-14 w-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                <DollarSign className="h-7 w-7 text-emerald-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pagamentos Pendentes</p>
                <h3 className="text-3xl font-bold mt-1">
                  R$ {(pendingPayouts / 100).toLocaleString("pt-BR", { minimumFractionDigits: 0 })}
                </h3>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <Clock className="h-3 w-3 text-amber-500" />
                  <span className="text-amber-500 font-medium">{mockPendingPayouts.length} payouts</span> aguardando
                </p>
              </div>
              <div className="h-14 w-14 rounded-2xl bg-amber-500/10 flex items-center justify-center">
                <Wallet className="h-7 w-7 text-amber-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-violet-500/10 via-violet-500/5 to-transparent">
          <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Indicações</p>
                <h3 className="text-3xl font-bold mt-1">{totalReferrals}</h3>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <ArrowUpRight className="h-3 w-3 text-violet-500" />
                  <span className="text-violet-500 font-medium">+42</span> esta semana
                </p>
              </div>
              <div className="h-14 w-14 rounded-2xl bg-violet-500/10 flex items-center justify-center">
                <UserPlus className="h-7 w-7 text-violet-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-rose-500/10 via-rose-500/5 to-transparent">
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Taxa Conversão</p>
                <h3 className="text-3xl font-bold mt-1">76.5%</h3>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-rose-500" />
                  <span className="text-rose-500 font-medium">+3.2%</span> vs. média
                </p>
              </div>
              <div className="h-14 w-14 rounded-2xl bg-rose-500/10 flex items-center justify-center">
                <Target className="h-7 w-7 text-rose-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Payouts Alert */}
      {pendingPayouts > 0 && (
        <Card className="mb-6 border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                  <HandCoins className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-amber-800 dark:text-amber-200">
                    {mockPendingPayouts.length} pagamentos pendentes
                  </h4>
                  <p className="text-sm text-amber-600 dark:text-amber-400">
                    R$ {(pendingPayouts / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2 })} aguardando processamento
                  </p>
                </div>
              </div>
              <Button className="bg-amber-600 hover:bg-amber-700 text-white gap-2">
                <Send className="h-4 w-4" />
                Processar Payouts
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome, email ou empresa..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filtros
          </Button>
          <Button variant="outline" className="gap-2">
            <Receipt className="h-4 w-4" />
            Relatório
          </Button>
          <Button onClick={() => setNewPartnerOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Parceiro
          </Button>
        </div>
      </div>

      {/* Tabs and Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="all" className="gap-2">
            <Users className="h-4 w-4" />
            Todos
            <Badge variant="secondary" className="ml-1 text-xs">{mockPartners.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="active" className="gap-2">
            <CheckCircle2 className="h-4 w-4" />
            Ativos
            <Badge variant="secondary" className="ml-1 text-xs bg-emerald-500/10 text-emerald-600">{activePartners}</Badge>
          </TabsTrigger>
          <TabsTrigger value="pending" className="gap-2">
            <Clock className="h-4 w-4" />
            Pendentes
          </TabsTrigger>
          <TabsTrigger value="inactive" className="gap-2">
            <Users className="h-4 w-4" />
            Inativos
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {/* Partners Grid */}
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredPartners.map((partner) => (
              <Card
                key={partner.id}
                className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => handleViewPartner(partner)}
              >
                {/* Tier Gradient */}
                <div className={`absolute inset-0 opacity-5 bg-gradient-to-br ${
                  partner.tier === "PLATINUM" 
                    ? "from-slate-400 to-slate-600" 
                    : partner.tier === "GOLD"
                    ? "from-amber-400 to-yellow-600"
                    : partner.tier === "SILVER"
                    ? "from-gray-400 to-gray-600"
                    : "from-orange-400 to-orange-600"
                }`} />

                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12 ring-2 ring-primary/10">
                        <AvatarImage src={partner.avatar || undefined} />
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {partner.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base flex items-center gap-2">
                          {partner.name}
                          {getTierBadge(partner.tier)}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">{partner.company || partner.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(partner.status)}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Commission Info */}
                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                      partner.commissionType === "PERCENT"
                        ? "bg-violet-500/10"
                        : "bg-emerald-500/10"
                    }`}>
                      {partner.commissionType === "PERCENT" ? (
                        <Percent className="h-5 w-5 text-violet-500" />
                      ) : (
                        <DollarSign className="h-5 w-5 text-emerald-500" />
                      )}
                    </div>
                    <div>
                      <p className="text-xl font-bold">
                        {partner.commissionType === "PERCENT"
                          ? `${partner.commissionRate}%`
                          : `R$ ${((partner.fixedCommission || 0) / 100).toFixed(2)}`}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {partner.commissionType === "PERCENT" ? "por indicação" : "valor fixo"}
                      </p>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-center p-2 rounded-lg bg-muted/50">
                      <p className="text-lg font-bold">{partner.totalReferrals}</p>
                      <p className="text-xs text-muted-foreground">Indicações</p>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-muted/50">
                      <p className="text-lg font-bold text-emerald-600">
                        R$ {(partner.totalEarnings / 100 / 1000).toFixed(1)}k
                      </p>
                      <p className="text-xs text-muted-foreground">Total</p>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-muted/50">
                      <p className="text-lg font-bold">{partner.conversionRate.toFixed(0)}%</p>
                      <p className="text-xs text-muted-foreground">Conversão</p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {getTypeBadge(partner.type)}
                    {partner.couponsLinked > 0 && (
                      <Badge variant="secondary" className="text-xs gap-1">
                        <Ticket className="h-3 w-3" />
                        {partner.couponsLinked} cupons
                      </Badge>
                    )}
                    {partner.pendingEarnings > 0 && (
                      <Badge className="bg-amber-500/10 text-amber-600 border-amber-200 text-xs gap-1">
                        <Wallet className="h-3 w-3" />
                        R$ {(partner.pendingEarnings / 100).toLocaleString("pt-BR")} pendente
                      </Badge>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-2 border-t">
                    <p className="text-xs text-muted-foreground">
                      Desde {format(partner.createdAt, "MMM/yyyy", { locale: ptBR })}
                    </p>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Copy referral link
                        }}
                      >
                        <Link2 className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="gap-2">
                            <Eye className="h-4 w-4" />
                            Ver Detalhes
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Edit className="h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Ticket className="h-4 w-4" />
                            Vincular Cupom
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Send className="h-4 w-4" />
                            Processar Payout
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="gap-2 text-destructive">
                            <Trash2 className="h-4 w-4" />
                            Desativar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <NewPartnerModal open={newPartnerOpen} onOpenChange={setNewPartnerOpen} />
      <PartnerDetailModal
        open={detailOpen}
        onOpenChange={setDetailOpen}
        partner={selectedPartner}
      />
    </PageContainer>
  );
};

export default Parceiros;
