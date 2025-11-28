import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  Calendar,
  Package,
  Plug,
  Bot,
  Video,
  FileText,
  Shield,
  Upload,
  Plus,
  Trash2,
  Save,
  Info,
  Palette,
  Globe,
  Phone,
  Mail,
  Clock,
  MapPin,
  Sparkles,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Configuracoes() {
  const [activeTab, setActiveTab] = useState("organizacao");

  // Organization states
  const [orgData, setOrgData] = useState({
    nomeFantasia: "Clínica Demo",
    razaoSocial: "Clínica Demo LTDA",
    cpfCnpj: "14132147-90",
    website: "https://www.suaempresa.com",
  });

  // Attendance modes
  const [attendanceModes, setAttendanceModes] = useState({
    presencial: true,
    online: false,
    domiciliar: false,
  });

  // Resource activation
  const [resources, setResources] = useState({
    fiscal: true,
    autopilot: true,
    convenios: true,
    cupons: true,
  });

  // Telemedicine
  const [telemedicine, setTelemedicine] = useState({
    active: false,
    roomTheme: "Padrão do sistema",
    highlightColor: "#3b82f6",
    retentionDays: "30",
  });

  const handleSave = () => {
    toast.success("Configurações salvas com sucesso!");
  };

  const tabs = [
    { id: "organizacao", label: "Organização", icon: Building2 },
    { id: "agenda", label: "Agenda", icon: Calendar },
    { id: "recursos", label: "Recursos", icon: Package },
    { id: "integracoes", label: "Integrações", icon: Plug },
    { id: "autopilot", label: "Autopilot", icon: Bot, badge: "BETA" },
    { id: "telemedicina", label: "Telemedicina", icon: Video },
    { id: "fiscal", label: "Fiscal", icon: FileText },
    { id: "acessos", label: "Acessos", icon: Shield },
  ];

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Configurações
            </h1>
            <p className="text-muted-foreground">
              Personalize e configure todos os aspectos do sistema
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            {/* Navigation Pills */}
            <Card className="border-border/50 backdrop-blur-sm bg-card/95 shadow-lg">
              <CardContent className="p-4">
                <TabsList className="inline-flex flex-wrap gap-2 bg-transparent h-auto p-0">
                  {tabs.map((tab) => (
                    <TabsTrigger
                      key={tab.id}
                      value={tab.id}
                      className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all duration-300 hover:bg-muted/50 px-4 py-2.5 rounded-lg gap-2"
                    >
                      <tab.icon className="h-4 w-4" />
                      {tab.label}
                      {tab.badge && (
                        <Badge variant="secondary" className="ml-1 text-xs">
                          {tab.badge}
                        </Badge>
                      )}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </CardContent>
            </Card>

            {/* Organização Tab */}
            <TabsContent value="organizacao" className="space-y-6">
              <Card className="border-border/50 backdrop-blur-sm bg-card/95 shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    <CardTitle>Dados da Organização</CardTitle>
                  </div>
                  <CardDescription>
                    Informações básicas da sua clínica ou consultório
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="nomeFantasia">Nome Fantasia *</Label>
                      <Input
                        id="nomeFantasia"
                        value={orgData.nomeFantasia}
                        onChange={(e) =>
                          setOrgData({ ...orgData, nomeFantasia: e.target.value })
                        }
                        placeholder="Nome da clínica"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="razaoSocial">Razão Social</Label>
                      <Input
                        id="razaoSocial"
                        value={orgData.razaoSocial}
                        onChange={(e) =>
                          setOrgData({ ...orgData, razaoSocial: e.target.value })
                        }
                        placeholder="Razão social da empresa"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cpfCnpj">CPF ou CNPJ *</Label>
                      <Input
                        id="cpfCnpj"
                        value={orgData.cpfCnpj}
                        onChange={(e) =>
                          setOrgData({ ...orgData, cpfCnpj: e.target.value })
                        }
                        placeholder="00.000.000/0000-00"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        type="url"
                        value={orgData.website}
                        onChange={(e) =>
                          setOrgData({ ...orgData, website: e.target.value })
                        }
                        placeholder="https://www.suaempresa.com"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Visual Identity */}
              <Card className="border-border/50 backdrop-blur-sm bg-card/95 shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Palette className="h-5 w-5 text-primary" />
                    <CardTitle>Identidade Visual</CardTitle>
                  </div>
                  <CardDescription>
                    Configure o logo e as cores do seu sistema
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <Label>Logo (1400px × 1400px)</Label>
                      <div className="border-2 border-dashed border-border rounded-lg p-8 flex flex-col items-center justify-center gap-3 hover:border-primary/50 transition-colors cursor-pointer bg-muted/20">
                        <Upload className="h-8 w-8 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground text-center">
                          Clique para fazer upload
                          <br />
                          <span className="text-xs">PNG ou JPG (máx. 5MB)</span>
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label>Favicon (64px × 64px)</Label>
                      <div className="border-2 border-dashed border-border rounded-lg p-8 flex flex-col items-center justify-center gap-3 hover:border-primary/50 transition-colors cursor-pointer bg-muted/20">
                        <Upload className="h-8 w-8 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground text-center">
                          Clique para fazer upload
                          <br />
                          <span className="text-xs">PNG ou ICO (máx. 1MB)</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Cores do Tema</Label>
                      <div className="flex items-center gap-2">
                        <Switch id="lightMode" defaultChecked />
                        <Label htmlFor="lightMode" className="text-sm font-normal">
                          Modo Claro
                        </Label>
                        <Switch id="darkMode" />
                        <Label htmlFor="darkMode" className="text-sm font-normal">
                          Modo Escuro
                        </Label>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { name: "Sky", color: "#3b82f6" },
                        { name: "Blue", color: "#2563eb" },
                        { name: "Magenta", color: "#a855f7" },
                        { name: "Orange", color: "#f97316" },
                        { name: "Green", color: "#22c55e" },
                        { name: "Red", color: "#ef4444" },
                        { name: "Cyan", color: "#06b6d4" },
                        { name: "Indigo", color: "#6366f1" },
                      ].map((theme) => (
                        <button
                          key={theme.name}
                          className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border hover:border-primary transition-all hover:shadow-md"
                        >
                          <div
                            className="w-12 h-12 rounded-lg shadow-md"
                            style={{ backgroundColor: theme.color }}
                          />
                          <span className="text-sm font-medium">{theme.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Agenda Tab */}
            <TabsContent value="agenda" className="space-y-6">
              <Card className="border-border/50 backdrop-blur-sm bg-card/95 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        <CardTitle>Modos de Atendimento</CardTitle>
                      </div>
                      <CardDescription className="mt-2">
                        Defina quais tipos de atendimento sua clínica oferece
                      </CardDescription>
                    </div>
                    <Button onClick={handleSave}>
                      <Save className="h-4 w-4" />
                      Salvar
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="border-border/50 bg-muted/20">
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-primary/10">
                              <MapPin className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-semibold">Presencial</p>
                              <p className="text-xs text-muted-foreground">
                                Atendimento na clínica
                              </p>
                            </div>
                          </div>
                          <Switch
                            checked={attendanceModes.presencial}
                            onCheckedChange={(checked) =>
                              setAttendanceModes({ ...attendanceModes, presencial: checked })
                            }
                          />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-border/50 bg-muted/20">
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-primary/10">
                              <Video className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-semibold">Online</p>
                              <p className="text-xs text-muted-foreground">
                                Telemedicina
                              </p>
                            </div>
                          </div>
                          <Switch
                            checked={attendanceModes.online}
                            onCheckedChange={(checked) =>
                              setAttendanceModes({ ...attendanceModes, online: checked })
                            }
                          />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-border/50 bg-muted/20">
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-primary/10">
                              <Building2 className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-semibold">Domiciliar</p>
                              <p className="text-xs text-muted-foreground">
                                Atendimento em casa
                              </p>
                            </div>
                          </div>
                          <Switch
                            checked={attendanceModes.domiciliar}
                            onCheckedChange={(checked) =>
                              setAttendanceModes({ ...attendanceModes, domiciliar: checked })
                            }
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>

              {/* Appointment Types */}
              <Card className="border-border/50 backdrop-blur-sm bg-card/95 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Tipos de Atendimento</CardTitle>
                      <CardDescription>
                        Configure os tipos de consulta e suas durações
                      </CardDescription>
                    </div>
                    <Button size="sm" className="gap-2">
                      <Plus className="h-4 w-4" />
                      Adicionar
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                      <div className="md:col-span-5 space-y-2">
                        <Label>Nome</Label>
                        <Input placeholder="Ex.: Primeira Consulta" />
                      </div>
                      <div className="md:col-span-3 space-y-2">
                        <Label>Duração (min)</Label>
                        <Input type="number" placeholder="30" />
                      </div>
                      <div className="md:col-span-3 space-y-2">
                        <Label>Requer sala</Label>
                        <div className="flex items-center h-10">
                          <Switch />
                        </div>
                      </div>
                      <div className="md:col-span-1">
                        <Button variant="ghost" size="icon" className="text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Example entries */}
                    {[
                      { name: "Primeira Consulta", duration: "60 min", requiresRoom: true },
                      { name: "Consulta", duration: "45 min", requiresRoom: false },
                      { name: "Retorno", duration: "30 min", requiresRoom: false },
                    ].map((type, index) => (
                      <Card key={index} className="bg-muted/30">
                        <CardContent className="py-4">
                          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                            <div className="md:col-span-5">
                              <p className="font-medium">{type.name}</p>
                            </div>
                            <div className="md:col-span-3">
                              <p className="text-sm text-muted-foreground">{type.duration}</p>
                            </div>
                            <div className="md:col-span-3">
                              <Badge variant={type.requiresRoom ? "default" : "secondary"}>
                                {type.requiresRoom ? "Sim" : "Não"}
                              </Badge>
                            </div>
                            <div className="md:col-span-1 flex gap-2">
                              <Button variant="ghost" size="sm">
                                Editar
                              </Button>
                              <Button variant="ghost" size="sm" className="text-destructive">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Recursos Tab */}
            <TabsContent value="recursos" className="space-y-6">
              <Card className="border-border/50 backdrop-blur-sm bg-card/95 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <Package className="h-5 w-5 text-primary" />
                        <CardTitle>Ativação de Recursos</CardTitle>
                      </div>
                      <CardDescription className="mt-2">
                        Controle quais módulos e funcionalidades estão ativos no sistema
                      </CardDescription>
                    </div>
                    <Button onClick={handleSave} className="gap-2">
                      <Save className="h-4 w-4" />
                      Salvar alterações
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="border-border/50 bg-gradient-to-br from-muted/30 to-muted/10">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <FileText className="h-5 w-5 text-primary" />
                              <h3 className="font-semibold">Fiscal (Notas / NF-e)</h3>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Ativa configurações e telas relacionadas à emissão fiscal
                            </p>
                          </div>
                          <Switch
                            checked={resources.fiscal}
                            onCheckedChange={(checked) =>
                              setResources({ ...resources, fiscal: checked })
                            }
                          />
                        </div>
                        <Badge variant={resources.fiscal ? "default" : "secondary"}>
                          {resources.fiscal ? "Ativado" : "Desativado"}
                        </Badge>
                      </CardContent>
                    </Card>

                    <Card className="border-border/50 bg-gradient-to-br from-muted/30 to-muted/10">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Bot className="h-5 w-5 text-primary" />
                              <h3 className="font-semibold">Autopilot</h3>
                              <Badge variant="outline" className="text-xs">
                                BETA
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Controle de acesso ao módulo de automações inteligentes
                            </p>
                          </div>
                          <Switch
                            checked={resources.autopilot}
                            onCheckedChange={(checked) =>
                              setResources({ ...resources, autopilot: checked })
                            }
                          />
                        </div>
                        <Badge variant={resources.autopilot ? "default" : "secondary"}>
                          {resources.autopilot ? "Ativado" : "Desativado"}
                        </Badge>
                      </CardContent>
                    </Card>

                    <Card className="border-border/50 bg-gradient-to-br from-muted/30 to-muted/10">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Shield className="h-5 w-5 text-primary" />
                              <h3 className="font-semibold">Convênios</h3>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Quando desativado, telas e campos de convênios são ocultos
                            </p>
                          </div>
                          <Switch
                            checked={resources.convenios}
                            onCheckedChange={(checked) =>
                              setResources({ ...resources, convenios: checked })
                            }
                          />
                        </div>
                        <Badge variant={resources.convenios ? "default" : "secondary"}>
                          {resources.convenios ? "Ativado" : "Desativado"}
                        </Badge>
                      </CardContent>
                    </Card>

                    <Card className="border-border/50 bg-gradient-to-br from-muted/30 to-muted/10">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Sparkles className="h-5 w-5 text-primary" />
                              <h3 className="font-semibold">Cupons e promoções</h3>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Controla o acesso ao módulo de cupons e campanhas promocionais
                            </p>
                          </div>
                          <Switch
                            checked={resources.cupons}
                            onCheckedChange={(checked) =>
                              setResources({ ...resources, cupons: checked })
                            }
                          />
                        </div>
                        <Badge variant={resources.cupons ? "default" : "secondary"}>
                          {resources.cupons ? "Ativado" : "Desativado"}
                        </Badge>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Integrações Tab */}
            <TabsContent value="integracoes" className="space-y-6">
              <Card className="border-border/50 backdrop-blur-sm bg-card/95 shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Plug className="h-5 w-5 text-primary" />
                    <CardTitle>Integrações Externas</CardTitle>
                  </div>
                  <CardDescription>
                    Conecte sua clínica com serviços externos
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Google Calendar */}
                  <Card className="border-border/50 bg-muted/20">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">Google Calendar (organização)</h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            Conecte sua conta para ler/escrever eventos de agenda
                          </p>
                          <div className="space-y-1 text-sm">
                            <p>
                              <span className="font-medium">Status:</span>{" "}
                              <Badge variant="secondary">DISCONNECTED</Badge>
                            </p>
                            <p className="text-muted-foreground">
                              Última sincronização: Nunca
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm">Conectar</Button>
                          <Button size="sm" variant="outline">
                            Testar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* WhatsApp */}
                  <Card className="border-border/50 bg-muted/20">
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold mb-1">WhatsApp</h3>
                            <p className="text-sm text-muted-foreground">
                              Configurações de integração com WhatsApp
                            </p>
                          </div>
                        </div>

                        <div className="pl-4 border-l-2 border-primary/20 space-y-4">
                          <div>
                            <h4 className="font-medium mb-2">API oficial (Meta Cloud)</h4>
                            <p className="text-sm text-muted-foreground mb-3">
                              Gerencie o link de Embedded Signup sem sair do painel
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>DDI</Label>
                                <Input placeholder="55" />
                              </div>
                              <div className="space-y-2">
                                <Label>Telefone (E.164)</Label>
                                <Input placeholder="+5511999990000" />
                              </div>
                            </div>
                            <Button className="mt-4" size="sm">
                              Iniciar Embedded Signup
                            </Button>
                          </div>

                          <div>
                            <h4 className="font-medium mb-2">WhatsApp Web</h4>
                            <p className="text-sm text-muted-foreground mb-3">
                              Inicie uma sessão temporária do WhatsApp Web direto do painel
                            </p>
                            <Button variant="outline" size="sm">
                              Gerar QR code (WhatsApp Web)
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Autopilot Tab */}
            <TabsContent value="autopilot" className="space-y-6">
              <Card className="border-border/50 backdrop-blur-sm bg-card/95 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <Bot className="h-5 w-5 text-primary" />
                        <CardTitle>EV4 Autopilot</CardTitle>
                        <Badge variant="outline">BETA</Badge>
                      </div>
                      <CardDescription className="mt-2">
                        Ative o Autopilot para configurar modelos e políticas
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-3">
                      <Switch defaultChecked />
                      <span className="text-sm">
                        Ativo - será salvo ao clicar em Salvar
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Assistente com IA Section */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Assistente com IA</h3>
                    <p className="text-sm text-muted-foreground">
                      Defina o modelo padrão e mensagens auxiliares do copiloto com IA.
                    </p>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="aiModel">MODELO OPENAI</Label>
                        <Select defaultValue="gpt-4o-mini">
                          <SelectTrigger id="aiModel">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="gpt-4o-mini">gpt-4o-mini</SelectItem>
                            <SelectItem value="gpt-4o">gpt-4o</SelectItem>
                            <SelectItem value="gpt-4-turbo">gpt-4-turbo</SelectItem>
                          </SelectContent>
                        </Select>
                        <div className="flex justify-between text-xs text-muted-foreground mt-2">
                          <span>Uso mensal de mensagens: 0 / 1000</span>
                          <span>Uso mensal de tokens: 0 / 50000</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Período: 31 de out. — 30 de nov.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="bg-muted/30">
                          <CardContent className="pt-6">
                            <p className="text-sm font-medium text-muted-foreground mb-1">
                              MODO PADRÃO
                            </p>
                            <p className="text-lg font-semibold">Indisponível</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Comportamento padrão de automação
                            </p>
                          </CardContent>
                        </Card>

                        <Card className="bg-muted/30">
                          <CardContent className="pt-6">
                            <p className="text-sm font-medium text-muted-foreground mb-1">
                              CONVERSAS PAUSADAS
                            </p>
                            <p className="text-lg font-semibold">Indisponível</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Handoffs em andamento e pausas
                            </p>
                          </CardContent>
                        </Card>

                        <Card className="bg-muted/30">
                          <CardContent className="pt-6">
                            <p className="text-sm font-medium text-muted-foreground mb-1">
                              ÚLTIMA ATUALIZAÇÃO DA BASE
                            </p>
                            <p className="text-lg font-semibold">Indisponível</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Sincronize artigos quando necessário
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>

                  {/* Sub-tabs for Autopilot configuration */}
                  <Tabs defaultValue="politicas" className="space-y-6">
                    <TabsList className="inline-flex flex-wrap gap-2 bg-muted/30 h-auto p-2">
                      <TabsTrigger value="politicas">Políticas</TabsTrigger>
                      <TabsTrigger value="ferramentas">Ferramentas</TabsTrigger>
                      <TabsTrigger value="linguagem">Linguagem & Persona</TabsTrigger>
                      <TabsTrigger value="conhecimento">Base de conhecimento</TabsTrigger>
                      <TabsTrigger value="analytics" disabled>
                        Analytics <Badge variant="outline" className="ml-1 text-xs">EM BREVE</Badge>
                      </TabsTrigger>
                      <TabsTrigger value="handoff">Fila de Handoff</TabsTrigger>
                    </TabsList>

                    {/* Políticas Tab */}
                    <TabsContent value="politicas" className="space-y-6">
                      <Card className="bg-muted/20 border-border/50">
                        <CardHeader>
                          <CardTitle className="text-lg">Política global</CardTitle>
                          <CardDescription>
                            Aplica-se a todos os canais por padrão
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="space-y-4">
                            <div>
                              <Label>MODO</Label>
                              <Select defaultValue="assistido">
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="assistido">Assistido</SelectItem>
                                  <SelectItem value="automatico">Automático</SelectItem>
                                  <SelectItem value="manual">Manual</SelectItem>
                                </SelectContent>
                              </Select>
                              <p className="text-xs text-muted-foreground mt-1">
                                O agente prepara rascunhos e exige confirmação humana para ações críticas.
                              </p>
                            </div>

                            <div className="space-y-3">
                              <Label>MÁX. AÇÕES POR SESSÃO</Label>
                              <Input placeholder="Padrão" />
                              <p className="text-xs text-muted-foreground">
                                Defina um teto de ações do agente por conversa automatizada.
                              </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <Label>Permitir remarcação</Label>
                                  <div className="flex items-center gap-2">
                                    <input type="radio" name="remark" value="yes" defaultChecked />
                                    <Label className="text-sm font-normal">Sim</Label>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <input type="checkbox" defaultChecked />
                                  <Label className="text-sm font-normal">Exigir sinal</Label>
                                </div>
                              </div>

                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <Label>Permitir cancelamento</Label>
                                  <div className="flex items-center gap-2">
                                    <input type="radio" name="cancel" value="yes" defaultChecked />
                                    <Label className="text-sm font-normal">Sim</Label>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <input type="checkbox" />
                                  <Label className="text-sm font-normal">Cobrar automaticamente no no-show</Label>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-3">
                              <Label>IDIOMA</Label>
                              <Input placeholder="pt-BR" />
                            </div>

                            <div className="space-y-3">
                              <Label>TOM</Label>
                              <Input placeholder="Acolhedor, objetivo" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-3">
                                <Label>TAXA FIXA DE NO-SHOW (CENTAVOS)</Label>
                                <Input placeholder="ex.: 5000 para R$ 50,00" />
                              </div>

                              <div className="space-y-3">
                                <Label>PERCENTUAL DE NO-SHOW (%)</Label>
                                <Input placeholder="ex.: 50 para 50%" />
                              </div>
                            </div>
                          </div>

                          <Button onClick={handleSave} className="w-full">
                            <Save className="h-4 w-4 mr-2" />
                            Salvar política
                          </Button>
                        </CardContent>
                      </Card>

                      {/* Políticas por profissional */}
                      <Card className="bg-muted/20 border-border/50">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div>
                              <CardTitle className="text-lg">Políticas por profissional</CardTitle>
                              <CardDescription>
                                Ainda não há políticas por profissional. Use o botão acima para personalizar por médico.
                              </CardDescription>
                            </div>
                            <Button size="sm" variant="outline">
                              Adicionar política de profissional
                            </Button>
                          </div>
                        </CardHeader>
                      </Card>

                      {/* Políticas por paciente */}
                      <Card className="bg-muted/20 border-border/50">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div>
                              <CardTitle className="text-lg">Políticas por paciente</CardTitle>
                              <CardDescription>
                                Políticas por paciente permitem desativar a automação para casos específicos ou aplicar limites mais rígidos.
                              </CardDescription>
                            </div>
                            <Button size="sm" variant="outline">
                              Adicionar política de paciente
                            </Button>
                          </div>
                        </CardHeader>
                      </Card>
                    </TabsContent>

                    {/* Ferramentas Tab */}
                    <TabsContent value="ferramentas" className="space-y-6">
                      <Card className="bg-muted/20 border-border/50">
                        <CardHeader>
                          <CardTitle className="text-lg">Ferramentas do agente</CardTitle>
                          <CardDescription>
                            Controle o que o Autopilot pode executar e quais limites.
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="space-y-4">
                            <div>
                              <Label>Máximo de ações por sessão</Label>
                              <Select defaultValue="sistema">
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="sistema">Padrão do sistema</SelectItem>
                                  <SelectItem value="5">5 ações</SelectItem>
                                  <SelectItem value="10">10 ações</SelectItem>
                                  <SelectItem value="unlimited">Sem limite</SelectItem>
                                </SelectContent>
                              </Select>
                              <p className="text-xs text-muted-foreground mt-1">
                                Defina um teto de ações que o Autopilot pode executar por conversa automatizada.
                              </p>
                            </div>

                            <div className="space-y-4">
                              <p className="text-sm font-medium">Remarcações de paciente / semana</p>
                              <Select defaultValue="unlimited">
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="unlimited">Sem limite</SelectItem>
                                  <SelectItem value="1">1 remarcação</SelectItem>
                                  <SelectItem value="2">2 remarcações</SelectItem>
                                  <SelectItem value="3">3 remarcações</SelectItem>
                                </SelectContent>
                              </Select>
                              <p className="text-xs text-muted-foreground">
                                Deixe vazio para sem limite.
                              </p>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <h4 className="font-semibold">AGENDAS</h4>
                            <div className="grid grid-cols-2 gap-3">
                              {[
                                { name: "Ativar 1ª", badge: "Ativar 1ª", enabled: true },
                                { name: "Bloquear O", badge: "Bloquear O", enabled: false },
                                { name: "Achar horário", badge: "Achar horário", enabled: true },
                                { name: "Restaurar último", badge: "Restaurar último", enabled: false },
                              ].map((tool) => (
                                <div key={tool.name} className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
                                  <div className="flex items-center gap-2">
                                    <Badge variant={tool.enabled ? "default" : "secondary"} className="text-xs">
                                      {tool.badge}
                                    </Badge>
                                  </div>
                                  <Switch defaultChecked={tool.enabled} />
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-3">
                            <h4 className="font-semibold">AGENDA</h4>
                            <div className="space-y-2">
                              {[
                                { name: "Criar consultas", code: "appointment.create", enabled: true },
                                { name: "Remarcar consultas", code: "appointment.reschedule", enabled: true },
                                { name: "Cancelar consultas", code: "appointment.cancel", enabled: true },
                                { name: "Cadastrar em lista de espera", code: "waitlist.add", enabled: true },
                                { name: "Incluir pacientes na fila de espera para encaixe específico", enabled: true },
                              ].map((tool, idx) => (
                                <div key={idx} className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
                                  <div className="flex-1">
                                    <p className="font-medium text-sm">{tool.name}</p>
                                    {tool.code && (
                                      <p className="text-xs text-muted-foreground mt-1">{tool.code}</p>
                                    )}
                                  </div>
                                  <Switch defaultChecked={tool.enabled} />
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-3">
                            <h4 className="font-semibold">PACIENTES</h4>
                            <div className="space-y-2">
                              {[
                                { name: "Consultar cadastro de paciente", code: "patient.lookup", enabled: true },
                                { name: "Criar novo paciente", code: "patient.create", enabled: true },
                              ].map((tool) => (
                                <div key={tool.code} className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
                                  <div className="flex-1">
                                    <p className="font-medium text-sm">{tool.name}</p>
                                    <p className="text-xs text-muted-foreground mt-1">{tool.code}</p>
                                  </div>
                                  <Switch defaultChecked={tool.enabled} />
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-3">
                            <h4 className="font-semibold">FINANCEIRO</h4>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
                                <div className="flex-1">
                                  <p className="font-medium text-sm">Gerar link de pagamento</p>
                                  <p className="text-xs text-muted-foreground mt-1">payment.link</p>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    Envia link seguro (PIX/Crédito) para garantir slot ou quitar pendências.
                                  </p>
                                </div>
                                <Switch defaultChecked />
                              </div>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <h4 className="font-semibold">CONHECIMENTOS</h4>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
                                <div className="flex-1">
                                  <p className="font-medium text-sm">Consultar base de conhecimento</p>
                                  <p className="text-xs text-muted-foreground mt-1">kb.search</p>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    Busca artigos adicionados para enriquecer as respostas com informações administrativas.
                                  </p>
                                </div>
                                <Switch defaultChecked />
                              </div>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <h4 className="font-semibold">OPERAÇÃO</h4>
                            <div className="space-y-2">
                              {[
                                { name: "Consultar políticas", code: "policy.check", desc: "Revisa políticas ativas para enriquecer tomada de decisão e aderência a limites." },
                                { name: "Pausar automação / handoff", code: "handoff.create", desc: "Aciona pausas e redireciona conversa para equipe humana. Seleciona o responsável mais apto (1º livre ativa linha online)." },
                                { name: "Retomar automação", code: "automation.resume", desc: "Remove a pausa e retoma a automação humana." },
                              ].map((tool) => (
                                <div key={tool.code} className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
                                  <div className="flex-1">
                                    <p className="font-medium text-sm">{tool.name}</p>
                                    <p className="text-xs text-muted-foreground mt-1">{tool.code}</p>
                                    <p className="text-xs text-muted-foreground mt-1">{tool.desc}</p>
                                  </div>
                                  <Switch defaultChecked />
                                </div>
                              ))}
                            </div>
                          </div>

                          <Button onClick={handleSave} className="w-full">
                            <Save className="h-4 w-4 mr-2" />
                            Salvar configurações
                          </Button>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    {/* Linguagem & Persona Tab */}
                    <TabsContent value="linguagem" className="space-y-6">
                      <Card className="bg-muted/20 border-border/50">
                        <CardHeader>
                          <CardTitle className="text-lg">Linguagem & Persona</CardTitle>
                          <CardDescription>
                            Defina idioma, tom de voz e mensagens padrão usadas pelo agente.
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="space-y-4">
                            <div className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg">
                              <Badge variant="outline">Idioma: pt-BR</Badge>
                              <Badge variant="outline">Tom: Empático</Badge>
                              <Badge variant="outline">Templates: 0</Badge>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Idioma principal</Label>
                                <Select defaultValue="pt-BR">
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                                    <SelectItem value="en-US">English (US)</SelectItem>
                                    <SelectItem value="es-ES">Español</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              <div className="space-y-2">
                                <Label>Tom de voz</Label>
                                <Input placeholder="Empático + objetivo + acolhedor" />
                                <p className="text-xs text-muted-foreground">
                                  Use vírgulas para múltiplos (ex.: Empático, Objetivo)
                                </p>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label>Mensagem de boas-vindas</Label>
                              <Textarea
                                placeholder="Olá, sou o assistente virtual da clínica. Como posso ajudar?"
                                rows={3}
                              />
                            </div>

                            <div className="space-y-2">
                              <Label>Template de confirmação</Label>
                              <Textarea
                                placeholder="Confirma consulta com Dr(a). {professionalName} em {date} às {time}? Responda 1 para confirmar, 2 para outro horário ou 3 para cancelar."
                                rows={3}
                              />
                            </div>

                            <div className="space-y-2">
                              <Label>Template de handoff</Label>
                              <Textarea
                                placeholder="Vou transferir esta conversa para nossa equipe humana para te apoiar melhor. Só um momento!"
                                rows={3}
                              />
                            </div>

                            <div className="space-y-2">
                              <Label>Disclaimer administrativo</Label>
                              <Textarea
                                placeholder="Este canal automatizado trata apenas de logística (agendamentos, confirmações, políticas). Para dúvidas clínicas, aguarde o(a) profissional."
                                rows={3}
                              />
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button variant="outline" className="flex-1">
                              Restaurar valores salvos
                            </Button>
                            <Button onClick={handleSave} className="flex-1">
                              <Save className="h-4 w-4 mr-2" />
                              Salvar persona
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Mensagem de fallback */}
                      <Card className="bg-muted/20 border-border/50">
                        <CardHeader>
                          <CardTitle className="text-lg">Mensagem de fallback</CardTitle>
                          <CardDescription>
                            Texto enviado quando não há modelo disponível ou quando o agente precisa direcionar imediatamente para um humano.
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Textarea
                            placeholder="Boa tarde! Tudo bem? Sou o assistente virtual da clínica. Posso ajudar a marcar, remarcar ou tirar dúvidas sobre horários disponíveis. Quer ver horários disponíveis?"
                            rows={4}
                          />
                          <Button onClick={handleSave} className="w-full mt-4">
                            <Save className="h-4 w-4 mr-2" />
                            Salvar fallback
                          </Button>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    {/* Base de conhecimento Tab */}
                    <TabsContent value="conhecimento" className="space-y-6">
                      <Card className="bg-muted/20 border-border/50">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div>
                              <CardTitle className="text-lg">Base de conhecimento</CardTitle>
                              <CardDescription>
                                Buscar título ou conteúdo
                              </CardDescription>
                            </div>
                            <Button size="sm" className="gap-2">
                              <Plus className="h-4 w-4" />
                              Novo artigo
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="flex gap-2">
                            <Input placeholder="Ex: preparo, endereço, estacionamento" className="flex-1" />
                            <Select defaultValue="todos">
                              <SelectTrigger className="w-40">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="todos">Todos</SelectItem>
                                <SelectItem value="interno">Interno</SelectItem>
                                <SelectItem value="externo">Externo</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button>Filtrar</Button>
                            <Button variant="outline">Limpar</Button>
                          </div>

                          <div className="space-y-3">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Badge variant="secondary">VISIBILIDADE</Badge>
                              <span>Interno - apenas disponível para busca interna (copiloto)</span>
                            </div>

                            <div className="space-y-3">
                              <Label>TAGS (SEPARAR POR VÍRGULA)</Label>
                              <Input placeholder="pagamentos, preparo" />
                            </div>

                            <div className="space-y-3">
                              <Label>PROFESSIONAL (OPCIONAL)</Label>
                              <Input placeholder="UUID do profissional" />
                            </div>

                            <div className="space-y-3">
                              <Label>ORGANIZAÇÃO (OPCIONAL)</Label>
                              <Input placeholder="UUID da organização" />
                            </div>

                            <div className="space-y-3">
                              <Label>CONTEÚDO (MARKDOWN)</Label>
                              <Textarea
                                placeholder="# Título\n\n**Texto** em markdown..."
                                rows={8}
                                className="font-mono text-sm"
                              />
                            </div>
                          </div>

                          <Button className="w-full">
                            <Upload className="h-4 w-4 mr-2" />
                            Importar Markdown
                          </Button>

                          {/* Empty state */}
                          <div className="text-center py-12 border-2 border-dashed border-border rounded-lg">
                            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <p className="text-sm text-muted-foreground">
                              Nenhum artigo cadastrado ainda.
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Mostrando 1 a 0 de 0 registros
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    {/* Fila de Handoff Tab */}
                    <TabsContent value="handoff" className="space-y-6">
                      <Card className="bg-muted/20 border-border/50">
                        <CardHeader>
                          <CardTitle className="text-lg">Fila de Handoff</CardTitle>
                          <CardDescription>
                            Conversas pausadas aguardando intervenção humana
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="text-center py-12 border-2 border-dashed border-border rounded-lg">
                            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <p className="text-sm text-muted-foreground">
                              Nenhuma conversa na fila de handoff no momento
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              As conversas pausadas aparecerão aqui para atendimento manual
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Telemedicina Tab */}
            <TabsContent value="telemedicina" className="space-y-6">
              <Card className="border-border/50 backdrop-blur-sm bg-card/95 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <Video className="h-5 w-5 text-primary" />
                        <CardTitle>Telemedicina</CardTitle>
                      </div>
                      <CardDescription className="mt-2">
                        Ative a funcionalidade e defina política e retenção das sessões online
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-3">
                      <Switch
                        checked={telemedicine.active}
                        onCheckedChange={(checked) =>
                          setTelemedicine({ ...telemedicine, active: checked })
                        }
                      />
                      <span className="text-sm">
                        {telemedicine.active ? "Ativo" : "Inativo"} - será salvo ao clicar em
                        Salvar
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="roomTheme">Tema da sala</Label>
                      <Select
                        value={telemedicine.roomTheme}
                        onValueChange={(value) =>
                          setTelemedicine({ ...telemedicine, roomTheme: value })
                        }
                      >
                        <SelectTrigger id="roomTheme">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Padrão do sistema">Padrão do sistema</SelectItem>
                          <SelectItem value="Profissional">Profissional</SelectItem>
                          <SelectItem value="Moderno">Moderno</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        Quando vazio, usa o tema padrão/branding
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="highlightColor">Cor de destaque da sala</Label>
                      <div className="flex gap-2">
                        <Input
                          id="highlightColor"
                          type="color"
                          value={telemedicine.highlightColor}
                          onChange={(e) =>
                            setTelemedicine({
                              ...telemedicine,
                              highlightColor: e.target.value,
                            })
                          }
                          className="w-20 h-10"
                        />
                        <Input
                          value={telemedicine.highlightColor}
                          onChange={(e) =>
                            setTelemedicine({
                              ...telemedicine,
                              highlightColor: e.target.value,
                            })
                          }
                          placeholder="#3b82f6"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Sobrescreve a cor primária do LiveKit (botões e estados ativos)
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label>Compatibilidade de rede (TURN/TLS)</Label>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">
                              Use em redes corporativas/estritas. Pode aumentar a latência.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch />
                        <span className="text-sm">Forçar conexão via TURN/TLS (relay)</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="retentionDays">Retenção de gravações (dias)</Label>
                      <Input
                        id="retentionDays"
                        type="number"
                        value={telemedicine.retentionDays}
                        onChange={(e) =>
                          setTelemedicine({
                            ...telemedicine,
                            retentionDays: e.target.value,
                          })
                        }
                        placeholder="Ex.: 30"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Pré-visualização</Label>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4" />
                        Microfone
                      </Button>
                      <Button variant="outline" size="sm">
                        <Video className="h-4 w-4" />
                        Câmera
                      </Button>
                      <Button variant="outline" size="sm">
                        <Globe className="h-4 w-4" />
                        Compartilhar tela
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Amostra de controles com sua cor/tema
                    </p>
                  </div>

                  <Button onClick={handleSave} className="w-full gap-2">
                    <Save className="h-4 w-4" />
                    Salvar
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Fiscal Tab */}
            <TabsContent value="fiscal" className="space-y-6">
              <Card className="border-border/50 backdrop-blur-sm bg-card/95 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        <CardTitle>Notas Fiscais</CardTitle>
                      </div>
                      <CardDescription className="mt-2">
                        Configure a emissão de notas fiscais eletrônicas
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-3">
                      <Switch defaultChecked />
                      <span className="text-sm">Ativar emissão de NF</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Provedor</Label>
                      <Select defaultValue="selecione">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="selecione">Selecione</SelectItem>
                          <SelectItem value="nfse">NFSe</SelectItem>
                          <SelectItem value="notacarioca">Nota Carioca</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Ambiente</Label>
                      <Select defaultValue="homologacao">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="homologacao">Homologação</SelectItem>
                          <SelectItem value="producao">Produção</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Código do Município (IBGE)</Label>
                      <Input placeholder="Ex.: 3550308" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Razão Social</Label>
                      <Input />
                    </div>

                    <div className="space-y-2">
                      <Label>CNPJ</Label>
                      <Input />
                    </div>

                    <div className="space-y-2">
                      <Label>Inscrição Municipal (IM)</Label>
                      <Input />
                    </div>

                    <div className="space-y-2">
                      <Label>E-mail do emissor</Label>
                      <Input type="email" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Credenciais (JSON)</Label>
                    <Textarea
                      placeholder='{"}"'
                      rows={6}
                      className="font-mono text-sm"
                    />
                    <p className="text-xs text-muted-foreground">
                      Cole as chaves exigidas pelo provedor no formato JSON. Ex.: {"{"}"apiKey":
                      "xxx"{"}"}.
                    </p>
                  </div>

                  <Button onClick={handleSave} className="w-full gap-2">
                    <Save className="h-4 w-4" />
                    Salvar configurações
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Acessos Tab */}
            <TabsContent value="acessos" className="space-y-6">
              <Card className="border-border/50 backdrop-blur-sm bg-card/95 shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <CardTitle>Controle de Acessos</CardTitle>
                  </div>
                  <CardDescription>
                    Gerencie permissões e acessos de usuários
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Configurações de acesso em desenvolvimento
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </TooltipProvider>
  );
}
