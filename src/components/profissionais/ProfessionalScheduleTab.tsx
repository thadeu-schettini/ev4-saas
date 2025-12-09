import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Calendar, Clock, Edit, Save, X, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Professional {
  name: string;
  nextAvailable: string;
}

interface ScheduleDay {
  day: string;
  hours: string;
  slots: number;
  enabled: boolean;
}

interface ProfessionalScheduleTabProps {
  professional: Professional;
}

export const ProfessionalScheduleTab = ({ professional }: ProfessionalScheduleTabProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [schedule, setSchedule] = useState<ScheduleDay[]>([
    { day: "Segunda-feira", hours: "08:00 - 17:00", slots: 18, enabled: true },
    { day: "Terça-feira", hours: "08:00 - 17:00", slots: 18, enabled: true },
    { day: "Quarta-feira", hours: "08:00 - 12:00", slots: 8, enabled: true },
    { day: "Quinta-feira", hours: "08:00 - 17:00", slots: 18, enabled: true },
    { day: "Sexta-feira", hours: "08:00 - 15:00", slots: 14, enabled: true },
    { day: "Sábado", hours: "08:00 - 12:00", slots: 8, enabled: false },
  ]);

  const [todayAppointments] = useState([
    { time: "08:00", patient: "João Silva", type: "Consulta" },
    { time: "08:30", patient: "Maria Santos", type: "Retorno" },
    { time: "09:00", patient: "Pedro Costa", type: "Consulta" },
    { time: "10:00", patient: "Ana Oliveira", type: "Consulta" },
    { time: "11:00", patient: "Carlos Mendes", type: "Retorno" },
  ]);

  const handleSave = () => {
    setIsEditing(false);
    toast.success("Horários atualizados com sucesso!");
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const updateScheduleDay = (index: number, field: keyof ScheduleDay, value: any) => {
    setSchedule(prev => prev.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    ));
  };

  return (
    <div className="space-y-4">
      <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            Horários de Trabalho
          </h3>
          {!isEditing ? (
            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancelar
              </Button>
              <Button size="sm" onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Salvar
              </Button>
            </div>
          )}
        </div>
        
        <div className="space-y-3">
          {schedule.map((item, index) => (
            <div 
              key={item.day} 
              className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                item.enabled 
                  ? "bg-muted/30 hover:bg-muted/50" 
                  : "bg-muted/10 opacity-60"
              }`}
            >
              {isEditing ? (
                <>
                  <div className="flex items-center gap-3 flex-1">
                    <Switch
                      checked={item.enabled}
                      onCheckedChange={(checked) => updateScheduleDay(index, 'enabled', checked)}
                    />
                    <div className="min-w-[120px]">
                      <p className="font-medium text-sm">{item.day}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input
                        type="time"
                        defaultValue={item.hours.split(" - ")[0]}
                        className="w-24 h-8"
                        onChange={(e) => {
                          const [_, end] = item.hours.split(" - ");
                          updateScheduleDay(index, 'hours', `${e.target.value} - ${end}`);
                        }}
                      />
                      <span className="text-muted-foreground">-</span>
                      <Input
                        type="time"
                        defaultValue={item.hours.split(" - ")[1]}
                        className="w-24 h-8"
                        onChange={(e) => {
                          const [start] = item.hours.split(" - ");
                          updateScheduleDay(index, 'hours', `${start} - ${e.target.value}`);
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label className="text-xs text-muted-foreground">Vagas:</Label>
                    <Input
                      type="number"
                      value={item.slots}
                      onChange={(e) => updateScheduleDay(index, 'slots', Number(e.target.value))}
                      className="w-16 h-8"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <p className="font-medium text-sm">{item.day}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.hours}</p>
                  </div>
                  <Badge variant="outline" className={`${
                    item.enabled 
                      ? "bg-primary/10 text-primary border-primary/20" 
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {item.enabled ? `${item.slots} vagas` : "Fechado"}
                  </Badge>
                </>
              )}
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Clock className="h-4 w-4 text-primary" />
          Agenda de Hoje
        </h3>
        <div className="space-y-2">
          {todayAppointments.map((apt, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary font-semibold text-sm">
                  {apt.time}
                </div>
                <div>
                  <p className="font-medium text-sm">{apt.patient}</p>
                  <p className="text-xs text-muted-foreground">{apt.type}</p>
                </div>
              </div>
              <Badge variant="secondary" className="text-xs">
                Confirmado
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-4 border-border/50 bg-primary/5 border-primary/20">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-primary/10">
            <Clock className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium">Próxima Disponibilidade</p>
            <p className="text-lg font-bold text-primary">{professional.nextAvailable}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
