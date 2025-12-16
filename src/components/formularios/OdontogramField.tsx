import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import odontogramImage from "@/assets/odontogram-teeth.png";

type NotationSystem = "fdi" | "universal" | "palmer";

interface ToothCondition {
  id: string;
  label: string;
  bgColor: string;
  borderColor: string;
  symbol: string;
}

const conditions: ToothCondition[] = [
  { id: "healthy", label: "Saudável", bgColor: "hsl(var(--success))", borderColor: "hsl(var(--success))", symbol: "✓" },
  { id: "caries", label: "Cárie", bgColor: "hsl(var(--destructive))", borderColor: "hsl(var(--destructive))", symbol: "C" },
  { id: "restored", label: "Restaurado", bgColor: "hsl(var(--info))", borderColor: "hsl(var(--info))", symbol: "R" },
  { id: "missing", label: "Ausente", bgColor: "hsl(var(--muted-foreground))", borderColor: "hsl(var(--muted-foreground))", symbol: "X" },
  { id: "crown", label: "Coroa", bgColor: "hsl(var(--warning))", borderColor: "hsl(var(--warning))", symbol: "O" },
  { id: "implant", label: "Implante", bgColor: "hsl(262 83% 58%)", borderColor: "hsl(262 83% 58%)", symbol: "I" },
  { id: "rootCanal", label: "Canal", bgColor: "hsl(25 95% 53%)", borderColor: "hsl(25 95% 53%)", symbol: "E" },
  { id: "extraction", label: "Extração", bgColor: "hsl(0 72% 51%)", borderColor: "hsl(0 72% 51%)", symbol: "!" },
  { id: "fracture", label: "Fratura", bgColor: "hsl(350 89% 60%)", borderColor: "hsl(350 89% 60%)", symbol: "F" },
  { id: "mobility", label: "Mobilidade", bgColor: "hsl(48 96% 53%)", borderColor: "hsl(48 96% 53%)", symbol: "M" },
];

// FDI/ISO notation - teeth positions (16 upper, 16 lower for adults)
const fdiAdultTeeth = {
  upperRight: [18, 17, 16, 15, 14, 13, 12, 11],
  upperLeft: [21, 22, 23, 24, 25, 26, 27, 28],
  lowerLeft: [31, 32, 33, 34, 35, 36, 37, 38],
  lowerRight: [48, 47, 46, 45, 44, 43, 42, 41],
};

const fdiChildTeeth = {
  upperRight: [55, 54, 53, 52, 51],
  upperLeft: [61, 62, 63, 64, 65],
  lowerLeft: [71, 72, 73, 74, 75],
  lowerRight: [85, 84, 83, 82, 81],
};

const universalAdultTeeth = {
  upperRight: [1, 2, 3, 4, 5, 6, 7, 8],
  upperLeft: [9, 10, 11, 12, 13, 14, 15, 16],
  lowerLeft: [17, 18, 19, 20, 21, 22, 23, 24],
  lowerRight: [32, 31, 30, 29, 28, 27, 26, 25],
};

const universalChildTeeth = {
  upperRight: ["A", "B", "C", "D", "E"],
  upperLeft: ["F", "G", "H", "I", "J"],
  lowerLeft: ["K", "L", "M", "N", "O"],
  lowerRight: ["T", "S", "R", "Q", "P"],
};

const palmerAdultTeeth = {
  upperRight: ["8┘", "7┘", "6┘", "5┘", "4┘", "3┘", "2┘", "1┘"],
  upperLeft: ["┗1", "┗2", "┗3", "┗4", "┗5", "┗6", "┗7", "┗8"],
  lowerLeft: ["┏1", "┏2", "┏3", "┏4", "┏5", "┏6", "┏7", "┏8"],
  lowerRight: ["8┐", "7┐", "6┐", "5┐", "4┐", "3┐", "2┐", "1┐"],
};

interface ToothData {
  condition: string;
  notes: string;
}

interface OdontogramFieldProps {
  value: Record<string, ToothData>;
  onChange: (value: Record<string, ToothData>) => void;
  notationSystem?: NotationSystem;
  showPediatric?: boolean;
  readOnly?: boolean;
}

export function OdontogramField({
  value = {},
  onChange,
  notationSystem: initialNotation = "fdi",
  showPediatric = false,
  readOnly = false,
}: OdontogramFieldProps) {
  const [notation, setNotation] = useState<NotationSystem>(initialNotation);
  const [isPediatric, setIsPediatric] = useState(showPediatric);
  const [selectedTooth, setSelectedTooth] = useState<string | null>(null);
  const [selectedCondition, setSelectedCondition] = useState("healthy");

  const teeth = useMemo(() => {
    if (notation === "fdi") {
      return isPediatric ? fdiChildTeeth : fdiAdultTeeth;
    } else if (notation === "universal") {
      return isPediatric ? universalChildTeeth : universalAdultTeeth;
    } else {
      return palmerAdultTeeth;
    }
  }, [notation, isPediatric]);

  const getToothNumber = (tooth: number | string) => String(tooth);

  const handleToothClick = (tooth: number | string) => {
    if (readOnly) return;
    const toothId = getToothNumber(tooth);
    setSelectedTooth(toothId);
    setSelectedCondition(value[toothId]?.condition || "healthy");
  };

  const applyCondition = (toothId: string, conditionId: string) => {
    const newValue = {
      ...value,
      [toothId]: {
        ...value[toothId],
        condition: conditionId,
        notes: value[toothId]?.notes || "",
      },
    };
    onChange(newValue);
    setSelectedTooth(null);
  };

  const updateToothNotes = (toothId: string, notes: string) => {
    const newValue = {
      ...value,
      [toothId]: {
        ...value[toothId],
        notes,
      },
    };
    onChange(newValue);
  };

  const getToothCondition = (tooth: number | string) => {
    const toothId = getToothNumber(tooth);
    const conditionId = value[toothId]?.condition || "healthy";
    return conditions.find((c) => c.id === conditionId) || conditions[0];
  };

  const renderToothButton = (tooth: number | string, index: number, isUpper: boolean) => {
    const toothId = getToothNumber(tooth);
    const condition = getToothCondition(tooth);
    const isSelected = selectedTooth === toothId;
    const hasNotes = value[toothId]?.notes;
    const isMissing = condition.id === 'missing';
    const isHealthy = condition.id === 'healthy';

    return (
      <Popover
        key={toothId}
        open={isSelected}
        onOpenChange={(open) => !open && setSelectedTooth(null)}
      >
        <PopoverTrigger asChild>
          <button
            onClick={() => handleToothClick(tooth)}
            disabled={readOnly}
            className={cn(
              "flex flex-col items-center justify-center transition-all duration-200 group",
              "w-[5.5%] aspect-square min-w-[24px] max-w-[36px]",
              "rounded-full shadow-md border-2",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
              isSelected && "scale-110 z-10 ring-2 ring-primary ring-offset-1",
              !readOnly && "hover:scale-110 hover:z-10 cursor-pointer",
              readOnly && "cursor-default opacity-80",
              isHealthy 
                ? "bg-white/90 border-border hover:border-primary hover:bg-primary/10" 
                : "border-white"
            )}
            style={{
              backgroundColor: !isHealthy ? condition.bgColor : undefined,
            }}
          >
            {/* Condition Symbol or Tooth Number */}
            <span className={cn(
              "text-[9px] sm:text-[10px] md:text-xs font-bold leading-none",
              isHealthy ? "text-muted-foreground group-hover:text-primary" : "text-white"
            )}>
              {isHealthy ? tooth : condition.symbol}
            </span>
            
            {/* Notes indicator */}
            {hasNotes && (
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-info rounded-full border border-white shadow-sm" />
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0 border-2 border-border/50 shadow-xl" align="center" side={isUpper ? "top" : "bottom"}>
          <div className="p-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg",
              )}
              style={{ backgroundColor: condition.bgColor }}
              >
                {condition.symbol}
              </div>
              <div>
                <h4 className="font-semibold text-lg">Dente {tooth}</h4>
                <Badge 
                  variant="secondary" 
                  className="mt-1 font-medium"
                  style={{ 
                    backgroundColor: `color-mix(in srgb, ${condition.bgColor} 20%, transparent)`, 
                    color: condition.borderColor,
                    borderColor: condition.borderColor
                  }}
                >
                  {condition.label}
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Condição</Label>
              <div className="grid grid-cols-5 gap-1.5">
                {conditions.map((cond) => (
                  <Tooltip key={cond.id}>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => setSelectedCondition(cond.id)}
                        className={cn(
                          "p-2 rounded-xl border-2 transition-all duration-200",
                          selectedCondition === cond.id
                            ? "border-primary bg-primary/10 scale-105 shadow-md"
                            : "border-transparent hover:border-border hover:bg-muted/50"
                        )}
                      >
                        <div
                          className="w-6 h-6 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-sm"
                          style={{ backgroundColor: cond.bgColor }}
                        >
                          {cond.symbol}
                        </div>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="text-xs font-medium">
                      {cond.label}
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Observações</Label>
              <Textarea
                placeholder="Notas sobre este dente..."
                value={value[toothId]?.notes || ""}
                onChange={(e) => updateToothNotes(toothId, e.target.value)}
                rows={2}
                className="text-sm resize-none border-border/50 focus:border-primary"
              />
            </div>
          </div>

          <div className="border-t border-border/50 p-3 bg-muted/20">
            <Button
              size="sm"
              className="w-full font-medium"
              onClick={() => applyCondition(toothId, selectedCondition)}
            >
              Aplicar Condição
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    );
  };

  // Statistics
  const stats = useMemo(() => {
    const counts: Record<string, number> = {};
    Object.values(value).forEach((v) => {
      if (v.condition && v.condition !== 'healthy') {
        counts[v.condition] = (counts[v.condition] || 0) + 1;
      }
    });
    return counts;
  }, [value]);

  const totalAffected = Object.values(stats).reduce((a, b) => a + b, 0);

  const upperTeeth = [...teeth.upperRight, ...teeth.upperLeft];
  const lowerTeeth = [...teeth.lowerLeft, ...teeth.lowerRight];

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-card rounded-xl border border-border/50 shadow-sm">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Label className="text-xs font-semibold text-muted-foreground">Notação</Label>
            <Select value={notation} onValueChange={(v) => setNotation(v as NotationSystem)}>
              <SelectTrigger className="h-8 w-28 text-xs border-border/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fdi">FDI/ISO</SelectItem>
                <SelectItem value="universal">Universal</SelectItem>
                <SelectItem value="palmer">Palmer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {notation !== "palmer" && (
            <div className="flex items-center gap-2">
              <Switch
                id="pediatric"
                checked={isPediatric}
                onCheckedChange={setIsPediatric}
                className="data-[state=checked]:bg-primary"
              />
              <Label htmlFor="pediatric" className="text-xs font-medium cursor-pointer">
                Dentição Decídua
              </Label>
            </div>
          )}
        </div>

        {totalAffected > 0 && (
          <Badge variant="secondary" className="font-medium">
            {totalAffected} dente{totalAffected !== 1 ? 's' : ''} com condição
          </Badge>
        )}
      </div>

      {/* Odontogram with Real Image */}
      <div className="relative bg-gradient-to-b from-muted/30 to-background rounded-2xl border border-border/50 shadow-sm overflow-hidden">
        {/* Real Teeth Image */}
        <div className="relative mx-auto">
          <img 
            src={odontogramImage} 
            alt="Odontograma" 
            className="w-full h-auto select-none pointer-events-none"
            draggable={false}
          />
          
          {/* Upper Teeth Row - positioned over the upper arch */}
          <div 
            className="absolute left-0 right-0 flex justify-center items-center gap-[1px] sm:gap-[2px] px-[6%] sm:px-[8%]"
            style={{ top: '18%' }}
          >
            {upperTeeth.map((tooth, idx) => renderToothButton(tooth, idx, true))}
          </div>
          
          {/* Lower Teeth Row - positioned over the lower arch */}
          <div 
            className="absolute left-0 right-0 flex justify-center items-center gap-[1px] sm:gap-[2px] px-[6%] sm:px-[8%]"
            style={{ bottom: '18%' }}
          >
            {lowerTeeth.map((tooth, idx) => renderToothButton(tooth, idx, false))}
          </div>
        </div>
        
        {/* Arcade Labels */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-0">
          <span className="text-[10px] sm:text-xs font-bold text-primary/60 uppercase tracking-widest bg-background/80 px-2 py-0.5 rounded">
            Arcada Superior
          </span>
        </div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-0">
          <span className="text-[10px] sm:text-xs font-bold text-primary/60 uppercase tracking-widest bg-background/80 px-2 py-0.5 rounded">
            Arcada Inferior
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="p-4 bg-card rounded-xl border border-border/50 shadow-sm">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {conditions.map((cond) => {
            const count = stats[cond.id] || 0;
            return (
              <div
                key={cond.id}
                className={cn(
                  "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all",
                  "border bg-background",
                  count > 0 ? "border-border shadow-sm" : "border-transparent opacity-60"
                )}
              >
                <div
                  className="w-5 h-5 rounded-md flex items-center justify-center text-white text-[10px] font-bold shadow-sm"
                  style={{ backgroundColor: cond.bgColor }}
                >
                  {cond.symbol}
                </div>
                <span className="text-xs font-medium text-foreground">{cond.label}</span>
                {count > 0 && (
                  <Badge variant="secondary" className="h-4 px-1.5 text-[10px] ml-1">
                    {count}
                  </Badge>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}