import { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventClickArg, DateSelectArg, EventDropArg } from "@fullcalendar/core";
import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, 
  ChevronRight,
  LayoutGrid,
  List,
  CalendarDays,
  MapPin
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { AppointmentCard } from "@/components/AppointmentCard";

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  extendedProps: {
    patient: string;
    professional: string;
    service: string;
    status: "confirmed" | "pending" | "completed" | "cancelled";
    room?: string;
  };
}

const statusColors = {
  confirmed: {
    bg: "bg-primary/15",
    border: "border-l-primary",
    text: "text-primary",
    dot: "bg-primary"
  },
  pending: {
    bg: "bg-warning/15",
    border: "border-l-warning",
    text: "text-warning",
    dot: "bg-warning"
  },
  completed: {
    bg: "bg-success/15",
    border: "border-l-success",
    text: "text-success",
    dot: "bg-success"
  },
  cancelled: {
    bg: "bg-destructive/15",
    border: "border-l-destructive",
    text: "text-destructive",
    dot: "bg-destructive"
  }
};

const mockEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Consulta - Maria Silva",
    start: new Date(new Date().setHours(9, 0, 0, 0)),
    end: new Date(new Date().setHours(9, 30, 0, 0)),
    extendedProps: {
      patient: "Maria Silva",
      professional: "Dr. João Santos",
      service: "Consulta Geral",
      status: "confirmed",
      room: "Sala 1"
    }
  },
  {
    id: "2",
    title: "Retorno - Carlos Oliveira",
    start: new Date(new Date().setHours(10, 0, 0, 0)),
    end: new Date(new Date().setHours(10, 30, 0, 0)),
    extendedProps: {
      patient: "Carlos Oliveira",
      professional: "Dra. Ana Lima",
      service: "Retorno",
      status: "pending",
      room: "Sala 2"
    }
  },
  {
    id: "3",
    title: "Exame - Ana Costa",
    start: new Date(new Date().setHours(11, 30, 0, 0)),
    end: new Date(new Date().setHours(12, 0, 0, 0)),
    extendedProps: {
      patient: "Ana Costa",
      professional: "Dr. João Santos",
      service: "Exame de Rotina",
      status: "completed"
    }
  },
  {
    id: "4",
    title: "Consulta - Pedro Souza",
    start: new Date(new Date().setHours(14, 0, 0, 0)),
    end: new Date(new Date().setHours(14, 45, 0, 0)),
    extendedProps: {
      patient: "Pedro Souza",
      professional: "Dra. Ana Lima",
      service: "Primeira Consulta",
      status: "cancelled"
    }
  },
  {
    id: "5",
    title: "Consulta - Julia Martins",
    start: new Date(new Date().setHours(15, 0, 0, 0)),
    end: new Date(new Date().setHours(15, 30, 0, 0)),
    extendedProps: {
      patient: "Julia Martins",
      professional: "Dr. João Santos",
      service: "Acompanhamento",
      status: "confirmed",
      room: "Sala 1"
    }
  },
  {
    id: "6",
    title: "Procedimento - Lucas Ferreira",
    start: new Date(new Date().setHours(16, 0, 0, 0)),
    end: new Date(new Date().setHours(17, 0, 0, 0)),
    extendedProps: {
      patient: "Lucas Ferreira",
      professional: "Dr. João Santos",
      service: "Procedimento Especial",
      status: "pending",
      room: "Sala 3"
    }
  },
  {
    id: "7",
    title: "Consulta - Fernanda Lima",
    start: new Date(new Date(new Date().setDate(new Date().getDate() + 1)).setHours(10, 0, 0, 0)),
    end: new Date(new Date(new Date().setDate(new Date().getDate() + 1)).setHours(10, 30, 0, 0)),
    extendedProps: {
      patient: "Fernanda Lima",
      professional: "Dra. Ana Lima",
      service: "Consulta Geral",
      status: "confirmed"
    }
  }
];

type ViewType = "dayGridMonth" | "timeGridWeek" | "timeGridDay";

export const FullCalendarView = () => {
  const calendarRef = useRef<FullCalendar>(null);
  const isMobile = useIsMobile();
  const [currentView, setCurrentView] = useState<ViewType>("timeGridWeek");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events] = useState<CalendarEvent[]>(mockEvents);
  const [selectedAppointment, setSelectedAppointment] = useState<CalendarEvent | null>(null);
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);
  const [appointmentMode, setAppointmentMode] = useState<"view" | "create">("view");
  const [newAppointmentData, setNewAppointmentData] = useState<{
    date?: string;
    startTime?: string;
    endTime?: string;
  } | null>(null);

  // Force day view on mobile
  const effectiveView = isMobile ? "timeGridDay" : currentView;

  // Sync calendar view when mobile state changes and scroll to current time
  useEffect(() => {
    if (calendarRef.current) {
      const api = calendarRef.current.getApi();
      api.changeView(effectiveView);
      
      // Scroll to current time after a small delay to ensure DOM is ready
      setTimeout(() => {
        api.scrollToTime({ hour: new Date().getHours() - 2, minute: 0 });
      }, 100);
    }
  }, [isMobile, effectiveView]);

  const viewOptions = [
    { value: "timeGridDay" as ViewType, label: "Dia", icon: List },
    { value: "timeGridWeek" as ViewType, label: "Semana", icon: CalendarDays },
    { value: "dayGridMonth" as ViewType, label: "Mês", icon: LayoutGrid },
  ];

  const handleViewChange = (view: ViewType) => {
    if (isMobile) return; // Block view change on mobile
    setCurrentView(view);
    calendarRef.current?.getApi().changeView(view);
  };

  const handlePrev = () => {
    calendarRef.current?.getApi().prev();
    setCurrentDate(calendarRef.current?.getApi().getDate() || new Date());
  };

  const handleNext = () => {
    calendarRef.current?.getApi().next();
    setCurrentDate(calendarRef.current?.getApi().getDate() || new Date());
  };

  const handleToday = () => {
    calendarRef.current?.getApi().today();
    setCurrentDate(new Date());
  };

  const handleEventClick = (info: EventClickArg) => {
    const event = info.event;
    // Open appointment modal with selected event data
    setSelectedAppointment({
      id: event.id,
      title: event.title,
      start: event.start || new Date(),
      end: event.end || new Date(),
      extendedProps: {
        patient: event.extendedProps.patient,
        professional: event.extendedProps.professional,
        service: event.extendedProps.service,
        status: event.extendedProps.status,
        room: event.extendedProps.room
      }
    });
    setAppointmentMode("view");
    setAppointmentModalOpen(true);
  };

  const handleDateSelect = (info: DateSelectArg) => {
    const formatTime = (date: Date) => {
      return date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", hour12: false });
    };
    
    const formatDate = (date: Date) => {
      return date.toISOString().split('T')[0];
    };

    setNewAppointmentData({
      date: formatDate(info.start),
      startTime: formatTime(info.start),
      endTime: formatTime(info.end)
    });
    setAppointmentMode("create");
    setAppointmentModalOpen(true);
  };

  const handleEventDrop = (info: EventDropArg) => {
    toast.success("Agendamento movido", {
      description: `${info.event.extendedProps.patient} reagendado para ${info.event.start?.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}`
    });
  };

  const formatCurrentDate = () => {
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      year: "numeric"
    };
    
    if (effectiveView === "timeGridDay") {
      options.day = "numeric";
      options.weekday = "long";
    } else if (effectiveView === "timeGridWeek") {
      options.day = "numeric";
    }
    
    return currentDate.toLocaleDateString("pt-BR", options);
  };

  const renderEventContent = (eventInfo: any) => {
    const status = eventInfo.event.extendedProps.status as keyof typeof statusColors;
    const colors = statusColors[status];
    const isMonthView = effectiveView === "dayGridMonth";
    
    // Calculate event duration in minutes for responsive display
    const start = eventInfo.event.start;
    const end = eventInfo.event.end;
    const durationMinutes = start && end ? (end.getTime() - start.getTime()) / (1000 * 60) : 30;
    
    // Determine content level based on duration
    const isCompact = durationMinutes <= 20;
    const isMedium = durationMinutes > 20 && durationMinutes <= 35;
    const isLarge = durationMinutes > 35;

    if (isMonthView) {
      return (
        <div className={cn(
          "w-full px-1.5 py-0.5 rounded text-xs font-medium truncate flex items-center gap-1",
          colors.bg,
          colors.text
        )}>
          <span className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0", colors.dot)} />
          <span className="truncate">{eventInfo.event.extendedProps.patient}</span>
        </div>
      );
    }

    // Ultra compact view for very short appointments
    if (isCompact) {
      return (
        <div className={cn(
          "w-full h-full px-1.5 py-0.5 rounded border-l-2 transition-all duration-200 hover:shadow-md cursor-pointer flex items-center gap-1.5 overflow-hidden",
          colors.bg,
          colors.border
        )}>
          <span className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0", colors.dot)} />
          <span className={cn("text-[10px] font-bold flex-shrink-0", colors.text)}>
            {eventInfo.timeText?.split(" - ")[0] || eventInfo.timeText}
          </span>
          <span className="text-[10px] font-medium text-foreground truncate">
            {eventInfo.event.extendedProps.patient?.split(" ")[0]}
          </span>
        </div>
      );
    }

    // Medium view - show time, patient name
    if (isMedium) {
      return (
        <div className={cn(
          "w-full h-full p-1 rounded-md border-l-2 transition-all duration-200 hover:shadow-md cursor-pointer overflow-hidden",
          colors.bg,
          colors.border
        )}>
          <div className="flex flex-col h-full min-w-0">
            <div className="flex items-center gap-1 min-w-0">
              <span className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0", colors.dot)} />
              <span className={cn("text-[10px] font-bold", colors.text)}>
                {eventInfo.timeText}
              </span>
            </div>
            <p className="text-[11px] font-semibold text-foreground truncate min-w-0 leading-tight mt-0.5">
              {eventInfo.event.extendedProps.patient}
            </p>
          </div>
        </div>
      );
    }

    // Full view for longer appointments
    return (
      <div className={cn(
        "w-full h-full p-1.5 sm:p-2 rounded-md sm:rounded-lg border-l-2 sm:border-l-4 transition-all duration-200 hover:shadow-md cursor-pointer overflow-hidden",
        colors.bg,
        colors.border
      )}>
        <div className="flex flex-col h-full min-w-0">
          <div className="flex items-center gap-1 sm:gap-1.5 mb-0.5 min-w-0">
            <span className={cn("w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full flex-shrink-0", colors.dot)} />
            <span className={cn("text-[10px] sm:text-xs font-bold", colors.text)}>
              {eventInfo.timeText}
            </span>
          </div>
          <p className="text-[11px] sm:text-sm font-semibold text-foreground truncate min-w-0 leading-tight">
            {eventInfo.event.extendedProps.patient}
          </p>
          <p className="text-[9px] sm:text-xs text-muted-foreground truncate min-w-0">
            {eventInfo.event.extendedProps.service}
          </p>
          {eventInfo.event.extendedProps.room && isLarge && durationMinutes >= 45 && (
            <div className="flex items-center gap-1 mt-auto pt-0.5 min-w-0">
              <MapPin className="w-2.5 h-2.5 text-muted-foreground flex-shrink-0" />
              <span className="text-[9px] text-muted-foreground truncate">
                {eventInfo.event.extendedProps.room}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="h-full flex flex-col bg-gradient-to-br from-background to-muted/10 rounded-xl border border-border/50 overflow-hidden min-h-0">
        {/* Calendar Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 p-3 sm:p-4 bg-card/50 border-b border-border/50 backdrop-blur-sm">
          {/* Navigation */}
          <div className="flex items-center gap-1 sm:gap-2 w-full sm:w-auto">
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrev}
              className="h-8 w-8 sm:h-9 sm:w-9 hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              className="h-8 w-8 sm:h-9 sm:w-9 hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleToday}
            className="h-8 sm:h-9 px-2 sm:px-3 hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all font-medium text-xs sm:text-sm"
          >
            Hoje
          </Button>
          <div className="flex-1 sm:flex-none px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 min-w-0">
            <span className="text-xs sm:text-sm font-bold text-foreground capitalize truncate block">
              {formatCurrentDate()}
            </span>
          </div>
        </div>

        {/* View Toggle - Hidden on mobile */}
        {!isMobile && (
          <div className="flex items-center gap-1 p-1 bg-muted/50 rounded-lg border border-border/50 w-full sm:w-auto justify-center sm:justify-start">
            {viewOptions.map((option) => {
              const Icon = option.icon;
              const isActive = effectiveView === option.value;
              return (
                <Button
                  key={option.value}
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleViewChange(option.value)}
                  className={cn(
                    "h-7 sm:h-8 px-2 sm:px-3 gap-1 sm:gap-1.5 transition-all flex-1 sm:flex-none",
                    isActive 
                      ? "bg-primary text-primary-foreground shadow-md" 
                      : "hover:bg-primary/10 hover:text-primary"
                  )}
                >
                  <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span className="text-[10px] sm:text-xs font-medium">{option.label}</span>
                </Button>
              );
            })}
          </div>
        )}
        
        {/* Mobile indicator */}
        {isMobile && (
          <div className="flex items-center gap-1.5 px-2 py-1 bg-primary/10 rounded-lg border border-primary/20">
            <List className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-medium text-primary">Dia</span>
          </div>
        )}
      </div>

      {/* Calendar Container */}
      <div className="flex-1 p-2 sm:p-4 overflow-hidden min-h-0">
        <div className="h-full bg-card rounded-xl border border-border/50 shadow-sm overflow-hidden calendar-container">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView={effectiveView}
            headerToolbar={false}
            locale="pt-br"
            events={events}
            eventContent={renderEventContent}
            eventClick={handleEventClick}
            selectable={true}
            select={handleDateSelect}
            editable={true}
            eventDrop={handleEventDrop}
            slotMinTime="07:00:00"
            slotMaxTime="21:00:00"
            slotDuration="00:30:00"
            slotLabelInterval="01:00:00"
            slotLabelFormat={{
              hour: "2-digit",
              minute: "2-digit",
              hour12: false
            }}
            allDaySlot={false}
            dayMaxEvents={3}
            nowIndicator={true}
            height="100%"
            dayHeaderFormat={isMobile ? { weekday: "short" } : { weekday: "short", day: "numeric" }}
            eventTimeFormat={{
              hour: "2-digit",
              minute: "2-digit",
              hour12: false
            }}
            />
          </div>
        </div>
      </div>

      {/* Appointment Detail Modal */}
      <AppointmentCard 
        open={appointmentModalOpen} 
        onOpenChange={setAppointmentModalOpen}
        mode={appointmentMode}
        initialData={appointmentMode === "create" ? newAppointmentData || undefined : undefined}
      />
    </>
  );
};
