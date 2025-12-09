import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  Megaphone,
  Bell,
  Mail,
  MessageSquare,
  Smartphone,
  Users,
  Calendar,
  Clock,
  Sparkles,
  Send,
  Eye,
  CheckCircle2,
  Target,
  X,
  Search,
  Plus,
  AlertTriangle,
  Zap
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface NewCampaignModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const channels = [
  { id: "push", name: "Push", icon: Bell, color: "from-amber-500 to-orange-500" },
  { id: "email", name: "E-mail", icon: Mail, color: "from-blue-500 to-cyan-500" },
  { id: "sms", name: "SMS", icon: MessageSquare, color: "from-emerald-500 to-green-500" },
  { id: "whatsapp", name: "WhatsApp", icon: Smartphone, color: "from-green-500 to-emerald-500" },
];

const audiences = [
  { id: "all", name: "Todos os Pacientes", count: 1284 },
  { id: "scheduled-today", name: "Com Agendamento Hoje", count: 24 },
  { id: "scheduled-week", name: "Com Agendamento na Semana", count: 89 },
  { id: "active", name: "Pacientes Ativos", count: 856 },
  { id: "inactive", name: "Pacientes Inativos", count: 428 },
  { id: "birthday", name: "Aniversariantes do Mês", count: 42 },
];

// Mock recipients data
const mockRecipients = [
  { id: 1, name: "Maria Silva Santos", phone: "(11) 99999-1234", email: "maria@email.com" },
  { id: 2, name: "João Pedro Oliveira", phone: "(11) 98888-5678", email: "joao@email.com" },
  { id: 3, name: "Ana Costa Lima", phone: "(11) 97777-9012", email: "ana@email.com" },
  { id: 4, name: "Carlos Eduardo Souza", phone: "(11) 96666-3456", email: "carlos@email.com" },
  { id: 5, name: "Fernanda Rocha", phone: "(11) 95555-7890", email: "fernanda@email.com" },
  { id: 6, name: "Ricardo Almeida", phone: "(11) 94444-1122", email: "ricardo@email.com" },
  { id: 7, name: "Patricia Mendes", phone: "(11) 93333-3344", email: "patricia@email.com" },
  { id: 8, name: "Lucas Santos", phone: "(11) 92222-5566", email: "lucas@email.com" },
];

export function NewCampaignModal({ open, onOpenChange }: NewCampaignModalProps) {
  const [selectedChannels, setSelectedChannels] = useState<string[]>(["whatsapp"]);
  const [selectedAudience, setSelectedAudience] = useState("all");
  const [scheduleEnabled, setScheduleEnabled] = useState(false);
  const [step, setStep] = useState(1);
  const [showRecipientsList, setShowRecipientsList] = useState(false);
  const [selectedRecipients, setSelectedRecipients] = useState<number[]>(mockRecipients.map(r => r.id));
  const [recipientSearch, setRecipientSearch] = useState("");
  const [showTestAlert, setShowTestAlert] = useState(false);
  const [showConfirmSend, setShowConfirmSend] = useState(false);

  const toggleChannel = (channelId: string) => {
    setSelectedChannels(prev =>
      prev.includes(channelId)
        ? prev.filter(c => c !== channelId)
        : [...prev, channelId]
    );
  };

  const toggleRecipient = (recipientId: number) => {
    setSelectedRecipients(prev =>
      prev.includes(recipientId)
        ? prev.filter(id => id !== recipientId)
        : [...prev, recipientId]
    );
  };

  const removeRecipient = (recipientId: number) => {
    setSelectedRecipients(prev => prev.filter(id => id !== recipientId));
  };

  const addAllRecipients = () => {
    setSelectedRecipients(mockRecipients.map(r => r.id));
  };

  const filteredRecipients = mockRecipients.filter(r =>
    r.name.toLowerCase().includes(recipientSearch.toLowerCase()) ||
    r.email.toLowerCase().includes(recipientSearch.toLowerCase())
  );

  const currentAudience = audiences.find(a => a.id === selectedAudience);

  const handleSendTest = () => {
    setShowTestAlert(false);
    toast({
      title: "Teste enviado!",
      description: "Uma mensagem de teste foi enviada para o seu e-mail/telefone.",
    });
  };

  const handleSendNow = () => {
    setShowConfirmSend(false);
    onOpenChange(false);
    toast({
      title: "Campanha enviada!",
      description: `Sua campanha foi enviada para ${selectedRecipients.length} destinatários.`,
    });
  };

  const resetModal = () => {
    setStep(1);
    setShowRecipientsList(false);
    setSelectedRecipients(mockRecipients.map(r => r.id));
  };

  return (
    <>
      <Dialog open={open} onOpenChange={(isOpen) => {
        onOpenChange(isOpen);
        if (!isOpen) resetModal();
      }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg">
                <Megaphone className="h-5 w-5 text-white" />
              </div>
              Nova Campanha de Notificação
            </DialogTitle>
          </DialogHeader>

          {/* Steps Indicator */}
          <div className="flex items-center gap-2 mb-6">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all",
                  step >= s 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted text-muted-foreground"
                )}>
                  {step > s ? <CheckCircle2 className="h-4 w-4" /> : s}
                </div>
                {s < 4 && (
                  <div className={cn(
                    "flex-1 h-1 rounded-full transition-all",
                    step > s ? "bg-primary" : "bg-muted"
                  )} />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Channels & Audience */}
          {step === 1 && (
            <div className="space-y-6">
              {/* Channels Selection */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Canais de Envio</Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {channels.map((channel) => (
                    <button
                      key={channel.id}
                      onClick={() => toggleChannel(channel.id)}
                      className={cn(
                        "p-4 rounded-xl border-2 transition-all duration-300 text-center",
                        selectedChannels.includes(channel.id)
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/30"
                      )}
                    >
                      <div className={cn(
                        "w-10 h-10 rounded-xl bg-gradient-to-br mx-auto mb-2 flex items-center justify-center shadow-lg",
                        channel.color
                      )}>
                        <channel.icon className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-sm font-medium">{channel.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Audience Selection */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Público-Alvo</Label>
                <div className="grid gap-2">
                  {audiences.map((audience) => (
                    <button
                      key={audience.id}
                      onClick={() => setSelectedAudience(audience.id)}
                      className={cn(
                        "p-4 rounded-xl border-2 transition-all duration-300 flex items-center justify-between",
                        selectedAudience === audience.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/30"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center",
                          selectedAudience === audience.id ? "bg-primary/10" : "bg-muted/50"
                        )}>
                          <Users className={cn(
                            "h-5 w-5",
                            selectedAudience === audience.id ? "text-primary" : "text-muted-foreground"
                          )} />
                        </div>
                        <span className="font-medium">{audience.name}</span>
                      </div>
                      <Badge variant="secondary">{audience.count} pacientes</Badge>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Content */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-muted/30 flex items-center gap-3">
                <Target className="h-5 w-5 text-primary" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Destinatários selecionados</p>
                  <p className="text-xs text-muted-foreground">
                    {currentAudience?.name} · {selectedRecipients.length} pacientes
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-1"
                  onClick={() => setShowRecipientsList(true)}
                >
                  <Eye className="h-3.5 w-3.5" />
                  Ver Lista
                </Button>
              </div>

              {/* Recipients List Panel */}
              {showRecipientsList && (
                <div className="p-4 rounded-xl border border-border bg-card space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Destinatários ({selectedRecipients.length})
                    </h4>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={addAllRecipients}>
                        Selecionar Todos
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setShowRecipientsList(false)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Buscar por nome ou email..." 
                      className="pl-9"
                      value={recipientSearch}
                      onChange={(e) => setRecipientSearch(e.target.value)}
                    />
                  </div>

                  <ScrollArea className="h-[200px]">
                    <div className="space-y-2">
                      {filteredRecipients.map((recipient) => (
                        <div 
                          key={recipient.id}
                          className={cn(
                            "flex items-center justify-between p-3 rounded-lg border transition-all",
                            selectedRecipients.includes(recipient.id)
                              ? "bg-primary/5 border-primary/20"
                              : "bg-muted/30 border-transparent"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <div className={cn(
                              "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium",
                              selectedRecipients.includes(recipient.id)
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground"
                            )}>
                              {recipient.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                            </div>
                            <div>
                              <p className="text-sm font-medium">{recipient.name}</p>
                              <p className="text-xs text-muted-foreground">{recipient.email}</p>
                            </div>
                          </div>
                          <Button
                            variant={selectedRecipients.includes(recipient.id) ? "destructive" : "outline"}
                            size="sm"
                            onClick={() => toggleRecipient(recipient.id)}
                          >
                            {selectedRecipients.includes(recipient.id) ? (
                              <X className="h-4 w-4" />
                            ) : (
                              <Plus className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              )}

              <div className="space-y-3">
                <Label>Nome da Campanha</Label>
                <Input placeholder="Ex: Lembrete de Consulta - Dezembro" />
              </div>

              <div className="space-y-3">
                <Label>Título da Notificação</Label>
                <Input placeholder="Ex: Lembrete: Sua consulta é amanhã!" />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Mensagem</Label>
                  <Button variant="ghost" size="sm" className="gap-1 text-xs h-7">
                    <Sparkles className="h-3 w-3" />
                    Gerar com IA
                  </Button>
                </div>
                <Textarea 
                  placeholder="Olá {nome}, este é um lembrete sobre sua consulta agendada para {data} às {horario}. Confirme sua presença!"
                  className="min-h-[120px] resize-none"
                />
                <p className="text-xs text-muted-foreground">
                  Variáveis disponíveis: {"{nome}"}, {"{data}"}, {"{horario}"}, {"{profissional}"}, {"{servico}"}
                </p>
              </div>

              {/* Scheduling */}
              <div className="p-4 rounded-xl bg-muted/30 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-sm">Agendar Envio</p>
                      <p className="text-xs text-muted-foreground">Programe para uma data e hora específica</p>
                    </div>
                  </div>
                  <Switch checked={scheduleEnabled} onCheckedChange={setScheduleEnabled} />
                </div>
                
                {scheduleEnabled && (
                  <div className="grid sm:grid-cols-2 gap-4 pt-2">
                    <div className="space-y-2">
                      <Label className="text-xs">Data</Label>
                      <Input type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs">Horário</Label>
                      <Input type="time" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Preview */}
          {step === 3 && (
            <div className="space-y-6">
              {/* Preview Card */}
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground uppercase tracking-wider">
                  Pré-visualização
                </Label>
                <div className="p-4 rounded-xl bg-muted/30 border">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Bell className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Clínica MedSaúde</p>
                      <p className="text-xs text-muted-foreground">Agora</p>
                    </div>
                  </div>
                  <p className="text-sm font-medium mb-1">Lembrete: Sua consulta é amanhã!</p>
                  <p className="text-sm text-muted-foreground">
                    Olá João, este é um lembrete sobre sua consulta agendada para 10/12/2024 às 14:00. Confirme sua presença!
                  </p>
                </div>
              </div>

              {/* Recipients Summary */}
              <div className="p-4 rounded-xl bg-muted/30 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Destinatários Selecionados
                  </h4>
                  <Badge variant="secondary">{selectedRecipients.length} pacientes</Badge>
                </div>
                <ScrollArea className="h-[120px]">
                  <div className="flex flex-wrap gap-2">
                    {mockRecipients.filter(r => selectedRecipients.includes(r.id)).map((recipient) => (
                      <Badge 
                        key={recipient.id} 
                        variant="outline" 
                        className="gap-1 pr-1"
                      >
                        {recipient.name}
                        <button 
                          className="ml-1 p-0.5 rounded-full hover:bg-destructive/20 transition-colors"
                          onClick={() => removeRecipient(recipient.id)}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>
          )}

          {/* Step 4: Confirm & Send */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/80 mx-auto mb-4 flex items-center justify-center shadow-lg">
                    <Send className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg">Pronto para Enviar</h3>
                  <p className="text-sm text-muted-foreground">Revise os detalhes da sua campanha</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-background/50">
                    <span className="text-sm text-muted-foreground">Destinatários</span>
                    <span className="font-medium">{selectedRecipients.length} pacientes</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-background/50">
                    <span className="text-sm text-muted-foreground">Canais</span>
                    <div className="flex gap-1">
                      {selectedChannels.map((channelId) => {
                        const channel = channels.find(c => c.id === channelId);
                        return channel ? (
                          <Badge key={channelId} variant="outline" className="gap-1">
                            <channel.icon className="h-3 w-3" />
                            {channel.name}
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-background/50">
                    <span className="text-sm text-muted-foreground">Envio</span>
                    <span className="font-medium">
                      {scheduleEnabled ? "Agendado" : "Imediato"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => step > 1 ? setStep(step - 1) : onOpenChange(false)}
            >
              {step > 1 ? "Voltar" : "Cancelar"}
            </Button>
            <div className="flex gap-2">
              {step < 4 && (
                <Button onClick={() => setStep(step + 1)}>
                  Continuar
                </Button>
              )}
              {step === 4 && (
                <>
                  <Button variant="outline" className="gap-2" onClick={() => setShowTestAlert(true)}>
                    <Zap className="h-4 w-4" />
                    Enviar Teste
                  </Button>
                  <Button 
                    className="gap-2" 
                    onClick={() => scheduleEnabled ? handleSendNow() : setShowConfirmSend(true)}
                  >
                    <Send className="h-4 w-4" />
                    {scheduleEnabled ? "Agendar Campanha" : "Enviar Agora"}
                  </Button>
                </>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Test Send Alert */}
      <AlertDialog open={showTestAlert} onOpenChange={setShowTestAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-amber-500" />
              Enviar Teste
            </AlertDialogTitle>
            <AlertDialogDescription>
              Uma mensagem de teste será enviada para o seu e-mail e/ou telefone cadastrado. 
              Isso não afeta os destinatários selecionados.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleSendTest}>
              Enviar Teste
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Confirm Send Alert */}
      <AlertDialog open={showConfirmSend} onOpenChange={setShowConfirmSend}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Confirmar Envio
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <p>Você está prestes a enviar esta campanha para <strong>{selectedRecipients.length} destinatários</strong>.</p>
              <p>Esta ação não pode ser desfeita. Deseja continuar?</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleSendNow} className="bg-primary">
              <Send className="h-4 w-4 mr-2" />
              Confirmar Envio
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}