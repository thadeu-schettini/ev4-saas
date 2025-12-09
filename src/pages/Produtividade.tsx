import { useState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { PageContainer, PageContent } from "@/components/ui/page-container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  BarChart3, 
  Clock, 
  Users,
  Star,
  TrendingUp,
  TrendingDown,
  Calendar,
  Target,
  Award,
  Timer,
  UserCheck,
  ThumbsUp,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const mockProfessionals = [
  {
    id: 1,
    name: "Dr. Carlos Santos",
    specialty: "Clínico Geral",
    avatar: null,
    metrics: {
      consultations: 156,
      avgDuration: "28 min",
      satisfaction: 4.8,
      returnRate: 32,
      punctuality: 94,
      noShowRate: 8
    },
    trend: "up",
    ranking: 1
  },
  {
    id: 2,
    name: "Dra. Ana Lima",
    specialty: "Cardiologia",
    avatar: null,
    metrics: {
      consultations: 98,
      avgDuration: "35 min",
      satisfaction: 4.9,
      returnRate: 45,
      punctuality: 88,
      noShowRate: 5
    },
    trend: "up",
    ranking: 2
  },
  {
    id: 3,
    name: "Dra. Beatriz Rocha",
    specialty: "Pediatria",
    avatar: null,
    metrics: {
      consultations: 187,
      avgDuration: "22 min",
      satisfaction: 4.7,
      returnRate: 28,
      punctuality: 91,
      noShowRate: 12
    },
    trend: "down",
    ranking: 3
  },
  {
    id: 4,
    name: "Dr. Pedro Mendes",
    specialty: "Ortopedia",
    avatar: null,
    metrics: {
      consultations: 72,
      avgDuration: "40 min",
      satisfaction: 4.6,
      returnRate: 38,
      punctuality: 85,
      noShowRate: 10
    },
    trend: "stable",
    ranking: 4
  }
];

const consultationsData = [
  { month: "Jan", value: 320 },
  { month: "Fev", value: 350 },
  { month: "Mar", value: 380 },
  { month: "Abr", value: 420 },
  { month: "Mai", value: 390 },
  { month: "Jun", value: 450 }
];

const weeklyData = [
  { day: "Seg", consultas: 45, cancelamentos: 3 },
  { day: "Ter", consultas: 52, cancelamentos: 2 },
  { day: "Qua", consultas: 48, cancelamentos: 4 },
  { day: "Qui", consultas: 55, cancelamentos: 1 },
  { day: "Sex", consultas: 42, cancelamentos: 5 },
  { day: "Sáb", consultas: 28, cancelamentos: 2 }
];

const Produtividade = () => {
  const [period, setPeriod] = useState("month");
  const [selectedProfessional, setSelectedProfessional] = useState("all");

  const globalStats = [
    { label: "Total Consultas", value: "513", change: "+12%", positive: true, icon: Calendar },
    { label: "Tempo Médio", value: "31 min", change: "-5%", positive: true, icon: Timer },
    { label: "Satisfação Média", value: "4.75", change: "+0.2", positive: true, icon: Star },
    { label: "Taxa de Retorno", value: "35%", change: "+3%", positive: true, icon: UserCheck }
  ];

  return (
    <PageContainer>
      <PageHeader
        title="Dashboard de Produtividade"
        description="Métricas e performance dos profissionais"
        icon={BarChart3}
        actions={
          <div className="flex gap-2">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Esta Semana</SelectItem>
                <SelectItem value="month">Este Mês</SelectItem>
                <SelectItem value="quarter">Este Trimestre</SelectItem>
                <SelectItem value="year">Este Ano</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              Exportar
            </Button>
          </div>
        }
      />

      <PageContent>
        {/* Global Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {globalStats.map((stat, index) => (
            <Card key={index} className="relative overflow-hidden group hover:shadow-md transition-all">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-lg bg-muted/50`}>
                    <stat.icon className="h-4 w-4 text-primary" />
                  </div>
                  <Badge variant="outline" className={stat.positive ? "bg-confirmed/10 text-confirmed border-confirmed/20" : "bg-destructive/10 text-destructive border-destructive/20"}>
                    {stat.positive ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                    {stat.change}
                  </Badge>
                </div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Chart - Consultas ao Longo do Tempo */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              Evolução de Consultas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={consultationsData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
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
                    dataKey="value" 
                    stroke="hsl(var(--primary))" 
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Chart - Semanal */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-primary" />
              Resumo Semanal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
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
                  <Bar dataKey="consultas" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="cancelamentos" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Professional Rankings */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <Award className="h-4 w-4 text-primary" />
              Ranking de Profissionais
            </CardTitle>
            <Select value={selectedProfessional} onValueChange={setSelectedProfessional}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="general">Clínico Geral</SelectItem>
                <SelectItem value="cardio">Cardiologia</SelectItem>
                <SelectItem value="pediatria">Pediatria</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {mockProfessionals.map((professional, index) => (
                <Card key={professional.id} className="group hover:shadow-md transition-all hover:border-primary/20">
                  <CardContent className="p-4">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                      {/* Ranking & Avatar */}
                      <div className="flex items-center gap-4">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-sm ${
                          index === 0 ? 'bg-gradient-to-br from-yellow-400 to-amber-500 text-white' :
                          index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-white' :
                          index === 2 ? 'bg-gradient-to-br from-amber-600 to-amber-700 text-white' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          {professional.ranking}
                        </div>
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={professional.avatar || undefined} />
                          <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/5">
                            {professional.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{professional.name}</h3>
                            {professional.trend === "up" && <TrendingUp className="h-4 w-4 text-confirmed" />}
                            {professional.trend === "down" && <TrendingDown className="h-4 w-4 text-destructive" />}
                          </div>
                          <Badge variant="outline" className="text-xs mt-1">
                            {professional.specialty}
                          </Badge>
                        </div>
                      </div>

                      {/* Metrics Grid */}
                      <div className="flex-1 grid grid-cols-3 md:grid-cols-6 gap-4 lg:gap-6">
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground mb-1">Consultas</p>
                          <p className="font-semibold">{professional.metrics.consultations}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground mb-1">Tempo Médio</p>
                          <p className="font-semibold">{professional.metrics.avgDuration}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground mb-1">Satisfação</p>
                          <div className="flex items-center justify-center gap-1">
                            <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                            <span className="font-semibold">{professional.metrics.satisfaction}</span>
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground mb-1">Retorno</p>
                          <p className="font-semibold">{professional.metrics.returnRate}%</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground mb-1">Pontualidade</p>
                          <p className="font-semibold text-confirmed">{professional.metrics.punctuality}%</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground mb-1">No-Show</p>
                          <p className="font-semibold text-destructive">{professional.metrics.noShowRate}%</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
      </PageContent>
    </PageContainer>
  );
};

export default Produtividade;
