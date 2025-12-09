import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  Stethoscope,
  Clock,
  DollarSign,
  Search,
  Clipboard,
  CheckCircle2,
  Save,
  X,
  ArrowRight,
  Info,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

interface ServiceEditModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service: {
    id: number;
    name: string;
    description: string;
    category: string;
    duration: number;
    price: number;
    professionals: number;
    active: boolean;
    popular?: boolean;
    uses: number;
    tussCode?: string;
  } | null;
}

// Mock TUSS codes for search
const tussCodeDatabase = [
  { code: "10101012", description: "Consulta em consultório (no horário normal ou preestabelecido)", category: "Consultas", refValue: 120 },
  { code: "10101020", description: "Consulta em domicílio", category: "Consultas", refValue: 180 },
  { code: "10102019", description: "Consulta em pronto socorro", category: "Consultas", refValue: 150 },
  { code: "40301010", description: "Eletrocardiograma convencional (ECG)", category: "Exames", refValue: 95 },
  { code: "40301029", description: "Eletrocardiograma de alta resolução", category: "Exames", refValue: 150 },
  { code: "40302016", description: "Ecocardiograma transtorácico", category: "Exames", refValue: 320 },
  { code: "40303012", description: "Holter 24 horas - ECG contínuo", category: "Exames", refValue: 250 },
  { code: "40304019", description: "MAPA - Monitorização ambulatorial da pressão arterial", category: "Exames", refValue: 220 },
  { code: "31101019", description: "Biópsia de pele ou mucosa", category: "Procedimentos", refValue: 180 },
  { code: "31101027", description: "Cauterização química", category: "Procedimentos", refValue: 85 },
];

export function ServiceEditModal({ open, onOpenChange, service }: ServiceEditModalProps) {
  const [formData, setFormData] = useState({
    name: service?.name || "",
    description: service?.description || "",
    category: service?.category || "consulta",
    duration: service?.duration || 30,
    price: service?.price || 0,
    tussCode: service?.tussCode || "",
    active: service?.active ?? true,
  });
  const [tussSearch, setTussSearch] = useState("");
  const [selectedTuss, setSelectedTuss] = useState<typeof tussCodeDatabase[0] | null>(
    tussCodeDatabase.find(t => t.code === service?.tussCode) || null
  );
  const [isSaving, setIsSaving] = useState(false);

  const filteredTussCodes = tussCodeDatabase.filter(
    tuss =>
      tuss.code.includes(tussSearch) ||
      tuss.description.toLowerCase().includes(tussSearch.toLowerCase())
  );

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Serviço atualizado com sucesso!");
      onOpenChange(false);
    }, 1000);
  };

  const handleSelectTuss = (tuss: typeof tussCodeDatabase[0]) => {
    setSelectedTuss(tuss);
    setFormData({ ...formData, tussCode: tuss.code });
    toast.success(`Código TUSS ${tuss.code} vinculado`);
  };

  if (!service) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-primary/10">
              <Stethoscope className="h-6 w-6 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-xl">Editar Serviço</DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">{service.name}</p>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="general" className="flex-1 overflow-hidden flex flex-col">
          <TabsList className="bg-muted/50 p-1 mb-4 flex-wrap h-auto gap-1">
            <TabsTrigger value="general" className="gap-2 text-xs sm:text-sm">
              <Info className="h-4 w-4 hidden sm:block" />
              Informações
            </TabsTrigger>
            <TabsTrigger value="tuss" className="gap-2 text-xs sm:text-sm">
              <Clipboard className="h-4 w-4 hidden sm:block" />
              Vincular TUSS
            </TabsTrigger>
          </TabsList>

          {/* General Tab */}
          <TabsContent value="general" className="flex-1 overflow-auto mt-0">
            <div className="grid gap-6 py-2">
              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "p-2 rounded-lg",
                    formData.active ? "bg-emerald-500/10" : "bg-muted"
                  )}>
                    {formData.active ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    ) : (
                      <X className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">Status do Serviço</p>
                    <p className="text-sm text-muted-foreground">
                      {formData.active ? "Serviço ativo e disponível para agendamento" : "Serviço inativo"}
                    </p>
                  </div>
                </div>
                <Switch
                  checked={formData.active}
                  onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nome do Serviço</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ex: Consulta Cardiologia"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Categoria</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="consulta">Consulta</SelectItem>
                      <SelectItem value="exame">Exame</SelectItem>
                      <SelectItem value="procedimento">Procedimento</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Descrição</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Descreva o serviço..."
                  rows={3}
                />
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    Duração (min)
                  </Label>
                  <Input
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    Preço (R$)
                  </Label>
                  <Input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Clipboard className="h-4 w-4 text-muted-foreground" />
                    Código TUSS
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      value={formData.tussCode}
                      readOnly
                      placeholder="Não vinculado"
                      className="bg-muted/50"
                    />
                  </div>
                </div>
              </div>

              {selectedTuss && (
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Clipboard className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="font-mono">{selectedTuss.code}</Badge>
                        <Badge>{selectedTuss.category}</Badge>
                      </div>
                      <p className="text-sm">{selectedTuss.description}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Valor de referência: <span className="font-medium text-emerald-600">R$ {selectedTuss.refValue.toFixed(2)}</span>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          {/* TUSS Tab */}
          <TabsContent value="tuss" className="flex-1 overflow-hidden mt-0 flex flex-col">
            <div className="space-y-4 flex-1 flex flex-col">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por código ou descrição..."
                  value={tussSearch}
                  onChange={(e) => setTussSearch(e.target.value)}
                  className="pl-9"
                />
              </div>

              <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  Selecione um código TUSS para vincular ao serviço. Isso permite faturamento correto com convênios.
                </p>
              </div>

              <ScrollArea className="flex-1 pr-2">
                <div className="space-y-2">
                  {filteredTussCodes.map((tuss) => (
                    <div
                      key={tuss.code}
                      onClick={() => handleSelectTuss(tuss)}
                      className={cn(
                        "p-4 rounded-xl border cursor-pointer transition-all hover:shadow-md",
                        selectedTuss?.code === tuss.code
                          ? "bg-primary/5 border-primary/30"
                          : "bg-muted/30 hover:bg-muted/50 border-transparent"
                      )}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="font-mono text-sm">{tuss.code}</Badge>
                            <Badge variant="secondary">{tuss.category}</Badge>
                          </div>
                          <p className="text-sm">{tuss.description}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-sm text-muted-foreground">Ref.</p>
                          <p className="font-medium text-emerald-600">R$ {tuss.refValue.toFixed(2)}</p>
                        </div>
                      </div>
                      {selectedTuss?.code === tuss.code && (
                        <div className="flex items-center gap-2 mt-3 pt-3 border-t text-emerald-600 text-sm">
                          <CheckCircle2 className="h-4 w-4" />
                          Código selecionado
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex-shrink-0 mt-4 pt-4 border-t gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={isSaving} className="gap-2">
            {isSaving ? (
              <>Salvando...</>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Salvar Alterações
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
