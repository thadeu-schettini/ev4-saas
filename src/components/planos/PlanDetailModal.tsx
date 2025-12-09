import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  Layers,
  Users,
  Calendar,
  CheckCircle2,
  Clock,
  Edit2,
  Plus,
  Phone,
  Mail,
  MoreVertical,
  Eye,
  TrendingUp,
  DollarSign,
  AlertCircle,
  PlayCircle,
  PauseCircle,
  ArrowRight,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PlanDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plan: {
    id: number;
    name: string;
    description: string;
    sessions: number;
    price: number;
    services: string[];
    active: boolean;
    patients: number;
    completion: number;
    category: string;
    popular?: boolean;
  } | null;
  onAddPatient: () => void;
  onEditPlan: () => void;
}

// Mock linked patients
const linkedPatients = [
  {
    id: 1,
    name: "Maria Silva",
    avatar: "",
    phone: "(11) 99999-1234",
    email: "maria@email.com",
    startDate: "2024-01-15",
    sessionsUsed: 4,
    totalSessions: 6,
    status: "active",
    nextSession: "2024-12-12",
  },
  {
    id: 2,
    name: "João Pedro",
    avatar: "",
    phone: "(11) 98888-4321",
    email: "joao@email.com",
    startDate: "2024-02-20",
    sessionsUsed: 6,
    totalSessions: 6,
    status: "completed",
    nextSession: null,
  },
  {
    id: 3,
    name: "Ana Costa",
    avatar: "",
    phone: "(11) 97777-5678",
    email: "ana@email.com",
    startDate: "2024-03-10",
    sessionsUsed: 2,
    totalSessions: 6,
    status: "active",
    nextSession: "2024-12-14",
  },
  {
    id: 4,
    name: "Carlos Lima",
    avatar: "",
    phone: "(11) 96666-8765",
    email: "carlos@email.com",
    startDate: "2024-01-05",
    sessionsUsed: 1,
    totalSessions: 6,
    status: "paused",
    nextSession: null,
  },
];

// Mock sessions history
const sessionsHistory = [
  { id: 1, patient: "Maria Silva", date: "2024-12-05", session: 4, status: "completed", professional: "Dr. Ricardo" },
  { id: 2, patient: "Ana Costa", date: "2024-12-04", session: 2, status: "completed", professional: "Dra. Ana Paula" },
  { id: 3, patient: "Maria Silva", date: "2024-11-28", session: 3, status: "completed", professional: "Dr. Ricardo" },
  { id: 4, patient: "João Pedro", date: "2024-11-25", session: 6, status: "completed", professional: "Dr. Ricardo" },
  { id: 5, patient: "Carlos Lima", date: "2024-11-20", session: 1, status: "completed", professional: "Dra. Ana Paula" },
  { id: 6, patient: "Maria Silva", date: "2024-11-15", session: 2, status: "completed", professional: "Dr. Ricardo" },
];

export function PlanDetailModal({ open, onOpenChange, plan, onAddPatient, onEditPlan }: PlanDetailModalProps) {
  const [activeTab, setActiveTab] = useState("overview");

  if (!plan) return null;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">Ativo</Badge>;
      case "completed":
        return <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20">Concluído</Badge>;
      case "paused":
        return <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20">Pausado</Badge>;
      default:
        return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <PlayCircle className="h-4 w-4 text-emerald-500" />;
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-blue-500" />;
      case "paused":
        return <PauseCircle className="h-4 w-4 text-amber-500" />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary/70 to-primary/50 shadow-sm">
              <Layers className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-xl">{plan.name}</DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {plan.description}
              </p>
            </div>
            <Badge variant={plan.active ? "default" : "secondary"}>
              {plan.active ? "Ativo" : "Inativo"}
            </Badge>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="w-full justify-start bg-muted/50">
            <TabsTrigger value="overview" className="gap-2">
              <Eye className="h-4 w-4" />
              Visão Geral
            </TabsTrigger>
            <TabsTrigger value="patients" className="gap-2">
              <Users className="h-4 w-4" />
              Pacientes ({linkedPatients.length})
            </TabsTrigger>
            <TabsTrigger value="sessions" className="gap-2">
              <Calendar className="h-4 w-4" />
              Sessões
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    Serviços Inclusos
                  </h4>
                  <div className="space-y-2">
                    {plan.services.map((service, idx) => (
                      <div 
                        key={idx}
                        className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
                      >
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span className="text-sm">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-muted/50 text-center">
                    <Calendar className="h-5 w-5 mx-auto text-muted-foreground mb-2" />
                    <p className="text-2xl font-bold">{plan.sessions}</p>
                    <p className="text-xs text-muted-foreground">Sessões</p>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/50 text-center">
                    <Users className="h-5 w-5 mx-auto text-muted-foreground mb-2" />
                    <p className="text-2xl font-bold">{linkedPatients.length}</p>
                    <p className="text-xs text-muted-foreground">Pacientes</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-6 rounded-xl border border-border/50 bg-card">
                  <div className="text-center mb-4">
                    <p className="text-sm text-muted-foreground mb-1">Valor do Plano</p>
                    {plan.price > 0 ? (
                      <p className="text-3xl font-bold">
                        R$ {plan.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    ) : (
                      <p className="text-2xl font-bold text-emerald-500">Gratuito</p>
                    )}
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Taxa de conclusão</span>
                      <span className="font-medium">{plan.completion}%</span>
                    </div>
                    <Progress value={plan.completion} className="h-3" />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 gap-2" onClick={onAddPatient}>
                    <Plus className="h-4 w-4" />
                    Adicionar Paciente
                  </Button>
                  <Button variant="outline" className="gap-2" onClick={onEditPlan}>
                    <Edit2 className="h-4 w-4" />
                    Editar
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Patients Tab */}
          <TabsContent value="patients" className="mt-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <Badge variant="outline" className="gap-1">
                  <PlayCircle className="h-3 w-3 text-emerald-500" />
                  Ativos: {linkedPatients.filter(p => p.status === "active").length}
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <CheckCircle2 className="h-3 w-3 text-blue-500" />
                  Concluídos: {linkedPatients.filter(p => p.status === "completed").length}
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <PauseCircle className="h-3 w-3 text-amber-500" />
                  Pausados: {linkedPatients.filter(p => p.status === "paused").length}
                </Badge>
              </div>
              <Button size="sm" className="gap-2" onClick={onAddPatient}>
                <Plus className="h-4 w-4" />
                Adicionar
              </Button>
            </div>

            <ScrollArea className="h-[350px]">
              <div className="space-y-3">
                {linkedPatients.map((patient) => (
                  <div
                    key={patient.id}
                    className="p-4 rounded-xl border border-border/50 hover:border-primary/30 transition-all bg-card group"
                  >
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={patient.avatar} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {patient.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{patient.name}</h4>
                            {getStatusBadge(patient.status)}
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem className="gap-2">
                                <Eye className="h-4 w-4" />
                                Ver Detalhes
                              </DropdownMenuItem>
                              <DropdownMenuItem className="gap-2">
                                <Calendar className="h-4 w-4" />
                                Agendar Sessão
                              </DropdownMenuItem>
                              <DropdownMenuItem className="gap-2">
                                <Phone className="h-4 w-4" />
                                Ligar
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {patient.phone}
                          </span>
                          <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {patient.email}
                          </span>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="flex-1">
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span className="text-muted-foreground">Progresso</span>
                              <span className="font-medium">{patient.sessionsUsed}/{patient.totalSessions} sessões</span>
                            </div>
                            <Progress 
                              value={(patient.sessionsUsed / patient.totalSessions) * 100} 
                              className="h-2"
                            />
                          </div>
                          {patient.nextSession && (
                            <div className="text-xs">
                              <span className="text-muted-foreground">Próxima: </span>
                              <span className="font-medium">{new Date(patient.nextSession).toLocaleDateString('pt-BR')}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          {/* Sessions Tab */}
          <TabsContent value="sessions" className="mt-4">
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-center">
                <p className="text-2xl font-bold text-primary">{sessionsHistory.length}</p>
                <p className="text-xs text-muted-foreground">Total Realizadas</p>
              </div>
              <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-center">
                <p className="text-2xl font-bold text-emerald-600">12</p>
                <p className="text-xs text-muted-foreground">Este Mês</p>
              </div>
              <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 text-center">
                <p className="text-2xl font-bold text-amber-600">8</p>
                <p className="text-xs text-muted-foreground">Agendadas</p>
              </div>
              <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/20 text-center">
                <p className="text-2xl font-bold text-blue-600">94%</p>
                <p className="text-xs text-muted-foreground">Taxa Presença</p>
              </div>
            </div>

            <h4 className="font-medium mb-3 flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              Histórico de Sessões
            </h4>

            <ScrollArea className="h-[280px]">
              <div className="space-y-2">
                {sessionsHistory.map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:border-primary/30 transition-all bg-card"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-emerald-500/10">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{session.patient}</span>
                          <Badge variant="outline" className="text-xs">Sessão {session.session}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {session.professional} • {new Date(session.date).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="gap-1 text-xs">
                      Detalhes
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
