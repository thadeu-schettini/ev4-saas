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
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import {
  Calendar,
  Clock,
  Mail,
  FileText,
  Users,
  Bell,
  Sparkles,
  CheckCircle2,
  Plus,
  X
} from "lucide-react";

interface ScheduleReportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const reportTypes = [
  { id: "faturamento", name: "Faturamento", icon: "💰" },
  { id: "consultas", name: "Consultas Realizadas", icon: "📊" },
  { id: "pacientes", name: "Novos Pacientes", icon: "👥" },
  { id: "ocupacao", name: "Taxa de Ocupação", icon: "📈" },
  { id: "produtividade", name: "Produtividade", icon: "⚡" },
  { id: "financeiro", name: "Fluxo de Caixa", icon: "💵" },
];

const frequencies = [
  { id: "daily", name: "Diário", description: "Todo dia às 8h" },
  { id: "weekly", name: "Semanal", description: "Toda segunda-feira" },
  { id: "biweekly", name: "Quinzenal", description: "Dias 1 e 15" },
  { id: "monthly", name: "Mensal", description: "Primeiro dia do mês" },
];

export function ScheduleReportModal({ open, onOpenChange }: ScheduleReportModalProps) {
  const [selectedReports, setSelectedReports] = useState<string[]>(["faturamento"]);
  const [frequency, setFrequency] = useState("weekly");
  const [recipients, setRecipients] = useState(["admin@clinica.com"]);
  const [newRecipient, setNewRecipient] = useState("");
  const [notifyApp, setNotifyApp] = useState(true);
  const [notifyEmail, setNotifyEmail] = useState(true);

  const toggleReport = (reportId: string) => {
    setSelectedReports(prev =>
      prev.includes(reportId)
        ? prev.filter(r => r !== reportId)
        : [...prev, reportId]
    );
  };

  const addRecipient = () => {
    if (newRecipient && !recipients.includes(newRecipient)) {
      setRecipients([...recipients, newRecipient]);
      setNewRecipient("");
    }
  };

  const removeRecipient = (email: string) => {
    setRecipients(recipients.filter(r => r !== email));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 shadow-lg">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            Agendar Relatório Automático
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Report Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Relatórios para Gerar</Label>
            <div className="grid sm:grid-cols-2 gap-2">
              {reportTypes.map((report) => (
                <button
                  key={report.id}
                  onClick={() => toggleReport(report.id)}
                  className={cn(
                    "p-3 rounded-xl border-2 transition-all duration-300 flex items-center gap-3 text-left",
                    selectedReports.includes(report.id)
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/30"
                  )}
                >
                  <span className="text-2xl">{report.icon}</span>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{report.name}</p>
                  </div>
                  <Checkbox 
                    checked={selectedReports.includes(report.id)}
                    className="pointer-events-none"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Frequency */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Frequência de Geração</Label>
            <div className="grid sm:grid-cols-2 gap-2">
              {frequencies.map((freq) => (
                <button
                  key={freq.id}
                  onClick={() => setFrequency(freq.id)}
                  className={cn(
                    "p-4 rounded-xl border-2 transition-all duration-300 text-left",
                    frequency === freq.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/30"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-4 h-4 rounded-full border-2 flex items-center justify-center",
                      frequency === freq.id ? "border-primary" : "border-muted-foreground"
                    )}>
                      {frequency === freq.id && (
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{freq.name}</p>
                      <p className="text-xs text-muted-foreground">{freq.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Format */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Formato do Arquivo</Label>
            <Select defaultValue="pdf">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                <SelectItem value="csv">CSV</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Recipients */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Destinatários</Label>
            <div className="flex gap-2">
              <Input 
                placeholder="email@exemplo.com" 
                value={newRecipient}
                onChange={(e) => setNewRecipient(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addRecipient()}
              />
              <Button variant="outline" size="icon" onClick={addRecipient}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {recipients.map((email) => (
                <Badge key={email} variant="secondary" className="gap-1 pr-1">
                  <Mail className="h-3 w-3" />
                  {email}
                  <button 
                    onClick={() => removeRecipient(email)}
                    className="ml-1 hover:bg-muted rounded p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Notificações</Label>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Enviar por e-mail</span>
                </div>
                <Switch checked={notifyEmail} onCheckedChange={setNotifyEmail} />
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
                <div className="flex items-center gap-3">
                  <Bell className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Notificar no app</span>
                </div>
                <Switch checked={notifyApp} onCheckedChange={setNotifyApp} />
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span className="font-medium text-sm">Resumo do Agendamento</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Relatórios</span>
                <span className="font-medium">{selectedReports.length} selecionado(s)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Frequência</span>
                <span className="font-medium">{frequencies.find(f => f.id === frequency)?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Destinatários</span>
                <span className="font-medium">{recipients.length} pessoa(s)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Próxima execução</span>
                <span className="font-medium">09/12/2024 às 08:00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button className="gap-2">
            <Calendar className="h-4 w-4" />
            Criar Agendamento
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
