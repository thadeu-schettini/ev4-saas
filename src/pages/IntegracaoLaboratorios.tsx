import { useState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { PageContainer, PageContent } from "@/components/ui/page-container";
import { LabResultModal } from "@/components/laboratorios/LabResultModal";
import { ConnectLabModal } from "@/components/laboratorios/ConnectLabModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  FlaskConical, 
  Search, 
  Download,
  Clock,
  CheckCircle2,
  AlertCircle,
  User,
  FileText,
  Filter,
  MoreVertical,
  Eye,
  RefreshCw,
  Link2,
  Unlink,
  Activity,
  Calendar
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mockResults = [
  {
    id: 1,
    patient: "Maria Silva",
    exam: "Hemograma Completo",
    lab: "Laboratório São Lucas",
    requestDate: "08/01/2025",
    resultDate: "10/01/2025",
    status: "ready",
    professional: "Dr. Carlos Santos",
    hasAlerts: true,
    alertDescription: "Hemoglobina abaixo do normal"
  },
  {
    id: 2,
    patient: "João Oliveira",
    exam: "Glicemia de Jejum",
    lab: "Lab Diagnósticos",
    requestDate: "09/01/2025",
    resultDate: null,
    status: "pending",
    professional: "Dra. Ana Lima",
    hasAlerts: false
  },
  {
    id: 3,
    patient: "Ana Costa",
    exam: "TSH e T4 Livre",
    lab: "Laboratório São Lucas",
    requestDate: "07/01/2025",
    resultDate: "09/01/2025",
    status: "ready",
    professional: "Dr. Carlos Santos",
    hasAlerts: false
  },
  {
    id: 4,
    patient: "Pedro Mendes",
    exam: "Colesterol Total e Frações",
    lab: "Lab Central",
    requestDate: "05/01/2025",
    resultDate: "08/01/2025",
    status: "viewed",
    professional: "Dra. Beatriz Rocha",
    hasAlerts: true,
    alertDescription: "LDL acima do recomendado"
  }
];

const mockLabs = [
  { id: 1, name: "Laboratório São Lucas", status: "connected", lastSync: "Há 5 min", exams: 234 },
  { id: 2, name: "Lab Diagnósticos", status: "connected", lastSync: "Há 15 min", exams: 156 },
  { id: 3, name: "Lab Central", status: "disconnected", lastSync: "Há 2 dias", exams: 89 },
  { id: 4, name: "Diagnósticos Avançados", status: "pending", lastSync: null, exams: 0 }
];

const statusConfig = {
  ready: { label: "Disponível", color: "bg-confirmed/10 text-confirmed border-confirmed/20", icon: CheckCircle2 },
  pending: { label: "Aguardando", color: "bg-pending/10 text-pending border-pending/20", icon: Clock },
  viewed: { label: "Visualizado", color: "bg-info/10 text-info border-info/20", icon: Eye },
  error: { label: "Erro", color: "bg-destructive/10 text-destructive border-destructive/20", icon: AlertCircle }
};

const labStatusConfig = {
  connected: { label: "Conectado", color: "bg-confirmed/10 text-confirmed border-confirmed/20" },
  disconnected: { label: "Desconectado", color: "bg-destructive/10 text-destructive border-destructive/20" },
  pending: { label: "Pendente", color: "bg-pending/10 text-pending border-pending/20" }
};

const IntegracaoLaboratorios = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("results");
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [selectedResult, setSelectedResult] = useState<typeof mockResults[0] | null>(null);

  const stats = [
    { label: "Resultados Hoje", value: 23, icon: FileText, color: "text-primary" },
    { label: "Aguardando", value: 45, icon: Clock, color: "text-pending" },
    { label: "Com Alertas", value: 8, icon: AlertCircle, color: "text-destructive" },
    { label: "Labs Conectados", value: 2, icon: Link2, color: "text-confirmed" }
  ];

  return (
    <PageContainer>
      <PageHeader
        title="Integração Laboratórios"
        description="Receba resultados de exames automaticamente"
        icon={FlaskConical}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Sincronizar
            </Button>
            <Button className="gap-2" onClick={() => setShowConnectModal(true)}>
              <Link2 className="h-4 w-4" />
              Conectar Lab
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
            <TabsTrigger value="results" className="gap-2">
              <FileText className="h-4 w-4" />
              Resultados
            </TabsTrigger>
            <TabsTrigger value="labs" className="gap-2">
              <FlaskConical className="h-4 w-4" />
              Laboratórios
            </TabsTrigger>
          </TabsList>

          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar exame ou paciente..."
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

        <TabsContent value="results" className="space-y-4">
          <ScrollArea className="h-[calc(100vh-400px)]">
            <div className="space-y-4">
              {mockResults.map((result) => {
                const StatusIcon = statusConfig[result.status as keyof typeof statusConfig].icon;
                return (
                  <Card key={result.id} className={`group hover:shadow-md transition-all hover:border-primary/20 ${result.hasAlerts ? "border-destructive/30" : ""}`}>
                    <CardContent className="p-4">
                      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                        {/* Patient Info */}
                        <div className="flex items-center gap-3 min-w-[180px]">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/5">
                              <User className="h-5 w-5 text-primary" />
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{result.patient}</p>
                            <p className="text-xs text-muted-foreground">{result.professional}</p>
                          </div>
                        </div>

                        {/* Exam Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <Activity className="h-4 w-4 text-primary" />
                            <p className="font-medium">{result.exam}</p>
                          </div>
                          <p className="text-sm text-muted-foreground">{result.lab}</p>
                        </div>

                        {/* Dates */}
                        <div className="flex gap-6 text-sm">
                          <div>
                            <p className="text-xs text-muted-foreground">Solicitado</p>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3 text-muted-foreground" />
                              <span>{result.requestDate}</span>
                            </div>
                          </div>
                          {result.resultDate && (
                            <div>
                              <p className="text-xs text-muted-foreground">Resultado</p>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3 text-confirmed" />
                                <span className="text-confirmed">{result.resultDate}</span>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Status & Actions */}
                        <div className="flex items-center gap-3">
                          {result.hasAlerts && (
                            <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              Alerta
                            </Badge>
                          )}
                          <Badge variant="outline" className={statusConfig[result.status as keyof typeof statusConfig].color}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {statusConfig[result.status as keyof typeof statusConfig].label}
                          </Badge>

                          <div className="flex gap-1">
                            {result.status === "ready" && (
                              <>
                                <Button variant="outline" size="sm" className="gap-1" onClick={() => {
                                  setSelectedResult(result);
                                  setShowResultModal(true);
                                }}>
                                  <Eye className="h-4 w-4" />
                                  Ver
                                </Button>
                                <Button variant="outline" size="sm" className="gap-1">
                                  <Download className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Ver Histórico</DropdownMenuItem>
                                <DropdownMenuItem>Anexar ao Prontuário</DropdownMenuItem>
                                <DropdownMenuItem>Solicitar Novo</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>

                      {/* Alert Description */}
                      {result.hasAlerts && result.alertDescription && (
                        <div className="mt-3 pt-3 border-t">
                          <div className="flex items-start gap-2 p-3 rounded-lg bg-destructive/5 border border-destructive/20">
                            <AlertCircle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
                            <p className="text-sm text-destructive">{result.alertDescription}</p>
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

        <TabsContent value="labs" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockLabs.map((lab) => (
              <Card key={lab.id} className="group hover:shadow-md transition-all hover:border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${
                        lab.status === "connected" ? "bg-confirmed/10" :
                        lab.status === "pending" ? "bg-pending/10" :
                        "bg-destructive/10"
                      }`}>
                        <FlaskConical className={`h-5 w-5 ${
                          lab.status === "connected" ? "text-confirmed" :
                          lab.status === "pending" ? "text-pending" :
                          "text-destructive"
                        }`} />
                      </div>
                      <div>
                        <h3 className="font-medium">{lab.name}</h3>
                        <Badge variant="outline" className={labStatusConfig[lab.status as keyof typeof labStatusConfig].color}>
                          {labStatusConfig[lab.status as keyof typeof labStatusConfig].label}
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
                        <DropdownMenuItem>Configurar</DropdownMenuItem>
                        <DropdownMenuItem>Sincronizar</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Desconectar</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <p className="text-muted-foreground">Exames recebidos</p>
                      <p className="font-semibold">{lab.exams}</p>
                    </div>
                    {lab.lastSync && (
                      <div className="text-right">
                        <p className="text-muted-foreground">Última sincronização</p>
                        <p className="text-xs">{lab.lastSync}</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-4 border-t flex gap-2">
                    {lab.status === "connected" ? (
                      <>
                        <Button variant="outline" size="sm" className="flex-1 gap-1">
                          <RefreshCw className="h-4 w-4" />
                          Sincronizar
                        </Button>
                        <Button variant="outline" size="sm" className="gap-1 text-destructive">
                          <Unlink className="h-4 w-4" />
                        </Button>
                      </>
                    ) : lab.status === "disconnected" ? (
                      <Button size="sm" className="flex-1 gap-1">
                        <Link2 className="h-4 w-4" />
                        Reconectar
                      </Button>
                    ) : (
                      <Button size="sm" className="flex-1 gap-1">
                        <Link2 className="h-4 w-4" />
                        Conectar
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      </PageContent>

      <ConnectLabModal open={showConnectModal} onOpenChange={setShowConnectModal} />
      <LabResultModal open={showResultModal} onOpenChange={setShowResultModal} result={selectedResult} />
    </PageContainer>
  );
};

export default IntegracaoLaboratorios;
