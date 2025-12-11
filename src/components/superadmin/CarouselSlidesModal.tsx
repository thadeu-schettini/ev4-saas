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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  GripVertical,
  Eye,
  EyeOff,
  Pencil,
  Trash2,
  MoreVertical,
  Rocket,
  MessageSquare,
  Lightbulb,
  Brain,
  TrendingUp,
  HeartPulse,
  Zap,
  Shield,
  Star,
  Clock,
  Copy,
  ChevronUp,
  ChevronDown,
  Sparkles,
  Image,
  Save,
  Monitor,
} from "lucide-react";
import { toast } from "sonner";

interface CarouselSlidesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type SlideType = "feature" | "testimonial" | "tip";

interface SlideItem {
  id: number;
  type: SlideType;
  active: boolean;
  order: number;
  title: string;
  description: string;
  badge?: string;
  icon: string;
  gradient?: string;
  highlights?: string[];
  author?: string;
  role?: string;
  clinic?: string;
  rating?: number;
  shortcut?: string;
}

const mockSlides: SlideItem[] = [
  {
    id: 1,
    type: "feature",
    active: true,
    order: 1,
    title: "IA para Transcrição de Consultas",
    description: "Grave suas consultas e deixe a IA organizar automaticamente as informações no prontuário.",
    badge: "Novo",
    icon: "Brain",
    gradient: "from-violet-500 to-purple-600",
    highlights: ["Transcrição em tempo real", "Organização automática", "Revisão simplificada"],
  },
  {
    id: 2,
    type: "testimonial",
    active: true,
    order: 2,
    title: "Depoimento",
    description: "O MedClinic transformou completamente a gestão da minha clínica. Economizo 3 horas por dia em tarefas administrativas.",
    icon: "MessageSquare",
    author: "Dra. Carolina Mendes",
    role: "Cardiologista",
    clinic: "CardioVida",
    rating: 5,
  },
  {
    id: 3,
    type: "tip",
    active: true,
    order: 3,
    title: "Dica do Dia",
    description: "Use Ctrl+K para abrir a paleta de comandos e acessar qualquer funcionalidade rapidamente.",
    icon: "Zap",
    shortcut: "Ctrl + K",
  },
  {
    id: 4,
    type: "feature",
    active: true,
    order: 4,
    title: "Integração com Laboratórios",
    description: "Receba resultados de exames diretamente no prontuário do paciente com alertas automáticos.",
    badge: "Em breve",
    icon: "HeartPulse",
    gradient: "from-emerald-500 to-teal-600",
    highlights: ["Resultados em tempo real", "Alertas automáticos", "Histórico integrado"],
  },
  {
    id: 5,
    type: "testimonial",
    active: true,
    order: 5,
    title: "Depoimento",
    description: "A agenda inteligente reduziu nosso no-show em 40%. Os lembretes automáticos por WhatsApp são incríveis!",
    icon: "MessageSquare",
    author: "Dr. Rafael Santos",
    role: "Ortopedista",
    clinic: "OrtoCenter",
    rating: 5,
  },
  {
    id: 6,
    type: "tip",
    active: false,
    order: 6,
    title: "Produtividade",
    description: "Crie modelos de prontuário personalizados para cada tipo de consulta e economize tempo no preenchimento.",
    icon: "Clock",
  },
  {
    id: 7,
    type: "feature",
    active: true,
    order: 7,
    title: "Dashboard de Métricas Aprimorado",
    description: "Novos gráficos e KPIs para acompanhar o desempenho da sua clínica em tempo real.",
    badge: "Atualização",
    icon: "TrendingUp",
    gradient: "from-blue-500 to-cyan-600",
    highlights: ["Receita em tempo real", "Taxa de ocupação", "Previsão de demanda"],
  },
  {
    id: 8,
    type: "testimonial",
    active: false,
    order: 8,
    title: "Depoimento",
    description: "Finalmente um sistema que entende as necessidades de uma clínica médica. Intuitivo e completo!",
    icon: "MessageSquare",
    author: "Dra. Amanda Lima",
    role: "Dermatologista",
    clinic: "DermaCare",
    rating: 5,
  },
];

const iconOptions = [
  { value: "Brain", label: "Cérebro/IA", icon: Brain },
  { value: "TrendingUp", label: "Gráfico", icon: TrendingUp },
  { value: "HeartPulse", label: "Saúde", icon: HeartPulse },
  { value: "Zap", label: "Raio", icon: Zap },
  { value: "Shield", label: "Escudo", icon: Shield },
  { value: "Clock", label: "Relógio", icon: Clock },
  { value: "Sparkles", label: "Estrelas", icon: Sparkles },
  { value: "MessageSquare", label: "Mensagem", icon: MessageSquare },
];

const gradientOptions = [
  { value: "from-violet-500 to-purple-600", label: "Roxo" },
  { value: "from-emerald-500 to-teal-600", label: "Verde" },
  { value: "from-blue-500 to-cyan-600", label: "Azul" },
  { value: "from-amber-500 to-orange-500", label: "Laranja" },
  { value: "from-rose-500 to-pink-600", label: "Rosa" },
  { value: "from-primary to-blue-600", label: "Primário" },
];

export function CarouselSlidesModal({ open, onOpenChange }: CarouselSlidesModalProps) {
  const [slides, setSlides] = useState<SlideItem[]>(mockSlides);
  const [editingSlide, setEditingSlide] = useState<SlideItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const activeCount = slides.filter(s => s.active).length;
  
  const getTypeLabel = (type: SlideType) => {
    switch (type) {
      case "feature": return "Novidade";
      case "testimonial": return "Depoimento";
      case "tip": return "Dica";
    }
  };

  const getTypeBadge = (type: SlideType) => {
    switch (type) {
      case "feature": return "bg-primary/10 text-primary";
      case "testimonial": return "bg-warning/10 text-warning";
      case "tip": return "bg-info/10 text-info";
    }
  };

  const getIconComponent = (iconName: string) => {
    const found = iconOptions.find(i => i.value === iconName);
    return found?.icon || Sparkles;
  };

  const toggleActive = (id: number) => {
    setSlides(prev => prev.map(s => 
      s.id === id ? { ...s, active: !s.active } : s
    ));
  };

  const moveSlide = (id: number, direction: "up" | "down") => {
    const index = slides.findIndex(s => s.id === id);
    if ((direction === "up" && index === 0) || (direction === "down" && index === slides.length - 1)) return;
    
    const newSlides = [...slides];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    [newSlides[index], newSlides[targetIndex]] = [newSlides[targetIndex], newSlides[index]];
    newSlides.forEach((s, i) => s.order = i + 1);
    setSlides(newSlides);
  };

  const duplicateSlide = (slide: SlideItem) => {
    const newSlide = {
      ...slide,
      id: Math.max(...slides.map(s => s.id)) + 1,
      title: `${slide.title} (Cópia)`,
      order: slides.length + 1,
    };
    setSlides([...slides, newSlide]);
    toast.success("Slide duplicado");
  };

  const deleteSlide = (id: number) => {
    setSlides(prev => prev.filter(s => s.id !== id));
    toast.success("Slide removido");
  };

  const handleSave = () => {
    toast.success("Alterações salvas com sucesso!");
    onOpenChange(false);
  };

  const startCreate = (type: SlideType) => {
    const newSlide: SlideItem = {
      id: Math.max(...slides.map(s => s.id)) + 1,
      type,
      active: true,
      order: slides.length + 1,
      title: type === "feature" ? "Nova Funcionalidade" : type === "testimonial" ? "Novo Depoimento" : "Nova Dica",
      description: "",
      icon: type === "feature" ? "Sparkles" : type === "testimonial" ? "MessageSquare" : "Lightbulb",
      ...(type === "feature" && { badge: "Novo", gradient: "from-primary to-blue-600", highlights: [] }),
      ...(type === "testimonial" && { author: "", role: "", clinic: "", rating: 5 }),
      ...(type === "tip" && { shortcut: "" }),
    };
    setEditingSlide(newSlide);
    setIsCreating(true);
  };

  const saveSlide = () => {
    if (!editingSlide) return;
    
    if (isCreating) {
      setSlides([...slides, editingSlide]);
    } else {
      setSlides(prev => prev.map(s => s.id === editingSlide.id ? editingSlide : s));
    }
    
    setEditingSlide(null);
    setIsCreating(false);
    toast.success(isCreating ? "Slide criado" : "Slide atualizado");
  };

  // Preview components
  const SlidePreview = ({ slide }: { slide: SlideItem }) => {
    const IconComponent = getIconComponent(slide.icon);
    
    if (slide.type === "feature") {
      return (
        <div className="space-y-4">
          <Badge className="bg-white/20 text-white border-0 text-xs px-3 py-1">
            <Rocket className="w-3 h-3 mr-1.5" />
            {slide.badge || "Novo"}
          </Badge>
          <div className={cn(
            "w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br shadow-xl",
            slide.gradient || "from-primary to-blue-600"
          )}>
            <IconComponent className="w-7 h-7 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">{slide.title || "Título"}</h3>
            <p className="text-sm text-white/70 leading-relaxed">
              {slide.description || "Descrição do slide..."}
            </p>
          </div>
          {slide.highlights && slide.highlights.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {slide.highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 text-xs">
                  <Sparkles className="w-3 h-3" />
                  {h}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }
    
    if (slide.type === "testimonial") {
      return (
        <div className="space-y-4">
          <Badge className="bg-white/20 text-white border-0 text-xs px-3 py-1">
            <MessageSquare className="w-3 h-3 mr-1.5" />
            Depoimento
          </Badge>
          <div className="flex gap-1">
            {Array.from({ length: slide.rating || 5 }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <blockquote className="text-lg font-medium leading-relaxed">
            "{slide.description || "Depoimento do cliente..."}"
          </blockquote>
          <div className="flex items-center gap-3 pt-2">
            <Avatar className="w-10 h-10 border-2 border-white/30">
              <AvatarFallback className="bg-white/20 text-white text-sm">
                {(slide.author || "??").split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold text-sm">{slide.author || "Nome do Autor"}</div>
              <div className="text-white/70 text-xs">
                {slide.role || "Cargo"} • {slide.clinic || "Clínica"}
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    return (
      <div className="space-y-4">
        <Badge className="bg-white/20 text-white border-0 text-xs px-3 py-1">
          <Lightbulb className="w-3 h-3 mr-1.5" />
          {slide.title || "Dica"}
        </Badge>
        <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br from-amber-400 to-orange-500 shadow-xl">
          <IconComponent className="w-7 h-7 text-white" />
        </div>
        <p className="text-lg font-medium leading-relaxed">
          {slide.description || "Conteúdo da dica..."}
        </p>
        {slide.shortcut && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/20">
            <span className="text-white/70 text-sm">Atalho:</span>
            <kbd className="px-2 py-1 rounded bg-white/20 font-mono text-xs font-semibold">
              {slide.shortcut}
            </kbd>
          </div>
        )}
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                <Image className="h-6 w-6 text-white" />
              </div>
              <div>
                <DialogTitle className="text-xl">Gerenciar Carrossel do Login</DialogTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {activeCount} slides ativos • Ordem aleatória para cada visitante
                </p>
              </div>
            </div>
            <Button onClick={handleSave} className="gap-2">
              <Save className="h-4 w-4" />
              Salvar
            </Button>
          </div>
        </DialogHeader>

        {editingSlide ? (
          <div className="flex flex-col lg:flex-row min-h-[500px]">
            {/* Form Panel */}
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-lg">
                  {isCreating ? "Criar" : "Editar"} {getTypeLabel(editingSlide.type)}
                </h3>
                <Button variant="outline" size="sm" onClick={() => { setEditingSlide(null); setIsCreating(false); }}>
                  Cancelar
                </Button>
              </div>

              <div className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Título</Label>
                    <Input 
                      value={editingSlide.title}
                      onChange={(e) => setEditingSlide({ ...editingSlide, title: e.target.value })}
                      placeholder="Título do slide"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Ícone</Label>
                    <Select 
                      value={editingSlide.icon} 
                      onValueChange={(v) => setEditingSlide({ ...editingSlide, icon: v })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {iconOptions.map(opt => (
                          <SelectItem key={opt.value} value={opt.value}>
                            <span className="flex items-center gap-2">
                              <opt.icon className="h-4 w-4" />
                              {opt.label}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Descrição / Conteúdo</Label>
                  <Textarea 
                    value={editingSlide.description}
                    onChange={(e) => setEditingSlide({ ...editingSlide, description: e.target.value })}
                    placeholder="Texto do slide..."
                    className="min-h-[80px]"
                  />
                </div>

                {editingSlide.type === "feature" && (
                  <>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Badge</Label>
                        <Select 
                          value={editingSlide.badge || "Novo"} 
                          onValueChange={(v) => setEditingSlide({ ...editingSlide, badge: v })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Novo">Novo</SelectItem>
                            <SelectItem value="Em breve">Em breve</SelectItem>
                            <SelectItem value="Atualização">Atualização</SelectItem>
                            <SelectItem value="Beta">Beta</SelectItem>
                            <SelectItem value="Popular">Popular</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Gradiente</Label>
                        <Select 
                          value={editingSlide.gradient || gradientOptions[0].value} 
                          onValueChange={(v) => setEditingSlide({ ...editingSlide, gradient: v })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {gradientOptions.map(opt => (
                              <SelectItem key={opt.value} value={opt.value}>
                                <span className="flex items-center gap-2">
                                  <div className={cn("w-4 h-4 rounded bg-gradient-to-r", opt.value)} />
                                  {opt.label}
                                </span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Destaques (separados por vírgula)</Label>
                      <Input 
                        value={editingSlide.highlights?.join(", ") || ""}
                        onChange={(e) => setEditingSlide({ 
                          ...editingSlide, 
                          highlights: e.target.value.split(",").map(s => s.trim()).filter(Boolean)
                        })}
                        placeholder="Destaque 1, Destaque 2, Destaque 3"
                      />
                    </div>
                  </>
                )}

                {editingSlide.type === "testimonial" && (
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Autor</Label>
                      <Input 
                        value={editingSlide.author || ""}
                        onChange={(e) => setEditingSlide({ ...editingSlide, author: e.target.value })}
                        placeholder="Nome do autor"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Cargo / Especialidade</Label>
                      <Input 
                        value={editingSlide.role || ""}
                        onChange={(e) => setEditingSlide({ ...editingSlide, role: e.target.value })}
                        placeholder="Cardiologista"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Clínica</Label>
                      <Input 
                        value={editingSlide.clinic || ""}
                        onChange={(e) => setEditingSlide({ ...editingSlide, clinic: e.target.value })}
                        placeholder="Nome da clínica"
                      />
                    </div>
                  </div>
                )}

                {editingSlide.type === "tip" && (
                  <div className="space-y-2">
                    <Label>Atalho (opcional)</Label>
                    <Input 
                      value={editingSlide.shortcut || ""}
                      onChange={(e) => setEditingSlide({ ...editingSlide, shortcut: e.target.value })}
                      placeholder="Ctrl + K"
                    />
                  </div>
                )}

                <div className="flex justify-end pt-4">
                  <Button onClick={saveSlide} className="gap-2">
                    <Save className="h-4 w-4" />
                    {isCreating ? "Criar Slide" : "Salvar Alterações"}
                  </Button>
                </div>
              </div>
            </div>

            {/* Preview Panel */}
            <div className="lg:w-[360px] border-t lg:border-t-0 lg:border-l bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white p-6 flex flex-col">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/20">
                <Monitor className="h-4 w-4" />
                <span className="text-sm font-medium">Preview em Tempo Real</span>
              </div>
              
              <div className="flex-1 flex items-center justify-center">
                <div className="w-full max-w-[280px]">
                  <SlidePreview slide={editingSlide} />
                </div>
              </div>
              
              <p className="text-xs text-white/50 text-center mt-4">
                As alterações aparecem instantaneamente
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Quick Add Buttons */}
            <div className="p-4 border-b bg-muted/30">
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-muted-foreground self-center mr-2">Adicionar:</span>
                <Button variant="outline" size="sm" className="gap-2" onClick={() => startCreate("feature")}>
                  <Rocket className="h-4 w-4 text-primary" />
                  Novidade
                </Button>
                <Button variant="outline" size="sm" className="gap-2" onClick={() => startCreate("testimonial")}>
                  <MessageSquare className="h-4 w-4 text-warning" />
                  Depoimento
                </Button>
                <Button variant="outline" size="sm" className="gap-2" onClick={() => startCreate("tip")}>
                  <Lightbulb className="h-4 w-4 text-info" />
                  Dica
                </Button>
              </div>
            </div>

            {/* Slides List */}
            <ScrollArea className="h-[450px]">
              <div className="p-4 space-y-2">
                {slides.map((slide, index) => {
                  const IconComponent = getIconComponent(slide.icon);
                  
                  return (
                    <div
                      key={slide.id}
                      className={cn(
                        "p-4 rounded-xl border bg-card transition-all",
                        !slide.active && "opacity-50"
                      )}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex flex-col items-center gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6"
                            onClick={() => moveSlide(slide.id, "up")}
                            disabled={index === 0}
                          >
                            <ChevronUp className="h-4 w-4" />
                          </Button>
                          <GripVertical className="h-4 w-4 text-muted-foreground" />
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6"
                            onClick={() => moveSlide(slide.id, "down")}
                            disabled={index === slides.length - 1}
                          >
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className={cn(
                          "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
                          slide.type === "feature" && slide.gradient ? `bg-gradient-to-br ${slide.gradient}` : "",
                          slide.type === "testimonial" && "bg-gradient-to-br from-amber-400 to-orange-500",
                          slide.type === "tip" && "bg-gradient-to-br from-amber-400 to-orange-500"
                        )}>
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <Badge className={cn("text-xs", getTypeBadge(slide.type))}>
                              {getTypeLabel(slide.type)}
                            </Badge>
                            {slide.badge && (
                              <Badge variant="outline" className="text-xs">
                                {slide.badge}
                              </Badge>
                            )}
                            {!slide.active && (
                              <Badge variant="secondary" className="text-xs">
                                <EyeOff className="h-3 w-3 mr-1" />
                                Oculto
                              </Badge>
                            )}
                          </div>
                          <h4 className="font-semibold truncate">{slide.title}</h4>
                          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                            {slide.description}
                          </p>
                          {slide.type === "testimonial" && slide.author && (
                            <p className="text-xs text-muted-foreground mt-1">
                              — {slide.author}, {slide.role}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <Switch 
                            checked={slide.active}
                            onCheckedChange={() => toggleActive(slide.id)}
                          />
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => setEditingSlide(slide)}>
                                <Pencil className="h-4 w-4 mr-2" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => duplicateSlide(slide)}>
                                <Copy className="h-4 w-4 mr-2" />
                                Duplicar
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="text-destructive"
                                onClick={() => deleteSlide(slide.id)}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Excluir
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
