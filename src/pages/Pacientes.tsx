import { useState, useMemo } from "react";
import { 
  Search, UserPlus, Download, LayoutGrid, TableIcon, 
  Archive, MessageSquare, ChevronLeft, ChevronRight,
  Users, UserCheck, AlertCircle, Calendar
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PatientDetailSheet } from "@/components/pacientes/PatientDetailSheet";
import { PatientTableView } from "@/components/pacientes/PatientTableView";
import { PatientCardView } from "@/components/pacientes/PatientCardView";
import { PatientFilters } from "@/components/pacientes/PatientFilters";
import { PageHeader } from "@/components/ui/page-header";
import { PageContainer, PageContent } from "@/components/ui/page-container";
import { PacientesSkeleton } from "@/components/skeletons/PageSkeletons";
import { useSimulatedLoading } from "@/hooks/use-loading";
import { NewPatientModal } from "@/components/pacientes/NewPatientModal";
import { TotalPatientsModal } from "@/components/pacientes/TotalPatientsModal";
import { ActivePatientsModal } from "@/components/pacientes/ActivePatientsModal";
import { PendingPatientsModal } from "@/components/pacientes/PendingPatientsModal";
import { ScheduledPatientsModal } from "@/components/pacientes/ScheduledPatientsModal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

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

// Mock data expandido para simular grande volume
const generateMockPatients = (): Patient[] => {
  const names = [
    "Ana Silva Costa", "Carlos Eduardo Santos", "Mariana Oliveira Lima",
    "Roberto Alves Ferreira", "Juliana Mendes Rocha", "Fernando Costa Azevedo",
    "Patricia Souza Lima", "Ricardo Martins Silva", "Camila Rodrigues",
    "Bruno Pereira Santos", "Lucia Fernandes", "Marcelo Oliveira",
    "Beatriz Santos Costa", "Diego Almeida", "Renata Lima Silva",
  ];
  const statuses: Patient["status"][] = ["active", "inactive", "pending"];
  const financialStatuses: Patient["financialStatus"][] = ["ok", "pending", "overdue"];

  return Array.from({ length: 50 }, (_, i) => ({
    id: String(i + 1),
    name: names[i % names.length] + (i >= names.length ? ` ${Math.floor(i / names.length) + 1}` : ""),
    email: `paciente${i + 1}@exemplo.com`,
    phone: `(11) 9${String(Math.random()).slice(2, 6)}-${String(Math.random()).slice(2, 6)}`,
    birthDate: new Date(1950 + Math.floor(Math.random() * 60), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split("T")[0],
    cpf: `${String(Math.random()).slice(2, 5)}.${String(Math.random()).slice(2, 5)}.${String(Math.random()).slice(2, 5)}-${String(Math.random()).slice(2, 4)}`,
    registrationDate: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split("T")[0],
    lastAppointment: Math.random() > 0.2 ? new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split("T")[0] : undefined,
    nextAppointment: Math.random() > 0.5 ? new Date(2025, Math.floor(Math.random() * 3), Math.floor(Math.random() * 28) + 1).toISOString().split("T")[0] : undefined,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    financialStatus: financialStatuses[Math.floor(Math.random() * financialStatuses.length)],
    upcomingAppointments: Math.floor(Math.random() * 4),
  }));
};

const mockPatients = generateMockPatients();

interface FilterState {
  status: string;
  financialStatus: string;
  ageRange: string;
  lastAppointmentRange: string;
}

export default function Pacientes() {
  const isLoading = useSimulatedLoading(800);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");
  const [selectedPatients, setSelectedPatients] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);
  const [isNewPatientOpen, setIsNewPatientOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    status: "",
    financialStatus: "",
    ageRange: "",
    lastAppointmentRange: "",
  });
  const [totalModalOpen, setTotalModalOpen] = useState(false);
  const [activeModalOpen, setActiveModalOpen] = useState(false);
  const [pendingModalOpen, setPendingModalOpen] = useState(false);
  const [scheduledModalOpen, setScheduledModalOpen] = useState(false);

  // Calculate age from birthDate
  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  // Filter and search logic
  const filteredPatients = useMemo(() => {
    return mockPatients.filter((patient) => {
      // Search
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        patient.name.toLowerCase().includes(searchLower) ||
        patient.email.toLowerCase().includes(searchLower) ||
        patient.phone.includes(searchQuery) ||
        (patient.cpf && patient.cpf.includes(searchQuery));

      if (!matchesSearch) return false;

      // Status filter
      if (filters.status && filters.status !== "all" && patient.status !== filters.status) {
        return false;
      }

      // Financial status filter
      if (filters.financialStatus && filters.financialStatus !== "all" && patient.financialStatus !== filters.financialStatus) {
        return false;
      }

      // Age range filter
      if (filters.ageRange && filters.ageRange !== "all") {
        const age = calculateAge(patient.birthDate);
        const [min, max] = filters.ageRange === "65+" ? [65, 150] : filters.ageRange.split("-").map(Number);
        if (age < min || age > max) return false;
      }

      // Last appointment filter
      if (filters.lastAppointmentRange && filters.lastAppointmentRange !== "all") {
        if (filters.lastAppointmentRange === "never" && patient.lastAppointment) return false;
        if (filters.lastAppointmentRange !== "never") {
          if (!patient.lastAppointment) return false;
          const lastDate = new Date(patient.lastAppointment);
          const today = new Date();
          const monthsAgo = (today.getFullYear() - lastDate.getFullYear()) * 12 + today.getMonth() - lastDate.getMonth();
          const maxMonths = filters.lastAppointmentRange === "1month" ? 1 :
                           filters.lastAppointmentRange === "3months" ? 3 :
                           filters.lastAppointmentRange === "6months" ? 6 : 12;
          if (monthsAgo > maxMonths) return false;
        }
      }

      return true;
    });
  }, [searchQuery, filters]);

  // Sort logic
  const sortedPatients = useMemo(() => {
    if (!sortConfig) return filteredPatients;

    return [...filteredPatients].sort((a, b) => {
      let aVal: any = a[sortConfig.key as keyof Patient];
      let bVal: any = b[sortConfig.key as keyof Patient];

      if (sortConfig.key === "birthDate" || sortConfig.key === "lastAppointment") {
        aVal = aVal ? new Date(aVal).getTime() : 0;
        bVal = bVal ? new Date(bVal).getTime() : 0;
      }

      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredPatients, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(sortedPatients.length / itemsPerPage);
  const paginatedPatients = sortedPatients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (key: string) => {
    setSortConfig(prev => {
      if (prev?.key === key) {
        return prev.direction === "asc" ? { key, direction: "desc" } : null;
      }
      return { key, direction: "asc" };
    });
  };

  const handleSelectPatient = (id: string) => {
    setSelectedPatients(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedPatients.length === paginatedPatients.length) {
      setSelectedPatients([]);
    } else {
      setSelectedPatients(paginatedPatients.map(p => p.id));
    }
  };

  const handlePatientClick = (patient: Patient) => {
    setSelectedPatient(patient);
    setSheetOpen(true);
  };

  const handleCloseSheet = () => {
    setSheetOpen(false);
    setTimeout(() => setSelectedPatient(null), 300);
  };

  const handleExport = () => {
    const dataToExport = selectedPatients.length > 0 
      ? sortedPatients.filter(p => selectedPatients.includes(p.id))
      : sortedPatients;
    console.log("Exportando", dataToExport.length, "pacientes");
    toast.success(`${dataToExport.length} pacientes exportados com sucesso`);
  };

  const handleBulkArchive = () => {
    console.log("Arquivando", selectedPatients.length, "pacientes");
    toast.success(`${selectedPatients.length} pacientes arquivados`);
    setSelectedPatients([]);
  };

  const handleBulkMessage = () => {
    console.log("Enviando mensagem para", selectedPatients.length, "pacientes");
    toast.success(`Mensagem enviada para ${selectedPatients.length} pacientes`);
  };

  const activeFiltersCount = Object.values(filters).filter(v => v && v !== "all").length;

  // Stats
  const stats = useMemo(() => ({
    total: mockPatients.length,
    active: mockPatients.filter(p => p.status === "active").length,
    pending: mockPatients.filter(p => p.financialStatus === "pending" || p.financialStatus === "overdue").length,
    withAppointments: mockPatients.filter(p => p.upcomingAppointments > 0).length,
  }), []);

  return (
    <PageContainer>
      <PageHeader
        title="Pacientes"
        description={`${sortedPatients.length.toLocaleString()} de ${mockPatients.length.toLocaleString()} pacientes`}
        icon={Users}
        iconColor="from-blue-500 to-cyan-500"
      >
        <Button className="shrink-0 gap-2" onClick={() => setIsNewPatientOpen(true)}>
          <UserPlus className="h-4 w-4" />
          <span className="hidden sm:inline">Novo Paciente</span>
        </Button>
      </PageHeader>

      <NewPatientModal open={isNewPatientOpen} onOpenChange={setIsNewPatientOpen} />

      <PageContent>
        {isLoading ? (
          <PacientesSkeleton />
        ) : (
          <>
        {/* Stats Mini Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
          <Card 
            className="border-border/50 bg-card/50 backdrop-blur-sm animate-fade-in cursor-pointer hover:shadow-lg transition-all" 
            style={{ animationDelay: "0ms", animationFillMode: "forwards" }}
            onClick={() => setTotalModalOpen(true)}
          >
            <CardContent className="p-2 sm:p-3 flex items-center gap-2 sm:gap-3">
              <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
              </div>
              <div>
                <p className="text-[10px] sm:text-xs text-muted-foreground">Total</p>
                <p className="text-base sm:text-lg font-bold">{stats.total.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
          <Card 
            className="border-border/50 bg-card/50 backdrop-blur-sm animate-fade-in cursor-pointer hover:shadow-lg transition-all" 
            style={{ animationDelay: "50ms", animationFillMode: "forwards" }}
            onClick={() => setActiveModalOpen(true)}
          >
            <CardContent className="p-2 sm:p-3 flex items-center gap-2 sm:gap-3">
              <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg bg-success/10 flex items-center justify-center shrink-0">
                <UserCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-success" />
              </div>
              <div>
                <p className="text-[10px] sm:text-xs text-muted-foreground">Ativos</p>
                <p className="text-base sm:text-lg font-bold text-success">{stats.active.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
          <Card 
            className="border-border/50 bg-card/50 backdrop-blur-sm animate-fade-in cursor-pointer hover:shadow-lg transition-all" 
            style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
            onClick={() => setPendingModalOpen(true)}
          >
            <CardContent className="p-2 sm:p-3 flex items-center gap-2 sm:gap-3">
              <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg bg-warning/10 flex items-center justify-center shrink-0">
                <AlertCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-warning" />
              </div>
              <div>
                <p className="text-[10px] sm:text-xs text-muted-foreground">Pendências</p>
                <p className="text-base sm:text-lg font-bold text-warning">{stats.pending}</p>
              </div>
            </CardContent>
          </Card>
          <Card 
            className="border-border/50 bg-card/50 backdrop-blur-sm animate-fade-in cursor-pointer hover:shadow-lg transition-all" 
            style={{ animationDelay: "150ms", animationFillMode: "forwards" }}
            onClick={() => setScheduledModalOpen(true)}
          >
            <CardContent className="p-2 sm:p-3 flex items-center gap-2 sm:gap-3">
              <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
              </div>
              <div>
                <p className="text-[10px] sm:text-xs text-muted-foreground">Com Agenda</p>
                <p className="text-base sm:text-lg font-bold text-primary">{stats.withAppointments}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <TotalPatientsModal open={totalModalOpen} onOpenChange={setTotalModalOpen} total={stats.total} />
        <ActivePatientsModal open={activeModalOpen} onOpenChange={setActiveModalOpen} active={stats.active} />
        <PendingPatientsModal open={pendingModalOpen} onOpenChange={setPendingModalOpen} pending={stats.pending} />
        <ScheduledPatientsModal open={scheduledModalOpen} onOpenChange={setScheduledModalOpen} scheduled={stats.withAppointments} />

        {/* Search, Filters and Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, CPF, email ou telefone..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10 bg-card/50 backdrop-blur-sm border-border/50 focus:border-primary transition-colors"
            />
          </div>
          
          <div className="flex items-center gap-2 flex-wrap">
            <PatientFilters 
              filters={filters} 
              onFiltersChange={(f) => {
                setFilters(f);
                setCurrentPage(1);
              }}
              activeFiltersCount={activeFiltersCount}
            />

            {/* View Toggle */}
            <div className="flex rounded-lg border border-border/50 bg-card/50 p-0.5">
              <Button
                variant={viewMode === "table" ? "default" : "ghost"}
                size="sm"
                className="h-8 px-3"
                onClick={() => setViewMode("table")}
              >
                <TableIcon className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "cards" ? "default" : "ghost"}
                size="sm"
                className="h-8 px-3"
                onClick={() => setViewMode("cards")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
            </div>

            <Button variant="outline" size="sm" className="h-9 bg-card/50" onClick={handleExport}>
              <Download className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Exportar</span>
            </Button>
          </div>
        </div>

        {/* Bulk Actions Bar */}
        {selectedPatients.length > 0 && (
          <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
            <span className="text-sm font-medium">
              {selectedPatients.length} selecionado{selectedPatients.length > 1 ? "s" : ""}
            </span>
            <div className="flex-1" />
            <Button variant="outline" size="sm" onClick={handleBulkMessage}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Enviar Mensagem
            </Button>
            <Button variant="outline" size="sm" onClick={handleBulkArchive}>
              <Archive className="h-4 w-4 mr-2" />
              Arquivar
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedPatients([])}
            >
              Limpar seleção
            </Button>
          </div>
        )}

        {/* Content */}
        {viewMode === "table" ? (
          <PatientTableView
            patients={paginatedPatients}
            selectedPatients={selectedPatients}
            onSelectPatient={handleSelectPatient}
            onSelectAll={handleSelectAll}
            onPatientClick={handlePatientClick}
            sortConfig={sortConfig}
            onSort={handleSort}
          />
        ) : (
          <PatientCardView
            patients={paginatedPatients}
            selectedPatients={selectedPatients}
            onSelectPatient={handleSelectPatient}
            onPatientClick={handlePatientClick}
          />
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Mostrando</span>
              <Select
                value={String(itemsPerPage)}
                onValueChange={(v) => {
                  setItemsPerPage(Number(v));
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="15">15</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
              <span>de {sortedPatients.length.toLocaleString()}</span>
            </div>

            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                className="h-8"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              >
                Primeira
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <div className="flex items-center gap-1 px-2">
                {/* Page numbers */}
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum: number;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "ghost"}
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>

              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
              >
                Última
              </Button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {paginatedPatients.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">Nenhum paciente encontrado</h3>
            <p className="text-muted-foreground mb-6">
              Tente ajustar os filtros ou a busca
            </p>
            <Button onClick={() => {
              setSearchQuery("");
              setFilters({ status: "", financialStatus: "", ageRange: "", lastAppointmentRange: "" });
            }}>
              Limpar filtros
            </Button>
          </div>
        )}

        {/* Patient Detail Sheet */}
        {selectedPatient && (
          <PatientDetailSheet
            patient={selectedPatient}
            open={sheetOpen}
            onOpenChange={handleCloseSheet}
          />
        )}
          </>
        )}
      </PageContent>
    </PageContainer>
  );
}
