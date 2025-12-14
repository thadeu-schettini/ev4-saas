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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  Plus, 
  Trash2, 
  Circle, 
  Square, 
  Minus,
  Droplet,
  Zap,
  Check,
  MapPin
} from "lucide-react";

type ViewType = "front" | "back";

interface LesionType {
  id: string;
  label: string;
  color: string;
  icon: React.ReactNode;
}

const lesionTypes: LesionType[] = [
  { id: "macula", label: "Mácula", color: "hsl(var(--destructive))", icon: <Circle className="w-3 h-3" /> },
  { id: "papula", label: "Pápula", color: "hsl(var(--warning))", icon: <Circle className="w-3 h-3 fill-current" /> },
  { id: "nodulo", label: "Nódulo", color: "hsl(212 95% 50%)", icon: <Square className="w-3 h-3 fill-current" /> },
  { id: "vesicula", label: "Vesícula", color: "hsl(var(--info))", icon: <Droplet className="w-3 h-3" /> },
  { id: "pustula", label: "Pústula", color: "hsl(45 93% 47%)", icon: <Droplet className="w-3 h-3 fill-current" /> },
  { id: "erosao", label: "Erosão", color: "hsl(346 77% 50%)", icon: <Minus className="w-3 h-3" /> },
  { id: "ulcera", label: "Úlcera", color: "hsl(0 72% 51%)", icon: <Circle className="w-3 h-3" /> },
  { id: "cicatriz", label: "Cicatriz", color: "hsl(var(--muted-foreground))", icon: <Zap className="w-3 h-3" /> },
];

interface Lesion {
  id: string;
  type: string;
  x: number;
  y: number;
  size: string;
  description: string;
  view: ViewType;
}

interface DermatologyFieldProps {
  value: Lesion[];
  onChange: (value: Lesion[]) => void;
  readOnly?: boolean;
}

export function DermatologyField({
  value = [],
  onChange,
  readOnly = false,
}: DermatologyFieldProps) {
  const [view, setView] = useState<ViewType>("front");
  const [selectedLesion, setSelectedLesion] = useState<string | null>(null);
  const [isAddingMode, setIsAddingMode] = useState(false);
  const [newLesionType, setNewLesionType] = useState("macula");

  const visibleLesions = value.filter((l) => l.view === view);

  const handleMapClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (readOnly || !isAddingMode) return;

    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const newLesion: Lesion = {
      id: Date.now().toString(),
      type: newLesionType,
      x,
      y,
      size: "",
      description: "",
      view,
    };

    onChange([...value, newLesion]);
    setSelectedLesion(newLesion.id);
    setIsAddingMode(false);
  };

  const updateLesion = (id: string, updates: Partial<Lesion>) => {
    onChange(value.map((l) => (l.id === id ? { ...l, ...updates } : l)));
  };

  const removeLesion = (id: string) => {
    onChange(value.filter((l) => l.id !== id));
    setSelectedLesion(null);
  };

  const getLesionType = (typeId: string) => {
    return lesionTypes.find((t) => t.id === typeId) || lesionTypes[0];
  };

  // Count lesions by type
  const lesionCounts = value.reduce((acc, lesion) => {
    acc[lesion.type] = (acc[lesion.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* View Toggle */}
        <div className="inline-flex items-center gap-1 p-1 bg-muted/50 rounded-xl border border-border/50">
          <Button
            variant={view === "front" ? "default" : "ghost"}
            size="sm"
            onClick={() => setView("front")}
          >
            Frontal
          </Button>
          <Button
            variant={view === "back" ? "default" : "ghost"}
            size="sm"
            onClick={() => setView("back")}
          >
            Posterior
          </Button>
        </div>

        {/* Add Lesion */}
        {!readOnly && (
          <div className="flex items-center gap-2">
            {isAddingMode ? (
              <div className="flex items-center gap-2 p-2 bg-primary/10 rounded-lg border border-primary/30">
                <span className="text-xs font-medium text-primary">
                  Clique no mapa para adicionar
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsAddingMode(false)}
                >
                  Cancelar
                </Button>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Plus className="w-4 h-4" />
                    Adicionar Lesão
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-3" align="end">
                  <div className="space-y-3">
                    <Label className="text-xs font-medium">Tipo de Lesão</Label>
                    <div className="grid grid-cols-4 gap-1.5">
                      {lesionTypes.map((type) => (
                        <Tooltip key={type.id}>
                          <TooltipTrigger asChild>
                            <button
                              onClick={() => setNewLesionType(type.id)}
                              className={cn(
                                "p-2 rounded-lg border-2 transition-all",
                                newLesionType === type.id
                                  ? "border-primary ring-2 ring-primary/20"
                                  : "border-transparent hover:border-border"
                              )}
                            >
                              <div
                                className="w-5 h-5 mx-auto rounded flex items-center justify-center text-white"
                                style={{ backgroundColor: type.color }}
                              >
                                {type.icon}
                              </div>
                            </button>
                          </TooltipTrigger>
                          <TooltipContent side="bottom" className="text-xs">
                            {type.label}
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </div>
                    <Button
                      size="sm"
                      className="w-full"
                      onClick={() => {
                        setIsAddingMode(true);
                      }}
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      Marcar no Mapa
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
        )}
      </div>

      {/* Body Map */}
      <div className="relative flex justify-center">
        <div 
          className={cn(
            "relative w-full max-w-[320px] aspect-[1/1.8] bg-gradient-to-b from-muted/30 via-muted/10 to-transparent rounded-2xl border border-border/50 p-4",
            isAddingMode && "ring-2 ring-primary/50 cursor-crosshair"
          )}
        >
          <svg
            viewBox="0 0 100 180"
            className={cn("w-full h-full", isAddingMode && "cursor-crosshair")}
            onClick={handleMapClick}
          >
            <defs>
              <linearGradient id="skinGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: 'hsl(30 20% 80%)', stopOpacity: 0.8 }} />
                <stop offset="100%" style={{ stopColor: 'hsl(30 20% 70%)', stopOpacity: 0.6 }} />
              </linearGradient>
            </defs>

            {/* Body Silhouette */}
            <g fill="url(#skinGradient)" className="stroke-border/40" strokeWidth="0.5">
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

            {/* Lesion Markers */}
            {visibleLesions.map((lesion) => {
              const type = getLesionType(lesion.type);
              const isSelected = selectedLesion === lesion.id;

              return (
                <Popover
                  key={lesion.id}
                  open={isSelected}
                  onOpenChange={(open) => !open && setSelectedLesion(null)}
                >
                  <PopoverTrigger asChild>
                    <g
                      className={cn(
                        "cursor-pointer transition-all",
                        isSelected && "opacity-100",
                        !isSelected && "opacity-80 hover:opacity-100"
                      )}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedLesion(lesion.id);
                      }}
                    >
                      {/* Outer ring */}
                      <circle
                        cx={lesion.x}
                        cy={lesion.y}
                        r={isSelected ? 5 : 4}
                        fill="white"
                        stroke={type.color}
                        strokeWidth={isSelected ? 2 : 1.5}
                      />
                      {/* Inner marker */}
                      <circle
                        cx={lesion.x}
                        cy={lesion.y}
                        r={2}
                        fill={type.color}
                      />
                    </g>
                  </PopoverTrigger>
                  <PopoverContent className="w-72 p-0" align="center">
                    <div className="p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                            style={{ backgroundColor: type.color }}
                          >
                            {type.icon}
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm">{type.label}</h4>
                            <span className="text-xs text-muted-foreground">
                              Lesão #{value.indexOf(lesion) + 1}
                            </span>
                          </div>
                        </div>
                        {!readOnly && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                            onClick={() => removeLesion(lesion.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>

                      <div className="space-y-3">
                        <div className="space-y-2">
                          <Label className="text-xs font-medium">Tamanho</Label>
                          <Input
                            placeholder="Ex: 2cm x 1.5cm"
                            value={lesion.size}
                            onChange={(e) =>
                              updateLesion(lesion.id, { size: e.target.value })
                            }
                            className="h-9"
                            disabled={readOnly}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-xs font-medium">Descrição</Label>
                          <Textarea
                            placeholder="Cor, textura, bordas, evolução..."
                            value={lesion.description}
                            onChange={(e) =>
                              updateLesion(lesion.id, { description: e.target.value })
                            }
                            rows={3}
                            className="resize-none"
                            disabled={readOnly}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="border-t p-3 bg-muted/30">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="w-full"
                        onClick={() => setSelectedLesion(null)}
                      >
                        <Check className="w-4 h-4 mr-2" />
                        Confirmar
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-2">
        {lesionTypes.map((type) => (
          <div 
            key={type.id} 
            className={cn(
              "flex items-center gap-1.5 px-2 py-1 rounded-md text-xs transition-all",
              lesionCounts[type.id] ? "bg-muted border border-border/50" : "opacity-60"
            )}
          >
            <div
              className="w-4 h-4 rounded flex items-center justify-center text-white"
              style={{ backgroundColor: type.color }}
            >
              {type.icon}
            </div>
            <span className="text-muted-foreground">{type.label}</span>
            {lesionCounts[type.id] && (
              <Badge variant="secondary" className="h-4 px-1.5 text-[10px] ml-1">
                {lesionCounts[type.id]}
              </Badge>
            )}
          </div>
        ))}
      </div>

      {/* Lesions Summary */}
      {value.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h5 className="text-sm font-medium">Lesões Registradas</h5>
            <Badge variant="secondary">
              {value.length} {value.length === 1 ? 'lesão' : 'lesões'}
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {value.map((lesion, index) => {
              const type = getLesionType(lesion.type);
              return (
                <div 
                  key={lesion.id}
                  className="flex items-start gap-3 p-3 rounded-xl bg-card border border-border/50 hover:border-border transition-colors cursor-pointer"
                  onClick={() => {
                    setView(lesion.view);
                    setSelectedLesion(lesion.id);
                  }}
                >
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0"
                    style={{ backgroundColor: type.color }}
                  >
                    {type.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">#{index + 1} {type.label}</span>
                      <Badge variant="outline" className="text-[10px]">
                        {lesion.view === "front" ? "Frontal" : "Posterior"}
                      </Badge>
                    </div>
                    {lesion.size && (
                      <div className="text-xs text-muted-foreground mt-0.5">
                        Tamanho: {lesion.size}
                      </div>
                    )}
                    {lesion.description && (
                      <div className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                        {lesion.description}
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