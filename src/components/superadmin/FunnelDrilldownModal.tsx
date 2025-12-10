import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  Search,
  Filter,
  Phone,
  Mail,
  Calendar,
  Clock,
  TrendingUp,
  ArrowRight,
  Eye,
  MessageSquare,
  DollarSign,
  Building2,
  User,
  ChevronRight,
  Star,
  Sparkles,
  Target,
  Layers,
} from "lucide-react";

interface FunnelDrilldownModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  stage: {
    name: string;
    count: number;
    color: string;
  } | null;
  onViewContact?: (contact: any) => void;
}

const mockContacts = [
  {
    id: 1,
    name: "Clínica São Lucas",
    email: "contato@saolucas.com.br",
    phone: "(11) 99999-1234",
    source: "Google Ads",
    score: 85,
    value: 299,
    daysInStage: 3,
    lastActivity: "Solicitou demo há 2 horas",
    assignedTo: "Ana Silva",
    tags: ["Hot Lead", "Enterprise"],
  },
  {
    id: 2,
    name: "Centro Médico Esperança",
    email: "admin@esperanca.med.br",
    phone: "(21) 98888-5678",
    source: "Indicação",
    score: 72,
    value: 199,
    daysInStage: 5,
    lastActivity: "Abriu proposta ontem",
    assignedTo: "Carlos Santos",
    tags: ["Médio Porte"],
  },
  {
    id: 3,
    name: "Dr. Roberto Mendes",
    email: "roberto@consultorio.com",
    phone: "(31) 97777-9012",
    source: "LinkedIn",
    score: 68,
    value: 99,
    daysInStage: 7,
    lastActivity: "Participou webinar",
    assignedTo: "Ana Silva",
    tags: ["Consultório"],
  },
  {
    id: 4,
    name: "Policlínica Central",
    email: "gestao@policentral.com.br",
    phone: "(41) 96666-3456",
    source: "Site Orgânico",
    score: 58,
    value: 450,
    daysInStage: 10,
    lastActivity: "Download e-book",
    assignedTo: "Pedro Lima",
    tags: ["Enterprise", "Multi-unidade"],
  },
  {
    id: 5,
    name: "Dra. Mariana Costa",
    email: "mariana.costa@gmail.com",
    phone: "(51) 95555-7890",
    source: "Instagram",
    score: 45,
    value: 99,
    daysInStage: 14,
    lastActivity: "Visualizou pricing",
    assignedTo: null,
    tags: ["Consultório", "Dermatologia"],
  },
];

export function FunnelDrilldownModal({ 
  open, 
  onOpenChange, 
  stage,
  onViewContact 
}: FunnelDrilldownModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("score");
  const [filterSource, setFilterSource] = useState("all");

  const filteredContacts = mockContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-success bg-success/10";
    if (score >= 50) return "text-warning bg-warning/10";
    return "text-muted-foreground bg-muted";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-4 border-b">
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: stage?.color || "#6366f1" }}
            >
              <Layers className="h-6 w-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-xl">{stage?.name || "Etapa do Funil"}</DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {stage?.count.toLocaleString()} contatos nesta etapa
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="p-4 border-b bg-muted/30">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome, email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterSource} onValueChange={setFilterSource}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Fonte" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas Fontes</SelectItem>
                <SelectItem value="google">Google Ads</SelectItem>
                <SelectItem value="organic">Orgânico</SelectItem>
                <SelectItem value="referral">Indicação</SelectItem>
                <SelectItem value="social">Redes Sociais</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Ordenar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="score">Lead Score</SelectItem>
                <SelectItem value="value">Valor</SelectItem>
                <SelectItem value="recent">Mais Recente</SelectItem>
                <SelectItem value="days">Dias na Etapa</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <ScrollArea className="h-[500px]">
          <div className="p-4 space-y-3">
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                className="p-4 rounded-xl border bg-card hover:shadow-md hover:border-primary/30 transition-all cursor-pointer group"
                onClick={() => onViewContact?.(contact)}
              >
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12 border-2 border-primary/20">
                    <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/5 text-primary font-semibold">
                      {contact.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-semibold group-hover:text-primary transition-colors">
                        {contact.name}
                      </h4>
                      <div className={cn(
                        "px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1",
                        getScoreColor(contact.score)
                      )}>
                        <Target className="h-3 w-3" />
                        {contact.score}
                      </div>
                      {contact.tags.map((tag, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Mail className="h-3.5 w-3.5" />
                        {contact.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="h-3.5 w-3.5" />
                        {contact.phone}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Sparkles className="h-3 w-3 text-primary" />
                        {contact.source}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {contact.daysInStage} dias na etapa
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3 text-success" />
                        R$ {contact.value}/mês potencial
                      </span>
                      {contact.assignedTo && (
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {contact.assignedTo}
                        </span>
                      )}
                    </div>

                    <p className="mt-2 text-xs text-info flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      {contact.lastActivity}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button variant="outline" size="sm" className="gap-1">
                      <Eye className="h-3.5 w-3.5" />
                      Ver
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <MessageSquare className="h-3.5 w-3.5" />
                      Contatar
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="p-4 border-t bg-muted/30 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Mostrando {filteredContacts.length} de {mockContacts.length} contatos
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Exportar Lista
            </Button>
            <Button size="sm" className="gap-1">
              Ação em Massa
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
