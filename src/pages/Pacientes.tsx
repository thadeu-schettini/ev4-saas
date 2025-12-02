import { useState } from "react";
import { Search, Plus, Filter, UserPlus, Calendar, DollarSign, FileText, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PatientDetailSheet } from "@/components/pacientes/PatientDetailSheet";

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

const mockPatients: Patient[] = [
  {
    id: "1",
    name: "Ana Silva Costa",
    email: "ana.silva@exemplo.com",
    phone: "(11) 98765-4321",
    birthDate: "1985-03-15",
    cpf: "123.456.789-00",
    registrationDate: "2024-01-15",
    lastAppointment: "2024-11-20",
    nextAppointment: "2025-01-10",
    status: "active",
    financialStatus: "ok",
    upcomingAppointments: 2,
  },
  {
    id: "2",
    name: "Carlos Eduardo Santos",
    email: "carlos.santos@exemplo.com",
    phone: "(11) 99876-5432",
    birthDate: "1978-07-22",
    registrationDate: "2024-02-10",
    lastAppointment: "2024-12-01",
    status: "active",
    financialStatus: "pending",
    upcomingAppointments: 1,
  },
  {
    id: "3",
    name: "Mariana Oliveira Lima",
    email: "mariana.lima@exemplo.com",
    phone: "(11) 97654-3210",
    birthDate: "1990-11-08",
    registrationDate: "2024-03-05",
    lastAppointment: "2024-11-15",
    nextAppointment: "2025-01-20",
    status: "active",
    financialStatus: "ok",
    upcomingAppointments: 1,
  },
  {
    id: "4",
    name: "Roberto Alves Ferreira",
    email: "roberto.alves@exemplo.com",
    phone: "(11) 96543-2109",
    birthDate: "1965-05-30",
    registrationDate: "2023-12-20",
    lastAppointment: "2024-10-10",
    status: "inactive",
    financialStatus: "overdue",
    upcomingAppointments: 0,
  },
  {
    id: "5",
    name: "Juliana Mendes Rocha",
    email: "juliana.rocha@exemplo.com",
    phone: "(11) 95432-1098",
    birthDate: "1995-09-17",
    registrationDate: "2024-04-12",
    nextAppointment: "2025-01-05",
    status: "pending",
    financialStatus: "ok",
    upcomingAppointments: 1,
  },
  {
    id: "6",
    name: "Fernando Costa Azevedo",
    email: "fernando.azevedo@exemplo.com",
    phone: "(11) 94321-0987",
    birthDate: "1982-12-25",
    registrationDate: "2024-05-18",
    lastAppointment: "2024-11-28",
    nextAppointment: "2025-01-15",
    status: "active",
    financialStatus: "pending",
    upcomingAppointments: 2,
  },
];

export default function Pacientes() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const filteredPatients = mockPatients.filter((patient) =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.phone.includes(searchQuery)
  );

  const getStatusColor = (status: Patient["status"]) => {
    switch (status) {
      case "active":
        return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
      case "inactive":
        return "bg-slate-500/10 text-slate-600 border-slate-500/20";
      case "pending":
        return "bg-amber-500/10 text-amber-600 border-amber-500/20";
    }
  };

  const getStatusLabel = (status: Patient["status"]) => {
    switch (status) {
      case "active":
        return "Ativo";
      case "inactive":
        return "Inativo";
      case "pending":
        return "Pendente";
    }
  };

  const getFinancialStatusColor = (status: Patient["financialStatus"]) => {
    switch (status) {
      case "ok":
        return "text-emerald-600";
      case "pending":
        return "text-amber-600";
      case "overdue":
        return "text-red-600";
    }
  };

  const handleCardClick = (patient: Patient) => {
    setSelectedPatient(patient);
    setSheetOpen(true);
  };

  const handleCloseSheet = () => {
    setSheetOpen(false);
    setTimeout(() => setSelectedPatient(null), 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Pacientes
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Gerencie e acompanhe seus pacientes
              </p>
            </div>
            <Button className="shrink-0 shadow-md hover:shadow-lg transition-all">
              <UserPlus className="h-4 w-4 mr-2" />
              Novo Paciente
            </Button>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, email ou telefone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card/50 backdrop-blur-sm border-border/50 focus:border-primary transition-colors"
            />
          </div>
          <Button variant="outline" className="shrink-0 bg-card/50 backdrop-blur-sm">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-md transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="text-2xl font-bold mt-1">{mockPatients.length}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <UserPlus className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-md transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Ativos</p>
                  <p className="text-2xl font-bold mt-1 text-emerald-600">
                    {mockPatients.filter(p => p.status === "active").length}
                  </p>
                </div>
                <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-md transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pendentes</p>
                  <p className="text-2xl font-bold mt-1 text-amber-600">
                    {mockPatients.filter(p => p.financialStatus === "pending" || p.financialStatus === "overdue").length}
                  </p>
                </div>
                <div className="h-12 w-12 rounded-full bg-amber-500/10 flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-md transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Consultas Hoje</p>
                  <p className="text-2xl font-bold mt-1 text-primary">3</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Patient Cards Grid */}
      <div className="container mx-auto px-4 sm:px-6 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPatients.map((patient) => (
            <Card
              key={patient.id}
              className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg hover:border-primary/50 transition-all cursor-pointer group"
              onClick={() => handleCardClick(patient)}
            >
              <CardContent className="p-5">
                {/* Header with Avatar and Status */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 border-2 border-primary/20 group-hover:border-primary/50 transition-colors">
                      <AvatarImage src={patient.avatar} />
                      <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-semibold">
                        {patient.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                        {patient.name}
                      </h3>
                      <p className="text-sm text-muted-foreground truncate">{patient.email}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className={`shrink-0 ${getStatusColor(patient.status)}`}>
                    {getStatusLabel(patient.status)}
                  </Badge>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span className="font-medium mr-2">Telefone:</span>
                    <span>{patient.phone}</span>
                  </div>
                  {patient.cpf && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span className="font-medium mr-2">CPF:</span>
                      <span>{patient.cpf}</span>
                    </div>
                  )}
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span className="font-medium mr-2">Nascimento:</span>
                    <span>{new Date(patient.birthDate).toLocaleDateString("pt-BR")}</span>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-2 pt-4 border-t border-border/50">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Próximas</p>
                      <p className="text-sm font-semibold">{patient.upcomingAppointments}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className={`h-4 w-4 ${getFinancialStatusColor(patient.financialStatus)}`} />
                    <div>
                      <p className="text-xs text-muted-foreground">Financeiro</p>
                      <p className={`text-sm font-semibold ${getFinancialStatusColor(patient.financialStatus)}`}>
                        {patient.financialStatus === "ok" ? "OK" : patient.financialStatus === "pending" ? "Pendente" : "Em atraso"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Last/Next Appointment */}
                {(patient.lastAppointment || patient.nextAppointment) && (
                  <div className="mt-4 pt-4 border-t border-border/50 space-y-1">
                    {patient.lastAppointment && (
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Último atendimento:</span>
                        <span className="font-medium">{new Date(patient.lastAppointment).toLocaleDateString("pt-BR")}</span>
                      </div>
                    )}
                    {patient.nextAppointment && (
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Próximo atendimento:</span>
                        <span className="font-medium text-primary">{new Date(patient.nextAppointment).toLocaleDateString("pt-BR")}</span>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPatients.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">Nenhum paciente encontrado</h3>
            <p className="text-muted-foreground mb-6">
              Tente ajustar os filtros ou adicione um novo paciente
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Paciente
            </Button>
          </div>
        )}
      </div>

      {/* Patient Detail Sheet */}
      {selectedPatient && (
        <PatientDetailSheet
          patient={selectedPatient}
          open={sheetOpen}
          onOpenChange={handleCloseSheet}
        />
      )}
    </div>
  );
}
