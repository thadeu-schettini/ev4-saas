import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Layers, Mail, CreditCard, Users, Play, Pause, CheckCircle2, AlertTriangle, Clock } from "lucide-react";
import { toast } from "sonner";

interface BulkOperationsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const recentOperations = [
  { id: "1", type: "email", description: "Comunicado de Atualização v2.4", targets: 2847, completed: 2847, status: "completed", date: "Ontem, 14:30" },
  { id: "2", type: "plan", description: "Upgrade gratuito Starter → Professional", targets: 156, completed: 156, status: "completed", date: "10/01/2024" },
  { id: "3", type: "email", description: "Lembrete de Pagamento", targets: 234, completed: 89, status: "running", date: "Agora" },
];

const mockClinics = [
  { id: "1", name: "Clínica São Lucas", plan: "Professional", email: "contato@saolucas.com", selected: false },
  { id: "2", name: "Centro Médico Vida", plan: "Enterprise", email: "admin@vidamed.com", selected: false },
  { id: "3", name: "Odonto Plus", plan: "Starter", email: "info@odontoplus.com", selected: false },
  { id: "4", name: "Fisio Center", plan: "Professional", email: "contato@fisiocenter.com", selected: false },
  { id: "5", name: "Derma Clinic", plan: "Starter", email: "atendimento@dermaclinic.com", selected: false },
];

export function BulkOperationsModal({ open, onOpenChange }: BulkOperationsModalProps) {
  const [selectedClinics, setSelectedClinics] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [filterPlan, setFilterPlan] = useState("all");

  const toggleClinic = (id: string) => {
    setSelectedClinics(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectAll) {
      setSelectedClinics([]);
    } else {
      setSelectedClinics(mockClinics.map(c => c.id));
    }
    setSelectAll(!selectAll);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle2 className="h-4 w-4 text-success" />;
      case "running": return <Clock className="h-4 w-4 text-warning animate-pulse" />;
      default: return <AlertTriangle className="h-4 w-4 text-destructive" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-primary" />
            Operações em Massa
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="email" className="flex-1 flex flex-col overflow-hidden">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="email" className="gap-2">
              <Mail className="h-4 w-4" /> Emails
            </TabsTrigger>
            <TabsTrigger value="plan" className="gap-2">
              <CreditCard className="h-4 w-4" /> Mudança de Plano
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2">
              <Clock className="h-4 w-4" /> Histórico
            </TabsTrigger>
          </TabsList>

          <TabsContent value="email" className="flex-1 overflow-hidden mt-4">
            <div className="grid md:grid-cols-2 gap-4 h-full">
              {/* Target Selection */}
              <Card className="flex flex-col overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Selecionar Destinatários</CardTitle>
                    <Badge variant="secondary">{selectedClinics.length} selecionados</Badge>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Select value={filterPlan} onValueChange={setFilterPlan}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Filtrar por plano" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos os planos</SelectItem>
                        <SelectItem value="starter">Starter</SelectItem>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="enterprise">Enterprise</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm" onClick={toggleAll}>
                      {selectAll ? "Desmarcar Todos" : "Selecionar Todos"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 overflow-hidden">
                  <ScrollArea className="h-[280px]">
                    <div className="space-y-2 pr-4">
                      {mockClinics.map((clinic) => (
                        <div
                          key={clinic.id}
                          className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                            selectedClinics.includes(clinic.id) ? "bg-primary/10 border-primary" : "hover:bg-muted"
                          }`}
                          onClick={() => toggleClinic(clinic.id)}
                        >
                          <Checkbox checked={selectedClinics.includes(clinic.id)} />
                          <div className="flex-1">
                            <div className="font-medium">{clinic.name}</div>
                            <div className="text-sm text-muted-foreground">{clinic.email}</div>
                          </div>
                          <Badge variant="outline">{clinic.plan}</Badge>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Email Composer */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Compor Email</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Input placeholder="Assunto do email" />
                  </div>
                  <div>
                    <Textarea
                      placeholder="Corpo do email... Use {{nome}} para personalizar"
                      rows={8}
                    />
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Variáveis disponíveis:</span>
                    <Badge variant="secondary">{"{{nome}}"}</Badge>
                    <Badge variant="secondary">{"{{clinica}}"}</Badge>
                    <Badge variant="secondary">{"{{plano}}"}</Badge>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => toast.info("Abrindo pré-visualização...")}>Pré-visualizar</Button>
                    <Button disabled={selectedClinics.length === 0} className="transition-transform hover:scale-105 active:scale-95" onClick={() => toast.success(`Emails enviados para ${selectedClinics.length} clínicas!`)}>
                      <Mail className="h-4 w-4 mr-2" />
                      Enviar para {selectedClinics.length} clínicas
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="plan" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Mudança de Plano em Massa</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium">Plano Atual</label>
                    <Select>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="starter">Starter</SelectItem>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="enterprise">Enterprise</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Novo Plano</label>
                    <Select>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="starter">Starter</SelectItem>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="enterprise">Enterprise</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Motivo</label>
                    <Select>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="promo">Promoção</SelectItem>
                        <SelectItem value="upgrade">Upgrade Gratuito</SelectItem>
                        <SelectItem value="downgrade">Downgrade Solicitado</SelectItem>
                        <SelectItem value="migration">Migração</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Card className="bg-muted/50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Clínicas Afetadas</div>
                        <div className="text-sm text-muted-foreground">156 clínicas no plano Starter</div>
                      </div>
                      <Button className="transition-transform hover:scale-105 active:scale-95" onClick={() => toast.success("Mudança de plano aplicada em 156 clínicas!")}>
                        <CreditCard className="h-4 w-4 mr-2" />
                        Aplicar Mudança
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="flex-1 overflow-hidden mt-4">
            <ScrollArea className="h-[400px]">
              <div className="space-y-3 pr-4">
                {recentOperations.map((op) => (
                  <Card key={op.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        {getStatusIcon(op.status)}
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{op.description}</span>
                            <Badge variant={op.type === "email" ? "default" : "secondary"}>
                              {op.type === "email" ? "Email" : "Plano"}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">{op.date}</div>
                          {op.status === "running" && (
                            <div className="mt-2">
                              <div className="flex justify-between text-xs mb-1">
                                <span>{op.completed} de {op.targets}</span>
                                <span>{Math.round((op.completed / op.targets) * 100)}%</span>
                              </div>
                              <Progress value={(op.completed / op.targets) * 100} className="h-2" />
                            </div>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{op.targets}</div>
                          <div className="text-xs text-muted-foreground">alvos</div>
                        </div>
                        {op.status === "running" && (
                          <Button variant="outline" size="sm">
                            <Pause className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
