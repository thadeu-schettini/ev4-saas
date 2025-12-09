import { useState } from "react";
import { 
  Star, 
  MessageSquare, 
  TrendingUp,
  TrendingDown,
  Users,
  ThumbsUp,
  ThumbsDown,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Filter,
  Search,
  MoreVertical,
  Flag,
  Reply,
  Eye,
  Download,
  RefreshCw,
  Sparkles
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { PageContainer, PageContent } from "@/components/ui/page-container";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ReviewResponseModal } from "@/components/avaliacoes/ReviewResponseModal";
import { AIAnalysisModal } from "@/components/avaliacoes/AIAnalysisModal";

const satisfactionData = [
  { month: "Jul", nota: 4.2 },
  { month: "Ago", nota: 4.4 },
  { month: "Set", nota: 4.3 },
  { month: "Out", nota: 4.6 },
  { month: "Nov", nota: 4.7 },
  { month: "Dez", nota: 4.8 },
];

const ratingDistribution = [
  { stars: 5, count: 156, percentage: 62 },
  { stars: 4, count: 58, percentage: 23 },
  { stars: 3, count: 22, percentage: 9 },
  { stars: 2, count: 10, percentage: 4 },
  { stars: 1, count: 5, percentage: 2 },
];

const reviews = [
  {
    id: 1,
    patient: "Maria Silva",
    avatar: "MS",
    professional: "Dr. Ricardo Carvalho",
    service: "Consulta Cardiologia",
    rating: 5,
    date: "Há 2 horas",
    comment: "Excelente atendimento! Dr. Ricardo é muito atencioso e explicou tudo detalhadamente. A clínica é muito organizada e o tempo de espera foi mínimo.",
    tags: ["Atendimento", "Pontualidade", "Ambiente"],
    status: "new",
    replied: false
  },
  {
    id: 2,
    patient: "João Pedro",
    avatar: "JP",
    professional: "Dra. Ana Paula",
    service: "Consulta Dermatologia",
    rating: 4,
    date: "Há 5 horas",
    comment: "Muito bom o atendimento da Dra. Ana. Apenas achei o tempo de espera um pouco longo, mas no geral foi uma ótima experiência.",
    tags: ["Atendimento", "Competência"],
    status: "read",
    replied: true
  },
  {
    id: 3,
    patient: "Ana Costa",
    avatar: "AC",
    professional: "Dr. Marcos Souza",
    service: "Consulta Ortopedia",
    rating: 5,
    date: "Ontem",
    comment: "Profissional extremamente competente. Resolveu meu problema que outros médicos não conseguiram diagnosticar. Super recomendo!",
    tags: ["Competência", "Diagnóstico"],
    status: "read",
    replied: false
  },
  {
    id: 4,
    patient: "Carlos Lima",
    avatar: "CL",
    professional: "Dr. Ricardo Carvalho",
    service: "Eletrocardiograma",
    rating: 3,
    date: "2 dias atrás",
    comment: "O exame foi realizado corretamente, mas tive que esperar bastante e a recepção estava um pouco confusa.",
    tags: ["Tempo de Espera"],
    status: "attention",
    replied: false
  },
  {
    id: 5,
    patient: "Fernanda Rocha",
    avatar: "FR",
    professional: "Dra. Ana Paula",
    service: "Consulta Dermatologia",
    rating: 2,
    date: "3 dias atrás",
    comment: "Infelizmente a consulta foi muito rápida e não me senti bem atendida. Esperava mais atenção para o meu caso.",
    tags: ["Tempo de Consulta"],
    status: "attention",
    replied: true
  },
];

const attentionPoints = [
  { issue: "Tempo de espera elevado", mentions: 12, trend: "up", severity: "medium" },
  { issue: "Dificuldade no agendamento online", mentions: 8, trend: "down", severity: "low" },
  { issue: "Falta de estacionamento", mentions: 6, trend: "stable", severity: "low" },
  { issue: "Consulta muito rápida", mentions: 4, trend: "up", severity: "high" },
];

const professionalRatings = [
  { name: "Dr. Ricardo Carvalho", specialty: "Cardiologia", rating: 4.9, reviews: 89, trend: "up" },
  { name: "Dra. Ana Paula", specialty: "Dermatologia", rating: 4.7, reviews: 64, trend: "stable" },
  { name: "Dr. Marcos Souza", specialty: "Ortopedia", rating: 4.8, reviews: 52, trend: "up" },
  { name: "Dra. Juliana Lima", specialty: "Pediatria", rating: 4.6, reviews: 41, trend: "down" },
];

export default function Avaliacoes() {
  const [search, setSearch] = useState("");
  const [filterRating, setFilterRating] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedReview, setSelectedReview] = useState<typeof reviews[0] | null>(null);
  const [isResponseModalOpen, setIsResponseModalOpen] = useState(false);
  const [isAIAnalysisOpen, setIsAIAnalysisOpen] = useState(false);

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.patient.toLowerCase().includes(search.toLowerCase()) ||
                         review.comment.toLowerCase().includes(search.toLowerCase());
    const matchesRating = filterRating === "all" || review.rating === parseInt(filterRating);
    const matchesStatus = filterStatus === "all" || review.status === filterStatus;
    return matchesSearch && matchesRating && matchesStatus;
  });

  const averageRating = 4.7;
  const totalReviews = 251;
  const responseRate = 78;

  return (
    <PageContainer>
      <PageHeader
        icon={Star}
        iconGradient="from-amber-500 to-orange-500"
        title="Avaliações & Feedback"
        description="Acompanhe a satisfação dos pacientes e identifique pontos de melhoria"
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Exportar
            </Button>
            <Button size="sm" className="gap-2" onClick={() => setIsAIAnalysisOpen(true)}>
              <Sparkles className="h-4 w-4" />
              Análise com IA
            </Button>
          </div>
        }
      />

      <PageContent>
        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="group relative overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
            <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-amber-500 to-orange-500" />
            <CardContent className="p-4 relative">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg">
                  <Star className="h-5 w-5 text-white" />
                </div>
                <Badge variant="secondary" className="text-xs font-medium text-emerald-600 gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +0.3
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">Nota Média</p>
              <div className="flex items-baseline gap-1">
                <p className="text-3xl font-bold">{averageRating}</p>
                <span className="text-muted-foreground">/5</span>
              </div>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
            <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-blue-500 to-cyan-500" />
            <CardContent className="p-4 relative">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg">
                  <MessageSquare className="h-5 w-5 text-white" />
                </div>
                <Badge variant="secondary" className="text-xs font-medium text-emerald-600 gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +24
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">Total de Avaliações</p>
              <p className="text-3xl font-bold">{totalReviews}</p>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
            <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-emerald-500 to-green-500" />
            <CardContent className="p-4 relative">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 shadow-lg">
                  <ThumbsUp className="h-5 w-5 text-white" />
                </div>
                <Badge variant="secondary" className="text-xs font-medium">
                  85%
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">Recomendariam</p>
              <p className="text-3xl font-bold">214</p>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
            <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-violet-500 to-purple-500" />
            <CardContent className="p-4 relative">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 shadow-lg">
                  <Reply className="h-5 w-5 text-white" />
                </div>
                <Badge variant="secondary" className="text-xs font-medium text-emerald-600">
                  Bom
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">Taxa de Resposta</p>
              <p className="text-3xl font-bold">{responseRate}%</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Reviews List */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <CardTitle className="text-lg">Avaliações Recentes</CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="Buscar..." 
                        className="pl-9 w-full sm:w-[200px]"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </div>
                    <Select value={filterRating} onValueChange={setFilterRating}>
                      <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="Nota" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas</SelectItem>
                        <SelectItem value="5">5 estrelas</SelectItem>
                        <SelectItem value="4">4 estrelas</SelectItem>
                        <SelectItem value="3">3 estrelas</SelectItem>
                        <SelectItem value="2">2 estrelas</SelectItem>
                        <SelectItem value="1">1 estrela</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredReviews.map((review) => (
                  <Card 
                    key={review.id}
                    className={cn(
                      "border-border/50 transition-all duration-300 hover:shadow-md",
                      review.status === "attention" && "border-amber-500/30 bg-amber-500/5",
                      review.status === "new" && "border-primary/30 bg-primary/5"
                    )}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-primary/10 text-primary font-medium">
                              {review.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-semibold text-sm">{review.patient}</p>
                              {review.status === "new" && (
                                <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
                                  Nova
                                </Badge>
                              )}
                              {review.status === "attention" && (
                                <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20 text-xs gap-1">
                                  <AlertTriangle className="h-3 w-3" />
                                  Atenção
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {review.professional} · {review.service}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i}
                                className={cn(
                                  "h-4 w-4",
                                  i < review.rating 
                                    ? "text-amber-500 fill-amber-500" 
                                    : "text-muted-foreground/30"
                                )}
                              />
                            ))}
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem 
                                className="gap-2"
                                onClick={() => {
                                  setSelectedReview(review);
                                  setIsResponseModalOpen(true);
                                }}
                              >
                                <Reply className="h-4 w-4" />
                                Responder
                              </DropdownMenuItem>
                              <DropdownMenuItem className="gap-2">
                                <Eye className="h-4 w-4" />
                                Ver Detalhes
                              </DropdownMenuItem>
                              <DropdownMenuItem className="gap-2">
                                <Flag className="h-4 w-4" />
                                Marcar
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-3">
                        {review.comment}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1.5">
                          {review.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center gap-2">
                          {review.replied && (
                            <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-xs gap-1">
                              <CheckCircle2 className="h-3 w-3" />
                              Respondida
                            </Badge>
                          )}
                          <span className="text-xs text-muted-foreground">{review.date}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Rating Distribution */}
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Distribuição de Notas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {ratingDistribution.map((item) => (
                    <div key={item.stars} className="flex items-center gap-3">
                      <div className="flex items-center gap-1 w-12">
                        <span className="text-sm font-medium">{item.stars}</span>
                        <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                      </div>
                      <div className="flex-1">
                        <Progress value={item.percentage} className="h-2" />
                      </div>
                      <span className="text-xs text-muted-foreground w-8">
                        {item.count}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Trend Chart */}
            <Card className="border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Evolução da Satisfação</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[150px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={satisfactionData}>
                      <defs>
                        <linearGradient id="colorNota" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={10} />
                      <YAxis domain={[3.5, 5]} stroke="hsl(var(--muted-foreground))" fontSize={10} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                          fontSize: '12px'
                        }}
                      />
                      <Area type="monotone" dataKey="nota" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorNota)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Attention Points */}
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  Pontos de Atenção
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {attentionPoints.map((point, index) => (
                    <div 
                      key={index}
                      className={cn(
                        "p-3 rounded-lg",
                        point.severity === "high" && "bg-red-500/5 border border-red-500/20",
                        point.severity === "medium" && "bg-amber-500/5 border border-amber-500/20",
                        point.severity === "low" && "bg-muted/50"
                      )}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium">{point.issue}</p>
                        {point.trend === "up" && <TrendingUp className="h-4 w-4 text-red-500" />}
                        {point.trend === "down" && <TrendingDown className="h-4 w-4 text-emerald-500" />}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {point.mentions} menções
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Professional Rankings */}
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Ranking Profissionais</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {professionalRatings.map((prof, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-xs font-bold text-primary">{index + 1}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">{prof.name}</p>
                          <p className="text-xs text-muted-foreground">{prof.specialty}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                          <span className="font-semibold text-sm">{prof.rating}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{prof.reviews} avaliações</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </PageContent>

      {/* Response Modal */}
      <ReviewResponseModal 
        review={selectedReview}
        open={isResponseModalOpen}
        onOpenChange={setIsResponseModalOpen}
      />

      <AIAnalysisModal open={isAIAnalysisOpen} onOpenChange={setIsAIAnalysisOpen} />
    </PageContainer>
  );
}
