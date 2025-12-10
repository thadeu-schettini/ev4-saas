import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { 
  Bell, 
  Calendar, 
  CreditCard, 
  FileText, 
  MessageSquare,
  CheckCircle2,
  Clock,
  AlertCircle,
  Trash2,
  CheckCheck,
  Settings,
  Sparkles
} from "lucide-react";

interface NotificationsPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const notifications = [
  {
    id: 1,
    type: "appointment",
    title: "Consulta Amanhã",
    message: "Sua consulta com Dr. Ricardo Carvalho está marcada para amanhã às 10:00.",
    time: "Há 2 horas",
    read: false,
    icon: Calendar
  },
  {
    id: 2,
    type: "payment",
    title: "Pagamento Pendente",
    message: "Você tem um pagamento de R$ 280,00 com vencimento em 20/12/2024.",
    time: "Há 5 horas",
    read: false,
    icon: CreditCard
  },
  {
    id: 3,
    type: "document",
    title: "Novo Documento",
    message: "Seu resultado de exame de sangue está disponível para visualização.",
    time: "Há 1 dia",
    read: false,
    icon: FileText
  },
  {
    id: 4,
    type: "message",
    title: "Nova Mensagem",
    message: "A clínica enviou uma mensagem para você.",
    time: "Há 1 dia",
    read: true,
    icon: MessageSquare
  },
  {
    id: 5,
    type: "appointment",
    title: "Consulta Confirmada",
    message: "Sua consulta com Dra. Ana Paula foi confirmada para 22/12/2024.",
    time: "Há 2 dias",
    read: true,
    icon: CheckCircle2
  },
  {
    id: 6,
    type: "reminder",
    title: "Lembrete de Medicação",
    message: "Lembre-se de tomar seu medicamento às 20:00.",
    time: "Há 3 dias",
    read: true,
    icon: Clock
  },
];

export function NotificationsPanel({ open, onOpenChange }: NotificationsPanelProps) {
  const [notificationsList, setNotificationsList] = useState(notifications);
  const [filter, setFilter] = useState("all");
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const unreadCount = notificationsList.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotificationsList(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markAsRead = (id: number) => {
    setNotificationsList(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const deleteNotification = (id: number) => {
    setDeletingId(id);
    setTimeout(() => {
      setNotificationsList(prev => prev.filter(n => n.id !== id));
      setDeletingId(null);
    }, 300);
  };

  const filteredNotifications = notificationsList.filter(n => {
    if (filter === "all") return true;
    if (filter === "unread") return !n.read;
    return n.type === filter;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case "appointment": return "text-info bg-info/10";
      case "payment": return "text-warning bg-warning/10";
      case "document": return "text-success bg-success/10";
      case "message": return "text-primary bg-primary/10";
      case "reminder": return "text-purple-500 bg-purple-500/10";
      default: return "text-muted-foreground bg-muted";
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md p-0 bg-card/95 backdrop-blur-xl border-l-2 border-primary/20">
        <SheetHeader className="p-4 pb-0">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-primary/70 animate-[scale-in_0.2s_ease-out]">
                <Bell className="h-5 w-5 text-primary-foreground" />
              </div>
              <span>Notificações</span>
              {unreadCount > 0 && (
                <Badge className="bg-destructive text-destructive-foreground animate-pulse">
                  {unreadCount} novas
                </Badge>
              )}
            </SheetTitle>
            <Button variant="ghost" size="icon" className="hover:rotate-90 transition-transform duration-300">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </SheetHeader>

        <div className="p-4 space-y-4">
          {/* Quick Actions */}
          {unreadCount > 0 && (
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full gap-2 animate-[fade-in_0.3s_ease-out] hover:scale-[1.02] transition-transform"
              onClick={markAllAsRead}
            >
              <CheckCheck className="h-4 w-4" />
              Marcar todas como lidas
            </Button>
          )}

          {/* Filters */}
          <Tabs value={filter} onValueChange={setFilter}>
            <TabsList className="grid grid-cols-4 w-full h-auto p-1">
              <TabsTrigger value="all" className="text-xs py-1.5 transition-all data-[state=active]:scale-105">
                Todas
              </TabsTrigger>
              <TabsTrigger value="unread" className="text-xs py-1.5 transition-all data-[state=active]:scale-105">
                Não lidas
                {unreadCount > 0 && (
                  <span className="ml-1 w-4 h-4 rounded-full bg-destructive text-destructive-foreground text-[10px] flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="appointment" className="text-xs py-1.5 transition-all data-[state=active]:scale-105">
                Consultas
              </TabsTrigger>
              <TabsTrigger value="payment" className="text-xs py-1.5 transition-all data-[state=active]:scale-105">
                Pagamentos
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Notifications List */}
          <ScrollArea className="h-[calc(100vh-220px)]">
            <div className="space-y-2 pr-4">
              {filteredNotifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center animate-[fade-in_0.3s_ease-out]">
                  <div className="relative">
                    <Bell className="h-16 w-16 text-muted-foreground/30 mb-4" />
                    <Sparkles className="h-6 w-6 text-warning absolute -top-1 -right-1 animate-bounce" />
                  </div>
                  <p className="text-muted-foreground">Nenhuma notificação</p>
                  <p className="text-xs text-muted-foreground/70">Você está em dia!</p>
                </div>
              ) : (
                filteredNotifications.map((notification, index) => {
                  const Icon = notification.icon;
                  return (
                    <div
                      key={notification.id}
                      style={{ animationDelay: `${index * 50}ms` }}
                      className={cn(
                        "group relative p-4 rounded-xl transition-all duration-300 cursor-pointer",
                        "animate-[fade-in_0.3s_ease-out_both]",
                        "hover:shadow-md hover:scale-[1.01]",
                        deletingId === notification.id && "opacity-0 scale-95 -translate-x-full",
                        notification.read 
                          ? "bg-muted/30 hover:bg-muted/50" 
                          : "bg-primary/5 border border-primary/10 hover:bg-primary/10"
                      )}
                      onClick={() => markAsRead(notification.id)}
                    >
                      {!notification.read && (
                        <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary animate-ping" />
                      )}
                      {!notification.read && (
                        <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary" />
                      )}
                      
                      <div className="flex gap-3">
                        <div className={cn(
                          "p-2 rounded-lg h-fit transition-all duration-300",
                          getTypeColor(notification.type),
                          !notification.read && "animate-[scale-in_0.3s_ease-out]"
                        )}>
                          <Icon className="h-4 w-4" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className={cn(
                              "font-medium text-sm transition-colors",
                              !notification.read && "text-foreground"
                            )}>
                              {notification.title}
                            </h4>
                          </div>
                          <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-muted-foreground">
                              {notification.time}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-all hover:scale-110 hover:bg-destructive/10 hover:text-destructive"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteNotification(notification.id);
                              }}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
}
