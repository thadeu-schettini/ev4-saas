import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bell, Plus, Send, Clock, Users, Eye, Settings, Smartphone, Monitor, Trash2, Edit, X, Check } from "lucide-react";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";
import { toast } from "sonner";

interface PushNotificationsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const mockNotifications = [
  { id: "1", title: "Nova atualização disponível", body: "Confira as novidades da versão 2.5", status: "sent", recipients: 2847, openRate: 68, sentAt: "10/01/2024 10:00", segment: "all", url: "" },
  { id: "2", title: "Lembrete de pagamento", body: "Sua fatura vence amanhã", status: "scheduled", recipients: 234, openRate: null, sentAt: "15/01/2024 09:00", segment: "active", url: "/billing" },
  { id: "3", title: "Manutenção programada", body: "Sistema ficará indisponível das 2h às 4h", status: "draft", recipients: 0, openRate: null, sentAt: null, segment: "all", url: "" },
];

const notificationTypes = [
  { type: "system", label: "Atualizações do Sistema", enabled: true, description: "Notificações sobre novas versões e manutenções" },
  { type: "marketing", label: "Marketing", enabled: true, description: "Promoções e novidades" },
  { type: "reminder", label: "Lembretes", enabled: true, description: "Lembretes de pagamento e vencimentos" },
  { type: "alert", label: "Alertas de Segurança", enabled: true, description: "Alertas importantes de segurança" },
];

export function PushNotificationsModal({ open, onOpenChange }: PushNotificationsModalProps) {
  const [showNewNotification, setShowNewNotification] = useState(false);
  const [editingNotification, setEditingNotification] = useState<any>(null);
  const [types, setTypes] = useState(notificationTypes);
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; id: string; name: string }>({ open: false, id: '', name: '' });

  // Form state
  const [notificationForm, setNotificationForm] = useState({
    title: "",
    body: "",
    segment: "",
    url: ""
  });

  const handleEditNotification = (notification: any) => {
    setEditingNotification(notification);
    setNotificationForm({
      title: notification.title,
      body: notification.body,
      segment: notification.segment,
      url: notification.url || ""
    });
    setShowNewNotification(false);
  };

  const cancelEdit = () => {
    setEditingNotification(null);
    setShowNewNotification(false);
    setNotificationForm({ title: "", body: "", segment: "", url: "" });
  };

  const saveNotification = () => {
    toast.success(editingNotification ? "Notificação atualizada!" : "Notificação enviada com sucesso!");
    cancelEdit();
  };

  const handleDelete = () => {
    toast.success(`Notificação "${deleteDialog.name}" excluída!`);
    setDeleteDialog({ open: false, id: '', name: '' });
  };

  const toggleType = (type: string) => {
    setTypes(types.map(t => t.type === type ? { ...t, enabled: !t.enabled } : t));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "sent": return <Badge className="bg-success/20 text-success">Enviada</Badge>;
      case "scheduled": return <Badge className="bg-info/20 text-info">Agendada</Badge>;
      default: return <Badge variant="secondary">Rascunho</Badge>;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            Gestão de Notificações Push
          </DialogTitle>
        </DialogHeader>

        <div className="flex items-center gap-4 mb-4 flex-wrap">
          <Card className="px-4 py-2 bg-gradient-to-br from-primary/10 to-transparent">
            <div className="text-2xl font-bold text-primary">2.8K</div>
            <div className="text-xs text-muted-foreground">Dispositivos Registrados</div>
          </Card>
          <Card className="px-4 py-2 bg-gradient-to-br from-success/10 to-transparent">
            <div className="text-2xl font-bold text-success">68%</div>
            <div className="text-xs text-muted-foreground">Taxa de Abertura</div>
          </Card>
          <Card className="px-4 py-2 bg-gradient-to-br from-info/10 to-transparent">
            <div className="flex items-center gap-2">
              <Smartphone className="h-4 w-4 text-info" />
              <span className="text-lg font-bold">1.8K</span>
            </div>
            <div className="text-xs text-muted-foreground">Mobile</div>
          </Card>
          <Card className="px-4 py-2 bg-gradient-to-br from-warning/10 to-transparent">
            <div className="flex items-center gap-2">
              <Monitor className="h-4 w-4 text-warning" />
              <span className="text-lg font-bold">1K</span>
            </div>
            <div className="text-xs text-muted-foreground">Desktop</div>
          </Card>
          <div className="flex-1" />
          <Button onClick={() => { setShowNewNotification(true); cancelEdit(); }}>
            <Plus className="h-4 w-4 mr-2" /> Nova Notificação
          </Button>
        </div>

        <Tabs defaultValue="notifications" className="flex-1 flex flex-col overflow-hidden">
          <TabsList>
            <TabsTrigger value="notifications">Notificações</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
          </TabsList>

          <TabsContent value="notifications" className="flex-1 overflow-hidden mt-4">
            {(showNewNotification || editingNotification) && (
              <Card className="mb-4 border-primary">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center justify-between">
                    {editingNotification ? "Editar Notificação" : "Nova Notificação Push"}
                    <Button variant="ghost" size="icon" onClick={cancelEdit}>
                      <X className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>Título</Label>
                      <Input 
                        placeholder="Título da notificação" 
                        className="mt-1" 
                        maxLength={50} 
                        value={notificationForm.title}
                        onChange={(e) => setNotificationForm({...notificationForm, title: e.target.value})}
                      />
                      <div className="text-xs text-muted-foreground mt-1">
                        {notificationForm.title.length}/50 caracteres
                      </div>
                    </div>
                    <div>
                      <Label>Segmento</Label>
                      <Select value={notificationForm.segment} onValueChange={(v) => setNotificationForm({...notificationForm, segment: v})}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos</SelectItem>
                          <SelectItem value="mobile">Apenas Mobile</SelectItem>
                          <SelectItem value="desktop">Apenas Desktop</SelectItem>
                          <SelectItem value="active">Usuários Ativos</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Label>Mensagem</Label>
                    <Textarea 
                      placeholder="Corpo da notificação..." 
                      className="mt-1" 
                      rows={3} 
                      maxLength={150} 
                      value={notificationForm.body}
                      onChange={(e) => setNotificationForm({...notificationForm, body: e.target.value})}
                    />
                    <div className="text-xs text-muted-foreground mt-1">
                      {notificationForm.body.length}/150 caracteres
                    </div>
                  </div>
                  <div className="mt-4">
                    <Label>URL de Destino (opcional)</Label>
                    <Input 
                      placeholder="https://app.exemplo.com/pagina" 
                      className="mt-1" 
                      value={notificationForm.url}
                      onChange={(e) => setNotificationForm({...notificationForm, url: e.target.value})}
                    />
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" onClick={cancelEdit}>Cancelar</Button>
                    <Button variant="outline" onClick={saveNotification}>
                      <Clock className="h-4 w-4 mr-2" /> Agendar
                    </Button>
                    <Button onClick={saveNotification}>
                      <Send className="h-4 w-4 mr-2" /> {editingNotification ? "Salvar e Enviar" : "Enviar Agora"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <ScrollArea className="h-[350px]">
              <div className="space-y-3 pr-4">
                {mockNotifications.map((notification) => (
                  <Card key={notification.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Bell className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{notification.title}</span>
                            {getStatusBadge(notification.status)}
                          </div>
                          <div className="text-sm text-muted-foreground">{notification.body}</div>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                            {notification.sentAt && (
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" /> {notification.sentAt}
                              </span>
                            )}
                            {notification.recipients > 0 && (
                              <span className="flex items-center gap-1">
                                <Users className="h-3 w-3" /> {notification.recipients}
                              </span>
                            )}
                          </div>
                        </div>
                        {notification.status === "sent" && notification.openRate && (
                          <div className="text-center">
                            <div className="flex items-center gap-1 text-sm">
                              <Eye className="h-3 w-3 text-primary" />
                              {notification.openRate}%
                            </div>
                            <div className="text-xs text-muted-foreground">Abertura</div>
                          </div>
                        )}
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleEditNotification(notification)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-destructive" onClick={() => setDeleteDialog({ open: true, id: notification.id, name: notification.title })}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="settings" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Tipos de Notificação
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {types.map((type) => (
                    <div key={type.type} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                      <div>
                        <div className="font-medium">{type.label}</div>
                        <div className="text-sm text-muted-foreground">{type.description}</div>
                      </div>
                      <Switch checked={type.enabled} onCheckedChange={() => toggleType(type.type)} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <DeleteConfirmDialog
          open={deleteDialog.open}
          onOpenChange={(open) => setDeleteDialog({ ...deleteDialog, open })}
          title="Excluir Notificação"
          description={`Tem certeza que deseja excluir a notificação "${deleteDialog.name}"? Esta ação não pode ser desfeita.`}
          onConfirm={handleDelete}
        />
      </DialogContent>
    </Dialog>
  );
}
