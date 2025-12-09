import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  UserPlus,
  MessageCircle,
  DollarSign,
  Calendar,
  Phone,
  FileText,
  Clock,
  Users
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const QuickActions = () => {
  const navigate = useNavigate();
  const [newPatientOpen, setNewPatientOpen] = useState(false);
  const [messageOpen, setMessageOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);

  const handleNewPatient = () => {
    setNewPatientOpen(true);
  };

  const handleNewAppointment = () => {
    navigate("/calendar");
    toast.info("Abrindo calendário para novo agendamento...");
  };

  const handleSendMessage = () => {
    setMessageOpen(true);
  };

  const handleRegisterPayment = () => {
    setPaymentOpen(true);
  };

  const handleWhatsAppTemplates = () => {
    toast.success("Templates WhatsApp", {
      description: "Abrindo biblioteca de templates..."
    });
  };

  const handleDayReport = () => {
    toast.success("Relatório do Dia", {
      description: "Gerando relatório..."
    });
    navigate("/relatorios");
  };

  const actions = [
    {
      icon: UserPlus,
      label: "Novo Paciente",
      description: "Cadastrar novo paciente",
      color: "text-primary",
      bgColor: "bg-primary/10",
      count: null,
      onClick: handleNewPatient
    },
    {
      icon: Calendar,
      label: "Novo Agendamento",
      description: "Criar novo agendamento",
      color: "text-accent",
      bgColor: "bg-accent/10",
      count: null,
      onClick: handleNewAppointment
    },
    {
      icon: MessageCircle,
      label: "Enviar Mensagem",
      description: "WhatsApp ou SMS",
      color: "text-success",
      bgColor: "bg-success/10",
      count: 3,
      onClick: handleSendMessage
    },
    {
      icon: DollarSign,
      label: "Registrar Pagamento",
      description: "Lançar pagamento",
      color: "text-warning",
      bgColor: "bg-warning/10",
      count: 5,
      onClick: handleRegisterPayment
    }
  ];

  const quickStats = [
    { icon: Users, label: "Na Sala de Espera", value: "4", color: "text-primary" },
    { icon: Clock, label: "Em Atendimento", value: "2", color: "text-success" },
    { icon: Phone, label: "Aguardando Confirmação", value: "7", color: "text-warning" }
  ];

  return (
    <>
      <div className="space-y-6 pb-2">
        <div>
          <div className="space-y-2">
            {actions.map((action, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start h-auto p-3 hover:bg-primary/5 group transition-all duration-300"
                onClick={action.onClick}
              >
                <div className={`h-10 w-10 rounded-lg ${action.bgColor} flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                  <action.icon className={`h-5 w-5 ${action.color}`} />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <p className="text-sm font-medium text-foreground">{action.label}</p>
                  <p className="text-xs text-muted-foreground truncate">{action.description}</p>
                </div>
                {action.count && (
                  <Badge variant="secondary" className="ml-2 flex-shrink-0">
                    {action.count}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3">Status Atual</h4>
          <div className="space-y-3">
            {quickStats.map((stat, index) => (
              <div
                key={index}
                className="p-3 bg-background/50 rounded-lg border border-border/50 hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                  <p className="text-xl font-bold text-foreground">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3">Comunicação</h4>
          <div className="space-y-2">
            <Button 
              variant="outline" 
              className="w-full justify-start hover:bg-primary/5"
              onClick={handleWhatsAppTemplates}
            >
              <MessageCircle className="h-4 w-4 mr-2 text-success" />
              Templates WhatsApp
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start hover:bg-primary/5"
              onClick={handleDayReport}
            >
              <FileText className="h-4 w-4 mr-2 text-primary" />
              Relatório do Dia
            </Button>
          </div>
        </div>
      </div>

      {/* New Patient Modal */}
      <Dialog open={newPatientOpen} onOpenChange={setNewPatientOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-primary" />
              Novo Paciente
            </DialogTitle>
            <DialogDescription>Cadastro rápido de paciente</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="patient-name">Nome completo</Label>
              <Input id="patient-name" placeholder="Nome do paciente" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="patient-phone">Telefone</Label>
              <Input id="patient-phone" placeholder="(00) 00000-0000" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="patient-email">Email</Label>
              <Input id="patient-email" type="email" placeholder="email@exemplo.com" />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setNewPatientOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => {
                toast.success("Paciente cadastrado com sucesso!");
                setNewPatientOpen(false);
              }}>
                Cadastrar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Send Message Modal */}
      <Dialog open={messageOpen} onOpenChange={setMessageOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-success" />
              Enviar Mensagem
            </DialogTitle>
            <DialogDescription>Envie mensagem para um paciente</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="msg-patient">Paciente</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o paciente" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Maria Silva</SelectItem>
                  <SelectItem value="2">Carlos Oliveira</SelectItem>
                  <SelectItem value="3">Ana Costa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="msg-type">Canal</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o canal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="whatsapp">WhatsApp</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="msg-content">Mensagem</Label>
              <Textarea id="msg-content" placeholder="Digite sua mensagem..." rows={3} />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setMessageOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => {
                toast.success("Mensagem enviada com sucesso!");
                setMessageOpen(false);
              }}>
                Enviar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Register Payment Modal */}
      <Dialog open={paymentOpen} onOpenChange={setPaymentOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-warning" />
              Registrar Pagamento
            </DialogTitle>
            <DialogDescription>Registrar pagamento de paciente</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="pay-patient">Paciente</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o paciente" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Maria Silva</SelectItem>
                  <SelectItem value="2">Carlos Oliveira</SelectItem>
                  <SelectItem value="3">Ana Costa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="pay-value">Valor</Label>
              <Input id="pay-value" placeholder="R$ 0,00" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="pay-method">Forma de pagamento</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a forma" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pix">PIX</SelectItem>
                  <SelectItem value="credit">Cartão de Crédito</SelectItem>
                  <SelectItem value="debit">Cartão de Débito</SelectItem>
                  <SelectItem value="cash">Dinheiro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setPaymentOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => {
                toast.success("Pagamento registrado com sucesso!");
                setPaymentOpen(false);
              }}>
                Registrar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
