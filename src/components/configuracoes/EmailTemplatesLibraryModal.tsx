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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Search,
  Star,
  Calendar,
  Gift,
  Bell,
  Heart,
  Sparkles,
  Mail,
  TrendingUp,
  Users,
  Clock,
  CheckCircle2,
  Eye,
  Copy,
  Download,
  Filter,
  Zap,
  MessageSquare,
  Award,
  Cake,
  RefreshCw,
  FileText,
  ShieldCheck,
  Stethoscope,
  Pill,
  AlertTriangle,
  ThumbsUp,
} from "lucide-react";
import { toast } from "sonner";

interface EmailTemplatesLibraryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectTemplate?: (template: EmailTemplate) => void;
}

interface EmailTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: any;
  tags: string[];
  popular: boolean;
  preview: string;
  subject: string;
  content: string;
}

const templateCategories = [
  { id: "all", name: "Todos", icon: Mail },
  { id: "agendamento", name: "Agendamento", icon: Calendar },
  { id: "marketing", name: "Marketing", icon: TrendingUp },
  { id: "engajamento", name: "Engajamento", icon: Heart },
  { id: "transacional", name: "Transacional", icon: FileText },
  { id: "lembretes", name: "Lembretes", icon: Bell },
  { id: "feedback", name: "Feedback", icon: MessageSquare },
];

const emailTemplates: EmailTemplate[] = [
  // Agendamento
  {
    id: "confirmacao-consulta",
    name: "Confirmação de Consulta",
    description: "Email enviado automaticamente quando uma consulta é agendada",
    category: "agendamento",
    icon: CheckCircle2,
    tags: ["automático", "consulta", "confirmação"],
    popular: true,
    preview: "/placeholder.svg",
    subject: "Consulta Confirmada - {{data}} às {{hora}}",
    content: `Olá {{nome}},

Sua consulta foi confirmada com sucesso!

📅 Data: {{data}}
🕐 Horário: {{hora}}
👨‍⚕️ Profissional: {{profissional}}
📍 Local: {{endereco}}

Lembre-se de trazer seus documentos e chegar 15 minutos antes.

Até logo!
{{clinica}}`
  },
  {
    id: "lembrete-24h",
    name: "Lembrete 24h Antes",
    description: "Lembrete enviado 24 horas antes da consulta",
    category: "lembretes",
    icon: Clock,
    tags: ["automático", "lembrete", "consulta"],
    popular: true,
    preview: "/placeholder.svg",
    subject: "Lembrete: Sua consulta é amanhã!",
    content: `Olá {{nome}},

Este é um lembrete de que sua consulta está marcada para amanhã!

📅 Data: {{data}}
🕐 Horário: {{hora}}
👨‍⚕️ Profissional: {{profissional}}

Precisa reagendar? Clique aqui: {{link_reagendar}}

Até amanhã!`
  },
  {
    id: "lembrete-1h",
    name: "Lembrete 1h Antes",
    description: "Lembrete enviado 1 hora antes da consulta",
    category: "lembretes",
    icon: Bell,
    tags: ["automático", "lembrete", "urgente"],
    popular: false,
    preview: "/placeholder.svg",
    subject: "⏰ Sua consulta é em 1 hora!",
    content: `Olá {{nome}},

Sua consulta é em 1 hora!

🕐 Horário: {{hora}}
👨‍⚕️ Profissional: {{profissional}}
📍 Local: {{endereco}}

Estamos aguardando você!`
  },
  {
    id: "reagendamento",
    name: "Solicitação de Reagendamento",
    description: "Email para solicitar reagendamento de consulta",
    category: "agendamento",
    icon: RefreshCw,
    tags: ["reagendar", "consulta"],
    popular: false,
    preview: "/placeholder.svg",
    subject: "Precisamos reagendar sua consulta",
    content: `Olá {{nome}},

Infelizmente precisamos reagendar sua consulta do dia {{data}}.

Por favor, escolha um novo horário clicando no link abaixo:
{{link_reagendar}}

Pedimos desculpas pelo inconveniente.

Atenciosamente,
{{clinica}}`
  },

  // Marketing
  {
    id: "promocao-sazonal",
    name: "Promoção Sazonal",
    description: "Template para campanhas promocionais sazonais",
    category: "marketing",
    icon: Gift,
    tags: ["promoção", "desconto", "campanha"],
    popular: true,
    preview: "/placeholder.svg",
    subject: "🎁 Oferta Especial de {{mes}} - Até 30% OFF!",
    content: `Olá {{nome}},

Temos uma oferta especial para você!

🎁 {{titulo_promocao}}
💰 {{desconto}}% de desconto
📅 Válido até: {{data_fim}}

Agende agora: {{link_agendamento}}

Não perca essa oportunidade!`
  },
  {
    id: "lancamento-servico",
    name: "Lançamento de Serviço",
    description: "Anúncio de novos serviços ou especialidades",
    category: "marketing",
    icon: Sparkles,
    tags: ["novo", "serviço", "lançamento"],
    popular: false,
    preview: "/placeholder.svg",
    subject: "✨ Novidade! {{nome_servico}} agora disponível",
    content: `Olá {{nome}},

Temos uma novidade incrível para você!

Agora oferecemos {{nome_servico}}!

{{descricao_servico}}

Agende sua avaliação: {{link_agendamento}}

Esperamos você!`
  },
  {
    id: "indicacao-amigo",
    name: "Programa Indique um Amigo",
    description: "Incentivo para indicação de novos pacientes",
    category: "marketing",
    icon: Users,
    tags: ["indicação", "referral", "desconto"],
    popular: true,
    preview: "/placeholder.svg",
    subject: "Indique um amigo e ganhe {{desconto}}% de desconto!",
    content: `Olá {{nome}},

Sabia que você pode ganhar descontos indicando amigos?

Compartilhe seu código: {{codigo_indicacao}}

Para cada amigo que agendar, você ganha {{desconto}}% de desconto na próxima consulta!

Compartilhe agora: {{link_indicacao}}`
  },
  {
    id: "newsletter-saude",
    name: "Newsletter de Saúde",
    description: "Informativo mensal com dicas de saúde",
    category: "marketing",
    icon: Stethoscope,
    tags: ["newsletter", "saúde", "dicas"],
    popular: false,
    preview: "/placeholder.svg",
    subject: "📰 Dicas de Saúde - {{mes}} {{ano}}",
    content: `Olá {{nome}},

Confira as novidades deste mês:

📌 {{titulo_artigo_1}}
{{resumo_artigo_1}}

📌 {{titulo_artigo_2}}
{{resumo_artigo_2}}

Leia mais em nosso blog: {{link_blog}}`
  },

  // Engajamento
  {
    id: "boas-vindas",
    name: "Boas-Vindas ao Paciente",
    description: "Email de boas-vindas para novos pacientes",
    category: "engajamento",
    icon: Heart,
    tags: ["welcome", "novo paciente", "onboarding"],
    popular: true,
    preview: "/placeholder.svg",
    subject: "Bem-vindo(a) à {{clinica}}! 🎉",
    content: `Olá {{nome}},

Seja muito bem-vindo(a) à {{clinica}}!

Estamos felizes em tê-lo(a) como paciente. Aqui estão algumas informações importantes:

📍 Endereço: {{endereco}}
📞 Telefone: {{telefone}}
🌐 Portal do Paciente: {{link_portal}}

Agende sua primeira consulta: {{link_agendamento}}

Estamos à disposição!`
  },
  {
    id: "aniversario",
    name: "Feliz Aniversário",
    description: "Mensagem personalizada de aniversário",
    category: "engajamento",
    icon: Cake,
    tags: ["aniversário", "personalizado", "engajamento"],
    popular: true,
    preview: "/placeholder.svg",
    subject: "🎂 Feliz Aniversário, {{nome}}!",
    content: `Feliz Aniversário, {{nome}}! 🎂🎉

Neste dia especial, toda a equipe da {{clinica}} deseja a você um ano repleto de saúde e felicidade!

Como presente, oferecemos {{desconto}}% de desconto na sua próxima consulta.

Use o código: ANIVER{{ano}}

Válido até: {{data_validade}}

Parabéns! 🎈`
  },
  {
    id: "reativacao",
    name: "Reativação de Paciente",
    description: "Email para pacientes inativos",
    category: "engajamento",
    icon: RefreshCw,
    tags: ["reativação", "paciente inativo", "win-back"],
    popular: true,
    preview: "/placeholder.svg",
    subject: "Sentimos sua falta, {{nome}}! ❤️",
    content: `Olá {{nome}},

Faz tempo que não nos vemos! Sentimos sua falta.

Que tal agendar uma consulta de check-up?

Como boas-vindas de volta, oferecemos condições especiais:
{{oferta_especial}}

Agende agora: {{link_agendamento}}

Esperamos você de volta!`
  },
  {
    id: "pos-consulta",
    name: "Agradecimento Pós-Consulta",
    description: "Email de agradecimento após a consulta",
    category: "engajamento",
    icon: ThumbsUp,
    tags: ["obrigado", "pós-consulta", "feedback"],
    popular: false,
    preview: "/placeholder.svg",
    subject: "Obrigado pela visita, {{nome}}!",
    content: `Olá {{nome}},

Obrigado por sua visita hoje!

Esperamos que sua experiência tenha sido positiva. Sua opinião é muito importante para nós.

Avalie seu atendimento: {{link_avaliacao}}

Próxima consulta: {{data_retorno}}

Até logo!`
  },

  // Transacional
  {
    id: "recibo-pagamento",
    name: "Recibo de Pagamento",
    description: "Comprovante de pagamento de consulta",
    category: "transacional",
    icon: FileText,
    tags: ["recibo", "pagamento", "financeiro"],
    popular: false,
    preview: "/placeholder.svg",
    subject: "Recibo de Pagamento - {{numero_recibo}}",
    content: `Olá {{nome}},

Segue o recibo do seu pagamento:

📋 Número: {{numero_recibo}}
📅 Data: {{data_pagamento}}
💰 Valor: R$ {{valor}}
💳 Forma: {{forma_pagamento}}
🏥 Serviço: {{servico}}

Em caso de dúvidas, entre em contato conosco.

{{clinica}}`
  },
  {
    id: "resultado-exame",
    name: "Resultado de Exame Disponível",
    description: "Notificação de que o resultado do exame está pronto",
    category: "transacional",
    icon: ShieldCheck,
    tags: ["exame", "resultado", "laboratorio"],
    popular: false,
    preview: "/placeholder.svg",
    subject: "Seu resultado de exame está disponível",
    content: `Olá {{nome}},

Seu resultado de exame já está disponível!

🔬 Exame: {{nome_exame}}
📅 Data de realização: {{data_exame}}

Acesse pelo portal: {{link_portal}}

Importante: Consulte seu médico para interpretação dos resultados.`
  },
  {
    id: "prescricao-digital",
    name: "Prescrição Digital",
    description: "Envio de receita médica digital",
    category: "transacional",
    icon: Pill,
    tags: ["receita", "prescrição", "medicamento"],
    popular: false,
    preview: "/placeholder.svg",
    subject: "Sua prescrição médica digital",
    content: `Olá {{nome}},

Segue sua prescrição médica digital:

👨‍⚕️ Médico: {{nome_medico}}
📅 Data: {{data}}

Acesse a receita: {{link_receita}}

Validade: {{validade_receita}}

Siga as orientações do seu médico.`
  },

  // Feedback
  {
    id: "pesquisa-nps",
    name: "Pesquisa NPS",
    description: "Pesquisa de satisfação Net Promoter Score",
    category: "feedback",
    icon: Star,
    tags: ["nps", "pesquisa", "satisfação"],
    popular: true,
    preview: "/placeholder.svg",
    subject: "Como foi sua experiência conosco?",
    content: `Olá {{nome}},

Em uma escala de 0 a 10, o quanto você recomendaria a {{clinica}} para um amigo ou familiar?

Responda nossa pesquisa rápida (30 segundos):
{{link_pesquisa}}

Sua opinião nos ajuda a melhorar cada vez mais!`
  },
  {
    id: "solicitacao-avaliacao",
    name: "Solicitação de Avaliação",
    description: "Pedido de avaliação do atendimento",
    category: "feedback",
    icon: MessageSquare,
    tags: ["avaliação", "review", "feedback"],
    popular: true,
    preview: "/placeholder.svg",
    subject: "Conte-nos como foi seu atendimento",
    content: `Olá {{nome}},

Sua consulta com {{profissional}} foi concluída.

Gostaríamos de saber como foi sua experiência:
⭐ Avalie agora: {{link_avaliacao}}

Seu feedback é muito valioso para continuarmos melhorando nosso atendimento.

Obrigado!`
  },

  // Lembretes
  {
    id: "lembrete-retorno",
    name: "Lembrete de Retorno",
    description: "Lembrete para consulta de retorno",
    category: "lembretes",
    icon: Calendar,
    tags: ["retorno", "follow-up", "lembrete"],
    popular: true,
    preview: "/placeholder.svg",
    subject: "É hora do seu retorno! 📅",
    content: `Olá {{nome}},

Está na hora de agendar seu retorno!

Sua última consulta foi em {{data_ultima_consulta}} e recomendamos um acompanhamento.

Agende seu retorno: {{link_agendamento}}

Cuide da sua saúde!`
  },
  {
    id: "lembrete-exame-periodico",
    name: "Lembrete de Exame Periódico",
    description: "Lembrete para exames de rotina",
    category: "lembretes",
    icon: AlertTriangle,
    tags: ["exame", "prevenção", "check-up"],
    popular: false,
    preview: "/placeholder.svg",
    subject: "🔔 Lembrete: Exame periódico",
    content: `Olá {{nome}},

É hora de realizar seus exames de rotina!

Prevenção é o melhor remédio. Agende seus exames:
{{link_agendamento}}

Exames recomendados:
{{lista_exames}}

Cuide-se!`
  },
  {
    id: "lembrete-medicacao",
    name: "Lembrete de Medicação",
    description: "Lembrete para renovação de receita ou medicação contínua",
    category: "lembretes",
    icon: Pill,
    tags: ["medicação", "receita", "renovação"],
    popular: false,
    preview: "/placeholder.svg",
    subject: "💊 Lembrete: Renovação de receita",
    content: `Olá {{nome}},

Sua receita de {{medicamento}} está próxima do vencimento.

Data de validade: {{data_validade}}

Agende uma consulta para renovação:
{{link_agendamento}}

Não interrompa seu tratamento!`
  },
];

export default function EmailTemplatesLibraryModal({
  open,
  onOpenChange,
  onSelectTemplate,
}: EmailTemplatesLibraryModalProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [previewTemplate, setPreviewTemplate] = useState<EmailTemplate | null>(null);

  const filteredTemplates = emailTemplates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(search.toLowerCase()) ||
      template.description.toLowerCase().includes(search.toLowerCase()) ||
      template.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const popularTemplates = emailTemplates.filter((t) => t.popular);

  const handleUseTemplate = (template: EmailTemplate) => {
    onSelectTemplate?.(template);
    toast.success(`Template "${template.name}" selecionado!`);
    onOpenChange(false);
  };

  const handleCopyContent = (template: EmailTemplate) => {
    navigator.clipboard.writeText(template.content);
    toast.success("Conteúdo copiado para a área de transferência!");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Mail className="h-5 w-5 text-primary" />
            Biblioteca de Templates de Email
          </DialogTitle>
        </DialogHeader>

        <div className="flex h-[75vh]">
          {/* Sidebar */}
          <div className="w-64 border-r border-border p-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar templates..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>

            <div className="space-y-1">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Categorias
              </p>
              {templateCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedCategory === category.id
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted text-foreground"
                  }`}
                >
                  <category.icon className="h-4 w-4" />
                  {category.name}
                </button>
              ))}
            </div>

            {/* Popular Templates Quick Access */}
            <div className="pt-4 border-t border-border">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1">
                <Star className="h-3 w-3 text-amber-500" />
                Populares
              </p>
              <div className="space-y-1">
                {popularTemplates.slice(0, 5).map((template) => (
                  <button
                    key={template.id}
                    onClick={() => setPreviewTemplate(template)}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs hover:bg-muted transition-colors truncate"
                  >
                    {template.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex">
            {/* Templates Grid */}
            <div className="flex-1 p-4 overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-muted-foreground">
                  {filteredTemplates.length} templates encontrados
                </p>
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filtros
                </Button>
              </div>

              <ScrollArea className="h-[calc(100%-40px)]">
                <div className="grid grid-cols-2 gap-4 pr-4">
                  {filteredTemplates.map((template) => (
                    <Card
                      key={template.id}
                      className={`cursor-pointer transition-all hover:shadow-md hover:border-primary/50 ${
                        previewTemplate?.id === template.id ? "border-primary ring-2 ring-primary/20" : ""
                      }`}
                      onClick={() => setPreviewTemplate(template)}
                    >
                      <CardHeader className="p-4 pb-2">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <div className="p-2 rounded-lg bg-primary/10">
                              <template.icon className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <CardTitle className="text-sm font-medium line-clamp-1">
                                {template.name}
                              </CardTitle>
                            </div>
                          </div>
                          {template.popular && (
                            <Badge variant="secondary" className="text-xs gap-1">
                              <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                              Popular
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <CardDescription className="text-xs line-clamp-2 mb-3">
                          {template.description}
                        </CardDescription>
                        <div className="flex flex-wrap gap-1">
                          {template.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Preview Panel */}
            {previewTemplate && (
              <div className="w-96 border-l border-border p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">{previewTemplate.name}</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setPreviewTemplate(null)}
                    className="h-8 w-8"
                  >
                    ×
                  </Button>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{previewTemplate.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {previewTemplate.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Email Preview */}
                <div className="rounded-lg border border-border overflow-hidden">
                  <div className="bg-muted px-4 py-2 border-b border-border">
                    <p className="text-xs text-muted-foreground">Assunto:</p>
                    <p className="text-sm font-medium">{previewTemplate.subject}</p>
                  </div>
                  <ScrollArea className="h-48">
                    <div className="p-4 bg-white dark:bg-card">
                      <pre className="text-xs whitespace-pre-wrap font-sans text-foreground">
                        {previewTemplate.content}
                      </pre>
                    </div>
                  </ScrollArea>
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  <Button
                    className="w-full gap-2"
                    onClick={() => handleUseTemplate(previewTemplate)}
                  >
                    <Zap className="h-4 w-4" />
                    Usar Este Template
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={() => handleCopyContent(previewTemplate)}
                    >
                      <Copy className="h-4 w-4" />
                      Copiar
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Eye className="h-4 w-4" />
                      Preview
                    </Button>
                  </div>
                </div>

                {/* Variables Info */}
                <div className="rounded-lg bg-muted/50 p-3">
                  <p className="text-xs font-semibold text-muted-foreground mb-2">
                    Variáveis disponíveis:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {["{{nome}}", "{{clinica}}", "{{data}}", "{{hora}}", "{{profissional}}"].map(
                      (variable) => (
                        <Badge key={variable} variant="outline" className="text-xs font-mono">
                          {variable}
                        </Badge>
                      )
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
