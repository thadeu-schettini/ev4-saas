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
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  Lock,
  Key,
  Fingerprint,
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  Globe,
  Server,
  Database,
  RefreshCw,
  Save,
  Info,
} from "lucide-react";

interface SecurityConfigModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const securityMetrics = {
  overallScore: 92,
  lastAudit: "08/12/2024",
  activeThreats: 0,
  blockedAttempts: 147,
  encryptionStatus: "AES-256",
  complianceLevel: "LGPD Compliant",
};

const securityPolicies = [
  {
    id: "2fa",
    name: "Autenticação em Dois Fatores",
    description: "Exigir 2FA para todos os administradores",
    enabled: true,
    critical: true,
  },
  {
    id: "password_policy",
    name: "Política de Senhas Fortes",
    description: "Mínimo 12 caracteres com símbolos e números",
    enabled: true,
    critical: true,
  },
  {
    id: "session_timeout",
    name: "Timeout de Sessão",
    description: "Encerrar sessões inativas automaticamente",
    enabled: true,
    critical: false,
  },
  {
    id: "ip_whitelist",
    name: "Lista de IPs Permitidos",
    description: "Restringir acesso a IPs específicos",
    enabled: false,
    critical: false,
  },
  {
    id: "brute_force",
    name: "Proteção Contra Brute Force",
    description: "Bloquear após tentativas de login falhas",
    enabled: true,
    critical: true,
  },
  {
    id: "audit_logging",
    name: "Logs de Auditoria",
    description: "Registrar todas as ações do sistema",
    enabled: true,
    critical: true,
  },
  {
    id: "data_encryption",
    name: "Criptografia de Dados",
    description: "Criptografar dados em repouso e em trânsito",
    enabled: true,
    critical: true,
  },
  {
    id: "api_rate_limit",
    name: "Rate Limiting de API",
    description: "Limitar requisições por IP/token",
    enabled: true,
    critical: false,
  },
];

const recentThreats = [
  { id: 1, type: "Brute Force", ip: "45.67.89.123", attempts: 15, status: "blocked", time: "Há 2 horas" },
  { id: 2, type: "SQL Injection", ip: "89.45.12.67", attempts: 3, status: "blocked", time: "Há 5 horas" },
  { id: 3, type: "XSS Attempt", ip: "123.45.67.89", attempts: 7, status: "blocked", time: "Há 1 dia" },
];

export function SecurityConfigModal({ open, onOpenChange }: SecurityConfigModalProps) {
  const [policies, setPolicies] = useState(securityPolicies);
  const [sessionTimeout, setSessionTimeout] = useState("30");
  const [maxLoginAttempts, setMaxLoginAttempts] = useState("5");
  const [lockoutDuration, setLockoutDuration] = useState("15");

  const togglePolicy = (id: string) => {
    const policy = policies.find(p => p.id === id);
    if (policy?.critical && policy.enabled) {
      toast.error("Esta política de segurança crítica não pode ser desativada");
      return;
    }
    setPolicies(prev => prev.map(p => 
      p.id === id ? { ...p, enabled: !p.enabled } : p
    ));
  };

  const handleSave = () => {
    toast.success("Configurações de segurança salvas com sucesso");
    onOpenChange(false);
  };

  const enabledPolicies = policies.filter(p => p.enabled).length;
  const scoreColor = securityMetrics.overallScore >= 90 
    ? "text-success" 
    : securityMetrics.overallScore >= 70 
      ? "text-warning" 
      : "text-destructive";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <div className="p-2 rounded-lg bg-destructive/10">
              <Shield className="h-5 w-5 text-destructive" />
            </div>
            Configurações de Segurança
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-6">
            {/* Security Score */}
            <div className="p-4 rounded-lg bg-gradient-to-br from-card to-muted/30 border">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-success" />
                    Score de Segurança
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Última auditoria: {securityMetrics.lastAudit}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`text-3xl font-bold ${scoreColor}`}>
                    {securityMetrics.overallScore}
                  </span>
                  <span className="text-muted-foreground">/100</span>
                </div>
              </div>
              <Progress value={securityMetrics.overallScore} className="h-2" />
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                <div className="text-center p-2 rounded-lg bg-muted/50">
                  <div className="text-lg font-semibold text-success">{securityMetrics.activeThreats}</div>
                  <div className="text-xs text-muted-foreground">Ameaças Ativas</div>
                </div>
                <div className="text-center p-2 rounded-lg bg-muted/50">
                  <div className="text-lg font-semibold text-warning">{securityMetrics.blockedAttempts}</div>
                  <div className="text-xs text-muted-foreground">Bloqueios (7d)</div>
                </div>
                <div className="text-center p-2 rounded-lg bg-muted/50">
                  <div className="text-lg font-semibold text-info">{securityMetrics.encryptionStatus}</div>
                  <div className="text-xs text-muted-foreground">Criptografia</div>
                </div>
                <div className="text-center p-2 rounded-lg bg-muted/50">
                  <div className="text-lg font-semibold text-primary">{securityMetrics.complianceLevel}</div>
                  <div className="text-xs text-muted-foreground">Conformidade</div>
                </div>
              </div>
            </div>

            {/* Security Policies */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-sm flex items-center gap-2">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                  Políticas de Segurança
                </h3>
                <Badge variant="outline">
                  {enabledPolicies}/{policies.length} ativas
                </Badge>
              </div>
              <div className="space-y-2">
                {policies.map((policy) => (
                  <div
                    key={policy.id}
                    className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                      policy.enabled
                        ? "bg-card border-border"
                        : "bg-muted/30 border-dashed border-border/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-1.5 rounded-md ${policy.enabled ? "bg-success/10" : "bg-muted"}`}>
                        {policy.enabled ? (
                          <CheckCircle2 className="h-4 w-4 text-success" />
                        ) : (
                          <XCircle className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{policy.name}</span>
                          {policy.critical && (
                            <Badge variant="outline" className="text-[10px] bg-destructive/10 text-destructive border-destructive/30">
                              Crítico
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{policy.description}</p>
                      </div>
                    </div>
                    <Switch
                      checked={policy.enabled}
                      onCheckedChange={() => togglePolicy(policy.id)}
                      disabled={policy.critical && policy.enabled}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Security Settings */}
            <div className="p-4 rounded-lg bg-muted/30 border border-dashed">
              <h3 className="font-medium text-sm mb-4 flex items-center gap-2">
                <Key className="h-4 w-4 text-muted-foreground" />
                Configurações Avançadas
              </h3>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Timeout de Sessão
                  </Label>
                  <Select value={sessionTimeout} onValueChange={setSessionTimeout}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutos</SelectItem>
                      <SelectItem value="30">30 minutos</SelectItem>
                      <SelectItem value="60">1 hora</SelectItem>
                      <SelectItem value="120">2 horas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    Máx. Tentativas Login
                  </Label>
                  <Select value={maxLoginAttempts} onValueChange={setMaxLoginAttempts}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 tentativas</SelectItem>
                      <SelectItem value="5">5 tentativas</SelectItem>
                      <SelectItem value="10">10 tentativas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground flex items-center gap-1">
                    <Lock className="h-3 w-3" />
                    Duração Bloqueio
                  </Label>
                  <Select value={lockoutDuration} onValueChange={setLockoutDuration}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 minutos</SelectItem>
                      <SelectItem value="15">15 minutos</SelectItem>
                      <SelectItem value="30">30 minutos</SelectItem>
                      <SelectItem value="60">1 hora</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Recent Threats */}
            <div>
              <h3 className="font-medium text-sm mb-3 flex items-center gap-2">
                <ShieldAlert className="h-4 w-4 text-warning" />
                Ameaças Recentes Bloqueadas
              </h3>
              <div className="space-y-2">
                {recentThreats.map((threat) => (
                  <div
                    key={threat.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-card border"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-destructive/10">
                        <AlertTriangle className="h-4 w-4 text-destructive" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{threat.type}</span>
                          <Badge variant="outline" className="text-[10px] bg-success/10 text-success border-success/30">
                            Bloqueado
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          IP: {threat.ip} • {threat.attempts} tentativas • {threat.time}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Detalhes
                    </Button>
                  </div>
                ))}
              </div>
            </div>
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
