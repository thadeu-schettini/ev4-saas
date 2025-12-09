import { useState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { PageContainer, PageContent } from "@/components/ui/page-container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  GitBranch, 
  Search, 
  Plus, 
  Play,
  Pause,
  Settings2,
  Calendar,
  Users,
  Activity,
  ArrowRight,
  CheckCircle2,
  Clock,
  Zap,
  Filter,
  MoreVertical
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mockProtocolos = [
  {
    id: 1,
    name: "Acompanhamento Diabetes Tipo 2",
    description: "Fluxo automático de exames e retornos para pacientes diabéticos",
    trigger: "Diagnóstico CID E11",
    active: true,
    patientsEnrolled: 45,
    completionRate: 78,
    steps: [
      { name: "Exame HbA1c", timing: "A cada 3 meses" },
      { name: "Consulta de retorno", timing: "A cada 4 meses" },
      { name: "Exame de fundo de olho", timing: "Anual" }
    ],
    category: "Endocrinologia"
  },
  {
    id: 2,
    name: "Pré-Natal Completo",
    description: "Acompanhamento gestacional com exames e consultas programadas",
    trigger: "Confirmação de gravidez",
    active: true,
    patientsEnrolled: 23,
    completionRate: 92,
    steps: [
      { name: "Ultrassom morfológico", timing: "12 semanas" },
      { name: "Consulta mensal", timing: "Até 28 semanas" },
      { name: "Consulta quinzenal", timing: "28-36 semanas" }
    ],
    category: "Obstetrícia"
  },
  {
    id: 3,
    name: "Hipertensão Arterial",
    description: "Monitoramento de pressão e ajuste medicamentoso",
    trigger: "Diagnóstico CID I10",
    active: false,
    patientsEnrolled: 67,
    completionRate: 65,
    steps: [
      { name: "MAPA 24h", timing: "Inicial" },
      { name: "Retorno cardiologia", timing: "A cada 2 meses" },
      { name: "Exames laboratoriais", timing: "A cada 6 meses" }
    ],
    category: "Cardiologia"
  },
  {
    id: 4,
    name: "Pós-Operatório Ortopédico",
    description: "Recuperação após procedimentos ortopédicos",
    trigger: "Realização de cirurgia",
    active: true,
    patientsEnrolled: 12,
    completionRate: 88,
    steps: [
      { name: "Revisão cirúrgica", timing: "7 dias" },
      { name: "Fisioterapia", timing: "14 dias" },
      { name: "Raio-X controle", timing: "30 dias" }
    ],
    category: "Ortopedia"
  }
];

const Protocolos = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [protocols, setProtocols] = useState(mockProtocolos);

  const handleToggleProtocol = (id: number) => {
    setProtocols(protocols.map(p => 
      p.id === id ? { ...p, active: !p.active } : p
    ));
  };

  const stats = [
    { label: "Protocolos Ativos", value: protocols.filter(p => p.active).length, icon: Play, color: "text-confirmed" },
    { label: "Pacientes Inscritos", value: 147, icon: Users, color: "text-primary" },
    { label: "Ações Hoje", value: 23, icon: Zap, color: "text-pending" },
    { label: "Taxa Conclusão", value: "81%", icon: CheckCircle2, color: "text-info" }
  ];

  return (
    <PageContainer>
      <PageHeader
        title="Protocolos Clínicos"
        description="Fluxos automatizados baseados em diagnósticos e condições"
        icon={GitBranch}
        actions={
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Protocolo
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

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar protocolos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filtros
        </Button>
      </div>

      {/* Protocols List */}
      <ScrollArea className="h-[calc(100vh-380px)]">
        <div className="space-y-4">
          {protocols.map((protocol) => (
            <Card key={protocol.id} className={`group hover:shadow-md transition-all ${!protocol.active ? 'opacity-60' : ''}`}>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  {/* Header */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 ${
                          protocol.active 
                            ? 'bg-gradient-to-br from-primary/20 to-primary/5' 
                            : 'bg-muted'
                        }`}>
                          <GitBranch className={`h-6 w-6 ${protocol.active ? 'text-primary' : 'text-muted-foreground'}`} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-lg">{protocol.name}</h3>
                            <Badge variant="outline" className="text-xs">
                              {protocol.category}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{protocol.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Switch
                          checked={protocol.active}
                          onCheckedChange={() => handleToggleProtocol(protocol.id)}
                        />
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Settings2 className="h-4 w-4 mr-2" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Users className="h-4 w-4 mr-2" />
                              Ver Pacientes
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Activity className="h-4 w-4 mr-2" />
                              Histórico
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    {/* Trigger Badge */}
                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant="outline" className="bg-info/10 text-info border-info/20">
                        <Zap className="h-3 w-3 mr-1" />
                        Gatilho: {protocol.trigger}
                      </Badge>
                    </div>

                    {/* Steps Flow */}
                    <div className="flex flex-wrap items-center gap-2">
                      {protocol.steps.map((step, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50 text-sm">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span className="font-medium">{step.name}</span>
                            <span className="text-muted-foreground">({step.timing})</span>
                          </div>
                          {index < protocol.steps.length - 1 && (
                            <ArrowRight className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex lg:flex-col gap-4 lg:gap-3 lg:min-w-[140px] lg:border-l lg:pl-6">
                    <div className="flex-1 lg:flex-none">
                      <p className="text-sm text-muted-foreground">Pacientes</p>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-primary" />
                        <span className="text-xl font-bold">{protocol.patientsEnrolled}</span>
                      </div>
                    </div>
                    <div className="flex-1 lg:flex-none">
                      <p className="text-sm text-muted-foreground">Conclusão</p>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-confirmed" />
                        <span className="text-xl font-bold">{protocol.completionRate}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
      </PageContent>
    </PageContainer>
  );
};

export default Protocolos;
