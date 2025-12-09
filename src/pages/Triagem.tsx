import { useState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { PageContainer } from "@/components/ui/page-container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  ClipboardCheck, 
  Search, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Send,
  Eye,
  Plus,
  FileText,
  User,
  Calendar,
  MessageSquare,
  Sparkles,
  Filter
} from "lucide-react";

const mockTriagens = [
  {
    id: 1,
    patient: "Maria Silva",
    appointment: "Hoje, 14:00",
    professional: "Dr. Carlos Santos",
    status: "completed",
    completedAt: "Há 2 horas",
    score: 85,
    alerts: 2
  },
  {
    id: 2,
    patient: "João Oliveira",
    appointment: "Hoje, 15:30",
    professional: "Dra. Ana Lima",
    status: "pending",
    sentAt: "Há 1 dia",
    score: null,
    alerts: 0
  },
  {
    id: 3,
    patient: "Ana Costa",
    appointment: "Amanhã, 09:00",
    professional: "Dr. Carlos Santos",
    status: "in_progress",
    progress: 60,
    alerts: 1
  },
  {
    id: 4,
    patient: "Pedro Mendes",
    appointment: "Amanhã, 10:30",
    professional: "Dra. Beatriz Rocha",
    status: "not_sent",
    alerts: 0
  }
];

const mockTemplates = [
  { id: 1, name: "Triagem Geral", questions: 12, uses: 234, category: "Geral" },
  { id: 2, name: "Pré-Consulta Cardiologia", questions: 18, uses: 89, category: "Cardiologia" },
  { id: 3, name: "Avaliação Pediátrica", questions: 15, uses: 156, category: "Pediatria" },
  { id: 4, name: "Check-up Preventivo", questions: 20, uses: 312, category: "Preventivo" }
];

const statusConfig = {
  completed: { label: "Respondido", color: "bg-confirmed/10 text-confirmed border-confirmed/20", icon: CheckCircle2 },
  pending: { label: "Aguardando", color: "bg-pending/10 text-pending border-pending/20", icon: Clock },
  in_progress: { label: "Em Andamento", color: "bg-info/10 text-info border-info/20", icon: FileText },
  not_sent: { label: "Não Enviado", color: "bg-muted text-muted-foreground border-border", icon: AlertCircle }
};

const Triagem = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("triagens");

  const stats = [
    { label: "Enviadas Hoje", value: 12, icon: Send, color: "text-primary" },
    { label: "Respondidas", value: 8, icon: CheckCircle2, color: "text-confirmed" },
    { label: "Pendentes", value: 4, icon: Clock, color: "text-pending" },
    { label: "Taxa de Resposta", value: "67%", icon: Sparkles, color: "text-info" }
  ];

  return (
    <PageContainer>
      <PageHeader
        title="Triagem Inteligente"
        description="Questionários pré-consulta para otimizar o atendimento"
        icon={ClipboardCheck}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Plus className="h-4 w-4" />
              Novo Template
            </Button>
            <Button className="gap-2">
              <Send className="h-4 w-4" />
              Enviar Triagem
            </Button>
          </div>
        }
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <Card key={index} className="relative overflow-hidden group hover:shadow-md transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-xl bg-muted/50 ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <TabsList>
            <TabsTrigger value="triagens" className="gap-2">
              <ClipboardCheck className="h-4 w-4" />
              Triagens
            </TabsTrigger>
            <TabsTrigger value="templates" className="gap-2">
              <FileText className="h-4 w-4" />
              Templates
            </TabsTrigger>
          </TabsList>

          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <TabsContent value="triagens" className="space-y-4">
          <ScrollArea className="h-[calc(100vh-400px)]">
            <div className="space-y-3">
              {mockTriagens.map((triagem) => {
                const StatusIcon = statusConfig[triagem.status as keyof typeof statusConfig].icon;
                return (
                  <Card key={triagem.id} className="group hover:shadow-md transition-all hover:border-primary/20">
                    <CardContent className="p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        {/* Patient Info */}
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0">
                            <User className="h-5 w-5 text-primary" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium truncate">{triagem.patient}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              <span>{triagem.appointment}</span>
                              <span className="hidden sm:inline">•</span>
                              <span className="hidden sm:inline">{triagem.professional}</span>
                            </div>
                          </div>
                        </div>

                        {/* Status & Progress */}
                        <div className="flex items-center gap-4 sm:gap-6">
                          {triagem.status === "in_progress" && (
                            <div className="flex items-center gap-2 min-w-[120px]">
                              <Progress value={triagem.progress} className="h-2 flex-1" />
                              <span className="text-sm text-muted-foreground">{triagem.progress}%</span>
                            </div>
                          )}

                          {triagem.status === "completed" && triagem.score && (
                            <div className="flex items-center gap-2">
                              <div className="text-right">
                                <p className="text-sm font-medium">Score: {triagem.score}</p>
                                <p className="text-xs text-muted-foreground">{triagem.completedAt}</p>
                              </div>
                            </div>
                          )}

                          {triagem.alerts > 0 && (
                            <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              {triagem.alerts} alertas
                            </Badge>
                          )}

                          <Badge variant="outline" className={statusConfig[triagem.status as keyof typeof statusConfig].color}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {statusConfig[triagem.status as keyof typeof statusConfig].label}
                          </Badge>

                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Eye className="h-4 w-4" />
                            </Button>
                            {triagem.status === "not_sent" && (
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-primary">
                                <Send className="h-4 w-4" />
                              </Button>
                            )}
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockTemplates.map((template) => (
              <Card key={template.id} className="group hover:shadow-md transition-all hover:border-primary/20">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{template.name}</CardTitle>
                        <Badge variant="outline" className="mt-1 text-xs">
                          {template.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <span>{template.questions} perguntas</span>
                    <span>{template.uses} usos</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="h-4 w-4 mr-1" />
                      Visualizar
                    </Button>
                    <Button size="sm" className="flex-1">
                      <Send className="h-4 w-4 mr-1" />
                      Usar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
};

export default Triagem;
