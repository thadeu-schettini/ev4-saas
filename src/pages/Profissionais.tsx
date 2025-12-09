import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageContainer, PageContent } from "@/components/ui/page-container";
import { PageHeader } from "@/components/ui/page-header";
import { 
  Search, 
  UserPlus, 
  Phone,
  Mail,
  MapPin,
  Clock,
  Activity,
  FileText,
  Settings,
  TrendingUp,
  CheckCircle2,
  UserCog
} from "lucide-react";
import { ProfessionalGeneralTab } from "@/components/profissionais/ProfessionalGeneralTab";
import { ProfessionalScheduleTab } from "@/components/profissionais/ProfessionalScheduleTab";
import { ProfessionalDocumentsTab } from "@/components/profissionais/ProfessionalDocumentsTab";
import { ProfessionalMetricsTab } from "@/components/profissionais/ProfessionalMetricsTab";
import { ProfessionalSettingsTab } from "@/components/profissionais/ProfessionalSettingsTab";

interface Professional {
  id: string;
  name: string;
  specialty: string;
  crm: string;
  status: "disponivel" | "em-consulta" | "ausente";
  phone: string;
  email: string;
  address: string;
  appointmentsToday: number;
  nextAvailable: string;
  avatar?: string;
}

const mockProfessionals: Professional[] = [
  {
    id: "1",
    name: "Dr. João Silva",
    specialty: "Cardiologista",
    crm: "CRM/SP 123456",
    status: "disponivel",
    phone: "(11) 98765-4321",
    email: "joao.silva@clinica.com",
    address: "Consultório 101",
    appointmentsToday: 8,
    nextAvailable: "14:30",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=joao"
  },
  {
    id: "2",
    name: "Dra. Maria Santos",
    specialty: "Dermatologista",
    crm: "CRM/SP 789012",
    status: "em-consulta",
    phone: "(11) 98765-4322",
    email: "maria.santos@clinica.com",
    address: "Consultório 102",
    appointmentsToday: 6,
    nextAvailable: "15:00",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria"
  },
  {
    id: "3",
    name: "Dr. Pedro Costa",
    specialty: "Ortopedista",
    crm: "CRM/SP 345678",
    status: "disponivel",
    phone: "(11) 98765-4323",
    email: "pedro.costa@clinica.com",
    address: "Consultório 103",
    appointmentsToday: 5,
    nextAvailable: "13:00",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=pedro"
  },
  {
    id: "4",
    name: "Dra. Ana Oliveira",
    specialty: "Pediatra",
    crm: "CRM/SP 901234",
    status: "ausente",
    phone: "(11) 98765-4324",
    email: "ana.oliveira@clinica.com",
    address: "Consultório 104",
    appointmentsToday: 0,
    nextAvailable: "Amanhã 09:00",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ana"
  },
  {
    id: "5",
    name: "Dr. Lucas Mendes",
    specialty: "Neurologista",
    crm: "CRM/SP 567890",
    status: "em-consulta",
    phone: "(11) 98765-4325",
    email: "lucas.mendes@clinica.com",
    address: "Consultório 105",
    appointmentsToday: 7,
    nextAvailable: "16:30",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lucas"
  },
  {
    id: "6",
    name: "Dra. Juliana Lima",
    specialty: "Ginecologista",
    crm: "CRM/SP 234567",
    status: "disponivel",
    phone: "(11) 98765-4326",
    email: "juliana.lima@clinica.com",
    address: "Consultório 106",
    appointmentsToday: 9,
    nextAvailable: "14:00",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=juliana"
  }
];

const statusConfig = {
  "disponivel": {
    label: "Disponível",
    color: "bg-green-500/10 text-green-600 border-green-500/20",
    dotColor: "bg-green-500"
  },
  "em-consulta": {
    label: "Em Consulta",
    color: "bg-orange-500/10 text-orange-600 border-orange-500/20",
    dotColor: "bg-orange-500"
  },
  "ausente": {
    label: "Ausente",
    color: "bg-gray-500/10 text-gray-600 border-gray-500/20",
    dotColor: "bg-gray-500"
  }
};

const Profissionais = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const filteredProfessionals = mockProfessionals.filter(prof =>
    prof.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prof.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prof.crm.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCardClick = (professional: Professional) => {
    setSelectedProfessional(professional);
    setSheetOpen(true);
  };

  return (
    <PageContainer>
      <PageHeader
        title="Profissionais"
        description="Gerencie sua equipe médica"
        icon={UserCog}
        iconColor="from-indigo-500 to-blue-600"
      >
        <Button className="gap-2">
          <UserPlus className="h-4 w-4" />
          <span className="hidden sm:inline">Adicionar Profissional</span>
        </Button>
      </PageHeader>

      <PageContent>
        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome, especialidade ou CRM..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Grid de Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProfessionals.map((professional) => (
            <Card
              key={professional.id}
              className="p-4 cursor-pointer hover:shadow-md hover:border-primary/20 transition-all"
              onClick={() => handleCardClick(professional)}
            >
              <div className="flex items-start gap-4">
                <div className="relative">
                  <Avatar className="h-14 w-14">
                    <AvatarImage src={professional.avatar} alt={professional.name} />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {professional.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full border-2 border-background ${statusConfig[professional.status].dotColor}`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate">{professional.name}</h3>
                  <p className="text-sm text-muted-foreground">{professional.specialty}</p>
                  <p className="text-xs text-muted-foreground mt-1">{professional.crm}</p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <Badge variant="outline" className={statusConfig[professional.status].color}>
                  {statusConfig[professional.status].label}
                </Badge>
                <div className="text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">{professional.appointmentsToday}</span> hoje
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-border/50 flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{professional.nextAvailable}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>{professional.address}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </PageContent>

      {/* Professional Detail Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
          {selectedProfessional && (
            <>
              <SheetHeader className="pb-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={selectedProfessional.avatar} alt={selectedProfessional.name} />
                    <AvatarFallback className="text-xl bg-primary/10 text-primary">
                      {selectedProfessional.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <SheetTitle className="text-xl">{selectedProfessional.name}</SheetTitle>
                    <p className="text-muted-foreground">{selectedProfessional.specialty}</p>
                    <Badge variant="outline" className={`mt-2 ${statusConfig[selectedProfessional.status].color}`}>
                      {statusConfig[selectedProfessional.status].label}
                    </Badge>
                  </div>
                </div>
              </SheetHeader>

              <Tabs defaultValue="geral" className="mt-4">
                <TabsList className="grid grid-cols-5 w-full">
                  <TabsTrigger value="geral" className="text-xs">Geral</TabsTrigger>
                  <TabsTrigger value="agenda" className="text-xs">Agenda</TabsTrigger>
                  <TabsTrigger value="docs" className="text-xs">Docs</TabsTrigger>
                  <TabsTrigger value="metricas" className="text-xs">Métricas</TabsTrigger>
                  <TabsTrigger value="config" className="text-xs">Config</TabsTrigger>
                </TabsList>
                <TabsContent value="geral" className="mt-4">
                  <ProfessionalGeneralTab professional={selectedProfessional} />
                </TabsContent>
                <TabsContent value="agenda" className="mt-4">
                  <ProfessionalScheduleTab professional={selectedProfessional} />
                </TabsContent>
                <TabsContent value="docs" className="mt-4">
                  <ProfessionalDocumentsTab professional={selectedProfessional} />
                </TabsContent>
                <TabsContent value="metricas" className="mt-4">
                  <ProfessionalMetricsTab professional={selectedProfessional} />
                </TabsContent>
                <TabsContent value="config" className="mt-4">
                  <ProfessionalSettingsTab professional={selectedProfessional} />
                </TabsContent>
              </Tabs>
            </>
          )}
        </SheetContent>
      </Sheet>
    </PageContainer>
  );
};

export default Profissionais;
