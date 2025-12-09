import { useState } from "react";
import { 
  Reply, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  FileText,
  ThumbsUp,
  AlertTriangle,
  Clock,
  User,
  Star,
  MessageSquare,
  Zap
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

interface Review {
  id: number;
  patient: string;
  avatar: string;
  professional: string;
  service: string;
  rating: number;
  date: string;
  comment: string;
  tags: string[];
  status: string;
  replied: boolean;
}

interface ReviewResponseModalProps {
  review: Review | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const responseTemplates = [
  {
    id: "agradecimento_positivo",
    name: "Agradecimento (Positiva)",
    icon: ThumbsUp,
    color: "from-emerald-500 to-green-500",
    forRating: [4, 5],
    template: `Olá {paciente}! 😊

Muito obrigado pelo seu feedback positivo! Ficamos muito felizes em saber que sua experiência com {profissional} foi satisfatória.

Sua avaliação é muito importante para nós e nos motiva a continuar oferecendo um atendimento de excelência.

Estamos à disposição para futuras consultas!

Atenciosamente,
Equipe MedClinic`
  },
  {
    id: "agradecimento_neutro",
    name: "Agradecimento (Neutra)",
    icon: MessageSquare,
    color: "from-blue-500 to-cyan-500",
    forRating: [3],
    template: `Olá {paciente}!

Agradecemos por compartilhar sua experiência conosco. Seu feedback é muito valioso e nos ajuda a identificar pontos de melhoria.

Gostaríamos de entender melhor sua experiência para podermos aprimorar nossos serviços. Se desejar, entre em contato conosco pelo telefone ou WhatsApp.

Atenciosamente,
Equipe MedClinic`
  },
  {
    id: "desculpas_negativa",
    name: "Desculpas (Negativa)",
    icon: AlertTriangle,
    color: "from-amber-500 to-orange-500",
    forRating: [1, 2],
    template: `Olá {paciente},

Lamentamos muito que sua experiência não tenha sido a esperada. Agradecemos por compartilhar seu feedback, pois ele é essencial para melhorarmos nossos serviços.

Gostaríamos de entrar em contato para entender melhor o ocorrido e encontrar uma solução. Nossa equipe de atendimento entrará em contato em breve.

Pedimos sinceras desculpas pelo inconveniente.

Atenciosamente,
Equipe MedClinic`
  },
  {
    id: "tempo_espera",
    name: "Tempo de Espera",
    icon: Clock,
    color: "from-violet-500 to-purple-500",
    forRating: [1, 2, 3, 4],
    template: `Olá {paciente}!

Agradecemos pelo seu feedback sobre o tempo de espera. Entendemos sua frustração e pedimos desculpas pelo ocorrido.

Estamos implementando melhorias em nossa gestão de agenda para reduzir o tempo de espera. Sua observação nos ajuda a priorizar essas mudanças.

Esperamos poder oferecer uma experiência melhor na sua próxima visita.

Atenciosamente,
Equipe MedClinic`
  },
  {
    id: "personalizado",
    name: "Personalizado",
    icon: FileText,
    color: "from-gray-500 to-slate-500",
    forRating: [1, 2, 3, 4, 5],
    template: ``
  },
];

export function ReviewResponseModal({ review, open, onOpenChange }: ReviewResponseModalProps) {
  const [response, setResponse] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  if (!review) return null;

  const applicableTemplates = responseTemplates.filter(
    t => t.forRating.includes(review.rating) || t.id === "personalizado"
  );

  const applyTemplate = (templateId: string) => {
    const template = responseTemplates.find(t => t.id === templateId);
    if (template) {
      const processedTemplate = template.template
        .replace(/{paciente}/g, review.patient.split(" ")[0])
        .replace(/{profissional}/g, review.professional);
      setResponse(processedTemplate);
      setSelectedTemplate(templateId);
    }
  };

  const handleGenerateAI = async () => {
    setIsGeneratingAI(true);
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const aiResponse = review.rating >= 4
      ? `Olá ${review.patient.split(" ")[0]}! 😊

Ficamos muito felizes com suas palavras! É gratificante saber que ${review.professional} proporcionou uma experiência positiva.

${review.tags.includes("Pontualidade") ? "Nos esforçamos para manter a pontualidade, pois valorizamos seu tempo." : ""}
${review.tags.includes("Atendimento") ? "Nossa equipe se dedica para oferecer o melhor atendimento possível." : ""}

Continue contando conosco para cuidar da sua saúde!

Com carinho,
Equipe MedClinic`
      : `Olá ${review.patient.split(" ")[0]},

Agradecemos seu feedback sincero. Lamentamos que sua experiência não tenha sido a melhor.

${review.tags.includes("Tempo de Espera") ? "Estamos trabalhando para melhorar nosso tempo de atendimento." : ""}
${review.tags.includes("Tempo de Consulta") ? "Vamos revisar nossos protocolos para garantir um atendimento mais completo." : ""}

Gostaríamos de conversar sobre sua experiência. Entre em contato conosco.

Atenciosamente,
Equipe MedClinic`;

    setResponse(aiResponse);
    setSelectedTemplate("ai");
    setIsGeneratingAI(false);
  };

  const handleSend = async () => {
    if (!response.trim()) {
      toast({
        title: "Resposta vazia",
        description: "Por favor, escreva uma resposta antes de enviar.",
        variant: "destructive"
      });
      return;
    }

    setIsSending(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Resposta enviada!",
      description: "O paciente receberá a resposta por e-mail.",
    });
    
    setIsSending(false);
    setResponse("");
    setSelectedTemplate(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Reply className="h-5 w-5 text-primary" />
            Responder Avaliação
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-6">
          {/* Review Summary */}
          <Card className="border-border/50 bg-muted/30">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary/10 text-primary font-medium">
                    {review.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{review.patient}</p>
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
                    </div>
                    <span className="text-xs text-muted-foreground">{review.date}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {review.professional} · {review.service}
                  </p>
                  <p className="text-sm">{review.comment}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {review.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Template Selection */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Templates de Resposta</Label>
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2"
                onClick={handleGenerateAI}
                disabled={isGeneratingAI}
              >
                <Sparkles className={cn("h-4 w-4", isGeneratingAI && "animate-pulse")} />
                {isGeneratingAI ? "Gerando..." : "Gerar com IA"}
              </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {applicableTemplates.map((template) => (
                <Card 
                  key={template.id}
                  className={cn(
                    "cursor-pointer border-border/50 hover:border-primary/30 transition-all duration-200",
                    selectedTemplate === template.id && "border-primary/50 bg-primary/5"
                  )}
                  onClick={() => applyTemplate(template.id)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "p-1.5 rounded-lg bg-gradient-to-br",
                        template.color
                      )}>
                        <template.icon className="h-3.5 w-3.5 text-white" />
                      </div>
                      <span className="text-xs font-medium">{template.name}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Response Editor */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Sua Resposta</Label>
            <Textarea 
              placeholder="Escreva sua resposta ao paciente..."
              className="min-h-[200px] resize-none"
              value={response}
              onChange={(e) => setResponse(e.target.value)}
            />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{response.length} caracteres</span>
              <span>Variáveis: {"{paciente}"}, {"{profissional}"}</span>
            </div>
          </div>

          {/* Preview */}
          {response && (
            <div className="space-y-3">
              <Label className="text-sm font-medium">Prévia da Resposta</Label>
              <Card className="border-border/50 bg-muted/20">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-primary/10">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">Equipe MedClinic</span>
                        <Badge variant="secondary" className="text-xs">Resposta Oficial</Badge>
                      </div>
                      <p className="text-sm whitespace-pre-line">{response}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline"
              className="gap-2"
              onClick={() => {
                setResponse("");
                setSelectedTemplate(null);
              }}
            >
              Limpar
            </Button>
            <Button 
              className="gap-2"
              onClick={handleSend}
              disabled={isSending || !response.trim()}
            >
              {isSending ? (
                <>
                  <Zap className="h-4 w-4 animate-pulse" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Enviar Resposta
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
