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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { User, RotateCcw, Check, MapPin, Ruler, Activity, MessageSquare } from "lucide-react";

type ViewType = "front" | "back";

interface BodyRegion {
  id: string;
  label: string;
  path: string;
  views: ViewType[];
}

// Anatomically accurate body regions using SVG paths
const bodyRegions: BodyRegion[] = [
  // Head & Neck
  { id: "head", label: "Cabeça", path: "M45,8 a10,10 0 1,0 10,0 a10,10 0 1,0 -10,0", views: ["front", "back"] },
  { id: "neck", label: "Pescoço", path: "M47,18 L53,18 L53,25 L47,25 Z", views: ["front", "back"] },
  
  // Torso Front
  { id: "chest", label: "Tórax", path: "M35,26 Q50,24 65,26 L63,45 L37,45 Z", views: ["front"] },
  { id: "abdomen", label: "Abdômen", path: "M37,46 L63,46 L61,65 L39,65 Z", views: ["front"] },
  
  // Torso Back
  { id: "upperBack", label: "Costas Superior", path: "M35,26 Q50,24 65,26 L63,45 L37,45 Z", views: ["back"] },
  { id: "lowerBack", label: "Lombar", path: "M37,46 L63,46 L61,65 L39,65 Z", views: ["back"] },
  
  // Pelvis
  { id: "pelvis", label: "Pelve", path: "M39,66 L61,66 L60,78 L40,78 Z", views: ["front", "back"] },
  
  // Arms Left
  { id: "shoulderLeft", label: "Ombro Esq.", path: "M25,28 L36,26 L36,35 L25,37 Z", views: ["front", "back"] },
  { id: "armLeft", label: "Braço Esq.", path: "M22,38 L34,36 L32,55 L20,53 Z", views: ["front", "back"] },
  { id: "forearmLeft", label: "Antebraço Esq.", path: "M18,54 L30,56 L28,75 L16,73 Z", views: ["front", "back"] },
  { id: "handLeft", label: "Mão Esq.", path: "M14,74 L26,76 L24,88 L12,86 Z", views: ["front", "back"] },
  
  // Arms Right
  { id: "shoulderRight", label: "Ombro Dir.", path: "M64,26 L75,28 L75,37 L64,35 Z", views: ["front", "back"] },
  { id: "armRight", label: "Braço Dir.", path: "M66,36 L78,38 L80,53 L68,55 Z", views: ["front", "back"] },
  { id: "forearmRight", label: "Antebraço Dir.", path: "M70,56 L82,54 L84,73 L72,75 Z", views: ["front", "back"] },
  { id: "handRight", label: "Mão Dir.", path: "M74,76 L86,74 L88,86 L76,88 Z", views: ["front", "back"] },
  
  // Legs Left
  { id: "thighLeft", label: "Coxa Esq.", path: "M40,79 L50,79 L48,110 L38,110 Z", views: ["front", "back"] },
  { id: "kneeLeft", label: "Joelho Esq.", path: "M38,111 L48,111 L48,122 L38,122 Z", views: ["front", "back"] },
  { id: "calfLeft", label: "Panturrilha Esq.", path: "M38,123 L48,123 L46,155 L40,155 Z", views: ["front", "back"] },
  { id: "footLeft", label: "Pé Esq.", path: "M38,156 L48,156 L48,168 L36,168 Z", views: ["front", "back"] },
  
  // Legs Right
  { id: "thighRight", label: "Coxa Dir.", path: "M50,79 L60,79 L62,110 L52,110 Z", views: ["front", "back"] },
  { id: "kneeRight", label: "Joelho Dir.", path: "M52,111 L62,111 L62,122 L52,122 Z", views: ["front", "back"] },
  { id: "calfRight", label: "Panturrilha Dir.", path: "M52,123 L62,123 L60,155 L54,155 Z", views: ["front", "back"] },
  { id: "footRight", label: "Pé Dir.", path: "M52,156 L62,156 L64,168 L52,168 Z", views: ["front", "back"] },
];

interface MeasurementType {
  id: string;
  label: string;
  unit: string;
  icon: React.ReactNode;
  color: string;
}

const measurementTypes: MeasurementType[] = [
  { id: "circumference", label: "Circunferência", unit: "cm", icon: <Ruler className="w-3 h-3" />, color: "hsl(var(--info))" },
  { id: "skinfold", label: "Prega Cutânea", unit: "mm", icon: <Activity className="w-3 h-3" />, color: "hsl(var(--warning))" },
  { id: "pain", label: "Dor", unit: "0-10", icon: <Activity className="w-3 h-3" />, color: "hsl(var(--destructive))" },
  { id: "observation", label: "Observação", unit: "", icon: <MessageSquare className="w-3 h-3" />, color: "hsl(var(--primary))" },
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
    return Object.keys(data.measurements).length > 0 || data.notes;
  };

  const getRegionColor = (regionId: string) => {
    const data = value[regionId];
    if (!data || Object.keys(data.measurements).length === 0) return "transparent";
    
    const firstMeasurementKey = Object.keys(data.measurements)[0];
    const measurementType = measurementTypes.find((m) => m.id === firstMeasurementKey);
    return measurementType?.color || "hsl(var(--primary))";
  };

  const filledRegions = Object.entries(value).filter(([_, data]) => 
    Object.keys(data.measurements).length > 0 || data.notes
  );

  return (
    <div className="space-y-6">
      {/* View Toggle */}
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-1 p-1 bg-muted/50 rounded-xl border border-border/50">
          <Button
            variant={view === "front" ? "default" : "ghost"}
            size="sm"
            onClick={() => setView("front")}
            className="gap-2"
          >
            <User className="w-4 h-4" />
            Frontal
          </Button>
          <Button
            variant={view === "back" ? "default" : "ghost"}
            size="sm"
            onClick={() => setView("back")}
            className="gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Posterior
          </Button>
        </div>
      </div>

      {/* Body Map */}
      <div className="relative flex justify-center">
        <div className="relative w-full max-w-[320px] aspect-[1/1.8] bg-gradient-to-b from-muted/30 via-muted/10 to-transparent rounded-2xl border border-border/50 p-4">
          <svg
            viewBox="0 0 100 180"
            className="w-full h-full"
            style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.08))" }}
          >
            <defs>
              <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: 'hsl(var(--muted))', stopOpacity: 0.6 }} />
                <stop offset="100%" style={{ stopColor: 'hsl(var(--muted))', stopOpacity: 0.2 }} />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Body Silhouette */}
            <g className="stroke-border/40" strokeWidth="0.5" fill="url(#bodyGradient)">
              {/* Head */}
              <ellipse cx="50" cy="12" rx="10" ry="11" />
              {/* Neck */}
              <rect x="46" y="22" width="8" height="6" rx="1" />
              {/* Torso */}
              <path d="M35,28 Q50,25 65,28 L63,68 Q50,72 37,68 Z" />
              {/* Pelvis */}
              <path d="M37,68 Q50,74 63,68 L60,80 Q50,84 40,80 Z" />
              {/* Left Arm */}
              <path d="M35,28 Q30,30 26,35 L22,55 Q20,58 18,70 L14,85 Q22,87 28,80 L32,60 Q34,45 36,32" />
              {/* Right Arm */}
              <path d="M65,28 Q70,30 74,35 L78,55 Q80,58 82,70 L86,85 Q78,87 72,80 L68,60 Q66,45 64,32" />
              {/* Left Leg */}
              <path d="M40,80 L38,120 Q36,130 38,155 L36,170 L48,170 L48,155 Q50,130 48,120 L50,80" />
              {/* Right Leg */}
              <path d="M50,80 L52,120 Q50,130 52,155 L52,170 L64,170 L62,155 Q64,130 62,120 L60,80" />
            </g>

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
                    <path
                      d={region.path}
                      onClick={() => handleRegionClick(region.id)}
                      className={cn(
                        "cursor-pointer transition-all duration-200",
                        !readOnly && "hover:opacity-80",
                        isSelected && "filter-[url(#glow)]"
                      )}
                      fill={regionHasData ? color : "transparent"}
                      fillOpacity={regionHasData ? 0.4 : 0}
                      stroke={regionHasData ? color : "hsl(var(--border))"}
                      strokeWidth={isSelected ? 2 : regionHasData ? 1.5 : 0.5}
                      strokeDasharray={regionHasData ? "none" : "2,2"}
                      style={{ 
                        transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                        transformOrigin: 'center'
                      }}
                    />
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-0" align="center">
                    <div className="p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-8 h-8 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: color + '20', color: color }}
                          >
                            <MapPin className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm">{region.label}</h4>
                            <span className="text-xs text-muted-foreground">
                              Vista {view === "front" ? "Frontal" : "Posterior"}
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

            {/* Region markers for filled regions */}
            {visibleRegions.map((region) => {
              if (!hasData(region.id)) return null;
              // Extract center from path (simplified)
              const pathMatch = region.path.match(/M(\d+),(\d+)/);
              if (!pathMatch) return null;
              const x = parseInt(pathMatch[1]) + 5;
              const y = parseInt(pathMatch[2]) + 5;
              
              return (
                <circle
                  key={`marker-${region.id}`}
                  cx={x}
                  cy={y}
                  r="3"
                  fill="white"
                  stroke={getRegionColor(region.id)}
                  strokeWidth="1.5"
                  className="pointer-events-none"
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
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50 border border-border/50"
          >
            <div 
              className="w-4 h-4 rounded flex items-center justify-center text-white"
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
            <h5 className="text-sm font-medium flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              Dados Registrados
            </h5>
            <Badge variant="secondary" className="text-xs">
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
                  className="p-3 rounded-xl bg-card border border-border/50 hover:border-border transition-colors"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div 
                      className="w-6 h-6 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: color + '20', color: color }}
                    >
                      <MapPin className="w-3 h-3" />
                    </div>
                    <span className="font-medium text-sm">{region?.label}</span>
                  </div>
                  <div className="space-y-1">
                    {Object.entries(data.measurements).map(([key, val]) => {
                      const type = measurementTypes.find((m) => m.id === key);
                      if (!val) return null;
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