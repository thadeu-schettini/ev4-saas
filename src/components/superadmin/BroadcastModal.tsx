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
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import {
  Megaphone,
  Send,
  Mail,
  MessageSquare,
  Bell,
  Users,
  Building2,
  Filter,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Eye,
  FileText,
  Sparkles,
  Crown,
  Briefcase,
  Star,
  Zap,
  Target,
  ChevronRight,
  Info,
  Image,
  Link,
  Bold,
  Italic,
  List,
  ListOrdered,
} from "lucide-react";

interface BroadcastModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Mock templates
const messageTemplates = [
  { id: 1, name: "Nova Funcionalidade", subject: "🚀 Nova funcionalidade disponível!", preview: "Temos novidades incríveis para você..." },
  { id: 2, name: "Manutenção Programada", subject: "⚙️ Manutenção Programada", preview: "Informamos que haverá uma manutenção..." },
  { id: 3, name: "Atualização de Plano", subject: "✨ Novidades no seu plano", preview: "Adicionamos novas funcionalidades ao seu plano..." },
  { id: 4, name: "Promoção Especial", subject: "🎉 Oferta Exclusiva!", preview: "Preparamos uma oferta especial para você..." },
];

// Mock recent broadcasts
const recentBroadcasts = [
  { id: 1, subject: "Nova funcionalidade: IA no Prontuário", sentAt: "05/12/2024 14:30", recipients: 1245, openRate: 68, type: "email" },
  { id: 2, subject: "Manutenção - 15/12", sentAt: "03/12/2024 10:00", recipients: 1568, openRate: 82, type: "email" },
  { id: 3, subject: "Black Friday - 40% OFF", sentAt: "25/11/2024 08:00", recipients: 456, openRate: 74, type: "email" },
];

export function BroadcastModal({ open, onOpenChange }: BroadcastModalProps) {
  const [activeTab, setActiveTab] = useState("compose");
  const [channel, setChannel] = useState("email");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [scheduleEnabled, setScheduleEnabled] = useState(false);
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  
  // Filters
  const [targetAudience, setTargetAudience] = useState("all");
  const [selectedPlans, setSelectedPlans] = useState<string[]>(["free", "starter", "pro", "business", "enterprise"]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>(["active"]);

  const planOptions = [
    { id: "free", label: "Free", count: 456, icon: null },
    { id: "starter", label: "Starter", count: 312, icon: null },
    { id: "pro", label: "Pro", count: 489, icon: Star },
    { id: "business", label: "Business", count: 234, icon: Briefcase },
    { id: "enterprise", label: "Enterprise", count: 77, icon: Crown },
  ];

  const statusOptions = [
    { id: "active", label: "Ativos", count: 1432 },
    { id: "trial", label: "Trial", count: 89 },
    { id: "suspended", label: "Suspensos", count: 35 },
    { id: "inactive", label: "Inativos", count: 12 },
  ];

  const calculateRecipients = () => {
    if (targetAudience === "all") {
      return 1568;
    }
    // Simplified calculation based on selections
    let total = 0;
    selectedPlans.forEach(plan => {
      const option = planOptions.find(p => p.id === plan);
      if (option) total += option.count;
    });
    return total;
  };

  const handleTemplateSelect = (templateId: number) => {
    setSelectedTemplate(templateId);
    const template = messageTemplates.find(t => t.id === templateId);
    if (template) {
      setSubject(template.subject);
      setMessage(template.preview);
    }
  };

  const togglePlan = (planId: string) => {
    if (selectedPlans.includes(planId)) {
      setSelectedPlans(selectedPlans.filter(p => p !== planId));
    } else {
      setSelectedPlans([...selectedPlans, planId]);
    }
  };

  const toggleStatus = (statusId: string) => {
    if (selectedStatus.includes(statusId)) {
      setSelectedStatus(selectedStatus.filter(s => s !== statusId));
    } else {
      setSelectedStatus([...selectedStatus, statusId]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="pb-4 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10">
              <Megaphone className="h-5 w-5 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-xl">Broadcast em Massa</DialogTitle>
              <p className="text-sm text-muted-foreground">Envie mensagens para clínicas e usuários</p>
            </div>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 overflow-hidden flex flex-col">
          <TabsList className="bg-muted/50 p-1 w-full justify-start">
            <TabsTrigger value="compose" className="gap-2">
              <FileText className="h-4 w-4" />
              Compor
            </TabsTrigger>
            <TabsTrigger value="audience" className="gap-2">
              <Target className="h-4 w-4" />
              Audiência
            </TabsTrigger>
            <TabsTrigger value="preview" className="gap-2">
              <Eye className="h-4 w-4" />
              Preview
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2">
              <Clock className="h-4 w-4" />
              Histórico
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="flex-1 mt-4">
            {/* Compose Tab */}
            <TabsContent value="compose" className="m-0 space-y-6">
              {/* Channel Selection */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Canal de Envio</Label>
                <div className="grid grid-cols-3 gap-3">
                  <Card 
                    className={cn(
                      "p-4 cursor-pointer transition-all hover:border-primary/50",
                      channel === "email" && "border-primary bg-primary/5"
                    )}
                    onClick={() => setChannel("email")}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "p-2 rounded-lg",
                        channel === "email" ? "bg-primary/10" : "bg-muted"
                      )}>
                        <Mail className={cn("h-5 w-5", channel === "email" ? "text-primary" : "text-muted-foreground")} />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Email</p>
                        <p className="text-xs text-muted-foreground">Enviar por email</p>
                      </div>
                    </div>
                  </Card>
                  <Card 
                    className={cn(
                      "p-4 cursor-pointer transition-all hover:border-primary/50",
                      channel === "push" && "border-primary bg-primary/5"
                    )}
                    onClick={() => setChannel("push")}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "p-2 rounded-lg",
                        channel === "push" ? "bg-primary/10" : "bg-muted"
                      )}>
                        <Bell className={cn("h-5 w-5", channel === "push" ? "text-primary" : "text-muted-foreground")} />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Push</p>
                        <p className="text-xs text-muted-foreground">Notificação in-app</p>
                      </div>
                    </div>
                  </Card>
                  <Card 
                    className={cn(
                      "p-4 cursor-pointer transition-all hover:border-primary/50",
                      channel === "sms" && "border-primary bg-primary/5"
                    )}
                    onClick={() => setChannel("sms")}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "p-2 rounded-lg",
                        channel === "sms" ? "bg-primary/10" : "bg-muted"
                      )}>
                        <MessageSquare className={cn("h-5 w-5", channel === "sms" ? "text-primary" : "text-muted-foreground")} />
                      </div>
                      <div>
                        <p className="font-medium text-sm">SMS</p>
                        <p className="text-xs text-muted-foreground">Mensagem de texto</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

              {/* Templates */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Templates</Label>
                <div className="grid grid-cols-2 gap-3">
                  {messageTemplates.map((template) => (
                    <Card 
                      key={template.id}
                      className={cn(
                        "p-3 cursor-pointer transition-all hover:border-primary/50",
                        selectedTemplate === template.id && "border-primary bg-primary/5"
                      )}
                      onClick={() => handleTemplateSelect(template.id)}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Sparkles className="h-4 w-4 text-primary" />
                        <p className="font-medium text-sm">{template.name}</p>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{template.subject}</p>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Message Content */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Assunto</Label>
                  <Input 
                    id="subject" 
                    placeholder="Digite o assunto da mensagem..."
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="message">Mensagem</Label>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <Bold className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <Italic className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <List className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <Link className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <Image className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Textarea 
                    id="message"
                    placeholder="Digite o conteúdo da mensagem..."
                    className="min-h-[150px]"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Variáveis disponíveis: {`{{nome}}`}, {`{{clinica}}`}, {`{{plano}}`}, {`{{email}}`}
                  </p>
                </div>
              </div>

              {/* Schedule */}
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-sm">Agendar Envio</p>
                      <p className="text-xs text-muted-foreground">Programe o envio para uma data futura</p>
                    </div>
                  </div>
                  <Switch checked={scheduleEnabled} onCheckedChange={setScheduleEnabled} />
                </div>
                {scheduleEnabled && (
                  <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t">
                    <div className="space-y-2">
                      <Label>Data</Label>
                      <Input 
                        type="date" 
                        value={scheduleDate}
                        onChange={(e) => setScheduleDate(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Horário</Label>
                      <Input 
                        type="time" 
                        value={scheduleTime}
                        onChange={(e) => setScheduleTime(e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </Card>
            </TabsContent>

            {/* Audience Tab */}
            <TabsContent value="audience" className="m-0 space-y-6">
              <Card className="p-4 bg-gradient-to-r from-primary/5 via-transparent to-success/5 border-primary/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-semibold">Destinatários Estimados</p>
                      <p className="text-xs text-muted-foreground">Com base nos filtros selecionados</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-primary">{calculateRecipients().toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">clínicas</p>
                  </div>
                </div>
              </Card>

              {/* Target Audience */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Público-Alvo</Label>
                <RadioGroup value={targetAudience} onValueChange={setTargetAudience}>
                  <div className="grid grid-cols-2 gap-3">
                    <Card className={cn(
                      "p-4 cursor-pointer",
                      targetAudience === "all" && "border-primary bg-primary/5"
                    )}>
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="all" id="all" />
                        <label htmlFor="all" className="flex-1 cursor-pointer">
                          <p className="font-medium text-sm">Todas as Clínicas</p>
                          <p className="text-xs text-muted-foreground">Enviar para todos os usuários</p>
                        </label>
                      </div>
                    </Card>
                    <Card className={cn(
                      "p-4 cursor-pointer",
                      targetAudience === "segment" && "border-primary bg-primary/5"
                    )}>
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="segment" id="segment" />
                        <label htmlFor="segment" className="flex-1 cursor-pointer">
                          <p className="font-medium text-sm">Segmento Específico</p>
                          <p className="text-xs text-muted-foreground">Filtrar por plano, status, etc.</p>
                        </label>
                      </div>
                    </Card>
                  </div>
                </RadioGroup>
              </div>

              {targetAudience === "segment" && (
                <>
                  {/* Plan Filter */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Filtrar por Plano</Label>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                      {planOptions.map((plan) => (
                        <Card 
                          key={plan.id}
                          className={cn(
                            "p-3 cursor-pointer transition-all",
                            selectedPlans.includes(plan.id) 
                              ? "border-primary bg-primary/5" 
                              : "hover:border-border/80"
                          )}
                          onClick={() => togglePlan(plan.id)}
                        >
                          <div className="flex items-center gap-2">
                            <Checkbox 
                              checked={selectedPlans.includes(plan.id)} 
                              onCheckedChange={() => togglePlan(plan.id)}
                            />
                            <div>
                              <p className="font-medium text-sm">{plan.label}</p>
                              <p className="text-xs text-muted-foreground">{plan.count}</p>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Status Filter */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Filtrar por Status</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {statusOptions.map((status) => (
                        <Card 
                          key={status.id}
                          className={cn(
                            "p-3 cursor-pointer transition-all",
                            selectedStatus.includes(status.id) 
                              ? "border-primary bg-primary/5" 
                              : "hover:border-border/80"
                          )}
                          onClick={() => toggleStatus(status.id)}
                        >
                          <div className="flex items-center gap-2">
                            <Checkbox 
                              checked={selectedStatus.includes(status.id)} 
                              onCheckedChange={() => toggleStatus(status.id)}
                            />
                            <div>
                              <p className="font-medium text-sm">{status.label}</p>
                              <p className="text-xs text-muted-foreground">{status.count}</p>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </TabsContent>

            {/* Preview Tab */}
            <TabsContent value="preview" className="m-0 space-y-6">
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="outline" className="gap-1">
                    <Mail className="h-3 w-3" />
                    Email Preview
                  </Badge>
                </div>
                <div className="border rounded-lg p-6 bg-background">
                  <div className="border-b pb-4 mb-4">
                    <p className="text-xs text-muted-foreground mb-1">De: sistema@seuapp.com.br</p>
                    <p className="text-xs text-muted-foreground mb-1">Para: {`{{email}}`}</p>
                    <p className="font-semibold mt-2">{subject || "Sem assunto"}</p>
                  </div>
                  <div className="prose prose-sm max-w-none">
                    <p>Olá {`{{nome}}`},</p>
                    <p className="whitespace-pre-wrap">{message || "Conteúdo da mensagem..."}</p>
                    <Separator className="my-4" />
                    <p className="text-sm text-muted-foreground">
                      Este email foi enviado para clientes da plataforma.
                      <br />
                      © 2024 Seu App. Todos os direitos reservados.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-info/5 border-info/20">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-info shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Revisão antes do envio</p>
                    <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                      <li>• Canal: {channel === "email" ? "Email" : channel === "push" ? "Push Notification" : "SMS"}</li>
                      <li>• Destinatários: {calculateRecipients().toLocaleString()} clínicas</li>
                      <li>• Agendamento: {scheduleEnabled ? `${scheduleDate} às ${scheduleTime}` : "Envio imediato"}</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* History Tab */}
            <TabsContent value="history" className="m-0 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">Últimos Envios</h4>
                <Select defaultValue="30d">
                  <SelectTrigger className="w-[150px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7d">Últimos 7 dias</SelectItem>
                    <SelectItem value="30d">Últimos 30 dias</SelectItem>
                    <SelectItem value="90d">Últimos 90 dias</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                {recentBroadcasts.map((broadcast) => (
                  <Card key={broadcast.id} className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-xs gap-1">
                            {broadcast.type === "email" ? <Mail className="h-3 w-3" /> : <Bell className="h-3 w-3" />}
                            {broadcast.type}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{broadcast.sentAt}</span>
                        </div>
                        <p className="font-medium">{broadcast.subject}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {broadcast.recipients.toLocaleString()} destinatários
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {broadcast.openRate}% taxa de abertura
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="w-20">
                          <Progress value={broadcast.openRate} className="h-2" />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{broadcast.openRate}% abertos</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>

        <DialogFooter className="pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button className="gap-2 bg-gradient-to-r from-primary to-primary/80">
            {scheduleEnabled ? (
              <>
                <Calendar className="h-4 w-4" />
                Agendar Envio
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Enviar Agora ({calculateRecipients().toLocaleString()})
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
