import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  Play, 
  Pause, 
  SkipForward, 
  CheckCircle, 
  Sparkles,
  Shield,
  TrendingUp,
  Crown,
  Users,
  MessageSquare,
  FileText,
  Video
} from "lucide-react";
import { useState, useEffect } from "react";

interface FeatureDemo {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  steps: {
    title: string;
    description: string;
    image?: string;
  }[];
  benefit: string;
}

interface FeaturePreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  feature: string;
  requiredPlan: string;
  onUpgrade: () => void;
}

const featureDemos: Record<string, FeatureDemo> = {
  "telemedicina": {
    id: "telemedicina",
    title: "Telemedicina Integrada",
    description: "Realize consultas online com sala virtual integrada e ferramentas profissionais",
    icon: Video,
    steps: [
      {
        title: "Criar Sala Virtual",
        description: "Crie salas de consulta online com um único clique. Links separados para médico e paciente.",
      },
      {
        title: "Interface Profissional",
        description: "Vídeo HD, compartilhamento de tela, chat em tempo real e gravação de consulta.",
      },
      {
        title: "Prontuário Integrado",
        description: "Acesse e preencha o prontuário durante a consulta online sem sair da tela.",
      },
    ],
    benefit: "Aumente sua capacidade de atendimento em até 40% com consultas online",
  },
  "ia-ilimitada": {
    id: "ia-ilimitada",
    title: "IA Ilimitada",
    description: "Assistente de IA avançado sem limites de uso para análises e sugestões clínicas",
    icon: Sparkles,
    steps: [
      {
        title: "Análise de Prontuários",
        description: "IA analisa histórico do paciente e sugere diagnósticos diferenciais baseados em evidências.",
      },
      {
        title: "Prescrições Inteligentes",
        description: "Detecção automática de interações medicamentosas e sugestões de dosagem personalizadas.",
      },
      {
        title: "Alertas de Segurança",
        description: "IA monitora alergias, contraindicações e riscos em tempo real durante a consulta.",
      },
    ],
    benefit: "Economize 2h por dia com assistência inteligente e reduza erros em 95%",
  },
  "relatorios-avancados": {
    id: "relatorios-avancados",
    title: "Relatórios Avançados",
    description: "Analytics completo com insights de negócio e métricas de performance",
    icon: TrendingUp,
    steps: [
      {
        title: "Dashboard Executivo",
        description: "Visualize receita, ocupação, taxa de retorno e performance da clínica em tempo real.",
      },
      {
        title: "Análise de Pacientes",
        description: "Identifique padrões de comportamento, taxa de no-show e oportunidades de fidelização.",
      },
      {
        title: "Relatórios Customizados",
        description: "Crie relatórios personalizados com os KPIs que importam para seu negócio.",
      },
    ],
    benefit: "Tome decisões baseadas em dados e aumente a receita em até 30%",
  },
  "gestor-dedicado": {
    id: "gestor-dedicado",
    title: "Gestor de Conta Dedicado",
    description: "Suporte personalizado com gestor exclusivo para sua clínica",
    icon: Crown,
    steps: [
      {
        title: "Onboarding Personalizado",
        description: "Seu gestor configura tudo para você e treina sua equipe presencialmente ou online.",
      },
      {
        title: "Suporte Prioritário",
        description: "Linha direta via WhatsApp, telefone e email com resposta em menos de 1 hora.",
      },
      {
        title: "Otimização Contínua",
        description: "Reuniões mensais para análise de métricas e sugestões de melhoria operacional.",
      },
    ],
    benefit: "Tenha um especialista dedicado ao sucesso da sua clínica 24/7",
  },
};

export const FeaturePreviewModal = ({
  open,
  onOpenChange,
  feature,
  requiredPlan,
  onUpgrade,
}: FeaturePreviewModalProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const demo = featureDemos[feature] || featureDemos["telemedicina"];
  const DemoIcon = demo.icon;

  useEffect(() => {
    if (isPlaying && open) {
      const timer = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= demo.steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 3000);

      return () => clearInterval(timer);
    }
  }, [isPlaying, open, demo.steps.length]);

  useEffect(() => {
    if (open) {
      setCurrentStep(0);
      setIsPlaying(false);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <DemoIcon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-2xl">{demo.title}</DialogTitle>
                <p className="text-sm text-muted-foreground mt-1">{demo.description}</p>
              </div>
            </div>
            <Badge className="gap-1">
              <Crown className="h-3 w-3" />
              {requiredPlan}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Preview Area */}
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-2 p-8 min-h-[300px] flex items-center justify-center">
            <div className="text-center space-y-4 max-w-2xl animate-fade-in" key={currentStep}>
              <div className="inline-flex h-16 w-16 rounded-full bg-primary/20 items-center justify-center mb-4">
                <DemoIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">{demo.steps[currentStep].title}</h3>
              <p className="text-lg text-muted-foreground">
                {demo.steps[currentStep].description}
              </p>
            </div>
          </Card>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsPlaying(!isPlaying)}
              className="h-12 w-12"
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>
            <div className="flex gap-2">
              {demo.steps.map((_, idx) => (
                <button
                  key={idx}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentStep
                      ? "w-8 bg-primary"
                      : idx < currentStep
                      ? "w-2 bg-primary/50"
                      : "w-2 bg-muted"
                  }`}
                  onClick={() => {
                    setCurrentStep(idx);
                    setIsPlaying(false);
                  }}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                if (currentStep < demo.steps.length - 1) {
                  setCurrentStep(currentStep + 1);
                }
              }}
              disabled={currentStep >= demo.steps.length - 1}
              className="h-12 w-12"
            >
              <SkipForward className="h-5 w-5" />
            </Button>
          </div>

          {/* Steps List */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {demo.steps.map((step, idx) => (
              <Card
                key={idx}
                className={`p-4 cursor-pointer transition-all ${
                  idx === currentStep
                    ? "border-2 border-primary bg-primary/5"
                    : idx < currentStep
                    ? "border-primary/30 bg-muted/50"
                    : "border-border"
                }`}
                onClick={() => {
                  setCurrentStep(idx);
                  setIsPlaying(false);
                }}
              >
                <div className="flex items-start gap-3">
                  {idx < currentStep ? (
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 shrink-0 mt-0.5 flex items-center justify-center text-xs font-bold">
                      {idx + 1}
                    </div>
                  )}
                  <div>
                    <h4 className="font-semibold text-sm">{step.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{step.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Benefit Banner */}
          <Card className="bg-gradient-to-r from-success/10 to-success-light/10 border-2 border-success/30 p-6">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-success/20 flex items-center justify-center shrink-0">
                <TrendingUp className="h-5 w-5 text-success" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-lg mb-1">Impacto no seu negócio</h4>
                <p className="text-muted-foreground">{demo.benefit}</p>
              </div>
            </div>
          </Card>

          {/* CTA */}
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
              Fechar Preview
            </Button>
            <Button className="flex-1 gap-2" onClick={onUpgrade}>
              <Crown className="h-4 w-4" />
              Desbloquear Agora
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
