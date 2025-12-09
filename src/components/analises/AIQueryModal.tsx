import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  Brain,
  Send,
  Sparkles,
  User,
  Bot,
  TrendingUp,
  DollarSign,
  Users,
  Calendar,
  Lightbulb,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RefreshCw
} from "lucide-react";

interface AIQueryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const suggestedQuestions = [
  { icon: TrendingUp, text: "Qual foi o crescimento da receita nos últimos 3 meses?" },
  { icon: Users, text: "Quais são os horários com maior demanda de pacientes?" },
  { icon: DollarSign, text: "Qual especialidade gera mais receita?" },
  { icon: Calendar, text: "Como está a taxa de cancelamento por dia da semana?" },
];

type Message = {
  role: "user" | "assistant";
  content: string;
};

const initialMessages: Message[] = [
  {
    role: "assistant",
    content: "Olá! Sou sua assistente de análise de dados. Posso ajudá-lo a entender melhor os dados da sua clínica. Faça perguntas sobre receita, pacientes, agendamentos, produtividade ou qualquer outra métrica que desejar analisar."
  }
];

export function AIQueryModal({ open, onOpenChange }: AIQueryModalProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (text?: string) => {
    const question = text || input;
    if (!question.trim()) return;

    setMessages(prev => [...prev, { role: "user", content: question }]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses: Record<string, string> = {
        "Qual foi o crescimento da receita nos últimos 3 meses?": 
          "📈 **Análise de Crescimento de Receita**\n\nNos últimos 3 meses, a receita apresentou crescimento consistente:\n\n• **Outubro:** R$ 52.000 (+8% vs setembro)\n• **Novembro:** R$ 61.000 (+17% vs outubro)\n• **Dezembro (parcial):** R$ 67.500 (+11% projetado)\n\n✅ **Destaque:** O crescimento foi impulsionado principalmente pelo aumento de consultas em Cardiologia (+23%) e novos pacientes (+48 no período).",
        
        "Quais são os horários com maior demanda de pacientes?":
          "⏰ **Análise de Demanda por Horário**\n\nOs horários de pico identificados são:\n\n• **14h - 16h:** Maior demanda (ocupação média de 94%)\n• **10h - 12h:** Segunda maior demanda (ocupação de 87%)\n• **08h - 10h:** Demanda moderada (ocupação de 72%)\n\n💡 **Recomendação:** Considere alocar mais profissionais no período da tarde e oferecer descontos para horários de menor demanda (16h-18h).",
        
        "Qual especialidade gera mais receita?":
          "💰 **Receita por Especialidade**\n\nRanking de receita mensal:\n\n1. **Cardiologia:** R$ 28.500 (42% do total)\n2. **Dermatologia:** R$ 18.200 (27% do total)\n3. **Ortopedia:** R$ 12.800 (19% do total)\n4. **Outros:** R$ 8.000 (12% do total)\n\n📊 **Insight:** Cardiologia tem o maior ticket médio (R$ 285/consulta), enquanto Dermatologia tem maior volume de atendimentos.",
        
        "Como está a taxa de cancelamento por dia da semana?":
          "📅 **Taxa de Cancelamento Semanal**\n\n• **Segunda:** 15% (maior taxa ⚠️)\n• **Terça:** 8%\n• **Quarta:** 6%\n• **Quinta:** 7%\n• **Sexta:** 11%\n\n🔍 **Análise:** Segunda-feira tem taxa 2x maior que a média. Principais motivos: conflitos de agenda de trabalho e esquecimento pós-fim de semana.\n\n💡 **Ação sugerida:** Enviar lembretes no domingo à noite para consultas de segunda."
      };

      const response = responses[question] || 
        "🤔 Analisei seus dados e encontrei algumas informações relevantes sobre isso. Para uma análise mais detalhada, você pode especificar o período ou métricas específicas que gostaria de explorar.\n\nAlgumas sugestões:\n• Especifique um período (últimos 30 dias, trimestre, ano)\n• Mencione profissionais ou especialidades específicas\n• Pergunte sobre comparativos entre períodos";

      setMessages(prev => [...prev, { role: "assistant", content: response }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl h-[80vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-4 border-b">
          <DialogTitle className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 shadow-lg">
              <Brain className="h-5 w-5 text-white" />
            </div>
            Consultar IA
          </DialogTitle>
        </DialogHeader>

        {/* Messages */}
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-4">
            {messages.map((message, idx) => (
              <div
                key={idx}
                className={cn(
                  "flex gap-3",
                  message.role === "user" && "flex-row-reverse"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                  message.role === "assistant" 
                    ? "bg-gradient-to-br from-violet-500 to-purple-500" 
                    : "bg-primary"
                )}>
                  {message.role === "assistant" ? (
                    <Bot className="h-4 w-4 text-white" />
                  ) : (
                    <User className="h-4 w-4 text-primary-foreground" />
                  )}
                </div>
                <div className={cn(
                  "flex-1 max-w-[80%]",
                  message.role === "user" && "text-right"
                )}>
                  <Card className={cn(
                    "inline-block text-left",
                    message.role === "user" 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted/50"
                  )}>
                    <CardContent className="p-3">
                      <div className="text-sm whitespace-pre-wrap">
                        {message.content.split('\n').map((line, i) => {
                          if (line.startsWith('**') && line.endsWith('**')) {
                            return <strong key={i} className="block mb-1">{line.replace(/\*\*/g, '')}</strong>;
                          }
                          if (line.startsWith('•')) {
                            return <p key={i} className="ml-2">{line}</p>;
                          }
                          return <p key={i}>{line}</p>;
                        })}
                      </div>
                      {message.role === "assistant" && idx > 0 && (
                        <div className="flex items-center gap-2 mt-3 pt-2 border-t border-border/50">
                          <Button variant="ghost" size="sm" className="h-7 px-2 text-xs gap-1">
                            <Copy className="h-3 w-3" />
                            Copiar
                          </Button>
                          <Button variant="ghost" size="sm" className="h-7 px-2 text-xs gap-1">
                            <ThumbsUp className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-7 px-2 text-xs gap-1">
                            <ThumbsDown className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <Card className="bg-muted/50">
                  <CardContent className="p-3">
                    <div className="flex items-center gap-2">
                      <RefreshCw className="h-4 w-4 animate-spin text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Analisando dados...</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Suggested Questions */}
        {messages.length === 1 && (
          <div className="px-6 pb-4">
            <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
              <Lightbulb className="h-3 w-3" />
              Perguntas sugeridas
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((q, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  size="sm"
                  className="h-auto py-2 px-3 text-xs gap-2 text-left"
                  onClick={() => handleSend(q.text)}
                >
                  <q.icon className="h-3 w-3 flex-shrink-0" />
                  <span className="line-clamp-1">{q.text}</span>
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t bg-muted/30">
          <div className="flex gap-2">
            <Input
              placeholder="Faça uma pergunta sobre seus dados..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              disabled={isTyping}
            />
            <Button 
              size="icon" 
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            A IA analisa dados dos últimos 30 dias por padrão
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
