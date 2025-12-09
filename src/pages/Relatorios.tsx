import { useState } from "react";
import { 
  FileText, 
  Download, 
  Filter, 
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  Clock,
  FileSpreadsheet,
  FileBarChart,
  Printer,
  Mail,
  RefreshCw,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  PieChart,
  Activity,
  Plus
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { PageContainer, PageContent } from "@/components/ui/page-container";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { ScheduleReportModal } from "@/components/relatorios/ScheduleReportModal";

const reportCategories = [
  { 
    id: "financeiro", 
    name: "Financeiro", 
    icon: DollarSign, 
    color: "from-emerald-500 to-green-500",
    reports: [
      { name: "Faturamento Mensal", description: "Receitas e despesas por período" },
      { name: "Contas a Receber", description: "Pagamentos pendentes de pacientes" },
      { name: "Fluxo de Caixa", description: "Entradas e saídas diárias" },
      { name: "Comissões", description: "Comissões por profissional" },
    ]
  },
  { 
    id: "atendimentos", 
    name: "Atendimentos", 
    icon: Activity, 
    color: "from-blue-500 to-cyan-500",
    reports: [
      { name: "Consultas Realizadas", description: "Total de atendimentos por período" },
      { name: "Taxa de Comparecimento", description: "No-show e cancelamentos" },
      { name: "Tempo de Espera", description: "Média de espera por profissional" },
      { name: "Procedimentos", description: "Procedimentos mais realizados" },
    ]
  },
  { 
    id: "pacientes", 
    name: "Pacientes", 
    icon: Users, 
    color: "from-violet-500 to-purple-500",
    reports: [
      { name: "Novos Pacientes", description: "Cadastros por período" },
      { name: "Pacientes Ativos", description: "Pacientes com consultas recentes" },
      { name: "Aniversariantes", description: "Lista de aniversariantes do mês" },
      { name: "Prontuários", description: "Histórico de prontuários" },
    ]
  },
  { 
    id: "operacional", 
    name: "Operacional", 
    icon: BarChart3, 
    color: "from-amber-500 to-orange-500",
    reports: [
      { name: "Ocupação de Salas", description: "Taxa de ocupação por consultório" },
      { name: "Agenda por Profissional", description: "Horários disponíveis e ocupados" },
      { name: "Produtividade", description: "Métricas de produtividade" },
      { name: "Convênios", description: "Atendimentos por convênio" },
    ]
  },
];

const recentReports = [
  { name: "Faturamento Mensal - Novembro 2024", date: "Há 2 horas", status: "ready", format: "PDF" },
  { name: "Consultas Realizadas - Semana 48", date: "Ontem", status: "ready", format: "Excel" },
  { name: "Contas a Receber", date: "2 dias atrás", status: "ready", format: "PDF" },
  { name: "Produtividade - Outubro 2024", date: "5 dias atrás", status: "ready", format: "Excel" },
];

const scheduledReports = [
  { name: "Faturamento Semanal", frequency: "Toda segunda-feira", nextRun: "09/12/2024", recipients: 2 },
  { name: "Novos Pacientes", frequency: "Mensal", nextRun: "01/01/2025", recipients: 1 },
];

export default function Relatorios() {
  const [selectedCategory, setSelectedCategory] = useState("financeiro");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  const handleGenerateReport = (reportName: string) => {
    setIsGenerating(true);
    setGenerationProgress(0);
    
    const interval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          toast({
            title: "Relatório Gerado",
            description: `O relatório "${reportName}" está pronto para download.`,
          });
          return 0;
        }
        return prev + 20;
      });
    }, 500);
  };

  const currentCategory = reportCategories.find(c => c.id === selectedCategory);

  return (
    <PageContainer>
      <PageHeader
        icon={FileText}
        iconGradient="from-blue-500 to-indigo-500"
        title="Relatórios"
        description="Gere e exporte relatórios detalhados do sistema"
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Atualizar
            </Button>
            <Button size="sm" className="gap-2">
              <Sparkles className="h-4 w-4" />
              Gerar com IA
            </Button>
          </div>
        }
      />

      <PageContent>
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Relatórios Gerados", value: "247", icon: FileText, change: "+12 este mês", color: "from-blue-500 to-cyan-500" },
            { label: "Exportações", value: "89", icon: Download, change: "+5 hoje", color: "from-emerald-500 to-green-500" },
            { label: "Agendados", value: "6", icon: Clock, change: "Ativos", color: "from-amber-500 to-orange-500" },
            { label: "Favoritos", value: "12", icon: FileBarChart, change: "Salvos", color: "from-violet-500 to-purple-500" },
          ].map((stat) => (
            <Card key={stat.label} className="group relative overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
              <div className={cn("absolute inset-0 opacity-5 bg-gradient-to-br", stat.color)} />
              <CardContent className="p-4 relative">
                <div className="flex items-start justify-between mb-3">
                  <div className={cn("p-2.5 rounded-xl bg-gradient-to-br shadow-lg", stat.color)}>
                    <stat.icon className="h-5 w-5 text-white" />
                  </div>
                  <Badge variant="secondary" className="text-xs font-medium">
                    {stat.change}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="generate" className="space-y-6">
          <TabsList className="bg-muted/50 p-1 flex-wrap h-auto gap-1">
            <TabsTrigger value="generate" className="gap-2 text-xs sm:text-sm">
              <FileBarChart className="h-4 w-4 hidden sm:block" />
              Gerar Relatório
            </TabsTrigger>
            <TabsTrigger value="recent" className="gap-2 text-xs sm:text-sm">
              <Clock className="h-4 w-4 hidden sm:block" />
              Recentes
            </TabsTrigger>
            <TabsTrigger value="scheduled" className="gap-2 text-xs sm:text-sm">
              <Calendar className="h-4 w-4 hidden sm:block" />
              Agendados
            </TabsTrigger>
          </TabsList>

          {/* Generate Tab */}
          <TabsContent value="generate" className="space-y-6">
            <div className="grid lg:grid-cols-4 gap-6">
              {/* Categories Sidebar */}
              <Card className="border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Categorias</CardTitle>
                </CardHeader>
                <CardContent className="p-2">
                  <div className="space-y-1">
                    {reportCategories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={cn(
                          "w-full flex items-center gap-3 p-3 rounded-xl transition-all",
                          selectedCategory === category.id 
                            ? "bg-primary/10 text-primary" 
                            : "hover:bg-muted/50"
                        )}
                      >
                        <div className={cn(
                          "p-2 rounded-lg bg-gradient-to-br",
                          category.color
                        )}>
                          <category.icon className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-medium text-sm">{category.name}</span>
                        <ChevronRight className="h-4 w-4 ml-auto opacity-50" />
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Reports Grid */}
              <div className="lg:col-span-3">
                <Card className="border-border/50">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      {currentCategory && (
                        <div className={cn(
                          "p-2.5 rounded-xl bg-gradient-to-br shadow-lg",
                          currentCategory.color
                        )}>
                          <currentCategory.icon className="h-5 w-5 text-white" />
                        </div>
                      )}
                      <div>
                        <CardTitle className="text-lg">{currentCategory?.name}</CardTitle>
                        <CardDescription>Selecione um relatório para gerar</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Filters */}
                    <div className="grid sm:grid-cols-3 gap-4 mb-6 p-4 rounded-xl bg-muted/30">
                      <div className="space-y-2">
                        <Label className="text-xs">Período</Label>
                        <Select defaultValue="mes">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hoje">Hoje</SelectItem>
                            <SelectItem value="semana">Esta Semana</SelectItem>
                            <SelectItem value="mes">Este Mês</SelectItem>
                            <SelectItem value="trimestre">Trimestre</SelectItem>
                            <SelectItem value="ano">Este Ano</SelectItem>
                            <SelectItem value="custom">Personalizado</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs">Formato</Label>
                        <Select defaultValue="pdf">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pdf">PDF</SelectItem>
                            <SelectItem value="excel">Excel</SelectItem>
                            <SelectItem value="csv">CSV</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs">Profissional</Label>
                        <Select defaultValue="todos">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="todos">Todos</SelectItem>
                            <SelectItem value="dr-ricardo">Dr. Ricardo</SelectItem>
                            <SelectItem value="dra-ana">Dra. Ana</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Generation Progress */}
                    {isGenerating && (
                      <div className="mb-6 p-4 rounded-xl bg-primary/5 border border-primary/20">
                        <div className="flex items-center gap-3 mb-3">
                          <RefreshCw className="h-4 w-4 text-primary animate-spin" />
                          <span className="text-sm font-medium">Gerando relatório...</span>
                        </div>
                        <Progress value={generationProgress} className="h-2" />
                      </div>
                    )}

                    {/* Reports List */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      {currentCategory?.reports.map((report) => (
                        <Card 
                          key={report.name}
                          className="group border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg cursor-pointer"
                          onClick={() => handleGenerateReport(report.name)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div className="p-2 rounded-lg bg-muted/50 group-hover:bg-primary/10 transition-colors">
                                <FileText className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                              </div>
                              <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                            <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">
                              {report.name}
                            </h3>
                            <p className="text-xs text-muted-foreground">
                              {report.description}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Recent Tab */}
          <TabsContent value="recent" className="space-y-4">
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Relatórios Recentes</CardTitle>
                <CardDescription>Seus últimos relatórios gerados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentReports.map((report, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "p-2.5 rounded-xl",
                          report.format === "PDF" ? "bg-red-500/10" : "bg-emerald-500/10"
                        )}>
                          {report.format === "PDF" ? (
                            <FileText className="h-5 w-5 text-red-500" />
                          ) : (
                            <FileSpreadsheet className="h-5 w-5 text-emerald-500" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{report.name}</p>
                          <p className="text-xs text-muted-foreground">{report.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {report.format}
                        </Badge>
                        <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 gap-1">
                          <CheckCircle2 className="h-3 w-3" />
                          Pronto
                        </Badge>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Scheduled Tab */}
          <TabsContent value="scheduled" className="space-y-4">
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Relatórios Agendados</CardTitle>
                    <CardDescription>Relatórios gerados automaticamente</CardDescription>
                  </div>
                  <Button size="sm" className="gap-2" onClick={() => setIsScheduleModalOpen(true)}>
                    <Plus className="h-4 w-4" />
                    Novo Agendamento
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {scheduledReports.map((report, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2.5 rounded-xl bg-primary/10">
                          <Clock className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{report.name}</p>
                          <p className="text-xs text-muted-foreground">{report.frequency}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">Próxima execução</p>
                          <p className="text-sm font-medium">{report.nextRun}</p>
                        </div>
                        <Badge variant="outline" className="gap-1">
                          <Mail className="h-3 w-3" />
                          {report.recipients}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <ScheduleReportModal 
          open={isScheduleModalOpen} 
          onOpenChange={setIsScheduleModalOpen} 
        />
      </PageContent>
    </PageContainer>
  );
}
