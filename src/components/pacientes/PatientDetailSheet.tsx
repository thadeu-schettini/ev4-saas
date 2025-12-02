import { useState } from "react";
import { X, Phone, Mail, Calendar, MapPin, FileText, DollarSign, Bell, Edit, Save, Plus, Trash2 } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  cpf?: string;
  avatar?: string;
  registrationDate: string;
  lastAppointment?: string;
  nextAppointment?: string;
  status: "active" | "inactive" | "pending";
  financialStatus: "ok" | "pending" | "overdue";
  upcomingAppointments: number;
}

interface PatientDetailSheetProps {
  patient: Patient;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PatientDetailSheet({ patient, open, onOpenChange }: PatientDetailSheetProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("consultas");

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-2xl lg:max-w-4xl p-0 overflow-hidden">
        <div className="flex flex-col h-full">
          {/* Header with Patient Info */}
          <div className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-background border-b px-4 sm:px-6 py-6">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 rounded-full"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4" />
            </Button>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-8 sm:mt-0">
              <Avatar className="h-20 w-20 border-4 border-background shadow-lg">
                <AvatarImage src={patient.avatar} />
                <AvatarFallback className="bg-gradient-to-br from-primary to-primary/60 text-primary-foreground text-2xl font-bold">
                  {patient.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl sm:text-2xl font-bold truncate">{patient.name}</h2>
                  <Badge variant="outline" className="shrink-0">
                    {patient.status === "active" ? "Ativo" : patient.status === "inactive" ? "Inativo" : "Pendente"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground truncate mb-2">{patient.email}</p>
                <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    {patient.phone}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(patient.birthDate).toLocaleDateString("pt-BR")}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 shrink-0">
                <Button size="sm" variant="outline" className="bg-background/80 backdrop-blur-sm">
                  <Phone className="h-4 w-4 mr-2" />
                  Ligar
                </Button>
                <Button size="sm" className="shadow-md">
                  <Calendar className="h-4 w-4 mr-2" />
                  Nova Consulta
                </Button>
              </div>
            </div>
          </div>

          {/* Tabs Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
            <div className="border-b px-4 sm:px-6 bg-card/50 backdrop-blur-sm">
              <TabsList className="w-full justify-start h-auto p-0 bg-transparent">
                <TabsTrigger value="consultas" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                  Consultas
                </TabsTrigger>
                <TabsTrigger value="perfil" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                  Perfil
                </TabsTrigger>
                <TabsTrigger value="prontuario" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                  Prontuário
                </TabsTrigger>
                <TabsTrigger value="financeiro" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                  Financeiro
                </TabsTrigger>
                <TabsTrigger value="enderecos" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                  Endereços
                </TabsTrigger>
                <TabsTrigger value="notificacoes" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                  Notificações
                </TabsTrigger>
              </TabsList>
            </div>

            <ScrollArea className="flex-1">
              <div className="p-4 sm:p-6">
                <TabsContent value="consultas" className="m-0">
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Histórico de Consultas</CardTitle>
                        <CardDescription>
                          Consultas realizadas e agendadas
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {/* Mock consultation items */}
                          <div className="flex items-start gap-4 p-4 rounded-lg border bg-card/50 hover:bg-muted/50 transition-colors">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <Calendar className="h-4 w-4 text-primary" />
                                <span className="font-semibold">19/OUT 08:45</span>
                                <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                                  Realizada
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">Dr. João Silva - Consulta de Retorno</p>
                              <p className="text-sm text-muted-foreground mt-1">R$ 260,00 - Pago</p>
                            </div>
                            <Button size="sm" variant="ghost">
                              <FileText className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="flex items-start gap-4 p-4 rounded-lg border bg-card/50 hover:bg-muted/50 transition-colors">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <Calendar className="h-4 w-4 text-primary" />
                                <span className="font-semibold">25/JAN 12:45</span>
                                <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/20">
                                  Agendada
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">Dr. João Silva - Consulta de Acompanhamento</p>
                              <p className="text-sm text-muted-foreground mt-1">R$ 270,00 - Pendente</p>
                            </div>
                            <Button size="sm" variant="ghost">
                              <FileText className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="perfil" className="m-0">
                  <div className="space-y-6">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                          <CardTitle>Informações Pessoais</CardTitle>
                          <CardDescription>Dados principais e contato do paciente</CardDescription>
                        </div>
                        {!isEditing ? (
                          <Button size="sm" onClick={() => setIsEditing(true)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                          </Button>
                        ) : (
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>
                              Cancelar
                            </Button>
                            <Button size="sm" onClick={() => setIsEditing(false)}>
                              <Save className="h-4 w-4 mr-2" />
                              Salvar
                            </Button>
                          </div>
                        )}
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Nome completo</Label>
                            <Input id="name" defaultValue={patient.name} disabled={!isEditing} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="birth">Data de nascimento</Label>
                            <Input
                              id="birth"
                              type="date"
                              defaultValue={patient.birthDate}
                              disabled={!isEditing}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">E-mail</Label>
                            <Input id="email" type="email" defaultValue={patient.email} disabled={!isEditing} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Telefone</Label>
                            <Input id="phone" defaultValue={patient.phone} disabled={!isEditing} />
                          </div>
                          {patient.cpf && (
                            <div className="space-y-2">
                              <Label htmlFor="cpf">CPF</Label>
                              <Input id="cpf" defaultValue={patient.cpf} disabled={!isEditing} />
                            </div>
                          )}
                          <div className="space-y-2">
                            <Label htmlFor="status">Status</Label>
                            <Input id="status" defaultValue={patient.status} disabled={!isEditing} />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Documentos</CardTitle>
                        <CardDescription>Identificadores oficiais e convênio</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">Nenhum documento cadastrado</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Contatos de Emergência</CardTitle>
                        <CardDescription>Contatos acionáveis em situações críticas</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">Nenhum contato de emergência cadastrado</p>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="prontuario" className="m-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Prontuário Médico</CardTitle>
                      <CardDescription>Histórico clínico compartilhado com a equipe</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">Nenhum registro clínico disponível</p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="financeiro" className="m-0">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="h-8 w-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                              <DollarSign className="h-4 w-4 text-emerald-600" />
                            </div>
                            <span className="text-sm text-muted-foreground">Recebido</span>
                          </div>
                          <p className="text-2xl font-bold text-emerald-600">R$ 0,00</p>
                          <p className="text-xs text-muted-foreground mt-1">0 faturas registradas</p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <DollarSign className="h-4 w-4 text-primary" />
                            </div>
                            <span className="text-sm text-muted-foreground">Pendente</span>
                          </div>
                          <p className="text-2xl font-bold">R$ 0,00</p>
                          <p className="text-xs text-muted-foreground mt-1">Aguardando confirmação</p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="h-8 w-8 rounded-full bg-red-500/10 flex items-center justify-center">
                              <DollarSign className="h-4 w-4 text-red-600" />
                            </div>
                            <span className="text-sm text-muted-foreground">Em atraso</span>
                          </div>
                          <p className="text-2xl font-bold text-red-600">R$ 0,00</p>
                          <p className="text-xs text-muted-foreground mt-1">Sem cobranças vencidas</p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <FileText className="h-4 w-4 text-primary" />
                            </div>
                            <span className="text-sm text-muted-foreground">Faturas emitidas</span>
                          </div>
                          <p className="text-2xl font-bold">0</p>
                          <p className="text-xs text-muted-foreground mt-1">0 em aberto</p>
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle>Histórico de Pagamentos</CardTitle>
                        <CardDescription>Pagamentos registrados e pendentes</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground text-center py-8">
                          Nenhum pagamento registrado
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="enderecos" className="m-0">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Endereços</CardTitle>
                        <CardDescription>Cadastre e mantenha os endereços do paciente atualizados</CardDescription>
                      </div>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground text-center py-8">
                        Nenhum endereço cadastrado
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="notificacoes" className="m-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Preferências de Notificações</CardTitle>
                      <CardDescription>Escolha quais comunicações o paciente receberá</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Lembretes de consultas</Label>
                          <p className="text-sm text-muted-foreground">
                            Receber lembretes antes das consultas agendadas
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Atualizações de produtos e serviços</Label>
                          <p className="text-sm text-muted-foreground">
                            Novidades sobre tratamentos e serviços disponíveis
                          </p>
                        </div>
                        <Switch />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Alertas de cobranças e faturas</Label>
                          <p className="text-sm text-muted-foreground">
                            Notificações sobre pagamentos pendentes
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Mensagens automáticas do Autopilot</Label>
                          <p className="text-sm text-muted-foreground">
                            Comunicações automatizadas do sistema
                          </p>
                        </div>
                        <Switch />
                      </div>

                      <div className="flex justify-end pt-4">
                        <Button>Salvar preferências</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </div>
            </ScrollArea>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
}
