import { useState } from "react";
import { 
  Video, 
  Plus, 
  Search, 
  Settings2, 
  Copy, 
  ExternalLink,
  Users,
  Clock,
  Calendar,
  Play,
  Pause,
  PhoneOff,
  Mic,
  MicOff,
  VideoOff,
  Monitor,
  MessageSquare,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Zap,
  TrendingUp,
  Globe,
  Shield,
  Smartphone
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { PageContainer, PageContent } from "@/components/ui/page-container";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const stats = [
  { label: "Salas Ativas", value: 3, icon: Video, change: "Agora", color: "from-emerald-500 to-green-500" },
  { label: "Consultas Hoje", value: 12, icon: Calendar, change: "+4", color: "from-blue-500 to-cyan-500" },
  { label: "Tempo Médio", value: "28 min", icon: Clock, change: "-3 min", color: "from-amber-500 to-orange-500" },
  { label: "Taxa de Sucesso", value: "98.5%", icon: TrendingUp, change: "+0.5%", color: "from-violet-500 to-purple-500" },
];

const activeSessions = [
  { 
    id: "73ff07dc-d5bb-46a0-9f4b-fc6cd543fafe",
    patient: "Maria Silva Santos",
    professional: "Dr. Ricardo Carvalho",
    startTime: "10:03",
    duration: "25 min",
    participants: 2,
    status: "active",
    recording: true
  },
  { 
    id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    patient: "João Pedro Oliveira",
    professional: "Dra. Ana Paula",
    startTime: "10:15",
    duration: "13 min",
    participants: 2,
    status: "active",
    recording: false
  },
  { 
    id: "x9y8z7w6-v5u4-3210-mnop-qr9876543210",
    patient: "Carlos Eduardo Lima",
    professional: "Dr. Marcos Souza",
    startTime: "10:28",
    duration: "0 min",
    participants: 1,
    status: "waiting",
    recording: false
  },
];

const recentSessions = [
  { patient: "Ana Costa", professional: "Dr. Ricardo", date: "Hoje, 09:30", duration: "32 min", status: "completed" },
  { patient: "Pedro Almeida", professional: "Dra. Ana Paula", date: "Hoje, 08:45", duration: "28 min", status: "completed" },
  { patient: "Fernanda Rocha", professional: "Dr. Marcos", date: "Ontem, 16:00", duration: "45 min", status: "completed" },
  { patient: "Lucas Mendes", professional: "Dr. Ricardo", date: "Ontem, 14:30", duration: "22 min", status: "no-show" },
];

export default function Telemedicina() {
  const [isNewRoomOpen, setIsNewRoomOpen] = useState(false);
  const [patientSearch, setPatientSearch] = useState("");
  const [professionalSearch, setProfessionalSearch] = useState("");
  const [enableRecording, setEnableRecording] = useState(false);
  const [createdRoom, setCreatedRoom] = useState<{ id: string; patientLink: string; professionalLink: string } | null>(null);

  const createRoom = () => {
    const roomId = crypto.randomUUID().slice(0, 8);
    setCreatedRoom({
      id: roomId,
      patientLink: `https://meet.medclinic.com/p/${roomId}`,
      professionalLink: `https://meet.medclinic.com/d/${roomId}`
    });
    toast({
      title: "Sala criada com sucesso!",
      description: "Os links foram gerados e estão prontos para compartilhar.",
    });
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Link copiado!",
      description: `Link do ${type} copiado para a área de transferência.`,
    });
  };

  return (
    <PageContainer>
      <PageHeader
        icon={Video}
        iconGradient="from-emerald-500 to-teal-500"
        title="Telemedicina"
        description="Gerencie consultas online e salas de videoconferência"
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Settings2 className="h-4 w-4" />
              Configurações
            </Button>
            <Dialog open={isNewRoomOpen} onOpenChange={(open) => {
              setIsNewRoomOpen(open);
              if (!open) setCreatedRoom(null);
            }}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Criar Sala
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-xl">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Video className="h-5 w-5 text-emerald-500" />
                    {createdRoom ? "Sala Criada" : "Nova Sala de Telemedicina"}
                  </DialogTitle>
                </DialogHeader>

                {!createdRoom ? (
                  <div className="space-y-6 py-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Paciente</Label>
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input 
                            placeholder="Buscar por nome ou ID" 
                            className="pl-9"
                            value={patientSearch}
                            onChange={(e) => setPatientSearch(e.target.value)}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">ou informe um ID manualmente</p>
                      </div>
                      <div className="space-y-2">
                        <Label>Profissional (opcional)</Label>
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input 
                            placeholder="Buscar por nome ou CRM" 
                            className="pl-9"
                            value={professionalSearch}
                            onChange={(e) => setProfessionalSearch(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-red-500/10">
                          <Video className="h-5 w-5 text-red-500" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">Ativar gravação</p>
                          <p className="text-xs text-muted-foreground">Gravar a consulta para registro</p>
                        </div>
                      </div>
                      <Switch checked={enableRecording} onCheckedChange={setEnableRecording} />
                    </div>

                    <Button className="w-full gap-2" onClick={createRoom}>
                      <Zap className="h-4 w-4" />
                      Criar Sala
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6 py-4">
                    <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                      <div>
                        <p className="font-medium text-sm">Sala criada com sucesso!</p>
                        <p className="text-xs text-muted-foreground">ID: {createdRoom.id}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground uppercase tracking-wider">
                          Link do Paciente
                        </Label>
                        <div className="flex gap-2">
                          <Input value={createdRoom.patientLink} readOnly className="font-mono text-sm" />
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => copyToClipboard(createdRoom.patientLink, "paciente")}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground uppercase tracking-wider">
                          Link do Profissional
                        </Label>
                        <div className="flex gap-2">
                          <Input value={createdRoom.professionalLink} readOnly className="font-mono text-sm" />
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => copyToClipboard(createdRoom.professionalLink, "profissional")}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3">
                      <Button variant="outline" className="gap-2">
                        <Smartphone className="h-4 w-4" />
                        Enviar via WhatsApp
                      </Button>
                      <Button className="gap-2" onClick={() => setIsNewRoomOpen(false)}>
                        <ExternalLink className="h-4 w-4" />
                        Entrar na Sala
                      </Button>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </div>
        }
      />

      <PageContent>
        {/* Provider Status */}
        <Card className="border-border/50 overflow-hidden relative">
        <CardContent className="p-4 relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-500 shadow-lg">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-background animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">Status do Provedor</h3>
                  <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                    Online
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Servidor de videoconferência operando normalmente
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Shield className="h-4 w-4" />
                Diagnóstico
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Atualizar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="group relative overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
            <div className={cn("absolute inset-0 opacity-5 bg-gradient-to-br", stat.color)} />
            <CardContent className="p-4 relative">
              <div className="flex items-start justify-between mb-3">
                <div className={cn("p-2.5 rounded-xl bg-gradient-to-br shadow-lg", stat.color)}>
                  <stat.icon className="h-5 w-5 text-white" />
                </div>
                <Badge variant="secondary" className="text-xs font-medium text-emerald-600">
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
      <Tabs defaultValue="active" className="space-y-6">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="active" className="gap-2">
            <Video className="h-4 w-4" />
            Salas Ativas
            <Badge variant="secondary" className="ml-1">{activeSessions.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="history" className="gap-2">
            <Clock className="h-4 w-4" />
            Histórico
          </TabsTrigger>
          <TabsTrigger value="settings" className="gap-2">
            <Settings2 className="h-4 w-4" />
            Configurações
          </TabsTrigger>
        </TabsList>

        {/* Active Sessions */}
        <TabsContent value="active" className="space-y-4">
          {activeSessions.length > 0 ? (
            <div className="grid gap-4">
              {activeSessions.map((session) => (
                <Card 
                  key={session.id}
                  className={cn(
                    "border-border/50 overflow-hidden transition-all duration-300 hover:shadow-lg",
                    session.status === "active" && "border-emerald-500/30"
                  )}
                >
                  <div className={cn(
                    "absolute inset-0 opacity-5",
                    session.status === "active" ? "bg-gradient-to-r from-emerald-500" : "bg-gradient-to-r from-amber-500"
                  )} />
                  <CardContent className="p-4 relative">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "p-3 rounded-2xl shadow-lg",
                          session.status === "active" 
                            ? "bg-gradient-to-br from-emerald-500 to-green-500" 
                            : "bg-gradient-to-br from-amber-500 to-orange-500"
                        )}>
                          <Video className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{session.patient}</h3>
                            {session.recording && (
                              <Badge className="bg-red-500/10 text-red-500 border-red-500/20 gap-1">
                                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                Gravando
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            com {session.professional}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>Início: {session.startTime}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>{session.participants} participante{session.participants !== 1 ? 's' : ''}</span>
                          </div>
                        </div>

                        <Badge 
                          variant={session.status === "active" ? "default" : "secondary"}
                          className={cn(
                            session.status === "active" && "bg-emerald-500 hover:bg-emerald-600",
                            session.status === "waiting" && "bg-amber-500/10 text-amber-600"
                          )}
                        >
                          {session.status === "active" ? "Em andamento" : "Aguardando"}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="gap-2"
                          onClick={() => copyToClipboard(`https://meet.medclinic.com/p/${session.id.slice(0, 8)}`, "paciente")}
                        >
                          <Copy className="h-4 w-4" />
                          Copiar Link
                        </Button>
                        {session.status === "active" ? (
                          <>
                            <Button variant="outline" size="sm" className="gap-2">
                              <MessageSquare className="h-4 w-4" />
                              Chat
                            </Button>
                            <Button size="sm" className="gap-2 bg-emerald-500 hover:bg-emerald-600">
                              <ExternalLink className="h-4 w-4" />
                              Entrar
                            </Button>
                            <Button variant="destructive" size="sm" className="gap-2">
                              <PhoneOff className="h-4 w-4" />
                              Encerrar
                            </Button>
                          </>
                        ) : (
                          <Button size="sm" className="gap-2">
                            <Play className="h-4 w-4" />
                            Iniciar
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-border/50">
              <CardContent className="p-12 text-center">
                <div className="p-4 rounded-2xl bg-muted/50 w-fit mx-auto mb-4">
                  <Video className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Nenhuma sala ativa</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Crie uma nova sala para iniciar uma consulta online
                </p>
                <Button onClick={() => setIsNewRoomOpen(true)} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Criar Sala
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* History */}
        <TabsContent value="history">
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <CardTitle className="text-lg font-semibold">Histórico de Consultas</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Buscar..." className="pl-9 w-[200px]" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Paciente</TableHead>
                    <TableHead>Profissional</TableHead>
                    <TableHead>Data/Hora</TableHead>
                    <TableHead>Duração</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentSessions.map((session, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-medium">{session.patient}</TableCell>
                      <TableCell>{session.professional}</TableCell>
                      <TableCell>{session.date}</TableCell>
                      <TableCell>{session.duration}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={session.status === "completed" ? "default" : "destructive"}
                          className={session.status === "completed" ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : ""}
                        >
                          {session.status === "completed" ? "Realizada" : "Não compareceu"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Ver detalhes
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings */}
        <TabsContent value="settings" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Video className="h-5 w-5 text-primary" />
                  Configurações de Vídeo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                  <div>
                    <p className="font-medium text-sm">Qualidade HD</p>
                    <p className="text-xs text-muted-foreground">Transmitir em alta definição</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                  <div>
                    <p className="font-medium text-sm">Gravação Automática</p>
                    <p className="text-xs text-muted-foreground">Gravar todas as consultas</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                  <div>
                    <p className="font-medium text-sm">Transcrição Automática</p>
                    <p className="text-xs text-muted-foreground">Gerar texto das consultas</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Segurança e Privacidade
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                  <div>
                    <p className="font-medium text-sm">Criptografia E2E</p>
                    <p className="text-xs text-muted-foreground">Proteção ponta a ponta</p>
                  </div>
                  <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                    Ativo
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                  <div>
                    <p className="font-medium text-sm">Sala de Espera</p>
                    <p className="text-xs text-muted-foreground">Aprovar entrada de pacientes</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                  <div>
                    <p className="font-medium text-sm">Links Temporários</p>
                    <p className="text-xs text-muted-foreground">Links expiram após 24h</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      </PageContent>
    </PageContainer>
  );
}
