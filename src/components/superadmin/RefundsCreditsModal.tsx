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
import { Wallet, RefreshCw, Plus, Search, CheckCircle2, Clock, XCircle, DollarSign, Gift, Building2, Trash2 } from "lucide-react";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";
import { toast } from "sonner";

interface RefundsCreditsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const mockRefunds = [
  { id: "1", clinic: "Clínica São Lucas", amount: 299, reason: "Cobrança duplicada", status: "approved", date: "Hoje, 10:30", requestedBy: "Dr. Carlos" },
  { id: "2", clinic: "Centro Médico Vida", amount: 599, reason: "Cancelamento de plano", status: "pending", date: "Ontem, 15:45", requestedBy: "Maria Souza" },
  { id: "3", clinic: "Odonto Plus", amount: 149, reason: "Problema técnico", status: "rejected", date: "08/01/2024", requestedBy: "João Santos" },
];

const mockCredits = [
  { id: "1", clinic: "Fisio Center", amount: 100, type: "promotional", reason: "Compensação por instabilidade", expiresAt: "31/03/2024", status: "active" },
  { id: "2", clinic: "Derma Clinic", amount: 50, type: "referral", reason: "Indicação convertida", expiresAt: "28/02/2024", status: "active" },
  { id: "3", clinic: "Centro Médico Vida", amount: 200, type: "promotional", reason: "Black Friday 2023", expiresAt: "31/01/2024", status: "expired" },
];

export function RefundsCreditsModal({ open, onOpenChange }: RefundsCreditsModalProps) {
  const [search, setSearch] = useState("");
  const [showNewCredit, setShowNewCredit] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; id: string; name: string }>({ open: false, id: '', name: '' });

  const handleApproveRefund = (clinic: string) => {
    toast.success(`Reembolso para "${clinic}" aprovado!`);
  };

  const handleRejectRefund = (clinic: string) => {
    toast.error(`Reembolso para "${clinic}" rejeitado.`);
  };

  const handleCreateCredit = () => {
    toast.success("Crédito criado com sucesso!");
    setShowNewCredit(false);
  };

  const handleDeleteCredit = () => {
    toast.success(`Crédito excluído com sucesso!`);
    setDeleteDialog({ open: false, id: '', name: '' });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
      case "active":
        return <Badge className="bg-success/20 text-success">Aprovado</Badge>;
      case "pending":
        return <Badge className="bg-warning/20 text-warning">Pendente</Badge>;
      case "rejected":
      case "expired":
        return <Badge variant="destructive">Rejeitado</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
      case "active":
        return <CheckCircle2 className="h-4 w-4 text-success" />;
      case "pending":
        return <Clock className="h-4 w-4 text-warning" />;
      default:
        return <XCircle className="h-4 w-4 text-destructive" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-primary" />
            Gestão de Reembolsos e Créditos
          </DialogTitle>
        </DialogHeader>

        <div className="flex items-center gap-4 mb-4">
          <Card className="px-4 py-2 bg-gradient-to-br from-warning/10 to-transparent">
            <div className="text-2xl font-bold text-warning">3</div>
            <div className="text-xs text-muted-foreground">Reembolsos Pendentes</div>
          </Card>
          <Card className="px-4 py-2 bg-gradient-to-br from-success/10 to-transparent">
            <div className="text-2xl font-bold text-success">R$ 1.247</div>
            <div className="text-xs text-muted-foreground">Reembolsos este mês</div>
          </Card>
          <Card className="px-4 py-2 bg-gradient-to-br from-primary/10 to-transparent">
            <div className="text-2xl font-bold text-primary">R$ 350</div>
            <div className="text-xs text-muted-foreground">Créditos Ativos</div>
          </Card>
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por clínica..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </div>

        <Tabs defaultValue="refunds" className="flex-1 flex flex-col overflow-hidden">
          <TabsList>
            <TabsTrigger value="refunds" className="gap-2">
              <RefreshCw className="h-4 w-4" /> Reembolsos
            </TabsTrigger>
            <TabsTrigger value="credits" className="gap-2">
              <Gift className="h-4 w-4" /> Créditos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="refunds" className="flex-1 overflow-hidden mt-4">
            <ScrollArea className="h-[400px]">
              <div className="space-y-3 pr-4">
                {mockRefunds.map((refund) => (
                  <Card key={refund.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        {getStatusIcon(refund.status)}
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{refund.clinic}</span>
                            {getStatusBadge(refund.status)}
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">
                            {refund.reason} • Solicitado por {refund.requestedBy}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">{refund.date}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">R$ {refund.amount}</div>
                        </div>
                        {refund.status === "pending" && (
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="text-destructive" onClick={() => handleRejectRefund(refund.clinic)}>
                              Rejeitar
                            </Button>
                            <Button size="sm" onClick={() => handleApproveRefund(refund.clinic)}>Aprovar</Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="credits" className="flex-1 overflow-hidden mt-4">
            <div className="flex justify-end mb-4">
              <Button onClick={() => setShowNewCredit(true)}>
                <Plus className="h-4 w-4 mr-2" /> Adicionar Crédito
              </Button>
            </div>

            {showNewCredit && (
              <Card className="mb-4 border-primary">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Novo Crédito</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div>
                      <label className="text-sm font-medium">Clínica</label>
                      <Input placeholder="Buscar clínica..." className="mt-1" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Valor (R$)</label>
                      <Input type="number" placeholder="100" className="mt-1" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Tipo</label>
                      <Select>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="promotional">Promocional</SelectItem>
                          <SelectItem value="referral">Indicação</SelectItem>
                          <SelectItem value="compensation">Compensação</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Validade</label>
                      <Input type="date" className="mt-1" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="text-sm font-medium">Motivo</label>
                    <Textarea placeholder="Descreva o motivo do crédito..." className="mt-1" rows={2} />
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" onClick={() => setShowNewCredit(false)}>Cancelar</Button>
                    <Button onClick={() => setShowNewCredit(false)}>Criar Crédito</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <ScrollArea className="h-[300px]">
              <div className="space-y-3 pr-4">
                {mockCredits.map((credit) => (
                  <Card key={credit.id} className={credit.status === "expired" ? "opacity-60" : ""}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                          credit.type === "promotional" ? "bg-primary/10" : "bg-success/10"
                        }`}>
                          {credit.type === "promotional" ? (
                            <Gift className="h-5 w-5 text-primary" />
                          ) : (
                            <DollarSign className="h-5 w-5 text-success" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{credit.clinic}</span>
                            <Badge variant="outline">
                              {credit.type === "promotional" ? "Promocional" : "Indicação"}
                            </Badge>
                            {credit.status === "expired" && <Badge variant="destructive">Expirado</Badge>}
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">{credit.reason}</div>
                          <div className="text-xs text-muted-foreground mt-1">Válido até: {credit.expiresAt}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-primary">R$ {credit.amount}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>

        <DeleteConfirmDialog
          open={deleteDialog.open}
          onOpenChange={(open) => setDeleteDialog({ ...deleteDialog, open })}
          title="Excluir Crédito"
          description={`Tem certeza que deseja excluir este crédito? Esta ação não pode ser desfeita.`}
          onConfirm={handleDeleteCredit}
        />
      </DialogContent>
    </Dialog>
  );
}
