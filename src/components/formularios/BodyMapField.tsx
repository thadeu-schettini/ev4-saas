import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Ruler, MessageSquare, Check } from "lucide-react";
import bodyFrontImage from "@/assets/body-front.png";
import bodyBackImage from "@/assets/body-back.png";

type ViewType = "front" | "back";

interface MeasurementPoint {
  id: string;
  label: string;
  position: { front?: { x: number; y: number }; back?: { x: number; y: number } };
  cardSide: "left" | "right";
}

// Measurement points connected to the body silhouette (percentages for positioning)
const measurementPoints: MeasurementPoint[] = [
  { id: "braco", label: "Braço", position: { front: { x: 18, y: 32 }, back: { x: 18, y: 32 } }, cardSide: "left" },
  { id: "peito", label: "Peito", position: { front: { x: 58, y: 28 } }, cardSide: "right" },
  { id: "costas", label: "Costas Superior", position: { back: { x: 58, y: 28 } }, cardSide: "right" },
  { id: "cintura", label: "Cintura", position: { front: { x: 22, y: 46 }, back: { x: 22, y: 46 } }, cardSide: "left" },
  { id: "coxa", label: "Coxa", position: { front: { x: 62, y: 58 }, back: { x: 62, y: 58 } }, cardSide: "right" },
  { id: "quadril", label: "Quadril", position: { front: { x: 25, y: 54 }, back: { x: 25, y: 54 } }, cardSide: "left" },
  { id: "panturrilha", label: "Panturrilha", position: { front: { x: 58, y: 78 }, back: { x: 58, y: 78 } }, cardSide: "right" },
];

interface RegionData {
  measurements: Record<string, string>;
  notes: string;
}

interface BodyMapFieldProps {
  value: Record<string, RegionData>;
  onChange: (value: Record<string, RegionData>) => void;
  measurementMode?: string[];
  readOnly?: boolean;
}

export function BodyMapField({
  value = {},
  onChange,
  readOnly = false,
}: BodyMapFieldProps) {
  const [view, setView] = useState<ViewType>("front");
  const [activeField, setActiveField] = useState<string | null>(null);

  const visiblePoints = measurementPoints.filter(
    (p) => p.position[view] !== undefined
  );

  const updateMeasurement = (pointId: string, fieldType: string, fieldValue: string) => {
    const current = value[pointId] || { measurements: {}, notes: "" };
    const newValue = {
      ...value,
      [pointId]: {
        ...current,
        measurements: {
          ...current.measurements,
          [fieldType]: fieldValue,
        },
      },
    };
    onChange(newValue);
  };

  const updateNotes = (pointId: string, notes: string) => {
    const current = value[pointId] || { measurements: {}, notes: "" };
    const newValue = {
      ...value,
      [pointId]: {
        ...current,
        notes,
      },
    };
    onChange(newValue);
  };

  const hasData = (pointId: string): boolean => {
    const data = value[pointId];
    if (!data) return false;
    return Object.values(data.measurements).some(v => v) || Boolean(data.notes);
  };

  const leftPoints = visiblePoints.filter((p) => p.cardSide === "left");
  const rightPoints = visiblePoints.filter((p) => p.cardSide === "right");

  const filledCount = Object.keys(value).filter(k => hasData(k)).length;

  return (
    <div className="space-y-6">
      {/* View Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-xs font-medium px-3 py-1">
            <Ruler className="w-3 h-3 mr-1.5" />
            Avaliação Corporal
          </Badge>
          {filledCount > 0 && (
            <Badge variant="secondary" className="text-xs">
              {filledCount} medidas
            </Badge>
          )}
        </div>
        
        <div className="inline-flex p-1 bg-muted/50 rounded-xl border border-border/50">
          <Button
            variant={view === "front" ? "default" : "ghost"}
            size="sm"
            onClick={() => setView("front")}
            className="rounded-lg text-xs h-8 px-4"
          >
            Frontal
          </Button>
          <Button
            variant={view === "back" ? "default" : "ghost"}
            size="sm"
            onClick={() => setView("back")}
            className="rounded-lg text-xs h-8 px-4"
          >
            Posterior
          </Button>
        </div>
      </div>

      {/* Main Body Map Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-4 lg:gap-6 items-start">
        {/* Left Measurement Cards */}
        <div className="flex flex-col gap-3 order-2 lg:order-1">
          {leftPoints.map((point) => (
            <MeasurementCard
              key={point.id}
              point={point}
              data={value[point.id]}
              isActive={activeField === point.id}
              hasData={hasData(point.id)}
              readOnly={readOnly}
              onFocus={() => setActiveField(point.id)}
              onBlur={() => setActiveField(null)}
              onMeasurementChange={(field, val) => updateMeasurement(point.id, field, val)}
              onNotesChange={(notes) => updateNotes(point.id, notes)}
              side="left"
            />
          ))}
        </div>

        {/* Center: Body Image with Connection Lines */}
        <div className="relative flex justify-center order-1 lg:order-2">
          <div className="relative w-full max-w-[200px] sm:max-w-[240px]">
            {/* Real body image */}
            <img 
              src={view === "front" ? bodyFrontImage : bodyBackImage}
              alt={view === "front" ? "Corpo Frontal" : "Corpo Posterior"}
              className="w-full h-auto select-none pointer-events-none drop-shadow-lg"
            />
            
            {/* Connection dots and lines overlay */}
            <svg 
              viewBox="0 0 100 200" 
              className="absolute inset-0 w-full h-full"
              style={{ pointerEvents: 'none' }}
            >
              {visiblePoints.map((point) => {
                const pos = point.position[view];
                if (!pos) return null;
                const pointHasData = hasData(point.id);
                const isActive = activeField === point.id;
                
                return (
                  <g key={point.id}>
                    {/* Connection line */}
                    <line
                      x1={pos.x}
                      y1={pos.y}
                      x2={point.cardSide === "left" ? 0 : 100}
                      y2={pos.y}
                      stroke={pointHasData ? "hsl(var(--primary))" : "hsl(var(--destructive))"}
                      strokeWidth="0.8"
                      strokeDasharray={pointHasData ? "none" : "2,1.5"}
                      opacity={isActive ? 0.9 : 0.5}
                      className="transition-all duration-300"
                    />
                    
                    {/* Pulsing ring for active */}
                    {isActive && (
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r="4"
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth="0.8"
                        opacity="0.6"
                        className="animate-ping"
                      />
                    )}
                    
                    {/* Main dot */}
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r="2.5"
                      fill={pointHasData ? "hsl(var(--primary))" : "hsl(var(--destructive))"}
                      stroke="white"
                      strokeWidth="1"
                      className="transition-all duration-300"
                    />
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Right Measurement Cards */}
        <div className="flex flex-col gap-3 order-3">
          {rightPoints.map((point) => (
            <MeasurementCard
              key={point.id}
              point={point}
              data={value[point.id]}
              isActive={activeField === point.id}
              hasData={hasData(point.id)}
              readOnly={readOnly}
              onFocus={() => setActiveField(point.id)}
              onBlur={() => setActiveField(null)}
              onMeasurementChange={(field, val) => updateMeasurement(point.id, field, val)}
              onNotesChange={(notes) => updateNotes(point.id, notes)}
              side="right"
            />
          ))}
        </div>
      </div>

      {/* Weight and Annotations Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-card border border-border/50 shadow-sm">
          <Label className="text-xs font-semibold text-primary mb-3 flex items-center gap-2">
            <Ruler className="w-4 h-4" />
            PESO
          </Label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-[10px] text-muted-foreground mb-1 block">Atual (kg)</Label>
              <Input
                type="number"
                placeholder="0.0"
                value={value["peso"]?.measurements?.atual || ""}
                onChange={(e) => updateMeasurement("peso", "atual", e.target.value)}
                className="h-9 text-sm border-border/50"
                disabled={readOnly === true}
              />
            </div>
            <div>
              <Label className="text-[10px] text-muted-foreground mb-1 block">Meta (kg)</Label>
              <Input
                type="number"
                placeholder="0.0"
                value={value["peso"]?.measurements?.meta || ""}
                onChange={(e) => updateMeasurement("peso", "meta", e.target.value)}
                className="h-9 text-sm border-border/50"
                disabled={readOnly === true}
              />
            </div>
          </div>
        </div>
        
        <div className="p-4 rounded-xl bg-card border border-border/50 shadow-sm">
          <Label className="text-xs font-semibold text-primary mb-3 flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            ANOTAÇÕES
          </Label>
          <Textarea
            placeholder="Observações gerais da avaliação..."
            value={value["anotacoes"]?.notes || ""}
            onChange={(e) => updateNotes("anotacoes", e.target.value)}
            rows={2}
            className="text-sm resize-none border-border/50"
            disabled={readOnly}
          />
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card border border-border/50">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-xs font-medium text-muted-foreground">Com Medida</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card border border-border/50">
          <div className="w-3 h-3 rounded-full bg-destructive" />
          <span className="text-xs font-medium text-muted-foreground">Pendente</span>
        </div>
      </div>
    </div>
  );
}

// Measurement Card Component
interface MeasurementCardProps {
  point: { id: string; label: string };
  data?: RegionData;
  isActive: boolean;
  hasData: boolean;
  readOnly: boolean;
  onFocus: () => void;
  onBlur: () => void;
  onMeasurementChange: (field: string, value: string) => void;
  onNotesChange: (notes: string) => void;
  side: "left" | "right";
}

function MeasurementCard({
  point,
  data,
  isActive,
  hasData,
  readOnly,
  onFocus,
  onBlur,
  onMeasurementChange,
  onNotesChange,
  side,
}: MeasurementCardProps) {
  return (
    <div
      className={cn(
        "p-3 rounded-xl border-2 transition-all duration-300",
        "bg-card shadow-sm",
        isActive 
          ? "border-primary shadow-md scale-[1.02]" 
          : hasData 
            ? "border-primary/30" 
            : "border-destructive/30 border-dashed",
        side === "left" ? "lg:ml-auto" : "lg:mr-auto",
        "w-full lg:max-w-[200px]"
      )}
    >
      <div className="flex items-center gap-2 mb-2">
        <div
          className={cn(
            "w-2 h-2 rounded-full transition-colors",
            hasData ? "bg-primary" : "bg-destructive"
          )}
        />
        <Label className="text-xs font-semibold text-foreground uppercase tracking-wide">
          {point.label}
        </Label>
        {hasData && (
          <Check className="w-3 h-3 text-primary ml-auto" />
        )}
      </div>
      
      <div className="space-y-2">
        <div>
          <Label className="text-[10px] text-muted-foreground mb-1 block">Circunferência (cm)</Label>
          <Input
            type="number"
            placeholder="0.0"
            value={data?.measurements?.circumference || ""}
            onChange={(e) => onMeasurementChange("circumference", e.target.value)}
            onFocus={onFocus}
            onBlur={onBlur}
            className="h-8 text-sm border-border/50 focus:border-primary"
            disabled={readOnly}
          />
        </div>
        
        <div>
          <Label className="text-[10px] text-muted-foreground mb-1 block">Observação</Label>
          <Input
            placeholder="Nota..."
            value={data?.notes || ""}
            onChange={(e) => onNotesChange(e.target.value)}
            onFocus={onFocus}
            onBlur={onBlur}
            className="h-8 text-sm border-border/50 focus:border-primary"
            disabled={readOnly}
          />
        </div>
      </div>
    </div>
  );
}
