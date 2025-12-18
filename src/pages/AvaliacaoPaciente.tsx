import { useState } from "react";
import {
  Star,
  ThumbsUp,
  ThumbsDown,
  Send,
  CheckCircle2,
  Heart,
  Clock,
  Stethoscope,
  Building2,
  MessageSquare,
  Smile,
  Meh,
  Frown,
  Sparkles,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// Mock data - would come from URL params in real implementation
const appointmentData = {
  id: "apt-123",
  clinicName: "Clínica Saúde Total",
  clinicLogo: "/placeholder.svg",
  professionalName: "Dr. Ricardo Carvalho",
  professionalSpecialty: "Cardiologia",
  serviceName: "Consulta de Rotina",
  date: "15 de Dezembro, 2024",
  time: "14:30",
  patientName: "João Silva",
};

const experienceTags = [
  { id: "atendimento", label: "Atendimento", icon: Heart },
  { id: "pontualidade", label: "Pontualidade", icon: Clock },
  { id: "competencia", label: "Competência", icon: Stethoscope },
  { id: "ambiente", label: "Ambiente", icon: Building2 },
  { id: "comunicacao", label: "Comunicação", icon: MessageSquare },
  { id: "limpeza", label: "Limpeza", icon: Sparkles },
  { id: "privacidade", label: "Privacidade", icon: Shield },
];

const npsLabels = {
  0: "Muito improvável",
  1: "Improvável",
  2: "Improvável",
  3: "Neutro",
  4: "Neutro",
  5: "Neutro",
  6: "Neutro",
  7: "Provável",
  8: "Provável",
  9: "Muito provável",
  10: "Extremamente provável",
};

export default function AvaliacaoPaciente() {
  const [step, setStep] = useState(1);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [npsScore, setNpsScore] = useState<number | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [comment, setComment] = useState("");
  const [wouldRecommend, setWouldRecommend] = useState<boolean | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [overallExperience, setOverallExperience] = useState<"positive" | "neutral" | "negative" | null>(null);

  const toggleTag = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId) ? prev.filter((t) => t !== tagId) : [...prev, tagId]
    );
  };

  const handleSubmit = () => {
    // Validation
    if (rating === 0) {
      toast.error("Por favor, selecione uma avaliação de estrelas");
      return;
    }
    if (npsScore === null) {
      toast.error("Por favor, responda a pesquisa NPS");
      return;
    }

    // In real implementation, this would send data to the server
    setSubmitted(true);
    toast.success("Avaliação enviada com sucesso!");
  };

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center border-border/50 shadow-xl">
          <CardContent className="pt-12 pb-8 px-8">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center mx-auto mb-6 shadow-lg">
              <CheckCircle2 className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-2xl font-bold mb-3">Obrigado pela sua avaliação!</h1>
            <p className="text-muted-foreground mb-6">
              Sua opinião é muito importante para continuarmos melhorando nosso atendimento.
            </p>
            <div className="flex items-center justify-center gap-1 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={cn(
                    "h-8 w-8 transition-colors",
                    star <= rating ? "text-amber-500 fill-amber-500" : "text-muted"
                  )}
                />
              ))}
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-sm">
              <p className="text-muted-foreground">
                {appointmentData.clinicName} agradece sua confiança
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Star className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Avalie sua experiência</h1>
          <p className="text-muted-foreground">
            Sua opinião nos ajuda a melhorar continuamente
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">Progresso</span>
            <span className="font-medium">Etapa {step} de {totalSteps}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Appointment Info Card */}
        <Card className="mb-6 border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Stethoscope className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-semibold">{appointmentData.professionalName}</p>
                <p className="text-sm text-muted-foreground">
                  {appointmentData.professionalSpecialty} • {appointmentData.serviceName}
                </p>
                <p className="text-xs text-muted-foreground">
                  {appointmentData.date} às {appointmentData.time}
                </p>
              </div>
              <Badge variant="outline">{appointmentData.clinicName}</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Step Content */}
        <Card className="border-border/50 shadow-lg">
          <CardContent className="p-6">
            {/* Step 1: Star Rating */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-xl font-semibold mb-2">
                    Como você avalia o atendimento?
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    Selecione de 1 a 5 estrelas
                  </p>
                </div>

                <div className="flex justify-center gap-2 py-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-2 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary rounded-lg"
                    >
                      <Star
                        className={cn(
                          "h-12 w-12 transition-all duration-200",
                          (hoverRating || rating) >= star
                            ? "text-amber-500 fill-amber-500 drop-shadow-md"
                            : "text-muted-foreground/30"
                        )}
                      />
                    </button>
                  ))}
                </div>

                {rating > 0 && (
                  <div className="text-center">
                    <Badge
                      variant="secondary"
                      className={cn(
                        "text-base px-4 py-2",
                        rating >= 4 && "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
                        rating === 3 && "bg-amber-500/10 text-amber-600 border-amber-500/20",
                        rating < 3 && "bg-red-500/10 text-red-600 border-red-500/20"
                      )}
                    >
                      {rating === 5 && "Excelente! 🌟"}
                      {rating === 4 && "Muito bom! 👍"}
                      {rating === 3 && "Regular 😐"}
                      {rating === 2 && "Pode melhorar 😕"}
                      {rating === 1 && "Insatisfeito 😞"}
                    </Badge>
                  </div>
                )}

                {/* Overall Experience */}
                <div className="pt-6 border-t border-border">
                  <p className="text-sm font-medium mb-4 text-center">
                    Como foi sua experiência geral?
                  </p>
                  <div className="flex justify-center gap-4">
                    {[
                      { id: "positive", icon: Smile, label: "Positiva", color: "text-emerald-500" },
                      { id: "neutral", icon: Meh, label: "Neutra", color: "text-amber-500" },
                      { id: "negative", icon: Frown, label: "Negativa", color: "text-red-500" },
                    ].map((exp) => (
                      <button
                        key={exp.id}
                        onClick={() => setOverallExperience(exp.id as any)}
                        className={cn(
                          "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all",
                          overallExperience === exp.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <exp.icon className={cn("h-8 w-8", exp.color)} />
                        <span className="text-sm font-medium">{exp.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: NPS Score */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-xl font-semibold mb-2">
                    Você recomendaria nossa clínica?
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    Em uma escala de 0 a 10, qual a probabilidade de você recomendar a{" "}
                    {appointmentData.clinicName} para um amigo ou familiar?
                  </p>
                </div>

                <div className="py-6">
                  <div className="flex justify-between mb-2 text-xs text-muted-foreground">
                    <span>Pouco provável</span>
                    <span>Muito provável</span>
                  </div>
                  <div className="grid grid-cols-11 gap-1">
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
                      <button
                        key={score}
                        onClick={() => setNpsScore(score)}
                        className={cn(
                          "h-12 rounded-lg font-semibold transition-all text-sm",
                          npsScore === score
                            ? score <= 6
                              ? "bg-red-500 text-white ring-2 ring-red-500/50"
                              : score <= 8
                              ? "bg-amber-500 text-white ring-2 ring-amber-500/50"
                              : "bg-emerald-500 text-white ring-2 ring-emerald-500/50"
                            : "bg-muted hover:bg-muted/80"
                        )}
                      >
                        {score}
                      </button>
                    ))}
                  </div>
                  {npsScore !== null && (
                    <p className="text-center mt-4 text-sm font-medium">
                      {npsLabels[npsScore as keyof typeof npsLabels]}
                    </p>
                  )}
                </div>

                {/* Would Recommend */}
                <div className="pt-6 border-t border-border">
                  <p className="text-sm font-medium mb-4 text-center">
                    Você voltaria a se consultar conosco?
                  </p>
                  <div className="flex justify-center gap-4">
                    <Button
                      variant={wouldRecommend === true ? "default" : "outline"}
                      size="lg"
                      onClick={() => setWouldRecommend(true)}
                      className="gap-2"
                    >
                      <ThumbsUp className="h-5 w-5" />
                      Sim, com certeza
                    </Button>
                    <Button
                      variant={wouldRecommend === false ? "destructive" : "outline"}
                      size="lg"
                      onClick={() => setWouldRecommend(false)}
                      className="gap-2"
                    >
                      <ThumbsDown className="h-5 w-5" />
                      Talvez não
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Tags Selection */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-xl font-semibold mb-2">
                    O que você mais gostou?
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    Selecione os aspectos que se destacaram (opcional)
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 py-4">
                  {experienceTags.map((tag) => (
                    <button
                      key={tag.id}
                      onClick={() => toggleTag(tag.id)}
                      className={cn(
                        "flex items-center gap-2 p-3 rounded-xl border-2 transition-all",
                        selectedTags.includes(tag.id)
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <tag.icon className="h-4 w-4" />
                      <span className="text-sm font-medium">{tag.label}</span>
                      {selectedTags.includes(tag.id) && (
                        <CheckCircle2 className="h-4 w-4 ml-auto" />
                      )}
                    </button>
                  ))}
                </div>

                {selectedTags.length > 0 && (
                  <div className="flex flex-wrap gap-2 justify-center">
                    {selectedTags.map((tagId) => {
                      const tag = experienceTags.find((t) => t.id === tagId);
                      return (
                        <Badge key={tagId} variant="secondary" className="gap-1">
                          {tag?.label}
                        </Badge>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Comment */}
            {step === 4 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-xl font-semibold mb-2">
                    Deseja deixar um comentário?
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    Conte-nos mais sobre sua experiência (opcional)
                  </p>
                </div>

                <Textarea
                  placeholder="Escreva aqui seu comentário, sugestões ou críticas construtivas..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="min-h-[150px] resize-none"
                />

                <div className="text-xs text-muted-foreground text-center">
                  {comment.length}/500 caracteres
                </div>

                {/* Summary */}
                <div className="bg-muted/50 rounded-xl p-4 space-y-3">
                  <p className="text-sm font-semibold">Resumo da sua avaliação:</p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <span className="text-muted-foreground">Nota:</span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={cn(
                              "h-4 w-4",
                              star <= rating ? "text-amber-500 fill-amber-500" : "text-muted"
                            )}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">NPS:</span>{" "}
                      <span className="font-medium">{npsScore}/10</span>
                    </div>
                  </div>
                  {selectedTags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {selectedTags.map((tagId) => {
                        const tag = experienceTags.find((t) => t.id === tagId);
                        return (
                          <Badge key={tagId} variant="outline" className="text-xs">
                            {tag?.label}
                          </Badge>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between pt-6 border-t border-border mt-6">
              <Button
                variant="outline"
                onClick={() => setStep((s) => Math.max(1, s - 1))}
                disabled={step === 1}
              >
                Voltar
              </Button>
              {step < totalSteps ? (
                <Button onClick={() => setStep((s) => s + 1)}>Próximo</Button>
              ) : (
                <Button onClick={handleSubmit} className="gap-2">
                  <Send className="h-4 w-4" />
                  Enviar Avaliação
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 text-xs text-muted-foreground">
          <p>
            Sua avaliação é anônima e será usada apenas para melhorar nossos serviços.
          </p>
          <p className="mt-1">© {new Date().getFullYear()} {appointmentData.clinicName}</p>
        </div>
      </div>
    </div>
  );
}
