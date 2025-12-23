import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PageContainer, PageContent } from "@/components/ui/page-container";
import { PageHeader } from "@/components/ui/page-header";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { NewProfessionalModal } from "@/components/profissionais/NewProfessionalModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  UserCog,
  MoreVertical,
  Edit,
  Trash2,
  LayoutGrid,
  List,
  Eye,
  ShieldCheck,
  AlertTriangle
} from "lucide-react";
import { ProfessionalGeneralTab } from "@/components/profissionais/ProfessionalGeneralTab";
import { ProfessionalScheduleTab } from "@/components/profissionais/ProfessionalScheduleTab";
import { ProfessionalDocumentsTab } from "@/components/profissionais/ProfessionalDocumentsTab";
import { ProfessionalMetricsTab } from "@/components/profissionais/ProfessionalMetricsTab";
import { ProfessionalSettingsTab } from "@/components/profissionais/ProfessionalSettingsTab";
import { toast } from "sonner";

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
  certificateStatus: "configured" | "pending" | "expired";
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
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=joao",
    certificateStatus: "configured"
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
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria",
    certificateStatus: "configured"
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
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=pedro",
    certificateStatus: "pending"
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
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ana",
    certificateStatus: "expired"
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
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lucas",
    certificateStatus: "configured"
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
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=juliana",
    certificateStatus: "pending"
  }
];

const certificateConfig = {
  "configured": {
    label: "Certificado OK",
    color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  },
  "pending": {
    label: "Pendente",
    color: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  },
  "expired": {
    label: "Expirado",
    color: "bg-destructive/10 text-destructive border-destructive/20",
  }
};

const statusConfig = {
  "disponivel": {
    label: "Disponível",
    color: "bg-status-available/10 text-status-available border-status-available/20",
    dotColor: "bg-status-available"
  },
  "em-consulta": {
    label: "Em Consulta",
    color: "bg-status-busy/10 text-status-busy border-status-busy/20",
    dotColor: "bg-status-busy"
  },
  "ausente": {
    label: "Ausente",
    color: "bg-status-away/10 text-status-away border-status-away/20",
    dotColor: "bg-status-away"
  }
};

const Profissionais = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [view, setView] = useState<"grid" | "table">("table");
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [newModalOpen, setNewModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [professionalToDelete, setProfessionalToDelete] = useState<Professional | null>(null);

  const filteredProfessionals = mockProfessionals.filter(prof =>
    prof.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prof.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prof.crm.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCardClick = (professional: Professional) => {
    setSelectedProfessional(professional);
    setSheetOpen(true);
  };

  const handleEdit = (e: React.MouseEvent, professional: Professional) => {
    e.stopPropagation();
    setSelectedProfessional(professional);
    setSheetOpen(true);
  };

  const handleDeleteClick = (e: React.MouseEvent, professional: Professional) => {
    e.stopPropagation();
    setProfessionalToDelete(professional);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (professionalToDelete) {
      toast.success(`Profissional ${professionalToDelete.name} removido com sucesso`);
      setDeleteDialogOpen(false);
      setProfessionalToDelete(null);
    }
  };

  return (
    <PageContainer>
      <PageHeader
        title="Profissionais"
        description="Gerencie sua equipe médica"
        icon={UserCog}
        iconColor="from-indigo-500 to-blue-600"
      >
        <Button className="gap-2" onClick={() => setNewModalOpen(true)}>
          <UserPlus className="h-4 w-4" />
          <span className="hidden sm:inline">Adicionar Profissional</span>
        </Button>
      </PageHeader>

      <PageContent>
        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, especialidade ou CRM..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          {/* View Toggle */}
          <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-lg">
            <Button
              variant={view === "table" ? "default" : "ghost"}
              size="sm"
              onClick={() => setView("table")}
              className="h-8 w-8 p-0"
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={view === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setView("grid")}
              className="h-8 w-8 p-0"
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Table View */}
        {view === "table" && (
          <Card className="border-border/50">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Profissional</TableHead>
                  <TableHead className="hidden md:table-cell">Contato</TableHead>
                  <TableHead className="hidden sm:table-cell">Local</TableHead>
                  <TableHead>Consultas Hoje</TableHead>
                  <TableHead className="hidden lg:table-cell">Certificado</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProfessionals.map((professional) => (
                  <TableRow 
                    key={professional.id} 
                    className="cursor-pointer"
                    onClick={() => handleCardClick(professional)}
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={professional.avatar} alt={professional.name} />
                            <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
                              {professional.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background ${statusConfig[professional.status].dotColor}`} />
                        </div>
                        <div>
                          <p className="font-medium">{professional.name}</p>
                          <p className="text-xs text-muted-foreground">{professional.specialty} · {professional.crm}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="space-y-0.5">
                        <p className="text-sm">{professional.phone}</p>
                        <p className="text-xs text-muted-foreground truncate max-w-[180px]">{professional.email}</p>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                      {professional.address}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{professional.appointmentsToday}</Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <Badge variant="outline" className={certificateConfig[professional.certificateStatus].color}>
                        {professional.certificateStatus === "configured" && <ShieldCheck className="h-3 w-3 mr-1" />}
                        {professional.certificateStatus === "expired" && <AlertTriangle className="h-3 w-3 mr-1" />}
                        {certificateConfig[professional.certificateStatus].label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusConfig[professional.status].color}>
                        {statusConfig[professional.status].label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleCardClick(professional)}>
                            <Eye className="h-4 w-4 mr-2" />
                            Ver detalhes
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => handleEdit(e as any, professional)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={(e) => handleDeleteClick(e as any, professional)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        )}

        {/* Grid View */}
        {view === "grid" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProfessionals.map((professional, index) => (
              <Card
                key={professional.id}
                className="group relative overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg cursor-pointer"
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => handleCardClick(professional)}
              >
                {/* Subtle background accent */}
                <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl opacity-10 -translate-y-1/2 translate-x-1/2 bg-gradient-to-br from-primary/70 to-primary/50" />
                
                <CardContent className="p-4 relative">
                  {/* Header Row */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="h-11 w-11">
                          <AvatarImage src={professional.avatar} alt={professional.name} />
                          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                            {professional.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-background ${statusConfig[professional.status].dotColor}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                          {professional.name}
                        </h3>
                        <p className="text-xs text-muted-foreground">{professional.specialty}</p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={(e) => handleEdit(e as any, professional)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={(e) => handleDeleteClick(e as any, professional)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Quick Stats */}
                  <div className="flex items-center gap-3 mb-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{professional.nextAvailable}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>{professional.address}</span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-border/50">
                    <Badge variant="outline" className={statusConfig[professional.status].color}>
                      {statusConfig[professional.status].label}
                    </Badge>
                    <div className="text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">{professional.appointmentsToday}</span> hoje
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
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

      {/* New Professional Modal */}
      <NewProfessionalModal
        open={newModalOpen}
        onOpenChange={setNewModalOpen}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Excluir Profissional"
        description={`Tem certeza que deseja excluir ${professionalToDelete?.name}? Esta ação não pode ser desfeita.`}
        confirmText="Excluir"
        onConfirm={handleConfirmDelete}
      />
    </PageContainer>
  );
};

export default Profissionais;
