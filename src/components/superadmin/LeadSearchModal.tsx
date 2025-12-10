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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  Search,
  User,
  Building2,
  Phone,
  Mail,
  Calendar,
  Clock,
  Target,
  TrendingUp,
  Eye,
  Plus,
  Sparkles,
  DollarSign,
  MapPin,
  Globe,
  History,
  MessageSquare,
  UserPlus,
  Filter,
  X,
} from "lucide-react";

interface LeadSearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onViewContact?: (contact: any) => void;
  onNewLead?: () => void;
}

const mockResults = {
  clients: [
    {
      id: 1,
      type: "client",
      name: "Clínica São Lucas",
      email: "contato@saolucas.com.br",
      phone: "(11) 99999-1234",
      plan: "Business",
      mrr: 450,
      status: "active",
      since: "Mar 2023",
      stage: "Cliente",
    },
    {
      id: 2,
      type: "client",
      name: "Centro Médico Esperança",
      email: "admin@esperanca.med.br",
      phone: "(21) 98888-5678",
      plan: "Pro",
      mrr: 299,
      status: "active",
      since: "Jun 2023",
      stage: "Cliente",
    },
  ],
  leads: [
    {
      id: 3,
      type: "lead",
      name: "Dr. Roberto Mendes",
      email: "roberto@consultorio.com",
      phone: "(31) 97777-9012",
      source: "LinkedIn",
      score: 68,
      stage: "Qualificação",
      value: 99,
      daysInPipeline: 15,
    },
    {
      id: 4,
      type: "lead",
      name: "Policlínica Central",
      email: "gestao@policentral.com.br",
      phone: "(41) 96666-3456",
      source: "Google Ads",
      score: 82,
      stage: "Proposta",
      value: 450,
      daysInPipeline: 8,
    },
    {
      id: 5,
      type: "lead",
      name: "Dra. Mariana Costa",
      email: "mariana.costa@gmail.com",
      phone: "(51) 95555-7890",
      source: "Instagram",
      score: 45,
      stage: "Visitante",
      value: 99,
      daysInPipeline: 3,
    },
  ],
};

export function LeadSearchModal({ 
  open, 
  onOpenChange,
  onViewContact,
  onNewLead
}: LeadSearchModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [recentSearches] = useState(["Clínica São Lucas", "roberto@", "(11) 99999"]);

  const allResults = [...mockResults.clients, ...mockResults.leads];
  
  const filteredResults = searchTerm.length > 0 
    ? allResults.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.phone.includes(searchTerm)
      )
    : [];

  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-success bg-success/10 border-success/30";
    if (score >= 50) return "text-warning bg-warning/10 border-warning/30";
    return "text-muted-foreground bg-muted border-border";
  };

  const getStageBadge = (stage: string) => {
    const stages: Record<string, { color: string; bg: string }> = {
      "Visitante": { color: "text-muted-foreground", bg: "bg-muted" },
      "Lead": { color: "text-info", bg: "bg-info/10" },
      "Qualificação": { color: "text-primary", bg: "bg-primary/10" },
      "Proposta": { color: "text-warning", bg: "bg-warning/10" },
      "Negociação": { color: "text-success", bg: "bg-success/10" },
      "Cliente": { color: "text-success", bg: "bg-success/10" },
    };
    const s = stages[stage] || stages["Visitante"];
    return <Badge className={cn(s.bg, s.color, "border-0")}>{stage}</Badge>;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Search className="h-5 w-5 text-primary" />
            Buscar Cliente ou Lead
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 pt-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Digite nome, email ou telefone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 text-base"
              autoFocus
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                onClick={() => setSearchTerm("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        <ScrollArea className="h-[450px]">
          {searchTerm.length === 0 ? (
            <div className="p-6 space-y-6">
              {/* Recent Searches */}
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                  <History className="h-4 w-4" />
                  Buscas Recentes
                </h4>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((term, i) => (
                    <Button
                      key={i}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => setSearchTerm(term)}
                    >
                      {term}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Ações Rápidas
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline" 
                    className="h-auto py-4 flex-col gap-2 hover:border-primary/50 hover:bg-primary/5"
                    onClick={onNewLead}
                  >
                    <UserPlus className="h-5 w-5 text-primary" />
                    <span className="text-sm">Cadastrar Novo Lead</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-auto py-4 flex-col gap-2 hover:border-success/50 hover:bg-success/5"
                  >
                    <Building2 className="h-5 w-5 text-success" />
                    <span className="text-sm">Nova Clínica</span>
                  </Button>
                </div>
              </div>

              {/* Hot Leads */}
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Leads Quentes (Score &gt; 70)
                </h4>
                <div className="space-y-2">
                  {mockResults.leads.filter(l => l.score >= 70).map((lead) => (
                    <div
                      key={lead.id}
                      className="p-3 rounded-lg border bg-card hover:shadow-sm hover:border-primary/30 transition-all cursor-pointer flex items-center gap-3"
                      onClick={() => onViewContact?.(lead)}
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-gradient-to-br from-warning/20 to-warning/5 text-warning text-sm">
                          {lead.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{lead.name}</span>
                          <Badge className={cn("text-xs", getScoreColor(lead.score))}>
                            {lead.score}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{lead.stage} • R$ {lead.value}/mês</p>
                      </div>
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6">
              {filteredResults.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h4 className="font-medium mb-2">Nenhum resultado encontrado</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Não encontramos nenhum cliente ou lead com "{searchTerm}"
                  </p>
                  <Button onClick={onNewLead} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Cadastrar como Novo Lead
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground mb-4">
                    {filteredResults.length} resultado(s) encontrado(s)
                  </p>
                  {filteredResults.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl border bg-card hover:shadow-md hover:border-primary/30 transition-all cursor-pointer"
                      onClick={() => onViewContact?.(item)}
                    >
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12 border-2 border-primary/20">
                          <AvatarFallback className={cn(
                            "font-semibold",
                            item.type === "client" 
                              ? "bg-gradient-to-br from-success/20 to-success/5 text-success"
                              : "bg-gradient-to-br from-primary/20 to-primary/5 text-primary"
                          )}>
                            {item.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-semibold">{item.name}</h4>
                            {getStageBadge(item.stage)}
                            {item.type === "lead" && "score" in item && (
                              <Badge className={cn("text-xs", getScoreColor(item.score))}>
                                <Target className="h-3 w-3 mr-1" />
                                {item.score}
                              </Badge>
                            )}
                          </div>

                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Mail className="h-3.5 w-3.5" />
                              {item.email}
                            </span>
                            <span className="flex items-center gap-1">
                              <Phone className="h-3.5 w-3.5" />
                              {item.phone}
                            </span>
                          </div>

                          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                            {item.type === "client" && "mrr" in item && (
                              <>
                                <span className="flex items-center gap-1">
                                  <DollarSign className="h-3 w-3 text-success" />
                                  R$ {item.mrr}/mês
                                </span>
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  Cliente desde {item.since}
                                </span>
                              </>
                            )}
                            {item.type === "lead" && "source" in item && (
                              <>
                                <span className="flex items-center gap-1">
                                  <Sparkles className="h-3 w-3 text-primary" />
                                  {item.source}
                                </span>
                                <span className="flex items-center gap-1">
                                  <DollarSign className="h-3 w-3 text-warning" />
                                  R$ {item.value}/mês potencial
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {item.daysInPipeline} dias no pipeline
                                </span>
                              </>
                            )}
                          </div>
                        </div>

                        <Button variant="outline" size="sm" className="gap-1">
                          <Eye className="h-4 w-4" />
                          Detalhes
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
