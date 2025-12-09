import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Brain,
  Sparkles,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
  MessageSquare,
  Users,
  Star,
  Clock,
  RefreshCw,
  Download,
  ArrowRight
} from "lucide-react";

interface AIAnalysisModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const analysisResults = {
  sentiment: {
    positive: 78,
    neutral: 15,
    negative: 7
  },
  mainTopics: [
    { topic: "Atendimento", mentions: 145, sentiment: "positive", trend: "up" },
    { topic: "Tempo de Espera", mentions: 89, sentiment: "negative", trend: "stable" },
    { topic: "Pontualidade", mentions: 67, sentiment: "positive", trend: "up" },
    { topic: "Ambiente", mentions: 54, sentiment: "positive", trend: "up" },
    { topic: "Preço", mentions: 32, sentiment: "neutral", trend: "down" },
  ],
  insights: [
    {
      type: "success",
      title: "Excelência no Atendimento",
      description: "89% das menções sobre atendimento são positivas. Dr. Ricardo e Dra. Ana são os mais elogiados.",
      recommendation: "Considere reconhecer esses profissionais e usar como referência para treinamento."
    },
    {
      type: "warning",
      title: "Tempo de Espera Crítico",
      description: "43% das avaliações negativas mencionam tempo de espera. Segundas-feiras têm maior incidência.",
      recommendation: "Revisar alocação de profissionais e considerar sistema de agendamento por horário."
    },
    {
      type: "info",
      title: "Oportunidade de Melhoria",
      description: "Pacientes valorizam comunicação prévia sobre atrasos. Apenas 12% foram notificados.",
      recommendation: "Implementar sistema automático de notificação de atrasos."
    },
  ],
  predictions: [
    { metric: "Satisfação Geral", current: 4.7, predicted: 4.8, confidence: 85 },
    { metric: "Taxa de Recomendação", current: 85, predicted: 88, confidence: 78 },
    { metric: "NPS Score", current: 72, predicted: 76, confidence: 82 },
  ]
};

export function AIAnalysisModal({ open, onOpenChange }: AIAnalysisModalProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          setShowResults(true);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 shadow-lg">
              <Brain className="h-5 w-5 text-white" />
            </div>
            Análise com Inteligência Artificial
          </DialogTitle>
        </DialogHeader>

        {!showResults ? (
          <div className="py-8">
            {!isAnalyzing ? (
              <div className="text-center space-y-6">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-violet-500/10 to-purple-500/10 mx-auto flex items-center justify-center">
                  <Sparkles className="h-12 w-12 text-violet-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Análise Inteligente de Avaliações</h3>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    Nossa IA irá analisar todas as avaliações dos últimos 30 dias para identificar padrões, 
                    sentimentos e gerar insights acionáveis para sua clínica.
                  </p>
                </div>
                <div className="grid sm:grid-cols-3 gap-4 max-w-lg mx-auto">
                  {[
                    { icon: MessageSquare, label: "251 avaliações" },
                    { icon: Users, label: "198 pacientes" },
                    { icon: Clock, label: "30 dias" },
                  ].map((item, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-muted/50 text-center">
                      <item.icon className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                      <span className="text-xs font-medium">{item.label}</span>
                    </div>
                  ))}
                </div>
                <Button size="lg" className="gap-2" onClick={startAnalysis}>
                  <Sparkles className="h-4 w-4" />
                  Iniciar Análise
                </Button>
              </div>
            ) : (
              <div className="text-center space-y-6">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-violet-500/10 to-purple-500/10 mx-auto flex items-center justify-center relative">
                  <Brain className="h-12 w-12 text-violet-500 animate-pulse" />
                  <div className="absolute inset-0 rounded-3xl border-2 border-violet-500/30 animate-ping" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Analisando avaliações...</h3>
                  <p className="text-sm text-muted-foreground">
                    Processando padrões e gerando insights
                  </p>
                </div>
                <div className="max-w-xs mx-auto space-y-2">
                  <Progress value={progress} className="h-2" />
                  <p className="text-xs text-muted-foreground">{progress}% concluído</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6 py-4">
            {/* Sentiment Overview */}
            <Card className="border-border/50 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 to-transparent" />
              <CardContent className="p-4 relative">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <Star className="h-4 w-4 text-amber-500" />
                  Análise de Sentimento
                </h4>
                <div className="flex items-center gap-4">
                  <div className="flex-1 space-y-3">
                    {[
                      { label: "Positivo", value: analysisResults.sentiment.positive, color: "bg-emerald-500" },
                      { label: "Neutro", value: analysisResults.sentiment.neutral, color: "bg-amber-500" },
                      { label: "Negativo", value: analysisResults.sentiment.negative, color: "bg-red-500" },
                    ].map((item) => (
                      <div key={item.label} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{item.label}</span>
                          <span className="font-medium">{item.value}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className={cn("h-full rounded-full", item.color)}
                            style={{ width: `${item.value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-center px-6">
                    <div className="text-5xl font-bold text-emerald-500">
                      {analysisResults.sentiment.positive}%
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Satisfação Geral</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Main Topics */}
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-primary" />
                Principais Tópicos Mencionados
              </h4>
              <div className="grid sm:grid-cols-2 gap-3">
                {analysisResults.mainTopics.map((topic) => (
                  <div 
                    key={topic.topic}
                    className={cn(
                      "p-3 rounded-xl border transition-all hover:shadow-md",
                      topic.sentiment === "positive" && "bg-emerald-500/5 border-emerald-500/20",
                      topic.sentiment === "negative" && "bg-red-500/5 border-red-500/20",
                      topic.sentiment === "neutral" && "bg-muted/50 border-border/50"
                    )}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm">{topic.topic}</span>
                      <Badge variant="secondary" className={cn(
                        "text-xs gap-1",
                        topic.trend === "up" && "text-emerald-600",
                        topic.trend === "down" && "text-red-500"
                      )}>
                        {topic.trend === "up" ? <TrendingUp className="h-3 w-3" /> : 
                         topic.trend === "down" ? <TrendingDown className="h-3 w-3" /> : null}
                        {topic.mentions} menções
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Insights */}
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-amber-500" />
                Insights e Recomendações
              </h4>
              <div className="space-y-3">
                {analysisResults.insights.map((insight, idx) => (
                  <Card 
                    key={idx}
                    className={cn(
                      "border-border/50 overflow-hidden",
                      insight.type === "success" && "bg-emerald-500/5",
                      insight.type === "warning" && "bg-amber-500/5",
                      insight.type === "info" && "bg-blue-500/5"
                    )}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className={cn(
                          "p-2 rounded-lg",
                          insight.type === "success" && "bg-emerald-500/10",
                          insight.type === "warning" && "bg-amber-500/10",
                          insight.type === "info" && "bg-blue-500/10"
                        )}>
                          {insight.type === "success" && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
                          {insight.type === "warning" && <AlertTriangle className="h-4 w-4 text-amber-500" />}
                          {insight.type === "info" && <Lightbulb className="h-4 w-4 text-blue-500" />}
                        </div>
                        <div className="flex-1">
                          <h5 className="font-medium text-sm mb-1">{insight.title}</h5>
                          <p className="text-xs text-muted-foreground mb-2">{insight.description}</p>
                          <div className="flex items-center gap-2 text-xs">
                            <ArrowRight className="h-3 w-3 text-primary" />
                            <span className="text-primary font-medium">{insight.recommendation}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Predictions */}
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-emerald-500" />
                Previsões para os Próximos 30 Dias
              </h4>
              <div className="grid sm:grid-cols-3 gap-3">
                {analysisResults.predictions.map((pred) => (
                  <Card key={pred.metric} className="border-border/50">
                    <CardContent className="p-4 text-center">
                      <p className="text-xs text-muted-foreground mb-2">{pred.metric}</p>
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <span className="text-lg text-muted-foreground">{pred.current}</span>
                        <ArrowRight className="h-4 w-4 text-emerald-500" />
                        <span className="text-2xl font-bold text-emerald-500">{pred.predicted}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {pred.confidence}% confiança
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t">
              <Button variant="outline" className="gap-2" onClick={() => setShowResults(false)}>
                <RefreshCw className="h-4 w-4" />
                Nova Análise
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Exportar Relatório
                </Button>
                <Button className="gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Aplicar Sugestões
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
