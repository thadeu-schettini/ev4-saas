import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { PageHeader } from "@/components/ui/page-header";
import { PageContainer, PageContent } from "@/components/ui/page-container";
import { cn } from "@/lib/utils";
import {
  MessageSquare,
  Search,
  Send,
  Phone,
  Mail,
  MoreVertical,
  Paperclip,
  Image,
  Smile,
  Bot,
  User,
  Clock,
  CheckCheck,
  Check,
  Star,
  Archive,
  Trash2,
  Tag,
  Filter,
  Settings,
  Sparkles,
  Brain,
  Zap,
  AlertCircle,
  ChevronDown,
  Instagram,
  Facebook,
  Globe,
  ArrowRight,
  RefreshCw,
  Mic,
  Video,
  Calendar,
  FileText,
  Copy,
  RotateCcw,
  UserPlus,
  Ban,
  Forward,
  Reply,
  ChevronRight,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Mock conversations
const conversations = [
  {
    id: 1,
    patient: { name: "Maria Silva", avatar: "", phone: "(11) 99999-1234" },
    channel: "whatsapp",
    lastMessage: "Olá, gostaria de agendar uma consulta",
    timestamp: "10:32",
    unread: 2,
    status: "pending",
    aiActive: true,
    priority: "high"
  },
  {
    id: 2,
    patient: { name: "João Pedro", avatar: "", phone: "(11) 98888-4321" },
    channel: "instagram",
    lastMessage: "Vocês atendem convênio Unimed?",
    timestamp: "09:45",
    unread: 1,
    status: "ai_responding",
    aiActive: true,
    priority: "medium"
  },
  {
    id: 3,
    patient: { name: "Ana Costa", avatar: "", phone: "(11) 97777-5678" },
    channel: "email",
    lastMessage: "Re: Confirmação de consulta",
    timestamp: "Ontem",
    unread: 0,
    status: "resolved",
    aiActive: false,
    priority: "low"
  },
  {
    id: 4,
    patient: { name: "Carlos Lima", avatar: "", phone: "(11) 96666-8765" },
    channel: "whatsapp",
    lastMessage: "Obrigado pela informação!",
    timestamp: "Ontem",
    unread: 0,
    status: "resolved",
    aiActive: true,
    priority: "low"
  },
  {
    id: 5,
    patient: { name: "Fernanda Rocha", avatar: "", phone: "(11) 95555-2345" },
    channel: "facebook",
    lastMessage: "Qual o horário de funcionamento?",
    timestamp: "12/12",
    unread: 1,
    status: "pending",
    aiActive: true,
    priority: "medium"
  },
];

// Mock messages for selected conversation
const messages = [
  {
    id: 1,
    sender: "patient",
    content: "Olá, boa tarde!",
    timestamp: "10:28",
    status: "read"
  },
  {
    id: 2,
    sender: "ai",
    content: "Olá! 👋 Bem-vindo(a) à Clínica MedClinic! Sou a assistente virtual e estou aqui para ajudar. Como posso auxiliá-lo(a) hoje?",
    timestamp: "10:28",
    status: "read",
    isAI: true
  },
  {
    id: 3,
    sender: "patient",
    content: "Gostaria de agendar uma consulta com cardiologista",
    timestamp: "10:30",
    status: "read"
  },
  {
    id: 4,
    sender: "ai",
    content: "Perfeito! 🩺 Temos excelentes cardiologistas disponíveis. Para agendar sua consulta, preciso de algumas informações:\n\n1. Qual sua preferência de dia e horário?\n2. É a primeira consulta ou retorno?\n3. Possui convênio médico?\n\nPosso verificar a agenda assim que me informar!",
    timestamp: "10:30",
    status: "read",
    isAI: true
  },
  {
    id: 5,
    sender: "patient",
    content: "Prefiro na próxima segunda-feira pela manhã. É primeira consulta e tenho Unimed",
    timestamp: "10:32",
    status: "read"
  },
];

// AI suggested responses
const suggestedResponses = [
  "Ótimo! Tenho disponibilidade na segunda às 9h ou 10h30. Qual horário prefere?",
  "Vou verificar a agenda e já retorno com as opções disponíveis.",
  "Para primeira consulta com Unimed, por favor tenha em mãos sua carteirinha e documento com foto.",
];

// Quick actions
const quickActions = [
  { icon: Calendar, label: "Agendar", color: "text-blue-500" },
  { icon: FileText, label: "Enviar Docs", color: "text-emerald-500" },
  { icon: UserPlus, label: "Criar Paciente", color: "text-purple-500" },
  { icon: Forward, label: "Transferir", color: "text-amber-500" },
];

// Channel icons
const channelIcons = {
  whatsapp: MessageSquare,
  instagram: Instagram,
  facebook: Facebook,
  email: Mail,
  site: Globe,
};

const channelColors = {
  whatsapp: "text-emerald-500 bg-emerald-500/10",
  instagram: "text-pink-500 bg-pink-500/10",
  facebook: "text-blue-500 bg-blue-500/10",
  email: "text-amber-500 bg-amber-500/10",
  site: "text-purple-500 bg-purple-500/10",
};

export default function Chat() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [messageInput, setMessageInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [autopilotEnabled, setAutopilotEnabled] = useState(true);
  const [showAISuggestions, setShowAISuggestions] = useState(true);

  const getChannelIcon = (channel: string) => {
    const Icon = channelIcons[channel as keyof typeof channelIcons] || MessageSquare;
    return Icon;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="text-amber-600 border-amber-500/30 bg-amber-500/10 text-xs">Pendente</Badge>;
      case "ai_responding":
        return <Badge variant="outline" className="text-purple-600 border-purple-500/30 bg-purple-500/10 gap-1 text-xs"><Bot className="h-3 w-3" />IA</Badge>;
      case "resolved":
        return <Badge variant="outline" className="text-emerald-600 border-emerald-500/30 bg-emerald-500/10 text-xs">Resolvido</Badge>;
      default:
        return null;
    }
  };

  return (
    <PageContainer>
      <PageHeader
        icon={MessageSquare}
        iconGradient="from-emerald-500 to-teal-600"
        title="Central de Mensagens"
        description="Gerencie todas as conversas de WhatsApp, e-mail e redes sociais"
        actions={
          <>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
              <Brain className="h-4 w-4 text-purple-500" />
              <span className="text-sm font-medium">Autopilot</span>
              <Switch checked={autopilotEnabled} onCheckedChange={setAutopilotEnabled} />
            </div>
            <Button variant="outline" className="gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Configurar</span>
            </Button>
          </>
        }
      />

      <PageContent>
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <Card className="group relative overflow-hidden border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-50" />
            <CardContent className="p-4 relative">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg group-hover:scale-110 transition-transform">
                  <MessageSquare className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Total Hoje</p>
                  <p className="text-2xl font-bold">48</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="group relative overflow-hidden border-amber-500/20 hover:border-amber-500/40 transition-all duration-300 hover:shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-amber-500/10 opacity-50" />
            <CardContent className="p-4 relative">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 shadow-lg group-hover:scale-110 transition-transform">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Pendentes</p>
                  <p className="text-2xl font-bold text-amber-600">5</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="group relative overflow-hidden border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-purple-500/10 opacity-50" />
            <CardContent className="p-4 relative">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg group-hover:scale-110 transition-transform">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Resolvidas IA</p>
                  <p className="text-2xl font-bold text-purple-600">32</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="group relative overflow-hidden border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 hover:shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-emerald-500/10 opacity-50" />
            <CardContent className="p-4 relative">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg group-hover:scale-110 transition-transform">
                  <CheckCheck className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Taxa Resposta</p>
                  <p className="text-2xl font-bold text-emerald-600">98%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="group relative overflow-hidden border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-500/10 opacity-50" />
            <CardContent className="p-4 relative">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg group-hover:scale-110 transition-transform">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Tempo Médio</p>
                  <p className="text-2xl font-bold text-blue-600">2.5min</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Chat Interface */}
        <Card className="flex flex-col lg:flex-row h-[calc(100vh-380px)] min-h-[500px] overflow-hidden border-border/50 shadow-xl bg-card/50 backdrop-blur-sm">
          {/* Conversations List */}
          <div className="w-full lg:w-[380px] border-b lg:border-b-0 lg:border-r flex flex-col bg-gradient-to-b from-muted/30 to-muted/10">
            {/* Search & Filters Header */}
            <div className="p-4 border-b bg-gradient-to-r from-emerald-500/5 via-teal-500/5 to-cyan-500/5 space-y-3">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  placeholder="Buscar conversas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 bg-background/80 backdrop-blur-sm border-border/50 focus:border-primary/50 transition-all"
                />
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="flex-1 gap-1.5 text-xs h-9 bg-background/50 hover:bg-background border-border/50">
                  <Filter className="h-3.5 w-3.5" />
                  Filtros
                </Button>
                <Tabs defaultValue="all" className="flex-1">
                  <TabsList className="h-9 w-full bg-background/50 backdrop-blur-sm p-1">
                    <TabsTrigger value="all" className="text-xs flex-1 h-7 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Todos</TabsTrigger>
                    <TabsTrigger value="unread" className="text-xs flex-1 h-7 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Não lidos</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>

            {/* Channel Filter Pills */}
            <div className="px-4 py-3 border-b flex items-center gap-2 overflow-x-auto bg-background/30 backdrop-blur-sm">
              <Badge 
                variant="secondary" 
                className="cursor-pointer shrink-0 px-4 py-1.5 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
              >
                Todos
              </Badge>
              {Object.entries(channelColors).slice(0, 4).map(([channel, color]) => {
                const Icon = channelIcons[channel as keyof typeof channelIcons];
                return (
                  <Badge 
                    key={channel}
                    variant="outline" 
                    className={cn(
                      "cursor-pointer shrink-0 gap-1.5 px-4 py-1.5 hover:scale-105 transition-all",
                      color
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span className="capitalize">{channel}</span>
                  </Badge>
                );
              })}
            </div>

            {/* Conversations */}
            <ScrollArea className="flex-1">
              <div className="p-3 space-y-2">
                {conversations.map((conv) => {
                  const ChannelIcon = getChannelIcon(conv.channel);
                  const isSelected = selectedConversation?.id === conv.id;
                  
                  return (
                    <div
                      key={conv.id}
                      onClick={() => setSelectedConversation(conv)}
                      className={cn(
                        "p-4 rounded-2xl cursor-pointer transition-all duration-300 relative overflow-hidden group",
                        isSelected 
                          ? "bg-gradient-to-r from-primary/15 to-primary/5 border-2 border-primary/40 shadow-lg shadow-primary/10" 
                          : "hover:bg-gradient-to-r hover:from-muted/80 hover:to-muted/40 border-2 border-transparent hover:border-border/50"
                      )}
                    >
                      {/* Hover Glow Effect */}
                      <div className={cn(
                        "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none",
                        "bg-gradient-to-r from-primary/5 via-transparent to-transparent"
                      )} />
                      
                      <div className="flex items-start gap-3 relative">
                        <div className="relative">
                          <Avatar className={cn(
                            "h-12 w-12 ring-2 shadow-md transition-all",
                            isSelected ? "ring-primary/50" : "ring-background"
                          )}>
                            <AvatarImage src={conv.patient.avatar} />
                            <AvatarFallback className="bg-gradient-to-br from-primary/30 to-primary/10 text-primary font-semibold">
                              {conv.patient.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className={cn(
                            "absolute -bottom-0.5 -right-0.5 p-1.5 rounded-full border-2 border-background shadow-sm",
                            channelColors[conv.channel as keyof typeof channelColors]
                          )}>
                            <ChannelIcon className="h-3 w-3" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1.5">
                            <h4 className={cn(
                              "font-semibold text-sm truncate transition-colors",
                              isSelected && "text-primary"
                            )}>{conv.patient.name}</h4>
                            <span className="text-xs text-muted-foreground font-medium">{conv.timestamp}</span>
                          </div>
                          <p className="text-xs text-muted-foreground truncate mb-2.5 leading-relaxed">{conv.lastMessage}</p>
                          <div className="flex items-center gap-2 flex-wrap">
                            {conv.unread > 0 && (
                              <Badge className="h-5 min-w-5 px-2 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-xs font-bold shadow-sm">
                                {conv.unread}
                              </Badge>
                            )}
                            {conv.aiActive && (
                              <Badge variant="outline" className="text-purple-600 border-purple-500/40 bg-purple-500/10 gap-1 text-xs py-0.5 px-2">
                                <Sparkles className="h-2.5 w-2.5" />
                                IA
                              </Badge>
                            )}
                            {conv.priority === "high" && (
                              <Badge variant="outline" className="text-red-600 border-red-500/40 bg-red-500/10 text-xs py-0.5 px-2 animate-pulse">
                                Urgente
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col min-w-0 bg-gradient-to-b from-background to-muted/10">
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b flex items-center justify-between bg-gradient-to-r from-background via-background to-muted/20 backdrop-blur-sm">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Avatar className="h-12 w-12 ring-2 ring-primary/20 shadow-lg">
                        <AvatarImage src={selectedConversation.patient.avatar} />
                        <AvatarFallback className="bg-gradient-to-br from-primary/30 to-primary/10 text-primary font-semibold">
                          {selectedConversation.patient.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-background" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-lg">{selectedConversation.patient.name}</h3>
                        {getStatusBadge(selectedConversation.status)}
                      </div>
                      <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                        <Phone className="h-3 w-3" />
                        {selectedConversation.patient.phone}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-9 w-9">
                            <Phone className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Ligar</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-9 w-9">
                            <Video className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Videochamada</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-9 w-9">
                            <Star className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Favoritar</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-9 w-9">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem className="gap-2">
                          <User className="h-4 w-4" />
                          Ver perfil
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <Tag className="h-4 w-4" />
                          Adicionar tag
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <Forward className="h-4 w-4" />
                          Transferir atendimento
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <Archive className="h-4 w-4" />
                          Arquivar
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2 text-destructive">
                          <Ban className="h-4 w-4" />
                          Bloquear
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Quick Actions Bar */}
                <div className="px-4 py-3 border-b flex items-center justify-between bg-gradient-to-r from-muted/40 via-muted/20 to-transparent backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    {quickActions.map((action) => (
                      <TooltipProvider key={action.label}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className={cn(
                                "gap-1.5 h-9 px-3 border-border/50 bg-background/50 hover:bg-background hover:scale-105 transition-all shadow-sm",
                                action.color
                              )}
                            >
                              <action.icon className="h-4 w-4" />
                              <span className="hidden sm:inline text-xs font-medium">{action.label}</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>{action.label}</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 shadow-sm">
                      <Brain className="h-4 w-4 text-purple-500" />
                      <span className="text-xs font-semibold text-purple-600">IA Ativa</span>
                      <Switch 
                        checked={selectedConversation.aiActive} 
                        className="scale-75 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-500 data-[state=checked]:to-pink-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <ScrollArea className="flex-1 p-4 bg-gradient-to-b from-transparent to-muted/5">
                  <div className="space-y-4 max-w-3xl mx-auto">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={cn(
                          "flex gap-3 group animate-fade-in",
                          msg.sender === "patient" ? "justify-start" : "justify-end"
                        )}
                      >
                        {msg.sender === "patient" && (
                          <Avatar className="h-9 w-9 mt-1 ring-2 ring-background shadow-sm">
                            <AvatarFallback className="bg-gradient-to-br from-muted to-muted/50 text-xs font-semibold">MS</AvatarFallback>
                          </Avatar>
                        )}
                        <div className={cn(
                          "max-w-[70%] relative",
                          msg.sender === "patient" ? "order-2" : "order-1"
                        )}>
                          <div className={cn(
                            "p-4 rounded-2xl shadow-md transition-all hover:shadow-lg",
                            msg.sender === "patient" 
                              ? "bg-muted/90 backdrop-blur-sm rounded-tl-md border border-border/50" 
                              : msg.isAI 
                                ? "bg-gradient-to-br from-purple-500/15 via-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-tr-md shadow-purple-500/10"
                                : "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-tr-md shadow-primary/20"
                          )}>
                            {msg.isAI && (
                              <div className="flex items-center gap-1.5 mb-2 text-xs text-purple-600 font-semibold">
                                <Sparkles className="h-3.5 w-3.5" />
                                <span>Resposta da IA</span>
                              </div>
                            )}
                            <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                          </div>
                          <div className={cn(
                            "flex items-center gap-2 mt-2 text-xs text-muted-foreground",
                            msg.sender === "patient" ? "justify-start" : "justify-end"
                          )}>
                            <span className="font-medium">{msg.timestamp}</span>
                            {msg.sender !== "patient" && (
                              msg.status === "read" 
                                ? <CheckCheck className="h-4 w-4 text-blue-500" />
                                : <Check className="h-4 w-4" />
                            )}
                          </div>
                          
                          {/* Message Actions */}
                          <div className={cn(
                            "absolute top-3 opacity-0 group-hover:opacity-100 transition-all flex items-center gap-1 bg-background/90 backdrop-blur-sm rounded-lg p-1 shadow-lg border border-border/50",
                            msg.sender === "patient" ? "right-2" : "left-2"
                          )}>
                            <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-primary/10">
                              <Reply className="h-3.5 w-3.5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-primary/10">
                              <Copy className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>
                        {msg.sender !== "patient" && msg.isAI && (
                          <Avatar className="h-9 w-9 mt-1 order-2 ring-2 ring-purple-500/30 shadow-md">
                            <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                              <Bot className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* AI Suggestions */}
                {showAISuggestions && (
                  <div className="px-4 py-3 border-t bg-gradient-to-r from-purple-500/5 to-pink-500/5">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-purple-500" />
                        <span className="text-xs font-medium text-purple-600">Sugestões da IA</span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 text-xs gap-1"
                        onClick={() => setShowAISuggestions(false)}
                      >
                        Ocultar
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {suggestedResponses.map((response, idx) => (
                        <Button
                          key={idx}
                          variant="outline"
                          size="sm"
                          className="h-auto py-2 px-3 text-xs text-left whitespace-normal max-w-xs border-purple-500/20 hover:bg-purple-500/10 hover:border-purple-500/30"
                          onClick={() => setMessageInput(response)}
                        >
                          {response}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input Area */}
                <div className="p-4 border-t bg-gradient-to-r from-background via-background to-muted/20">
                  <div className="flex items-end gap-3 max-w-4xl mx-auto">
                    <div className="flex items-center gap-1 p-1 rounded-xl bg-muted/30">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-background hover:scale-105 transition-all">
                              <Paperclip className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Anexar arquivo</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-background hover:scale-105 transition-all">
                              <Image className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Enviar imagem</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-background hover:scale-105 transition-all">
                              <Mic className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Gravar áudio</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="flex-1 relative">
                      <Textarea
                        placeholder="Digite sua mensagem..."
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        className="min-h-[48px] max-h-32 resize-none pr-14 rounded-2xl bg-muted/30 border-border/50 focus:border-primary/50 focus:bg-background transition-all shadow-sm"
                        rows={1}
                      />
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 hover:bg-primary/10 hover:scale-110 transition-all"
                      >
                        <Smile className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button className="gap-2 h-12 px-6 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105 transition-all rounded-xl">
                      <Send className="h-4 w-4" />
                      <span className="hidden sm:inline font-semibold">Enviar</span>
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center bg-gradient-to-b from-muted/5 to-muted/20">
                <div className="text-center animate-fade-in">
                  <div className="p-8 rounded-3xl bg-gradient-to-br from-primary/5 to-primary/10 mx-auto mb-6 w-fit shadow-lg border border-primary/10">
                    <MessageSquare className="h-16 w-16 text-primary/50" />
                  </div>
                  <h3 className="font-bold text-xl mb-2">Nenhuma conversa selecionada</h3>
                  <p className="text-muted-foreground max-w-xs">
                    Selecione uma conversa na lista ao lado para começar a atender
                  </p>
                </div>
              </div>
            )}
          </div>
        </Card>
      </PageContent>
    </PageContainer>
  );
}
