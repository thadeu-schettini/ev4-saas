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

type ViewType = "front" | "back";

interface BodyRegion {
  id: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  views: ViewType[];
}

const bodyRegions: BodyRegion[] = [
  // Head and Face
  { id: "head", label: "Cabeça", x: 45, y: 2, width: 10, height: 8, views: ["front", "back"] },
  { id: "face", label: "Face", x: 45, y: 5, width: 10, height: 5, views: ["front"] },
  { id: "neck", label: "Pescoço", x: 45, y: 10, width: 10, height: 5, views: ["front", "back"] },
  
  // Torso Front
  { id: "chest", label: "Tórax", x: 35, y: 15, width: 30, height: 15, views: ["front"] },
  { id: "abdomen", label: "Abdômen", x: 35, y: 30, width: 30, height: 15, views: ["front"] },
  { id: "pelvis", label: "Pelve", x: 35, y: 45, width: 30, height: 10, views: ["front", "back"] },
  
  // Torso Back
  { id: "upperBack", label: "Costas Superior", x: 35, y: 15, width: 30, height: 15, views: ["back"] },
  { id: "lowerBack", label: "Costas Inferior", x: 35, y: 30, width: 30, height: 15, views: ["back"] },
  
  // Arms
  { id: "shoulderLeft", label: "Ombro Esq.", x: 20, y: 15, width: 15, height: 8, views: ["front", "back"] },
  { id: "shoulderRight", label: "Ombro Dir.", x: 65, y: 15, width: 15, height: 8, views: ["front", "back"] },
  { id: "armLeft", label: "Braço Esq.", x: 15, y: 23, width: 12, height: 15, views: ["front", "back"] },
  { id: "armRight", label: "Braço Dir.", x: 73, y: 23, width: 12, height: 15, views: ["front", "back"] },
  { id: "forearmLeft", label: "Antebraço Esq.", x: 10, y: 38, width: 12, height: 12, views: ["front", "back"] },
  { id: "forearmRight", label: "Antebraço Dir.", x: 78, y: 38, width: 12, height: 12, views: ["front", "back"] },
  { id: "handLeft", label: "Mão Esq.", x: 5, y: 50, width: 10, height: 8, views: ["front", "back"] },
  { id: "handRight", label: "Mão Dir.", x: 85, y: 50, width: 10, height: 8, views: ["front", "back"] },
  
  // Legs
  { id: "thighLeft", label: "Coxa Esq.", x: 30, y: 55, width: 15, height: 18, views: ["front", "back"] },
  { id: "thighRight", label: "Coxa Dir.", x: 55, y: 55, width: 15, height: 18, views: ["front", "back"] },
  { id: "kneeLeft", label: "Joelho Esq.", x: 30, y: 73, width: 12, height: 6, views: ["front", "back"] },
  { id: "kneeRight", label: "Joelho Dir.", x: 58, y: 73, width: 12, height: 6, views: ["front", "back"] },
  { id: "calfLeft", label: "Panturrilha Esq.", x: 30, y: 79, width: 12, height: 12, views: ["front", "back"] },
  { id: "calfRight", label: "Panturrilha Dir.", x: 58, y: 79, width: 12, height: 12, views: ["front", "back"] },
  { id: "footLeft", label: "Pé Esq.", x: 28, y: 91, width: 12, height: 7, views: ["front", "back"] },
  { id: "footRight", label: "Pé Dir.", x: 60, y: 91, width: 12, height: 7, views: ["front", "back"] },
];

interface MeasurementType {
  id: string;
  label: string;
  unit: string;
  color: string;
}

const measurementTypes: MeasurementType[] = [
  { id: "circumference", label: "Circunferência", unit: "cm", color: "bg-blue-500" },
  { id: "skinfold", label: "Prega Cutânea", unit: "mm", color: "bg-amber-500" },
  { id: "pain", label: "Dor", unit: "0-10", color: "bg-red-500" },
  { id: "observation", label: "Observação", unit: "", color: "bg-violet-500" },
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
    if (!data || Object.keys(data.measurements).length === 0) return "bg-primary/20";
    
    // Color based on first measurement type
    const firstMeasurementKey = Object.keys(data.measurements)[0];
    const measurementType = measurementTypes.find((m) => m.id === firstMeasurementKey);
    return measurementType?.color || "bg-primary/40";
  };

  const renderBodyShape = () => (
    <div className="relative w-full max-w-[280px] mx-auto aspect-[1/2]">
      {/* SVG Body Silhouette */}
      <svg
        viewBox="0 0 100 200"
        className="w-full h-full"
        style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))" }}
      >
        {/* Background body shape */}
        <ellipse cx="50" cy="8" rx="8" ry="8" className="fill-muted/50 stroke-border" strokeWidth="0.5" />
        <rect x="42" y="14" width="16" height="6" rx="2" className="fill-muted/50 stroke-border" strokeWidth="0.5" />
        <path
          d={view === "front" 
            ? "M35 20 Q30 20 28 25 L25 40 Q22 45 20 55 L15 58 L5 55 L8 50 Q12 38 15 25 Q18 20 35 20 Z"
            : "M35 20 Q30 20 28 25 L25 40 Q22 45 20 55 L15 58 L5 55 L8 50 Q12 38 15 25 Q18 20 35 20 Z"
          }
          className="fill-muted/50 stroke-border" strokeWidth="0.5"
        />
        <path
          d={view === "front"
            ? "M65 20 Q70 20 72 25 L75 40 Q78 45 80 55 L85 58 L95 55 L92 50 Q88 38 85 25 Q82 20 65 20 Z"
            : "M65 20 Q70 20 72 25 L75 40 Q78 45 80 55 L85 58 L95 55 L92 50 Q88 38 85 25 Q82 20 65 20 Z"
          }
          className="fill-muted/50 stroke-border" strokeWidth="0.5"
        />
        <rect x="30" y="20" width="40" height="35" rx="5" className="fill-muted/50 stroke-border" strokeWidth="0.5" />
        <path
          d="M32 55 L30 73 Q28 80 28 90 L25 98 L40 98 L42 55 Z"
          className="fill-muted/50 stroke-border" strokeWidth="0.5"
        />
        <path
          d="M68 55 L70 73 Q72 80 72 90 L75 98 L60 98 L58 55 Z"
          className="fill-muted/50 stroke-border" strokeWidth="0.5"
        />
      </svg>

      {/* Interactive regions */}
      {visibleRegions.map((region) => (
        <Popover
          key={region.id}
          open={selectedRegion === region.id}
          onOpenChange={(open) => !open && setSelectedRegion(null)}
        >
          <PopoverTrigger asChild>
            <button
              onClick={() => handleRegionClick(region.id)}
              disabled={readOnly}
              className={cn(
                "absolute rounded-lg border-2 transition-all",
                "hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/50",
                hasData(region.id) ? getRegionColor(region.id) : "bg-transparent border-dashed border-muted-foreground/30",
                selectedRegion === region.id && "ring-2 ring-primary scale-105",
                readOnly && "cursor-default hover:scale-100"
              )}
              style={{
                left: `${region.x}%`,
                top: `${region.y / 2}%`,
                width: `${region.width}%`,
                height: `${region.height / 2}%`,
              }}
              title={region.label}
            >
              {hasData(region.id) && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full shadow-sm" />
                </div>
              )}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4" align="center">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">{region.label}</h4>
                {hasData(region.id) && (
                  <Badge variant="secondary" className="text-xs">
                    Com dados
                  </Badge>
                )}
              </div>

              {activeMeasurements.map((measurement) => (
                <div key={measurement.id} className="space-y-2">
                  <Label className="text-xs flex items-center gap-2">
                    <div className={cn("w-2 h-2 rounded-full", measurement.color)} />
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
                    className="h-8 text-sm"
                  />
                </div>
              ))}

              <div className="space-y-2">
                <Label className="text-xs">Observações</Label>
                <Textarea
                  placeholder="Notas sobre esta região..."
                  value={value[region.id]?.notes || ""}
                  onChange={(e) =>
                    updateRegionData(region.id, { notes: e.target.value })
                  }
                  rows={2}
                  className="text-sm"
                />
              </div>

              <Button
                size="sm"
                variant="secondary"
                className="w-full"
                onClick={() => setSelectedRegion(null)}
              >
                Fechar
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  );

  const filledRegions = Object.entries(value).filter(([_, data]) => 
    Object.keys(data.measurements).length > 0 || data.notes
  );

  return (
    <div className="space-y-4">
      {/* View Tabs */}
      <Tabs value={view} onValueChange={(v) => setView(v as ViewType)} className="w-full">
        <TabsList className="grid w-full max-w-xs mx-auto grid-cols-2">
          <TabsTrigger value="front">Vista Frontal</TabsTrigger>
          <TabsTrigger value="back">Vista Posterior</TabsTrigger>
        </TabsList>

        <TabsContent value="front" className="mt-4">
          {renderBodyShape()}
        </TabsContent>

        <TabsContent value="back" className="mt-4">
          {renderBodyShape()}
        </TabsContent>
      </Tabs>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-3 pt-2 border-t border-border">
        {activeMeasurements.map((measurement) => (
          <div key={measurement.id} className="flex items-center gap-1.5">
            <div className={cn("w-3 h-3 rounded-full", measurement.color)} />
            <span className="text-xs text-muted-foreground">{measurement.label}</span>
          </div>
        ))}
      </div>

      {/* Data Summary */}
      {filledRegions.length > 0 && (
        <div className="bg-muted/30 rounded-lg p-3 space-y-2">
          <h5 className="text-xs font-medium">Dados Registrados</h5>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
            {filledRegions.map(([regionId, data]) => {
              const region = bodyRegions.find((r) => r.id === regionId);
              return (
                <div key={regionId} className="p-2 bg-background rounded border border-border">
                  <span className="font-medium">{region?.label}</span>
                  <div className="text-muted-foreground mt-1">
                    {Object.entries(data.measurements).map(([key, val]) => {
                      const type = measurementTypes.find((m) => m.id === key);
                      return (
                        <div key={key}>
                          {type?.label}: {val} {type?.unit}
                        </div>
                      );
                    })}
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
