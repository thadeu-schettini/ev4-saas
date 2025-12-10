import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  AlertTriangle,
  Bell,
  BellOff,
  Mail,
  MessageSquare,
  Smartphone,
  Clock,
  TrendingDown,
  AlertCircle,
  Shield,
  CreditCard,
  Server,
  Users,
  Activity,
  Save,
  Settings2,
} from "lucide-react";

interface AlertsConfigModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const alertTypes = [
  {
    id: "churn_risk",
    name: "Risco de Churn",
    description: "Quando uma clínica atinge score de risco > 70%",
    icon: TrendingDown,
    color: "text-destructive",
    enabled: true,
    channels: { email: true, sms: false, push: true },
    threshold: 70,
  },
  {
    id: "payment_failed",
    name: "Pagamento Falhou",
    description: "Quando um pagamento não é processado com sucesso",
    icon: CreditCard,
    color: "text-warning",
    enabled: true,
    channels: { email: true, sms: true, push: true },
    threshold: null,
  },
  {
    id: "security_breach",
    name: "Alerta de Segurança",
    description: "Tentativas de acesso suspeitas ou violações",
    icon: Shield,
    color: "text-destructive",
    enabled: true,
    channels: { email: true, sms: true, push: true },
    threshold: 3,
  },
  {
    id: "system_down",
    name: "Sistema Indisponível",
    description: "Quando um serviço crítico fica offline",
    icon: Server,
    color: "text-destructive",
    enabled: true,
    channels: { email: true, sms: true, push: true },
    threshold: null,
  },
  {
    id: "high_usage",
    name: "Alto Uso de Recursos",
    description: "Quando o uso de CPU/memória excede o limite",
    icon: Activity,
    color: "text-warning",
    enabled: true,
    channels: { email: true, sms: false, push: true },
    threshold: 90,
  },
  {
    id: "new_signup",
    name: "Novos Cadastros",
    description: "Notificação de novos cadastros de clínicas",
    icon: Users,
    color: "text-info",
    enabled: false,
    channels: { email: true, sms: false, push: false },
    threshold: null,
  },
  {
    id: "ticket_critical",
    name: "Ticket Crítico",
    description: "Quando um ticket é marcado como crítico",
    icon: AlertCircle,
    color: "text-destructive",
    enabled: true,
    channels: { email: true, sms: true, push: true },
    threshold: null,
  },
  {
    id: "sla_breach",
    name: "Violação de SLA",
    description: "Quando o tempo de resposta excede o SLA",
    icon: Clock,
    color: "text-warning",
    enabled: true,
    channels: { email: true, sms: false, push: true },
    threshold: null,
  },
];

export function AlertsConfigModal({ open, onOpenChange }: AlertsConfigModalProps) {
  const [alerts, setAlerts] = useState(alertTypes);

  const toggleAlert = (id: string) => {
    setAlerts(prev => prev.map(a => 
      a.id === id ? { ...a, enabled: !a.enabled } : a
    ));
  };

  const toggleChannel = (alertId: string, channel: "email" | "sms" | "push") => {
    setAlerts(prev => prev.map(a => 
      a.id === alertId ? { ...a, channels: { ...a.channels, [channel]: !a.channels[channel] } } : a
    ));
  };

  const updateThreshold = (alertId: string, value: number) => {
    setAlerts(prev => prev.map(a => 
      a.id === alertId ? { ...a, threshold: value } : a
    ));
  };

  const handleSave = () => {
    toast.success("Configurações de alertas salvas com sucesso");
    onOpenChange(false);
  };

  const enabledCount = alerts.filter(a => a.enabled).length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <div className="p-2 rounded-lg bg-warning/10">
              <AlertTriangle className="h-5 w-5 text-warning" />
            </div>
            Configuração de Alertas
          </DialogTitle>
        </DialogHeader>

        <div className="flex items-center justify-between py-2 px-4 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {enabledCount} de {alerts.length} alertas ativos
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Mail className="h-3 w-3" /> Email
            </div>
            <div className="flex items-center gap-1">
              <Smartphone className="h-3 w-3" /> SMS
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare className="h-3 w-3" /> Push
            </div>
          </div>
        </div>

        <ScrollArea className="h-[450px] pr-4">
          <div className="space-y-4">
            {alerts.map((alert) => {
              const Icon = alert.icon;
              return (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg border transition-all ${
                    alert.enabled 
                      ? "bg-card border-border" 
                      : "bg-muted/30 border-dashed border-border/50 opacity-60"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`p-2 rounded-lg ${alert.enabled ? "bg-muted" : "bg-muted/50"}`}>
                        <Icon className={`h-4 w-4 ${alert.enabled ? alert.color : "text-muted-foreground"}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-sm">{alert.name}</h4>
                          {alert.enabled && (
                            <Badge variant="outline" className="text-xs bg-success/10 text-success border-success/30">
                              Ativo
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{alert.description}</p>
                        
                        {alert.enabled && (
                          <div className="flex items-center gap-4 mt-3">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => toggleChannel(alert.id, "email")}
                                className={`p-1.5 rounded-md transition-colors ${
                                  alert.channels.email 
                                    ? "bg-primary/10 text-primary" 
                                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                                }`}
                              >
                                <Mail className="h-3.5 w-3.5" />
                              </button>
                              <button
                                onClick={() => toggleChannel(alert.id, "sms")}
                                className={`p-1.5 rounded-md transition-colors ${
                                  alert.channels.sms 
                                    ? "bg-primary/10 text-primary" 
                                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                                }`}
                              >
                                <Smartphone className="h-3.5 w-3.5" />
                              </button>
                              <button
                                onClick={() => toggleChannel(alert.id, "push")}
                                className={`p-1.5 rounded-md transition-colors ${
                                  alert.channels.push 
                                    ? "bg-primary/10 text-primary" 
                                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                                }`}
                              >
                                <MessageSquare className="h-3.5 w-3.5" />
                              </button>
                            </div>

                            {alert.threshold !== null && (
                              <>
                                <Separator orientation="vertical" className="h-4" />
                                <div className="flex items-center gap-2">
                                  <Label className="text-xs text-muted-foreground">Limite:</Label>
                                  <Input
                                    type="number"
                                    value={alert.threshold}
                                    onChange={(e) => updateThreshold(alert.id, parseInt(e.target.value) || 0)}
                                    className="h-7 w-16 text-xs"
                                  />
                                  <span className="text-xs text-muted-foreground">
                                    {alert.id.includes("usage") || alert.id.includes("churn") ? "%" : ""}
                                  </span>
                                </div>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    <Switch
                      checked={alert.enabled}
                      onCheckedChange={() => toggleAlert(alert.id)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>

        <DialogFooter className="flex-col sm:flex-row gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave} className="gap-2">
            <Save className="h-4 w-4" />
            Salvar Configurações
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
