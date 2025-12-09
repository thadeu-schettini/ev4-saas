import { useState } from "react";
import { 
  User, Camera, Trash2, Save, Clock, Building2, Globe, 
  Calendar, Briefcase, Languages, Shield, Bell, 
  Video, Link2, Stethoscope, Plus, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PageHeader } from "@/components/ui/page-header";
import { PageContainer, PageContent } from "@/components/ui/page-container";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

// Mock profile data
const mockProfile = {
  firstName: "Ricardo",
  lastName: "Silva",
  email: "ricardo@clinica.com",
  phone: "(11) 99999-1234",
  crm: "CRM/SP 123456",
  specialty: ["Cardiologia", "Clínica Geral"],
  languages: ["Português (Brasil)", "Inglês"],
  timezone: "America/Sao_Paulo",
  organization: "Clinica Demo",
  department: "Cardiologia",
  role: "Médico",
  avatarUrl: "",
  realizeAppointments: true,
  status: "active",
};

const mockServices = [
  { id: "1", name: "Consulta Cardiológica", clinic: "Clínica Central", capacity: 1, active: true },
  { id: "2", name: "Eletrocardiograma", clinic: "Clínica Central", capacity: 2, active: true },
  { id: "3", name: "Consulta de Retorno", clinic: "Clínica Central", capacity: 1, active: false },
];

const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

export default function MeuPerfil() {
  const [activeTab, setActiveTab] = useState("dados");
  const [profile, setProfile] = useState(mockProfile);
  const [services, setServices] = useState(mockServices);
  const [selectedDays, setSelectedDays] = useState(["Seg", "Ter", "Qua", "Qui", "Sex"]);
  const [scheduleSettings, setScheduleSettings] = useState({
    allowSameDayBooking: true,
    minAdvanceHours: 0,
    slotDuration: 30,
  });
  const [googleCalendarConnected, setGoogleCalendarConnected] = useState(false);
  const [newSpecialty, setNewSpecialty] = useState("");

  const handleSave = () => {
    toast.success("Perfil atualizado com sucesso!");
  };

  const handleAddSpecialty = () => {
    if (newSpecialty.trim() && !profile.specialty.includes(newSpecialty.trim())) {
      setProfile(prev => ({
        ...prev,
        specialty: [...prev.specialty, newSpecialty.trim()]
      }));
      setNewSpecialty("");
    }
  };

  const handleRemoveSpecialty = (spec: string) => {
    setProfile(prev => ({
      ...prev,
      specialty: prev.specialty.filter(s => s !== spec)
    }));
  };

  const toggleDay = (day: string) => {
    setSelectedDays(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  return (
    <PageContainer>
      <PageHeader
        title="Meu Perfil"
        description="Gerencie suas informações pessoais, agenda e configurações"
        icon={User}
        iconColor="from-blue-500 to-indigo-500"
      >
        <Button onClick={handleSave} className="gap-2">
          <Save className="h-4 w-4" />
          Salvar Alterações
        </Button>
      </PageHeader>

      <PageContent>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar Profile Card */}
          <div className="lg:col-span-4 xl:col-span-3">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm sticky top-20">
              <CardContent className="p-6">
                {/* Avatar Section */}
                <div className="flex flex-col items-center text-center">
                  <div className="relative group">
                    <Avatar className="h-32 w-32 border-4 border-background shadow-xl">
                      <AvatarImage src={profile.avatarUrl} />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-primary/60 text-primary-foreground text-4xl font-bold">
                        {profile.firstName[0]}{profile.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="mt-4 text-xl font-bold">Dr(a). {profile.firstName} {profile.lastName}</h3>
                  <p className="text-sm text-muted-foreground">{profile.email}</p>
                  
                  <div className="flex items-center gap-2 mt-3">
                    <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                      Ativo
                    </Badge>
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                      Atende
                    </Badge>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Camera className="h-4 w-4" />
                      Alterar foto
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2 text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                      Remover
                    </Button>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Quick Info */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Telefone</span>
                    <span className="font-medium">{profile.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Timezone</span>
                    <span className="font-medium">America/Sao_Paulo</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Organização</span>
                    <span className="font-medium">{profile.organization}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Idiomas</span>
                    <span className="font-medium">{profile.languages.join(", ")}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Tabs */}
          <div className="lg:col-span-8 xl:col-span-9">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <div className="border-b px-6 pt-4">
                  <TabsList className="w-full justify-start h-auto p-0 bg-transparent">
                    <TabsTrigger 
                      value="dados" 
                      className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 pb-3"
                    >
                      Dados
                    </TabsTrigger>
                    <TabsTrigger 
                      value="agenda" 
                      className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 pb-3"
                    >
                      Agenda
                    </TabsTrigger>
                    <TabsTrigger 
                      value="servicos" 
                      className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 pb-3"
                    >
                      Serviços
                    </TabsTrigger>
                    <TabsTrigger 
                      value="calendario" 
                      className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 pb-3"
                    >
                      Calendário
                    </TabsTrigger>
                  </TabsList>
                </div>

                <div className="p-6">
                  {/* Tab: Dados */}
                  <TabsContent value="dados" className="m-0 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Nome</Label>
                        <Input 
                          id="firstName" 
                          value={profile.firstName}
                          onChange={(e) => setProfile(p => ({ ...p, firstName: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Sobrenome</Label>
                        <Input 
                          id="lastName" 
                          value={profile.lastName}
                          onChange={(e) => setProfile(p => ({ ...p, lastName: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">E-mail</Label>
                        <Input 
                          id="email" 
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile(p => ({ ...p, email: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefone</Label>
                        <Input 
                          id="phone" 
                          value={profile.phone}
                          onChange={(e) => setProfile(p => ({ ...p, phone: e.target.value }))}
                        />
                      </div>
                    </div>

                    {/* Specialties */}
                    <div className="space-y-2">
                      <Label>Especialidades</Label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {profile.specialty.map((spec) => (
                          <Badge key={spec} variant="secondary" className="gap-1 pr-1">
                            {spec}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-4 w-4 p-0 hover:bg-transparent"
                              onClick={() => handleRemoveSpecialty(spec)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input 
                          placeholder="Adicionar especialidade..."
                          value={newSpecialty}
                          onChange={(e) => setNewSpecialty(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handleAddSpecialty()}
                        />
                        <Button variant="outline" onClick={handleAddSpecialty}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">Pressione Enter para incluir cada especialidade.</p>
                    </div>

                    {/* Languages */}
                    <div className="space-y-2">
                      <Label>Idiomas</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecionar idiomas" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pt-br">Português (Brasil)</SelectItem>
                          <SelectItem value="en">Inglês</SelectItem>
                          <SelectItem value="es">Espanhol</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {profile.languages.map((lang) => (
                          <Badge key={lang} variant="secondary" className="gap-1 pr-1">
                            {lang}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-4 w-4 p-0 hover:bg-transparent"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="timezone">Fuso horário</Label>
                        <Select defaultValue="America/Sao_Paulo">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="America/Sao_Paulo">America/Sao_Paulo (UTC-03:00)</SelectItem>
                            <SelectItem value="America/Fortaleza">America/Fortaleza (UTC-03:00)</SelectItem>
                            <SelectItem value="America/Manaus">America/Manaus (UTC-04:00)</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">Opcional. Escolha o fuso horário usado pelo profissional.</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="organization">Organização</Label>
                        <Select defaultValue="clinica-demo">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="clinica-demo">Clínica Demo</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="department">Departamento</Label>
                        <Input 
                          id="department" 
                          value={profile.department}
                          onChange={(e) => setProfile(p => ({ ...p, department: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role">Cargo / Função</Label>
                        <Input 
                          id="role" 
                          value={profile.role}
                          onChange={(e) => setProfile(p => ({ ...p, role: e.target.value }))}
                        />
                      </div>
                    </div>

                    {/* Realiza atendimentos */}
                    <div className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-muted/30">
                      <div className="space-y-0.5">
                        <Label>Realiza atendimentos</Label>
                        <p className="text-sm text-muted-foreground">Profissional está disponível para consultas</p>
                      </div>
                      <Switch 
                        checked={profile.realizeAppointments}
                        onCheckedChange={(checked) => setProfile(p => ({ ...p, realizeAppointments: checked }))}
                      />
                    </div>

                    {/* CRM */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="crm">CRM</Label>
                        <Input 
                          id="crm" 
                          value={profile.crm}
                          onChange={(e) => setProfile(p => ({ ...p, crm: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="avatarUrl">URL do avatar</Label>
                        <div className="flex gap-2">
                          <Input 
                            id="avatarUrl" 
                            placeholder="https://..."
                            value={profile.avatarUrl}
                            onChange={(e) => setProfile(p => ({ ...p, avatarUrl: e.target.value }))}
                          />
                          <Button variant="outline">Enviar foto</Button>
                          <Button variant="destructive" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Convênios */}
                    <div className="space-y-2">
                      <Label>Convênios</Label>
                      <div className="p-4 rounded-lg border border-dashed border-border text-center text-muted-foreground">
                        Nenhum convênio configurado
                      </div>
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button variant="outline">Voltar</Button>
                      <Button onClick={handleSave}>Salvar</Button>
                    </div>
                  </TabsContent>

                  {/* Tab: Agenda */}
                  <TabsContent value="agenda" className="m-0 space-y-6">
                    {/* Availability Rules */}
                    <div className="space-y-4">
                      <h3 className="font-semibold">Regras de disponibilidade</h3>
                      
                      <div className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-muted/30">
                        <div className="space-y-0.5">
                          <Label>Permitir agendamento no mesmo dia</Label>
                          <p className="text-sm text-muted-foreground">Defina 0 para sem restrição.</p>
                        </div>
                        <Switch 
                          checked={scheduleSettings.allowSameDayBooking}
                          onCheckedChange={(checked) => setScheduleSettings(s => ({ ...s, allowSameDayBooking: checked }))}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Antecedência mínima (horas)</Label>
                          <Input 
                            type="number" 
                            value={scheduleSettings.minAdvanceHours}
                            onChange={(e) => setScheduleSettings(s => ({ ...s, minAdvanceHours: Number(e.target.value) }))}
                          />
                          <p className="text-xs text-muted-foreground">Defina 0 para sem restrição.</p>
                        </div>
                        <div className="space-y-2">
                          <Label>Granularidade (min)</Label>
                          <Input 
                            type="number" 
                            value={scheduleSettings.slotDuration}
                            onChange={(e) => setScheduleSettings(s => ({ ...s, slotDuration: Number(e.target.value) }))}
                          />
                          <p className="text-xs text-muted-foreground">Tamanho dos slots de agenda (ex.: 30).</p>
                        </div>
                      </div>
                    </div>

                    {/* Week Days */}
                    <div className="space-y-2">
                      <Label>Dias da semana</Label>
                      <div className="flex flex-wrap gap-2">
                        {weekDays.map((day) => (
                          <Button
                            key={day}
                            variant={selectedDays.includes(day) ? "default" : "outline"}
                            size="sm"
                            onClick={() => toggleDay(day)}
                          >
                            {day}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Time Windows */}
                    <div className="space-y-4">
                      <div>
                        <Label>Janelas por dia</Label>
                        <p className="text-sm text-muted-foreground">Defina horário de abertura e fechamento por dia. Não é necessário adicionar intervalos.</p>
                      </div>
                      
                      <div className="space-y-3">
                        {weekDays.map((day) => (
                          <div key={day} className="flex items-center gap-4">
                            <span className="w-10 font-medium text-primary">{day}</span>
                            <Input type="time" className="w-24" placeholder="--:--" />
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">–</span>
                            <Input type="time" className="w-24" placeholder="--:--" />
                            <Clock className="h-4 w-4 text-muted-foreground" />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button>Aplicar</Button>
                    </div>

                    <Separator />

                    {/* Copy from clinic */}
                    <div className="space-y-2">
                      <Label>Copiar horários da clínica</Label>
                      <div className="flex flex-wrap items-center gap-4">
                        <Select>
                          <SelectTrigger className="w-48">
                            <SelectValue placeholder="Clínica Central" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="central">Clínica Central</SelectItem>
                          </SelectContent>
                        </Select>
                        <div className="flex items-center gap-2">
                          <Checkbox id="overwrite" />
                          <Label htmlFor="overwrite" className="text-sm font-normal">Sobrescrever existentes</Label>
                        </div>
                        <span className="text-sm text-muted-foreground">Granularidade dos slots permanece o padrão (30 min).</span>
                        <Button variant="outline">Copiar p/ profissionais (vazio)</Button>
                      </div>
                    </div>

                    <Separator />

                    {/* Exceptions */}
                    <div className="space-y-4">
                      <h3 className="font-semibold">Exceções de agenda</h3>
                      <p className="text-sm text-muted-foreground">Nenhuma exceção.</p>
                      
                      <div className="flex flex-wrap items-center gap-4">
                        <div className="space-y-2">
                          <Label>Tipo</Label>
                          <Select defaultValue="block">
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="block">BLOCK</SelectItem>
                              <SelectItem value="allow">ALLOW</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Data início</Label>
                          <Input type="date" className="w-36" />
                        </div>
                        <div className="space-y-2">
                          <Label>Data fim</Label>
                          <Input type="date" className="w-36" />
                        </div>
                        <div className="space-y-2">
                          <Label>Clínica</Label>
                          <Input className="w-24" placeholder="Clíni..." />
                        </div>
                        <div className="space-y-2">
                          <Label>S</Label>
                          <Select>
                            <SelectTrigger className="w-16">
                              <SelectValue placeholder="S" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="s">S</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <Button variant="secondary">Adicionar exceção</Button>
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button variant="outline">Voltar</Button>
                      <Button onClick={handleSave}>Salvar</Button>
                    </div>
                  </TabsContent>

                  {/* Tab: Serviços */}
                  <TabsContent value="servicos" className="m-0 space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold">Serviços atendidos</h3>
                      
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Serviço</TableHead>
                            <TableHead>Clínica</TableHead>
                            <TableHead>Capacidade</TableHead>
                            <TableHead>Ativo</TableHead>
                            <TableHead></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {services.map((service) => (
                            <TableRow key={service.id}>
                              <TableCell className="font-medium">{service.name}</TableCell>
                              <TableCell>{service.clinic}</TableCell>
                              <TableCell>
                                <Input 
                                  type="number" 
                                  value={service.capacity} 
                                  className="w-16"
                                  onChange={(e) => {
                                    setServices(prev => prev.map(s => 
                                      s.id === service.id ? { ...s, capacity: Number(e.target.value) } : s
                                    ));
                                  }}
                                />
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Checkbox 
                                    checked={service.active}
                                    onCheckedChange={(checked) => {
                                      setServices(prev => prev.map(s => 
                                        s.id === service.id ? { ...s, active: !!checked } : s
                                      ));
                                    }}
                                  />
                                  <span>Ativo</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Button 
                                  variant="outline" 
                                  size="icon" 
                                  className="text-destructive hover:text-destructive"
                                  onClick={() => setServices(prev => prev.filter(s => s.id !== service.id))}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>

                      {/* Add new service */}
                      <div className="flex flex-wrap items-end gap-4 p-4 rounded-lg border border-dashed border-border">
                        <div className="space-y-2 flex-1 min-w-48">
                          <Label>Serviço</Label>
                          <Input placeholder="Selecione..." />
                        </div>
                        <div className="space-y-2 min-w-40">
                          <Label>Clínica (opcional)</Label>
                          <Input placeholder="—" />
                        </div>
                        <div className="space-y-2 w-24">
                          <Label>Capacidade</Label>
                          <Input type="number" defaultValue={1} />
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox defaultChecked />
                          <Label className="font-normal">Ativo</Label>
                        </div>
                      </div>
                      <Button variant="secondary" className="gap-2">
                        <Plus className="h-4 w-4" />
                        Vincular serviço
                      </Button>
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button variant="outline">Voltar</Button>
                      <Button onClick={handleSave}>Salvar</Button>
                    </div>
                  </TabsContent>

                  {/* Tab: Calendário */}
                  <TabsContent value="calendario" className="m-0 space-y-6">
                    <Card className="border-border/50">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Calendar className="h-5 w-5" />
                          Sincronização com Google Calendar
                        </CardTitle>
                        <CardDescription>
                          Status da conta Google: {googleCalendarConnected ? "Conectado" : "Desconectado (DISCONNECTED)"}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Provider</Label>
                            <Input value="GOOGLE_CALENDAR" readOnly />
                          </div>
                          <div className="space-y-2">
                            <Label>Calendar ID</Label>
                            <div className="flex items-center gap-4">
                              <Input placeholder="primary ou ID do calendário" />
                              <div className="flex items-center gap-2">
                                <Switch 
                                  checked={googleCalendarConnected}
                                  onCheckedChange={setGoogleCalendarConnected}
                                />
                                <Label className="text-sm font-normal">Ativar sync</Label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline">Salvar</Button>
                          <Button>Sincronizar agora</Button>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="flex gap-2 pt-4">
                      <Button variant="outline">Voltar</Button>
                      <Button onClick={handleSave}>Salvar</Button>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </Card>
          </div>
        </div>
      </PageContent>
    </PageContainer>
  );
}
