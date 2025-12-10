import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Video, 
  MapPin, 
  ChevronRight,
  ChevronLeft,
  Check,
  Stethoscope,
  Star
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";

interface NewAppointmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const specialties = [
  { id: "cardio", name: "Cardiologia", icon: "❤️" },
  { id: "derma", name: "Dermatologia", icon: "🩺" },
  { id: "orto", name: "Ortopedia", icon: "🦴" },
  { id: "gine", name: "Ginecologia", icon: "👩" },
  { id: "ped", name: "Pediatria", icon: "👶" },
  { id: "neuro", name: "Neurologia", icon: "🧠" },
  { id: "oftalmo", name: "Oftalmologia", icon: "👁️" },
  { id: "psiq", name: "Psiquiatria", icon: "🧘" },
];

const professionals = [
  { id: 1, name: "Dr. Ricardo Carvalho", specialty: "Cardiologia", rating: 4.9, reviews: 128, avatar: "", availableOnline: true },
  { id: 2, name: "Dra. Ana Paula Santos", specialty: "Cardiologia", rating: 4.8, reviews: 95, avatar: "", availableOnline: true },
  { id: 3, name: "Dr. Marcos Souza", specialty: "Cardiologia", rating: 4.7, reviews: 76, avatar: "", availableOnline: false },
];

const timeSlots = [
  { time: "08:00", available: true },
  { time: "08:30", available: false },
  { time: "09:00", available: true },
  { time: "09:30", available: true },
  { time: "10:00", available: false },
  { time: "10:30", available: true },
  { time: "11:00", available: true },
  { time: "14:00", available: true },
  { time: "14:30", available: false },
  { time: "15:00", available: true },
  { time: "15:30", available: true },
  { time: "16:00", available: true },
];

export function NewAppointmentModal({ open, onOpenChange }: NewAppointmentModalProps) {
  const [step, setStep] = useState(1);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
  const [selectedProfessional, setSelectedProfessional] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [appointmentType, setAppointmentType] = useState<"presencial" | "online">("presencial");

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleConfirm = () => {
    toast.success("Consulta agendada com sucesso!", {
      description: "Você receberá uma confirmação por e-mail e WhatsApp."
    });
    onOpenChange(false);
    // Reset state
    setStep(1);
    setSelectedSpecialty(null);
    setSelectedProfessional(null);
    setSelectedDate(undefined);
    setSelectedTime(null);
  };

  const canProceed = () => {
    switch (step) {
      case 1: return selectedSpecialty !== null;
      case 2: return selectedProfessional !== null;
      case 3: return selectedDate !== undefined && selectedTime !== null;
      default: return true;
    }
  };

  const selectedProf = professionals.find(p => p.id === selectedProfessional);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-hidden bg-card/95 backdrop-blur-xl border-2 border-primary/20 rounded-2xl shadow-2xl">
        <DialogHeader className="pb-4 border-b">
          <DialogTitle className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-primary/70">
              <CalendarIcon className="h-5 w-5 text-primary-foreground" />
            </div>
            Agendar Nova Consulta
          </DialogTitle>
          
          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all",
                  s < step ? "bg-primary text-primary-foreground" :
                  s === step ? "bg-primary text-primary-foreground ring-4 ring-primary/20" :
                  "bg-muted text-muted-foreground"
                )}>
                  {s < step ? <Check className="h-4 w-4" /> : s}
                </div>
                {s < 4 && (
                  <div className={cn(
                    "w-12 h-1 mx-1 rounded-full transition-all",
                    s < step ? "bg-primary" : "bg-muted"
                  )} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-2 px-4">
            <span>Especialidade</span>
            <span>Profissional</span>
            <span>Data/Hora</span>
            <span>Confirmar</span>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[50vh] pr-4">
          {/* Step 1: Select Specialty */}
          {step === 1 && (
            <div className="py-4">
              <h3 className="font-medium mb-4">Selecione a especialidade</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {specialties.map((spec) => (
                  <button
                    key={spec.id}
                    onClick={() => setSelectedSpecialty(spec.id)}
                    className={cn(
                      "p-4 rounded-xl border-2 transition-all hover:scale-[1.02] text-center",
                      selectedSpecialty === spec.id
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <span className="text-2xl mb-2 block">{spec.icon}</span>
                    <span className="text-sm font-medium">{spec.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Select Professional */}
          {step === 2 && (
            <div className="py-4 space-y-4">
              <h3 className="font-medium">Escolha o profissional</h3>
              
              {/* Appointment Type */}
              <div className="flex gap-2 p-1 rounded-lg bg-muted/50">
                <button
                  onClick={() => setAppointmentType("presencial")}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 py-2 rounded-md transition-all",
                    appointmentType === "presencial" ? "bg-card shadow-sm" : "hover:bg-card/50"
                  )}
                >
                  <MapPin className="h-4 w-4" />
                  Presencial
                </button>
                <button
                  onClick={() => setAppointmentType("online")}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 py-2 rounded-md transition-all",
                    appointmentType === "online" ? "bg-card shadow-sm" : "hover:bg-card/50"
                  )}
                >
                  <Video className="h-4 w-4" />
                  Online
                </button>
              </div>

              <div className="space-y-3">
                {professionals.filter(p => appointmentType === "presencial" || p.availableOnline).map((prof) => (
                  <button
                    key={prof.id}
                    onClick={() => setSelectedProfessional(prof.id)}
                    className={cn(
                      "w-full p-4 rounded-xl border-2 transition-all hover:shadow-md text-left",
                      selectedProfessional === prof.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                        <User className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">{prof.name}</span>
                          {prof.availableOnline && (
                            <Badge variant="outline" className="text-xs">
                              <Video className="h-3 w-3 mr-1" />
                              Online
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{prof.specialty}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-warning text-warning" />
                            <span className="text-sm font-medium">{prof.rating}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">({prof.reviews} avaliações)</span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Select Date & Time */}
          {step === 3 && (
            <div className="py-4 space-y-4">
              <h3 className="font-medium">Escolha data e horário</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border rounded-xl p-2">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    locale={ptBR}
                    disabled={(date) => date < new Date() || date.getDay() === 0}
                    className="pointer-events-auto"
                  />
                </div>
                
                {selectedDate && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Horários disponíveis em {format(selectedDate, "dd 'de' MMMM", { locale: ptBR })}
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot.time}
                          onClick={() => slot.available && setSelectedTime(slot.time)}
                          disabled={!slot.available}
                          className={cn(
                            "py-2 px-3 rounded-lg text-sm font-medium transition-all",
                            !slot.available && "opacity-40 cursor-not-allowed bg-muted",
                            slot.available && selectedTime === slot.time
                              ? "bg-primary text-primary-foreground"
                              : slot.available && "bg-muted/50 hover:bg-primary/10"
                          )}
                        >
                          {slot.time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {step === 4 && selectedProf && selectedDate && selectedTime && (
            <div className="py-4 space-y-4">
              <h3 className="font-medium">Confirme sua consulta</h3>
              
              <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                    <Stethoscope className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">{selectedProf.name}</h4>
                    <p className="text-muted-foreground">{selectedProf.specialty}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-xl bg-card/80">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <CalendarIcon className="h-4 w-4" />
                      <span className="text-xs">Data</span>
                    </div>
                    <p className="font-medium">
                      {format(selectedDate, "dd 'de' MMMM, yyyy", { locale: ptBR })}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-card/80">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Clock className="h-4 w-4" />
                      <span className="text-xs">Horário</span>
                    </div>
                    <p className="font-medium">{selectedTime}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-card/80 col-span-2">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      {appointmentType === "online" ? <Video className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
                      <span className="text-xs">Tipo de Consulta</span>
                    </div>
                    <p className="font-medium">
                      {appointmentType === "online" ? "Teleconsulta (Online)" : "Presencial na Clínica"}
                    </p>
                  </div>
                </div>

                <div className="mt-4 p-3 rounded-xl bg-info/10 border border-info/20">
                  <p className="text-sm text-info">
                    💡 Você receberá um lembrete 24h antes da consulta por WhatsApp e e-mail.
                  </p>
                </div>
              </div>
            </div>
          )}
        </ScrollArea>

        <div className="flex items-center justify-between pt-4 border-t">
          <Button 
            variant="outline" 
            onClick={handleBack}
            disabled={step === 1}
            className="gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Voltar
          </Button>
          
          {step < 4 ? (
            <Button 
              onClick={handleNext}
              disabled={!canProceed()}
              className="gap-2"
            >
              Próximo
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleConfirm} className="gap-2">
              <Check className="h-4 w-4" />
              Confirmar Agendamento
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
