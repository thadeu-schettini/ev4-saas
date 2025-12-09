import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Phone, MessageSquare } from "lucide-react";
import { toast } from "sonner";

interface PendingAppointment {
  id: string;
  patient: string;
  time: string;
  phone: string;
  service: string;
  professional: string;
}

export const PendingConfirmations = () => {
  // Mock data - substituir com dados reais
  const pendingAppointments: PendingAppointment[] = [
    {
      id: "1",
      patient: "Maria Silva",
      time: "09:00",
      phone: "+55 11 98765-4321",
      service: "Consulta Psicológica",
      professional: "Dra. Ana Costa",
    },
    {
      id: "2",
      patient: "João Santos",
      time: "14:30",
      phone: "+55 11 91234-5678",
      service: "Fisioterapia",
      professional: "Dr. Pedro Alves",
    },
    {
      id: "3",
      patient: "Ana Oliveira",
      time: "16:00",
      phone: "+55 11 99876-5432",
      service: "Nutrição",
      professional: "Dra. Paula Lima",
    },
  ];

  const handleWhatsApp = (phone: string, patient: string, time: string) => {
    const message = encodeURIComponent(
      `Olá! Estamos confirmando sua consulta agendada para amanhã às ${time}. Por favor, confirme sua presença.`
    );
    const phoneNumber = phone.replace(/\D/g, "");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
    toast.success(`WhatsApp aberto para ${patient}`);
  };

  const handleSMS = (phone: string, patient: string) => {
    toast.success(`SMS enviado para ${patient}`);
  };

  const handleCall = (phone: string, patient: string) => {
    window.open(`tel:${phone}`);
    toast.success(`Ligando para ${patient}`);
  };

  if (pendingAppointments.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3 pb-2">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs text-muted-foreground">
          Amanhã • Aguardando confirmação
        </p>
        <Badge variant="secondary" className="bg-warning/20 text-warning border-warning/30">
          {pendingAppointments.length}
        </Badge>
      </div>
        {pendingAppointments.map((appointment) => (
          <div
            key={appointment.id}
            className="group p-3 rounded-lg bg-background/80 backdrop-blur-sm border border-border/50 hover:border-warning/30 hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{appointment.patient}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{appointment.time}</span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground truncate">
                    {appointment.service}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-1.5 mt-2">
              <Button
                size="sm"
                variant="outline"
                className="h-7 flex-1 text-xs bg-success/10 border-success/30 hover:bg-success/20 hover:border-success/50 text-success"
                onClick={() =>
                  handleWhatsApp(appointment.phone, appointment.patient, appointment.time)
                }
              >
                <MessageSquare className="h-3 w-3 mr-1" />
                WhatsApp
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="h-7 flex-1 text-xs hover:bg-primary/10 hover:border-primary/50"
                onClick={() => handleSMS(appointment.phone, appointment.patient)}
              >
                <MessageSquare className="h-3 w-3 mr-1" />
                SMS
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="h-7 px-2 hover:bg-primary/10 hover:border-primary/50"
                onClick={() => handleCall(appointment.phone, appointment.patient)}
              >
                <Phone className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}
    </div>
  );
};
