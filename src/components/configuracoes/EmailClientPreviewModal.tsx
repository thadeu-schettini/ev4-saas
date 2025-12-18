import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Mail,
  Monitor,
  Smartphone,
  Tablet,
  Sun,
  Moon,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Info,
  Inbox,
  Star,
  Trash2,
  Archive,
  MoreVertical,
  Reply,
  Forward,
  ChevronLeft,
  Paperclip,
  Search,
  Settings,
  Menu,
  Clock,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface EmailClientPreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  emailContent?: {
    subject: string;
    from: string;
    content: string;
  };
}

type EmailClient = "gmail" | "outlook" | "apple";
type DeviceType = "desktop" | "tablet" | "mobile";
type ThemeMode = "light" | "dark";

interface CompatibilityIssue {
  client: EmailClient;
  severity: "error" | "warning" | "info";
  message: string;
}

const compatibilityIssues: CompatibilityIssue[] = [
  { client: "outlook", severity: "warning", message: "Gradientes CSS podem não renderizar corretamente" },
  { client: "outlook", severity: "info", message: "Background images são suportados parcialmente" },
  { client: "gmail", severity: "info", message: "Estilos CSS inline são recomendados" },
  { client: "apple", severity: "info", message: "Dark mode pode alterar algumas cores" },
];

export default function EmailClientPreviewModal({
  open,
  onOpenChange,
  emailContent = {
    subject: "Sua consulta foi confirmada - 15/12 às 14:30",
    from: "Clínica Saúde Total <contato@clinicasaudetotal.com>",
    content: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #3b82f6, #1d4ed8); padding: 32px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Clínica Saúde Total</h1>
          <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0;">Cuidando da sua saúde</p>
        </div>
        <div style="padding: 32px; background: white;">
          <p style="color: #374151; font-size: 16px; line-height: 1.6;">Olá João,</p>
          <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            Sua consulta foi confirmada com sucesso!
          </p>
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 24px 0;">
            <p style="margin: 0 0 8px; color: #6b7280; font-size: 14px;">📅 Data: <strong style="color: #111827;">15 de Dezembro, 2024</strong></p>
            <p style="margin: 0 0 8px; color: #6b7280; font-size: 14px;">🕐 Horário: <strong style="color: #111827;">14:30</strong></p>
            <p style="margin: 0 0 8px; color: #6b7280; font-size: 14px;">👨‍⚕️ Profissional: <strong style="color: #111827;">Dr. Ricardo Carvalho</strong></p>
            <p style="margin: 0; color: #6b7280; font-size: 14px;">📍 Local: <strong style="color: #111827;">Rua das Flores, 123</strong></p>
          </div>
          <div style="text-align: center; margin: 32px 0;">
            <a href="#" style="display: inline-block; background: #3b82f6; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600;">
              Confirmar Presença
            </a>
          </div>
          <p style="color: #6b7280; font-size: 14px; line-height: 1.6;">
            Lembre-se de trazer seus documentos e chegar 15 minutos antes.
          </p>
        </div>
        <div style="background: #f9fafb; padding: 24px; text-align: center; border-radius: 0 0 8px 8px;">
          <p style="color: #9ca3af; font-size: 12px; margin: 0;">
            © 2024 Clínica Saúde Total. Todos os direitos reservados.
          </p>
          <p style="color: #9ca3af; font-size: 12px; margin: 8px 0 0;">
            📍 Rua das Flores, 123 | 📞 (11) 1234-5678
          </p>
        </div>
      </div>
    `,
  },
}: EmailClientPreviewModalProps) {
  const [selectedClient, setSelectedClient] = useState<EmailClient>("gmail");
  const [deviceType, setDeviceType] = useState<DeviceType>("desktop");
  const [themeMode, setThemeMode] = useState<ThemeMode>("light");

  const clientIssues = compatibilityIssues.filter((issue) => issue.client === selectedClient);

  const deviceSizes = {
    desktop: { width: "100%", maxWidth: "800px" },
    tablet: { width: "768px", maxWidth: "768px" },
    mobile: { width: "375px", maxWidth: "375px" },
  };

  const renderGmailPreview = () => (
    <div className={cn("h-full flex flex-col", themeMode === "dark" ? "bg-[#1f1f1f] text-white" : "bg-[#f6f8fc] text-gray-900")}>
      {/* Gmail Header */}
      <div className={cn("flex items-center gap-4 px-4 py-3 border-b", themeMode === "dark" ? "border-gray-700 bg-[#1f1f1f]" : "border-gray-200 bg-white")}>
        <Menu className="h-5 w-5 text-gray-500" />
        <div className="flex items-center gap-2">
          <Mail className="h-6 w-6 text-red-500" />
          <span className="text-xl font-normal">Gmail</span>
        </div>
        <div className="flex-1 mx-4">
          <div className={cn("flex items-center gap-2 px-4 py-2 rounded-lg", themeMode === "dark" ? "bg-[#333]" : "bg-gray-100")}>
            <Search className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-500">Pesquisar e-mail</span>
          </div>
        </div>
        <Settings className="h-5 w-5 text-gray-500" />
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {deviceType === "desktop" && (
          <div className={cn("w-56 p-2 border-r", themeMode === "dark" ? "border-gray-700" : "border-gray-200")}>
            <Button className="w-full mb-4 rounded-2xl bg-blue-100 text-blue-700 hover:bg-blue-200 gap-2 justify-start px-6">
              <Mail className="h-5 w-5" />
              Escrever
            </Button>
            <div className="space-y-1">
              {[
                { icon: Inbox, label: "Entrada", count: 12 },
                { icon: Star, label: "Com estrela", count: 3 },
                { icon: Clock, label: "Adiados" },
                { icon: Archive, label: "Arquivados" },
                { icon: Trash2, label: "Lixeira" },
              ].map((item, idx) => (
                <button
                  key={idx}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-2 rounded-r-full text-sm",
                    idx === 0
                      ? themeMode === "dark"
                        ? "bg-blue-900/30 text-blue-300"
                        : "bg-blue-100 text-blue-700"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.count && <span className="text-xs">{item.count}</span>}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Email Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Email Header */}
          <div className={cn("px-4 py-3 border-b", themeMode === "dark" ? "border-gray-700" : "border-gray-200")}>
            <div className="flex items-center gap-2 mb-3">
              <ChevronLeft className="h-5 w-5" />
              <Archive className="h-5 w-5" />
              <Trash2 className="h-5 w-5" />
              <MoreVertical className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-normal mb-2">{emailContent.subject}</h2>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                C
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Clínica Saúde Total</span>
                  <span className="text-xs text-gray-500">&lt;contato@clinicasaudetotal.com&gt;</span>
                </div>
                <span className="text-xs text-gray-500">para mim</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <span className="text-xs">14:32</span>
                <Reply className="h-4 w-4" />
                <Forward className="h-4 w-4" />
              </div>
            </div>
          </div>

          {/* Email Body */}
          <ScrollArea className="flex-1 p-4">
            <div
              className={cn(
                "rounded-lg overflow-hidden",
                themeMode === "dark" ? "bg-[#1f1f1f]" : "bg-white"
              )}
              dangerouslySetInnerHTML={{ __html: emailContent.content }}
            />
          </ScrollArea>
        </div>
      </div>
    </div>
  );

  const renderOutlookPreview = () => (
    <div className={cn("h-full flex flex-col", themeMode === "dark" ? "bg-[#1e1e1e] text-white" : "bg-[#f3f3f3] text-gray-900")}>
      {/* Outlook Header */}
      <div className={cn("px-4 py-2 border-b flex items-center gap-4", themeMode === "dark" ? "border-gray-700 bg-[#0078d4]" : "border-gray-300 bg-[#0078d4]")}>
        <span className="text-white font-semibold">Outlook</span>
        <div className="flex-1" />
        <Search className="h-4 w-4 text-white" />
        <Settings className="h-4 w-4 text-white" />
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Outlook Sidebar */}
        {deviceType === "desktop" && (
          <div className={cn("w-48 p-2 border-r", themeMode === "dark" ? "border-gray-700 bg-[#252525]" : "border-gray-300 bg-white")}>
            <Button className="w-full mb-3 rounded bg-[#0078d4] text-white gap-2">
              <Mail className="h-4 w-4" />
              Novo email
            </Button>
            <div className="space-y-1">
              {[
                { icon: Inbox, label: "Caixa de Entrada", count: 8 },
                { icon: Star, label: "Favoritos" },
                { icon: Archive, label: "Arquivo" },
                { icon: Trash2, label: "Itens Excluídos" },
              ].map((item, idx) => (
                <button
                  key={idx}
                  className={cn(
                    "w-full flex items-center gap-2 px-3 py-1.5 rounded text-sm",
                    idx === 0
                      ? themeMode === "dark"
                        ? "bg-[#0078d4]/20 text-[#4da6ff]"
                        : "bg-[#0078d4]/10 text-[#0078d4]"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.count && <Badge variant="secondary" className="text-xs">{item.count}</Badge>}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Email Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className={cn("px-4 py-3 border-b", themeMode === "dark" ? "border-gray-700 bg-[#1e1e1e]" : "border-gray-300 bg-white")}>
            <div className="flex items-center gap-2 mb-3">
              <Button variant="outline" size="sm" className="gap-1">
                <Reply className="h-4 w-4" />
                Responder
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <Forward className="h-4 w-4" />
                Encaminhar
              </Button>
              <Button variant="outline" size="sm">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <h2 className="text-lg font-semibold mb-2">{emailContent.subject}</h2>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#0078d4] flex items-center justify-center text-white text-sm font-medium">
                CT
              </div>
              <div>
                <p className="font-medium text-sm">Clínica Saúde Total</p>
                <p className="text-xs text-gray-500">contato@clinicasaudetotal.com</p>
              </div>
            </div>
          </div>

          <ScrollArea className="flex-1 p-4">
            <div
              className={cn("rounded overflow-hidden", themeMode === "dark" ? "bg-[#1e1e1e]" : "bg-white")}
              dangerouslySetInnerHTML={{ __html: emailContent.content }}
            />
          </ScrollArea>
        </div>
      </div>
    </div>
  );

  const renderAppleMailPreview = () => (
    <div className={cn("h-full flex flex-col", themeMode === "dark" ? "bg-[#1c1c1e] text-white" : "bg-[#f5f5f7] text-gray-900")}>
      {/* Apple Mail Header */}
      <div className={cn("px-4 py-3 border-b flex items-center gap-4", themeMode === "dark" ? "border-gray-700 bg-[#2c2c2e]" : "border-gray-200 bg-[#f5f5f7]")}>
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 text-center">
          <span className="font-medium">Mail</span>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Apple Mail Sidebar */}
        {deviceType === "desktop" && (
          <div className={cn("w-52 border-r", themeMode === "dark" ? "border-gray-700 bg-[#2c2c2e]" : "border-gray-200 bg-white")}>
            <div className="p-2 space-y-1">
              {[
                { icon: Inbox, label: "Entrada", count: 5 },
                { icon: Star, label: "Favoritos" },
                { icon: Paperclip, label: "Anexos" },
                { icon: Archive, label: "Arquivo" },
                { icon: Trash2, label: "Lixo" },
              ].map((item, idx) => (
                <button
                  key={idx}
                  className={cn(
                    "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm",
                    idx === 0
                      ? themeMode === "dark"
                        ? "bg-[#0a84ff]/20 text-[#0a84ff]"
                        : "bg-[#007aff]/10 text-[#007aff]"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.count && <span className="text-xs text-gray-500">{item.count}</span>}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Email Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className={cn("px-4 py-4 border-b", themeMode === "dark" ? "border-gray-700 bg-[#1c1c1e]" : "border-gray-200 bg-white")}>
            <h2 className="text-xl font-semibold mb-3">{emailContent.subject}</h2>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium">
                CS
              </div>
              <div className="flex-1">
                <p className="font-medium">Clínica Saúde Total</p>
                <p className="text-sm text-gray-500">Para: mim</p>
              </div>
              <span className="text-sm text-gray-500">14:32</span>
            </div>
          </div>

          <ScrollArea className="flex-1 p-4">
            <div
              className={cn("rounded-xl overflow-hidden", themeMode === "dark" ? "bg-[#2c2c2e]" : "bg-white")}
              dangerouslySetInnerHTML={{ __html: emailContent.content }}
            />
          </ScrollArea>
        </div>
      </div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Mail className="h-5 w-5 text-primary" />
            Preview em Diferentes Clientes de Email
          </DialogTitle>
        </DialogHeader>

        <div className="p-6 space-y-4">
          {/* Controls */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Email Client Selection */}
            <Tabs value={selectedClient} onValueChange={(v) => setSelectedClient(v as EmailClient)}>
              <TabsList>
                <TabsTrigger value="gmail" className="gap-2">
                  <Mail className="h-4 w-4 text-red-500" />
                  Gmail
                </TabsTrigger>
                <TabsTrigger value="outlook" className="gap-2">
                  <Mail className="h-4 w-4 text-blue-500" />
                  Outlook
                </TabsTrigger>
                <TabsTrigger value="apple" className="gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  Apple Mail
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex items-center gap-2 ml-auto">
              {/* Device Selection */}
              <div className="flex items-center border rounded-lg p-1">
                {[
                  { type: "desktop" as DeviceType, icon: Monitor },
                  { type: "tablet" as DeviceType, icon: Tablet },
                  { type: "mobile" as DeviceType, icon: Smartphone },
                ].map((device) => (
                  <Button
                    key={device.type}
                    variant={deviceType === device.type ? "secondary" : "ghost"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setDeviceType(device.type)}
                  >
                    <device.icon className="h-4 w-4" />
                  </Button>
                ))}
              </div>

              {/* Theme Toggle */}
              <div className="flex items-center border rounded-lg p-1">
                <Button
                  variant={themeMode === "light" ? "secondary" : "ghost"}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setThemeMode("light")}
                >
                  <Sun className="h-4 w-4" />
                </Button>
                <Button
                  variant={themeMode === "dark" ? "secondary" : "ghost"}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setThemeMode("dark")}
                >
                  <Moon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Compatibility Issues */}
          {clientIssues.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {clientIssues.map((issue, idx) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className={cn(
                    "gap-1",
                    issue.severity === "error" && "border-red-500/50 text-red-600",
                    issue.severity === "warning" && "border-amber-500/50 text-amber-600",
                    issue.severity === "info" && "border-blue-500/50 text-blue-600"
                  )}
                >
                  {issue.severity === "error" && <XCircle className="h-3 w-3" />}
                  {issue.severity === "warning" && <AlertCircle className="h-3 w-3" />}
                  {issue.severity === "info" && <Info className="h-3 w-3" />}
                  {issue.message}
                </Badge>
              ))}
            </div>
          )}

          {/* Preview Container */}
          <div
            className="border rounded-xl overflow-hidden mx-auto transition-all duration-300"
            style={{
              width: deviceSizes[deviceType].width,
              maxWidth: deviceSizes[deviceType].maxWidth,
              height: deviceType === "mobile" ? "600px" : "500px",
            }}
          >
            {selectedClient === "gmail" && renderGmailPreview()}
            {selectedClient === "outlook" && renderOutlookPreview()}
            {selectedClient === "apple" && renderAppleMailPreview()}
          </div>

          {/* Compatibility Summary */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
            {[
              { client: "Gmail", icon: Mail, color: "text-red-500", status: "Compatível" },
              { client: "Outlook", icon: Mail, color: "text-blue-500", status: "Parcialmente" },
              { client: "Apple Mail", icon: Mail, color: "text-gray-500", status: "Compatível" },
            ].map((item) => (
              <div key={item.client} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <item.icon className={cn("h-5 w-5", item.color)} />
                <div>
                  <p className="font-medium text-sm">{item.client}</p>
                  <p className="text-xs text-muted-foreground">{item.status}</p>
                </div>
                <CheckCircle2 className="h-4 w-4 text-emerald-500 ml-auto" />
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
