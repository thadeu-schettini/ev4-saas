import { useState } from "react";
import { ChevronDown, ChevronUp, MoreHorizontal, Eye, Edit, Archive, Calendar, FileText } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

interface PatientTableViewProps {
  patients: Patient[];
  selectedPatients: string[];
  onSelectPatient: (id: string) => void;
  onSelectAll: () => void;
  onPatientClick: (patient: Patient) => void;
  sortConfig: { key: string; direction: "asc" | "desc" } | null;
  onSort: (key: string) => void;
}

export function PatientTableView({
  patients,
  selectedPatients,
  onSelectPatient,
  onSelectAll,
  onPatientClick,
  sortConfig,
  onSort,
}: PatientTableViewProps) {
  const getStatusColor = (status: Patient["status"]) => {
    switch (status) {
      case "active":
        return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
      case "inactive":
        return "bg-muted text-muted-foreground border-border";
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

  const getFinancialBadge = (status: Patient["financialStatus"]) => {
    switch (status) {
      case "ok":
        return <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">OK</Badge>;
      case "pending":
        return <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/20">Pendente</Badge>;
      case "overdue":
        return <Badge variant="outline" className="bg-red-500/10 text-red-600 border-red-500/20">Em atraso</Badge>;
    }
  };

  const SortIcon = ({ columnKey }: { columnKey: string }) => {
    if (sortConfig?.key !== columnKey) {
      return <ChevronDown className="h-3 w-3 opacity-30" />;
    }
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="h-3 w-3" />
    ) : (
      <ChevronDown className="h-3 w-3" />
    );
  };

  const isAllSelected = patients.length > 0 && selectedPatients.length === patients.length;

  return (
    <div className="rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-border/50">
            <TableHead className="w-12">
              <Checkbox
                checked={isAllSelected}
                onCheckedChange={onSelectAll}
                aria-label="Selecionar todos"
              />
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:text-foreground transition-colors"
              onClick={() => onSort("name")}
            >
              <div className="flex items-center gap-1">
                Paciente
                <SortIcon columnKey="name" />
              </div>
            </TableHead>
            <TableHead className="hidden md:table-cell">Contato</TableHead>
            <TableHead 
              className="hidden lg:table-cell cursor-pointer hover:text-foreground transition-colors"
              onClick={() => onSort("birthDate")}
            >
              <div className="flex items-center gap-1">
                Nascimento
                <SortIcon columnKey="birthDate" />
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:text-foreground transition-colors"
              onClick={() => onSort("status")}
            >
              <div className="flex items-center gap-1">
                Status
                <SortIcon columnKey="status" />
              </div>
            </TableHead>
            <TableHead 
              className="hidden sm:table-cell cursor-pointer hover:text-foreground transition-colors"
              onClick={() => onSort("financialStatus")}
            >
              <div className="flex items-center gap-1">
                Financeiro
                <SortIcon columnKey="financialStatus" />
              </div>
            </TableHead>
            <TableHead 
              className="hidden xl:table-cell cursor-pointer hover:text-foreground transition-colors"
              onClick={() => onSort("lastAppointment")}
            >
              <div className="flex items-center gap-1">
                Última Consulta
                <SortIcon columnKey="lastAppointment" />
              </div>
            </TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.map((patient) => (
            <TableRow
              key={patient.id}
              className={`cursor-pointer transition-colors border-border/30 ${
                selectedPatients.includes(patient.id) ? "bg-primary/5" : "hover:bg-muted/50"
              }`}
              onClick={() => onPatientClick(patient)}
            >
              <TableCell onClick={(e) => e.stopPropagation()}>
                <Checkbox
                  checked={selectedPatients.includes(patient.id)}
                  onCheckedChange={() => onSelectPatient(patient.id)}
                  aria-label={`Selecionar ${patient.name}`}
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9 border border-border/50">
                    <AvatarImage src={patient.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/5 text-primary text-xs font-medium">
                      {patient.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="font-medium text-sm truncate">{patient.name}</p>
                    {patient.cpf && (
                      <p className="text-xs text-muted-foreground">{patient.cpf}</p>
                    )}
                  </div>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <div className="space-y-0.5">
                  <p className="text-sm truncate max-w-[180px]">{patient.email}</p>
                  <p className="text-xs text-muted-foreground">{patient.phone}</p>
                </div>
              </TableCell>
              <TableCell className="hidden lg:table-cell text-sm">
                {new Date(patient.birthDate).toLocaleDateString("pt-BR")}
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={getStatusColor(patient.status)}>
                  {getStatusLabel(patient.status)}
                </Badge>
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                {getFinancialBadge(patient.financialStatus)}
              </TableCell>
              <TableCell className="hidden xl:table-cell text-sm text-muted-foreground">
                {patient.lastAppointment
                  ? new Date(patient.lastAppointment).toLocaleDateString("pt-BR")
                  : "—"}
              </TableCell>
              <TableCell onClick={(e) => e.stopPropagation()}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={() => onPatientClick(patient)}>
                      <Eye className="h-4 w-4 mr-2" />
                      Ver detalhes
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Calendar className="h-4 w-4 mr-2" />
                      Agendar consulta
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <FileText className="h-4 w-4 mr-2" />
                      Prontuário
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Archive className="h-4 w-4 mr-2" />
                      Arquivar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
