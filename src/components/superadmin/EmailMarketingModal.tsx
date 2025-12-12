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
import { Mail, Plus, Send, Clock, Users, Eye, MousePointer, Edit, Trash2, X, Check } from "lucide-react";
import { ChartContainer } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";
import { toast } from "sonner";

interface EmailMarketingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const mockCampaigns = [
  { id: "1", name: "Lançamento v2.5", status: "sent", recipients: 2847, openRate: 42, clickRate: 18, sentAt: "10/01/2024 10:00", segment: "all", subject: "Novidades da versão 2.5!", content: "Confira as novidades..." },
  { id: "2", name: "Newsletter Janeiro", status: "scheduled", recipients: 3200, openRate: null, clickRate: null, sentAt: "15/01/2024 09:00", segment: "active", subject: "Newsletter de Janeiro", content: "As principais atualizações..." },
  { id: "3", name: "Promoção Black Friday", status: "draft", recipients: 0, openRate: null, clickRate: null, sentAt: null, segment: "all", subject: "Oferta especial!", content: "Aproveite os descontos..." },
];

const mockTemplates = [
  { id: "1", name: "Newsletter", uses: 8, content: "Template de newsletter padrão...", subject: "Newsletter - {{month}}" },
  { id: "2", name: "Promoção", uses: 5, content: "Template promocional com destaque...", subject: "Oferta Especial para Você!" },
  { id: "3", name: "Onboarding", uses: 12, content: "Boas-vindas ao nosso sistema...", subject: "Bem-vindo ao Sistema!" },
  { id: "4", name: "Reativação", uses: 3, content: "Sentimos sua falta...", subject: "Volte a usar nosso sistema" },
  { id: "5", name: "Atualização", uses: 7, content: "Novidades e atualizações...", subject: "Confira as Novidades!" },
];

const performanceData = [
  { month: "Set", opens: 38, clicks: 12 },
  { month: "Out", opens: 42, clicks: 15 },
  { month: "Nov", opens: 45, clicks: 18 },
  { month: "Dez", opens: 40, clicks: 14 },
  { month: "Jan", opens: 44, clicks: 17 },
];

const chartConfig = {
  opens: { label: "Abertura %", color: "hsl(var(--primary))" },
  clicks: { label: "Cliques %", color: "hsl(var(--success))" },
};

export function EmailMarketingModal({ open, onOpenChange }: EmailMarketingModalProps) {
  const [showNewCampaign, setShowNewCampaign] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<any>(null);
  const [editingTemplate, setEditingTemplate] = useState<any>(null);
  const [showNewTemplate, setShowNewTemplate] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; type: 'campaign' | 'template'; id: string; name: string }>({ open: false, type: 'campaign', id: '', name: '' });

  // Campaign form
  const [campaignForm, setCampaignForm] = useState({
    name: "",
    segment: "",
    subject: "",
    content: ""
  });

  // Template form
  const [templateForm, setTemplateForm] = useState({
    name: "",
    subject: "",
    content: ""
  });

  const handleEditCampaign = (campaign: any) => {
    setEditingCampaign(campaign);
    setCampaignForm({
      name: campaign.name,
      segment: campaign.segment,
      subject: campaign.subject,
      content: campaign.content
    });
    setShowNewCampaign(false);
  };

  const handleEditTemplate = (template: any) => {
    setEditingTemplate(template);
    setTemplateForm({
      name: template.name,
      subject: template.subject,
      content: template.content
    });
    setShowNewTemplate(false);
  };

  const cancelCampaignEdit = () => {
    setEditingCampaign(null);
    setShowNewCampaign(false);
    setCampaignForm({ name: "", segment: "", subject: "", content: "" });
  };

  const cancelTemplateEdit = () => {
    setEditingTemplate(null);
    setShowNewTemplate(false);
    setTemplateForm({ name: "", subject: "", content: "" });
  };

  const saveCampaign = () => {
    toast.success(editingCampaign ? "Campanha atualizada com sucesso!" : "Campanha criada com sucesso!");
    cancelCampaignEdit();
  };

  const saveTemplate = () => {
    toast.success(editingTemplate ? "Template atualizado com sucesso!" : "Template criado com sucesso!");
    cancelTemplateEdit();
  };

  const handleDelete = () => {
    toast.success(`${deleteDialog.type === 'campaign' ? 'Campanha' : 'Template'} "${deleteDialog.name}" excluído!`);
    setDeleteDialog({ open: false, type: 'campaign', id: '', name: '' });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "sent": return <Badge className="bg-success/20 text-success">Enviada</Badge>;
      case "scheduled": return <Badge className="bg-info/20 text-info">Agendada</Badge>;
      default: return <Badge variant="secondary">Rascunho</Badge>;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            Campanhas de Email Marketing
          </DialogTitle>
        </DialogHeader>

        <div className="flex items-center gap-4 mb-4 flex-wrap">
          <Card className="px-4 py-2 bg-gradient-to-br from-primary/10 to-transparent">
            <div className="text-2xl font-bold text-primary">12</div>
            <div className="text-xs text-muted-foreground">Campanhas Enviadas</div>
          </Card>
          <Card className="px-4 py-2 bg-gradient-to-br from-success/10 to-transparent">
            <div className="text-2xl font-bold text-success">42%</div>
            <div className="text-xs text-muted-foreground">Taxa de Abertura</div>
          </Card>
          <Card className="px-4 py-2 bg-gradient-to-br from-info/10 to-transparent">
            <div className="text-2xl font-bold text-info">16%</div>
            <div className="text-xs text-muted-foreground">Taxa de Cliques</div>
          </Card>
          <Card className="px-4 py-2 bg-gradient-to-br from-warning/10 to-transparent">
            <div className="text-2xl font-bold text-warning">3.2K</div>
            <div className="text-xs text-muted-foreground">Inscritos</div>
          </Card>
          <div className="flex-1" />
          <Button onClick={() => { setShowNewCampaign(true); cancelCampaignEdit(); }}>
            <Plus className="h-4 w-4 mr-2" /> Nova Campanha
          </Button>
        </div>

        <Tabs defaultValue="campaigns" className="flex-1 flex flex-col overflow-hidden">
          <TabsList>
            <TabsTrigger value="campaigns">Campanhas</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="campaigns" className="flex-1 overflow-hidden mt-4">
            {(showNewCampaign || editingCampaign) && (
              <Card className="mb-4 border-primary">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center justify-between">
                    {editingCampaign ? "Editar Campanha" : "Nova Campanha"}
                    <Button variant="ghost" size="icon" onClick={cancelCampaignEdit}>
                      <X className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Nome da Campanha</label>
                      <Input 
                        placeholder="Ex: Newsletter Fevereiro" 
                        className="mt-1" 
                        value={campaignForm.name}
                        onChange={(e) => setCampaignForm({...campaignForm, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Segmento</label>
                      <Select value={campaignForm.segment} onValueChange={(v) => setCampaignForm({...campaignForm, segment: v})}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos os usuários</SelectItem>
                          <SelectItem value="active">Usuários ativos</SelectItem>
                          <SelectItem value="inactive">Usuários inativos</SelectItem>
                          <SelectItem value="trial">Em trial</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="text-sm font-medium">Assunto</label>
                    <Input 
                      placeholder="Assunto do email" 
                      className="mt-1" 
                      value={campaignForm.subject}
                      onChange={(e) => setCampaignForm({...campaignForm, subject: e.target.value})}
                    />
                  </div>
                  <div className="mt-4">
                    <label className="text-sm font-medium">Conteúdo</label>
                    <Textarea 
                      placeholder="Corpo do email..." 
                      className="mt-1" 
                      rows={6} 
                      value={campaignForm.content}
                      onChange={(e) => setCampaignForm({...campaignForm, content: e.target.value})}
                    />
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" onClick={cancelCampaignEdit}>Cancelar</Button>
                    <Button variant="outline" onClick={saveCampaign}>Salvar Rascunho</Button>
                    <Button onClick={saveCampaign}>
                      <Send className="h-4 w-4 mr-2" /> {editingCampaign ? "Salvar e Enviar" : "Enviar Agora"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <ScrollArea className="h-[350px]">
              <div className="space-y-3 pr-4">
                {mockCampaigns.map((campaign) => (
                  <Card key={campaign.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Mail className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{campaign.name}</span>
                            {getStatusBadge(campaign.status)}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            {campaign.sentAt && (
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {campaign.status === "scheduled" ? "Agendada para " : ""}{campaign.sentAt}
                              </span>
                            )}
                            {campaign.recipients > 0 && (
                              <span className="flex items-center gap-1">
                                <Users className="h-3 w-3" /> {campaign.recipients} destinatários
                              </span>
                            )}
                          </div>
                        </div>
                        {campaign.status === "sent" && (
                          <div className="flex items-center gap-4">
                            <div className="text-center">
                              <div className="flex items-center gap-1 text-sm">
                                <Eye className="h-3 w-3 text-primary" />
                                {campaign.openRate}%
                              </div>
                              <div className="text-xs text-muted-foreground">Abertura</div>
                            </div>
                            <div className="text-center">
                              <div className="flex items-center gap-1 text-sm">
                                <MousePointer className="h-3 w-3 text-success" />
                                {campaign.clickRate}%
                              </div>
                              <div className="text-xs text-muted-foreground">Cliques</div>
                            </div>
                          </div>
                        )}
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleEditCampaign(campaign)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-destructive" onClick={() => setDeleteDialog({ open: true, type: 'campaign', id: campaign.id, name: campaign.name })}>
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

          <TabsContent value="analytics" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Performance nos Últimos 5 Meses</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[280px] w-full">
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Bar dataKey="opens" fill="hsl(var(--primary))" radius={4} />
                    <Bar dataKey="clicks" fill="hsl(var(--success))" radius={4} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="mt-4 flex-1 overflow-hidden">
            {(showNewTemplate || editingTemplate) && (
              <Card className="mb-4 border-primary">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center justify-between">
                    {editingTemplate ? "Editar Template" : "Novo Template"}
                    <Button variant="ghost" size="icon" onClick={cancelTemplateEdit}>
                      <X className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Nome do Template</label>
                      <Input 
                        placeholder="Ex: Newsletter Mensal" 
                        className="mt-1" 
                        value={templateForm.name}
                        onChange={(e) => setTemplateForm({...templateForm, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Assunto Padrão</label>
                      <Input 
                        placeholder="Assunto do email" 
                        className="mt-1" 
                        value={templateForm.subject}
                        onChange={(e) => setTemplateForm({...templateForm, subject: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="text-sm font-medium">Conteúdo do Template</label>
                    <Textarea 
                      placeholder="Corpo do template..." 
                      className="mt-1" 
                      rows={6} 
                      value={templateForm.content}
                      onChange={(e) => setTemplateForm({...templateForm, content: e.target.value})}
                    />
                    <div className="text-xs text-muted-foreground mt-1">
                      Use {"{{variavel}}"} para inserir campos dinâmicos
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" onClick={cancelTemplateEdit}>Cancelar</Button>
                    <Button onClick={saveTemplate}>
                      <Check className="h-4 w-4 mr-2" />
                      {editingTemplate ? "Salvar Alterações" : "Criar Template"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid md:grid-cols-3 gap-4">
              {mockTemplates.map((template) => (
                <Card key={template.id} className="hover:shadow-md transition-shadow group">
                  <CardContent className="p-4 text-center relative">
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleEditTemplate(template)}>
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => setDeleteDialog({ open: true, type: 'template', id: template.id, name: template.name })}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                    <Mail className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <div className="font-medium">{template.name}</div>
                    <div className="text-sm text-muted-foreground mt-1">Usado {template.uses}x</div>
                  </CardContent>
                </Card>
              ))}
              <Card 
                className="border-dashed hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => { setShowNewTemplate(true); cancelTemplateEdit(); }}
              >
                <CardContent className="p-4 text-center flex flex-col items-center justify-center h-full">
                  <Plus className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <div className="text-muted-foreground">Criar Template</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <DeleteConfirmDialog
          open={deleteDialog.open}
          onOpenChange={(open) => setDeleteDialog({ ...deleteDialog, open })}
          title={deleteDialog.type === 'campaign' ? "Excluir Campanha" : "Excluir Template"}
          description={`Tem certeza que deseja excluir "${deleteDialog.name}"? Esta ação não pode ser desfeita.`}
          onConfirm={handleDelete}
        />
      </DialogContent>
    </Dialog>
  );
}
