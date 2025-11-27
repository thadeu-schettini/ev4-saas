import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Clock, User, Stethoscope, DollarSign, CheckCircle2, GripVertical, Phone, Mail, MapPin, AlertCircle } from "lucide-react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { toast } from "sonner";

interface KanbanViewProps {
  searchQuery: string;
}

interface Appointment {
  id: number;
  patientName: string;
  initials: string;
  time: string;
  professional: string;
  service: string;
  status: string;
  price: string;
  phone?: string;
  email?: string;
  address?: string;
  waitingMinutes: number;
}

const initialAppointments: Appointment[] = [
  {
    id: 1,
    patientName: "Maria Silva",
    initials: "MS",
    time: "09:30",
    professional: "Dr. João Santos",
    service: "Consulta Cardiologia",
    status: "waiting_confirmation",
    price: "R$ 200,00",
    phone: "(11) 98765-4321",
    email: "maria.silva@email.com",
    address: "Rua das Flores, 123 - Centro",
    waitingMinutes: 45
  },
  {
    id: 2,
    patientName: "Paciente 35 Glover",
    initials: "PG",
    time: "08:50",
    professional: "Dr(a). Rollin Durgan",
    service: "Consulta Cardiologia",
    status: "in_service",
    price: "R$ 180,00",
    phone: "(11) 91234-5678",
    email: "glover@email.com",
    waitingMinutes: 120
  },
  {
    id: 3,
    patientName: "Paciente 7 Cruickshank",
    initials: "PC",
    time: "12:05",
    professional: "Dr(a). Cleta Bogisich",
    service: "Consulta Dermatologia",
    status: "completed",
    price: "R$ 210,00",
    phone: "(11) 99876-5432",
    waitingMinutes: 5
  },
  {
    id: 4,
    patientName: "Carlos Oliveira",
    initials: "CO",
    time: "10:00",
    professional: "Dra. Ana Costa",
    service: "Consulta Dermatologia",
    status: "waiting_confirmation",
    price: "R$ 150,00",
    phone: "(11) 97654-3210",
    email: "carlos@email.com",
    address: "Av. Paulista, 1000",
    waitingMinutes: 15
  }
];

const columns = [
  {
    id: "waiting_confirmation",
    title: "Aguardando Confirmação",
    color: "bg-warning/10",
    borderColor: "border-warning/50",
    badgeColor: "bg-warning/20 text-warning"
  },
  {
    id: "confirmed",
    title: "Confirmado",
    color: "bg-primary/10",
    borderColor: "border-primary/50",
    badgeColor: "bg-primary/20 text-primary"
  },
  {
    id: "in_service",
    title: "Em Atendimento",
    color: "bg-accent/10",
    borderColor: "border-accent/50",
    badgeColor: "bg-accent/20 text-accent"
  },
  {
    id: "completed",
    title: "Finalizado",
    color: "bg-success/10",
    borderColor: "border-success/50",
    badgeColor: "bg-success/20 text-success"
  }
];

const getWaitingTimeColor = (minutes: number) => {
  if (minutes >= 60) return "bg-red-500/20 text-red-700 dark:text-red-400 border-red-500/30";
  if (minutes >= 30) return "bg-orange-500/20 text-orange-700 dark:text-orange-400 border-orange-500/30";
  return "bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/30";
};

const getWaitingTimeLabel = (minutes: number) => {
  if (minutes >= 60) return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
  return `${minutes}m`;
};

const SortableAppointmentCard = ({ apt }: { apt: Appointment }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: apt.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative bg-background/90 backdrop-blur-sm rounded-lg border border-border/50 hover:border-primary/30 transition-all duration-300 overflow-hidden ${
        isDragging ? "cursor-grabbing shadow-2xl scale-105 z-50" : ""
      } hover:shadow-lg`}
    >
      {/* Header com Drag Handle e Tempo */}
      <div className="flex items-center justify-between px-3 py-2 bg-muted/30 border-b border-border/30">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing hover:text-primary transition-colors p-0.5 rounded hover:bg-primary/10"
        >
          <GripVertical className="h-3.5 w-3.5 text-muted-foreground" />
        </div>
        <Badge className={`text-[10px] px-2 py-0.5 ${getWaitingTimeColor(apt.waitingMinutes)}`}>
          <Clock className="h-2.5 w-2.5 mr-1" />
          {getWaitingTimeLabel(apt.waitingMinutes)}
        </Badge>
      </div>

      {/* Content Principal */}
      <div className="p-3 space-y-3">
        {/* Paciente Info */}
        <div className="flex items-center gap-2">
          <Avatar className="h-9 w-9 border-2 border-primary/20 flex-shrink-0 group-hover:scale-105 transition-transform">
            <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs">
              {apt.initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors leading-tight">
              {apt.patientName}
            </h4>
            <p className="text-[10px] text-muted-foreground truncate leading-tight mt-0.5">
              {apt.service}
            </p>
          </div>
        </div>

        {/* Informações Básicas */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs">
            <div className="flex items-center justify-center w-5 h-5 rounded bg-primary/10 flex-shrink-0">
              <Clock className="h-3 w-3 text-primary" />
            </div>
            <span className="text-muted-foreground text-[11px]">{apt.time}</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="flex items-center justify-center w-5 h-5 rounded bg-accent/10 flex-shrink-0">
              <Stethoscope className="h-3 w-3 text-accent" />
            </div>
            <span className="text-muted-foreground truncate text-[11px]">{apt.professional}</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="flex items-center justify-center w-5 h-5 rounded bg-success/10 flex-shrink-0">
              <DollarSign className="h-3 w-3 text-success" />
            </div>
            <span className="text-muted-foreground text-[11px]">{apt.price}</span>
          </div>
        </div>

        {/* Detalhes Extras - Visíveis apenas no hover */}
        <div className="space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300 max-h-0 group-hover:max-h-40 overflow-hidden">
          <div className="pt-2 border-t border-border/30">
            {apt.phone && (
              <div className="flex items-center gap-2 text-xs mb-1.5">
                <Phone className="h-3 w-3 text-blue-500 flex-shrink-0" />
                <span className="text-muted-foreground text-[11px]">{apt.phone}</span>
              </div>
            )}
            {apt.email && (
              <div className="flex items-center gap-2 text-xs mb-1.5">
                <Mail className="h-3 w-3 text-purple-500 flex-shrink-0" />
                <span className="text-muted-foreground truncate text-[11px]">{apt.email}</span>
              </div>
            )}
            {apt.address && (
              <div className="flex items-center gap-2 text-xs">
                <MapPin className="h-3 w-3 text-red-500 flex-shrink-0" />
                <span className="text-muted-foreground truncate text-[11px]">{apt.address}</span>
              </div>
            )}
          </div>
        </div>

        {/* Alerta de Tempo Crítico */}
        {apt.waitingMinutes >= 60 && (
          <div className="p-2 rounded-md bg-red-500/10 border border-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-3.5 w-3.5 text-red-500 flex-shrink-0" />
              <span className="text-[10px] text-red-700 dark:text-red-400 font-medium">
                Tempo de espera crítico!
              </span>
            </div>
          </div>
        )}

        {/* Botão de Ação */}
        <Button
          size="sm"
          variant="outline"
          className="w-full h-8 text-xs hover:bg-primary/5 hover:text-primary hover:border-primary/30"
        >
          <User className="h-3.5 w-3.5 mr-1.5" />
          Ver Detalhes
        </Button>
      </div>
    </div>
  );
};

const AppointmentCard = ({ apt }: { apt: Appointment }) => (
  <div className="p-4 bg-background/80 backdrop-blur-sm rounded-lg border-2 border-primary shadow-lg">
    <div className="flex items-start gap-3 mb-3">
      <Avatar className="h-10 w-10 border-2 border-primary/20">
        <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
          {apt.initials}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-foreground truncate">{apt.patientName}</h4>
        <p className="text-xs text-muted-foreground truncate">{apt.service}</p>
      </div>
    </div>

    <div className="space-y-2 mb-3">
      <div className="flex items-center gap-2 text-xs">
        <Clock className="h-3.5 w-3.5 text-primary flex-shrink-0" />
        <span className="text-muted-foreground">{apt.time}</span>
      </div>
      <div className="flex items-center gap-2 text-xs">
        <Stethoscope className="h-3.5 w-3.5 text-accent flex-shrink-0" />
        <span className="text-muted-foreground truncate">{apt.professional}</span>
      </div>
      <div className="flex items-center gap-2 text-xs">
        <DollarSign className="h-3.5 w-3.5 text-success flex-shrink-0" />
        <span className="text-muted-foreground">{apt.price}</span>
      </div>
    </div>
  </div>
);

export const KanbanView = ({ searchQuery }: KanbanViewProps) => {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [activeId, setActiveId] = useState<number | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const filteredAppointments = appointments.filter(apt =>
    searchQuery === "" ||
    apt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    apt.professional.toLowerCase().includes(searchQuery.toLowerCase()) ||
    apt.service.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as number);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id as number;
    const overId = over.id as string | number;

    // Check if dragging over a column
    if (typeof overId === "string" && columns.find(col => col.id === overId)) {
      const activeAppointment = appointments.find(apt => apt.id === activeId);
      if (activeAppointment && activeAppointment.status !== overId) {
        setAppointments(appointments.map(apt =>
          apt.id === activeId ? { ...apt, status: overId } : apt
        ));
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      setActiveId(null);
      return;
    }

    const activeId = active.id as number;
    const overId = over.id as string | number;

    // Get the appointment
    const activeAppointment = appointments.find(apt => apt.id === activeId);
    
    if (!activeAppointment) {
      setActiveId(null);
      return;
    }

    // Check if dropping over a column
    if (typeof overId === "string" && columns.find(col => col.id === overId)) {
      const newStatus = overId;
      const oldStatus = activeAppointment.status;
      
      if (oldStatus !== newStatus) {
        setAppointments(appointments.map(apt =>
          apt.id === activeId ? { ...apt, status: newStatus } : apt
        ));

        const columnName = columns.find(col => col.id === newStatus)?.title;
        toast.success("Status atualizado!", {
          description: `Agendamento movido para "${columnName}"`,
        });
      }
    } else if (typeof overId === "number") {
      // Dragging over another card - reorder within column
      const overAppointment = appointments.find(apt => apt.id === overId);
      
      if (overAppointment && activeAppointment.status === overAppointment.status) {
        const oldIndex = appointments.findIndex(apt => apt.id === activeId);
        const newIndex = appointments.findIndex(apt => apt.id === overId);
        
        setAppointments(arrayMove(appointments, oldIndex, newIndex));
      }
    }

    setActiveId(null);
  };

  const activeAppointment = activeId ? appointments.find(apt => apt.id === activeId) : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="animate-fade-in [animation-delay:200ms]">
        {/* Grid responsivo: 1 coluna em mobile, 2 em tablet, 4 em desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {columns.map((column, columnIndex) => {
            const columnAppointments = filteredAppointments.filter(
              apt => apt.status === column.id
            );

            return (
              <div
                key={column.id}
                className={`p-3 sm:p-4 rounded-xl border-2 ${column.borderColor} ${column.color} min-h-[300px] sm:min-h-[400px] animate-fade-in transition-all`}
                style={{ animationDelay: `${columnIndex * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-3 sm:mb-4 pb-2 sm:pb-3 border-b border-border/50">
                  <h3 className="text-xs sm:text-sm font-semibold text-foreground truncate pr-2">
                    {column.title}
                  </h3>
                  <Badge variant="secondary" className={`${column.badgeColor} text-xs flex-shrink-0`}>
                    {columnAppointments.length}
                  </Badge>
                </div>

                <SortableContext
                  items={[...columnAppointments.map(apt => apt.id), column.id]}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-2 sm:space-y-3 min-h-[200px] sm:min-h-[300px]">
                    {columnAppointments.map((apt, index) => (
                      <div
                        key={apt.id}
                        className="animate-fade-in"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <SortableAppointmentCard apt={apt} />
                      </div>
                    ))}

                    {columnAppointments.length === 0 && (
                      <div className="text-center py-6 sm:py-8">
                        <CheckCircle2 className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground/30 mx-auto mb-2" />
                        <p className="text-[10px] sm:text-xs text-muted-foreground">
                          {window.innerWidth < 640 ? "Sem agendamentos" : "Arraste cards aqui"}
                        </p>
                      </div>
                    )}
                    
                    {/* Invisible droppable area for the column */}
                    <div
                      data-droppable-id={column.id}
                      className="h-full min-h-[50px]"
                    />
                  </div>
                </SortableContext>
              </div>
            );
          })}
        </div>
      </div>

      <DragOverlay>
        {activeAppointment ? (
          <AppointmentCard apt={activeAppointment} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};
