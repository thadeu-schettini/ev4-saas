import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Ban, Plus, Search, Trash2, Globe, Clock, AlertTriangle, CheckCircle2 } from "lucide-react";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";
import { toast } from "sonner";

interface IPBlockingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const mockBlockedIPs = [
  { id: "1", ip: "185.234.72.45", type: "single", reason: "Brute force attack", blockedAt: "10/01/2024 14:32", expiresAt: "Permanente", country: "Rússia", attempts: 156 },
  { id: "2", ip: "91.214.67.0/24", type: "range", reason: "Botnet activity", blockedAt: "08/01/2024 09:15", expiresAt: "08/02/2024", country: "Ucrânia", attempts: 2340 },
  { id: "3", ip: "45.67.89.123", type: "single", reason: "API abuse", blockedAt: "05/01/2024 18:45", expiresAt: "12/01/2024", country: "EUA", attempts: 45 },
];

const mockWhitelist = [
  { id: "1", ip: "201.17.45.0/24", description: "Escritório principal", addedAt: "01/01/2024" },
  { id: "2", ip: "189.45.67.89", description: "VPN corporativa", addedAt: "15/12/2023" },
];

export function IPBlockingModal({ open, onOpenChange }: IPBlockingModalProps) {
  const [search, setSearch] = useState("");
  const [showAddBlock, setShowAddBlock] = useState(false);
  const [showAddWhitelist, setShowAddWhitelist] = useState(false);
  const [autoBlock, setAutoBlock] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; type: 'blocked' | 'whitelist'; id: string; name: string }>({ open: false, type: 'blocked', id: '', name: '' });

  const handleBlockIP = () => {
    toast.success("IP bloqueado com sucesso!");
    setShowAddBlock(false);
  };

  const handleAddWhitelist = () => {
    toast.success("IP adicionado à whitelist!");
    setShowAddWhitelist(false);
  };

  const handleDelete = () => {
    toast.success(`IP "${deleteDialog.name}" ${deleteDialog.type === 'blocked' ? 'desbloqueado' : 'removido da whitelist'}!`);
    setDeleteDialog({ open: false, type: 'blocked', id: '', name: '' });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Bloqueio de IPs
          </DialogTitle>
        </DialogHeader>

        <div className="flex items-center gap-4 mb-4">
          <Card className="px-4 py-2 bg-gradient-to-br from-destructive/10 to-transparent">
            <div className="text-2xl font-bold text-destructive">23</div>
            <div className="text-xs text-muted-foreground">IPs Bloqueados</div>
          </Card>
          <Card className="px-4 py-2 bg-gradient-to-br from-success/10 to-transparent">
            <div className="text-2xl font-bold text-success">5</div>
            <div className="text-xs text-muted-foreground">Whitelist</div>
          </Card>
          <Card className="px-4 py-2 bg-gradient-to-br from-warning/10 to-transparent">
            <div className="text-2xl font-bold text-warning">2.5K</div>
            <div className="text-xs text-muted-foreground">Bloqueios/Semana</div>
          </Card>
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar IP..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Switch checked={autoBlock} onCheckedChange={setAutoBlock} />
            <Label className="text-sm">Auto-bloqueio</Label>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 flex-1 overflow-hidden">
          {/* Blocked IPs */}
          <Card className="flex flex-col overflow-hidden">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <Ban className="h-4 w-4 text-destructive" />
                IPs Bloqueados
              </CardTitle>
              <Button size="sm" variant="destructive" onClick={() => setShowAddBlock(true)}>
                <Plus className="h-4 w-4 mr-1" /> Bloquear IP
              </Button>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden">
              {showAddBlock && (
                <Card className="mb-4 border-destructive/50 bg-destructive/5">
                  <CardContent className="p-3">
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-2">
                        <Input placeholder="IP ou range (ex: 192.168.1.0/24)" />
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Duração" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1h">1 hora</SelectItem>
                            <SelectItem value="24h">24 horas</SelectItem>
                            <SelectItem value="7d">7 dias</SelectItem>
                            <SelectItem value="30d">30 dias</SelectItem>
                            <SelectItem value="permanent">Permanente</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Input placeholder="Motivo do bloqueio" />
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline" onClick={() => setShowAddBlock(false)}>Cancelar</Button>
                        <Button size="sm" variant="destructive" onClick={() => setShowAddBlock(false)}>Bloquear</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
              <ScrollArea className="h-[300px]">
                <div className="space-y-2 pr-4">
                  {mockBlockedIPs.map((ip) => (
                    <Card key={ip.id} className="bg-muted/30">
                      <CardContent className="p-3">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-destructive/10 flex items-center justify-center">
                            <Ban className="h-4 w-4 text-destructive" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-medium">{ip.ip}</span>
                              <Badge variant="outline" className="text-xs">{ip.type === "range" ? "Range" : "IP"}</Badge>
                            </div>
                            <div className="text-xs text-muted-foreground truncate">{ip.reason}</div>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                              <span className="flex items-center gap-1">
                                <Globe className="h-3 w-3" /> {ip.country}
                              </span>
                              <span>{ip.attempts} tentativas</span>
                            </div>
                          </div>
                          <div className="text-right text-xs">
                            <div className="text-muted-foreground">Expira</div>
                            <div className={ip.expiresAt === "Permanente" ? "text-destructive" : ""}>
                              {ip.expiresAt}
                            </div>
                          </div>
                          <Button variant="ghost" size="icon" className="text-destructive" onClick={() => setDeleteDialog({ open: true, type: 'blocked', id: ip.id, name: ip.ip })}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Whitelist */}
          <Card className="flex flex-col overflow-hidden">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-success" />
                Whitelist
              </CardTitle>
              <Button size="sm" onClick={() => setShowAddWhitelist(true)}>
                <Plus className="h-4 w-4 mr-1" /> Adicionar
              </Button>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden">
              {showAddWhitelist && (
                <Card className="mb-4 border-success/50 bg-success/5">
                  <CardContent className="p-3">
                    <div className="space-y-3">
                      <Input placeholder="IP ou range (ex: 192.168.1.0/24)" />
                      <Input placeholder="Descrição (ex: Escritório principal)" />
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline" onClick={() => setShowAddWhitelist(false)}>Cancelar</Button>
                        <Button size="sm" onClick={() => setShowAddWhitelist(false)}>Adicionar</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
              <ScrollArea className="h-[300px]">
                <div className="space-y-2 pr-4">
                  {mockWhitelist.map((ip) => (
                    <Card key={ip.id} className="bg-muted/30">
                      <CardContent className="p-3">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-success/10 flex items-center justify-center">
                            <CheckCircle2 className="h-4 w-4 text-success" />
                          </div>
                          <div className="flex-1">
                            <div className="font-mono font-medium">{ip.ip}</div>
                            <div className="text-xs text-muted-foreground">{ip.description}</div>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Desde {ip.addedAt}
                          </div>
                          <Button variant="ghost" size="icon" className="text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        <DeleteConfirmDialog
          open={deleteDialog.open}
          onOpenChange={(open) => setDeleteDialog({ ...deleteDialog, open })}
          title={deleteDialog.type === 'blocked' ? "Desbloquear IP" : "Remover da Whitelist"}
          description={`Tem certeza que deseja ${deleteDialog.type === 'blocked' ? 'desbloquear' : 'remover'} o IP "${deleteDialog.name}"?`}
          onConfirm={handleDelete}
        />
      </DialogContent>
    </Dialog>
  );
}
