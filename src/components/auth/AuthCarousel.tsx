import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sparkles,
  Star,
  Lightbulb,
  TrendingUp,
  Zap,
  Calendar,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Rocket,
  Brain,
  Shield,
  Clock,
  Users,
  HeartPulse,
} from "lucide-react";

type SlideType = "feature" | "testimonial" | "tip";

interface Slide {
  id: number;
  type: SlideType;
  data: FeatureData | TestimonialData | TipData;
}

interface FeatureData {
  badge: string;
  title: string;
  description: string;
  icon: React.ElementType;
  gradient: string;
  highlights: string[];
}

interface TestimonialData {
  quote: string;
  author: string;
  role: string;
  clinic: string;
  avatar?: string;
  rating: number;
}

interface TipData {
  title: string;
  tip: string;
  icon: React.ElementType;
  shortcut?: string;
}

const slides: Slide[] = [
  {
    id: 1,
    type: "feature",
    data: {
      badge: "Novo",
      title: "IA para Transcrição de Consultas",
      description: "Grave suas consultas e deixe a IA organizar automaticamente as informações no prontuário.",
      icon: Brain,
      gradient: "from-violet-500 to-purple-600",
      highlights: ["Transcrição em tempo real", "Organização automática", "Revisão simplificada"]
    }
  },
  {
    id: 2,
    type: "testimonial",
    data: {
      quote: "O MedClinic transformou completamente a gestão da minha clínica. Economizo 3 horas por dia em tarefas administrativas.",
      author: "Dra. Carolina Mendes",
      role: "Cardiologista",
      clinic: "CardioVida",
      rating: 5
    }
  },
  {
    id: 3,
    type: "tip",
    data: {
      title: "Dica do Dia",
      tip: "Use Ctrl+K para abrir a paleta de comandos e acessar qualquer funcionalidade rapidamente.",
      icon: Zap,
      shortcut: "Ctrl + K"
    }
  },
  {
    id: 4,
    type: "feature",
    data: {
      badge: "Em breve",
      title: "Integração com Laboratórios",
      description: "Receba resultados de exames diretamente no prontuário do paciente com alertas automáticos.",
      icon: HeartPulse,
      gradient: "from-emerald-500 to-teal-600",
      highlights: ["Resultados em tempo real", "Alertas automáticos", "Histórico integrado"]
    }
  },
  {
    id: 5,
    type: "testimonial",
    data: {
      quote: "A agenda inteligente reduziu nosso no-show em 40%. Os lembretes automáticos por WhatsApp são incríveis!",
      author: "Dr. Rafael Santos",
      role: "Ortopedista",
      clinic: "OrtoCenter",
      rating: 5
    }
  },
  {
    id: 6,
    type: "tip",
    data: {
      title: "Produtividade",
      tip: "Crie modelos de prontuário personalizados para cada tipo de consulta e economize tempo no preenchimento.",
      icon: Clock,
    }
  },
  {
    id: 7,
    type: "feature",
    data: {
      badge: "Atualização",
      title: "Dashboard de Métricas Aprimorado",
      description: "Novos gráficos e KPIs para acompanhar o desempenho da sua clínica em tempo real.",
      icon: TrendingUp,
      gradient: "from-blue-500 to-cyan-600",
      highlights: ["Receita em tempo real", "Taxa de ocupação", "Previsão de demanda"]
    }
  },
  {
    id: 8,
    type: "testimonial",
    data: {
      quote: "Finalmente um sistema que entende as necessidades de uma clínica médica. Intuitivo e completo!",
      author: "Dra. Amanda Lima",
      role: "Dermatologista",
      clinic: "DermaCare",
      rating: 5
    }
  },
];

// Shuffle array utility
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export function AuthCarousel() {
  const [shuffledSlides] = useState(() => shuffleArray(slides));
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % shuffledSlides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, shuffledSlides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 15000);
  };

  const nextSlide = () => goToSlide((currentSlide + 1) % shuffledSlides.length);
  const prevSlide = () => goToSlide((currentSlide - 1 + shuffledSlides.length) % shuffledSlides.length);

  const slide = shuffledSlides[currentSlide];

  return (
    <div className="relative h-full flex flex-col">
      {/* Slide Content */}
      <div className="flex-1 flex flex-col justify-center">
        <div 
          key={slide.id} 
          className="animate-fade-in"
        >
          {slide.type === "feature" && <FeatureSlide data={slide.data as FeatureData} />}
          {slide.type === "testimonial" && <TestimonialSlide data={slide.data as TestimonialData} />}
          {slide.type === "tip" && <TipSlide data={slide.data as TipData} />}
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-auto pb-8">
        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {shuffledSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                currentSlide === index
                  ? "w-8 bg-white" 
                  : "w-2 bg-white/40 hover:bg-white/60"
              )}
            />
          ))}
        </div>

        {/* Arrows */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={prevSlide}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all hover:scale-110"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all hover:scale-110"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function FeatureSlide({ data }: { data: FeatureData }) {
  const Icon = data.icon;
  
  return (
    <div className="space-y-6">
      <Badge className="bg-white/20 text-white border-0 hover:bg-white/30 text-sm px-4 py-1.5">
        <Rocket className="w-3.5 h-3.5 mr-2" />
        {data.badge}
      </Badge>

      <div className={cn(
        "w-20 h-20 rounded-2xl flex items-center justify-center bg-gradient-to-br shadow-2xl",
        data.gradient
      )}>
        <Icon className="w-10 h-10 text-white" />
      </div>

      <div>
        <h3 className="text-3xl font-bold mb-3">{data.title}</h3>
        <p className="text-lg text-white/70 leading-relaxed max-w-md">
          {data.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        {data.highlights.map((highlight, i) => (
          <div 
            key={i}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10"
          >
            <Sparkles className="w-4 h-4 text-white/80" />
            <span className="text-sm font-medium">{highlight}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TestimonialSlide({ data }: { data: TestimonialData }) {
  return (
    <div className="space-y-6">
      <Badge className="bg-white/20 text-white border-0 hover:bg-white/30 text-sm px-4 py-1.5">
        <MessageSquare className="w-3.5 h-3.5 mr-2" />
        Depoimento
      </Badge>

      {/* Rating */}
      <div className="flex gap-1">
        {Array.from({ length: data.rating }).map((_, i) => (
          <Star key={i} className="w-6 h-6 fill-amber-400 text-amber-400" />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-2xl xl:text-3xl font-medium leading-relaxed max-w-lg">
        "{data.quote}"
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-4 pt-4">
        <Avatar className="w-14 h-14 border-2 border-white/30">
          <AvatarFallback className="bg-white/20 text-white font-bold text-lg">
            {data.author.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="font-semibold text-lg">{data.author}</div>
          <div className="text-white/70">
            {data.role} • {data.clinic}
          </div>
        </div>
      </div>
    </div>
  );
}

function TipSlide({ data }: { data: TipData }) {
  const Icon = data.icon;

  return (
    <div className="space-y-6">
      <Badge className="bg-white/20 text-white border-0 hover:bg-white/30 text-sm px-4 py-1.5">
        <Lightbulb className="w-3.5 h-3.5 mr-2" />
        {data.title}
      </Badge>

      <div className="w-20 h-20 rounded-2xl flex items-center justify-center bg-gradient-to-br from-amber-400 to-orange-500 shadow-2xl">
        <Icon className="w-10 h-10 text-white" />
      </div>

      <p className="text-2xl xl:text-3xl font-medium leading-relaxed max-w-lg">
        {data.tip}
      </p>

      {data.shortcut && (
        <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
          <span className="text-white/70">Atalho:</span>
          <kbd className="px-3 py-1.5 rounded-lg bg-white/20 font-mono text-sm font-semibold">
            {data.shortcut}
          </kbd>
        </div>
      )}
    </div>
  );
}
