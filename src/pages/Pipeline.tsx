import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PageHeader } from "@/components/ui/page-header";
import { PageContainer, PageContent } from "@/components/ui/page-container";
import { cn } from "@/lib/utils";
import {
  Target,
  Users,
  Phone,
  Mail,
  MessageSquare,
  Calendar,
  Clock,
  ArrowRight,
  DollarSign,
  TrendingUp,
  Filter,
  Search,
  Plus,
  RefreshCw,
  Sparkles,
  Brain,
  AlertTriangle,
  CheckCircle2,
  Timer,
  ArrowUpRight,
  Star,
  Gift,
  ThumbsUp,
  Bell,
  Zap,
  Eye,
  MoreHorizontal,
  GripVertical,
  ChevronRight,
  Flame,
  Award,
  UserPlus,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Pipeline stages
const pipelineStages = [
  { id: "primeiro_contato", name: "Primeiro Contato", color: "from-slate-500 to-slate-600", count: 28, icon: UserPlus },
  { id: "qualificacao", name: "Qualificação", color: "from-blue-500 to-blue-600", count: 15, icon: Target },
  { id: "agendamento", name: "Agendamento", color: "from-amber-500 to-amber-600", count: 12, icon: Calendar },
  { id: "consulta", name: "Consulta Realizada", color: "from-emerald-500 to-emerald-600", count: 8, icon: CheckCircle2 },
  { id: "fechamento", name: "Fechamento", color: "from-purple-500 to-purple-600", count: 5, icon: DollarSign },
  { id: "fidelizado", name: "Fidelizado", color: "from-pink-500 to-pink-600", count: 42, icon: Award },
];

// Mock patients in pipeline
const pipelinePatients = [
  { id: 1, name: "Maria Silva", avatar: "", stage: "primeiro_contato", source: "WhatsApp", value: 0, lastContact: "Hoje, 10:30", phone: "(11) 99999-1234", interest: "Consulta Cardiologia", score: 85, daysInStage: 1 },
  { id: 2, name: "João Pedro", avatar: "", stage: "primeiro_contato", source: "Instagram", value: 0, lastContact: "Hoje, 09:15", phone: "(11) 98888-4321", interest: "Exames", score: 72, daysInStage: 2 },
  { id: 3, name: "Ana Costa", avatar: "", stage: "qualificacao", source: "Site", value: 350, lastContact: "Ontem", phone: "(11) 97777-5678", interest: "Consulta Dermatologia", score: 90, daysInStage: 3 },
  { id: 4, name: "Carlos Lima", avatar: "", stage: "qualificacao", source: "Indicação", value: 500, lastContact: "2 dias", phone: "(11) 96666-8765", interest: "Check-up Completo", score: 95, daysInStage: 2 },
  { id: 5, name: "Fernanda Rocha", avatar: "", stage: "agendamento", source: "WhatsApp", value: 280, lastContact: "Hoje", phone: "(11) 95555-2345", interest: "Retorno", score: 88, daysInStage: 1 },
  { id: 6, name: "Ricardo Alves", avatar: "", stage: "consulta", source: "Google", value: 450, lastContact: "Ontem", phone: "(11) 94444-6789", interest: "Consulta Ortopedia", score: 92, daysInStage: 0 },
  { id: 7, name: "Patrícia Souza", avatar: "", stage: "fechamento", source: "Indicação", value: 1200, lastContact: "Hoje", phone: "(11) 93333-3456", interest: "Tratamento Completo", score: 98, daysInStage: 2 },
  { id: 8, name: "Bruno Martins", avatar: "", stage: "fidelizado", source: "Recorrente", value: 3500, lastContact: "1 semana", phone: "(11) 92222-7890", interest: "Acompanhamento", score: 100, daysInStage: 180 },
];

// Patients needing re-engagement
const reengagementPatients = [
  { id: 1, name: "Luciana Ferreira", lastVisit: "6 meses atrás", totalSpent: 2800, visits: 8, recommendedAction: "Lembrete de retorno", urgency: "high" },
  { id: 2, name: "Marcos Oliveira", lastVisit: "4 meses atrás", totalSpent: 1500, visits: 5, recommendedAction: "Promoção especial", urgency: "medium" },
  { id: 3, name: "Sandra Costa", lastVisit: "8 meses atrás", totalSpent: 4200, visits: 12, recommendedAction: "Ligação pessoal", urgency: "high" },
  { id: 4, name: "Roberto Silva", lastVisit: "3 meses atrás", totalSpent: 900, visits: 3, recommendedAction: "E-mail informativo", urgency: "low" },
  { id: 5, name: "Camila Santos", lastVisit: "5 meses atrás", totalSpent: 2100, visits: 7, recommendedAction: "WhatsApp com novidades", urgency: "medium" },
];

// AI Insights
const aiInsights = [
  { type: "opportunity", message: "3 pacientes em Qualificação têm alta probabilidade de conversão", action: "Ver pacientes", icon: CheckCircle2, color: "text-emerald-500" },
  { type: "alert", message: "5 pacientes não tiveram contato há mais de 7 dias", action: "Agendar follow-up", icon: AlertTriangle, color: "text-amber-500" },
  { type: "suggestion", message: "Melhor horário para contatos: 10h-12h (taxa de resposta 78%)", action: "Ajustar agenda", icon: Zap, color: "text-blue-500" },
  { type: "trend", message: "Taxa de conversão aumentou 15% este mês", action: "Ver detalhes", icon: TrendingUp, color: "text-purple-500" },
];

export default function Pipeline() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStage, setSelectedStage] = useState<string | null>(null);

  const getPatientsByStage = (stageId: string) => {
    return pipelinePatients.filter(p => p.stage === stageId);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-emerald-600 bg-emerald-500/10 border-emerald-500/20";
    if (score >= 70) return "text-amber-600 bg-amber-500/10 border-amber-500/20";
    return "text-red-600 bg-red-500/10 border-red-500/20";
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high": return "text-red-600 bg-red-500/10 border-red-500/20";
      case "medium": return "text-amber-600 bg-amber-500/10 border-amber-500/20";
      default: return "text-blue-600 bg-blue-500/10 border-blue-500/20";
    }
  };

  return (
    <PageContainer>
      <PageHeader
        icon={Target}
        iconGradient="from-purple-500 to-pink-600"
        title="Pipeline de Pacientes"
        description="Gerencie a jornada completa dos pacientes do primeiro contato à fidelização"
        actions={
          <>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filtros</span>
            </Button>
            <Button className="gap-2 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Novo Lead</span>
            </Button>
          </>
        }
      />

      <PageContent>
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <Card className="group relative overflow-hidden border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-50" />
            <CardContent className="p-4 relative">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg group-hover:scale-110 transition-transform">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Total no Pipeline</p>
                  <p className="text-2xl font-bold">110</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="group relative overflow-hidden border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 hover:shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-emerald-500/10 opacity-50" />
            <CardContent className="p-4 relative">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg group-hover:scale-110 transition-transform">
                  <DollarSign className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Valor Potencial</p>
                  <p className="text-2xl font-bold text-emerald-600">R$ 45.2k</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="group relative overflow-hidden border-amber-500/20 hover:border-amber-500/40 transition-all duration-300 hover:shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-amber-500/10 opacity-50" />
            <CardContent className="p-4 relative">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 shadow-lg group-hover:scale-110 transition-transform">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Taxa Conversão</p>
                  <p className="text-2xl font-bold text-amber-600">32%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="group relative overflow-hidden border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-500/10 opacity-50" />
            <CardContent className="p-4 relative">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg group-hover:scale-110 transition-transform">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Tempo Médio</p>
                  <p className="text-2xl font-bold text-blue-600">5.2 dias</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="group relative overflow-hidden border-red-500/20 hover:border-red-500/40 transition-all duration-300 hover:shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-red-500/10 opacity-50" />
            <CardContent className="p-4 relative">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-red-500 to-red-600 shadow-lg group-hover:scale-110 transition-transform">
                  <Flame className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Reengajar</p>
                  <p className="text-2xl font-bold text-red-600">23</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Insights Bar */}
        <Card className="mb-6 overflow-hidden border-purple-500/20">
          <div className="p-4 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-amber-500/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">Insights Inteligentes</h3>
                <p className="text-xs text-muted-foreground">Recomendações baseadas em IA</p>
              </div>
              <Badge variant="outline" className="gap-1 text-purple-600 border-purple-500/30 ml-auto">
                <Sparkles className="h-3 w-3" />
                4 novos insights
              </Badge>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {aiInsights.map((insight, idx) => (
                <div 
                  key={idx} 
                  className="p-4 rounded-xl bg-card/80 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all cursor-pointer group hover:shadow-md"
                >
                  <div className="flex items-start gap-3">
                    <div className={cn("p-2 rounded-lg bg-muted/50", insight.color)}>
                      <insight.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground leading-relaxed mb-2">{insight.message}</p>
                      <Button variant="link" size="sm" className="h-auto p-0 text-xs text-primary group-hover:underline">
                        {insight.action}
                        <ChevronRight className="h-3 w-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Tabs defaultValue="pipeline" className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <TabsList className="bg-muted/50 p-1 flex-wrap h-auto">
              <TabsTrigger value="pipeline" className="gap-2 text-xs sm:text-sm">
                <Target className="h-4 w-4" />
                Pipeline
              </TabsTrigger>
              <TabsTrigger value="reengajar" className="gap-2 text-xs sm:text-sm">
                <RefreshCw className="h-4 w-4" />
                Reengajar
              </TabsTrigger>
              <TabsTrigger value="analytics" className="gap-2 text-xs sm:text-sm">
                <TrendingUp className="h-4 w-4" />
                Análises
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar paciente..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
          </div>

          {/* Pipeline Tab */}
          <TabsContent value="pipeline" className="mt-0">
            <div className="overflow-x-auto pb-4 -mx-4 px-4">
              <div className="flex gap-4" style={{ minWidth: 'max-content' }}>
                {pipelineStages.map((stage) => {
                  const StageIcon = stage.icon;
                  return (
                    <div key={stage.id} className="w-72 lg:w-80 flex-shrink-0">
                      {/* Stage Header */}
                      <div className={cn(
                        "p-4 rounded-t-2xl bg-gradient-to-r text-white shadow-lg",
                        stage.color
                      )}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <StageIcon className="h-5 w-5" />
                            <h3 className="font-semibold text-sm lg:text-base">{stage.name}</h3>
                          </div>
                          <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm">
                            {stage.count}
                          </Badge>
                        </div>
                      </div>

                      {/* Stage Cards */}
                      <div className="bg-muted/30 rounded-b-2xl p-3 min-h-[400px] lg:min-h-[450px] space-y-3 border border-t-0 border-border/50 max-h-[60vh] overflow-y-auto">
                        {getPatientsByStage(stage.id).map((patient) => (
                          <Card 
                            key={patient.id} 
                            className="p-4 hover:shadow-lg transition-all cursor-pointer group border-border/50 hover:border-primary/30 bg-card/80 backdrop-blur-sm"
                          >
                            <div className="flex items-start gap-3">
                              <GripVertical className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity cursor-grab mt-1" />
                              <Avatar className="h-11 w-11 ring-2 ring-background shadow-sm">
                                <AvatarImage src={patient.avatar} />
                                <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-medium">
                                  {patient.name.split(" ").map(n => n[0]).join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                  <h4 className="font-semibold text-sm truncate">{patient.name}</h4>
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger>
                                        <Badge className={cn("text-xs border", getScoreColor(patient.score))}>
                                          {patient.score}
                                        </Badge>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Score de conversão</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </div>
                                <p className="text-xs text-muted-foreground truncate mb-2">{patient.interest}</p>
                                <div className="flex items-center flex-wrap gap-1.5">
                                  <Badge variant="outline" className="text-xs py-0.5 px-2 bg-muted/50">
                                    {patient.source}
                                  </Badge>
                                  <span className="text-xs text-muted-foreground">•</span>
                                  <span className="text-xs text-muted-foreground">{patient.lastContact}</span>
                                </div>
                                {patient.value > 0 && (
                                  <div className="flex items-center gap-1 mt-2">
                                    <DollarSign className="h-3.5 w-3.5 text-emerald-500" />
                                    <span className="text-sm font-semibold text-emerald-600">
                                      R$ {patient.value.toLocaleString()}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="flex items-center gap-1.5 mt-4 pt-3 border-t border-border/50">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                      <Phone className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>Ligar</TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                      <MessageSquare className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>WhatsApp</TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                      <Mail className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>E-mail</TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                              <Button variant="outline" size="sm" className="h-8 px-3 text-xs gap-1.5 ml-auto">
                                Avançar
                                <ArrowRight className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </Card>
                        ))}

                        {getPatientsByStage(stage.id).length === 0 && (
                          <div className="flex flex-col items-center justify-center py-12 text-center">
                            <div className="p-4 rounded-2xl bg-muted/50 mb-3">
                              <Users className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Nenhum paciente nesta etapa
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </TabsContent>

          {/* Reengajar Tab */}
          <TabsContent value="reengajar" className="mt-0">
            <Card className="overflow-hidden">
              <div className="p-6 border-b bg-gradient-to-r from-red-500/5 to-amber-500/5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-red-500 to-amber-500 shadow-lg">
                      <RefreshCw className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Pacientes para Reengajar</h3>
                      <p className="text-sm text-muted-foreground">
                        Pacientes que não visitam há algum tempo
                      </p>
                    </div>
                  </div>
                  <Button className="gap-2">
                    <Bell className="h-4 w-4" />
                    Campanha em Massa
                  </Button>
                </div>
              </div>
              
              <CardContent className="p-0">
                <div className="divide-y divide-border/50">
                  {reengagementPatients.map((patient) => (
                    <div
                      key={patient.id}
                      className="flex items-center justify-between p-5 hover:bg-muted/30 transition-colors group"
                    >
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12 ring-2 ring-background shadow-sm">
                          <AvatarFallback className="bg-gradient-to-br from-red-500/20 to-amber-500/20 text-foreground font-medium">
                            {patient.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold">{patient.name}</h4>
                            <Badge variant="outline" className={cn("text-xs border", getUrgencyColor(patient.urgency))}>
                              {patient.urgency === "high" ? "Urgente" : patient.urgency === "medium" ? "Médio" : "Baixo"}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" />
                              {patient.lastVisit}
                            </span>
                            <span>•</span>
                            <span>{patient.visits} visitas</span>
                            <span>•</span>
                            <span className="text-emerald-600 font-medium">
                              R$ {patient.totalSpent.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary" className="gap-1.5 px-3 py-1.5">
                          <Sparkles className="h-3.5 w-3.5 text-purple-500" />
                          {patient.recommendedAction}
                        </Badge>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" className="h-9 w-9">
                            <Phone className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-9 w-9">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-9 w-9">
                            <Mail className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button variant="outline" size="sm" className="gap-1.5">
                          Ação
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="mt-0">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Taxa de Conversão</h4>
                    <p className="text-xs text-muted-foreground">Últimos 30 dias</p>
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-4xl font-bold text-emerald-600">32%</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                      <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                      +5% vs mês anterior
                    </p>
                  </div>
                  <div className="h-20 w-32 bg-gradient-to-t from-emerald-500/20 to-transparent rounded-lg" />
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Tempo Médio de Conversão</h4>
                    <p className="text-xs text-muted-foreground">Do contato ao fechamento</p>
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-4xl font-bold text-blue-600">5.2</p>
                    <p className="text-lg font-medium text-muted-foreground">dias</p>
                  </div>
                  <div className="space-y-2">
                    {["Primeiro Contato", "Qualificação", "Agendamento"].map((stage, idx) => (
                      <div key={stage} className="flex items-center gap-2 text-xs">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        <span className="text-muted-foreground">{stage}:</span>
                        <span className="font-medium">{idx + 1}d</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg">
                    <Star className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Top Fontes</h4>
                    <p className="text-xs text-muted-foreground">Origem dos leads</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { name: "WhatsApp", value: 42, color: "bg-emerald-500" },
                    { name: "Indicação", value: 28, color: "bg-purple-500" },
                    { name: "Instagram", value: 18, color: "bg-pink-500" },
                    { name: "Google", value: 12, color: "bg-blue-500" },
                  ].map((source) => (
                    <div key={source.name}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span>{source.name}</span>
                        <span className="font-medium">{source.value}%</span>
                      </div>
                      <Progress value={source.value} className="h-2" />
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </PageContent>
    </PageContainer>
  );
}
