import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShieldAlert, AlertTriangle, Eye, Ban, CheckCircle2, Clock, MapPin, Globe, User, Fingerprint } from "lucide-react";
import { toast } from "sonner";

interface SuspiciousActivityModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const mockAlerts = [
  {
    id: "1",
    type: "brute_force",
    severity: "high",
    description: "Múltiplas tentativas de login falhas",
    details: "15 tentativas em 5 minutos para admin@clinicax.com",
    ip: "185.234.72.45",
    location: "Rússia",
    timestamp: "Há 5 minutos",
    status: "active",
  },
  {
    id: "2",
    type: "unusual_access",
    severity: "medium",
    description: "Acesso de localização incomum",
    details: "Login detectado de novo país (Ucrânia) para dr.carlos@saolucas.com",
    ip: "91.214.67.123",
    location: "Kiev, Ucrânia",
    timestamp: "Há 23 minutos",
    status: "investigating",
  },
  {
    id: "3",
    type: "data_export",
    severity: "medium",
    description: "Exportação massiva de dados",
    details: "Usuário exportou 5.000+ registros de pacientes em 10 minutos",
    ip: "201.17.45.89",
    location: "São Paulo, Brasil",
    timestamp: "Há 1 hora",
    status: "resolved",
  },
  {
    id: "4",
    type: "api_abuse",
    severity: "low",
    description: "Rate limit excedido",
    details: "API key fazendo 500+ requests/minuto",
    ip: "45.67.89.123",
    location: "Estados Unidos",
    timestamp: "Há 2 horas",
    status: "resolved",
  },
];

export function SuspiciousActivityModal({ open, onOpenChange }: SuspiciousActivityModalProps) {
  const [filter, setFilter] = useState("all");
  const [showRulesConfig, setShowRulesConfig] = useState(false);
  const [rules, setRules] = useState([
    { id: "1", name: "Brute Force", threshold: 10, window: "5 min", action: "block", enabled: true },
    { id: "2", name: "Localização Incomum", threshold: 1, window: "24h", action: "alert", enabled: true },
    { id: "3", name: "Exportação Massiva", threshold: 1000, window: "10 min", action: "alert", enabled: true },
    { id: "4", name: "Rate Limit Excedido", threshold: 500, window: "1 min", action: "throttle", enabled: false },
  ]);
  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "high": return <Badge variant="destructive">Alto</Badge>;
      case "medium": return <Badge className="bg-warning/20 text-warning">Médio</Badge>;
      default: return <Badge variant="secondary">Baixo</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active": return <Badge className="bg-destructive/20 text-destructive animate-pulse">Ativo</Badge>;
      case "investigating": return <Badge className="bg-warning/20 text-warning">Investigando</Badge>;
      default: return <Badge className="bg-success/20 text-success">Resolvido</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "brute_force": return <Fingerprint className="h-5 w-5" />;
      case "unusual_access": return <MapPin className="h-5 w-5" />;
      case "data_export": return <Eye className="h-5 w-5" />;
      default: return <Globe className="h-5 w-5" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-primary" />
            Detecção de Atividades Suspeitas
          </DialogTitle>
        </DialogHeader>

        <div className="flex items-center gap-4 mb-4">
          <Card className="px-4 py-2 bg-gradient-to-br from-destructive/10 to-transparent">
            <div className="text-2xl font-bold text-destructive">2</div>
            <div className="text-xs text-muted-foreground">Alertas Ativos</div>
          </Card>
          <Card className="px-4 py-2 bg-gradient-to-br from-warning/10 to-transparent">
            <div className="text-2xl font-bold text-warning">1</div>
            <div className="text-xs text-muted-foreground">Em Investigação</div>
          </Card>
          <Card className="px-4 py-2 bg-gradient-to-br from-success/10 to-transparent">
            <div className="text-2xl font-bold text-success">47</div>
            <div className="text-xs text-muted-foreground">Resolvidos (30d)</div>
          </Card>
          <div className="flex-1" />
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="active">Ativos</SelectItem>
              <SelectItem value="investigating">Investigando</SelectItem>
              <SelectItem value="resolved">Resolvidos</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <ScrollArea className="flex-1">
          <div className="space-y-3 pr-4">
            {mockAlerts.map((alert) => (
              <Card key={alert.id} className={alert.status === "active" ? "border-destructive/50" : ""}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${
                      alert.severity === "high" ? "bg-destructive/10 text-destructive" :
                      alert.severity === "medium" ? "bg-warning/10 text-warning" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      {getTypeIcon(alert.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{alert.description}</span>
                        {getSeverityBadge(alert.severity)}
                        {getStatusBadge(alert.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">{alert.details}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Globe className="h-3 w-3" /> {alert.ip}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> {alert.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {alert.timestamp}
                        </span>
                      </div>
                    </div>
                    {alert.status !== "resolved" && (
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => toast.info("Iniciando investigação...")}>
                          <Eye className="h-4 w-4 mr-1" /> Investigar
                        </Button>
                        <Button variant="destructive" size="sm" className="transition-transform hover:scale-105 active:scale-95" onClick={() => toast.success(`IP ${alert.ip} bloqueado com sucesso!`)}>
                          <Ban className="h-4 w-4 mr-1" /> Bloquear IP
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>

        {showRulesConfig ? (
          <Card className="mt-4 border-primary">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center justify-between">
                <span>Configurações de Detecção</span>
                <Button variant="ghost" size="sm" onClick={() => setShowRulesConfig(false)}>
                  Fechar
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px]">
                <div className="space-y-3 pr-4">
                  {rules.map((rule) => (
                    <div key={rule.id} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                      <div className="flex-1">
                        <div className="font-medium">{rule.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {rule.threshold} ocorrências em {rule.window} → {rule.action === "block" ? "Bloquear" : rule.action === "alert" ? "Alertar" : "Throttle"}
                        </div>
                      </div>
                      <Badge variant={rule.enabled ? "default" : "secondary"}>
                        {rule.enabled ? "Ativo" : "Inativo"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="flex justify-end mt-4">
                <Button size="sm" className="transition-transform hover:scale-105 active:scale-95" onClick={() => { toast.success("Regras salvas com sucesso!"); setShowRulesConfig(false); }}>Salvar Regras</Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="mt-4 bg-muted/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Configurações de Detecção</div>
                  <div className="text-sm text-muted-foreground">Ajuste os limites e regras de detecção automática</div>
                </div>
                <Button variant="outline" onClick={() => setShowRulesConfig(true)}>Configurar Regras</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </DialogContent>
    </Dialog>
  );
}
