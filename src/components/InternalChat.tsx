import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MessageCircle,
  X,
  Send,
  ArrowLeft,
  Circle,
  Search,
  Users,
  Clock,
  CheckCheck,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useInternalChat } from "@/hooks/use-internal-chat";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

interface Professional {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  online: boolean;
}

interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantRole: string;
  participantAvatar?: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  online: boolean;
  messages: Message[];
}

// Mock professionals for new conversation
const mockProfessionals: Professional[] = [
  { id: "p1", name: "Ana Recepção", role: "Recepcionista", online: true },
  { id: "p2", name: "Dr. Carlos Mendes", role: "Cardiologista", online: true },
  { id: "p3", name: "Dra. Beatriz Lima", role: "Pediatra", online: false },
  { id: "p4", name: "Enfermeira Paula", role: "Enfermagem", online: true },
  { id: "p5", name: "Dr. Roberto Silva", role: "Ortopedista", online: false },
  { id: "p6", name: "Dra. Mariana Costa", role: "Dermatologista", online: true },
  { id: "p7", name: "Lucas Administrativo", role: "Administrativo", online: true },
  { id: "p8", name: "Fernanda TI", role: "Suporte", online: false },
];

// Mock conversations
const mockConversations: Conversation[] = [
  {
    id: "1",
    participantId: "p1",
    participantName: "Ana Recepção",
    participantRole: "Recepcionista",
    participantAvatar: "",
    lastMessage: "Paciente João Silva chegou para consulta",
    lastMessageTime: new Date(Date.now() - 2 * 60000),
    unreadCount: 2,
    online: true,
    messages: [
      {
        id: "m1",
        senderId: "p1",
        senderName: "Ana Recepção",
        content: "Dr. Carlos, o paciente João Silva chegou",
        timestamp: new Date(Date.now() - 5 * 60000),
        read: true,
      },
      {
        id: "m2",
        senderId: "me",
        senderName: "Você",
        content: "Ok, pode encaminhá-lo para o consultório 2",
        timestamp: new Date(Date.now() - 4 * 60000),
        read: true,
      },
      {
        id: "m3",
        senderId: "p1",
        senderName: "Ana Recepção",
        content: "Paciente João Silva chegou para consulta",
        timestamp: new Date(Date.now() - 2 * 60000),
        read: false,
      },
    ],
  },
  {
    id: "2",
    participantId: "p2",
    participantName: "Dr. Carlos Mendes",
    participantRole: "Cardiologista",
    participantAvatar: "",
    lastMessage: "Preciso do prontuário da paciente Maria",
    lastMessageTime: new Date(Date.now() - 15 * 60000),
    unreadCount: 0,
    online: true,
    messages: [
      {
        id: "m4",
        senderId: "p2",
        senderName: "Dr. Carlos Mendes",
        content: "Preciso do prontuário da paciente Maria",
        timestamp: new Date(Date.now() - 15 * 60000),
        read: true,
      },
    ],
  },
  {
    id: "3",
    participantId: "p3",
    participantName: "Dra. Beatriz Lima",
    participantRole: "Pediatra",
    participantAvatar: "",
    lastMessage: "A sala 3 já está disponível?",
    lastMessageTime: new Date(Date.now() - 60 * 60000),
    unreadCount: 1,
    online: false,
    messages: [
      {
        id: "m5",
        senderId: "p3",
        senderName: "Dra. Beatriz Lima",
        content: "A sala 3 já está disponível?",
        timestamp: new Date(Date.now() - 60 * 60000),
        read: false,
      },
    ],
  },
  {
    id: "4",
    participantId: "group1",
    participantName: "Equipe Enfermagem",
    participantRole: "Grupo",
    participantAvatar: "",
    lastMessage: "Materiais repostos no consultório 1",
    lastMessageTime: new Date(Date.now() - 120 * 60000),
    unreadCount: 0,
    online: true,
    messages: [
      {
        id: "m6",
        senderId: "p4",
        senderName: "Enfermeira Paula",
        content: "Materiais repostos no consultório 1",
        timestamp: new Date(Date.now() - 120 * 60000),
        read: true,
      },
    ],
  },
];

function formatTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);

  if (minutes < 1) return "Agora";
  if (minutes < 60) return `${minutes}min`;
  if (hours < 24) return `${hours}h`;
  return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
}

function formatMessageTime(date: Date): string {
  return date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}

type ChatView = "list" | "chat" | "professionals";

// Button component to trigger the chat
export function InternalChatButton() {
  const { toggle } = useInternalChat();
  const totalUnread = mockConversations.reduce((sum, conv) => sum + conv.unreadCount, 0);

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative h-9 w-9 shrink-0"
      onClick={toggle}
    >
      <MessageCircle className="h-4 w-4" />
      {totalUnread > 0 && (
        <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground animate-pulse">
          {totalUnread > 9 ? "9+" : totalUnread}
        </span>
      )}
    </Button>
  );
}

// Panel component (floating)
export function InternalChatPanel() {
  const { isOpen, setIsOpen } = useInternalChat();
  const [view, setView] = useState<ChatView>("list");
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [conversations, setConversations] = useState(mockConversations);

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.participantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredProfessionals = mockProfessionals.filter(
    (prof) =>
      prof.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prof.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const updatedConversations = conversations.map((conv) => {
      if (conv.id === selectedConversation.id) {
        const newMsg: Message = {
          id: `m${Date.now()}`,
          senderId: "me",
          senderName: "Você",
          content: newMessage.trim(),
          timestamp: new Date(),
          read: true,
        };
        return {
          ...conv,
          messages: [...conv.messages, newMsg],
          lastMessage: newMessage.trim(),
          lastMessageTime: new Date(),
        };
      }
      return conv;
    });

    setConversations(updatedConversations);
    setSelectedConversation(
      updatedConversations.find((c) => c.id === selectedConversation.id) || null
    );
    setNewMessage("");
  };

  const handleSelectConversation = (conv: Conversation) => {
    const updatedConversations = conversations.map((c) => {
      if (c.id === conv.id) {
        return {
          ...c,
          unreadCount: 0,
          messages: c.messages.map((m) => ({ ...m, read: true })),
        };
      }
      return c;
    });
    setConversations(updatedConversations);
    setSelectedConversation({ ...conv, unreadCount: 0 });
    setView("chat");
  };

  const handleStartNewChat = (professional: Professional) => {
    const existingConv = conversations.find((c) => c.participantId === professional.id);
    if (existingConv) {
      handleSelectConversation(existingConv);
      return;
    }

    const newConv: Conversation = {
      id: `conv-${Date.now()}`,
      participantId: professional.id,
      participantName: professional.name,
      participantRole: professional.role,
      participantAvatar: professional.avatar,
      lastMessage: "",
      lastMessageTime: new Date(),
      unreadCount: 0,
      online: professional.online,
      messages: [],
    };

    setConversations([newConv, ...conversations]);
    setSelectedConversation(newConv);
    setView("chat");
  };

  const handleBack = () => {
    if (view === "chat") {
      setSelectedConversation(null);
      setView("list");
    } else if (view === "professionals") {
      setView("list");
    }
    setSearchQuery("");
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedConversation(null);
    setView("list");
    setSearchQuery("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex h-[520px] w-[380px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border-2 border-primary/20 bg-card shadow-2xl backdrop-blur-xl animate-in slide-in-from-bottom-4 duration-300">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/50 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent px-4 py-3">
        {view === "chat" && selectedConversation ? (
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={handleBack}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="relative">
              <Avatar className="h-9 w-9 border-2 border-background">
                <AvatarImage src={selectedConversation.participantAvatar} />
                <AvatarFallback className="bg-primary/20 text-primary text-xs">
                  {selectedConversation.participantName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              {selectedConversation.online && (
                <Circle className="absolute bottom-0 right-0 h-3 w-3 fill-emerald-500 text-emerald-500" />
              )}
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-sm truncate">
                {selectedConversation.participantName}
              </h3>
              <p className="text-xs text-muted-foreground">
                {selectedConversation.online ? "Online" : "Offline"}
              </p>
            </div>
          </div>
        ) : view === "professionals" ? (
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={handleBack}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h3 className="font-semibold text-sm">Nova Conversa</h3>
              <p className="text-xs text-muted-foreground">Selecione um profissional</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/70">
              <Users className="h-4 w-4 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">Chat Interno</h3>
              <p className="text-xs text-muted-foreground">Equipe da clínica</p>
            </div>
          </div>
        )}
        <div className="flex items-center gap-1">
          {view === "list" && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setView("professionals")}
              title="Nova conversa"
            >
              <Plus className="h-4 w-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full hover:bg-destructive/10 hover:text-destructive"
            onClick={handleClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      {view === "chat" && selectedConversation ? (
        <>
          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="flex flex-col gap-3">
              {selectedConversation.messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <MessageCircle className="h-12 w-12 text-muted-foreground/30 mb-3" />
                  <p className="text-sm text-muted-foreground">
                    Nenhuma mensagem ainda
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Envie a primeira mensagem para {selectedConversation.participantName}
                  </p>
                </div>
              ) : (
                selectedConversation.messages.map((message) => {
                  const isMe = message.senderId === "me";
                  return (
                    <div
                      key={message.id}
                      className={cn(
                        "flex flex-col max-w-[80%] gap-1",
                        isMe ? "self-end items-end" : "self-start items-start"
                      )}
                    >
                      <div
                        className={cn(
                          "rounded-2xl px-4 py-2 text-sm",
                          isMe
                            ? "bg-primary text-primary-foreground rounded-br-md"
                            : "bg-muted rounded-bl-md"
                        )}
                      >
                        {message.content}
                      </div>
                      <div className="flex items-center gap-1.5 px-1">
                        <span className="text-[10px] text-muted-foreground">
                          {formatMessageTime(message.timestamp)}
                        </span>
                        {isMe && (
                          <CheckCheck
                            className={cn(
                              "h-3 w-3",
                              message.read ? "text-primary" : "text-muted-foreground"
                            )}
                          />
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="border-t border-border/50 p-3">
            <div className="flex items-center gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Digite sua mensagem..."
                className="flex-1 rounded-full border-border/50 bg-muted/50 px-4 text-sm"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <Button
                size="icon"
                className="h-9 w-9 rounded-full shrink-0"
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </>
      ) : view === "professionals" ? (
        <>
          {/* Search Professionals */}
          <div className="border-b border-border/50 p-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar profissional..."
                className="pl-9 rounded-full border-border/50 bg-muted/50 text-sm"
              />
            </div>
          </div>

          {/* Professionals List */}
          <ScrollArea className="flex-1">
            <div className="divide-y divide-border/30">
              {filteredProfessionals.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Users className="h-12 w-12 text-muted-foreground/30 mb-3" />
                  <p className="text-sm text-muted-foreground">
                    Nenhum profissional encontrado
                  </p>
                </div>
              ) : (
                filteredProfessionals.map((prof) => (
                  <button
                    key={prof.id}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/50"
                    onClick={() => handleStartNewChat(prof)}
                  >
                    <div className="relative shrink-0">
                      <Avatar className="h-11 w-11 border-2 border-background">
                        <AvatarImage src={prof.avatar} />
                        <AvatarFallback className="bg-primary/20 text-primary text-xs">
                          {prof.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      {prof.online && (
                        <Circle className="absolute bottom-0 right-0 h-3 w-3 fill-emerald-500 text-emerald-500" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="font-medium text-sm truncate block">
                        {prof.name}
                      </span>
                      <p className="text-xs text-muted-foreground">
                        {prof.role}
                      </p>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {prof.online ? (
                        <span className="text-emerald-500">Online</span>
                      ) : (
                        "Offline"
                      )}
                    </div>
                  </button>
                ))
              )}
            </div>
          </ScrollArea>
        </>
      ) : (
        <>
          {/* Search Conversations */}
          <div className="border-b border-border/50 p-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar conversa..."
                className="pl-9 rounded-full border-border/50 bg-muted/50 text-sm"
              />
            </div>
          </div>

          {/* Conversation List */}
          <ScrollArea className="flex-1">
            <div className="divide-y divide-border/30">
              {filteredConversations.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center px-4">
                  <MessageCircle className="h-12 w-12 text-muted-foreground/30 mb-3" />
                  <p className="text-sm text-muted-foreground">
                    Nenhuma conversa encontrada
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4"
                    onClick={() => setView("professionals")}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Iniciar nova conversa
                  </Button>
                </div>
              ) : (
                filteredConversations.map((conv) => (
                  <button
                    key={conv.id}
                    className={cn(
                      "flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/50",
                      conv.unreadCount > 0 && "bg-primary/5"
                    )}
                    onClick={() => handleSelectConversation(conv)}
                  >
                    <div className="relative shrink-0">
                      <Avatar className="h-11 w-11 border-2 border-background">
                        <AvatarImage src={conv.participantAvatar} />
                        <AvatarFallback className="bg-primary/20 text-primary text-xs">
                          {conv.participantRole === "Grupo" ? (
                            <Users className="h-4 w-4" />
                          ) : (
                            conv.participantName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)
                          )}
                        </AvatarFallback>
                      </Avatar>
                      {conv.online && (
                        <Circle className="absolute bottom-0 right-0 h-3 w-3 fill-emerald-500 text-emerald-500" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={cn(
                            "font-medium text-sm truncate",
                            conv.unreadCount > 0 && "font-semibold"
                          )}
                        >
                          {conv.participantName}
                        </span>
                        <span className="flex items-center gap-1 text-[10px] text-muted-foreground shrink-0">
                          <Clock className="h-3 w-3" />
                          {formatTime(conv.lastMessageTime)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-2 mt-0.5">
                        <p
                          className={cn(
                            "text-xs text-muted-foreground truncate",
                            conv.unreadCount > 0 && "text-foreground font-medium"
                          )}
                        >
                          {conv.lastMessage || "Nenhuma mensagem"}
                        </p>
                        {conv.unreadCount > 0 && (
                          <Badge
                            variant="default"
                            className="h-5 min-w-5 px-1.5 text-[10px] rounded-full shrink-0"
                          >
                            {conv.unreadCount}
                          </Badge>
                        )}
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        {conv.participantRole}
                      </p>
                    </div>
                  </button>
                ))
              )}
            </div>
          </ScrollArea>

          {/* Footer */}
          <div className="mt-auto border-t border-border/50 bg-muted/30 px-4 py-2">
            <p className="text-center text-xs text-muted-foreground">
              Chat interno da equipe
            </p>
          </div>
        </>
      )}
    </div>
  );
}

// Legacy export for backwards compatibility
export function InternalChat() {
  return (
    <>
      <InternalChatButton />
      <InternalChatPanel />
    </>
  );
}
