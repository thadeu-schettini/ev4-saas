import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileWarning, AlertTriangle, Shield, Clock, User, FileText, ChevronDown, ChevronUp, Plus } from "lucide-react";
import { toast } from "sonner";

interface SecurityIncidentsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const mockIncidents = [
  {
    id: "INC-2024-001",
    title: "Tentativa de SQL Injection detectada",
    severity: "high",
    status: "resolved",
    detectedAt: "10/01/2024 14:32",
    resolvedAt: "10/01/2024 15:45",
    affectedSystems: ["API Gateway", "Database"],
    description: "Múltiplas tentativas de SQL injection detectadas originando do IP 185.234.72.45",
    actions: [
      { time: "14:32", action: "Incidente detectado automaticamente", user: "Sistema" },
      { time: "14:35", action: "IP bloqueado automaticamente", user: "Sistema" },
      { time: "14:40", action: "Equipe de segurança notificada", user: "Sistema" },
      { time: "15:30", action: "Análise de logs concluída - sem dados comprometidos", user: "Carlos Silva" },
      { time: "15:45", action: "Incidente encerrado", user: "Carlos Silva" },
    ],
  },
  {
    id: "INC-2024-002",
    title: "Acesso não autorizado a painel admin",
    severity: "medium",
    status: "investigating",
    detectedAt: "11/01/2024 09:15",
    resolvedAt: null,
    affectedSystems: ["Admin Panel"],
    description: "Tentativa de acesso ao painel administrativo com credenciais comprometidas",
    actions: [
      { time: "09:15", action: "Tentativa de login detectada", user: "Sistema" },
      { time: "09:18", action: "Conta bloqueada temporariamente", user: "Sistema" },
      { time: "09:25", action: "Investigação iniciada", user: "Ana Paula" },
    ],
  },
  {
    id: "INC-2024-003",
    title: "Certificado SSL próximo ao vencimento",
    severity: "low",
    status: "open",
    detectedAt: "11/01/2024 00:00",
    resolvedAt: null,
    affectedSystems: ["CDN"],
    description: "Certificado SSL do domínio api.clinicasystem.com expira em 15 dias",
    actions: [
      { time: "00:00", action: "Alerta automático gerado", user: "Sistema" },
    ],
  },
];

export function SecurityIncidentsModal({ open, onOpenChange }: SecurityIncidentsModalProps) {
  const [expandedIncident, setExpandedIncident] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "high": return <Badge variant="destructive">Crítico</Badge>;
      case "medium": return <Badge className="bg-warning/20 text-warning">Médio</Badge>;
      default: return <Badge variant="secondary">Baixo</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "resolved": return <Badge className="bg-success/20 text-success">Resolvido</Badge>;
      case "investigating": return <Badge className="bg-warning/20 text-warning">Investigando</Badge>;
      default: return <Badge variant="outline">Aberto</Badge>;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileWarning className="h-5 w-5 text-primary" />
            Log de Incidentes de Segurança
          </DialogTitle>
        </DialogHeader>

        <div className="flex items-center gap-4 mb-4">
          <Card className="px-4 py-2 bg-gradient-to-br from-destructive/10 to-transparent">
            <div className="text-2xl font-bold text-destructive">1</div>
            <div className="text-xs text-muted-foreground">Crítico</div>
          </Card>
          <Card className="px-4 py-2 bg-gradient-to-br from-warning/10 to-transparent">
            <div className="text-2xl font-bold text-warning">1</div>
            <div className="text-xs text-muted-foreground">Em Investigação</div>
          </Card>
          <Card className="px-4 py-2 bg-gradient-to-br from-success/10 to-transparent">
            <div className="text-2xl font-bold text-success">15</div>
            <div className="text-xs text-muted-foreground">Resolvidos (30d)</div>
          </Card>
          <div className="flex-1" />
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="open">Abertos</SelectItem>
              <SelectItem value="investigating">Investigando</SelectItem>
              <SelectItem value="resolved">Resolvidos</SelectItem>
            </SelectContent>
          </Select>
          <Button className="transition-transform hover:scale-105 active:scale-95" onClick={() => toast.info("Formulário de novo incidente aberto")}>
            <Plus className="h-4 w-4 mr-2" /> Registrar Incidente
          </Button>
        </div>

        <ScrollArea className="flex-1">
          <div className="space-y-3 pr-4">
            {mockIncidents.map((incident) => (
              <Card key={incident.id} className={incident.severity === "high" ? "border-destructive/50" : ""}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                      incident.severity === "high" ? "bg-destructive/10" :
                      incident.severity === "medium" ? "bg-warning/10" : "bg-muted"
                    }`}>
                      {incident.severity === "high" ? (
                        <AlertTriangle className="h-5 w-5 text-destructive" />
                      ) : (
                        <Shield className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-sm text-muted-foreground">{incident.id}</span>
                        {getSeverityBadge(incident.severity)}
                        {getStatusBadge(incident.status)}
                      </div>
                      <div className="font-medium">{incident.title}</div>
                      <div className="text-sm text-muted-foreground mt-1">{incident.description}</div>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {incident.detectedAt}
                        </span>
                        <span>Sistemas: {incident.affectedSystems.join(", ")}</span>
                      </div>

                      {expandedIncident === incident.id && (
                        <div className="mt-4 pt-4 border-t">
                          <div className="font-medium text-sm mb-3">Timeline de Ações</div>
                          <div className="space-y-2">
                            {incident.actions.map((action, index) => (
                              <div key={index} className="flex items-start gap-3 text-sm">
                                <div className="w-12 text-muted-foreground">{action.time}</div>
                                <div className="flex-1">{action.action}</div>
                                <div className="flex items-center gap-1 text-muted-foreground">
                                  <User className="h-3 w-3" />
                                  {action.user}
                                </div>
                              </div>
                            ))}
                          </div>
                          {incident.status !== "resolved" && (
                            <div className="mt-4">
                              <Textarea placeholder="Adicionar nota ou ação..." rows={2} />
                              <div className="flex justify-end gap-2 mt-2">
                                <Button variant="outline" size="sm" className="transition-transform hover:scale-105 active:scale-95" onClick={() => toast.success("Nota adicionada!")}>Adicionar Nota</Button>
                                <Button size="sm" className="transition-transform hover:scale-105 active:scale-95" onClick={() => toast.success("Incidente resolvido!")}>Resolver Incidente</Button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setExpandedIncident(expandedIncident === incident.id ? null : incident.id)}
                    >
                      {expandedIncident === incident.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
