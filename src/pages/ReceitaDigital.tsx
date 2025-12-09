import { useState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { PageContainer, PageContent } from "@/components/ui/page-container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  FileDigit, 
  Search, 
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  User,
  Pill,
  Send,
  Filter,
  MoreVertical,
  Eye,
  Download,
  QrCode,
  Smartphone,
  Calendar,
  ShoppingBag,
  Copy
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mockPrescriptions = [
  {
    id: 1,
    patient: "Maria Silva",
    professional: "Dr. Carlos Santos",
    date: "10/01/2025",
    medications: [
      { name: "Losartana 50mg", dosage: "1 comprimido", frequency: "2x ao dia", duration: "uso contínuo" },
      { name: "AAS 100mg", dosage: "1 comprimido", frequency: "1x ao dia", duration: "uso contínuo" }
    ],
    status: "dispensed",
    pharmacy: "Drogaria São Paulo",
    dispensedAt: "10/01/2025 16:30",
    type: "comum"
  },
  {
    id: 2,
    patient: "João Oliveira",
    professional: "Dra. Ana Lima",
    date: "10/01/2025",
    medications: [
      { name: "Amoxicilina 500mg", dosage: "1 cápsula", frequency: "8/8h", duration: "7 dias" }
    ],
    status: "sent",
    pharmacy: null,
    dispensedAt: null,
    type: "antimicrobiano"
  },
  {
    id: 3,
    patient: "Ana Costa",
    professional: "Dra. Beatriz Rocha",
    date: "09/01/2025",
    medications: [
      { name: "Clonazepam 2mg", dosage: "1 comprimido", frequency: "à noite", duration: "30 dias" }
    ],
    status: "pending",
    pharmacy: null,
    dispensedAt: null,
    type: "controlado"
  },
  {
    id: 4,
    patient: "Pedro Mendes",
    professional: "Dr. Carlos Santos",
    date: "08/01/2025",
    medications: [
      { name: "Ibuprofeno 600mg", dosage: "1 comprimido", frequency: "8/8h se dor", duration: "5 dias" },
      { name: "Omeprazol 20mg", dosage: "1 cápsula", frequency: "em jejum", duration: "5 dias" }
    ],
    status: "expired",
    pharmacy: null,
    dispensedAt: null,
    type: "comum"
  }
];

const statusConfig = {
  sent: { label: "Enviada", color: "bg-info/10 text-info border-info/20", icon: Send },
  pending: { label: "Pendente", color: "bg-pending/10 text-pending border-pending/20", icon: Clock },
  dispensed: { label: "Dispensada", color: "bg-confirmed/10 text-confirmed border-confirmed/20", icon: CheckCircle2 },
  expired: { label: "Expirada", color: "bg-destructive/10 text-destructive border-destructive/20", icon: AlertCircle }
};

const typeConfig = {
  comum: { label: "Comum", color: "bg-muted text-muted-foreground" },
  antimicrobiano: { label: "Antimicrobiano", color: "bg-info/10 text-info" },
  controlado: { label: "Controlado", color: "bg-destructive/10 text-destructive" }
};

const ReceitaDigital = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("prescriptions");

  const stats = [
    { label: "Receitas Hoje", value: 34, icon: FileDigit, color: "text-primary" },
    { label: "Enviadas", value: 28, icon: Send, color: "text-info" },
    { label: "Dispensadas", value: 19, icon: ShoppingBag, color: "text-confirmed" },
    { label: "Pendentes", value: 6, icon: Clock, color: "text-pending" }
  ];

  return (
    <PageContainer>
      <PageHeader
        title="Receita Digital"
        description="Prescrição eletrônica integrada com farmácias"
        icon={FileDigit}
        actions={
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Nova Receita
          </Button>
        }
      />

      <PageContent>
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="relative overflow-hidden group hover:shadow-md transition-all">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-xl bg-muted/50 ${stat.color}`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar receita ou paciente..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-340px)]">
        <div className="space-y-4">
          {mockPrescriptions.map((prescription) => {
            const StatusIcon = statusConfig[prescription.status as keyof typeof statusConfig].icon;
            return (
              <Card key={prescription.id} className="group hover:shadow-md transition-all hover:border-primary/20">
                <CardContent className="p-4">
                  <div className="flex flex-col gap-4">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/5">
                            <User className="h-5 w-5 text-primary" />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="font-medium">{prescription.patient}</p>
                            <Badge variant="outline" className={typeConfig[prescription.type as keyof typeof typeConfig].color}>
                              {typeConfig[prescription.type as keyof typeof typeConfig].label}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{prescription.professional}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{prescription.date}</span>
                        </div>
                        <Badge variant="outline" className={statusConfig[prescription.status as keyof typeof statusConfig].color}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {statusConfig[prescription.status as keyof typeof statusConfig].label}
                        </Badge>
                      </div>
                    </div>

                    {/* Medications */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {prescription.medications.map((med, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 rounded-xl bg-muted/30">
                          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0">
                            <Pill className="h-4 w-4 text-primary" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-sm">{med.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {med.dosage} • {med.frequency} • {med.duration}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Dispensed Info */}
                    {prescription.status === "dispensed" && prescription.pharmacy && (
                      <div className="flex items-center gap-2 text-sm p-3 rounded-lg bg-confirmed/5 border border-confirmed/20">
                        <ShoppingBag className="h-4 w-4 text-confirmed" />
                        <span>Dispensada em <strong>{prescription.pharmacy}</strong> às {prescription.dispensedAt}</span>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2 pt-2 border-t">
                      <Button variant="outline" size="sm" className="gap-1">
                        <Eye className="h-4 w-4" />
                        Ver Receita
                      </Button>
                      <Button variant="outline" size="sm" className="gap-1">
                        <QrCode className="h-4 w-4" />
                        QR Code
                      </Button>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Copy className="h-4 w-4" />
                        Copiar Link
                      </Button>
                      {prescription.status !== "expired" && (
                        <Button variant="outline" size="sm" className="gap-1">
                          <Smartphone className="h-4 w-4" />
                          Enviar WhatsApp
                        </Button>
                      )}
                      <Button variant="outline" size="sm" className="gap-1">
                        <Download className="h-4 w-4" />
                        PDF
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 ml-auto">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Reemitir Receita</DropdownMenuItem>
                          <DropdownMenuItem>Histórico</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Cancelar</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </ScrollArea>
      </PageContent>
    </PageContainer>
  );
};

export default ReceitaDigital;
