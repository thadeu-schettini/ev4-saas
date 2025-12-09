import { useState } from "react";
import { NewTransactionModal } from "@/components/financeiro/NewTransactionModal";
import { PageHeader } from "@/components/ui/page-header";
import { PageContainer, PageContent } from "@/components/ui/page-container";
import { FinanceiroSkeleton } from "@/components/skeletons/PageSkeletons";
import { useSimulatedLoading } from "@/hooks/use-loading";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  CreditCard, 
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Download,
  Plus,
  Search,
  MoreHorizontal,
  Receipt,
  Wallet,
  PiggyBank,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const revenueData = [
  { month: "Jan", receita: 45000, despesa: 28000 },
  { month: "Fev", receita: 52000, despesa: 31000 },
  { month: "Mar", receita: 48000, despesa: 29000 },
  { month: "Abr", receita: 61000, despesa: 35000 },
  { month: "Mai", receita: 55000, despesa: 32000 },
  { month: "Jun", receita: 67000, despesa: 38000 },
];

const paymentMethodData = [
  { name: "Cartão Crédito", value: 45, color: "hsl(var(--chart-1))" },
  { name: "Cartão Débito", value: 25, color: "hsl(var(--chart-2))" },
  { name: "PIX", value: 20, color: "hsl(var(--chart-3))" },
  { name: "Dinheiro", value: 10, color: "hsl(var(--chart-4))" },
];

const transactions = [
  { id: 1, type: "receita", description: "Consulta - Maria Silva", patient: "Maria Silva", value: 350, date: "2024-01-15", status: "pago", paymentMethod: "PIX" },
  { id: 2, type: "receita", description: "Retorno - João Santos", patient: "João Santos", value: 200, date: "2024-01-15", status: "pago", paymentMethod: "Cartão Crédito" },
  { id: 3, type: "despesa", description: "Aluguel do consultório", patient: null, value: 5000, date: "2024-01-10", status: "pago", paymentMethod: "Transferência" },
  { id: 4, type: "receita", description: "Exame - Ana Costa", patient: "Ana Costa", value: 450, date: "2024-01-14", status: "pendente", paymentMethod: "Aguardando" },
  { id: 5, type: "despesa", description: "Material de escritório", patient: null, value: 320, date: "2024-01-12", status: "pago", paymentMethod: "Cartão Débito" },
  { id: 6, type: "receita", description: "Procedimento - Carlos Lima", patient: "Carlos Lima", value: 1200, date: "2024-01-13", status: "pago", paymentMethod: "Cartão Crédito" },
  { id: 7, type: "despesa", description: "Conta de luz", patient: null, value: 450, date: "2024-01-05", status: "pago", paymentMethod: "Débito Automático" },
  { id: 8, type: "receita", description: "Consulta - Pedro Oliveira", patient: "Pedro Oliveira", value: 350, date: "2024-01-15", status: "cancelado", paymentMethod: "Cancelado" },
];

const installments = [
  { id: 1, patient: "Maria Silva", service: "Tratamento Completo", totalValue: 3600, paidInstallments: 3, totalInstallments: 12, installmentValue: 300, nextDue: "2024-02-15", status: "em_dia" },
  { id: 2, patient: "João Santos", service: "Procedimento Estético", totalValue: 2400, paidInstallments: 1, totalInstallments: 6, installmentValue: 400, nextDue: "2024-02-10", status: "em_dia" },
  { id: 3, patient: "Ana Costa", service: "Consultas + Exames", totalValue: 1800, paidInstallments: 4, totalInstallments: 6, installmentValue: 300, nextDue: "2024-01-20", status: "atrasado" },
  { id: 4, patient: "Carlos Lima", service: "Pacote Mensal", totalValue: 4800, paidInstallments: 8, totalInstallments: 12, installmentValue: 400, nextDue: "2024-02-01", status: "em_dia" },
  { id: 5, patient: "Lucia Ferreira", service: "Tratamento Especializado", totalValue: 6000, paidInstallments: 2, totalInstallments: 10, installmentValue: 600, nextDue: "2024-01-25", status: "em_dia" },
];

const appointmentRevenue = [
  { id: 1, patient: "Maria Silva", service: "Consulta", professional: "Dr. Ricardo", date: "2024-01-15", time: "09:00", value: 350, status: "realizado", paymentStatus: "pago" },
  { id: 2, patient: "João Santos", service: "Retorno", professional: "Dra. Ana", date: "2024-01-15", time: "10:00", value: 200, status: "realizado", paymentStatus: "pago" },
  { id: 3, patient: "Ana Costa", service: "Exame", professional: "Dr. Ricardo", date: "2024-01-15", time: "11:00", value: 450, status: "realizado", paymentStatus: "pendente" },
  { id: 4, patient: "Carlos Lima", service: "Procedimento", professional: "Dra. Ana", date: "2024-01-15", time: "14:00", value: 1200, status: "agendado", paymentStatus: "aguardando" },
  { id: 5, patient: "Pedro Oliveira", service: "Consulta", professional: "Dr. Ricardo", date: "2024-01-15", time: "15:00", value: 350, status: "cancelado", paymentStatus: "cancelado" },
];

export default function Financeiro() {
  const isLoading = useSimulatedLoading(1000);
  const [searchTerm, setSearchTerm] = useState("");
  const [periodFilter, setPeriodFilter] = useState("month");
  const [showNewTransactionModal, setShowNewTransactionModal] = useState(false);

  const totalReceita = transactions.filter(t => t.type === "receita" && t.status === "pago").reduce((acc, t) => acc + t.value, 0);
  const totalDespesa = transactions.filter(t => t.type === "despesa" && t.status === "pago").reduce((acc, t) => acc + t.value, 0);
  const saldo = totalReceita - totalDespesa;
  const pendente = transactions.filter(t => t.status === "pendente").reduce((acc, t) => acc + t.value, 0);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; label: string; icon: React.ReactNode }> = {
      pago: { variant: "default", label: "Pago", icon: <CheckCircle2 className="h-3 w-3" /> },
      pendente: { variant: "secondary", label: "Pendente", icon: <Clock className="h-3 w-3" /> },
      cancelado: { variant: "destructive", label: "Cancelado", icon: <XCircle className="h-3 w-3" /> },
      em_dia: { variant: "default", label: "Em dia", icon: <CheckCircle2 className="h-3 w-3" /> },
      atrasado: { variant: "destructive", label: "Atrasado", icon: <AlertCircle className="h-3 w-3" /> },
      aguardando: { variant: "outline", label: "Aguardando", icon: <Clock className="h-3 w-3" /> },
    };
    const config = variants[status] || variants.pendente;
    return (
      <Badge variant={config.variant} className="gap-1">
        {config.icon}
        {config.label}
      </Badge>
    );
  };

  return (
    <PageContainer>
      <PageHeader
        title="Financeiro"
        description="Gerencie receitas, despesas e parcelamentos"
        icon={DollarSign}
        iconColor="from-emerald-500 to-emerald-600"
      >
        <Select value={periodFilter} onValueChange={setPeriodFilter}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Hoje</SelectItem>
            <SelectItem value="week">Esta semana</SelectItem>
            <SelectItem value="month">Este mês</SelectItem>
            <SelectItem value="year">Este ano</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon">
          <Download className="h-4 w-4" />
        </Button>
        <Button className="gap-2" onClick={() => setShowNewTransactionModal(true)}>
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Nova Transação</span>
        </Button>
      </PageHeader>

      <NewTransactionModal 
        open={showNewTransactionModal} 
        onOpenChange={setShowNewTransactionModal} 
      />

      <PageContent>
        {isLoading ? (
          <FinanceiroSkeleton />
        ) : (
          <>
        {/* Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border-emerald-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Receita Total</p>
                  <p className="text-2xl font-bold text-emerald-600">
                    R$ {totalReceita.toLocaleString('pt-BR')}
                  </p>
                  <div className="flex items-center gap-1 mt-1 text-xs text-emerald-600">
                    <ArrowUpRight className="h-3 w-3" />
                    <span>+12% vs mês anterior</span>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-500/10 to-red-600/5 border-red-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Despesas</p>
                  <p className="text-2xl font-bold text-red-600">
                    R$ {totalDespesa.toLocaleString('pt-BR')}
                  </p>
                  <div className="flex items-center gap-1 mt-1 text-xs text-red-600">
                    <ArrowDownRight className="h-3 w-3" />
                    <span>-5% vs mês anterior</span>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-full bg-red-500/20 flex items-center justify-center">
                  <TrendingDown className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Saldo</p>
                  <p className="text-2xl font-bold text-blue-600">
                    R$ {saldo.toLocaleString('pt-BR')}
                  </p>
                  <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                    <Wallet className="h-3 w-3" />
                    <span>Lucro líquido</span>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <PiggyBank className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border-amber-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pendente</p>
                  <p className="text-2xl font-bold text-amber-600">
                    R$ {pendente.toLocaleString('pt-BR')}
                  </p>
                  <div className="flex items-center gap-1 mt-1 text-xs text-amber-600">
                    <Clock className="h-3 w-3" />
                    <span>Aguardando pagamento</span>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <Receipt className="h-6 w-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Fluxo de Caixa</CardTitle>
              <CardDescription>Receitas vs Despesas nos últimos 6 meses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="colorReceita" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorDespesa" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" className="text-xs" />
                    <YAxis className="text-xs" tickFormatter={(value) => `R$${value/1000}k`} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                      formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR')}`, '']}
                    />
                    <Area type="monotone" dataKey="receita" stroke="hsl(var(--chart-1))" fillOpacity={1} fill="url(#colorReceita)" name="Receita" />
                    <Area type="monotone" dataKey="despesa" stroke="hsl(var(--chart-2))" fillOpacity={1} fill="url(#colorDespesa)" name="Despesa" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Formas de Pagamento</CardTitle>
              <CardDescription>Distribuição por método</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={paymentMethodData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {paymentMethodData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                      formatter={(value: number) => [`${value}%`, '']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for different views */}
        <Tabs defaultValue="transactions" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
            <TabsTrigger value="transactions" className="gap-2">
              <Receipt className="h-4 w-4" />
              <span className="hidden sm:inline">Transações</span>
            </TabsTrigger>
            <TabsTrigger value="appointments" className="gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Agendamentos</span>
            </TabsTrigger>
            <TabsTrigger value="installments" className="gap-2">
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Parcelamentos</span>
            </TabsTrigger>
          </TabsList>

          {/* Transactions Tab */}
          <TabsContent value="transactions" className="space-y-4">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <CardTitle className="text-lg">Todas as Transações</CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1 sm:w-64">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Buscar transação..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead>Descrição</TableHead>
                        <TableHead className="hidden md:table-cell">Data</TableHead>
                        <TableHead className="hidden sm:table-cell">Método</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.map((transaction) => (
                        <TableRow key={transaction.id} className="hover:bg-muted/50">
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                                transaction.type === 'receita' 
                                  ? 'bg-emerald-500/20 text-emerald-600' 
                                  : 'bg-red-500/20 text-red-600'
                              }`}>
                                {transaction.type === 'receita' ? (
                                  <ArrowUpRight className="h-4 w-4" />
                                ) : (
                                  <ArrowDownRight className="h-4 w-4" />
                                )}
                              </div>
                              <div>
                                <p className="font-medium text-sm">{transaction.description}</p>
                                {transaction.patient && (
                                  <p className="text-xs text-muted-foreground">{transaction.patient}</p>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell text-muted-foreground text-sm">
                            {format(new Date(transaction.date), "dd/MM/yyyy", { locale: ptBR })}
                          </TableCell>
                          <TableCell className="hidden sm:table-cell text-sm">
                            {transaction.paymentMethod}
                          </TableCell>
                          <TableCell className={`font-medium ${
                            transaction.type === 'receita' ? 'text-emerald-600' : 'text-red-600'
                          }`}>
                            {transaction.type === 'receita' ? '+' : '-'}R$ {transaction.value.toLocaleString('pt-BR')}
                          </TableCell>
                          <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                                <DropdownMenuItem>Editar</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">Excluir</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appointments Tab */}
          <TabsContent value="appointments" className="space-y-4">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <CardTitle className="text-lg">Receita por Agendamento</CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1 sm:w-64">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input placeholder="Buscar agendamento..." className="pl-9" />
                    </div>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead>Paciente</TableHead>
                        <TableHead className="hidden md:table-cell">Serviço</TableHead>
                        <TableHead className="hidden lg:table-cell">Profissional</TableHead>
                        <TableHead className="hidden sm:table-cell">Data/Hora</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Pagamento</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {appointmentRevenue.map((appointment) => (
                        <TableRow key={appointment.id} className="hover:bg-muted/50">
                          <TableCell>
                            <div className="font-medium text-sm">{appointment.patient}</div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell text-sm">
                            {appointment.service}
                          </TableCell>
                          <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                            {appointment.professional}
                          </TableCell>
                          <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                            {format(new Date(appointment.date), "dd/MM", { locale: ptBR })} às {appointment.time}
                          </TableCell>
                          <TableCell className="font-medium text-sm">
                            R$ {appointment.value.toLocaleString('pt-BR')}
                          </TableCell>
                          <TableCell>{getStatusBadge(appointment.paymentStatus)}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                                <DropdownMenuItem>Registrar pagamento</DropdownMenuItem>
                                <DropdownMenuItem>Gerar recibo</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Installments Tab */}
          <TabsContent value="installments" className="space-y-4">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle className="text-lg">Parcelamentos Ativos</CardTitle>
                    <CardDescription>Acompanhe os pagamentos parcelados dos pacientes</CardDescription>
                  </div>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Novo Parcelamento
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead>Paciente</TableHead>
                        <TableHead className="hidden md:table-cell">Serviço</TableHead>
                        <TableHead className="hidden lg:table-cell">Valor Total</TableHead>
                        <TableHead>Parcelas</TableHead>
                        <TableHead className="hidden sm:table-cell">Próx. Vencimento</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {installments.map((installment) => (
                        <TableRow key={installment.id} className="hover:bg-muted/50">
                          <TableCell>
                            <div className="font-medium text-sm">{installment.patient}</div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                            {installment.service}
                          </TableCell>
                          <TableCell className="hidden lg:table-cell text-sm font-medium">
                            R$ {installment.totalValue.toLocaleString('pt-BR')}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-primary rounded-full transition-all"
                                  style={{ width: `${(installment.paidInstallments / installment.totalInstallments) * 100}%` }}
                                />
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {installment.paidInstallments}/{installment.totalInstallments}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                            {format(new Date(installment.nextDue), "dd/MM/yyyy", { locale: ptBR })}
                          </TableCell>
                          <TableCell>{getStatusBadge(installment.status)}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Ver histórico</DropdownMenuItem>
                                <DropdownMenuItem>Registrar pagamento</DropdownMenuItem>
                                <DropdownMenuItem>Enviar lembrete</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">Cancelar parcelamento</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
          </>
        )}
      </PageContent>
    </PageContainer>
  );
}
