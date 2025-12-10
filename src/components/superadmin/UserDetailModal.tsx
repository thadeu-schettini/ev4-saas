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
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import {
  User,
  Mail,
  Phone,
  Building2,
  Calendar,
  Clock,
  CheckCircle2,
  Ban,
  Shield,
  ShieldCheck,
  Key,
  KeyRound,
  History,
  Activity,
  Settings,
  Unlock,
  Lock,
  Smartphone,
  Globe,
  MapPin,
  Fingerprint,
  AlertTriangle,
  Edit,
  Trash2,
  Send,
  UserCog,
  FileText,
  Download,
} from "lucide-react";

interface UserDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
    clinic: string;
    status: string;
    lastLogin: string;
    permissions: string[];
    avatar: string | null;
  } | null;
}

// Mock session data
const sessionData = [
  { id: 1, device: "Chrome - Windows", ip: "192.168.1.100", location: "São Paulo, BR", lastActive: "Ativo agora", current: true },
  { id: 2, device: "Safari - iPhone", ip: "189.45.67.89", location: "São Paulo, BR", lastActive: "Há 2 horas", current: false },
  { id: 3, device: "Firefox - macOS", ip: "177.23.45.67", location: "Rio de Janeiro, BR", lastActive: "Há 3 dias", current: false },
];

// Mock activity log
const activityLog = [
  { id: 1, action: "Login realizado", ip: "192.168.1.100", timestamp: "10/12/2024 14:32", status: "success" },
  { id: 2, action: "Senha alterada", ip: "192.168.1.100", timestamp: "08/12/2024 11:20", status: "success" },
  { id: 3, action: "Tentativa de login falha", ip: "45.67.89.123", timestamp: "05/12/2024 23:45", status: "error" },
  { id: 4, action: "2FA ativado", ip: "192.168.1.100", timestamp: "01/12/2024 09:15", status: "success" },
  { id: 5, action: "Perfil atualizado", ip: "192.168.1.100", timestamp: "28/11/2024 16:30", status: "success" },
];

// Mock permissions
const allPermissions = [
  { key: "appointments", label: "Agendamentos", description: "Criar, editar e visualizar agendamentos" },
  { key: "patients", label: "Pacientes", description: "Gerenciar cadastro de pacientes" },
  { key: "records", label: "Prontuários", description: "Acesso aos prontuários médicos" },
  { key: "financial", label: "Financeiro", description: "Acesso ao módulo financeiro" },
  { key: "reports", label: "Relatórios", description: "Gerar e visualizar relatórios" },
  { key: "settings", label: "Configurações", description: "Alterar configurações do sistema" },
  { key: "admin", label: "Administração", description: "Acesso administrativo completo" },
];

export function UserDetailModal({ open, onOpenChange, user }: UserDetailModalProps) {
  const [activeTab, setActiveTab] = useState("info");

  if (!user) return null;

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "owner":
        return <Badge className="bg-purple-500/10 text-purple-600 border-purple-500/20 gap-1"><ShieldCheck className="h-3 w-3" />Proprietário</Badge>;
      case "admin":
        return <Badge className="bg-primary/10 text-primary border-primary/20 gap-1"><Shield className="h-3 w-3" />Administrador</Badge>;
      case "doctor":
        return <Badge className="bg-success/10 text-success border-success/20">Médico</Badge>;
      case "receptionist":
        return <Badge className="bg-info/10 text-info border-info/20">Recepcionista</Badge>;
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="pb-4 border-b">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary text-xl font-bold">
                  {user.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div>
                <DialogTitle className="text-xl">{user.name}</DialogTitle>
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  {getRoleBadge(user.role)}
                  {user.status === "active" ? (
                    <Badge className="bg-success/10 text-success border-success/20 gap-1">
                      <CheckCircle2 className="h-3 w-3" />Ativo
                    </Badge>
                  ) : (
                    <Badge className="bg-destructive/10 text-destructive border-destructive/20 gap-1">
                      <Ban className="h-3 w-3" />Suspenso
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Edit className="h-4 w-4" />
              Editar
            </Button>
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1">
          <div className="space-y-6 py-4">
            {/* Contact Info */}
            <div className="grid sm:grid-cols-2 gap-4">
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-info/10">
                    <Mail className="h-4 w-4 text-info" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="font-medium text-sm truncate">{user.email}</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Building2 className="h-4 w-4 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">Clínica</p>
                    <p className="font-medium text-sm truncate">{user.clinic}</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Security Section */}
            <Card className="p-4">
              <h4 className="font-semibold mb-4 flex items-center gap-2 text-sm">
                <Shield className="h-4 w-4 text-primary" />
                Segurança
              </h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Fingerprint className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Autenticação 2FA</p>
                      <p className="text-xs text-muted-foreground">Proteção adicional para a conta</p>
                    </div>
                  </div>
                  <Switch checked={true} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Último acesso</p>
                      <p className="text-xs text-muted-foreground">{user.lastLogin}</p>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Key className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Senha</p>
                      <p className="text-xs text-muted-foreground">Última alteração: 08/12/2024</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <KeyRound className="h-4 w-4" />
                    Resetar
                  </Button>
                </div>
              </div>
            </Card>

            {/* Sessions */}
            <Card className="p-4">
              <h4 className="font-semibold mb-4 flex items-center gap-2 text-sm">
                <Smartphone className="h-4 w-4 text-primary" />
                Sessões Ativas
              </h4>
              <div className="space-y-3">
                {sessionData.map((session) => (
                  <div key={session.id} className={cn(
                    "flex items-center justify-between p-3 rounded-lg",
                    session.current ? "bg-success/5 border border-success/20" : "bg-muted/30"
                  )}>
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        session.current ? "bg-success animate-pulse" : "bg-muted-foreground"
                      )} />
                      <div>
                        <p className="font-medium text-sm">{session.device}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{session.ip}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {session.location}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">{session.lastActive}</p>
                      {!session.current && (
                        <Button variant="ghost" size="sm" className="text-destructive h-6 text-xs mt-1">
                          Encerrar
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Permissions */}
            <Card className="p-4">
              <h4 className="font-semibold mb-4 flex items-center gap-2 text-sm">
                <Lock className="h-4 w-4 text-primary" />
                Permissões
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {allPermissions.map((perm) => {
                  const hasPermission = user.permissions.includes("all") || user.permissions.includes(perm.key);
                  return (
                    <div key={perm.key} className={cn(
                      "flex items-center gap-3 p-3 rounded-lg",
                      hasPermission ? "bg-success/5 border border-success/20" : "bg-muted/30"
                    )}>
                      {hasPermission ? (
                        <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                      ) : (
                        <Lock className="h-4 w-4 text-muted-foreground shrink-0" />
                      )}
                      <div>
                        <p className="text-sm font-medium">{perm.label}</p>
                        <p className="text-xs text-muted-foreground">{perm.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Activity Log */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold flex items-center gap-2 text-sm">
                  <History className="h-4 w-4 text-primary" />
                  Histórico de Atividades
                </h4>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="h-4 w-4" />
                  Exportar
                </Button>
              </div>
              <div className="space-y-2">
                {activityLog.map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        item.status === "success" ? "bg-success" : "bg-destructive"
                      )} />
                      <div>
                        <p className="text-sm font-medium">{item.action}</p>
                        <p className="text-xs text-muted-foreground">IP: {item.ip}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">{item.timestamp}</p>
                      {item.status === "error" && (
                        <Badge className="bg-destructive/10 text-destructive border-destructive/20 text-xs">Falha</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </ScrollArea>

        <div className="pt-4 border-t flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2">
              <Send className="h-4 w-4" />
              Enviar Email
            </Button>
            {user.status === "suspended" ? (
              <Button variant="outline" className="gap-2 text-success">
                <Unlock className="h-4 w-4" />
                Reativar
              </Button>
            ) : (
              <Button variant="outline" className="gap-2 text-destructive">
                <Ban className="h-4 w-4" />
                Suspender
              </Button>
            )}
          </div>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
