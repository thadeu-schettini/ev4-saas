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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  MessageSquare,
  Building2,
  Clock,
  User,
  AlertOctagon,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  Send,
  Paperclip,
  FileText,
  Image,
  Download,
  ExternalLink,
  UserCog,
  Timer,
  Tag,
  Flag,
  ChevronRight,
} from "lucide-react";

interface TicketDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ticket: {
    id: number;
    clinic: string;
    clinicId: number;
    subject: string;
    priority: string;
    status: string;
    category: string;
    createdAt: string;
    assignee: string | null;
    messages: number;
    sla: string;
  } | null;
}

// Mock messages
const ticketMessages = [
  { 
    id: 1, 
    sender: "Cliente", 
    senderName: "Dr. Ricardo Carvalho",
    senderClinic: "Clínica MedSaúde",
    message: "Olá, estou enfrentando um problema ao tentar gerar o relatório financeiro mensal. Quando clico no botão de exportar, aparece uma tela em branco e depois um erro de timeout. Isso começou a acontecer há 2 dias.",
    timestamp: "10/12/2024 10:30",
    type: "customer",
    attachments: []
  },
  { 
    id: 2, 
    sender: "Suporte", 
    senderName: "Lucas Tech",
    senderClinic: "Equipe Suporte",
    message: "Olá Dr. Ricardo! Obrigado por entrar em contato. Vou verificar o problema imediatamente. Pode me informar qual período você está tentando exportar? E se possível, envie um screenshot da mensagem de erro.",
    timestamp: "10/12/2024 10:45",
    type: "support",
    attachments: []
  },
  { 
    id: 3, 
    sender: "Cliente", 
    senderName: "Dr. Ricardo Carvalho",
    senderClinic: "Clínica MedSaúde",
    message: "Estou tentando exportar o período de Outubro a Dezembro de 2024. Segue o screenshot do erro.",
    timestamp: "10/12/2024 11:00",
    type: "customer",
    attachments: [{ name: "erro_relatorio.png", type: "image", size: "245 KB" }]
  },
  { 
    id: 4, 
    sender: "Suporte", 
    senderName: "Lucas Tech",
    senderClinic: "Equipe Suporte",
    message: "Perfeito, obrigado pelo screenshot! Identifiquei o problema. Parece que há um volume muito grande de dados nesse período que está causando o timeout. Estou trabalhando em uma otimização agora e já libero para você.",
    timestamp: "10/12/2024 11:30",
    type: "support",
    attachments: []
  },
];

export function TicketDetailModal({ open, onOpenChange, ticket }: TicketDetailModalProps) {
  const [newMessage, setNewMessage] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(ticket?.status || "open");
  const [selectedAssignee, setSelectedAssignee] = useState(ticket?.assignee || "");

  if (!ticket) return null;

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "critical":
        return <Badge className="bg-red-600/10 text-red-600 border-red-600/20 gap-1 animate-pulse"><AlertOctagon className="h-3 w-3" />Crítica</Badge>;
      case "high":
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Alta</Badge>;
      case "medium":
        return <Badge className="bg-warning/10 text-warning border-warning/20">Média</Badge>;
      default:
        return <Badge className="bg-info/10 text-info border-info/20">Baixa</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge variant="outline" className="text-destructive border-destructive/30 gap-1"><AlertCircle className="h-3 w-3" />Aberto</Badge>;
      case "in_progress":
        return <Badge variant="outline" className="text-warning border-warning/30 gap-1"><RefreshCw className="h-3 w-3" />Em Andamento</Badge>;
      case "waiting":
        return <Badge variant="outline" className="text-info border-info/30 gap-1"><Clock className="h-3 w-3" />Aguardando</Badge>;
      case "resolved":
        return <Badge variant="outline" className="text-success border-success/30 gap-1"><CheckCircle2 className="h-3 w-3" />Resolvido</Badge>;
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="pb-4 border-b">
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <span>Ticket #{ticket.id}</span>
                  <ChevronRight className="h-4 w-4" />
                  <Badge variant="outline" className="text-xs">{ticket.category}</Badge>
                </div>
                <DialogTitle className="text-xl">{ticket.subject}</DialogTitle>
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <ExternalLink className="h-4 w-4" />
                Acessar Clínica
              </Button>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              {getPriorityBadge(ticket.priority)}
              {getStatusBadge(ticket.status)}
              <Separator orientation="vertical" className="h-4" />
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Building2 className="h-3 w-3" />
                {ticket.clinic}
              </span>
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {ticket.createdAt}
              </span>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden flex gap-4">
          {/* Messages */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-4 py-4">
                {ticketMessages.map((msg) => (
                  <div key={msg.id} className={cn(
                    "flex gap-3",
                    msg.type === "support" ? "flex-row-reverse" : ""
                  )}>
                    <Avatar className="h-8 w-8 shrink-0">
                      <AvatarFallback className={cn(
                        "text-xs font-medium",
                        msg.type === "support" ? "bg-primary/10 text-primary" : "bg-muted"
                      )}>
                        {msg.senderName.split(" ").map(n => n[0]).join("").slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className={cn(
                      "flex-1 max-w-[80%]",
                      msg.type === "support" ? "text-right" : ""
                    )}>
                      <div className="flex items-center gap-2 mb-1 flex-wrap" style={{ justifyContent: msg.type === "support" ? "flex-end" : "flex-start" }}>
                        <span className="font-medium text-sm">{msg.senderName}</span>
                        <span className="text-xs text-muted-foreground">{msg.senderClinic}</span>
                      </div>
                      <div className={cn(
                        "p-3 rounded-xl text-sm",
                        msg.type === "support" 
                          ? "bg-primary/10 text-foreground" 
                          : "bg-muted"
                      )}>
                        <p className="whitespace-pre-wrap text-left">{msg.message}</p>
                        {msg.attachments.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-border/50">
                            {msg.attachments.map((att, idx) => (
                              <div key={idx} className="flex items-center gap-2 p-2 rounded bg-background/50">
                                {att.type === "image" ? (
                                  <Image className="h-4 w-4 text-info" />
                                ) : (
                                  <FileText className="h-4 w-4 text-muted-foreground" />
                                )}
                                <span className="text-xs flex-1">{att.name}</span>
                                <span className="text-xs text-muted-foreground">{att.size}</span>
                                <Button variant="ghost" size="icon" className="h-6 w-6">
                                  <Download className="h-3 w-3" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{msg.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Reply Box */}
            <div className="pt-4 border-t space-y-3">
              <Textarea 
                placeholder="Digite sua resposta..." 
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="min-h-[80px] resize-none"
              />
              <div className="flex items-center justify-between">
                <Button variant="outline" size="sm" className="gap-2">
                  <Paperclip className="h-4 w-4" />
                  Anexar
                </Button>
                <Button className="gap-2">
                  <Send className="h-4 w-4" />
                  Enviar Resposta
                </Button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-64 shrink-0 space-y-4 hidden lg:block">
            <Card className="p-4">
              <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <Flag className="h-4 w-4 text-primary" />
                Detalhes
              </h4>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-muted-foreground">Status</label>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open">Aberto</SelectItem>
                      <SelectItem value="in_progress">Em Andamento</SelectItem>
                      <SelectItem value="waiting">Aguardando</SelectItem>
                      <SelectItem value="resolved">Resolvido</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Atribuído a</label>
                  <Select value={selectedAssignee} onValueChange={setSelectedAssignee}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Selecionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lucas">Lucas Tech</SelectItem>
                      <SelectItem value="ana">Ana Support</SelectItem>
                      <SelectItem value="pedro">Pedro Dev</SelectItem>
                      <SelectItem value="carla">Carla Sales</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Prioridade</label>
                  <Select defaultValue={ticket.priority}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="critical">Crítica</SelectItem>
                      <SelectItem value="high">Alta</SelectItem>
                      <SelectItem value="medium">Média</SelectItem>
                      <SelectItem value="low">Baixa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <Timer className="h-4 w-4 text-primary" />
                SLA
              </h4>
              <div className={cn(
                "p-3 rounded-lg text-center",
                ticket.sla.includes("restantes") 
                  ? (ticket.sla.includes("1h") || ticket.sla.includes("2h") 
                    ? "bg-warning/10 border border-warning/20" 
                    : "bg-muted/50")
                  : "bg-success/10 border border-success/20"
              )}>
                <p className={cn(
                  "font-semibold",
                  ticket.sla.includes("restantes")
                    ? (ticket.sla.includes("1h") || ticket.sla.includes("2h") ? "text-warning" : "text-foreground")
                    : "text-success"
                )}>
                  {ticket.sla}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Tempo de resposta</p>
              </div>
            </Card>

            <Card className="p-4">
              <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <Building2 className="h-4 w-4 text-primary" />
                Cliente
              </h4>
              <div className="space-y-2 text-sm">
                <p className="font-medium">{ticket.clinic}</p>
                <p className="text-muted-foreground text-xs">ID: #{ticket.clinicId}</p>
                <Separator className="my-2" />
                <div className="space-y-1 text-xs text-muted-foreground">
                  <p>Plano: Enterprise</p>
                  <p>Tickets abertos: 2</p>
                  <p>Total de tickets: 15</p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <Tag className="h-4 w-4 text-primary" />
                Tags
              </h4>
              <div className="flex flex-wrap gap-1">
                <Badge variant="outline" className="text-xs">{ticket.category}</Badge>
                <Badge variant="outline" className="text-xs">relatório</Badge>
                <Badge variant="outline" className="text-xs">timeout</Badge>
              </div>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
