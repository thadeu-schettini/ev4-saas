import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Star, ThumbsUp, ThumbsDown, MessageSquare, TrendingUp, Users, Calendar, ChevronRight, Eye, X, Reply, Flag } from "lucide-react";
import { toast } from "sonner";

interface SatisfactionSurveyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const satisfactionData = [
  { rating: "5 estrelas", count: 245, percentage: 52 },
  { rating: "4 estrelas", count: 156, percentage: 33 },
  { rating: "3 estrelas", count: 42, percentage: 9 },
  { rating: "2 estrelas", count: 18, percentage: 4 },
  { rating: "1 estrela", count: 9, percentage: 2 },
];

const recentFeedback = [
  { id: "1", clinic: "Clínica São Lucas", rating: 5, comment: "Atendimento excepcional! Resolveram meu problema em minutos.", agent: "Ana Paula", date: "Hoje, 10:30", status: "new", ticketId: "TK-1234" },
  { id: "2", clinic: "Centro Médico Vida", rating: 4, comment: "Bom suporte, mas demorou um pouco para responder inicialmente.", agent: "Carlos Silva", date: "Hoje, 09:15", status: "replied", ticketId: "TK-1233" },
  { id: "3", clinic: "Odonto Plus", rating: 5, comment: "Perfeito! Equipe muito profissional e atenciosa.", agent: "Marina Santos", date: "Ontem, 16:45", status: "new", ticketId: "TK-1232" },
  { id: "4", clinic: "Fisio Center", rating: 3, comment: "Problema resolvido, mas precisei explicar várias vezes.", agent: "Pedro Costa", date: "Ontem, 14:20", status: "flagged", ticketId: "TK-1231" },
  { id: "5", clinic: "Dermato Clinic", rating: 2, comment: "Demorou muito para resolver um problema simples.", agent: "João Mendes", date: "Ontem, 11:00", status: "new", ticketId: "TK-1230" },
  { id: "6", clinic: "CardioVida", rating: 5, comment: "Excelente atendimento, muito rápido e eficiente!", agent: "Ana Paula", date: "12/01/2024", status: "replied", ticketId: "TK-1229" },
];

export function SatisfactionSurveyModal({ open, onOpenChange }: SatisfactionSurveyModalProps) {
  const [period, setPeriod] = useState("month");
  const [viewingFeedback, setViewingFeedback] = useState<any>(null);
  const [replyText, setReplyText] = useState("");
  const [showReplyForm, setShowReplyForm] = useState(false);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? "fill-warning text-warning" : "text-muted"}`}
      />
    ));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new": return <Badge className="bg-info/20 text-info">Novo</Badge>;
      case "replied": return <Badge className="bg-success/20 text-success">Respondido</Badge>;
      case "flagged": return <Badge className="bg-warning/20 text-warning">Sinalizado</Badge>;
      default: return null;
    }
  };

  const handleViewFeedback = (feedback: any) => {
    setViewingFeedback(feedback);
    setShowReplyForm(false);
    setReplyText("");
  };

  const closeFeedbackDetail = () => {
    setViewingFeedback(null);
    setShowReplyForm(false);
    setReplyText("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-primary" />
            Pesquisa de Satisfação Pós-Atendimento
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-warning/10 to-transparent">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-4 w-4 text-warning fill-warning" />
                  <span className="text-sm text-muted-foreground">CSAT Score</span>
                </div>
                <div className="text-2xl font-bold">4.6</div>
                <div className="text-xs text-muted-foreground">de 5.0</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-success/10 to-transparent">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <ThumbsUp className="h-4 w-4 text-success" />
                  <span className="text-sm text-muted-foreground">Satisfeitos</span>
                </div>
                <div className="text-2xl font-bold text-success">85%</div>
                <div className="text-xs text-muted-foreground">4-5 estrelas</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-primary/10 to-transparent">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Respostas</span>
                </div>
                <div className="text-2xl font-bold">470</div>
                <div className="text-xs text-muted-foreground">este mês</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-info/10 to-transparent">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-info" />
                  <span className="text-sm text-muted-foreground">Taxa de Resposta</span>
                </div>
                <div className="text-2xl font-bold">72%</div>
                <div className="text-xs text-success">+5% vs mês anterior</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Distribuição de Avaliações</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {satisfactionData.map((item) => (
                    <div key={item.rating} className="flex items-center gap-3">
                      <div className="w-20 text-sm">{item.rating}</div>
                      <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                      <div className="w-12 text-right text-sm text-muted-foreground">
                        {item.count}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">NPS por Categoria</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                    <span className="font-medium">Tempo de Resposta</span>
                    <Badge className="bg-success/20 text-success">+72</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                    <span className="font-medium">Qualidade da Solução</span>
                    <Badge className="bg-success/20 text-success">+68</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                    <span className="font-medium">Comunicação</span>
                    <Badge className="bg-success/20 text-success">+75</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                    <span className="font-medium">Conhecimento Técnico</span>
                    <Badge className="bg-warning/20 text-warning">+58</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Feedback Recente
              </CardTitle>
            </CardHeader>
            <CardContent>
              {viewingFeedback ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Button variant="ghost" size="sm" onClick={closeFeedbackDetail}>
                      <X className="h-4 w-4 mr-2" /> Voltar à lista
                    </Button>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => setShowReplyForm(!showReplyForm)}>
                        <Reply className="h-4 w-4 mr-2" /> Responder
                      </Button>
                      <Button variant="outline" size="sm">
                        <Flag className="h-4 w-4 mr-2" /> Sinalizar
                      </Button>
                    </div>
                  </div>
                  
                  <Card className="bg-muted/30">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-3">
                            <span className="font-semibold text-lg">{viewingFeedback.clinic}</span>
                            {getStatusBadge(viewingFeedback.status)}
                          </div>
                          <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                            <span>Ticket: {viewingFeedback.ticketId}</span>
                            <span>•</span>
                            <span>Atendido por: {viewingFeedback.agent}</span>
                          </div>
                        </div>
                        <div className="flex">{renderStars(viewingFeedback.rating)}</div>
                      </div>
                      
                      <div className="p-4 bg-background rounded-lg mb-4">
                        <p className="text-foreground">{viewingFeedback.comment}</p>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{viewingFeedback.date}</span>
                      </div>

                      {showReplyForm && (
                        <div className="mt-4 pt-4 border-t">
                          <label className="text-sm font-medium mb-2 block">Responder ao feedback</label>
                          <Textarea 
                            placeholder="Escreva sua resposta ao cliente..."
                            className="mb-3"
                            rows={4}
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                          />
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" onClick={() => setShowReplyForm(false)}>
                              Cancelar
                            </Button>
                            <Button size="sm" className="transition-transform hover:scale-105 active:scale-95" onClick={() => { toast.success("Resposta enviada!"); setShowReplyForm(false); setReplyText(""); }}>
                              Enviar Resposta
                            </Button>
                          </div>
                        </div>
                      )}

                      {viewingFeedback.status === "replied" && !showReplyForm && (
                        <div className="mt-4 pt-4 border-t">
                          <div className="text-sm font-medium mb-2 flex items-center gap-2">
                            <Reply className="h-4 w-4 text-success" />
                            Resposta enviada
                          </div>
                          <div className="p-3 bg-success/10 rounded-lg text-sm">
                            <p>Olá! Agradecemos muito seu feedback positivo. Ficamos felizes em poder ajudar!</p>
                            <div className="text-xs text-muted-foreground mt-2">
                              Respondido por Ana Paula em {viewingFeedback.date}
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <ScrollArea className="h-[300px]">
                  <div className="space-y-3 pr-4">
                    {recentFeedback.map((feedback) => (
                      <Card 
                        key={feedback.id} 
                        className="bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                        onClick={() => handleViewFeedback(feedback)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium">{feedback.clinic}</span>
                                <div className="flex">{renderStars(feedback.rating)}</div>
                                {getStatusBadge(feedback.status)}
                              </div>
                              <p className="text-sm text-muted-foreground line-clamp-2">{feedback.comment}</p>
                              <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                <span>Atendido por: {feedback.agent}</span>
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {feedback.date}
                                </span>
                              </div>
                            </div>
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
