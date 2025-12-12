import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, Settings, TestTube, CheckCircle2, XCircle, Clock, DollarSign, Send, AlertTriangle, Trash2 } from "lucide-react";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";
import { toast } from "sonner";

interface SMSGatewayModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const mockProviders = [
  { id: "1", name: "Twilio", status: "active", balance: 1250.00, messagesMonth: 4523, successRate: 98.5 },
  { id: "2", name: "AWS SNS", status: "backup", balance: 500.00, messagesMonth: 0, successRate: 99.2 },
  { id: "3", name: "Vonage", status: "inactive", balance: 0, messagesMonth: 0, successRate: 0 },
];

const mockLogs = [
  { id: "1", to: "+5511999887766", message: "Seu código de verificação é 123456", status: "delivered", provider: "Twilio", time: "Há 5 min", cost: 0.08 },
  { id: "2", to: "+5521988776655", message: "Lembrete: Consulta amanhã às 14h", status: "delivered", provider: "Twilio", time: "Há 12 min", cost: 0.08 },
  { id: "3", to: "+5531977665544", message: "Seu código de verificação é 789012", status: "failed", provider: "Twilio", time: "Há 25 min", cost: 0 },
];

export function SMSGatewayModal({ open, onOpenChange }: SMSGatewayModalProps) {
  const [testPhone, setTestPhone] = useState("");
  const [providers, setProviders] = useState(mockProviders);
  const [showAddProvider, setShowAddProvider] = useState(false);
  const [editingProvider, setEditingProvider] = useState<string | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; id: string; name: string }>({ open: false, id: '', name: '' });

  const handleAddProvider = () => {
    toast.success("Provedor adicionado com sucesso!");
    setShowAddProvider(false);
  };

  const handleSaveProvider = () => {
    toast.success("Provedor atualizado com sucesso!");
    setEditingProvider(null);
  };

  const handleSendTest = () => {
    toast.success("SMS de teste enviado com sucesso!");
  };

  const handleDelete = () => {
    toast.success(`Provedor "${deleteDialog.name}" removido!`);
    setDeleteDialog({ open: false, id: '', name: '' });
  };
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active": return <Badge className="bg-success/20 text-success">Ativo</Badge>;
      case "backup": return <Badge className="bg-info/20 text-info">Backup</Badge>;
      default: return <Badge variant="secondary">Inativo</Badge>;
    }
  };

  const getDeliveryIcon = (status: string) => {
    switch (status) {
      case "delivered": return <CheckCircle2 className="h-4 w-4 text-success" />;
      case "pending": return <Clock className="h-4 w-4 text-warning" />;
      default: return <XCircle className="h-4 w-4 text-destructive" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            Configuração de Gateway SMS
          </DialogTitle>
        </DialogHeader>

        <div className="flex items-center gap-4 mb-4">
          <Card className="px-4 py-2 bg-gradient-to-br from-success/10 to-transparent">
            <div className="text-2xl font-bold text-success">98.5%</div>
            <div className="text-xs text-muted-foreground">Taxa de Entrega</div>
          </Card>
          <Card className="px-4 py-2 bg-gradient-to-br from-primary/10 to-transparent">
            <div className="text-2xl font-bold text-primary">4.5K</div>
            <div className="text-xs text-muted-foreground">SMS/Mês</div>
          </Card>
          <Card className="px-4 py-2 bg-gradient-to-br from-warning/10 to-transparent">
            <div className="flex items-center gap-1">
              <DollarSign className="h-4 w-4 text-warning" />
              <span className="text-xl font-bold">R$ 1.250</span>
            </div>
            <div className="text-xs text-muted-foreground">Saldo Disponível</div>
          </Card>
          <div className="flex-1" />
        </div>

        <Tabs defaultValue="providers" className="flex-1 flex flex-col overflow-hidden">
          <TabsList>
            <TabsTrigger value="providers">Provedores</TabsTrigger>
            <TabsTrigger value="logs">Logs de Envio</TabsTrigger>
            <TabsTrigger value="test">Testar SMS</TabsTrigger>
          </TabsList>

          <TabsContent value="providers" className="flex-1 overflow-hidden mt-4">
            <div className="space-y-4">
              {showAddProvider && (
                <Card className="border-primary">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Novo Provedor SMS</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label>Provedor</Label>
                        <Select>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="twilio">Twilio</SelectItem>
                            <SelectItem value="aws">AWS SNS</SelectItem>
                            <SelectItem value="vonage">Vonage</SelectItem>
                            <SelectItem value="messagebird">MessageBird</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Status Inicial</Label>
                        <Select>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Ativo</SelectItem>
                            <SelectItem value="backup">Backup</SelectItem>
                            <SelectItem value="inactive">Inativo</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>API Key</Label>
                        <Input type="password" placeholder="••••••••••••" className="mt-1" />
                      </div>
                      <div>
                        <Label>API Secret</Label>
                        <Input type="password" placeholder="••••••••••••" className="mt-1" />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                      <Button variant="outline" onClick={() => setShowAddProvider(false)}>Cancelar</Button>
                      <Button onClick={() => setShowAddProvider(false)}>Adicionar</Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {providers.map((provider) => (
                <Card key={provider.id} className={provider.status === "active" ? "border-success/50" : ""}>
                  <CardContent className="p-4">
                    {editingProvider === provider.id ? (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-2">
                          <MessageSquare className="h-5 w-5 text-primary" />
                          <span className="font-medium text-lg">{provider.name}</span>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label>API Key</Label>
                            <Input type="password" defaultValue="sk_live_xxx" className="mt-1" />
                          </div>
                          <div>
                            <Label>API Secret</Label>
                            <Input type="password" defaultValue="secret_xxx" className="mt-1" />
                          </div>
                          <div>
                            <Label>Webhook URL</Label>
                            <Input defaultValue="https://api.example.com/webhook" className="mt-1" />
                          </div>
                          <div>
                            <Label>Número de Origem</Label>
                            <Input defaultValue="+5511999999999" className="mt-1" />
                          </div>
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" onClick={() => setEditingProvider(null)}>Cancelar</Button>
                          <Button size="sm" onClick={() => setEditingProvider(null)}>Salvar</Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-4">
                        <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${
                          provider.status === "active" ? "bg-success/10" : "bg-muted"
                        }`}>
                          <MessageSquare className={`h-6 w-6 ${provider.status === "active" ? "text-success" : "text-muted-foreground"}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-lg">{provider.name}</span>
                            {getStatusBadge(provider.status)}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <span>Saldo: R$ {provider.balance.toFixed(2)}</span>
                            <span>{provider.messagesMonth} SMS/mês</span>
                            {provider.successRate > 0 && <span>{provider.successRate}% entrega</span>}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Select defaultValue={provider.status}>
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="active">Ativo</SelectItem>
                              <SelectItem value="backup">Backup</SelectItem>
                              <SelectItem value="inactive">Inativo</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button variant="outline" size="icon" onClick={() => setEditingProvider(provider.id)}>
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}

              <Card className="border-dashed">
                <CardContent className="p-4 text-center">
                  <Button variant="outline" onClick={() => setShowAddProvider(true)}>
                    <Settings className="h-4 w-4 mr-2" /> Adicionar Provedor
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="logs" className="flex-1 overflow-hidden mt-4">
            <ScrollArea className="h-[400px]">
              <div className="space-y-2 pr-4">
                {mockLogs.map((log) => (
                  <Card key={log.id} className="bg-muted/30">
                    <CardContent className="p-3">
                      <div className="flex items-center gap-3">
                        {getDeliveryIcon(log.status)}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-sm">{log.to}</span>
                            <Badge variant="outline" className="text-xs">{log.provider}</Badge>
                          </div>
                          <div className="text-sm text-muted-foreground truncate">{log.message}</div>
                        </div>
                        <div className="text-right text-sm">
                          <div className="text-muted-foreground">{log.time}</div>
                          {log.cost > 0 && <div className="text-xs">R$ {log.cost.toFixed(2)}</div>}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="test" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <TestTube className="h-4 w-4" />
                  Enviar SMS de Teste
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-w-md">
                  <div>
                    <Label>Número de Telefone</Label>
                    <Input
                      placeholder="+5511999887766"
                      value={testPhone}
                      onChange={(e) => setTestPhone(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Mensagem</Label>
                    <Input
                      defaultValue="Este é um SMS de teste do sistema."
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Provedor</Label>
                    <Select defaultValue="twilio">
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="twilio">Twilio (Ativo)</SelectItem>
                        <SelectItem value="aws">AWS SNS (Backup)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full" onClick={handleSendTest}>
                    <Send className="h-4 w-4 mr-2" /> Enviar SMS de Teste
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-4 bg-warning/5 border-warning/20">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0" />
                  <div>
                    <div className="font-medium">Atenção</div>
                    <div className="text-sm text-muted-foreground">
                      O envio de SMS de teste irá consumir saldo do provedor selecionado.
                      Custo estimado: R$ 0,08 por mensagem.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <DeleteConfirmDialog
          open={deleteDialog.open}
          onOpenChange={(open) => setDeleteDialog({ ...deleteDialog, open })}
          title="Remover Provedor"
          description={`Tem certeza que deseja remover o provedor "${deleteDialog.name}"?`}
          onConfirm={handleDelete}
        />
      </DialogContent>
    </Dialog>
  );
}
