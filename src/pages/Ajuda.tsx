import { useState } from "react";
import { 
  HelpCircle, Search, Book, MessageCircle, Video, 
  FileText, ChevronRight, ExternalLink, Phone, Mail,
  Sparkles, Zap, Shield, Clock, Users, Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/page-header";
import { PageContainer, PageContent } from "@/components/ui/page-container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const helpCategories = [
  {
    id: "getting-started",
    title: "Primeiros Passos",
    description: "Aprenda a configurar e usar o sistema",
    icon: Sparkles,
    color: "from-violet-500 to-purple-500",
    articles: 12
  },
  {
    id: "appointments",
    title: "Agendamentos",
    description: "Gerenciar consultas e agenda",
    icon: Calendar,
    color: "from-blue-500 to-cyan-500",
    articles: 18
  },
  {
    id: "patients",
    title: "Pacientes",
    description: "Cadastro e gestão de pacientes",
    icon: Users,
    color: "from-emerald-500 to-teal-500",
    articles: 15
  },
  {
    id: "billing",
    title: "Faturamento",
    description: "Pagamentos e cobranças",
    icon: Zap,
    color: "from-amber-500 to-orange-500",
    articles: 10
  },
  {
    id: "security",
    title: "Segurança",
    description: "Proteção de dados e privacidade",
    icon: Shield,
    color: "from-rose-500 to-pink-500",
    articles: 8
  },
  {
    id: "integrations",
    title: "Integrações",
    description: "Conectar com outros sistemas",
    icon: ExternalLink,
    color: "from-indigo-500 to-blue-500",
    articles: 6
  },
];

const popularArticles = [
  {
    id: "1",
    title: "Como agendar uma consulta",
    category: "Agendamentos",
    readTime: "3 min"
  },
  {
    id: "2",
    title: "Cadastrar novo paciente",
    category: "Pacientes",
    readTime: "2 min"
  },
  {
    id: "3",
    title: "Configurar horários de atendimento",
    category: "Configurações",
    readTime: "5 min"
  },
  {
    id: "4",
    title: "Emitir nota fiscal",
    category: "Faturamento",
    readTime: "4 min"
  },
  {
    id: "5",
    title: "Sincronizar com Google Calendar",
    category: "Integrações",
    readTime: "3 min"
  },
];

const faqs = [
  {
    question: "Como altero minha senha?",
    answer: "Acesse Configurações > Segurança > Alterar Senha. Você precisará informar sua senha atual e a nova senha. Recomendamos usar uma senha forte com pelo menos 8 caracteres, incluindo letras, números e símbolos."
  },
  {
    question: "Como cancelo uma consulta agendada?",
    answer: "Acesse a Agenda, clique na consulta que deseja cancelar e selecione 'Cancelar Consulta'. Você pode optar por notificar o paciente automaticamente por e-mail ou SMS."
  },
  {
    question: "Como exporto os dados dos pacientes?",
    answer: "Vá até Pacientes, clique em 'Exportar' no canto superior direito. Você pode escolher exportar em formato CSV ou Excel, e filtrar quais dados deseja incluir na exportação."
  },
  {
    question: "Como configuro lembretes automáticos?",
    answer: "Acesse Configurações > Notificações > Lembretes Automáticos. Você pode configurar lembretes por WhatsApp, SMS ou e-mail, definindo quantas horas ou dias antes da consulta o lembrete será enviado."
  },
  {
    question: "Como adiciono um novo profissional?",
    answer: "Vá até Profissionais > Novo Profissional. Preencha os dados pessoais, especialidades, horários de atendimento e serviços que o profissional irá realizar. Após salvar, ele já poderá ser vinculado a agendamentos."
  },
  {
    question: "Como funciona a telemedicina?",
    answer: "Para consultas online, ao agendar selecione o modo 'Online'. O sistema criará automaticamente uma sala virtual e enviará o link para o paciente. Tanto o profissional quanto o paciente podem acessar a sala no horário agendado."
  },
];

export default function Ajuda() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = faqs.filter(
    faq => 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageContainer>
      <PageHeader
        title="Central de Ajuda"
        description="Encontre respostas, tutoriais e suporte para usar o sistema"
        icon={HelpCircle}
        iconColor="from-violet-500 to-purple-500"
      />

      <PageContent>
        {/* Search Section */}
        <div className="relative max-w-2xl mx-auto mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-purple-500/20 to-pink-500/20 blur-3xl rounded-full" />
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Buscar artigos, tutoriais ou perguntas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-lg bg-card/80 backdrop-blur-sm border-border/50 focus:border-primary shadow-lg"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg hover:border-primary/30 transition-all cursor-pointer group">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Book className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">Documentação</h3>
                <p className="text-sm text-muted-foreground">Guias completos</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg hover:border-primary/30 transition-all cursor-pointer group">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Video className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">Tutoriais em Vídeo</h3>
                <p className="text-sm text-muted-foreground">Passo a passo</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg hover:border-primary/30 transition-all cursor-pointer group">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">Chat ao Vivo</h3>
                <p className="text-sm text-muted-foreground">Fale conosco</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg hover:border-primary/30 transition-all cursor-pointer group">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">Novidades</h3>
                <p className="text-sm text-muted-foreground">Atualizações</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Categories */}
          <div className="lg:col-span-2 space-y-6">
            {/* Categories Grid */}
            <div>
              <h2 className="text-xl font-bold mb-4">Categorias</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {helpCategories.map((category) => (
                  <Card 
                    key={category.id}
                    className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg hover:border-primary/30 transition-all cursor-pointer group"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                          <category.icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold">{category.title}</h3>
                            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
                          <Badge variant="secondary" className="mt-2">
                            {category.articles} artigos
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div>
              <h2 className="text-xl font-bold mb-4">Perguntas Frequentes</h2>
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-4">
                  <Accordion type="single" collapsible className="w-full">
                    {filteredFaqs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left hover:no-underline">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right: Popular Articles & Contact */}
          <div className="space-y-6">
            {/* Popular Articles */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Artigos Populares</CardTitle>
                <CardDescription>Os mais acessados pelos usuários</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {popularArticles.map((article) => (
                  <div 
                    key={article.id}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group"
                  >
                    <FileText className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm group-hover:text-primary transition-colors">
                        {article.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {article.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {article.readTime}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Contact Card */}
            <Card className="border-border/50 bg-gradient-to-br from-primary/5 via-card to-purple-500/5">
              <CardHeader>
                <CardTitle className="text-lg">Precisa de mais ajuda?</CardTitle>
                <CardDescription>Nossa equipe está pronta para ajudar</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start gap-3">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MessageCircle className="h-4 w-4 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">Chat ao Vivo</p>
                    <p className="text-xs text-muted-foreground">Resposta em minutos</p>
                  </div>
                </Button>
                
                <Button variant="outline" className="w-full justify-start gap-3">
                  <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                    <Mail className="h-4 w-4 text-emerald-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">E-mail</p>
                    <p className="text-xs text-muted-foreground">suporte@medclinic.com</p>
                  </div>
                </Button>
                
                <Button variant="outline" className="w-full justify-start gap-3">
                  <div className="h-8 w-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                    <Phone className="h-4 w-4 text-amber-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">Telefone</p>
                    <p className="text-xs text-muted-foreground">(11) 4000-0000</p>
                  </div>
                </Button>

                <div className="pt-2 text-center">
                  <p className="text-xs text-muted-foreground">
                    Atendimento de seg a sex, 8h às 18h
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </PageContent>
    </PageContainer>
  );
}
