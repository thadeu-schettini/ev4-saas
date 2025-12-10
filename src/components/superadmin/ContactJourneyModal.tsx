import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  User,
  Building2,
  Phone,
  Mail,
  MapPin,
  Globe,
  Calendar,
  Clock,
  Target,
  TrendingUp,
  Eye,
  Plus,
  Sparkles,
  DollarSign,
  MessageSquare,
  Link,
  FileText,
  History,
  Edit,
  Save,
  ChevronRight,
  Play,
  PhoneCall,
  Video,
  Send,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Star,
  Layers,
  ArrowRight,
  ExternalLink,
  Download,
  MoreVertical,
} from "lucide-react";

interface ContactJourneyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contact: any;
  onLinkToClient?: () => void;
}

const mockTimeline = [
  {
    id: 1,
    type: "stage_change",
    title: "Mudou para Proposta",
    description: "Lead avançou no funil",
    date: "Hoje, 14:30",
    icon: ArrowRight,
    color: "text-success",
  },
  {
    id: 2,
    type: "call",
    title: "Ligação realizada",
    description: "Duração: 15min | Ana Silva ligou e apresentou proposta comercial. Cliente mostrou interesse no plano Business.",
    date: "Hoje, 14:00",
    icon: PhoneCall,
    color: "text-info",
  },
  {
    id: 3,
    type: "email",
    title: "E-mail enviado",
    description: "Proposta comercial enviada para análise",
    date: "Hoje, 13:45",
    icon: Mail,
    color: "text-primary",
  },
  {
    id: 4,
    type: "meeting",
    title: "Demo realizada",
    description: "Apresentação do sistema via Google Meet. Participantes: Dr. Roberto, Ana Silva. Demo completa de 45min.",
    date: "Ontem, 15:00",
    icon: Video,
    color: "text-warning",
  },
  {
    id: 5,
    type: "note",
    title: "Observação adicionada",
    description: "Cliente mencionou que já usa sistema concorrente e está avaliando migração. Principal dor: falta de integração com lab.",
    date: "Ontem, 10:30",
    icon: FileText,
    color: "text-muted-foreground",
  },
  {
    id: 6,
    type: "stage_change",
    title: "Mudou para Qualificação",
    description: "Lead qualificado após primeiro contato",
    date: "3 dias atrás",
    icon: ArrowRight,
    color: "text-primary",
  },
  {
    id: 7,
    type: "form",
    title: "Formulário preenchido",
    description: "Lead preencheu formulário de interesse no site",
    date: "5 dias atrás",
    icon: FileText,
    color: "text-info",
  },
  {
    id: 8,
    type: "source",
    title: "Origem: Google Ads",
    description: "Primeiro contato via campanha 'Gestão Clínicas 2024'",
    date: "5 dias atrás",
    icon: Sparkles,
    color: "text-success",
  },
];

const mockInsights = {
  score: 82,
  probability: 75,
  estimatedValue: 299,
  daysInPipeline: 5,
  touchpoints: 8,
  avgResponseTime: "2h",
  engagement: "Alto",
  nextBestAction: "Enviar proposta personalizada",
};

export function ContactJourneyModal({ 
  open, 
  onOpenChange,
  contact,
  onLinkToClient
}: ContactJourneyModalProps) {
  const [activeTab, setActiveTab] = useState("journey");
  const [newNote, setNewNote] = useState("");

  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-success";
    if (score >= 50) return "text-warning";
    return "text-destructive";
  };

  if (!contact) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        {/* Header with Contact Info */}
        <div className="p-6 border-b bg-gradient-to-r from-primary/5 to-transparent">
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16 border-2 border-primary/30">
              <AvatarFallback className="bg-gradient-to-br from-primary/30 to-primary/10 text-primary text-xl font-bold">
                {contact.name?.split(' ').map((n: string) => n[0]).join('').slice(0, 2) || "??"}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-xl font-bold">{contact.name}</h2>
                <Badge className={cn(
                  "text-xs",
                  contact.type === "client" 
                    ? "bg-success/10 text-success border-success/30"
                    : "bg-primary/10 text-primary border-primary/30"
                )}>
                  {contact.type === "client" ? "Cliente" : contact.stage || "Lead"}
                </Badge>
                {contact.score && (
                  <div className={cn(
                    "px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1",
                    getScoreColor(contact.score),
                    "bg-current/10"
                  )}>
                    <Target className="h-4 w-4" />
                    {contact.score}
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  {contact.email}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  {contact.phone}
                </span>
                {contact.company && (
                  <span className="flex items-center gap-1">
                    <Building2 className="h-4 w-4" />
                    {contact.company}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 mt-3">
                <Button size="sm" className="gap-1">
                  <PhoneCall className="h-4 w-4" />
                  Ligar
                </Button>
                <Button size="sm" variant="outline" className="gap-1">
                  <Mail className="h-4 w-4" />
                  Email
                </Button>
                <Button size="sm" variant="outline" className="gap-1">
                  <MessageSquare className="h-4 w-4" />
                  WhatsApp
                </Button>
                {contact.type === "lead" && (
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="gap-1 ml-auto"
                    onClick={onLinkToClient}
                  >
                    <Link className="h-4 w-4" />
                    Vincular a Cliente
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
          <div className="px-6 border-b">
            <TabsList className="h-12 bg-transparent p-0 gap-6">
              <TabsTrigger 
                value="journey" 
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0"
              >
                <History className="h-4 w-4 mr-2" />
                Jornada
              </TabsTrigger>
              <TabsTrigger 
                value="insights" 
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Insights
              </TabsTrigger>
              <TabsTrigger 
                value="notes" 
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0"
              >
                <FileText className="h-4 w-4 mr-2" />
                Notas
              </TabsTrigger>
              <TabsTrigger 
                value="activity" 
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0"
              >
                <Layers className="h-4 w-4 mr-2" />
                Atividades
              </TabsTrigger>
            </TabsList>
          </div>

          <ScrollArea className="h-[450px]">
            <TabsContent value="journey" className="p-6 m-0">
              <div className="space-y-1">
                {mockTimeline.map((event, index) => (
                  <div key={event.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center",
                        event.color,
                        "bg-current/10"
                      )}>
                        <event.icon className="h-5 w-5" />
                      </div>
                      {index < mockTimeline.length - 1 && (
                        <div className="w-0.5 flex-1 bg-border my-2" />
                      )}
                    </div>
                    <div className="flex-1 pb-6">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-sm">{event.title}</h4>
                        <span className="text-xs text-muted-foreground">{event.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="insights" className="p-6 m-0">
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Lead Score */}
                <div className="p-4 rounded-xl border bg-card">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Target className="h-4 w-4 text-primary" />
                      Lead Score
                    </h4>
                    <span className={cn("text-3xl font-bold", getScoreColor(mockInsights.score))}>
                      {mockInsights.score}
                    </span>
                  </div>
                  <Progress value={mockInsights.score} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-2">
                    Baseado em engajamento, perfil e comportamento
                  </p>
                </div>

                {/* Conversion Probability */}
                <div className="p-4 rounded-xl border bg-card">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-success" />
                      Probabilidade
                    </h4>
                    <span className="text-3xl font-bold text-success">{mockInsights.probability}%</span>
                  </div>
                  <Progress value={mockInsights.probability} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-2">
                    Chance de conversão prevista por IA
                  </p>
                </div>

                {/* Quick Stats */}
                <div className="sm:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 rounded-lg bg-muted/50 text-center">
                    <p className="text-2xl font-bold text-primary">R$ {mockInsights.estimatedValue}</p>
                    <p className="text-xs text-muted-foreground">Valor Estimado/mês</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50 text-center">
                    <p className="text-2xl font-bold text-info">{mockInsights.daysInPipeline}</p>
                    <p className="text-xs text-muted-foreground">Dias no Pipeline</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50 text-center">
                    <p className="text-2xl font-bold text-warning">{mockInsights.touchpoints}</p>
                    <p className="text-xs text-muted-foreground">Touchpoints</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50 text-center">
                    <p className="text-2xl font-bold text-success">{mockInsights.avgResponseTime}</p>
                    <p className="text-xs text-muted-foreground">Tempo Resp. Médio</p>
                  </div>
                </div>

                {/* Next Best Action */}
                <div className="sm:col-span-2 p-4 rounded-xl border-2 border-primary/30 bg-primary/5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Sparkles className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">Próxima Melhor Ação (IA)</h4>
                      <p className="text-sm text-muted-foreground">{mockInsights.nextBestAction}</p>
                    </div>
                    <Button size="sm" className="gap-1">
                      <Play className="h-4 w-4" />
                      Executar
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="notes" className="p-6 m-0 space-y-4">
              <div className="space-y-2">
                <Textarea
                  placeholder="Adicionar nova observação..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="min-h-[100px]"
                />
                <div className="flex justify-end">
                  <Button size="sm" className="gap-1" disabled={!newNote.trim()}>
                    <Plus className="h-4 w-4" />
                    Adicionar Nota
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                {[
                  { author: "Ana Silva", date: "Hoje, 14:00", text: "Cliente mostrou interesse no plano Business. Pediu proposta personalizada." },
                  { author: "Carlos Santos", date: "Ontem, 10:30", text: "Cliente mencionou que já usa sistema concorrente e está avaliando migração. Principal dor: falta de integração com lab." },
                  { author: "Sistema", date: "3 dias atrás", text: "Lead qualificado automaticamente baseado em score > 70." },
                ].map((note, i) => (
                  <div key={i} className="p-4 rounded-lg border bg-card">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{note.author}</span>
                      <span className="text-xs text-muted-foreground">{note.date}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{note.text}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="activity" className="p-6 m-0">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Próximas Atividades</h4>
                  <Button size="sm" variant="outline" className="gap-1">
                    <Plus className="h-4 w-4" />
                    Agendar
                  </Button>
                </div>

                <div className="space-y-3">
                  {[
                    { type: "call", title: "Follow-up proposta", date: "Amanhã, 10:00", assignee: "Ana Silva", status: "pending" },
                    { type: "email", title: "Enviar materiais complementares", date: "Amanhã, 14:00", assignee: "Carlos Santos", status: "pending" },
                  ].map((activity, i) => (
                    <div key={i} className="p-4 rounded-lg border bg-card flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        {activity.type === "call" ? <PhoneCall className="h-5 w-5 text-primary" /> : <Mail className="h-5 w-5 text-primary" />}
                      </div>
                      <div className="flex-1">
                        <h5 className="font-medium text-sm">{activity.title}</h5>
                        <p className="text-xs text-muted-foreground">{activity.date} • {activity.assignee}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <CheckCircle2 className="h-4 w-4 text-success" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                <h4 className="font-semibold">Atividades Concluídas</h4>
                <div className="space-y-2">
                  {[
                    { type: "meeting", title: "Demo realizada", date: "Ontem", status: "completed" },
                    { type: "call", title: "Primeira ligação", date: "3 dias atrás", status: "completed" },
                  ].map((activity, i) => (
                    <div key={i} className="p-3 rounded-lg bg-muted/30 flex items-center gap-3 opacity-70">
                      <CheckCircle2 className="h-5 w-5 text-success" />
                      <div className="flex-1">
                        <span className="text-sm line-through">{activity.title}</span>
                        <span className="text-xs text-muted-foreground ml-2">{activity.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
