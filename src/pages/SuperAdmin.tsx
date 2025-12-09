import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import {
  Shield,
  Users,
  Building2,
  CreditCard,
  BarChart3,
  Settings,
  Search,
  Filter,
  Eye,
  Ban,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  MessageSquare,
  Mail,
  Phone,
  Calendar,
  Clock,
  MoreVertical,
  RefreshCw,
  Download,
  AlertCircle,
  Zap,
  Server,
  Database,
  Globe,
  Lock,
  Unlock,
  UserPlus,
  ArrowUpRight,
  ChevronRight,
  HelpCircle,
  HeadphonesIcon,
  Ticket,
  Plus
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { PageContainer } from "@/components/ui/page-container";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, Tooltip, PieChart, Pie, Cell } from "recharts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock metrics data
const metricsData = {
  totalUsers: 1284,
  activeUsers: 892,
  totalClinics: 156,
  activeClinics: 143,
  mrr: 45280,
  arr: 543360,
  churnRate: 2.3,
  growthRate: 12.5,
};

// Mock revenue data
const revenueData = [
  { mes: "Jul", receita: 38000, novos: 12 },
  { mes: "Ago", receita: 42000, novos: 15 },
  { mes: "Set", receita: 39500, novos: 11 },
  { mes: "Out", receita: 45000, novos: 18 },
  { mes: "Nov", receita: 48200, novos: 14 },
  { mes: "Dez", receita: 52800, novos: 22 },
];

// Mock plan distribution
const planDistribution = [
  { name: "Free", value: 45, color: "hsl(var(--muted))" },
  { name: "Pro", value: 68, color: "hsl(var(--primary))" },
  { name: "Business", value: 32, color: "hsl(142, 76%, 36%)" },
  { name: "Enterprise", value: 11, color: "hsl(280, 76%, 50%)" },
];

// Mock clinics
const clinics = [
  { id: 1, name: "Clínica MedSaúde", owner: "Dr. Ricardo Carvalho", plan: "Enterprise", users: 12, status: "active", mrr: 890, createdAt: "15/10/2024" },
  { id: 2, name: "Centro Médico Vida", owner: "Dra. Ana Paula", plan: "Business", users: 8, status: "active", mrr: 450, createdAt: "22/11/2024" },
  { id: 3, name: "Clínica Bem Estar", owner: "Dr. Marcos Souza", plan: "Pro", users: 5, status: "active", mrr: 199, createdAt: "05/12/2024" },
  { id: 4, name: "Saúde Total", owner: "Dra. Fernanda Lima", plan: "Free", users: 2, status: "trial", mrr: 0, createdAt: "08/12/2024" },
  { id: 5, name: "Clínica Prime", owner: "Dr. Carlos Silva", plan: "Business", users: 6, status: "suspended", mrr: 0, createdAt: "01/09/2024" },
];

// Mock support tickets
const supportTickets = [
  { id: 1, clinic: "Clínica MedSaúde", subject: "Erro ao gerar relatório", priority: "high", status: "open", createdAt: "Há 2 horas" },
  { id: 2, clinic: "Centro Médico Vida", subject: "Dúvida sobre integração", priority: "medium", status: "in_progress", createdAt: "Há 5 horas" },
  { id: 3, clinic: "Clínica Bem Estar", subject: "Solicitação de cancelamento", priority: "high", status: "open", createdAt: "Há 1 dia" },
  { id: 4, clinic: "Saúde Total", subject: "Upgrade de plano", priority: "low", status: "resolved", createdAt: "Há 2 dias" },
];

// Mock system status
const systemStatus = [
  { name: "API Gateway", status: "operational", uptime: "99.99%" },
  { name: "Database", status: "operational", uptime: "99.98%" },
  { name: "Storage", status: "operational", uptime: "100%" },
  { name: "Email Service", status: "degraded", uptime: "98.5%" },
  { name: "Payment Gateway", status: "operational", uptime: "99.99%" },
];

export default function SuperAdmin() {
  const [searchTerm, setSearchTerm] = useState("");

  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case "Enterprise":
        return <Badge className="bg-purple-500/10 text-purple-600 border-purple-500/20">Enterprise</Badge>;
      case "Business":
        return <Badge className="bg-success/10 text-success border-success/20">Business</Badge>;
      case "Pro":
        return <Badge className="bg-primary/10 text-primary border-primary/20">Pro</Badge>;
      default:
        return <Badge variant="outline">Free</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-status-confirmed/10 text-status-confirmed border-status-confirmed/20 gap-1"><CheckCircle2 className="h-3 w-3" />Ativo</Badge>;
      case "trial":
        return <Badge className="bg-info/10 text-info border-info/20">Trial</Badge>;
      case "suspended":
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20 gap-1"><Ban className="h-3 w-3" />Suspenso</Badge>;
      default:
        return null;
    }
  };

  const getTicketPriority = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Alta</Badge>;
      case "medium":
        return <Badge className="bg-warning/10 text-warning border-warning/20">Média</Badge>;
      default:
        return <Badge className="bg-info/10 text-info border-info/20">Baixa</Badge>;
    }
  };

  const getTicketStatus = (status: string) => {
    switch (status) {
      case "open":
        return <Badge variant="outline" className="text-destructive border-destructive/30">Aberto</Badge>;
      case "in_progress":
        return <Badge variant="outline" className="text-warning border-warning/30">Em Andamento</Badge>;
      case "resolved":
        return <Badge variant="outline" className="text-success border-success/30">Resolvido</Badge>;
      default:
        return null;
    }
  };

  return (
    <PageContainer>
      <PageHeader
        icon={Shield}
        iconGradient="from-red-500 to-orange-600"
        title="Painel SuperAdmin"
        description="Gestão completa de usuários, clínicas e métricas do sistema"
      >
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">Exportar</span>
        </Button>
        <Button className="gap-2 bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700">
          <Settings className="h-4 w-4" />
          <span className="hidden sm:inline">Configurações</span>
        </Button>
      </PageHeader>

      {/* Main Metrics */}
      <div className="px-4 sm:px-6 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <Card className="p-4 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Total Clínicas</p>
              <p className="text-2xl font-bold">{metricsData.totalClinics}</p>
              <div className="flex items-center gap-1 text-xs text-success mt-1">
                <TrendingUp className="h-3 w-3" />
                +8 este mês
              </div>
            </div>
            <div className="p-3 rounded-xl bg-primary/10">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-success/5 to-success/10 border-success/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">MRR</p>
              <p className="text-2xl font-bold text-success">R$ {(metricsData.mrr / 1000).toFixed(1)}k</p>
              <div className="flex items-center gap-1 text-xs text-success mt-1">
                <TrendingUp className="h-3 w-3" />
                +{metricsData.growthRate}%
              </div>
            </div>
            <div className="p-3 rounded-xl bg-success/10">
              <DollarSign className="h-6 w-6 text-success" />
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-info/5 to-info/10 border-info/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Usuários Ativos</p>
              <p className="text-2xl font-bold text-info">{metricsData.activeUsers}</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                de {metricsData.totalUsers} total
              </div>
            </div>
            <div className="p-3 rounded-xl bg-info/10">
              <Users className="h-6 w-6 text-info" />
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-destructive/5 to-destructive/10 border-destructive/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Churn Rate</p>
              <p className="text-2xl font-bold text-destructive">{metricsData.churnRate}%</p>
              <div className="flex items-center gap-1 text-xs text-success mt-1">
                <TrendingDown className="h-3 w-3" />
                -0.5% vs mês anterior
              </div>
            </div>
            <div className="p-3 rounded-xl bg-destructive/10">
              <Activity className="h-6 w-6 text-destructive" />
            </div>
          </div>
        </Card>
      </div>

      <div className="px-4 sm:px-6 pb-6">
        <Tabs defaultValue="overview" className="space-y-4 sm:space-y-6">
        <TabsList className="bg-muted/50 p-1 flex-wrap h-auto gap-1">
          <TabsTrigger value="overview" className="gap-2 text-xs sm:text-sm">
            <BarChart3 className="h-4 w-4" />
            Visão Geral
          </TabsTrigger>
          <TabsTrigger value="clinics" className="gap-2 text-xs sm:text-sm">
            <Building2 className="h-4 w-4" />
            Clínicas
          </TabsTrigger>
          <TabsTrigger value="support" className="gap-2 text-xs sm:text-sm">
            <HeadphonesIcon className="h-4 w-4" />
            Suporte
          </TabsTrigger>
          <TabsTrigger value="system" className="gap-2 text-xs sm:text-sm">
            <Server className="h-4 w-4" />
            Sistema
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Revenue Chart */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                Receita Mensal
              </h3>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="colorReceita" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="mes" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `${v/1000}k`} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Area type="monotone" dataKey="receita" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorReceita)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Plan Distribution */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                Distribuição por Plano
              </h3>
              <div className="flex items-center gap-6">
                <div className="h-[200px] w-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={planDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {planDistribution.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-3 flex-1">
                  {planDistribution.map((item) => (
                    <div key={item.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-sm">{item.name}</span>
                      </div>
                      <span className="font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* New Signups */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-primary" />
                Novos Cadastros
              </h3>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="mes" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="novos" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Ações Rápidas
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                  <Building2 className="h-5 w-5" />
                  <span className="text-xs">Nova Clínica</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                  <Users className="h-5 w-5" />
                  <span className="text-xs">Novo Usuário</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                  <Mail className="h-5 w-5" />
                  <span className="text-xs">Enviar Broadcast</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                  <Download className="h-5 w-5" />
                  <span className="text-xs">Relatório Geral</span>
                </Button>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Clinics Tab */}
        <TabsContent value="clinics" className="space-y-6">
          <Card className="p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar clínicas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filtros
                </Button>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Nova Clínica
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              {clinics.map((clinic) => (
                <div 
                  key={clinic.id} 
                  className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all"
                >
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {clinic.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-medium">{clinic.name}</h4>
                      {getPlanBadge(clinic.plan)}
                      {getStatusBadge(clinic.status)}
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                      <span>{clinic.owner}</span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {clinic.users} usuários
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {clinic.createdAt}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold text-emerald-600">R$ {clinic.mrr}/mês</p>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="gap-2">
                        <Eye className="h-4 w-4" />
                        Ver detalhes
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <MessageSquare className="h-4 w-4" />
                        Enviar mensagem
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <Phone className="h-4 w-4" />
                        Ligar
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {clinic.status === "suspended" ? (
                        <DropdownMenuItem className="gap-2 text-emerald-600">
                          <Unlock className="h-4 w-4" />
                          Reativar
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem className="gap-2 text-destructive">
                          <Ban className="h-4 w-4" />
                          Suspender
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Support Tab */}
        <TabsContent value="support" className="space-y-6">
          <div className="grid lg:grid-cols-4 gap-4 mb-6">
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-red-500/10">
                  <Ticket className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Abertos</p>
                  <p className="text-2xl font-bold text-red-600">8</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-500/10">
                  <Clock className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Em Andamento</p>
                  <p className="text-2xl font-bold text-amber-600">5</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Resolvidos Hoje</p>
                  <p className="text-2xl font-bold text-emerald-600">12</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Zap className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Tempo Médio</p>
                  <p className="text-2xl font-bold text-blue-600">4.2h</p>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <HeadphonesIcon className="h-5 w-5 text-primary" />
              Tickets de Suporte
            </h3>
            <div className="space-y-3">
              {supportTickets.map((ticket) => (
                <div 
                  key={ticket.id} 
                  className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all cursor-pointer"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-medium">{ticket.subject}</h4>
                      {getTicketPriority(ticket.priority)}
                      {getTicketStatus(ticket.status)}
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Building2 className="h-3 w-3" />
                        {ticket.clinic}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {ticket.createdAt}
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Eye className="h-4 w-4" />
                    Ver
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* System Tab */}
        <TabsContent value="system" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* System Status */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Server className="h-5 w-5 text-primary" />
                Status do Sistema
              </h3>
              <div className="space-y-3">
                {systemStatus.map((service) => (
                  <div 
                    key={service.name} 
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        service.status === "operational" ? "bg-emerald-500" : "bg-amber-500"
                      )} />
                      <span className="font-medium">{service.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">{service.uptime}</Badge>
                      <Badge className={cn(
                        service.status === "operational" 
                          ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" 
                          : "bg-amber-500/10 text-amber-600 border-amber-500/20"
                      )}>
                        {service.status === "operational" ? "Operacional" : "Degradado"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Stats */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Métricas do Sistema
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span>CPU</span>
                    <span className="font-medium">42%</span>
                  </div>
                  <Progress value={42} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span>Memória</span>
                    <span className="font-medium">68%</span>
                  </div>
                  <Progress value={68} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span>Disco</span>
                    <span className="font-medium">35%</span>
                  </div>
                  <Progress value={35} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span>Requisições/min</span>
                    <span className="font-medium">1,247</span>
                  </div>
                  <Progress value={62} className="h-2" />
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      </div>
    </PageContainer>
  );
}
