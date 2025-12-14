import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Check, MapPin, Ruler, Activity, MessageSquare } from "lucide-react";

type ViewType = "front" | "back";

interface BodyRegion {
  id: string;
  label: string;
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  views: ViewType[];
}

// Anatomical body regions with ellipse positioning
const bodyRegions: BodyRegion[] = [
  // Head & Neck
  { id: "head", label: "Cabeça", cx: 50, cy: 8, rx: 6, ry: 6, views: ["front", "back"] },
  { id: "neck", label: "Pescoço", cx: 50, cy: 17, rx: 3, ry: 3, views: ["front", "back"] },
  
  // Torso
  { id: "chest", label: "Tórax", cx: 50, cy: 28, rx: 12, ry: 8, views: ["front"] },
  { id: "upperBack", label: "Costas Superior", cx: 50, cy: 28, rx: 12, ry: 8, views: ["back"] },
  { id: "abdomen", label: "Abdômen", cx: 50, cy: 42, rx: 10, ry: 8, views: ["front"] },
  { id: "lowerBack", label: "Lombar", cx: 50, cy: 42, rx: 10, ry: 8, views: ["back"] },
  { id: "pelvis", label: "Pelve", cx: 50, cy: 54, rx: 9, ry: 5, views: ["front", "back"] },
  
  // Arms - Left
  { id: "shoulderLeft", label: "Ombro Esq.", cx: 32, cy: 22, rx: 5, ry: 4, views: ["front", "back"] },
  { id: "armLeft", label: "Braço Esq.", cx: 27, cy: 32, rx: 4, ry: 7, views: ["front", "back"] },
  { id: "forearmLeft", label: "Antebraço Esq.", cx: 22, cy: 48, rx: 3, ry: 8, views: ["front", "back"] },
  { id: "handLeft", label: "Mão Esq.", cx: 17, cy: 62, rx: 3, ry: 4, views: ["front", "back"] },
  
  // Arms - Right
  { id: "shoulderRight", label: "Ombro Dir.", cx: 68, cy: 22, rx: 5, ry: 4, views: ["front", "back"] },
  { id: "armRight", label: "Braço Dir.", cx: 73, cy: 32, rx: 4, ry: 7, views: ["front", "back"] },
  { id: "forearmRight", label: "Antebraço Dir.", cx: 78, cy: 48, rx: 3, ry: 8, views: ["front", "back"] },
  { id: "handRight", label: "Mão Dir.", cx: 83, cy: 62, rx: 3, ry: 4, views: ["front", "back"] },
  
  // Legs - Left
  { id: "thighLeft", label: "Coxa Esq.", cx: 43, cy: 68, rx: 5, ry: 10, views: ["front", "back"] },
  { id: "kneeLeft", label: "Joelho Esq.", cx: 43, cy: 82, rx: 4, ry: 3, views: ["front", "back"] },
  { id: "calfLeft", label: "Panturrilha Esq.", cx: 43, cy: 92, rx: 3, ry: 6, views: ["front", "back"] },
  
  // Legs - Right
  { id: "thighRight", label: "Coxa Dir.", cx: 57, cy: 68, rx: 5, ry: 10, views: ["front", "back"] },
  { id: "kneeRight", label: "Joelho Dir.", cx: 57, cy: 82, rx: 4, ry: 3, views: ["front", "back"] },
  { id: "calfRight", label: "Panturrilha Dir.", cx: 57, cy: 92, rx: 3, ry: 6, views: ["front", "back"] },
];

interface MeasurementType {
  id: string;
  label: string;
  unit: string;
  icon: React.ReactNode;
  color: string;
}

const measurementTypes: MeasurementType[] = [
  { id: "circumference", label: "Circunferência", unit: "cm", icon: <Ruler className="w-3 h-3" />, color: "#3b82f6" },
  { id: "skinfold", label: "Prega Cutânea", unit: "mm", icon: <Activity className="w-3 h-3" />, color: "#f59e0b" },
  { id: "pain", label: "Dor", unit: "0-10", icon: <Activity className="w-3 h-3" />, color: "#ef4444" },
  { id: "observation", label: "Observação", unit: "", icon: <MessageSquare className="w-3 h-3" />, color: "#8b5cf6" },
];

interface RegionData {
  measurements: Record<string, number | string>;
  notes: string;
}

interface BodyMapFieldProps {
  value: Record<string, RegionData>;
  onChange: (value: Record<string, RegionData>) => void;
  measurementMode?: string[];
  readOnly?: boolean;
}

// Elegant human silhouette SVG
const HumanSilhouette = ({ view }: { view: ViewType }) => (
  <g fill="url(#bodyGradient)" stroke="url(#bodyStroke)" strokeWidth="1">
    {/* Head */}
    <ellipse cx="50" cy="8" rx="6" ry="7" />
    
    {/* Neck */}
    <path d="M47,14 L47,19 Q50,20 53,19 L53,14" fill="url(#bodyGradient)" />
    
    {/* Torso */}
    <path d="M38,19 Q32,22 32,24 L30,38 Q29,42 30,46 L32,52 Q35,58 50,60 Q65,58 68,52 L70,46 Q71,42 70,38 L68,24 Q68,22 62,19 Z" />
    
    {/* Left Arm */}
    <path d="M32,22 Q28,22 26,26 L23,38 Q21,44 19,52 L16,62 Q15,66 17,68 L20,66 Q22,62 24,54 L27,42 Q29,34 31,28" />
    
    {/* Right Arm */}
    <path d="M68,22 Q72,22 74,26 L77,38 Q79,44 81,52 L84,62 Q85,66 83,68 L80,66 Q78,62 76,54 L73,42 Q71,34 69,28" />
    
    {/* Left Leg */}
    <path d="M42,58 Q38,60 38,64 L37,78 Q36,82 37,88 L38,98 Q39,100 42,100 L44,100 Q46,99 46,96 L47,86 Q48,80 47,74 L46,64 Q46,60 44,58" />
    
    {/* Right Leg */}
    <path d="M58,58 Q62,60 62,64 L63,78 Q64,82 63,88 L62,98 Q61,100 58,100 L56,100 Q54,99 54,96 L53,86 Q52,80 53,74 L54,64 Q54,60 56,58" />
    
    {view === "front" ? (
      <>
        {/* Face features hint */}
        <ellipse cx="47" cy="7" rx="1" ry="0.8" fill="#d1d5db" opacity="0.5" />
        <ellipse cx="53" cy="7" rx="1" ry="0.8" fill="#d1d5db" opacity="0.5" />
        {/* Chest line */}
        <path d="M44,26 Q50,28 56,26" stroke="#d1d5db" strokeWidth="0.5" fill="none" opacity="0.5" />
        {/* Abs hint */}
        <line x1="50" y1="32" x2="50" y2="48" stroke="#d1d5db" strokeWidth="0.3" opacity="0.3" />
      </>
    ) : (
      <>
        {/* Spine hint */}
        <line x1="50" y1="20" x2="50" y2="55" stroke="#d1d5db" strokeWidth="0.5" opacity="0.4" />
        {/* Shoulder blades hint */}
        <ellipse cx="43" cy="28" rx="4" ry="3" fill="none" stroke="#d1d5db" strokeWidth="0.3" opacity="0.3" />
        <ellipse cx="57" cy="28" rx="4" ry="3" fill="none" stroke="#d1d5db" strokeWidth="0.3" opacity="0.3" />
      </>
    )}
  </g>
);

export function BodyMapField({
  value = {},
  onChange,
  measurementMode = ["circumference", "observation"],
  readOnly = false,
}: BodyMapFieldProps) {
  const [view, setView] = useState<ViewType>("front");
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const visibleRegions = bodyRegions.filter((r) => r.views.includes(view));
  const activeMeasurements = measurementTypes.filter((m) => measurementMode.includes(m.id));

  const handleRegionClick = (regionId: string) => {
    if (readOnly) return;
    setSelectedRegion(regionId);
  };

  const updateRegionData = (regionId: string, data: Partial<RegionData>) => {
    const current = value[regionId] || { measurements: {}, notes: "" };
    const newValue = {
      ...value,
      [regionId]: {
        ...current,
        ...data,
        measurements: {
          ...current.measurements,
          ...data.measurements,
        },
      },
    };
    onChange(newValue);
  };

  const hasData = (regionId: string) => {
    const data = value[regionId];
    if (!data) return false;
    return Object.keys(data.measurements).some(k => data.measurements[k]) || data.notes;
  };

  const getRegionColor = (regionId: string) => {
    const data = value[regionId];
    if (!data || !Object.keys(data.measurements).some(k => data.measurements[k])) return null;
    
    const firstMeasurementKey = Object.keys(data.measurements).find(k => data.measurements[k]);
    if (!firstMeasurementKey) return null;
    const measurementType = measurementTypes.find((m) => m.id === firstMeasurementKey);
    return measurementType?.color || "#8b5cf6";
  };

  const filledRegions = Object.entries(value).filter(([_, data]) => 
    Object.keys(data.measurements).some(k => data.measurements[k]) || data.notes
  );

  return (
    <div className="space-y-6">
      {/* View Toggle */}
      <div className="flex justify-center">
        <div className="inline-flex p-1 bg-muted/50 rounded-xl border border-border/50">
          <Button
            variant={view === "front" ? "default" : "ghost"}
            size="sm"
            onClick={() => setView("front")}
            className="rounded-lg"
          >
            Vista Frontal
          </Button>
          <Button
            variant={view === "back" ? "default" : "ghost"}
            size="sm"
            onClick={() => setView("back")}
            className="rounded-lg"
          >
            Vista Posterior
          </Button>
        </div>
      </div>

      {/* Body Map */}
      <div className="flex justify-center">
        <div className="relative w-full max-w-[300px] aspect-[1/1.1] bg-gradient-to-b from-muted/20 via-transparent to-muted/10 rounded-2xl border border-border/30 p-4">
          <svg viewBox="0 0 100 105" className="w-full h-full">
            <defs>
              <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--muted))" stopOpacity="0.4" />
                <stop offset="50%" stopColor="hsl(var(--muted))" stopOpacity="0.3" />
                <stop offset="100%" stopColor="hsl(var(--muted))" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="bodyStroke" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--border))" stopOpacity="0.6" />
                <stop offset="100%" stopColor="hsl(var(--border))" stopOpacity="0.3" />
              </linearGradient>
              <filter id="regionGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" result="blur"/>
                <feMerge>
                  <feMergeNode in="blur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Human Silhouette */}
            <HumanSilhouette view={view} />

            {/* Interactive Regions */}
            {visibleRegions.map((region) => {
              const regionHasData = hasData(region.id);
              const isSelected = selectedRegion === region.id;
              const color = getRegionColor(region.id);

              return (
                <Popover
                  key={region.id}
                  open={isSelected}
                  onOpenChange={(open) => !open && setSelectedRegion(null)}
                >
                  <PopoverTrigger asChild>
                    <ellipse
                      cx={region.cx}
                      cy={region.cy}
                      rx={region.rx}
                      ry={region.ry}
                      onClick={() => handleRegionClick(region.id)}
                      className={cn(
                        "cursor-pointer transition-all duration-200",
                        !readOnly && "hover:opacity-80"
                      )}
                      fill={regionHasData && color ? `${color}40` : "transparent"}
                      stroke={regionHasData && color ? color : "hsl(var(--border))"}
                      strokeWidth={isSelected ? 2 : regionHasData ? 1.5 : 0.5}
                      strokeDasharray={regionHasData ? "none" : "2,2"}
                      opacity={isSelected ? 1 : regionHasData ? 0.9 : 0.4}
                      filter={isSelected ? "url(#regionGlow)" : undefined}
                    />
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-0" align="center">
                    <div className="p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{ 
                              backgroundColor: color ? `${color}20` : 'hsl(var(--muted))',
                              color: color || 'hsl(var(--muted-foreground))'
                            }}
                          >
                            <MapPin className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-semibold">{region.label}</h4>
                            <span className="text-xs text-muted-foreground">
                              {view === "front" ? "Frontal" : "Posterior"}
                            </span>
                          </div>
                        </div>
                        {regionHasData && (
                          <Badge variant="secondary" className="text-xs">
                            Com dados
                          </Badge>
                        )}
                      </div>

                      {activeMeasurements.map((measurement) => (
                        <div key={measurement.id} className="space-y-2">
                          <Label className="text-xs font-medium flex items-center gap-2">
                            <div 
                              className="w-5 h-5 rounded flex items-center justify-center text-white"
                              style={{ backgroundColor: measurement.color }}
                            >
                              {measurement.icon}
                            </div>
                            {measurement.label}
                            {measurement.unit && (
                              <span className="text-muted-foreground">({measurement.unit})</span>
                            )}
                          </Label>
                          <Input
                            type={measurement.id === "observation" ? "text" : "number"}
                            placeholder={`Inserir ${measurement.label.toLowerCase()}`}
                            value={value[region.id]?.measurements[measurement.id] || ""}
                            onChange={(e) =>
                              updateRegionData(region.id, {
                                measurements: {
                                  [measurement.id]: e.target.value,
                                },
                              })
                            }
                            className="h-9"
                          />
                        </div>
                      ))}

                      <div className="space-y-2">
                        <Label className="text-xs font-medium">Observações</Label>
                        <Textarea
                          placeholder="Notas sobre esta região..."
                          value={value[region.id]?.notes || ""}
                          onChange={(e) =>
                            updateRegionData(region.id, { notes: e.target.value })
                          }
                          rows={2}
                          className="resize-none"
                        />
                      </div>
                    </div>

                    <div className="border-t p-3 bg-muted/30">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="w-full"
                        onClick={() => setSelectedRegion(null)}
                      >
                        <Check className="w-4 h-4 mr-2" />
                        Confirmar
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              );
            })}

            {/* Region labels on hover */}
            {visibleRegions.map((region) => {
              const regionHasData = hasData(region.id);
              if (!regionHasData) return null;
              
              return (
                <circle
                  key={`dot-${region.id}`}
                  cx={region.cx}
                  cy={region.cy}
                  r="1.5"
                  fill="white"
                  stroke={getRegionColor(region.id) || "hsl(var(--primary))"}
                  strokeWidth="1"
                />
              );
            })}
          </svg>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-3">
        {activeMeasurements.map((measurement) => (
          <div 
            key={measurement.id} 
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card border border-border/50 shadow-sm"
          >
            <div 
              className="w-5 h-5 rounded flex items-center justify-center text-white"
              style={{ backgroundColor: measurement.color }}
            >
              {measurement.icon}
            </div>
            <span className="text-xs font-medium">{measurement.label}</span>
          </div>
        ))}
      </div>

      {/* Data Summary */}
      {filledRegions.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h5 className="text-sm font-semibold flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              Dados Registrados
            </h5>
            <Badge variant="secondary">
              {filledRegions.length} {filledRegions.length === 1 ? 'região' : 'regiões'}
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {filledRegions.map(([regionId, data]) => {
              const region = bodyRegions.find((r) => r.id === regionId);
              const color = getRegionColor(regionId);
              
              return (
                <div 
                  key={regionId} 
                  className="p-3 rounded-xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div 
                      className="w-7 h-7 rounded-lg flex items-center justify-center"
                      style={{ 
                        backgroundColor: color ? `${color}20` : 'hsl(var(--muted))',
                        color: color || 'hsl(var(--muted-foreground))'
                      }}
                    >
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-semibold text-sm">{region?.label}</span>
                  </div>
                  <div className="space-y-1">
                    {Object.entries(data.measurements).map(([key, val]) => {
                      if (!val) return null;
                      const type = measurementTypes.find((m) => m.id === key);
                      return (
                        <div key={key} className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">{type?.label}</span>
                          <span className="font-medium">{val} {type?.unit}</span>
                        </div>
                      );
                    })}
                    {data.notes && (
                      <div className="text-xs text-muted-foreground mt-1 pt-1 border-t border-border/50 line-clamp-2">
                        {data.notes}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}