import { Calendar, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";

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

interface PatientCardViewProps {
  patients: Patient[];
  selectedPatients: string[];
  onSelectPatient: (id: string) => void;
  onPatientClick: (patient: Patient) => void;
}

export function PatientCardView({
  patients,
  selectedPatients,
  onSelectPatient,
  onPatientClick,
}: PatientCardViewProps) {
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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {patients.map((patient) => (
        <Card
          key={patient.id}
          className={`border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg hover:border-primary/50 transition-all cursor-pointer group relative ${
            selectedPatients.includes(patient.id) ? "ring-2 ring-primary border-primary" : ""
          }`}
          onClick={() => onPatientClick(patient)}
        >
          <div 
            className="absolute top-3 left-3 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <Checkbox
              checked={selectedPatients.includes(patient.id)}
              onCheckedChange={() => onSelectPatient(patient.id)}
              className="bg-background/80 backdrop-blur-sm"
            />
          </div>
          <CardContent className="p-4 pt-10">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-11 w-11 border-2 border-primary/20 group-hover:border-primary/50 transition-colors">
                  <AvatarImage src={patient.avatar} />
                  <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-semibold text-sm">
                    {patient.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm text-foreground truncate group-hover:text-primary transition-colors">
                    {patient.name}
                  </h3>
                  <p className="text-xs text-muted-foreground truncate">{patient.phone}</p>
                </div>
              </div>
              <Badge variant="outline" className={`shrink-0 text-xs ${getStatusColor(patient.status)}`}>
                {getStatusLabel(patient.status)}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-border/50">
              <div className="flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5 text-primary" />
                <div>
                  <p className="text-[10px] text-muted-foreground">Próximas</p>
                  <p className="text-xs font-semibold">{patient.upcomingAppointments}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className={`h-3.5 w-3.5 ${getFinancialStatusColor(patient.financialStatus)}`} />
                <div>
                  <p className="text-[10px] text-muted-foreground">Financeiro</p>
                  <p className={`text-xs font-semibold ${getFinancialStatusColor(patient.financialStatus)}`}>
                    {patient.financialStatus === "ok" ? "OK" : patient.financialStatus === "pending" ? "Pendente" : "Atraso"}
                  </p>
                </div>
              </div>
            </div>

            {patient.nextAppointment && (
              <div className="mt-2 pt-2 border-t border-border/50">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-muted-foreground">Próxima consulta:</span>
                  <span className="font-medium text-primary">
                    {new Date(patient.nextAppointment).toLocaleDateString("pt-BR")}
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
