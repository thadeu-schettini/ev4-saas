import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import {
  Users,
  Search,
  Plus,
  CheckCircle2,
  Calendar,
  Phone,
  Mail,
  UserPlus,
} from "lucide-react";
import { toast } from "sonner";

interface PlanPatientModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plan: {
    id: number;
    name: string;
    category: string;
  } | null;
}

// Mock patients
const availablePatients = [
  { id: 1, name: "Maria Silva", email: "maria@email.com", phone: "(11) 99999-1234", avatar: "" },
  { id: 2, name: "João Pedro Santos", email: "joao@email.com", phone: "(11) 98888-4321", avatar: "" },
  { id: 3, name: "Ana Costa", email: "ana@email.com", phone: "(11) 97777-5678", avatar: "" },
  { id: 4, name: "Carlos Lima", email: "carlos@email.com", phone: "(11) 96666-8765", avatar: "" },
  { id: 5, name: "Fernanda Rocha", email: "fernanda@email.com", phone: "(11) 95555-2345", avatar: "" },
  { id: 6, name: "Ricardo Alves", email: "ricardo@email.com", phone: "(11) 94444-6789", avatar: "" },
  { id: 7, name: "Patricia Souza", email: "patricia@email.com", phone: "(11) 93333-3456", avatar: "" },
  { id: 8, name: "Bruno Martins", email: "bruno@email.com", phone: "(11) 92222-7890", avatar: "" },
];

export function PlanPatientModal({ open, onOpenChange, plan }: PlanPatientModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatients, setSelectedPatients] = useState<number[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  if (!plan) return null;

  const filteredPatients = availablePatients.filter(
    patient =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const togglePatient = (patientId: number) => {
    setSelectedPatients(prev =>
      prev.includes(patientId)
        ? prev.filter(id => id !== patientId)
        : [...prev, patientId]
    );
  };

  const handleAdd = () => {
    if (selectedPatients.length === 0) {
      toast.error("Selecione pelo menos um paciente");
      return;
    }
    setIsAdding(true);
    setTimeout(() => {
      setIsAdding(false);
      toast.success(`${selectedPatients.length} paciente(s) adicionado(s) ao plano!`);
      onOpenChange(false);
      setSelectedPatients([]);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-primary/70 to-primary/50 shadow-sm">
              <UserPlus className="h-3.5 w-3.5 text-white" />
            </div>
            <div>
              <DialogTitle>Adicionar Pacientes</DialogTitle>
              <p className="text-sm text-muted-foreground">{plan.name}</p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 flex-1 overflow-hidden flex flex-col">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar pacientes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Selection Info */}
          {selectedPatients.length > 0 && (
            <div className="flex items-center justify-between p-3 rounded-lg bg-primary/10 border border-primary/20">
              <span className="text-sm font-medium">
                {selectedPatients.length} paciente(s) selecionado(s)
              </span>
              <Button variant="ghost" size="sm" onClick={() => setSelectedPatients([])}>
                Limpar
              </Button>
            </div>
          )}

          {/* Patients List */}
          <ScrollArea className="flex-1 pr-2">
            <div className="space-y-2">
              {filteredPatients.map((patient) => {
                const isSelected = selectedPatients.includes(patient.id);
                return (
                  <div
                    key={patient.id}
                    onClick={() => togglePatient(patient.id)}
                    className={cn(
                      "p-3 rounded-xl border cursor-pointer transition-all hover:shadow-md",
                      isSelected
                        ? "bg-primary/5 border-primary/30"
                        : "bg-muted/30 hover:bg-muted/50 border-transparent"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={patient.avatar} />
                          <AvatarFallback className="bg-primary/10 text-primary text-sm">
                            {patient.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        {isSelected && (
                          <div className="absolute -top-1 -right-1 p-0.5 rounded-full bg-primary">
                            <CheckCircle2 className="h-3 w-3 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{patient.name}</p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1 truncate">
                            <Mail className="h-3 w-3" />
                            {patient.email}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </div>

        <DialogFooter className="flex-shrink-0 mt-4 pt-4 border-t gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleAdd} disabled={isAdding || selectedPatients.length === 0} className="gap-2">
            {isAdding ? (
              "Adicionando..."
            ) : (
              <>
                <Plus className="h-4 w-4" />
                Adicionar ({selectedPatients.length})
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
