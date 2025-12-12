import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, Plus, Search, Eye, Edit, Trash2, FileText, HelpCircle, Video, FolderOpen, TrendingUp, X, Check } from "lucide-react";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";
import { toast } from "sonner";

interface KnowledgeBaseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const mockArticles = [
  { id: "1", title: "Como configurar o WhatsApp Business", category: "Integrações", views: 1234, helpful: 89, status: "published", type: "article", content: "Conteúdo do artigo sobre WhatsApp..." },
  { id: "2", title: "Primeiros passos com agendamento", category: "Onboarding", views: 2341, helpful: 95, status: "published", type: "article", content: "Conteúdo do artigo sobre agendamento..." },
  { id: "3", title: "Configurando pagamentos online", category: "Financeiro", views: 876, helpful: 72, status: "draft", type: "article", content: "Conteúdo do artigo sobre pagamentos..." },
  { id: "4", title: "Tutorial: Receita Digital", category: "Prontuário", views: 1567, helpful: 91, status: "published", type: "video", content: "URL do vídeo..." },
];

const mockFaqs = [
  { id: "1", question: "Como alterar minha senha?", answer: "Acesse Configurações > Segurança > Alterar Senha", category: "Conta", views: 543 },
  { id: "2", question: "Posso ter múltiplos usuários?", answer: "Sim, dependendo do seu plano você pode adicionar usuários ilimitados", category: "Planos", views: 432 },
  { id: "3", question: "Como exportar relatórios?", answer: "Vá em Relatórios, selecione o período e clique em Exportar", category: "Relatórios", views: 321 },
];

const categories = ["Onboarding", "Integrações", "Financeiro", "Prontuário", "Relatórios", "Conta", "Planos"];

export function KnowledgeBaseModal({ open, onOpenChange }: KnowledgeBaseModalProps) {
  const [search, setSearch] = useState("");
  const [showNewContent, setShowNewContent] = useState(false);
  const [newContentType, setNewContentType] = useState<"article" | "faq">("article");
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; type: 'article' | 'faq' | 'category'; id: string; name: string }>({ open: false, type: 'article', id: '', name: '' });
  
  // Edit states
  const [editingArticle, setEditingArticle] = useState<any>(null);
  const [editingFaq, setEditingFaq] = useState<any>(null);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [showNewCategory, setShowNewCategory] = useState(false);
  
  // Form states
  const [articleForm, setArticleForm] = useState({ title: "", category: "", content: "", status: "draft", type: "article" });
  const [faqForm, setFaqForm] = useState({ question: "", answer: "", category: "" });
  const [categoryForm, setCategoryForm] = useState("");

  const handleEditArticle = (article: any) => {
    setEditingArticle(article);
    setArticleForm({
      title: article.title,
      category: article.category.toLowerCase(),
      content: article.content || "",
      status: article.status,
      type: article.type
    });
    setShowNewContent(false);
  };

  const handleEditFaq = (faq: any) => {
    setEditingFaq(faq);
    setFaqForm({
      question: faq.question,
      answer: faq.answer,
      category: faq.category.toLowerCase()
    });
    setShowNewContent(false);
  };

  const handleEditCategory = (cat: string) => {
    setEditingCategory(cat);
    setCategoryForm(cat);
  };

  const cancelEdit = () => {
    setEditingArticle(null);
    setEditingFaq(null);
    setEditingCategory(null);
    setShowNewCategory(false);
    setArticleForm({ title: "", category: "", content: "", status: "draft", type: "article" });
    setFaqForm({ question: "", answer: "", category: "" });
    setCategoryForm("");
  };

  const saveArticle = () => {
    toast.success(editingArticle ? "Artigo atualizado com sucesso!" : "Artigo publicado com sucesso!");
    cancelEdit();
  };

  const saveFaq = () => {
    toast.success(editingFaq ? "FAQ atualizada com sucesso!" : "FAQ criada com sucesso!");
    cancelEdit();
  };

  const saveCategory = () => {
    toast.success(editingCategory ? "Categoria atualizada!" : "Categoria criada!");
    cancelEdit();
  };

  const handleDelete = () => {
    const typeLabels = { article: 'Artigo', faq: 'FAQ', category: 'Categoria' };
    toast.success(`${typeLabels[deleteDialog.type]} "${deleteDialog.name}" excluído com sucesso!`);
    setDeleteDialog({ open: false, type: 'article', id: '', name: '' });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Gestão de Base de Conhecimento
          </DialogTitle>
        </DialogHeader>

        <div className="flex items-center gap-4 mb-4 flex-wrap">
          <Card className="px-4 py-2">
            <div className="text-2xl font-bold text-primary">24</div>
            <div className="text-xs text-muted-foreground">Artigos</div>
          </Card>
          <Card className="px-4 py-2">
            <div className="text-2xl font-bold text-success">18</div>
            <div className="text-xs text-muted-foreground">FAQs</div>
          </Card>
          <Card className="px-4 py-2">
            <div className="text-2xl font-bold text-info">8.5K</div>
            <div className="text-xs text-muted-foreground">Visualizações/mês</div>
          </Card>
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar artigos e FAQs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          <Button onClick={() => { setShowNewContent(true); setNewContentType("article"); cancelEdit(); }}>
            <Plus className="h-4 w-4 mr-2" /> Novo Conteúdo
          </Button>
        </div>

        {/* New/Edit Article Form */}
        {(showNewContent && newContentType === "article") || editingArticle ? (
          <Card className="mb-4 border-primary">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center justify-between">
                {editingArticle ? "Editar Artigo" : "Novo Artigo"}
                <Button variant="ghost" size="icon" onClick={() => { setShowNewContent(false); cancelEdit(); }}>
                  <X className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium">Título</label>
                    <Input 
                      placeholder="Título do artigo" 
                      className="mt-1" 
                      value={articleForm.title}
                      onChange={(e) => setArticleForm({...articleForm, title: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Categoria</label>
                    <Select value={articleForm.category} onValueChange={(v) => setArticleForm({...articleForm, category: v})}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(cat => (
                          <SelectItem key={cat} value={cat.toLowerCase()}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Tipo</label>
                    <Select value={articleForm.type} onValueChange={(v) => setArticleForm({...articleForm, type: v})}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="article">Artigo</SelectItem>
                        <SelectItem value="video">Vídeo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Conteúdo</label>
                  <Textarea 
                    placeholder="Escreva o conteúdo do artigo..." 
                    className="mt-1" 
                    rows={6} 
                    value={articleForm.content}
                    onChange={(e) => setArticleForm({...articleForm, content: e.target.value})}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => { setShowNewContent(false); cancelEdit(); }}>Cancelar</Button>
                <Button variant="outline" onClick={() => setArticleForm({...articleForm, status: "draft"})}>Salvar Rascunho</Button>
                <Button onClick={saveArticle}>
                  <Check className="h-4 w-4 mr-2" />
                  {editingArticle ? "Salvar Alterações" : "Publicar"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : null}

        {/* New/Edit FAQ Form */}
        {(showNewContent && newContentType === "faq") || editingFaq ? (
          <Card className="mb-4 border-primary">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center justify-between">
                {editingFaq ? "Editar FAQ" : "Nova FAQ"}
                <Button variant="ghost" size="icon" onClick={() => { setShowNewContent(false); cancelEdit(); }}>
                  <X className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Pergunta</label>
                  <Input 
                    placeholder="Qual é a pergunta?" 
                    className="mt-1" 
                    value={faqForm.question}
                    onChange={(e) => setFaqForm({...faqForm, question: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Resposta</label>
                  <Textarea 
                    placeholder="Escreva a resposta..." 
                    className="mt-1" 
                    rows={4} 
                    value={faqForm.answer}
                    onChange={(e) => setFaqForm({...faqForm, answer: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Categoria</label>
                  <Select value={faqForm.category} onValueChange={(v) => setFaqForm({...faqForm, category: v})}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat.toLowerCase()}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => { setShowNewContent(false); cancelEdit(); }}>Cancelar</Button>
                <Button onClick={saveFaq}>
                  <Check className="h-4 w-4 mr-2" />
                  {editingFaq ? "Salvar Alterações" : "Publicar"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : null}

        {!showNewContent && !editingArticle && !editingFaq && (
          <div className="flex gap-2 mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => { setShowNewContent(true); setNewContentType("article"); }}
            >
              <FileText className="h-4 w-4 mr-1" /> Artigo
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => { setShowNewContent(true); setNewContentType("faq"); }}
            >
              <HelpCircle className="h-4 w-4 mr-1" /> FAQ
            </Button>
          </div>
        )}

        <Tabs defaultValue="articles" className="flex-1 flex flex-col overflow-hidden">
          <TabsList>
            <TabsTrigger value="articles" className="gap-2">
              <FileText className="h-4 w-4" /> Artigos
            </TabsTrigger>
            <TabsTrigger value="faqs" className="gap-2">
              <HelpCircle className="h-4 w-4" /> FAQs
            </TabsTrigger>
            <TabsTrigger value="categories" className="gap-2">
              <FolderOpen className="h-4 w-4" /> Categorias
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2">
              <TrendingUp className="h-4 w-4" /> Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="articles" className="flex-1 overflow-hidden mt-4">
            <ScrollArea className="h-[350px]">
              <div className="space-y-3 pr-4">
                {mockArticles.map((article) => (
                  <Card key={article.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          {article.type === "video" ? (
                            <Video className="h-5 w-5 text-primary" />
                          ) : (
                            <FileText className="h-5 w-5 text-primary" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{article.title}</span>
                            <Badge variant={article.status === "published" ? "default" : "secondary"}>
                              {article.status === "published" ? "Publicado" : "Rascunho"}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <span>{article.category}</span>
                            <span className="flex items-center gap-1">
                              <Eye className="h-3 w-3" /> {article.views}
                            </span>
                            <span>{article.helpful}% acharam útil</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleEditArticle(article)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-destructive" onClick={() => setDeleteDialog({ open: true, type: 'article', id: article.id, name: article.title })}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="faqs" className="flex-1 overflow-hidden mt-4">
            <ScrollArea className="h-[350px]">
              <div className="space-y-3 pr-4">
                {mockFaqs.map((faq) => (
                  <Card key={faq.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="h-8 w-8 rounded-full bg-info/10 flex items-center justify-center flex-shrink-0">
                          <HelpCircle className="h-4 w-4 text-info" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{faq.question}</div>
                          <div className="text-sm text-muted-foreground mt-1">{faq.answer}</div>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                            <Badge variant="outline">{faq.category}</Badge>
                            <span className="flex items-center gap-1">
                              <Eye className="h-3 w-3" /> {faq.views} visualizações
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleEditFaq(faq)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-destructive" onClick={() => setDeleteDialog({ open: true, type: 'faq', id: faq.id, name: faq.question })}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="categories" className="mt-4">
            {(editingCategory || showNewCategory) && (
              <Card className="mb-4 border-primary">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center justify-between">
                    {editingCategory ? "Editar Categoria" : "Nova Categoria"}
                    <Button variant="ghost" size="icon" onClick={cancelEdit}>
                      <X className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    <Input 
                      placeholder="Nome da categoria" 
                      className="flex-1" 
                      value={categoryForm}
                      onChange={(e) => setCategoryForm(e.target.value)}
                    />
                    <Button onClick={saveCategory}>
                      <Check className="h-4 w-4 mr-2" />
                      {editingCategory ? "Salvar" : "Criar"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((category) => (
                <Card key={category} className="hover:shadow-md transition-shadow cursor-pointer group">
                  <CardContent className="p-4 text-center relative">
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleEditCategory(category)}>
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                    <FolderOpen className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <div className="font-medium">{category}</div>
                    <div className="text-sm text-muted-foreground">
                      {Math.floor(Math.random() * 10) + 2} artigos
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Card 
                className="hover:shadow-md transition-shadow cursor-pointer border-dashed"
                onClick={() => setShowNewCategory(true)}
              >
                <CardContent className="p-4 text-center flex flex-col items-center justify-center h-full">
                  <Plus className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <div className="text-muted-foreground">Nova Categoria</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="mt-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Artigos Mais Visualizados</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockArticles.slice(0, 3).map((article, index) => (
                      <div key={article.id} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                          {index + 1}
                        </div>
                        <div className="flex-1 truncate">{article.title}</div>
                        <Badge variant="secondary">{article.views}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Métricas de Satisfação</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Artigos úteis</span>
                        <span className="font-medium">87%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-success rounded-full" style={{ width: "87%" }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>FAQs resolutivas</span>
                        <span className="font-medium">92%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-success rounded-full" style={{ width: "92%" }} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <DeleteConfirmDialog
          open={deleteDialog.open}
          onOpenChange={(open) => setDeleteDialog({ ...deleteDialog, open })}
          title={`Excluir ${deleteDialog.type === 'article' ? 'Artigo' : deleteDialog.type === 'faq' ? 'FAQ' : 'Categoria'}`}
          description={`Tem certeza que deseja excluir "${deleteDialog.name}"? Esta ação não pode ser desfeita.`}
          onConfirm={handleDelete}
        />
      </DialogContent>
    </Dialog>
  );
}
