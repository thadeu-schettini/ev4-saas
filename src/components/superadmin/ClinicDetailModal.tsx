import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  Building2,
  Users,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Crown,
  Briefcase,
  Star,
  CheckCircle2,
  Ban,
  PowerOff,
  DollarSign,
  Database,
  Activity,
  TrendingUp,
  FileText,
  Settings,
  ExternalLink,
  MessageSquare,
  CreditCard,
  History,
  UserCog,
  Stethoscope,
  CalendarDays,
  HardDrive,
  BarChart3,
  Globe,
  Key,
  Shield,
  Unlock,
  Edit,
  Trash2,
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";

interface ClinicDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clinic: {
    id: number;
    name: string;
    owner: string;
    email: string;
    phone: string;
    plan: string;
    users: number;
    status: string;
    mrr: number;
    createdAt: string;
    lastLogin: string;
    storage: number;
    appointments: number;
    patients: number;
    location: string;
  } | null;
}

// Mock usage data
const usageData = [
  { month: "Jul", appointments: 145, patients: 89 },
  { month: "Ago", appointments: 178, patients: 112 },
  { month: "Set", appointments: 165, patients: 98 },
  { month: "Out", appointments: 198, patients: 134 },
  { month: "Nov", appointments: 212, patients: 156 },
  { month: "Dez", appointments: 187, patients: 143 },
];

// Mock team members
const teamMembers = [
  { id: 1, name: "Dr. Ricardo Carvalho", role: "Proprietário", email: "ricardo@clinic.com", status: "active", lastLogin: "Há 2 horas" },
  { id: 2, name: "Dra. Maria Santos", role: "Médica", email: "maria@clinic.com", status: "active", lastLogin: "Há 1 hora" },
  { id: 3, name: "João Silva", role: "Recepcionista", email: "joao@clinic.com", status: "active", lastLogin: "Há 30 min" },
  { id: 4, name: "Ana Costa", role: "Enfermeira", email: "ana@clinic.com", status: "active", lastLogin: "Há 4 horas" },
  { id: 5, name: "Pedro Lima", role: "Administrador", email: "pedro@clinic.com", status: "inactive", lastLogin: "Há 15 dias" },
];

// Mock billing history
const billingHistory = [
  { id: 1, date: "01/12/2024", description: "Mensalidade Enterprise", amount: 2890, status: "paid" },
  { id: 2, date: "01/11/2024", description: "Mensalidade Enterprise", amount: 2890, status: "paid" },
  { id: 3, date: "01/10/2024", description: "Upgrade para Enterprise", amount: 1500, status: "paid" },
  { id: 4, date: "01/10/2024", description: "Mensalidade Business", amount: 1450, status: "paid" },
  { id: 5, date: "01/09/2024", description: "Mensalidade Business", amount: 1450, status: "paid" },
];

// Mock activity log
const activityLog = [
  { id: 1, action: "Login realizado", user: "Dr. Ricardo Carvalho", timestamp: "10/12/2024 14:32" },
  { id: 2, action: "Novo paciente cadastrado", user: "Recepção", timestamp: "10/12/2024 11:45" },
  { id: 3, action: "Consulta realizada", user: "Dra. Maria Santos", timestamp: "10/12/2024 10:30" },
  { id: 4, action: "Relatório exportado", user: "Administrador", timestamp: "09/12/2024 16:20" },
  { id: 5, action: "Configurações alteradas", user: "Dr. Ricardo Carvalho", timestamp: "08/12/2024 09:15" },
];

export function ClinicDetailModal({ open, onOpenChange, clinic }: ClinicDetailModalProps) {
  const [activeTab, setActiveTab] = useState("overview");

  if (!clinic) return null;

  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case "Enterprise":
        return <Badge className="bg-purple-500/10 text-purple-600 border-purple-500/20 gap-1"><Crown className="h-3 w-3" />Enterprise</Badge>;
      case "Business":
        return <Badge className="bg-success/10 text-success border-success/20 gap-1"><Briefcase className="h-3 w-3" />Business</Badge>;
      case "Pro":
        return <Badge className="bg-primary/10 text-primary border-primary/20 gap-1"><Star className="h-3 w-3" />Pro</Badge>;
      default:
        return <Badge variant="outline">Free</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-status-confirmed/10 text-status-confirmed border-status-confirmed/20 gap-1"><CheckCircle2 className="h-3 w-3" />Ativo</Badge>;
      case "trial":
        return <Badge className="bg-info/10 text-info border-info/20 gap-1"><Clock className="h-3 w-3" />Trial</Badge>;
      case "suspended":
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20 gap-1"><Ban className="h-3 w-3" />Suspenso</Badge>;
      default:
        return <Badge className="bg-muted text-muted-foreground gap-1"><PowerOff className="h-3 w-3" />Inativo</Badge>;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="pb-4 border-b">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary text-xl font-bold">
                  {clinic.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div>
                <DialogTitle className="text-xl">{clinic.name}</DialogTitle>
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  {getPlanBadge(clinic.plan)}
                  {getStatusBadge(clinic.status)}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <ExternalLink className="h-4 w-4" />
                Acessar
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Edit className="h-4 w-4" />
                Editar
              </Button>
            </div>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 overflow-hidden flex flex-col">
          <TabsList className="bg-muted/50 p-1 w-full justify-start">
            <TabsTrigger value="overview" className="text-xs sm:text-sm">Visão Geral</TabsTrigger>
            <TabsTrigger value="team" className="text-xs sm:text-sm">Equipe</TabsTrigger>
            <TabsTrigger value="billing" className="text-xs sm:text-sm">Faturamento</TabsTrigger>
            <TabsTrigger value="activity" className="text-xs sm:text-sm">Atividade</TabsTrigger>
          </TabsList>

          <ScrollArea className="flex-1 mt-4">
            <TabsContent value="overview" className="m-0 space-y-6">
              {/* Contact Info */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <UserCog className="h-4 w-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">Proprietário</p>
                      <p className="font-medium text-sm truncate">{clinic.owner}</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-info/10">
                      <Mail className="h-4 w-4 text-info" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="font-medium text-sm truncate">{clinic.email}</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-success/10">
                      <Phone className="h-4 w-4 text-success" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">Telefone</p>
                      <p className="font-medium text-sm">{clinic.phone}</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-warning/10">
                      <MapPin className="h-4 w-4 text-warning" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">Localização</p>
                      <p className="font-medium text-sm truncate">{clinic.location}</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                <Card className="p-4 text-center">
                  <p className="text-2xl font-bold text-primary">{clinic.users}</p>
                  <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                    <Users className="h-3 w-3" />Usuários
                  </p>
                </Card>
                <Card className="p-4 text-center">
                  <p className="text-2xl font-bold text-info">{clinic.patients.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                    <Stethoscope className="h-3 w-3" />Pacientes
                  </p>
                </Card>
                <Card className="p-4 text-center">
                  <p className="text-2xl font-bold text-success">{clinic.appointments.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                    <CalendarDays className="h-3 w-3" />Consultas
                  </p>
                </Card>
                <Card className="p-4 text-center">
                  <p className="text-2xl font-bold text-warning">{clinic.storage}%</p>
                  <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                    <HardDrive className="h-3 w-3" />Storage
                  </p>
                </Card>
                <Card className="p-4 text-center bg-gradient-to-br from-success/5 to-success/10 border-success/20">
                  <p className="text-2xl font-bold text-success">R$ {clinic.mrr}</p>
                  <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                    <DollarSign className="h-3 w-3" />MRR
                  </p>
                </Card>
              </div>

              {/* Usage Chart */}
              <Card className="p-6">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-primary" />
                  Uso nos Últimos 6 Meses
                </h4>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={usageData}>
                      <defs>
                        <linearGradient id="colorAppointments" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Area type="monotone" dataKey="appointments" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorAppointments)" strokeWidth={2} name="Consultas" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* Quick Info */}
              <div className="grid sm:grid-cols-2 gap-4">
                <Card className="p-4">
                  <h4 className="font-semibold mb-3 flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-primary" />
                    Informações de Conta
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Criada em</span>
                      <span className="font-medium">{clinic.createdAt}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Último acesso</span>
                      <span className="font-medium">{clinic.lastLogin}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status</span>
                      {getStatusBadge(clinic.status)}
                    </div>
                  </div>
                </Card>
                <Card className="p-4">
                  <h4 className="font-semibold mb-3 flex items-center gap-2 text-sm">
                    <Shield className="h-4 w-4 text-primary" />
                    Segurança
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">2FA Ativado</span>
                      <Badge className="bg-success/10 text-success border-success/20">Sim</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">SSO</span>
                      <Badge variant="outline">Não configurado</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">API Keys</span>
                      <Badge className="bg-info/10 text-info border-info/20">2 ativas</Badge>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="team" className="m-0 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  Equipe ({teamMembers.length} membros)
                </h4>
                <Button size="sm" className="gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Mensagem para todos
                </Button>
              </div>
              <div className="space-y-2">
                {teamMembers.map((member) => (
                  <Card key={member.id} className="p-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-primary text-sm">
                          {member.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-sm">{member.name}</p>
                          <Badge variant="outline" className="text-xs">{member.role}</Badge>
                          {member.status === "active" ? (
                            <Badge className="bg-success/10 text-success border-success/20 text-xs">Ativo</Badge>
                          ) : (
                            <Badge className="bg-muted text-muted-foreground text-xs">Inativo</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                          <span>{member.email}</span>
                          <span>Último acesso: {member.lastLogin}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Mail className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="billing" className="m-0 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-primary" />
                  Histórico de Faturamento
                </h4>
                <Button variant="outline" size="sm" className="gap-2">
                  <DollarSign className="h-4 w-4" />
                  Gerenciar Plano
                </Button>
              </div>
              <Card className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Plano Atual</p>
                    <div className="flex items-center gap-2 mt-1">
                      {getPlanBadge(clinic.plan)}
                      <span className="text-lg font-bold">R$ {clinic.mrr}/mês</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Próxima cobrança</p>
                    <p className="font-medium">01/01/2025</p>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="space-y-2">
                  {billingHistory.map((item) => (
                    <div key={item.id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                      <div>
                        <p className="font-medium text-sm">{item.description}</p>
                        <p className="text-xs text-muted-foreground">{item.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-success">R$ {item.amount.toLocaleString()}</p>
                        <Badge className="bg-success/10 text-success border-success/20 text-xs">Pago</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="m-0 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold flex items-center gap-2">
                  <History className="h-4 w-4 text-primary" />
                  Log de Atividades
                </h4>
                <Button variant="outline" size="sm" className="gap-2">
                  Exportar
                </Button>
              </div>
              <Card className="p-4">
                <div className="space-y-3">
                  {activityLog.map((item) => (
                    <div key={item.id} className="flex items-start gap-3 py-2 border-b border-border/50 last:border-0">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.action}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                          <span>{item.user}</span>
                          <span>•</span>
                          <span>{item.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
          </ScrollArea>
        </Tabs>

        <div className="pt-4 border-t flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {clinic.status === "suspended" ? (
              <Button variant="outline" className="gap-2 text-success">
                <Unlock className="h-4 w-4" />
                Reativar Clínica
              </Button>
            ) : (
              <Button variant="outline" className="gap-2 text-destructive">
                <Ban className="h-4 w-4" />
                Suspender Clínica
              </Button>
            )}
          </div>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
