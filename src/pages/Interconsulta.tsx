import { useState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { PageContainer, PageContent } from "@/components/ui/page-container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowLeftRight, 
  Search, 
  Plus, 
  Send,
  Clock,
  CheckCircle2,
  AlertCircle,
  User,
  FileText,
  MessageSquare,
  ArrowRight,
  Calendar,
  Stethoscope,
  Filter,
  Eye
} from "lucide-react";
import { NewInterconsultaModal } from "@/components/interconsulta/NewInterconsultaModal";
import { toast } from "sonner";

const mockInterconsultas = [
  {
    id: 1,
    patient: "Maria Silva",
    patientAvatar: null,
    fromDoctor: "Dr. Carlos Santos",
    fromSpecialty: "Clínico Geral",
    toDoctor: "Dra. Ana Lima",
    toSpecialty: "Cardiologia",
    reason: "Avaliação de sopro cardíaco detectado em consulta de rotina",
    status: "pending",
    createdAt: "Há 2 horas",
    priority: "normal"
  },
  {
    id: 2,
    patient: "João Oliveira",
    patientAvatar: null,
    fromDoctor: "Dra. Beatriz Rocha",
    fromSpecialty: "Pediatria",
    toDoctor: "Dr. Pedro Mendes",
    toSpecialty: "Ortopedia",
    reason: "Avaliação de escoliose em adolescente",
    status: "accepted",
    createdAt: "Ontem",
    scheduledDate: "15/01/2025 às 14:00",
    priority: "normal"
  },
  {
    id: 3,
    patient: "Ana Costa",
    patientAvatar: null,
    fromDoctor: "Dr. Carlos Santos",
    fromSpecialty: "Clínico Geral",
    toDoctor: "Dra. Lucia Fernandes",
    toSpecialty: "Endocrinologia",
    reason: "Investigação de nódulo tireoidiano",
    status: "completed",
    createdAt: "3 dias atrás",
    completedAt: "Ontem",
    priority: "urgent"
  },
  {
    id: 4,
    patient: "Pedro Mendes",
    patientAvatar: null,
    fromDoctor: "Dra. Ana Lima",
    fromSpecialty: "Cardiologia",
    toDoctor: "Dr. Roberto Silva",
    toSpecialty: "Nefrologia",
    reason: "Avaliação de função renal em paciente hipertenso",
    status: "rejected",
    createdAt: "1 semana atrás",
    rejectionReason: "Paciente já em acompanhamento com outro nefrologista",
    priority: "normal"
  }
];

const statusConfig = {
  pending: { label: "Pendente", color: "bg-pending/10 text-pending border-pending/20", icon: Clock },
  accepted: { label: "Aceita", color: "bg-confirmed/10 text-confirmed border-confirmed/20", icon: CheckCircle2 },
  completed: { label: "Concluída", color: "bg-info/10 text-info border-info/20", icon: CheckCircle2 },
  rejected: { label: "Recusada", color: "bg-destructive/10 text-destructive border-destructive/20", icon: AlertCircle }
};

const Interconsulta = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("received");
  const [showNewInterconsultaModal, setShowNewInterconsultaModal] = useState(false);

  const stats = [
    { label: "Recebidas", value: 8, icon: ArrowRight, color: "text-primary" },
    { label: "Enviadas", value: 5, icon: Send, color: "text-info" },
    { label: "Pendentes", value: 3, icon: Clock, color: "text-pending" },
    { label: "Concluídas", value: 12, icon: CheckCircle2, color: "text-confirmed" }
  ];

  const handleAccept = (interconsulta: typeof mockInterconsultas[0]) => {
    toast.success(`Interconsulta de ${interconsulta.patient} aceita`);
  };

  const handleViewDetails = (interconsulta: typeof mockInterconsultas[0]) => {
    toast.info(`Visualizando detalhes da interconsulta de ${interconsulta.patient}`);
  };

  const handleSendMessage = (interconsulta: typeof mockInterconsultas[0]) => {
    toast.info(`Abrindo mensagem para ${interconsulta.fromDoctor}`);
  };

  return (
    <PageContainer>
      <PageHeader
        title="Interconsulta"
        description="Encaminhamentos internos entre profissionais"
        icon={ArrowLeftRight}
        actions={
          <Button className="gap-2" onClick={() => setShowNewInterconsultaModal(true)}>
            <Plus className="h-4 w-4" />
            Nova Interconsulta
          </Button>
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
            <TabsTrigger value="received" className="gap-2">
              <ArrowRight className="h-4 w-4" />
              Recebidas
            </TabsTrigger>
            <TabsTrigger value="sent" className="gap-2">
              <Send className="h-4 w-4" />
              Enviadas
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

        <TabsContent value="received" className="space-y-4">
          <ScrollArea className="h-[calc(100vh-400px)]">
            <div className="space-y-4">
              {mockInterconsultas.map((interconsulta) => {
                const StatusIcon = statusConfig[interconsulta.status as keyof typeof statusConfig].icon;
                return (
                  <Card key={interconsulta.id} className="group hover:shadow-md transition-all hover:border-primary/20">
                    <CardContent className="p-6">
                      <div className="flex flex-col gap-4">
                        {/* Header */}
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={interconsulta.patientAvatar || undefined} />
                              <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/5">
                                <User className="h-6 w-6 text-primary" />
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold">{interconsulta.patient}</h3>
                              <p className="text-sm text-muted-foreground">{interconsulta.createdAt}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {interconsulta.priority === "urgent" && (
                              <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
                                <AlertCircle className="h-3 w-3 mr-1" />
                                Urgente
                              </Badge>
                            )}
                            <Badge variant="outline" className={statusConfig[interconsulta.status as keyof typeof statusConfig].color}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {statusConfig[interconsulta.status as keyof typeof statusConfig].label}
                            </Badge>
                          </div>
                        </div>

                        {/* Flow Visualization */}
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/30">
                          <div className="flex-1 text-center">
                            <div className="flex items-center justify-center gap-2 mb-1">
                              <Stethoscope className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium text-sm">{interconsulta.fromDoctor}</span>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {interconsulta.fromSpecialty}
                            </Badge>
                          </div>
                          <div className="flex flex-col items-center">
                            <ArrowRight className="h-6 w-6 text-primary" />
                          </div>
                          <div className="flex-1 text-center">
                            <div className="flex items-center justify-center gap-2 mb-1">
                              <Stethoscope className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium text-sm">{interconsulta.toDoctor}</span>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {interconsulta.toSpecialty}
                            </Badge>
                          </div>
                        </div>

                        {/* Reason */}
                        <div className="flex items-start gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                          <p className="text-sm text-muted-foreground">{interconsulta.reason}</p>
                        </div>

                        {/* Scheduled Date */}
                        {interconsulta.scheduledDate && (
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-confirmed" />
                            <span className="text-confirmed font-medium">Agendada: {interconsulta.scheduledDate}</span>
                          </div>
                        )}

                        {/* Rejection Reason */}
                        {interconsulta.rejectionReason && (
                          <div className="flex items-start gap-2 p-3 rounded-lg bg-destructive/5 border border-destructive/20">
                            <AlertCircle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
                            <p className="text-sm text-destructive">{interconsulta.rejectionReason}</p>
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex gap-2 pt-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="gap-2"
                            onClick={() => handleViewDetails(interconsulta)}
                          >
                            <Eye className="h-4 w-4" />
                            Ver Detalhes
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="gap-2"
                            onClick={() => handleSendMessage(interconsulta)}
                          >
                            <MessageSquare className="h-4 w-4" />
                            Mensagem
                          </Button>
                          {interconsulta.status === "pending" && (
                            <>
                              <Button 
                                size="sm" 
                                className="gap-2 ml-auto"
                                onClick={() => handleAccept(interconsulta)}
                              >
                                <CheckCircle2 className="h-4 w-4" />
                                Aceitar
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="sent" className="space-y-4">
          <div className="flex items-center justify-center h-[300px] text-muted-foreground">
            <div className="text-center">
              <Send className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Suas interconsultas enviadas aparecerão aqui</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      </PageContent>

      <NewInterconsultaModal 
        open={showNewInterconsultaModal} 
        onOpenChange={setShowNewInterconsultaModal} 
      />
    </PageContainer>
  );
};

export default Interconsulta;