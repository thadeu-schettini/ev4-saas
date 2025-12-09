import { useState } from "react";
import { 
  Bell, 
  Mail, 
  MessageSquare, 
  Smartphone, 
  Send, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  TrendingUp,
  Filter,
  Plus,
  Search,
  BarChart3,
  Zap,
  Users,
  RefreshCw,
  ArrowUpRight,
  Sparkles
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { PageContainer, PageContent } from "@/components/ui/page-container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

const channelData = [
  { name: "Push", icon: Bell, sent: 1247, delivered: 1189, failed: 58, rate: 95.3, color: "from-amber-500 to-orange-500" },
  { name: "E-mail", icon: Mail, sent: 3421, delivered: 3198, failed: 223, rate: 93.5, color: "from-blue-500 to-cyan-500" },
  { name: "SMS", icon: MessageSquare, sent: 892, delivered: 856, failed: 36, rate: 96.0, color: "from-emerald-500 to-green-500" },
  { name: "WhatsApp", icon: Smartphone, sent: 2156, delivered: 2089, failed: 67, rate: 96.9, color: "from-green-500 to-emerald-500" },
];

const weeklyData = [
  { day: "Seg", enviadas: 450, entregues: 432, falhas: 18 },
  { day: "Ter", enviadas: 520, entregues: 498, falhas: 22 },
  { day: "Qua", enviadas: 380, entregues: 365, falhas: 15 },
  { day: "Qui", enviadas: 610, entregues: 589, falhas: 21 },
  { day: "Sex", enviadas: 490, entregues: 471, falhas: 19 },
  { day: "Sáb", enviadas: 280, entregues: 272, falhas: 8 },
  { day: "Dom", enviadas: 150, entregues: 145, falhas: 5 },
];

const recentNotifications = [
  { id: 1, type: "Lembrete", recipient: "Maria Silva", channel: "WhatsApp", status: "delivered", time: "2 min atrás" },
  { id: 2, type: "Confirmação", recipient: "João Santos", channel: "SMS", status: "delivered", time: "5 min atrás" },
  { id: 3, type: "Lembrete", recipient: "Ana Costa", channel: "E-mail", status: "pending", time: "8 min atrás" },
  { id: 4, type: "Promocional", recipient: "Carlos Lima", channel: "Push", status: "failed", time: "12 min atrás" },
  { id: 5, type: "Confirmação", recipient: "Paula Souza", channel: "WhatsApp", status: "delivered", time: "15 min atrás" },
];

const templates = [
  { id: 1, name: "Lembrete de Consulta", channel: "WhatsApp", uses: 1248, rate: 98.2 },
  { id: 2, name: "Confirmação de Agendamento", channel: "SMS", uses: 892, rate: 97.5 },
  { id: 3, name: "Resultado de Exames", channel: "E-mail", uses: 456, rate: 94.8 },
  { id: 4, name: "Aniversário do Paciente", channel: "Push", uses: 234, rate: 99.1 },
];

const pieData = [
  { name: "Entregues", value: 7332, color: "hsl(var(--primary))" },
  { name: "Pendentes", value: 284, color: "hsl(var(--muted))" },
  { name: "Falhas", value: 384, color: "hsl(var(--destructive))" },
];

export default function Notificacoes() {
  const [selectedChannels, setSelectedChannels] = useState<string[]>(["push"]);
  const [notificationType, setNotificationType] = useState("lembrete");

  const toggleChannel = (channel: string) => {
    setSelectedChannels(prev => 
      prev.includes(channel) 
        ? prev.filter(c => c !== channel)
        : [...prev, channel]
    );
  };

  const totalSent = channelData.reduce((acc, c) => acc + c.sent, 0);
  const totalDelivered = channelData.reduce((acc, c) => acc + c.delivered, 0);
  const overallRate = ((totalDelivered / totalSent) * 100).toFixed(1);

  return (
    <PageContainer>
      <PageHeader
        icon={Bell}
        iconGradient="from-amber-500 to-orange-500"
        title="Central de Notificações"
        description="Gerencie e acompanhe todas as comunicações com seus pacientes"
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Atualizar
            </Button>
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Nova Campanha
            </Button>
          </div>
        }
      />

      <PageContent>
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {channelData.map((channel) => (
          <Card 
            key={channel.name} 
            className="group relative overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
          >
            <div className={cn(
              "absolute inset-0 opacity-5 bg-gradient-to-br",
              channel.color
            )} />
            <CardContent className="p-4 relative">
              <div className="flex items-start justify-between mb-3">
                <div className={cn(
                  "p-2.5 rounded-xl bg-gradient-to-br shadow-lg",
                  channel.color
                )}>
                  <channel.icon className="h-5 w-5 text-white" />
                </div>
                <Badge variant="secondary" className="text-xs font-medium">
                  {channel.rate}%
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-1">{channel.name}</p>
              <p className="text-2xl font-bold">{channel.sent.toLocaleString()}</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={cn("h-full bg-gradient-to-r rounded-full", channel.color)}
                    style={{ width: `${channel.rate}%` }}
                  />
                </div>
              </div>
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                  {channel.delivered}
                </span>
                <span className="flex items-center gap-1">
                  <XCircle className="h-3 w-3 text-destructive" />
                  {channel.failed}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="overview" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Visão Geral
          </TabsTrigger>
          <TabsTrigger value="send" className="gap-2">
            <Send className="h-4 w-4" />
            Enviar
          </TabsTrigger>
          <TabsTrigger value="history" className="gap-2">
            <Clock className="h-4 w-4" />
            Histórico
          </TabsTrigger>
          <TabsTrigger value="templates" className="gap-2">
            <Sparkles className="h-4 w-4" />
            Templates
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Weekly Chart */}
            <Card className="lg:col-span-2 border-border/50">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">Performance Semanal</CardTitle>
                  <Badge variant="outline" className="gap-1">
                    <TrendingUp className="h-3 w-3 text-emerald-500" />
                    +12.5%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={weeklyData}>
                      <defs>
                        <linearGradient id="colorEnviadas" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorEntregues" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Area type="monotone" dataKey="enviadas" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorEnviadas)" strokeWidth={2} />
                      <Area type="monotone" dataKey="entregues" stroke="hsl(142, 76%, 36%)" fillOpacity={1} fill="url(#colorEntregues)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Distribution Pie */}
            <Card className="border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">Taxa de Entrega</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={80}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-3xl font-bold">{overallRate}%</p>
                      <p className="text-xs text-muted-foreground">Sucesso</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2 mt-4">
                  {pieData.map((item) => (
                    <div key={item.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-muted-foreground">{item.name}</span>
                      </div>
                      <span className="font-medium">{item.value.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">Atividade Recente</CardTitle>
                <Button variant="ghost" size="sm" className="gap-2">
                  Ver Todas
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentNotifications.map((notification) => (
                  <div 
                    key={notification.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        notification.status === "delivered" && "bg-emerald-500",
                        notification.status === "pending" && "bg-amber-500",
                        notification.status === "failed" && "bg-destructive"
                      )} />
                      <div>
                        <p className="font-medium text-sm">{notification.recipient}</p>
                        <p className="text-xs text-muted-foreground">{notification.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="text-xs">
                        {notification.channel}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{notification.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Send Tab */}
        <TabsContent value="send" className="space-y-6">
          <div className="grid lg:grid-cols-5 gap-6">
            <Card className="lg:col-span-3 border-border/50">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Zap className="h-5 w-5 text-amber-500" />
                  Nova Notificação
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Channels */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Canais</label>
                  <div className="flex flex-wrap gap-2">
                    {channelData.map((channel) => (
                      <Button
                        key={channel.name.toLowerCase()}
                        variant={selectedChannels.includes(channel.name.toLowerCase()) ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleChannel(channel.name.toLowerCase())}
                        className={cn(
                          "gap-2 transition-all",
                          selectedChannels.includes(channel.name.toLowerCase()) && "shadow-lg"
                        )}
                      >
                        <channel.icon className="h-4 w-4" />
                        {channel.name}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Type */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Tipo de Notificação</label>
                  <Select value={notificationType} onValueChange={setNotificationType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lembrete">Lembrete de Consulta</SelectItem>
                      <SelectItem value="confirmacao">Confirmação de Agendamento</SelectItem>
                      <SelectItem value="resultado">Resultado de Exames</SelectItem>
                      <SelectItem value="promocional">Campanha Promocional</SelectItem>
                      <SelectItem value="personalizado">Personalizado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Recipients */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Destinatários</label>
                  <Select defaultValue="todos">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos os Pacientes</SelectItem>
                      <SelectItem value="agendados">Com Agendamento Hoje</SelectItem>
                      <SelectItem value="semana">Com Agendamento na Semana</SelectItem>
                      <SelectItem value="ativos">Pacientes Ativos</SelectItem>
                      <SelectItem value="individual">Seleção Individual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Title */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Título</label>
                  <Input placeholder="Ex: Lembrete - Sua consulta é amanhã!" />
                </div>

                {/* Message */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Mensagem</label>
                  <Textarea 
                    placeholder="Digite sua mensagem... Use {nome}, {data}, {horario} para personalização automática."
                    className="min-h-[120px] resize-none"
                  />
                </div>

                <Button className="w-full gap-2">
                  <Send className="h-4 w-4" />
                  Enviar Notificação
                </Button>
              </CardContent>
            </Card>

            {/* Preview & Stats */}
            <Card className="lg:col-span-2 border-border/50">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Pré-visualização</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 rounded-xl bg-muted/50 border border-dashed border-border">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Bell className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">MedClinic</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Olá {"{nome}"}, sua consulta está agendada para {"{data}"} às {"{horario}"}. Confirme sua presença!
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Destinatários</span>
                    </div>
                    <span className="font-semibold">847</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Canais Ativos</span>
                    </div>
                    <span className="font-semibold">{selectedChannels.length}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Taxa Esperada</span>
                    </div>
                    <span className="font-semibold text-emerald-500">~95%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history" className="space-y-6">
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <CardTitle className="text-lg font-semibold">Histórico de Envios</CardTitle>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Buscar..." className="pl-9 w-[200px]" />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[...recentNotifications, ...recentNotifications].map((notification, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center justify-between p-4 rounded-xl border border-border/50 hover:bg-muted/30 transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "p-2.5 rounded-xl",
                        notification.status === "delivered" && "bg-emerald-500/10",
                        notification.status === "pending" && "bg-amber-500/10",
                        notification.status === "failed" && "bg-destructive/10"
                      )}>
                        {notification.status === "delivered" && <CheckCircle2 className="h-5 w-5 text-emerald-500" />}
                        {notification.status === "pending" && <Clock className="h-5 w-5 text-amber-500" />}
                        {notification.status === "failed" && <XCircle className="h-5 w-5 text-destructive" />}
                      </div>
                      <div>
                        <p className="font-medium">{notification.recipient}</p>
                        <p className="text-sm text-muted-foreground">{notification.type} via {notification.channel}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge 
                        variant={
                          notification.status === "delivered" ? "default" : 
                          notification.status === "pending" ? "secondary" : "destructive"
                        }
                        className="capitalize"
                      >
                        {notification.status === "delivered" ? "Entregue" : 
                         notification.status === "pending" ? "Pendente" : "Falhou"}
                      </Badge>
                      <span className="text-sm text-muted-foreground hidden sm:block">{notification.time}</span>
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Templates de Mensagem</h3>
              <p className="text-sm text-muted-foreground">Gerencie seus modelos de notificação</p>
            </div>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Novo Template
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {templates.map((template) => (
              <Card 
                key={template.id}
                className="group border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Sparkles className="h-5 w-5 text-primary" />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {template.channel}
                    </Badge>
                  </div>
                  <h4 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                    {template.name}
                  </h4>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{template.uses} usos</span>
                    <span className="text-emerald-500 font-medium">{template.rate}%</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      </PageContent>
    </PageContainer>
  );
}
