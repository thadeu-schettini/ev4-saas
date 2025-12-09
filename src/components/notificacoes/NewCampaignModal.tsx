import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  Target
} from "lucide-react";

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

export function NewCampaignModal({ open, onOpenChange }: NewCampaignModalProps) {
  const [selectedChannels, setSelectedChannels] = useState<string[]>(["whatsapp"]);
  const [selectedAudience, setSelectedAudience] = useState("all");
  const [scheduleEnabled, setScheduleEnabled] = useState(false);
  const [step, setStep] = useState(1);

  const toggleChannel = (channelId: string) => {
    setSelectedChannels(prev =>
      prev.includes(channelId)
        ? prev.filter(c => c !== channelId)
        : [...prev, channelId]
    );
  };

  const currentAudience = audiences.find(a => a.id === selectedAudience);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all",
                step >= s 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground"
              )}>
                {step > s ? <CheckCircle2 className="h-4 w-4" /> : s}
              </div>
              {s < 3 && (
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
                  {currentAudience?.name} · {currentAudience?.count} pacientes
                </p>
              </div>
              <div className="flex gap-1">
                {selectedChannels.map((channelId) => {
                  const channel = channels.find(c => c.id === channelId);
                  return channel ? (
                    <div key={channelId} className={cn("p-1.5 rounded-lg bg-gradient-to-br", channel.color)}>
                      <channel.icon className="h-3.5 w-3.5 text-white" />
                    </div>
                  ) : null;
                })}
              </div>
            </div>

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

        {/* Step 3: Preview & Confirm */}
        {step === 3 && (
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
                  <span className="font-medium">{currentAudience?.count} pacientes</span>
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
            {step < 3 && (
              <Button onClick={() => setStep(step + 1)}>
                Continuar
              </Button>
            )}
            {step === 3 && (
              <>
                <Button variant="outline" className="gap-2">
                  <Eye className="h-4 w-4" />
                  Enviar Teste
                </Button>
                <Button className="gap-2">
                  <Send className="h-4 w-4" />
                  {scheduleEnabled ? "Agendar Campanha" : "Enviar Agora"}
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
