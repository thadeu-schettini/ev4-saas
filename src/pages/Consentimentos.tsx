import { useState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { PageContainer, PageContent } from "@/components/ui/page-container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  FileSignature, 
  Search, 
  Plus, 
  Clock,
  CheckCircle2,
  XCircle,
  User,
  FileText,
  Send,
  Filter,
  MoreVertical,
  Eye,
  Download,
  PenTool,
  Calendar,
  AlertCircle
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NewConsentModal } from "@/components/consentimentos/NewConsentModal";
import { toast } from "sonner";

const mockConsents = [
  {
    id: 1,
    patient: "Maria Silva",
    procedure: "Cirurgia de Catarata",
    template: "Consentimento Cirúrgico - Oftalmologia",
    status: "signed",
    sentAt: "10/01/2025 09:30",
    signedAt: "10/01/2025 14:22",
    appointmentDate: "15/01/2025",
    professional: "Dr. Carlos Santos"
  },
  {
    id: 2,
    patient: "João Oliveira",
    procedure: "Endoscopia Digestiva",
    template: "Consentimento para Exame Invasivo",
    status: "pending",
    sentAt: "10/01/2025 10:00",
    signedAt: null,
    appointmentDate: "12/01/2025",
    professional: "Dra. Ana Lima"
  },
  {
    id: 3,
    patient: "Ana Costa",
    procedure: "Tratamento Ortodôntico",
    template: "Consentimento Ortodontia",
    status: "expired",
    sentAt: "01/01/2025 08:00",
    signedAt: null,
    appointmentDate: "05/01/2025",
    professional: "Dr. Pedro Mendes"
  },
  {
    id: 4,
    patient: "Pedro Mendes",
    procedure: "Aplicação de Botox",
    template: "Consentimento Estético",
    status: "rejected",
    sentAt: "09/01/2025 15:00",
    signedAt: null,
    appointmentDate: "11/01/2025",
    professional: "Dra. Beatriz Rocha",
    rejectionReason: "Paciente solicitou esclarecimentos adicionais"
  }
];

const mockTemplates = [
  { id: 1, name: "Consentimento Cirúrgico Geral", procedures: 45, lastUsed: "Hoje" },
  { id: 2, name: "Consentimento para Exame Invasivo", procedures: 89, lastUsed: "Ontem" },
  { id: 3, name: "Consentimento Anestesia", procedures: 34, lastUsed: "Há 2 dias" },
  { id: 4, name: "Consentimento Tratamento Estético", procedures: 67, lastUsed: "Hoje" },
  { id: 5, name: "Consentimento Ortodontia", procedures: 23, lastUsed: "Há 3 dias" }
];

const statusConfig = {
  signed: { label: "Assinado", color: "bg-confirmed/10 text-confirmed border-confirmed/20", icon: CheckCircle2 },
  pending: { label: "Pendente", color: "bg-pending/10 text-pending border-pending/20", icon: Clock },
  expired: { label: "Expirado", color: "bg-destructive/10 text-destructive border-destructive/20", icon: AlertCircle },
  rejected: { label: "Recusado", color: "bg-destructive/10 text-destructive border-destructive/20", icon: XCircle }
};

const Consentimentos = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("consents");
  const [showNewConsentModal, setShowNewConsentModal] = useState(false);
  const [showNewTemplateModal, setShowNewTemplateModal] = useState(false);

  const stats = [
    { label: "Enviados", value: 234, icon: Send, color: "text-primary" },
    { label: "Assinados", value: 198, icon: CheckCircle2, color: "text-confirmed" },
    { label: "Pendentes", value: 28, icon: Clock, color: "text-pending" },
    { label: "Taxa Assinatura", value: "85%", icon: PenTool, color: "text-info" }
  ];

  const handleViewConsent = (consent: typeof mockConsents[0]) => {
    toast.info(`Visualizando consentimento de ${consent.patient}`);
  };

  const handleDownloadPDF = (consent: typeof mockConsents[0]) => {
    toast.success(`PDF do consentimento de ${consent.patient} baixado`);
  };

  const handleResend = (consent: typeof mockConsents[0]) => {
    toast.success(`Consentimento reenviado para ${consent.patient}`);
  };

  const handleViewTemplate = (template: typeof mockTemplates[0]) => {
    toast.info(`Visualizando template: ${template.name}`);
  };

  const handleUseTemplate = (template: typeof mockTemplates[0]) => {
    setShowNewConsentModal(true);
  };

  return (
    <PageContainer>
      <PageHeader
        title="Consentimentos Digitais"
        description="Termos de consentimento com assinatura digital"
        icon={FileSignature}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2" onClick={() => setShowNewTemplateModal(true)}>
              <Plus className="h-4 w-4" />
              Novo Template
            </Button>
            <Button className="gap-2" onClick={() => setShowNewConsentModal(true)}>
              <Send className="h-4 w-4" />
              Enviar Consentimento
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
            <TabsTrigger value="consents" className="gap-2">
              <FileSignature className="h-4 w-4" />
              Consentimentos
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

        <TabsContent value="consents" className="space-y-4">
          <ScrollArea className="h-[calc(100vh-400px)]">
            <div className="space-y-4">
              {mockConsents.map((consent) => {
                const StatusIcon = statusConfig[consent.status as keyof typeof statusConfig].icon;
                return (
                  <Card key={consent.id} className="group hover:shadow-md transition-all hover:border-primary/20">
                    <CardContent className="p-4">
                      <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                        {/* Patient & Procedure Info */}
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          <Avatar className="h-10 w-10 shrink-0">
                            <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/5">
                              <User className="h-5 w-5 text-primary" />
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="font-medium">{consent.patient}</p>
                              <Badge variant="outline" className={statusConfig[consent.status as keyof typeof statusConfig].color}>
                                <StatusIcon className="h-3 w-3 mr-1" />
                                {statusConfig[consent.status as keyof typeof statusConfig].label}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{consent.procedure}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{consent.template}</p>
                          </div>
                        </div>

                        {/* Details */}
                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-sm">
                          <div>
                            <p className="text-xs text-muted-foreground">Profissional</p>
                            <p className="font-medium">{consent.professional}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Procedimento</p>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3 text-muted-foreground" />
                              <p>{consent.appointmentDate}</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Enviado em</p>
                            <p>{consent.sentAt}</p>
                          </div>
                          {consent.signedAt && (
                            <div>
                              <p className="text-xs text-muted-foreground">Assinado em</p>
                              <p className="text-confirmed">{consent.signedAt}</p>
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="gap-1"
                            onClick={() => handleViewConsent(consent)}
                          >
                            <Eye className="h-4 w-4" />
                            Ver
                          </Button>
                          {consent.status === "signed" && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="gap-1"
                              onClick={() => handleDownloadPDF(consent)}
                            >
                              <Download className="h-4 w-4" />
                              PDF
                            </Button>
                          )}
                          {consent.status === "pending" && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="gap-1"
                              onClick={() => handleResend(consent)}
                            >
                              <Send className="h-4 w-4" />
                              Reenviar
                            </Button>
                          )}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
                              <DropdownMenuItem>Histórico</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">Cancelar</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>

                      {/* Rejection Reason */}
                      {consent.rejectionReason && (
                        <div className="mt-3 pt-3 border-t">
                          <div className="flex items-start gap-2 p-3 rounded-lg bg-destructive/5 border border-destructive/20">
                            <AlertCircle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
                            <p className="text-sm text-destructive">{consent.rejectionReason}</p>
                          </div>
                        </div>
                      )}
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
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-base truncate">{template.name}</CardTitle>
                      <p className="text-xs text-muted-foreground mt-1">
                        {template.procedures} usos • Último: {template.lastUsed}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleViewTemplate(template)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Visualizar
                    </Button>
                    <Button 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleUseTemplate(template)}
                    >
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
      </PageContent>

      <NewConsentModal 
        open={showNewConsentModal} 
        onOpenChange={setShowNewConsentModal} 
      />
    </PageContainer>
  );
};

export default Consentimentos;