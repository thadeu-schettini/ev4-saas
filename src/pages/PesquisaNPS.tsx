import { useState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { PageContainer } from "@/components/ui/page-container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { 
  MessageSquareHeart, 
  Search, 
  TrendingUp,
  TrendingDown,
  ThumbsUp,
  ThumbsDown,
  Meh,
  User,
  Star,
  Send,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  MessageSquare,
  Calendar
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const npsHistory = [
  { month: "Jul", nps: 72 },
  { month: "Ago", nps: 68 },
  { month: "Set", nps: 75 },
  { month: "Out", nps: 78 },
  { month: "Nov", nps: 82 },
  { month: "Dez", nps: 85 }
];

const categoryBreakdown = [
  { name: "Promotores", value: 65, color: "hsl(var(--confirmed))" },
  { name: "Neutros", value: 20, color: "hsl(var(--pending))" },
  { name: "Detratores", value: 15, color: "hsl(var(--destructive))" }
];

const mockResponses = [
  {
    id: 1,
    patient: "Maria Silva",
    professional: "Dr. Carlos Santos",
    score: 10,
    date: "10/01/2025",
    comment: "Excelente atendimento! Médico muito atencioso e explicou tudo com clareza.",
    sentiment: "positive"
  },
  {
    id: 2,
    patient: "João Oliveira",
    professional: "Dra. Ana Lima",
    score: 8,
    date: "10/01/2025",
    comment: "Bom atendimento, mas a espera foi um pouco longa.",
    sentiment: "neutral"
  },
  {
    id: 3,
    patient: "Ana Costa",
    professional: "Dra. Beatriz Rocha",
    score: 9,
    date: "09/01/2025",
    comment: "Muito satisfeita com o tratamento. Recomendo!",
    sentiment: "positive"
  },
  {
    id: 4,
    patient: "Pedro Mendes",
    professional: "Dr. Carlos Santos",
    score: 6,
    date: "09/01/2025",
    comment: "O atendimento foi ok, mas tive dificuldade para agendar.",
    sentiment: "negative"
  }
];

const PesquisaNPS = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [period, setPeriod] = useState("month");

  const currentNPS = 85;
  const previousNPS = 78;
  const npsChange = currentNPS - previousNPS;

  const stats = [
    { label: "NPS Atual", value: currentNPS, change: `+${npsChange}`, positive: true, icon: TrendingUp },
    { label: "Respostas", value: 342, change: "+12%", positive: true, icon: MessageSquare },
    { label: "Taxa Resposta", value: "68%", change: "+5%", positive: true, icon: Send },
    { label: "Promotores", value: "65%", change: "+3%", positive: true, icon: ThumbsUp }
  ];

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive": return <ThumbsUp className="h-4 w-4 text-confirmed" />;
      case "negative": return <ThumbsDown className="h-4 w-4 text-destructive" />;
      default: return <Meh className="h-4 w-4 text-pending" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 9) return "text-confirmed";
    if (score >= 7) return "text-pending";
    return "text-destructive";
  };

  return (
    <PageContainer>
      <PageHeader
        title="Pesquisa NPS"
        description="Net Promoter Score e satisfação do paciente"
        icon={MessageSquareHeart}
        actions={
          <div className="flex gap-2">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Esta Semana</SelectItem>
                <SelectItem value="month">Este Mês</SelectItem>
                <SelectItem value="quarter">Trimestre</SelectItem>
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

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <Card key={index} className="relative overflow-hidden group hover:shadow-md transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 rounded-lg bg-muted/50">
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
        {/* NPS Score Card */}
        <Card className="relative overflow-hidden">
          <CardHeader>
            <CardTitle className="text-base">Score NPS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-8">
              <div className="relative">
                <div className={`text-6xl font-bold ${
                  currentNPS >= 70 ? "text-confirmed" :
                  currentNPS >= 50 ? "text-pending" :
                  "text-destructive"
                }`}>
                  {currentNPS}
                </div>
                <div className="absolute -top-2 -right-8">
                  <Badge variant="outline" className="bg-confirmed/10 text-confirmed border-confirmed/20">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +{npsChange}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Zona de Excelência</span>
                <span className="font-medium text-confirmed">70-100</span>
              </div>
              <Progress value={currentNPS} className="h-3 [&>div]:bg-confirmed" />
            </div>
          </CardContent>
        </Card>

        {/* NPS History Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              Evolução do NPS
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={npsHistory}>
                  <defs>
                    <linearGradient id="colorNPS" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis domain={[0, 100]} className="text-xs" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="nps" 
                    stroke="hsl(var(--primary))" 
                    fillOpacity={1} 
                    fill="url(#colorNPS)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Distribuição</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              {categoryBreakdown.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Responses */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-primary" />
                Respostas Recentes
              </CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                {mockResponses.map((response) => (
                  <div key={response.id} className="p-4 rounded-xl bg-muted/30 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/5 text-sm">
                            {response.patient.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{response.patient}</p>
                          <p className="text-xs text-muted-foreground">{response.professional}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-3 w-3 ${i < Math.round(response.score / 2) ? "text-yellow-500 fill-yellow-500" : "text-muted"}`} 
                            />
                          ))}
                        </div>
                        <div className={`text-lg font-bold ${getScoreColor(response.score)}`}>
                          {response.score}
                        </div>
                        {getSentimentIcon(response.sentiment)}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{response.comment}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{response.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default PesquisaNPS;
