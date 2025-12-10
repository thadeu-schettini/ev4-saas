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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  BarChart3,
  Download,
  FileSpreadsheet,
  FileText,
  Calendar,
  Clock,
  Mail,
  TrendingUp,
  Users,
  Building2,
  CreditCard,
  Activity,
  PieChart,
  LineChart,
  Send,
  Plus,
} from "lucide-react";

interface ReportsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const reportTypes = [
  {
    id: "revenue",
    name: "Receita e Faturamento",
    description: "MRR, ARR, crescimento, churn financeiro",
    icon: CreditCard,
    category: "financeiro",
  },
  {
    id: "clinics",
    name: "Clínicas e Usuários",
    description: "Cadastros, ativação, retenção por plano",
    icon: Building2,
    category: "clientes",
  },
  {
    id: "usage",
    name: "Uso da Plataforma",
    description: "Features mais usadas, sessões, engajamento",
    icon: Activity,
    category: "produto",
  },
  {
    id: "support",
    name: "Suporte e Tickets",
    description: "Tempo de resposta, SLA, satisfação",
    icon: Users,
    category: "operacional",
  },
  {
    id: "growth",
    name: "Crescimento e Aquisição",
    description: "CAC, LTV, conversões, funil",
    icon: TrendingUp,
    category: "growth",
  },
  {
    id: "cohort",
    name: "Análise de Cohort",
    description: "Retenção por mês de entrada",
    icon: PieChart,
    category: "analytics",
  },
  {
    id: "churn",
    name: "Previsão de Churn",
    description: "Clínicas em risco, motivos de cancelamento",
    icon: LineChart,
    category: "analytics",
  },
];

const scheduledReports = [
  { id: 1, name: "Relatório Semanal de Receita", schedule: "Segunda, 08:00", recipients: 3, lastSent: "09/12/2024" },
  { id: 2, name: "Métricas de Crescimento", schedule: "1º do mês, 09:00", recipients: 5, lastSent: "01/12/2024" },
  { id: 3, name: "Análise de Churn", schedule: "Sexta, 17:00", recipients: 2, lastSent: "06/12/2024" },
];

export function ReportsModal({ open, onOpenChange }: ReportsModalProps) {
  const [selectedReports, setSelectedReports] = useState<string[]>([]);
  const [format, setFormat] = useState("xlsx");
  const [period, setPeriod] = useState("30d");
  const [scheduleEnabled, setScheduleEnabled] = useState(false);
  const [scheduleFrequency, setScheduleFrequency] = useState("weekly");
  const [email, setEmail] = useState("");

  const toggleReport = (id: string) => {
    setSelectedReports(prev => 
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    );
  };

  const handleGenerateReport = () => {
    if (selectedReports.length === 0) {
      toast.error("Selecione pelo menos um relatório");
      return;
    }
    toast.success(`Gerando ${selectedReports.length} relatório(s)...`, {
      description: "Você receberá o download em instantes",
    });
    onOpenChange(false);
  };

  const handleScheduleReport = () => {
    if (!email) {
      toast.error("Informe um email para receber os relatórios");
      return;
    }
    toast.success("Relatório agendado com sucesso", {
      description: `Será enviado para ${email}`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <div className="p-2 rounded-lg bg-cyan-500/10">
              <BarChart3 className="h-5 w-5 text-cyan-500" />
            </div>
            Central de Relatórios
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-6">
            {/* Report Selection */}
            <div>
              <h3 className="font-medium text-sm mb-3 flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                Selecione os Relatórios
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {reportTypes.map((report) => {
                  const Icon = report.icon;
                  const isSelected = selectedReports.includes(report.id);
                  return (
                    <button
                      key={report.id}
                      onClick={() => toggleReport(report.id)}
                      className={`p-4 rounded-lg border text-left transition-all ${
                        isSelected
                          ? "bg-primary/5 border-primary/30 ring-1 ring-primary/20"
                          : "bg-card border-border hover:border-border/80 hover:bg-muted/50"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${isSelected ? "bg-primary/10" : "bg-muted"}`}>
                          <Icon className={`h-4 w-4 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-sm">{report.name}</h4>
                            <Badge variant="outline" className="text-[10px]">
                              {report.category}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">{report.description}</p>
                        </div>
                        <Checkbox checked={isSelected} className="mt-1" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Options */}
            <div className="grid sm:grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg border border-dashed">
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Período</Label>
                <Select value={period} onValueChange={setPeriod}>
                  <SelectTrigger>
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7d">Últimos 7 dias</SelectItem>
                    <SelectItem value="30d">Últimos 30 dias</SelectItem>
                    <SelectItem value="90d">Últimos 90 dias</SelectItem>
                    <SelectItem value="12m">Últimos 12 meses</SelectItem>
                    <SelectItem value="ytd">Ano atual (YTD)</SelectItem>
                    <SelectItem value="all">Todo o período</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Formato</Label>
                <Select value={format} onValueChange={setFormat}>
                  <SelectTrigger>
                    <FileSpreadsheet className="h-4 w-4 mr-2 text-muted-foreground" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="xlsx">Excel (.xlsx)</SelectItem>
                    <SelectItem value="csv">CSV (.csv)</SelectItem>
                    <SelectItem value="pdf">PDF (.pdf)</SelectItem>
                    <SelectItem value="json">JSON (.json)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Schedule */}
            <div className="p-4 bg-muted/30 rounded-lg border border-dashed">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <h4 className="font-medium text-sm">Agendar Envio Automático</h4>
                </div>
                <Checkbox 
                  checked={scheduleEnabled} 
                  onCheckedChange={(checked) => setScheduleEnabled(checked as boolean)}
                />
              </div>
              
              {scheduleEnabled && (
                <div className="grid sm:grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Frequência</Label>
                    <Select value={scheduleFrequency} onValueChange={setScheduleFrequency}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Diário</SelectItem>
                        <SelectItem value="weekly">Semanal</SelectItem>
                        <SelectItem value="biweekly">Quinzenal</SelectItem>
                        <SelectItem value="monthly">Mensal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Email</Label>
                    <div className="flex gap-2">
                      <Input
                        type="email"
                        placeholder="email@empresa.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <Button size="icon" variant="outline" onClick={handleScheduleReport}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Scheduled Reports */}
            <div>
              <h3 className="font-medium text-sm mb-3 flex items-center gap-2">
                <Send className="h-4 w-4 text-muted-foreground" />
                Relatórios Agendados
              </h3>
              <div className="space-y-2">
                {scheduledReports.map((report) => (
                  <div
                    key={report.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-card border"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-muted">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{report.name}</h4>
                        <p className="text-xs text-muted-foreground">
                          {report.schedule} • {report.recipients} destinatários
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        Último: {report.lastSent}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        Editar
                      </Button>
                    </div>
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
          <Button onClick={handleGenerateReport} className="gap-2" disabled={selectedReports.length === 0}>
            <Download className="h-4 w-4" />
            Gerar {selectedReports.length > 0 ? `${selectedReports.length} Relatório(s)` : "Relatório"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
