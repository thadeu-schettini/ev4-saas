import { useState } from "react";
import { 
  Brain, 
  TrendingUp, 
  TrendingDown,
  Users,
  DollarSign,
  Calendar,
  Activity,
  Target,
  Lightbulb,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Filter,
  Download,
  Zap,
  BarChart3,
  PieChart,
  LineChart,
  MessageSquare
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { PageContainer, PageContent } from "@/components/ui/page-container";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RePieChart, Pie, Cell, LineChart as ReLineChart, Line } from "recharts";
import { AIQueryModal } from "@/components/analises/AIQueryModal";

const revenueData = [
  { month: "Jan", receita: 45000, despesas: 32000 },
  { month: "Fev", receita: 52000, despesas: 35000 },
  { month: "Mar", receita: 48000, despesas: 31000 },
  { month: "Abr", receita: 61000, despesas: 38000 },
  { month: "Mai", receita: 55000, despesas: 36000 },
  { month: "Jun", receita: 67000, despesas: 42000 },
];

const appointmentsData = [
  { day: "Seg", agendados: 24, realizados: 22, cancelados: 2 },
  { day: "Ter", agendados: 28, realizados: 25, cancelados: 3 },
  { day: "Qua", agendados: 22, realizados: 21, cancelados: 1 },
  { day: "Qui", agendados: 30, realizados: 27, cancelados: 3 },
  { day: "Sex", agendados: 26, realizados: 24, cancelados: 2 },
];

const serviceDistribution = [
  { name: "Cardiologia", value: 35, color: "hsl(var(--primary))" },
  { name: "Dermatologia", value: 25, color: "hsl(142, 76%, 36%)" },
  { name: "Ortopedia", value: 20, color: "hsl(262, 83%, 58%)" },
  { name: "Pediatria", value: 12, color: "hsl(38, 92%, 50%)" },
  { name: "Outros", value: 8, color: "hsl(var(--muted))" },
];

const aiInsights = [
  { 
    type: "success",
    title: "Aumento de 18% na receita",
    description: "Comparado ao mesmo período do ano anterior. Cardiologia foi a especialidade com maior crescimento.",
    action: "Ver detalhes"
  },
  { 
    type: "warning",
    title: "Taxa de no-show elevada às segundas",
    description: "15% dos pacientes não comparecem nas segundas-feiras. Considere confirmar agendamentos com antecedência.",
    action: "Configurar lembretes"
  },
  { 
    type: "info",
    title: "Horário de pico: 14h-16h",
    description: "Esses horários têm maior demanda. Considere alocar mais profissionais nesse período.",
    action: "Ajustar agenda"
  },
  { 
    type: "success",
    title: "Satisfação dos pacientes em 94%",
    description: "Baseado nas avaliações dos últimos 30 dias. Acima da média do setor (87%).",
    action: "Ver avaliações"
  },
];

const kpis = [
  { 
    label: "Receita Líquida", 
    value: "R$ 67.5k", 
    change: "+18%", 
    trend: "up",
    icon: DollarSign, 
    color: "from-emerald-500 to-green-500",
    sparkline: [30, 40, 35, 50, 49, 60, 67]
  },
  { 
    label: "Pacientes Ativos", 
    value: "1.284", 
    change: "+48", 
    trend: "up",
    icon: Users, 
    color: "from-blue-500 to-cyan-500",
    sparkline: [1200, 1220, 1245, 1260, 1275, 1280, 1284]
  },
  { 
    label: "Taxa de Ocupação", 
    value: "87%", 
    change: "-3%", 
    trend: "down",
    icon: Target, 
    color: "from-amber-500 to-orange-500",
    sparkline: [90, 88, 85, 89, 86, 88, 87]
  },
  { 
    label: "Tempo Médio Espera", 
    value: "12 min", 
    change: "-2min", 
    trend: "up",
    icon: Activity, 
    color: "from-violet-500 to-purple-500",
    sparkline: [18, 16, 14, 15, 13, 12, 12]
  },
];

export default function Analises() {
  const [period, setPeriod] = useState("mes");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isAIQueryOpen, setIsAIQueryOpen] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  return (
    <PageContainer>
      <PageHeader
        icon={Brain}
        iconGradient="from-violet-500 to-purple-500"
        title="Análises & Insights"
        description="Inteligência artificial para decisões estratégicas"
        actions={
          <div className="flex gap-2">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="semana">Esta Semana</SelectItem>
                <SelectItem value="mes">Este Mês</SelectItem>
                <SelectItem value="trimestre">Trimestre</SelectItem>
                <SelectItem value="ano">Este Ano</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="gap-2" onClick={handleRefresh}>
              <RefreshCw className={cn("h-4 w-4", isRefreshing && "animate-spin")} />
              Atualizar
            </Button>
            <Button size="sm" className="gap-2" onClick={() => setIsAIQueryOpen(true)}>
              <MessageSquare className="h-4 w-4" />
              Perguntar à IA
            </Button>
          </div>
        }
      />

      <PageContent>
        {/* AI Insights Banner */}
        <Card className="border-border/50 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 via-purple-500/5 to-transparent" />
          <CardContent className="p-6 relative">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 shadow-lg">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Insights da Inteligência Artificial</h3>
                <p className="text-sm text-muted-foreground">
                  Análises automáticas baseadas nos seus dados dos últimos 30 dias
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {aiInsights.map((insight, index) => (
                <Card 
                  key={index}
                  className={cn(
                    "border-border/50 hover:shadow-lg transition-all duration-300 cursor-pointer",
                    insight.type === "success" && "hover:border-emerald-500/30",
                    insight.type === "warning" && "hover:border-amber-500/30",
                    insight.type === "info" && "hover:border-blue-500/30"
                  )}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      {insight.type === "success" && (
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      )}
                      {insight.type === "warning" && (
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                      )}
                      {insight.type === "info" && (
                        <Lightbulb className="h-4 w-4 text-blue-500" />
                      )}
                      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        {insight.type === "success" ? "Positivo" : insight.type === "warning" ? "Atenção" : "Dica"}
                      </span>
                    </div>
                    <h4 className="font-semibold text-sm mb-1">{insight.title}</h4>
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                      {insight.description}
                    </p>
                    <Button variant="ghost" size="sm" className="h-7 px-2 text-xs gap-1">
                      {insight.action}
                      <ArrowUpRight className="h-3 w-3" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi) => (
            <Card key={kpi.label} className="group relative overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
              <div className={cn("absolute inset-0 opacity-5 bg-gradient-to-br", kpi.color)} />
              <CardContent className="p-4 relative">
                <div className="flex items-start justify-between mb-3">
                  <div className={cn("p-2.5 rounded-xl bg-gradient-to-br shadow-lg", kpi.color)}>
                    <kpi.icon className="h-5 w-5 text-white" />
                  </div>
                  <Badge 
                    variant="secondary" 
                    className={cn(
                      "text-xs font-medium gap-1",
                      kpi.trend === "up" ? "text-emerald-600" : "text-red-500"
                    )}
                  >
                    {kpi.trend === "up" ? (
                      <ArrowUpRight className="h-3 w-3" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3" />
                    )}
                    {kpi.change}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{kpi.label}</p>
                <p className="text-2xl font-bold">{kpi.value}</p>
                {/* Mini Sparkline */}
                <div className="mt-3 h-8">
                  <ResponsiveContainer width="100%" height="100%">
                    <ReLineChart data={kpi.sparkline.map((v, i) => ({ v }))}>
                      <Line 
                        type="monotone" 
                        dataKey="v" 
                        stroke={kpi.trend === "up" ? "hsl(142, 76%, 36%)" : "hsl(0, 84%, 60%)"} 
                        strokeWidth={2} 
                        dot={false} 
                      />
                    </ReLineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-emerald-500" />
                    Receita vs Despesas
                  </CardTitle>
                  <CardDescription>Comparativo mensal</CardDescription>
                </div>
                <Badge variant="outline" className="gap-1">
                  <TrendingUp className="h-3 w-3 text-emerald-500" />
                  +18%
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="colorReceita" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorDespesas" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `${v/1000}k`} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                      formatter={(value: number) => [`R$ ${value.toLocaleString()}`, '']}
                    />
                    <Area type="monotone" dataKey="receita" stroke="hsl(142, 76%, 36%)" fillOpacity={1} fill="url(#colorReceita)" strokeWidth={2} name="Receita" />
                    <Area type="monotone" dataKey="despesas" stroke="hsl(0, 84%, 60%)" fillOpacity={1} fill="url(#colorDespesas)" strokeWidth={2} name="Despesas" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Appointments Chart */}
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-blue-500" />
                    Performance Semanal
                  </CardTitle>
                  <CardDescription>Agendamentos realizados</CardDescription>
                </div>
                <Badge variant="outline" className="gap-1">
                  Taxa: 92%
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={appointmentsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="realizados" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Realizados" />
                    <Bar dataKey="cancelados" fill="hsl(0, 84%, 60%)" radius={[4, 4, 0, 0]} name="Cancelados" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Distribution + Predictions */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Service Distribution */}
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <PieChart className="h-5 w-5 text-violet-500" />
                Distribuição por Especialidade
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] relative">
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie
                      data={serviceDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={80}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {serviceDistribution.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                  </RePieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-4">
                {serviceDistribution.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-muted-foreground">{item.name}</span>
                    </div>
                    <span className="font-medium">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Predictions */}
          <Card className="lg:col-span-2 border-border/50">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-gradient-to-br from-violet-500 to-purple-500">
                  <Brain className="h-4 w-4 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">Previsões da IA</CardTitle>
                  <CardDescription>Tendências para os próximos 30 dias</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="h-5 w-5 text-emerald-500" />
                    <span className="font-medium">Receita Projetada</span>
                  </div>
                  <p className="text-2xl font-bold text-emerald-600">R$ 72.000</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Aumento esperado de 7% baseado na sazonalidade
                  </p>
                  <Progress value={85} className="h-2 mt-3" />
                </div>

                <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/20">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="h-5 w-5 text-blue-500" />
                    <span className="font-medium">Novos Pacientes</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">+45</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Estimativa baseada em tendência de crescimento
                  </p>
                  <Progress value={72} className="h-2 mt-3" />
                </div>

                <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="h-5 w-5 text-amber-500" />
                    <span className="font-medium">Meta de Ocupação</span>
                  </div>
                  <p className="text-2xl font-bold text-amber-600">92%</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Possível com ajustes na agenda
                  </p>
                  <Progress value={92} className="h-2 mt-3" />
                </div>

                <div className="p-4 rounded-xl bg-violet-500/5 border border-violet-500/20">
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="h-5 w-5 text-violet-500" />
                    <span className="font-medium">Eficiência Operacional</span>
                  </div>
                  <p className="text-2xl font-bold text-violet-600">+15%</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Potencial de melhoria identificado
                  </p>
                  <Progress value={65} className="h-2 mt-3" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <AIQueryModal 
          open={isAIQueryOpen} 
          onOpenChange={setIsAIQueryOpen} 
        />
      </PageContent>
    </PageContainer>
  );
}
