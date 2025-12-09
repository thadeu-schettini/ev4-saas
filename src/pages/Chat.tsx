import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import {
  MessageSquare,
  Search,
  Send,
  Phone,
  MoreVertical,
  Paperclip,
  Smile,
  Bot,
  CheckCheck,
  Star,
  Settings,
  Mic,
  Video,
  Calendar,
  FileText,
  UserPlus,
  Forward,
  Menu,
  ArrowLeft,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  },
  {
    id: 2,
    patient: { name: "João Pedro", avatar: "", phone: "(11) 98888-4321" },
    channel: "whatsapp",
    lastMessage: "Vocês atendem convênio Unimed?",
    timestamp: "09:45",
    unread: 1,
    status: "ai_responding",
  },
  {
    id: 3,
    patient: { name: "Ana Costa", avatar: "", phone: "(11) 97777-5678" },
    channel: "email",
    lastMessage: "Re: Confirmação de consulta",
    timestamp: "Ontem",
    unread: 0,
    status: "resolved",
  },
  {
    id: 4,
    patient: { name: "Carlos Lima", avatar: "", phone: "(11) 96666-8765" },
    channel: "whatsapp",
    lastMessage: "Obrigado pela informação!",
    timestamp: "Ontem",
    unread: 0,
    status: "resolved",
  },
  {
    id: 5,
    patient: { name: "Fernanda Rocha", avatar: "", phone: "(11) 95555-2345" },
    channel: "instagram",
    lastMessage: "Qual o horário de funcionamento?",
    timestamp: "12/12",
    unread: 1,
    status: "pending",
  },
];

// Mock messages
const messages = [
  { id: 1, sender: "patient", content: "Olá, boa tarde!", timestamp: "10:28" },
  { id: 2, sender: "ai", content: "Olá! Bem-vindo(a) à Clínica MedClinic! Como posso ajudá-lo(a)?", timestamp: "10:28", isAI: true },
  { id: 3, sender: "patient", content: "Gostaria de agendar uma consulta com cardiologista", timestamp: "10:30" },
  { id: 4, sender: "ai", content: "Perfeito! Temos cardiologistas disponíveis. Qual sua preferência de dia e horário?", timestamp: "10:30", isAI: true },
  { id: 5, sender: "patient", content: "Prefiro na próxima segunda-feira pela manhã. É primeira consulta e tenho Unimed", timestamp: "10:32" },
];

// AI suggested responses
const suggestedResponses = [
  "Tenho disponibilidade na segunda às 9h ou 10h30.",
  "Vou verificar a agenda e já retorno.",
  "Tenha em mãos sua carteirinha e documento.",
];

export default function Chat() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [messageInput, setMessageInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [autopilotEnabled, setAutopilotEnabled] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [filter, setFilter] = useState("all");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50 dark:bg-amber-950/30 text-[10px]">Pendente</Badge>;
      case "ai_responding":
        return <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5 text-[10px] gap-0.5"><Bot className="h-2.5 w-2.5" />IA</Badge>;
      case "resolved":
        return <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50 dark:bg-emerald-950/30 text-[10px]">Resolvido</Badge>;
      default:
        return null;
    }
  };

  const handleSend = () => {
    if (!messageInput.trim()) return;
    setMessageInput("");
  };

  const handleSelectConversation = (conv: typeof conversations[0]) => {
    setSelectedConversation(conv);
    setShowChat(true);
    setMobileMenuOpen(false);
  };

  // Conversation List Component
  const ConversationList = () => (
    <div className="flex flex-col h-full">
      {/* Search */}
      <div className="p-3 border-b">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 h-8 text-sm"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="px-3 py-2 border-b flex items-center gap-1.5 overflow-x-auto">
        <Button
          variant={filter === "all" ? "default" : "ghost"}
          size="sm"
          className="h-7 text-xs shrink-0"
          onClick={() => setFilter("all")}
        >
          Todos
        </Button>
        <Button
          variant={filter === "unread" ? "default" : "ghost"}
          size="sm"
          className="h-7 text-xs shrink-0"
          onClick={() => setFilter("unread")}
        >
          Não lidos
        </Button>
        <Button
          variant={filter === "pending" ? "default" : "ghost"}
          size="sm"
          className="h-7 text-xs shrink-0"
          onClick={() => setFilter("pending")}
        >
          Pendentes
        </Button>
      </div>

      {/* Conversation List */}
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-0.5">
          {conversations.map((conv) => {
            const isSelected = selectedConversation?.id === conv.id;
            return (
              <div
                key={conv.id}
                onClick={() => handleSelectConversation(conv)}
                className={cn(
                  "p-3 rounded-lg cursor-pointer transition-colors",
                  isSelected ? "bg-primary/10" : "hover:bg-muted/50"
                )}
              >
                <div className="flex items-start gap-2.5">
                  <div className="relative shrink-0">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={conv.patient.avatar} />
                      <AvatarFallback className="text-xs bg-muted">
                        {conv.patient.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    {conv.unread > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                        {conv.unread}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5 gap-2">
                      <span className="font-medium text-sm truncate">{conv.patient.name}</span>
                      <span className="text-[10px] text-muted-foreground shrink-0">{conv.timestamp}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{conv.lastMessage}</p>
                    <div className="mt-1">
                      {getStatusBadge(conv.status)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );

  // Chat Area Component
  const ChatArea = () => (
    <div className="flex-1 flex flex-col h-full min-w-0">
      {/* Conversation Header */}
      <div className="px-2 sm:px-4 py-2 sm:py-3 border-b bg-card flex items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {/* Back button for mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0 lg:hidden"
            onClick={() => setShowChat(false)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Avatar className="h-8 w-8 shrink-0">
            <AvatarFallback className="text-xs bg-muted">
              {selectedConversation.patient.name.split(" ").map(n => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <h2 className="font-medium text-sm truncate">{selectedConversation.patient.name}</h2>
          </div>
          {getStatusBadge(selectedConversation.status)}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem><Phone className="h-4 w-4 mr-2" />Ligar</DropdownMenuItem>
            <DropdownMenuItem><Video className="h-4 w-4 mr-2" />Vídeo</DropdownMenuItem>
            <DropdownMenuItem><Calendar className="h-4 w-4 mr-2" />Agendar</DropdownMenuItem>
            <DropdownMenuItem><FileText className="h-4 w-4 mr-2" />Enviar Docs</DropdownMenuItem>
            <DropdownMenuItem><UserPlus className="h-4 w-4 mr-2" />Criar Paciente</DropdownMenuItem>
            <DropdownMenuItem><Forward className="h-4 w-4 mr-2" />Transferir</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1">
        <div className="p-3 sm:p-4 space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex",
                msg.sender === "patient" ? "justify-start" : "justify-end"
              )}
            >
              <div
                className={cn(
                  "max-w-[80%] px-3 py-2 rounded-lg text-sm",
                  msg.sender === "patient"
                    ? "bg-muted"
                    : "bg-primary text-primary-foreground"
                )}
              >
                {msg.isAI && (
                  <div className="flex items-center gap-1 text-[10px] opacity-70 mb-1">
                    <Bot className="h-3 w-3" />
                    <span>IA</span>
                  </div>
                )}
                <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                <div className={cn(
                  "text-[10px] mt-1 flex items-center gap-1",
                  msg.sender === "patient" ? "text-muted-foreground" : "opacity-70"
                )}>
                  {msg.timestamp}
                  {msg.sender !== "patient" && <CheckCheck className="h-3 w-3" />}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* AI Suggestions */}
      {showSuggestions && (
        <div className="px-3 py-2 border-t bg-muted/30 shrink-0">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Bot className="h-3.5 w-3.5" />
              <span>Sugestões</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => setShowSuggestions(false)}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
          <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-1 px-1">
            {suggestedResponses.map((response, index) => (
              <button
                key={index}
                onClick={() => setMessageInput(response)}
                className="px-2.5 py-1.5 text-xs bg-card border rounded-md hover:bg-muted transition-colors text-left whitespace-nowrap shrink-0"
              >
                {response}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-2 sm:p-3 border-t bg-card shrink-0">
        <div className="flex items-center gap-1.5">
          <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
            <Paperclip className="h-4 w-4" />
          </Button>
          <div className="flex-1 min-w-0">
            <Input
              placeholder="Digite sua mensagem..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="text-sm w-full"
            />
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 hidden sm:flex">
            <Smile className="h-4 w-4" />
          </Button>
          <Button size="icon" className="h-8 w-8 shrink-0" onClick={handleSend}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-background">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b bg-card shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          {/* Mobile menu trigger */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 lg:hidden shrink-0">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              <div className="p-3 border-b flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-primary/10">
                  <MessageSquare className="h-4 w-4 text-primary" />
                </div>
                <span className="font-semibold text-sm">Conversas</span>
              </div>
              <ConversationList />
            </SheetContent>
          </Sheet>
          
          <div className="p-1.5 rounded-lg bg-primary/10 shrink-0">
            <MessageSquare className="h-4 w-4 text-primary" />
          </div>
          <span className="font-semibold text-sm truncate">Mensagens</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-muted/50 border">
            <Bot className="h-3 w-3 text-primary" />
            <Switch checked={autopilotEnabled} onCheckedChange={setAutopilotEnabled} className="scale-75" />
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* Desktop Sidebar */}
        <div className="hidden lg:flex w-72 xl:w-80 border-r flex-col bg-card/50 shrink-0">
          <ConversationList />
        </div>

        {/* Mobile: Show list or chat based on selection */}
        <div className="flex-1 flex flex-col lg:hidden min-w-0">
          {showChat ? (
            <ChatArea />
          ) : (
            <ConversationList />
          )}
        </div>

        {/* Desktop Chat Area */}
        <div className="hidden lg:flex flex-1 flex-col min-w-0">
          <ChatArea />
        </div>
      </div>
    </div>
  );
}
