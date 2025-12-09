import { useState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { PageContainer, PageContent } from "@/components/ui/page-container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Brain, 
  TrendingUp,
  Calendar,
  Clock,
  Users,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight,
  Lightbulb,
  Target,
  Zap
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from "recharts";

const demandForecast = [
  { hour: "08:00", atual: 8, previsto: 10, capacidade: 12 },
  { hour: "09:00", atual: 12, previsto: 14, capacidade: 12 },
  { hour: "10:00", atual: 10, previsto: 12, capacidade: 12 },
  { hour: "11:00", atual: 11, previsto: 11, capacidade: 12 },
  { hour: "12:00", atual: 4, previsto: 5, capacidade: 12 },
  { hour: "13:00", atual: 3, previsto: 4, capacidade: 12 },
  { hour: "14:00", atual: 9, previsto: 11, capacidade: 12 },
  { hour: "15:00", atual: 11, previsto: 13, capacidade: 12 },
  { hour: "16:00", atual: 10, previsto: 10, capacidade: 12 },
  { hour: "17:00", atual: 7, previsto: 8, capacidade: 12 },
  { hour: "18:00", atual: 5, previsto: 6, capacidade: 12 }
];

const weeklyTrend = [
  { day: "Seg", demanda: 85 },
  { day: "Ter", demanda: 92 },
  { day: "Qua", demanda: 78 },
  { day: "Qui", demanda: 95 },
  { day: "Sex", demanda: 88 },
  { day: "Sáb", demanda: 65 }
];

const recommendations = [
  {
    id: 1,
    type: "warning",
    title: "Pico de demanda previsto",
    description: "Terça-feira às 09:00 terá 40% mais procura que o normal. Considere adicionar horários extras.",
    impact: "Alto",
    action: "Abrir 3 vagas extras"
  },
  {
    id: 2,
    type: "opportunity",
    title: "Horário subutilizado",
    description: "Quarta-feira à tarde tem apenas 45% de ocupação. Ótimo para promoções ou retornos.",
    impact: "Médio",
    action: "Campanha de retorno"
  },
  {
    id: 3,
    type: "success",
    title: "Otimização realizada",
    description: "Redistribuição de quinta para sexta reduziu tempo de espera em 25%.",
    impact: "Positivo",
    action: null
  }
];

const seasonalInsights = [
  { month: "Jan", factor: 0.8, label: "Baixa" },
  { month: "Fev", factor: 0.7, label: "Baixa" },
  { month: "Mar", factor: 0.9, label: "Normal" },
  { month: "Abr", factor: 1.0, label: "Normal" },
  { month: "Mai", factor: 1.1, label: "Alta" },
  { month: "Jun", factor: 1.2, label: "Alta" },
  { month: "Jul", factor: 1.0, label: "Normal" },
  { month: "Ago", factor: 0.9, label: "Normal" },
  { month: "Set", factor: 1.0, label: "Normal" },
  { month: "Out", factor: 1.1, label: "Alta" },
  { month: "Nov", factor: 1.0, label: "Normal" },
  { month: "Dez", factor: 0.7, label: "Baixa" }
];

const PrevisaoDemanda = () => {
  const [period, setPeriod] = useState("week");

  const stats = [
    { label: "Precisão do Modelo", value: "94%", change: "+2%", positive: true, icon: Target },
    { label: "Economia Estimada", value: "R$ 12.5k", change: "+18%", positive: true, icon: TrendingUp },
    { label: "Horários Otimizados", value: "23", change: "+5", positive: true, icon: Clock },
    { label: "Previsões Hoje", value: "156", icon: Sparkles }
  ];

  return (
    <PageContainer>
      <PageHeader
        title="Previsão de Demanda"
        description="IA para otimização de agenda e previsão de horários de pico"
        icon={Brain}
        actions={
          <div className="flex gap-2">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Hoje</SelectItem>
                <SelectItem value="week">Esta Semana</SelectItem>
                <SelectItem value="month">Este Mês</SelectItem>
              </SelectContent>
            </Select>
            <Button className="gap-2">
              <Sparkles className="h-4 w-4" />
              Gerar Previsão
            </Button>
          </div>
        }
      />

      <PageContent>
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="relative overflow-hidden group hover:shadow-md transition-all">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-lg bg-muted/50">
                    <stat.icon className="h-4 w-4 text-primary" />
                  </div>
                  {stat.change && (
                    <Badge variant="outline" className={stat.positive ? "bg-confirmed/10 text-confirmed border-confirmed/20" : "bg-destructive/10 text-destructive border-destructive/20"}>
                      {stat.positive ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                      {stat.change}
                    </Badge>
                  )}
                </div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Demand Forecast Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              Previsão de Demanda por Horário
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={demandForecast}>
                  <defs>
                    <linearGradient id="colorAtual" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorPrevisto" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--info))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--info))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="hour" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="atual" 
                    name="Atual"
                    stroke="hsl(var(--primary))" 
                    fillOpacity={1} 
                    fill="url(#colorAtual)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="previsto" 
                    name="Previsto"
                    stroke="hsl(var(--info))" 
                    fillOpacity={1} 
                    fill="url(#colorPrevisto)" 
                    strokeDasharray="5 5"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-primary" />
                <span className="text-sm text-muted-foreground">Demanda Atual</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-info" />
                <span className="text-sm text-muted-foreground">Previsão IA</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-0.5 w-8 bg-muted-foreground" />
                <span className="text-sm text-muted-foreground">Capacidade</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              Tendência Semanal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyTrend}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="day" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                  <Bar dataKey="demanda" radius={[4, 4, 0, 0]}>
                    {weeklyTrend.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.demanda > 90 ? 'hsl(var(--destructive))' : entry.demanda > 80 ? 'hsl(var(--pending))' : 'hsl(var(--primary))'} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-primary" />
              Recomendações da IA
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                {recommendations.map((rec) => (
                  <div key={rec.id} className={`p-4 rounded-xl border ${
                    rec.type === "warning" ? "bg-pending/5 border-pending/20" :
                    rec.type === "opportunity" ? "bg-info/5 border-info/20" :
                    "bg-confirmed/5 border-confirmed/20"
                  }`}>
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${
                        rec.type === "warning" ? "bg-pending/10" :
                        rec.type === "opportunity" ? "bg-info/10" :
                        "bg-confirmed/10"
                      }`}>
                        {rec.type === "warning" && <AlertTriangle className="h-4 w-4 text-pending" />}
                        {rec.type === "opportunity" && <Zap className="h-4 w-4 text-info" />}
                        {rec.type === "success" && <CheckCircle2 className="h-4 w-4 text-confirmed" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{rec.title}</h4>
                          <Badge variant="outline" className="text-xs">
                            Impacto: {rec.impact}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
                        {rec.action && (
                          <Button size="sm" variant="outline">
                            {rec.action}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Seasonal Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              Sazonalidade Anual
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-2">
              {seasonalInsights.map((month, index) => (
                <div 
                  key={month.month}
                  className={`p-3 rounded-xl text-center transition-all hover:scale-105 ${
                    month.factor >= 1.1 ? "bg-destructive/10 border border-destructive/20" :
                    month.factor <= 0.8 ? "bg-confirmed/10 border border-confirmed/20" :
                    "bg-muted/50 border border-border"
                  }`}
                >
                  <p className="text-sm font-medium">{month.month}</p>
                  <p className={`text-xs mt-1 ${
                    month.factor >= 1.1 ? "text-destructive" :
                    month.factor <= 0.8 ? "text-confirmed" :
                    "text-muted-foreground"
                  }`}>
                    {month.label}
                  </p>
                  <p className="text-lg font-bold mt-1">{(month.factor * 100).toFixed(0)}%</p>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-6 mt-6">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-confirmed" />
                <span className="text-sm text-muted-foreground">Baixa Demanda</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-muted-foreground" />
                <span className="text-sm text-muted-foreground">Normal</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-destructive" />
                <span className="text-sm text-muted-foreground">Alta Demanda</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      </PageContent>
    </PageContainer>
  );
};

export default PrevisaoDemanda;
