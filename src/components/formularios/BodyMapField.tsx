import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Ruler, MessageSquare, Check } from "lucide-react";

type ViewType = "front" | "back";

interface MeasurementPoint {
  id: string;
  label: string;
  position: { front?: { x: number; y: number }; back?: { x: number; y: number } };
  cardSide: "left" | "right";
  cardPosition: number;
}

// Measurement points connected to the body silhouette
const measurementPoints: MeasurementPoint[] = [
  { id: "braco", label: "Braço", position: { front: { x: 24, y: 34 }, back: { x: 24, y: 34 } }, cardSide: "left", cardPosition: 0 },
  { id: "peito", label: "Peito", position: { front: { x: 52, y: 30 } }, cardSide: "right", cardPosition: 0 },
  { id: "costas", label: "Costas Superior", position: { back: { x: 52, y: 30 } }, cardSide: "right", cardPosition: 0 },
  { id: "cintura", label: "Cintura", position: { front: { x: 32, y: 48 }, back: { x: 32, y: 48 } }, cardSide: "left", cardPosition: 1 },
  { id: "coxa", label: "Coxa", position: { front: { x: 60, y: 58 }, back: { x: 60, y: 58 } }, cardSide: "right", cardPosition: 1 },
  { id: "quadril", label: "Quadril", position: { front: { x: 28, y: 58 }, back: { x: 28, y: 58 } }, cardSide: "left", cardPosition: 2 },
  { id: "panturrilha", label: "Panturrilha", position: { front: { x: 58, y: 78 }, back: { x: 58, y: 78 } }, cardSide: "right", cardPosition: 2 },
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

// Elegant human silhouette
const HumanSilhouette = ({ view }: { view: ViewType }) => (
  <g>
    <defs>
      <linearGradient id="silhouetteGradient" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
        <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
      </linearGradient>
      <filter id="silhouetteShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="hsl(var(--primary))" floodOpacity="0.15"/>
      </filter>
    </defs>
    
    {/* Main body silhouette */}
    <g fill="url(#silhouetteGradient)" stroke="hsl(var(--primary))" strokeWidth="0.5" filter="url(#silhouetteShadow)">
      {/* Head */}
      <ellipse cx="50" cy="10" rx="7" ry="8" />
      
      {/* Neck */}
      <path d="M46,17 L46,22 Q50,23 54,22 L54,17" />
      
      {/* Torso */}
      <path d="M35,22 Q28,25 26,30 L24,42 Q22,52 26,58 L30,64 Q35,70 50,72 Q65,70 70,64 L74,58 Q78,52 76,42 L74,30 Q72,25 65,22 Z" />
      
      {/* Left Arm */}
      <path d="M28,25 Q22,26 20,32 L16,48 Q14,56 12,62 Q10,68 12,70 Q14,72 18,68 L22,58 Q24,50 26,42 L28,34" />
      
      {/* Right Arm */}
      <path d="M72,25 Q78,26 80,32 L84,48 Q86,56 88,62 Q90,68 88,70 Q86,72 82,68 L78,58 Q76,50 74,42 L72,34" />
      
      {/* Left Leg */}
      <path d="M40,70 Q36,72 36,78 L34,88 Q33,92 34,96 L36,104 Q38,108 42,108 L46,108 Q50,107 50,104 L50,94 Q51,86 50,80 L48,74 Q47,71 44,70" />
      
      {/* Right Leg */}
      <path d="M60,70 Q64,72 64,78 L66,88 Q67,92 66,96 L64,104 Q62,108 58,108 L54,108 Q50,107 50,104 L50,94 Q49,86 50,80 L52,74 Q53,71 56,70" />
    </g>
    
    {/* Anatomical details */}
    <g stroke="hsl(var(--primary))" strokeWidth="0.3" fill="none" opacity="0.4">
      {view === "front" ? (
        <>
          {/* Eyes hint */}
          <ellipse cx="47" cy="9" rx="1.2" ry="0.8" />
          <ellipse cx="53" cy="9" rx="1.2" ry="0.8" />
          {/* Chest line */}
          <path d="M42,28 Q50,32 58,28" />
          {/* Abs hint */}
          <line x1="50" y1="36" x2="50" y2="58" />
          <path d="M44,42 Q50,44 56,42" opacity="0.3" />
          <path d="M44,50 Q50,52 56,50" opacity="0.3" />
        </>
      ) : (
        <>
          {/* Spine */}
          <line x1="50" y1="24" x2="50" y2="65" strokeDasharray="2,2" />
          {/* Shoulder blades */}
          <ellipse cx="42" cy="32" rx="6" ry="4" />
          <ellipse cx="58" cy="32" rx="6" ry="4" />
        </>
      )}
    </g>
  </g>
);

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

        {/* Center: Body Silhouette with Connection Lines */}
        <div className="relative flex justify-center order-1 lg:order-2">
          <div className="relative w-full max-w-[220px] sm:max-w-[260px] aspect-[0.55]">
            <svg viewBox="0 0 100 115" className="w-full h-full">
              {/* Human silhouette */}
              <HumanSilhouette view={view} />
              
              {/* Connection dots on body */}
              {visiblePoints.map((point) => {
                const pos = point.position[view];
                if (!pos) return null;
                const pointHasData = hasData(point.id);
                const isActive = activeField === point.id;
                
                return (
                  <g key={point.id}>
                    {/* Pulsing ring for active */}
                    {isActive && (
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r="5"
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth="1"
                        opacity="0.5"
                        className="animate-ping"
                      />
                    )}
                    
                    {/* Main dot */}
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r="3"
                      fill={pointHasData ? "hsl(var(--primary))" : "hsl(var(--destructive))"}
                      stroke="white"
                      strokeWidth="1.5"
                      className="transition-all duration-300 cursor-pointer hover:r-4"
                    />
                    
                    {/* Connection line */}
                    <line
                      x1={pos.x}
                      y1={pos.y}
                      x2={point.cardSide === "left" ? 8 : 92}
                      y2={pos.y}
                      stroke={pointHasData ? "hsl(var(--primary))" : "hsl(var(--destructive))"}
                      strokeWidth="1"
                      strokeDasharray={pointHasData ? "none" : "3,2"}
                      opacity={isActive ? 0.8 : 0.4}
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
  point: MeasurementPoint;
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
