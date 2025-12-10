import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Bell, 
  Mail, 
  Smartphone, 
  MapPin, 
  Eye,
  Download,
  Trash2,
  FileText,
  CheckCircle2,
  Info
} from "lucide-react";
import { toast } from "sonner";

interface PrivacySettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PrivacySettingsModal({ open, onOpenChange }: PrivacySettingsModalProps) {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    whatsappNotifications: true,
    appointmentReminders: true,
    marketingEmails: false,
    shareDataResearch: false,
    locationTracking: false,
    twoFactorAuth: false,
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    toast.success("Configurações salvas com sucesso!");
    onOpenChange(false);
  };

  const handleDownloadData = () => {
    toast.info("Preparando download dos seus dados...", {
      description: "Você receberá um e-mail quando estiver pronto."
    });
  };

  const handleDeleteAccount = () => {
    toast.error("Esta ação não pode ser desfeita", {
      description: "Entre em contato com o suporte para excluir sua conta.",
      action: {
        label: "Entendi",
        onClick: () => {}
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-hidden bg-card/95 backdrop-blur-xl border-2 border-primary/20 rounded-2xl shadow-2xl">
        <DialogHeader className="pb-4 border-b">
          <DialogTitle className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-primary/70">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            Privacidade e Segurança
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="py-4 space-y-6">
            {/* Notifications Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-primary" />
                <h3 className="font-semibold">Notificações</h3>
              </div>
              
              <div className="space-y-3 pl-6">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <Label>Notificações por E-mail</Label>
                      <p className="text-xs text-muted-foreground">Receba atualizações no seu e-mail</p>
                    </div>
                  </div>
                  <Switch 
                    checked={settings.emailNotifications}
                    onCheckedChange={() => handleToggle("emailNotifications")}
                  />
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-3">
                    <Smartphone className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <Label>Notificações por SMS</Label>
                      <p className="text-xs text-muted-foreground">Receba lembretes via SMS</p>
                    </div>
                  </div>
                  <Switch 
                    checked={settings.smsNotifications}
                    onCheckedChange={() => handleToggle("smsNotifications")}
                  />
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-3">
                    <Smartphone className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <Label>WhatsApp</Label>
                      <p className="text-xs text-muted-foreground">Receba mensagens pelo WhatsApp</p>
                    </div>
                  </div>
                  <Switch 
                    checked={settings.whatsappNotifications}
                    onCheckedChange={() => handleToggle("whatsappNotifications")}
                  />
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-3">
                    <Bell className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <Label>Lembretes de Consulta</Label>
                      <p className="text-xs text-muted-foreground">24h e 1h antes da consulta</p>
                    </div>
                  </div>
                  <Switch 
                    checked={settings.appointmentReminders}
                    onCheckedChange={() => handleToggle("appointmentReminders")}
                  />
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <Label>E-mails de Marketing</Label>
                      <p className="text-xs text-muted-foreground">Novidades e promoções</p>
                    </div>
                  </div>
                  <Switch 
                    checked={settings.marketingEmails}
                    onCheckedChange={() => handleToggle("marketingEmails")}
                  />
                </div>
              </div>
            </div>

            {/* Privacy Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-primary" />
                <h3 className="font-semibold">Privacidade de Dados</h3>
              </div>
              
              <div className="space-y-3 pl-6">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <Label>Compartilhar dados para pesquisa</Label>
                      <p className="text-xs text-muted-foreground">Dados anonimizados para estudos médicos</p>
                    </div>
                  </div>
                  <Switch 
                    checked={settings.shareDataResearch}
                    onCheckedChange={() => handleToggle("shareDataResearch")}
                  />
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <Label>Rastreamento de localização</Label>
                      <p className="text-xs text-muted-foreground">Para encontrar clínicas próximas</p>
                    </div>
                  </div>
                  <Switch 
                    checked={settings.locationTracking}
                    onCheckedChange={() => handleToggle("locationTracking")}
                  />
                </div>
              </div>
            </div>

            {/* Security Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                <h3 className="font-semibold">Segurança</h3>
              </div>
              
              <div className="space-y-3 pl-6">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-3">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <Label>Autenticação em duas etapas</Label>
                      <p className="text-xs text-muted-foreground">Maior segurança no login</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {settings.twoFactorAuth && (
                      <Badge className="bg-success/10 text-success border-success/20">Ativo</Badge>
                    )}
                    <Switch 
                      checked={settings.twoFactorAuth}
                      onCheckedChange={() => handleToggle("twoFactorAuth")}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Data Management Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Download className="h-4 w-4 text-primary" />
                <h3 className="font-semibold">Gerenciar Dados</h3>
              </div>
              
              <div className="space-y-3 pl-6">
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-2"
                  onClick={handleDownloadData}
                >
                  <Download className="h-4 w-4" />
                  Baixar meus dados
                </Button>

                <div className="p-3 rounded-lg bg-info/10 text-sm flex items-start gap-2">
                  <Info className="h-4 w-4 text-info mt-0.5" />
                  <p className="text-muted-foreground">
                    Você pode solicitar uma cópia de todos os seus dados pessoais armazenados.
                  </p>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-2 text-destructive hover:text-destructive"
                  onClick={handleDeleteAccount}
                >
                  <Trash2 className="h-4 w-4" />
                  Excluir minha conta
                </Button>
              </div>
            </div>

            {/* LGPD Info */}
            <div className="p-4 rounded-xl bg-muted/30 text-sm">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-4 w-4 text-success" />
                <span className="font-medium">Conformidade com LGPD</span>
              </div>
              <p className="text-muted-foreground">
                Seus dados são protegidos de acordo com a Lei Geral de Proteção de Dados. 
                Para mais informações, consulte nossa{" "}
                <a href="#" className="text-primary hover:underline">Política de Privacidade</a>.
              </p>
            </div>
          </div>
        </ScrollArea>

        <div className="flex gap-3 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
            Cancelar
          </Button>
          <Button onClick={handleSave} className="flex-1 gap-2">
            <CheckCircle2 className="h-4 w-4" />
            Salvar Configurações
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
