import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Wrench, Calendar, Clock, AlertTriangle, CheckCircle2, Bell, Users, Plus, Trash2 } from "lucide-react";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";
import { toast } from "sonner";

interface MaintenanceModeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const scheduledMaintenances = [
  { id: "1", title: "Atualização do Sistema v2.5", date: "2024-01-15", time: "02:00", duration: "2 horas", status: "scheduled", impact: "Parcial" },
  { id: "2", title: "Migração de Banco de Dados", date: "2024-01-20", time: "03:00", duration: "4 horas", status: "scheduled", impact: "Total" },
  { id: "3", title: "Manutenção de Segurança", date: "2024-01-10", time: "01:00", duration: "1 hora", status: "completed", impact: "Parcial" },
];

export function MaintenanceModeModal({ open, onOpenChange }: MaintenanceModeModalProps) {
  const [maintenanceActive, setMaintenanceActive] = useState(false);
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [notifyUsers, setNotifyUsers] = useState(true);
  const [allowAdminAccess, setAllowAdminAccess] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; id: string; title: string } | null>(null);

  const handleToggleMaintenance = (active: boolean) => {
    setMaintenanceActive(active);
    if (active) {
      toast.warning("Modo manutenção ativado! Usuários não conseguem acessar o sistema.");
    } else {
      toast.success("Sistema restaurado! Usuários podem acessar normalmente.");
    }
  };

  const handleScheduleMaintenance = () => {
    toast.success("Manutenção agendada com sucesso!");
    setShowScheduleForm(false);
  };

  const handleDeleteMaintenance = () => {
    if (!deleteDialog) return;
    toast.success(`Manutenção "${deleteDialog.title}" cancelada!`);
    setDeleteDialog(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wrench className="h-5 w-5 text-primary" />
            Modo Manutenção
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Current Status */}
          <Card className={maintenanceActive ? "border-warning bg-warning/5" : "border-success bg-success/5"}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {maintenanceActive ? (
                    <AlertTriangle className="h-8 w-8 text-warning" />
                  ) : (
                    <CheckCircle2 className="h-8 w-8 text-success" />
                  )}
                  <div>
                    <div className="text-lg font-medium">
                      {maintenanceActive ? "Sistema em Manutenção" : "Sistema Operacional"}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {maintenanceActive
                        ? "Os usuários não conseguem acessar o sistema"
                        : "Todos os serviços estão funcionando normalmente"}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="maintenance-toggle" className="text-sm">
                    {maintenanceActive ? "Desativar" : "Ativar"} Manutenção
                  </Label>
                  <Switch
                    id="maintenance-toggle"
                    checked={maintenanceActive}
                    onCheckedChange={handleToggleMaintenance}
                  />
                </div>
              </div>

              {maintenanceActive && (
                <div className="mt-4 pt-4 border-t space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>Mensagem para Usuários</Label>
                      <Textarea
                        placeholder="Estamos realizando uma manutenção programada..."
                        className="mt-2"
                        rows={3}
                      />
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Permitir Acesso Admin</div>
                          <div className="text-sm text-muted-foreground">Admins podem acessar durante manutenção</div>
                        </div>
                        <Switch checked={allowAdminAccess} onCheckedChange={setAllowAdminAccess} />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Notificar Usuários</div>
                          <div className="text-sm text-muted-foreground">Enviar aviso por email/push</div>
                        </div>
                        <Switch checked={notifyUsers} onCheckedChange={setNotifyUsers} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Scheduled Maintenances */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Manutenções Agendadas
              </CardTitle>
              <Button size="sm" onClick={() => setShowScheduleForm(true)}>
                <Plus className="h-4 w-4 mr-2" /> Agendar
              </Button>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[250px]">
                <div className="space-y-3 pr-4">
                  {scheduledMaintenances.map((maintenance) => (
                    <Card key={maintenance.id} className="bg-muted/30">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                              maintenance.status === "completed" ? "bg-success/10" : "bg-warning/10"
                            }`}>
                              {maintenance.status === "completed" ? (
                                <CheckCircle2 className="h-5 w-5 text-success" />
                              ) : (
                                <Clock className="h-5 w-5 text-warning" />
                              )}
                            </div>
                            <div>
                              <div className="font-medium">{maintenance.title}</div>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {maintenance.date}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {maintenance.time}
                                </span>
                                <span>Duração: {maintenance.duration}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge variant={maintenance.impact === "Total" ? "destructive" : "secondary"}>
                              Impacto {maintenance.impact}
                            </Badge>
                            <Badge variant={maintenance.status === "completed" ? "default" : "outline"}>
                              {maintenance.status === "completed" ? "Concluída" : "Agendada"}
                            </Badge>
                            {maintenance.status !== "completed" && (
                              <Button variant="ghost" size="icon" className="text-destructive transition-transform hover:scale-110 active:scale-95" onClick={() => setDeleteDialog({ open: true, id: maintenance.id, title: maintenance.title })}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Schedule Form */}
          {showScheduleForm && (
            <Card className="border-primary">
              <CardHeader>
                <CardTitle className="text-base">Nova Manutenção Agendada</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Título</Label>
                    <Input placeholder="Ex: Atualização do Sistema" className="mt-2" />
                  </div>
                  <div>
                    <Label>Impacto</Label>
                    <select className="w-full mt-2 h-10 px-3 rounded-md border bg-background">
                      <option value="partial">Parcial</option>
                      <option value="total">Total</option>
                    </select>
                  </div>
                  <div>
                    <Label>Data</Label>
                    <Input type="date" className="mt-2" />
                  </div>
                  <div>
                    <Label>Horário</Label>
                    <Input type="time" className="mt-2" />
                  </div>
                  <div>
                    <Label>Duração Estimada</Label>
                    <Input placeholder="Ex: 2 horas" className="mt-2" />
                  </div>
                  <div className="flex items-end gap-2">
                    <div className="flex items-center gap-2">
                      <Switch defaultChecked />
                      <Label>Notificar usuários 24h antes</Label>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={() => setShowScheduleForm(false)}>Cancelar</Button>
                  <Button className="transition-transform hover:scale-105 active:scale-95" onClick={handleScheduleMaintenance}>Agendar Manutenção</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {deleteDialog && (
          <DeleteConfirmDialog
            open={deleteDialog.open}
            onOpenChange={(open) => !open && setDeleteDialog(null)}
            title="Cancelar Manutenção"
            description={`Tem certeza que deseja cancelar a manutenção "${deleteDialog.title}"?`}
            onConfirm={handleDeleteMaintenance}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
