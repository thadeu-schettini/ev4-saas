import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  User,
  Building2,
  Phone,
  Mail,
  MapPin,
  Globe,
  Calendar,
  Target,
  Sparkles,
  DollarSign,
  MessageSquare,
  Link,
  FileText,
  Plus,
  UserPlus,
  Save,
  Tag,
  CheckCircle2,
} from "lucide-react";

interface NewLeadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: (lead: any) => void;
  linkedClient?: any;
}

const sources = [
  { id: "google", label: "Google Ads", icon: "🔍" },
  { id: "organic", label: "Site Orgânico", icon: "🌐" },
  { id: "linkedin", label: "LinkedIn", icon: "💼" },
  { id: "instagram", label: "Instagram", icon: "📸" },
  { id: "facebook", label: "Facebook", icon: "👥" },
  { id: "referral", label: "Indicação", icon: "🤝" },
  { id: "event", label: "Evento/Webinar", icon: "🎤" },
  { id: "outbound", label: "Outbound", icon: "📞" },
  { id: "other", label: "Outro", icon: "📌" },
];

const stages = [
  { id: "visitor", label: "Visitante", color: "bg-muted text-muted-foreground" },
  { id: "lead", label: "Lead", color: "bg-info/10 text-info" },
  { id: "mql", label: "MQL", color: "bg-primary/10 text-primary" },
  { id: "sql", label: "SQL", color: "bg-warning/10 text-warning" },
  { id: "opportunity", label: "Oportunidade", color: "bg-success/10 text-success" },
];

const tags = [
  "Consultório", "Clínica Pequena", "Clínica Média", "Enterprise", "Multi-unidade",
  "Dermatologia", "Odontologia", "Cardiologia", "Ortopedia", "Pediatria", "Ginecologia",
  "Hot Lead", "Cold Lead", "Reengajamento"
];

export function NewLeadModal({ 
  open, 
  onOpenChange,
  onSave,
  linkedClient
}: NewLeadModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    position: "",
    city: "",
    state: "",
    website: "",
    source: "",
    stage: "lead",
    estimatedValue: "",
    notes: "",
    selectedTags: [] as string[],
  });

  const toggleTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      selectedTags: prev.selectedTags.includes(tag)
        ? prev.selectedTags.filter(t => t !== tag)
        : [...prev.selectedTags, tag]
    }));
  };

  const handleSave = () => {
    onSave?.(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-4 border-b">
          <DialogTitle className="flex items-center gap-2 text-xl">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
              <UserPlus className="h-5 w-5 text-white" />
            </div>
            Cadastrar Novo Lead
          </DialogTitle>
          {linkedClient && (
            <div className="flex items-center gap-2 mt-2 p-3 rounded-lg bg-success/10 border border-success/30">
              <Link className="h-4 w-4 text-success" />
              <span className="text-sm">
                Vinculado ao cliente: <strong>{linkedClient.name}</strong>
              </span>
            </div>
          )}
        </DialogHeader>

        <ScrollArea className="max-h-[60vh]">
          <div className="p-6 space-y-6">
            {/* Informações Básicas */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-primary" />
                Informações do Contato
              </h3>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo *</Label>
                  <Input
                    id="name"
                    placeholder="Nome do lead"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Cargo</Label>
                  <Input
                    id="position"
                    placeholder="Ex: Médico, Gestor"
                    value={formData.position}
                    onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@exemplo.com"
                      className="pl-10"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      placeholder="(00) 00000-0000"
                      className="pl-10"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Informações da Empresa */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2 text-sm">
                <Building2 className="h-4 w-4 text-primary" />
                Empresa / Clínica
              </h3>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Nome da Empresa</Label>
                  <Input
                    id="company"
                    placeholder="Nome da clínica ou empresa"
                    value={formData.company}
                    onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="website"
                      placeholder="www.exemplo.com"
                      className="pl-10"
                      value={formData.website}
                      onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                    />
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">Cidade</Label>
                  <Input
                    id="city"
                    placeholder="Cidade"
                    value={formData.city}
                    onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">Estado</Label>
                  <Select value={formData.state} onValueChange={(v) => setFormData(prev => ({ ...prev, state: v }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SP">São Paulo</SelectItem>
                      <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                      <SelectItem value="MG">Minas Gerais</SelectItem>
                      <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                      <SelectItem value="PR">Paraná</SelectItem>
                      <SelectItem value="SC">Santa Catarina</SelectItem>
                      <SelectItem value="BA">Bahia</SelectItem>
                      <SelectItem value="other">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator />

            {/* Pipeline */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2 text-sm">
                <Target className="h-4 w-4 text-primary" />
                Pipeline de Vendas
              </h3>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Fonte de Aquisição *</Label>
                  <Select value={formData.source} onValueChange={(v) => setFormData(prev => ({ ...prev, source: v }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="De onde veio esse lead?" />
                    </SelectTrigger>
                    <SelectContent>
                      {sources.map(source => (
                        <SelectItem key={source.id} value={source.id}>
                          <span className="flex items-center gap-2">
                            <span>{source.icon}</span>
                            {source.label}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Valor Estimado (MRR)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="R$ 0,00"
                      className="pl-10"
                      value={formData.estimatedValue}
                      onChange={(e) => setFormData(prev => ({ ...prev, estimatedValue: e.target.value }))}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Etapa do Funil</Label>
                <div className="flex flex-wrap gap-2">
                  {stages.map(stage => (
                    <Button
                      key={stage.id}
                      type="button"
                      variant="outline"
                      size="sm"
                      className={cn(
                        "transition-all",
                        formData.stage === stage.id && stage.color,
                        formData.stage === stage.id && "border-2 border-primary"
                      )}
                      onClick={() => setFormData(prev => ({ ...prev, stage: stage.id }))}
                    >
                      {formData.stage === stage.id && <CheckCircle2 className="h-3 w-3 mr-1" />}
                      {stage.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <Separator />

            {/* Tags */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2 text-sm">
                <Tag className="h-4 w-4 text-primary" />
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <Badge
                    key={tag}
                    variant={formData.selectedTags.includes(tag) ? "default" : "outline"}
                    className={cn(
                      "cursor-pointer transition-all hover:scale-105",
                      formData.selectedTags.includes(tag) && "bg-primary"
                    )}
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            {/* Observações */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2 text-sm">
                <FileText className="h-4 w-4 text-primary" />
                Observações Iniciais
              </h3>
              <Textarea
                placeholder="Adicione notas sobre o primeiro contato, interesse demonstrado, necessidades identificadas..."
                className="min-h-[100px]"
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              />
            </div>
          </div>
        </ScrollArea>

        <DialogFooter className="p-6 pt-4 border-t bg-muted/30">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave} className="gap-2">
            <Save className="h-4 w-4" />
            Cadastrar Lead
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
