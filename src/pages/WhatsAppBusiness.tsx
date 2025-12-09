import { useState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { PageContainer, PageContent } from "@/components/ui/page-container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  MessageCircle, 
  Search, 
  Plus,
  Send,
  CheckCircle2,
  Clock,
  Users,
  Bot,
  Settings2,
  MoreVertical,
  Eye,
  Edit,
  Calendar,
  Bell,
  Zap,
  TrendingUp,
  ArrowUpRight
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NewTemplateModal } from "@/components/whatsapp/NewTemplateModal";
import { toast } from "sonner";

const mockTemplates = [
  {
    id: 1,
    name: "Confirmação de Consulta",
    category: "appointment",
    message: "Olá {{nome}}! Sua consulta com {{profissional}} está agendada para {{data}} às {{hora}}. Confirme respondendo SIM.",
    status: "active",
    sent: 1234,
    delivered: 1198,
    read: 1087
  },
  {
    id: 2,
    name: "Lembrete 24h",
    category: "reminder",
    message: "Olá {{nome}}! Lembramos que sua consulta é amanhã, {{data}} às {{hora}}. Em caso de imprevisto, responda para remarcar.",
    status: "active",
    sent: 856,
    delivered: 842,
    read: 756
  },
  {
    id: 3,
    name: "Pós-Consulta",
    category: "followup",
    message: "Olá {{nome}}! Como você está se sentindo após sua consulta? Qualquer dúvida, estamos à disposição.",
    status: "active",
    sent: 432,
    delivered: 428,
    read: 312
  },
  {
    id: 4,
    name: "Aniversário",
    category: "marketing",
    message: "Feliz aniversário, {{nome}}! 🎂 A equipe {{clinica}} deseja um dia especial. Aproveite 20% de desconto no seu próximo agendamento!",
    status: "paused",
    sent: 156,
    delivered: 152,
    read: 134
  }
];

const mockAutomations = [
  {
    id: 1,
    name: "Confirmação Automática",
    trigger: "Consulta agendada",
    timing: "Imediatamente",
    template: "Confirmação de Consulta",
    active: true,
    executions: 1234
  },
  {
    id: 2,
    name: "Lembrete 24h",
    trigger: "24h antes da consulta",
    timing: "Automático",
    template: "Lembrete 24h",
    active: true,
    executions: 856
  },
  {
    id: 3,
    name: "Follow-up Pós-Consulta",
    trigger: "Após consulta realizada",
    timing: "2 horas depois",
    template: "Pós-Consulta",
    active: true,
    executions: 432
  },
  {
    id: 4,
    name: "Aniversariantes",
    trigger: "Data de aniversário",
    timing: "08:00",
    template: "Aniversário",
    active: false,
    executions: 156
  }
];

const categoryConfig = {
  appointment: { label: "Agendamento", color: "bg-primary/10 text-primary" },
  reminder: { label: "Lembrete", color: "bg-pending/10 text-pending" },
  followup: { label: "Pós-Consulta", color: "bg-info/10 text-info" },
  marketing: { label: "Marketing", color: "bg-confirmed/10 text-confirmed" }
};

const WhatsAppBusiness = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("templates");
  const [automations, setAutomations] = useState(mockAutomations);
  const [showNewTemplateModal, setShowNewTemplateModal] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);

  const handleToggleAutomation = (id: number) => {
    setAutomations(automations.map(a => 
      a.id === id ? { ...a, active: !a.active } : a
    ));
    const automation = automations.find(a => a.id === id);
    if (automation) {
      toast.success(`Automação "${automation.name}" ${automation.active ? 'desativada' : 'ativada'}`);
    }
  };

  const handleViewTemplate = (template: typeof mockTemplates[0]) => {
    toast.info(`Visualizando template: ${template.name}`);
  };

  const handleEditTemplate = (template: typeof mockTemplates[0]) => {
    toast.info(`Editando template: ${template.name}`);
  };

  const stats = [
    { label: "Mensagens Hoje", value: 342, icon: Send, color: "text-primary" },
    { label: "Taxa Entrega", value: "97%", icon: CheckCircle2, color: "text-confirmed" },
    { label: "Taxa Leitura", value: "82%", icon: Eye, color: "text-info" },
    { label: "Automações Ativas", value: 3, icon: Bot, color: "text-pending" }
  ];

  return (
    <PageContainer>
      <PageHeader
        title="WhatsApp Business"
        description="Automações e mensagens para engajamento de pacientes"
        icon={MessageCircle}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2" onClick={() => setShowConfigModal(true)}>
              <Settings2 className="h-4 w-4" />
              Configurar
            </Button>
            <Button className="gap-2" onClick={() => setShowNewTemplateModal(true)}>
              <Plus className="h-4 w-4" />
              Novo Template
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
            <TabsTrigger value="templates" className="gap-2">
              <MessageCircle className="h-4 w-4" />
              Templates
            </TabsTrigger>
            <TabsTrigger value="automations" className="gap-2">
              <Bot className="h-4 w-4" />
              Automações
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
          </div>
        </div>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockTemplates.map((template) => (
              <Card key={template.id} className={`group hover:shadow-md transition-all hover:border-primary/20 ${template.status === "paused" ? "opacity-60" : ""}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/5 flex items-center justify-center">
                        <MessageCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{template.name}</CardTitle>
                        <Badge variant="outline" className={categoryConfig[template.category as keyof typeof categoryConfig].color}>
                          {categoryConfig[template.category as keyof typeof categoryConfig].label}
                        </Badge>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditTemplate(template)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleViewTemplate(template)}>
                          <Eye className="h-4 w-4 mr-2" />
                          Visualizar
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <TrendingUp className="h-4 w-4 mr-2" />
                          Estatísticas
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="p-3 rounded-lg bg-muted/30 mb-4">
                    <p className="text-sm text-muted-foreground line-clamp-2">{template.message}</p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-xs text-muted-foreground">Enviadas</p>
                      <p className="font-semibold">{template.sent.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Entregues</p>
                      <p className="font-semibold text-confirmed">{template.delivered.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Lidas</p>
                      <p className="font-semibold text-info">{template.read.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="automations" className="space-y-4">
          <ScrollArea className="h-[calc(100vh-400px)]">
            <div className="space-y-4">
              {automations.map((automation) => (
                <Card key={automation.id} className={`group hover:shadow-md transition-all ${!automation.active ? "opacity-60" : ""}`}>
                  <CardContent className="p-4">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                      {/* Info */}
                      <div className="flex items-center gap-3 flex-1">
                        <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${
                          automation.active 
                            ? "bg-gradient-to-br from-primary/20 to-primary/5" 
                            : "bg-muted"
                        }`}>
                          <Bot className={`h-5 w-5 ${automation.active ? "text-primary" : "text-muted-foreground"}`} />
                        </div>
                        <div>
                          <h3 className="font-medium">{automation.name}</h3>
                          <p className="text-sm text-muted-foreground">Template: {automation.template}</p>
                        </div>
                      </div>

                      {/* Trigger Info */}
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-pending" />
                          <div>
                            <p className="text-xs text-muted-foreground">Gatilho</p>
                            <p className="text-sm font-medium">{automation.trigger}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-info" />
                          <div>
                            <p className="text-xs text-muted-foreground">Quando</p>
                            <p className="text-sm font-medium">{automation.timing}</p>
                          </div>
                        </div>
                        <div className="text-center min-w-[80px]">
                          <p className="text-xs text-muted-foreground">Execuções</p>
                          <p className="font-semibold">{automation.executions.toLocaleString()}</p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-3">
                        <Switch
                          checked={automation.active}
                          onCheckedChange={() => handleToggleAutomation(automation.id)}
                        />
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <TrendingUp className="h-4 w-4 mr-2" />
                              Estatísticas
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
      </PageContent>

      <NewTemplateModal 
        open={showNewTemplateModal} 
        onOpenChange={setShowNewTemplateModal} 
      />
    </PageContainer>
  );
};

export default WhatsAppBusiness;