import { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventClickArg, DateSelectArg, EventDropArg } from "@fullcalendar/core";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight,
  LayoutGrid,
  List,
  CalendarDays,
  Plus,
  User,
  Clock,
  MapPin
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

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
  // Tomorrow
  {
    id: "7",
    title: "Consulta - Fernanda Lima",
    start: new Date(new Date().setDate(new Date().getDate() + 1)),
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
  const [currentView, setCurrentView] = useState<ViewType>("timeGridWeek");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events] = useState<CalendarEvent[]>(mockEvents);

  const viewOptions = [
    { value: "timeGridDay" as ViewType, label: "Dia", icon: List },
    { value: "timeGridWeek" as ViewType, label: "Semana", icon: CalendarDays },
    { value: "dayGridMonth" as ViewType, label: "Mês", icon: LayoutGrid },
  ];

  const handleViewChange = (view: ViewType) => {
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
    const props = event.extendedProps;
    toast.info(
      <div className="space-y-1">
        <p className="font-semibold">{props.patient}</p>
        <p className="text-sm text-muted-foreground">{props.service}</p>
        <p className="text-xs text-muted-foreground">{props.professional}</p>
      </div>,
      { duration: 3000 }
    );
  };

  const handleDateSelect = (info: DateSelectArg) => {
    toast.success("Novo agendamento", {
      description: `Criar agendamento para ${info.start.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}`
    });
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
    
    if (currentView === "timeGridDay") {
      options.day = "numeric";
      options.weekday = "long";
    } else if (currentView === "timeGridWeek") {
      options.day = "numeric";
    }
    
    return currentDate.toLocaleDateString("pt-BR", options);
  };

  const renderEventContent = (eventInfo: any) => {
    const status = eventInfo.event.extendedProps.status as keyof typeof statusColors;
    const colors = statusColors[status];
    const isMonthView = currentView === "dayGridMonth";

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

    return (
      <div className={cn(
        "w-full h-full p-2 rounded-lg border-l-4 overflow-hidden transition-all duration-200 hover:shadow-md cursor-pointer",
        colors.bg,
        colors.border
      )}>
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-1.5 mb-1">
            <span className={cn("w-2 h-2 rounded-full flex-shrink-0", colors.dot)} />
            <span className={cn("text-xs font-bold truncate", colors.text)}>
              {eventInfo.timeText}
            </span>
          </div>
          <p className="text-sm font-semibold text-foreground truncate">
            {eventInfo.event.extendedProps.patient}
          </p>
          <p className="text-xs text-muted-foreground truncate">
            {eventInfo.event.extendedProps.service}
          </p>
          {eventInfo.event.extendedProps.room && (
            <div className="flex items-center gap-1 mt-auto pt-1">
              <MapPin className="w-3 h-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {eventInfo.event.extendedProps.room}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-background to-muted/10">
      {/* Calendar Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 bg-card/50 border-b border-border/50 backdrop-blur-sm">
        {/* Navigation */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrev}
            className="h-9 w-9 hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            className="h-9 w-9 hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleToday}
            className="h-9 px-3 hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all font-medium"
          >
            Hoje
          </Button>
          <div className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
            <span className="text-sm font-bold text-foreground capitalize">
              {formatCurrentDate()}
            </span>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 p-1 bg-muted/50 rounded-lg border border-border/50">
          {viewOptions.map((option) => {
            const Icon = option.icon;
            const isActive = currentView === option.value;
            return (
              <Button
                key={option.value}
                variant={isActive ? "default" : "ghost"}
                size="sm"
                onClick={() => handleViewChange(option.value)}
                className={cn(
                  "h-8 px-3 gap-1.5 transition-all",
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-md" 
                    : "hover:bg-primary/10 hover:text-primary"
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline text-xs font-medium">{option.label}</span>
              </Button>
            );
          })}
        </div>

        {/* New Appointment */}
        <Button
          size="sm"
          className="h-9 gap-2 bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 shadow-md"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Novo Agendamento</span>
        </Button>
      </div>

      {/* Calendar Container */}
      <div className="flex-1 p-4 overflow-auto">
        <div className="h-full min-h-[500px] bg-card rounded-xl border border-border/50 shadow-sm overflow-hidden calendar-container">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView={currentView}
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
            dayHeaderFormat={{ weekday: "short", day: "numeric" }}
            eventTimeFormat={{
              hour: "2-digit",
              minute: "2-digit",
              hour12: false
            }}
          />
        </div>
      </div>
    </div>
  );
};
