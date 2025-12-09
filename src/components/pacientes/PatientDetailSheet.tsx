import { useState, useRef } from "react";
import { 
  X, Phone, Mail, Calendar, MapPin, FileText, DollarSign, Bell, 
  Edit, Save, Plus, Trash2, Upload, User, AlertTriangle, Camera,
  CreditCard, Heart, Building, Home as HomeIcon
} from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

interface Address {
  id: string;
  type: "home" | "work" | "other";
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  isMain: boolean;
}

interface Document {
  id: string;
  type: "rg" | "cpf" | "cnh" | "passport" | "healthPlan" | "other";
  number: string;
  issuer?: string;
  issueDate?: string;
  expiryDate?: string;
  notes?: string;
}

interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email?: string;
  isMain: boolean;
}

interface PatientDetailSheetProps {
  patient: Patient;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PatientDetailSheet({ patient, open, onOpenChange }: PatientDetailSheetProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("consultas");
  const [patientData, setPatientData] = useState({
    ...patient,
    rg: "12.345.678-9",
    gender: "male",
    maritalStatus: "married",
    occupation: "Engenheiro",
    bloodType: "O+",
    allergies: "Dipirona, Penicilina",
    notes: "",
  });
  
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "1",
      type: "home",
      street: "Rua das Flores",
      number: "123",
      complement: "Apto 45",
      neighborhood: "Jardim Primavera",
      city: "São Paulo",
      state: "SP",
      zipCode: "01234-567",
      isMain: true,
    },
  ]);

  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      type: "cpf",
      number: patient.cpf || "123.456.789-00",
    },
    {
      id: "2",
      type: "rg",
      number: "12.345.678-9",
      issuer: "SSP/SP",
    },
    {
      id: "3",
      type: "healthPlan",
      number: "1234567890",
      issuer: "Unimed",
      expiryDate: "2025-12-31",
    },
  ]);

  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([
    {
      id: "1",
      name: "Maria Silva",
      relationship: "Cônjuge",
      phone: "(11) 98765-4321",
      email: "maria@email.com",
      isMain: true,
    },
  ]);

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("A imagem deve ter no máximo 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      toast.success("Foto atualizada com sucesso!");
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    toast.success("Dados do paciente salvos com sucesso!");
  };

  const addAddress = () => {
    setAddresses(prev => [...prev, {
      id: String(Date.now()),
      type: "home",
      street: "",
      number: "",
      neighborhood: "",
      city: "",
      state: "",
      zipCode: "",
      isMain: false,
    }]);
  };

  const removeAddress = (id: string) => {
    setAddresses(prev => prev.filter(a => a.id !== id));
    toast.success("Endereço removido");
  };

  const addDocument = () => {
    setDocuments(prev => [...prev, {
      id: String(Date.now()),
      type: "other",
      number: "",
    }]);
  };

  const removeDocument = (id: string) => {
    setDocuments(prev => prev.filter(d => d.id !== id));
    toast.success("Documento removido");
  };

  const addEmergencyContact = () => {
    setEmergencyContacts(prev => [...prev, {
      id: String(Date.now()),
      name: "",
      relationship: "",
      phone: "",
      isMain: false,
    }]);
  };

  const removeEmergencyContact = (id: string) => {
    setEmergencyContacts(prev => prev.filter(c => c.id !== id));
    toast.success("Contato removido");
  };

  const getDocumentTypeName = (type: Document["type"]) => {
    const names: Record<Document["type"], string> = {
      rg: "RG",
      cpf: "CPF",
      cnh: "CNH",
      passport: "Passaporte",
      healthPlan: "Plano de Saúde",
      other: "Outro",
    };
    return names[type];
  };

  const getAddressTypeName = (type: Address["type"]) => {
    const names: Record<Address["type"], string> = {
      home: "Residencial",
      work: "Comercial",
      other: "Outro",
    };
    return names[type];
  };

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
              {/* Avatar with upload */}
              <div className="relative group">
                <Avatar className="h-20 w-20 border-4 border-background shadow-lg">
                  <AvatarImage src={avatarPreview || patient.avatar} />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-primary/60 text-primary-foreground text-2xl font-bold">
                    {patient.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <Camera className="h-6 w-6 text-white" />
                </button>
              </div>

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
            <div className="border-b px-4 sm:px-6 bg-card/50 backdrop-blur-sm overflow-x-auto">
              <TabsList className="w-full justify-start h-auto p-0 bg-transparent">
                <TabsTrigger value="consultas" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none whitespace-nowrap">
                  Consultas
                </TabsTrigger>
                <TabsTrigger value="perfil" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none whitespace-nowrap">
                  Perfil
                </TabsTrigger>
                <TabsTrigger value="enderecos" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none whitespace-nowrap">
                  Endereços
                </TabsTrigger>
                <TabsTrigger value="documentos" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none whitespace-nowrap">
                  Documentos
                </TabsTrigger>
                <TabsTrigger value="emergencia" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none whitespace-nowrap">
                  Emergência
                </TabsTrigger>
                <TabsTrigger value="financeiro" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none whitespace-nowrap">
                  Financeiro
                </TabsTrigger>
                <TabsTrigger value="notificacoes" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none whitespace-nowrap">
                  Notificações
                </TabsTrigger>
              </TabsList>
            </div>

            <ScrollArea className="flex-1">
              <div className="p-4 sm:p-6">
                {/* Tab: Consultas */}
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

                {/* Tab: Perfil */}
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
                            <Button size="sm" onClick={handleSave}>
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
                            <Input 
                              id="name" 
                              value={patientData.name}
                              onChange={(e) => setPatientData(p => ({ ...p, name: e.target.value }))}
                              disabled={!isEditing} 
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="birth">Data de nascimento</Label>
                            <Input
                              id="birth"
                              type="date"
                              value={patientData.birthDate}
                              onChange={(e) => setPatientData(p => ({ ...p, birthDate: e.target.value }))}
                              disabled={!isEditing}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">E-mail</Label>
                            <Input 
                              id="email" 
                              type="email" 
                              value={patientData.email}
                              onChange={(e) => setPatientData(p => ({ ...p, email: e.target.value }))}
                              disabled={!isEditing} 
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Telefone</Label>
                            <Input 
                              id="phone" 
                              value={patientData.phone}
                              onChange={(e) => setPatientData(p => ({ ...p, phone: e.target.value }))}
                              disabled={!isEditing} 
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="gender">Sexo</Label>
                            <Select 
                              value={patientData.gender} 
                              onValueChange={(v) => setPatientData(p => ({ ...p, gender: v }))}
                              disabled={!isEditing}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="male">Masculino</SelectItem>
                                <SelectItem value="female">Feminino</SelectItem>
                                <SelectItem value="other">Outro</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="maritalStatus">Estado Civil</Label>
                            <Select 
                              value={patientData.maritalStatus} 
                              onValueChange={(v) => setPatientData(p => ({ ...p, maritalStatus: v }))}
                              disabled={!isEditing}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="single">Solteiro(a)</SelectItem>
                                <SelectItem value="married">Casado(a)</SelectItem>
                                <SelectItem value="divorced">Divorciado(a)</SelectItem>
                                <SelectItem value="widowed">Viúvo(a)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="occupation">Profissão</Label>
                            <Input 
                              id="occupation" 
                              value={patientData.occupation}
                              onChange={(e) => setPatientData(p => ({ ...p, occupation: e.target.value }))}
                              disabled={!isEditing} 
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="bloodType">Tipo Sanguíneo</Label>
                            <Select 
                              value={patientData.bloodType} 
                              onValueChange={(v) => setPatientData(p => ({ ...p, bloodType: v }))}
                              disabled={!isEditing}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="A+">A+</SelectItem>
                                <SelectItem value="A-">A-</SelectItem>
                                <SelectItem value="B+">B+</SelectItem>
                                <SelectItem value="B-">B-</SelectItem>
                                <SelectItem value="AB+">AB+</SelectItem>
                                <SelectItem value="AB-">AB-</SelectItem>
                                <SelectItem value="O+">O+</SelectItem>
                                <SelectItem value="O-">O-</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="allergies">Alergias</Label>
                          <Input 
                            id="allergies" 
                            value={patientData.allergies}
                            onChange={(e) => setPatientData(p => ({ ...p, allergies: e.target.value }))}
                            disabled={!isEditing}
                            placeholder="Liste as alergias separadas por vírgula"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="notes">Observações</Label>
                          <Textarea 
                            id="notes" 
                            value={patientData.notes}
                            onChange={(e) => setPatientData(p => ({ ...p, notes: e.target.value }))}
                            disabled={!isEditing}
                            placeholder="Observações gerais sobre o paciente"
                            rows={3}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* Tab: Endereços */}
                <TabsContent value="enderecos" className="m-0">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Endereços</CardTitle>
                        <CardDescription>Cadastre e mantenha os endereços do paciente atualizados</CardDescription>
                      </div>
                      <Button size="sm" onClick={addAddress}>
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar
                      </Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {addresses.length === 0 ? (
                        <p className="text-sm text-muted-foreground text-center py-8">
                          Nenhum endereço cadastrado
                        </p>
                      ) : (
                        addresses.map((address) => (
                          <Card key={address.id} className="border-border/50">
                            <CardContent className="p-4 space-y-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  {address.type === "home" ? (
                                    <HomeIcon className="h-4 w-4 text-primary" />
                                  ) : address.type === "work" ? (
                                    <Building className="h-4 w-4 text-primary" />
                                  ) : (
                                    <MapPin className="h-4 w-4 text-primary" />
                                  )}
                                  <span className="font-medium">{getAddressTypeName(address.type)}</span>
                                  {address.isMain && (
                                    <Badge variant="secondary">Principal</Badge>
                                  )}
                                </div>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="text-destructive hover:text-destructive"
                                  onClick={() => removeAddress(address.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <div className="space-y-2">
                                  <Label>Tipo</Label>
                                  <Select 
                                    value={address.type}
                                    onValueChange={(v) => setAddresses(prev => prev.map(a => 
                                      a.id === address.id ? { ...a, type: v as Address["type"] } : a
                                    ))}
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="home">Residencial</SelectItem>
                                      <SelectItem value="work">Comercial</SelectItem>
                                      <SelectItem value="other">Outro</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label>CEP</Label>
                                  <Input 
                                    value={address.zipCode}
                                    onChange={(e) => setAddresses(prev => prev.map(a => 
                                      a.id === address.id ? { ...a, zipCode: e.target.value } : a
                                    ))}
                                    placeholder="00000-000"
                                  />
                                </div>
                                <div className="flex items-end gap-2">
                                  <Switch 
                                    checked={address.isMain}
                                    onCheckedChange={(checked) => setAddresses(prev => prev.map(a => 
                                      a.id === address.id ? { ...a, isMain: checked } : { ...a, isMain: checked ? false : a.isMain }
                                    ))}
                                  />
                                  <Label className="text-sm">Endereço principal</Label>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                                <div className="md:col-span-2 space-y-2">
                                  <Label>Rua</Label>
                                  <Input 
                                    value={address.street}
                                    onChange={(e) => setAddresses(prev => prev.map(a => 
                                      a.id === address.id ? { ...a, street: e.target.value } : a
                                    ))}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Número</Label>
                                  <Input 
                                    value={address.number}
                                    onChange={(e) => setAddresses(prev => prev.map(a => 
                                      a.id === address.id ? { ...a, number: e.target.value } : a
                                    ))}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Complemento</Label>
                                  <Input 
                                    value={address.complement || ""}
                                    onChange={(e) => setAddresses(prev => prev.map(a => 
                                      a.id === address.id ? { ...a, complement: e.target.value } : a
                                    ))}
                                  />
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <div className="space-y-2">
                                  <Label>Bairro</Label>
                                  <Input 
                                    value={address.neighborhood}
                                    onChange={(e) => setAddresses(prev => prev.map(a => 
                                      a.id === address.id ? { ...a, neighborhood: e.target.value } : a
                                    ))}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Cidade</Label>
                                  <Input 
                                    value={address.city}
                                    onChange={(e) => setAddresses(prev => prev.map(a => 
                                      a.id === address.id ? { ...a, city: e.target.value } : a
                                    ))}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Estado</Label>
                                  <Input 
                                    value={address.state}
                                    onChange={(e) => setAddresses(prev => prev.map(a => 
                                      a.id === address.id ? { ...a, state: e.target.value } : a
                                    ))}
                                  />
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Tab: Documentos */}
                <TabsContent value="documentos" className="m-0">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Documentos</CardTitle>
                        <CardDescription>Identificadores oficiais e convênio</CardDescription>
                      </div>
                      <Button size="sm" onClick={addDocument}>
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar
                      </Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {documents.length === 0 ? (
                        <p className="text-sm text-muted-foreground text-center py-8">
                          Nenhum documento cadastrado
                        </p>
                      ) : (
                        documents.map((doc) => (
                          <Card key={doc.id} className="border-border/50">
                            <CardContent className="p-4 space-y-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <CreditCard className="h-4 w-4 text-primary" />
                                  <span className="font-medium">{getDocumentTypeName(doc.type)}</span>
                                </div>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="text-destructive hover:text-destructive"
                                  onClick={() => removeDocument(doc.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <div className="space-y-2">
                                  <Label>Tipo</Label>
                                  <Select 
                                    value={doc.type}
                                    onValueChange={(v) => setDocuments(prev => prev.map(d => 
                                      d.id === doc.id ? { ...d, type: v as Document["type"] } : d
                                    ))}
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="cpf">CPF</SelectItem>
                                      <SelectItem value="rg">RG</SelectItem>
                                      <SelectItem value="cnh">CNH</SelectItem>
                                      <SelectItem value="passport">Passaporte</SelectItem>
                                      <SelectItem value="healthPlan">Plano de Saúde</SelectItem>
                                      <SelectItem value="other">Outro</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label>Número</Label>
                                  <Input 
                                    value={doc.number}
                                    onChange={(e) => setDocuments(prev => prev.map(d => 
                                      d.id === doc.id ? { ...d, number: e.target.value } : d
                                    ))}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Órgão Emissor</Label>
                                  <Input 
                                    value={doc.issuer || ""}
                                    onChange={(e) => setDocuments(prev => prev.map(d => 
                                      d.id === doc.id ? { ...d, issuer: e.target.value } : d
                                    ))}
                                  />
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="space-y-2">
                                  <Label>Data de Emissão</Label>
                                  <Input 
                                    type="date"
                                    value={doc.issueDate || ""}
                                    onChange={(e) => setDocuments(prev => prev.map(d => 
                                      d.id === doc.id ? { ...d, issueDate: e.target.value } : d
                                    ))}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Data de Validade</Label>
                                  <Input 
                                    type="date"
                                    value={doc.expiryDate || ""}
                                    onChange={(e) => setDocuments(prev => prev.map(d => 
                                      d.id === doc.id ? { ...d, expiryDate: e.target.value } : d
                                    ))}
                                  />
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Tab: Emergência */}
                <TabsContent value="emergencia" className="m-0">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <AlertTriangle className="h-5 w-5 text-amber-500" />
                          Contatos de Emergência
                        </CardTitle>
                        <CardDescription>Contatos acionáveis em situações críticas</CardDescription>
                      </div>
                      <Button size="sm" onClick={addEmergencyContact}>
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar
                      </Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {emergencyContacts.length === 0 ? (
                        <p className="text-sm text-muted-foreground text-center py-8">
                          Nenhum contato de emergência cadastrado
                        </p>
                      ) : (
                        emergencyContacts.map((contact) => (
                          <Card key={contact.id} className="border-border/50">
                            <CardContent className="p-4 space-y-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Heart className="h-4 w-4 text-rose-500" />
                                  <span className="font-medium">{contact.name || "Novo Contato"}</span>
                                  {contact.isMain && (
                                    <Badge variant="secondary">Principal</Badge>
                                  )}
                                </div>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="text-destructive hover:text-destructive"
                                  onClick={() => removeEmergencyContact(contact.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="space-y-2">
                                  <Label>Nome</Label>
                                  <Input 
                                    value={contact.name}
                                    onChange={(e) => setEmergencyContacts(prev => prev.map(c => 
                                      c.id === contact.id ? { ...c, name: e.target.value } : c
                                    ))}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Parentesco / Relação</Label>
                                  <Input 
                                    value={contact.relationship}
                                    onChange={(e) => setEmergencyContacts(prev => prev.map(c => 
                                      c.id === contact.id ? { ...c, relationship: e.target.value } : c
                                    ))}
                                    placeholder="Ex: Cônjuge, Filho(a), Amigo(a)"
                                  />
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="space-y-2">
                                  <Label>Telefone</Label>
                                  <Input 
                                    value={contact.phone}
                                    onChange={(e) => setEmergencyContacts(prev => prev.map(c => 
                                      c.id === contact.id ? { ...c, phone: e.target.value } : c
                                    ))}
                                    placeholder="(11) 99999-9999"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>E-mail (opcional)</Label>
                                  <Input 
                                    type="email"
                                    value={contact.email || ""}
                                    onChange={(e) => setEmergencyContacts(prev => prev.map(c => 
                                      c.id === contact.id ? { ...c, email: e.target.value } : c
                                    ))}
                                  />
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                <Switch 
                                  checked={contact.isMain}
                                  onCheckedChange={(checked) => setEmergencyContacts(prev => prev.map(c => 
                                    c.id === contact.id ? { ...c, isMain: checked } : { ...c, isMain: checked ? false : c.isMain }
                                  ))}
                                />
                                <Label className="text-sm">Contato principal</Label>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Tab: Financeiro */}
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
                          <p className="text-2xl font-bold text-emerald-600">R$ 1.560,00</p>
                          <p className="text-xs text-muted-foreground mt-1">6 faturas registradas</p>
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
                          <p className="text-2xl font-bold">R$ 270,00</p>
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
                          <p className="text-2xl font-bold">7</p>
                          <p className="text-xs text-muted-foreground mt-1">1 em aberto</p>
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle>Histórico de Pagamentos</CardTitle>
                        <CardDescription>Pagamentos registrados e pendentes</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                            <div>
                              <p className="font-medium">Consulta Cardiológica</p>
                              <p className="text-sm text-muted-foreground">19/10/2024</p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-emerald-600">R$ 260,00</p>
                              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600">Pago</Badge>
                            </div>
                          </div>
                          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                            <div>
                              <p className="font-medium">Consulta de Acompanhamento</p>
                              <p className="text-sm text-muted-foreground">25/01/2025</p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">R$ 270,00</p>
                              <Badge variant="outline" className="bg-amber-500/10 text-amber-600">Pendente</Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* Tab: Notificações */}
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
