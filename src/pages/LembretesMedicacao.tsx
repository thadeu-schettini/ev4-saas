import { useState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { PageContainer, PageContent } from "@/components/ui/page-container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Bell, 
  Search, 
  Plus, 
  Clock,
  CheckCircle2,
  XCircle,
  User,
  Pill,
  Calendar,
  Send,
  Filter,
  MoreVertical,
  Smartphone,
  MessageSquare,
  TrendingUp
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NewReminderModal } from "@/components/lembretes/NewReminderModal";
import { toast } from "sonner";

const mockReminders = [
  {
    id: 1,
    patient: "Maria Silva",
    patientPhone: "(11) 99999-1234",
    medication: "Losartana 50mg",
    schedule: "08:00, 20:00",
    frequency: "2x ao dia",
    startDate: "01/01/2025",
    endDate: "01/07/2025",
    status: "active",
    adherence: 92,
    lastTaken: "Hoje, 08:05"
  },
  {
    id: 2,
    patient: "João Oliveira",
    patientPhone: "(11) 98888-5678",
    medication: "Metformina 850mg",
    schedule: "07:00, 13:00, 19:00",
    frequency: "3x ao dia",
    startDate: "15/12/2024",
    endDate: "15/06/2025",
    status: "active",
    adherence: 78,
    lastTaken: "Ontem, 19:00"
  },
  {
    id: 3,
    patient: "Ana Costa",
    patientPhone: "(11) 97777-9012",
    medication: "Omeprazol 20mg",
    schedule: "07:00",
    frequency: "1x ao dia",
    startDate: "10/12/2024",
    endDate: "10/01/2025",
    status: "expiring",
    adherence: 100,
    lastTaken: "Hoje, 07:15"
  },
  {
    id: 4,
    patient: "Pedro Mendes",
    patientPhone: "(11) 96666-3456",
    medication: "Atenolol 25mg",
    schedule: "08:00",
    frequency: "1x ao dia",
    startDate: "01/11/2024",
    endDate: "01/12/2024",
    status: "completed",
    adherence: 85,
    lastTaken: "01/12/2024"
  }
];

const mockNotifications = [
  { id: 1, patient: "Maria Silva", medication: "Losartana 50mg", time: "08:00", status: "taken", respondedAt: "08:05" },
  { id: 2, patient: "João Oliveira", medication: "Metformina 850mg", time: "07:00", status: "missed", respondedAt: null },
  { id: 3, patient: "Ana Costa", medication: "Omeprazol 20mg", time: "07:00", status: "taken", respondedAt: "07:15" },
  { id: 4, patient: "Maria Silva", medication: "Losartana 50mg", time: "20:00 (ontem)", status: "taken", respondedAt: "20:10" }
];

const statusConfig = {
  active: { label: "Ativo", color: "bg-confirmed/10 text-confirmed border-confirmed/20" },
  expiring: { label: "Expirando", color: "bg-pending/10 text-pending border-pending/20" },
  completed: { label: "Concluído", color: "bg-muted text-muted-foreground border-border" },
  paused: { label: "Pausado", color: "bg-info/10 text-info border-info/20" }
};

const LembretesMedicacao = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("reminders");
  const [showNewReminderModal, setShowNewReminderModal] = useState(false);

  const stats = [
    { label: "Lembretes Ativos", value: 156, icon: Bell, color: "text-primary" },
    { label: "Enviados Hoje", value: 342, icon: Send, color: "text-info" },
    { label: "Taxa Adesão", value: "87%", icon: TrendingUp, color: "text-confirmed" },
    { label: "Não Respondidos", value: 12, icon: XCircle, color: "text-destructive" }
  ];

  const handleSendNow = (reminder: typeof mockReminders[0]) => {
    toast.success(`Lembrete enviado para ${reminder.patient}`);
  };

  return (
    <PageContainer>
      <PageHeader
        title="Lembretes de Medicação"
        description="Notificações automáticas para adesão ao tratamento"
        icon={Bell}
        actions={
          <Button className="gap-2" onClick={() => setShowNewReminderModal(true)}>
            <Plus className="h-4 w-4" />
            Novo Lembrete
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
            <TabsTrigger value="reminders" className="gap-2">
              <Bell className="h-4 w-4" />
              Lembretes
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2">
              <Clock className="h-4 w-4" />
              Histórico
            </TabsTrigger>
          </TabsList>

          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar paciente..."
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

        <TabsContent value="reminders" className="space-y-4">
          <ScrollArea className="h-[calc(100vh-400px)]">
            <div className="space-y-4">
              {mockReminders.map((reminder) => (
                <Card key={reminder.id} className="group hover:shadow-md transition-all hover:border-primary/20">
                  <CardContent className="p-4">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                      {/* Patient Info */}
                      <div className="flex items-center gap-3 min-w-[200px]">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/5">
                            <User className="h-5 w-5 text-primary" />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{reminder.patient}</p>
                          <p className="text-xs text-muted-foreground">{reminder.patientPhone}</p>
                        </div>
                      </div>

                      {/* Medication Info */}
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0">
                          <Pill className="h-5 w-5 text-primary" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium truncate">{reminder.medication}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{reminder.schedule}</span>
                            <span>•</span>
                            <span>{reminder.frequency}</span>
                          </div>
                        </div>
                      </div>

                      {/* Schedule & Adherence */}
                      <div className="flex items-center gap-6">
                        <div className="text-center min-w-[100px]">
                          <p className="text-xs text-muted-foreground mb-1">Período</p>
                          <p className="text-sm">{reminder.startDate} - {reminder.endDate}</p>
                        </div>

                        <div className="text-center min-w-[80px]">
                          <p className="text-xs text-muted-foreground mb-1">Adesão</p>
                          <div className={`text-lg font-bold ${
                            reminder.adherence >= 90 ? "text-confirmed" :
                            reminder.adherence >= 70 ? "text-pending" :
                            "text-destructive"
                          }`}>
                            {reminder.adherence}%
                          </div>
                        </div>

                        <Badge variant="outline" className={statusConfig[reminder.status as keyof typeof statusConfig].color}>
                          {statusConfig[reminder.status as keyof typeof statusConfig].label}
                        </Badge>

                        <div className="flex items-center gap-2">
                          <Switch checked={reminder.status === "active"} />
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Editar</DropdownMenuItem>
                              <DropdownMenuItem>Ver Histórico</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleSendNow(reminder)}>
                                Enviar Agora
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">Excluir</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>

                    {/* Last Activity */}
                    <div className="mt-3 pt-3 border-t flex items-center gap-2 text-sm text-muted-foreground">
                      <Smartphone className="h-3 w-3" />
                      <span>Última confirmação: {reminder.lastTaken}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Notificações de Hoje</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-3">
                  {mockNotifications.map((notification) => (
                    <div key={notification.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
                      <div className="flex items-center gap-3">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                          notification.status === "taken" 
                            ? "bg-confirmed/10" 
                            : "bg-destructive/10"
                        }`}>
                          {notification.status === "taken" 
                            ? <CheckCircle2 className="h-4 w-4 text-confirmed" />
                            : <XCircle className="h-4 w-4 text-destructive" />
                          }
                        </div>
                        <div>
                          <p className="font-medium text-sm">{notification.patient}</p>
                          <p className="text-xs text-muted-foreground">{notification.medication}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm">{notification.time}</p>
                        {notification.respondedAt && (
                          <p className="text-xs text-muted-foreground">
                            Confirmado às {notification.respondedAt}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      </PageContent>

      <NewReminderModal 
        open={showNewReminderModal} 
        onOpenChange={setShowNewReminderModal} 
      />
    </PageContainer>
  );
};

export default LembretesMedicacao;