import { useState } from "react";
import { MoreVertical, Clock, User, CheckCircle2, DollarSign, MessageSquare, AlertTriangle, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckInModal } from "@/components/recepcao/CheckInModal";
import { PaymentModal } from "@/components/recepcao/PaymentModal";
import { CommunicationModal } from "@/components/recepcao/CommunicationModal";
import { toast } from "sonner";

interface AppointmentListItemProps {
  time: string;
  patientName: string;
  status: "confirmed" | "pending" | "completed" | "cancelled" | "waiting";
  service?: string;
  professional?: string;
  urgent?: boolean;
  onUrgencyToggle?: () => void;
  onPatientArrived?: () => void;
}

const statusConfig = {
  confirmed: {
    label: "Confirmado",
    gradient: "from-success/20 to-success/5",
    dotColor: "bg-success",
    borderColor: "border-success/30",
    iconBg: "bg-success/10",
    textColor: "text-success"
  },
  pending: {
    label: "Pendente",
    gradient: "from-warning/20 to-warning/5",
    dotColor: "bg-warning",
    borderColor: "border-warning/30",
    iconBg: "bg-warning/10",
    textColor: "text-warning"
  },
  waiting: {
    label: "Aguardando",
    gradient: "from-info/20 to-info/5",
    dotColor: "bg-info",
    borderColor: "border-info/30",
    iconBg: "bg-info/10",
    textColor: "text-info"
  },
  completed: {
    label: "Concluído",
    gradient: "from-primary/20 to-primary/5",
    dotColor: "bg-primary",
    borderColor: "border-primary/30",
    iconBg: "bg-primary/10",
    textColor: "text-primary"
  },
  cancelled: {
    label: "Cancelado",
    gradient: "from-destructive/20 to-destructive/5",
    dotColor: "bg-destructive",
    borderColor: "border-destructive/30",
    iconBg: "bg-destructive/10",
    textColor: "text-destructive"
  }
};

export const AppointmentListItem = ({ 
  time, 
  patientName, 
  status, 
  service = "Consulta",
  professional = "Profissional",
  urgent = false,
  onUrgencyToggle,
  onPatientArrived
}: AppointmentListItemProps) => {
  const config = statusConfig[status];
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [communicationOpen, setCommunicationOpen] = useState(false);

  const handlePatientArrived = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onPatientArrived) {
      onPatientArrived();
    }
    toast.success(`${patientName} registrado na sala de espera`, {
      description: "Paciente aguardando atendimento",
    });
  };

  const showArrivedButton = status === "confirmed" || status === "pending";
  return (
    <>
      <div className={`group relative bg-card border ${urgent ? 'border-destructive/50 shadow-[0_0_15px_rgba(239,68,68,0.1)]' : 'border-border'} hover:border-primary/30 hover:shadow-md transition-all duration-300 rounded-lg overflow-hidden`}>
        {/* Status accent line */}
        <div className={`absolute left-0 top-0 bottom-0 w-1 ${urgent ? 'bg-destructive' : config.dotColor}`} />
        
        <div className="relative p-4 pl-5">
          <div className="flex items-center gap-4">
            {/* Time Display */}
            <div className="flex flex-col items-center justify-center min-w-[72px] p-3 rounded-lg bg-muted/40 border border-border/50">
              <Clock className="h-4 w-4 text-muted-foreground mb-1" />
              <span className="text-sm font-bold text-foreground">{time}</span>
            </div>

            {/* Patient Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-base font-semibold text-foreground truncate">
                  {patientName}
                </h3>
                {urgent && (
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-destructive/10 border border-destructive/20">
                    <div className="h-1.5 w-1.5 rounded-full bg-destructive animate-pulse" />
                    <span className="text-[10px] font-semibold text-destructive uppercase tracking-wide">Urgente</span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Badge 
                  variant="secondary" 
                  className={`text-[11px] px-2 py-0 h-5 ${config.textColor} border ${config.borderColor}`}
                >
                  {config.label}
                </Badge>
                {service && (
                  <>
                    <span className="text-muted-foreground/50">•</span>
                    <span className="text-xs">{service}</span>
                  </>
                )}
                {professional && (
                  <>
                    <span className="text-muted-foreground/50">•</span>
                    <span className="text-xs truncate">{professional}</span>
                  </>
                )}
              </div>
            </div>

            {/* Quick Actions - Desktop */}
            <div className="hidden md:flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {onUrgencyToggle && (
                <Button
                  size="sm"
                  variant={urgent ? "destructive" : "ghost"}
                  onClick={(e) => {
                    e.stopPropagation();
                    onUrgencyToggle();
                  }}
                  className="h-8 w-8 p-0"
                  title={urgent ? "Remover urgência" : "Marcar como urgente"}
                >
                  <AlertTriangle className="h-3.5 w-3.5" />
                </Button>
              )}
              {showArrivedButton && (
                <Button
                  size="sm"
                  onClick={handlePatientArrived}
                  className="h-8 px-3 bg-info hover:bg-info/90 text-info-foreground"
                >
                  <UserCheck className="h-3.5 w-3.5 mr-1.5" />
                  <span className="text-xs">Chegou</span>
                </Button>
              )}
              <Button
                size="sm"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  setCheckInOpen(true);
                }}
                className="h-8 px-3 hover:bg-success/10 hover:text-success"
              >
                <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
                <span className="text-xs">Check-in</span>
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  setPaymentOpen(true);
                }}
                className="h-8 px-3 hover:bg-warning/10 hover:text-warning"
              >
                <DollarSign className="h-3.5 w-3.5 mr-1.5" />
                <span className="text-xs">Pagar</span>
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  setCommunicationOpen(true);
                }}
                className="h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary"
              >
                <MessageSquare className="h-3.5 w-3.5" />
              </Button>
            </div>

            {/* Menu button - Mobile */}
            <Button 
              variant="ghost" 
              size="icon"
              className="md:hidden h-8 w-8"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex gap-2 mt-3 pt-3 border-t border-border/50">
            {onUrgencyToggle && (
              <Button
                size="sm"
                variant={urgent ? "destructive" : "outline"}
                onClick={(e) => {
                  e.stopPropagation();
                  onUrgencyToggle();
                }}
                className="h-8 px-2.5"
              >
                <AlertTriangle className="h-3 w-3" />
              </Button>
            )}
            {showArrivedButton && (
              <Button
                size="sm"
                onClick={handlePatientArrived}
                className="flex-1 h-8 text-xs bg-info hover:bg-info/90 text-info-foreground"
              >
                <UserCheck className="h-3 w-3 mr-1" />
                Chegou
              </Button>
            )}
            <Button
              size="sm"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                setCheckInOpen(true);
              }}
              className="flex-1 h-8 text-xs"
            >
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Check-in
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                setPaymentOpen(true);
              }}
              className="flex-1 h-8 text-xs"
            >
              <DollarSign className="h-3 w-3 mr-1" />
              Pagar
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                setCommunicationOpen(true);
              }}
              className="h-8 px-2.5"
            >
              <MessageSquare className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>

      {/* Modais */}
      <CheckInModal
        open={checkInOpen}
        onOpenChange={setCheckInOpen}
        appointment={{
          patientName,
          time,
          service,
          professional,
          status: config.label,
        }}
      />
      <PaymentModal
        open={paymentOpen}
        onOpenChange={setPaymentOpen}
        appointment={{
          patientName,
          service,
          value: 150.00, // Mock value
        }}
      />
      <CommunicationModal
        open={communicationOpen}
        onOpenChange={setCommunicationOpen}
        appointment={{
          patientName,
          time,
          service,
        }}
      />
    </>
  );
};
