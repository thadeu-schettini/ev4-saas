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

// FDI/ISO notation
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

// Universal (ADA) notation
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

// Palmer notation
const palmerAdultTeeth = {
  upperRight: ["8┘", "7┘", "6┘", "5┘", "4┘", "3┘", "2┘", "1┘"],
  upperLeft: ["┗1", "┗2", "┗3", "┗4", "┗5", "┗6", "┗7", "┗8"],
  lowerLeft: ["┏1", "┏2", "┏3", "┏4", "┏5", "┏6", "┏7", "┏8"],
  lowerRight: ["8┐", "7┐", "6┐", "5┐", "4┐", "3┐", "2┐", "1┐"],
};

// Tooth type classification for shapes
const getToothType = (toothNum: number | string): 'molar' | 'premolar' | 'canine' | 'incisor' => {
  const num = typeof toothNum === 'number' ? toothNum : parseInt(String(toothNum).replace(/\D/g, ''));
  const lastDigit = num % 10;
  
  if (lastDigit >= 6 && lastDigit <= 8) return 'molar';
  if (lastDigit >= 4 && lastDigit <= 5) return 'premolar';
  if (lastDigit === 3) return 'canine';
  return 'incisor';
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

// Realistic SVG Tooth Shapes
const RealisticToothSVG = ({ 
  type, 
  isUpper, 
  condition, 
  isSelected,
  isMissing 
}: { 
  type: 'molar' | 'premolar' | 'canine' | 'incisor';
  isUpper: boolean;
  condition: ToothCondition;
  isSelected: boolean;
  isMissing: boolean;
}) => {
  const isHealthy = condition.id === 'healthy';
  const fillColor = isMissing ? "hsl(var(--muted))" : isHealthy ? "hsl(var(--success-light))" : `${condition.bgColor}`;
  const strokeColor = isMissing ? "hsl(var(--muted-foreground))" : isHealthy ? "hsl(var(--success))" : condition.borderColor;
  
  // Anatomically realistic tooth paths
  const toothPaths = {
    molar: {
      upper: {
        crown: "M6,24 C6,18 8,14 10,12 C12,10 14,8 20,8 C26,8 28,10 30,12 C32,14 34,18 34,24 L34,28 C34,30 32,32 30,32 L10,32 C8,32 6,30 6,28 Z",
        roots: "M12,32 L10,48 C10,50 11,52 12,52 L14,52 C15,52 16,50 16,48 L15,38 M18,32 L18,46 C18,48 19,50 20,50 L20,50 C21,50 22,48 22,46 L22,38 M24,32 L25,48 C25,50 26,52 27,52 L28,52 C29,52 30,50 30,48 L28,32",
        surface: "M10,16 L14,18 L20,16 L26,18 L30,16"
      },
      lower: {
        crown: "M6,20 L6,16 C6,14 8,12 10,12 L30,12 C32,12 34,14 34,16 L34,20 C34,26 32,30 30,32 C28,34 26,36 20,36 C14,36 12,34 10,32 C8,30 6,26 6,20 Z",
        roots: "M14,36 L12,50 C12,52 13,54 14,54 L16,54 C17,54 18,52 18,50 L16,40 M24,36 L26,50 C26,52 27,54 28,54 L30,54 C31,54 32,52 32,50 L28,36",
        surface: "M10,28 L14,26 L20,28 L26,26 L30,28"
      }
    },
    premolar: {
      upper: {
        crown: "M10,24 C10,18 12,12 16,10 C18,9 22,9 24,10 C28,12 30,18 30,24 L30,28 C30,30 28,32 26,32 L14,32 C12,32 10,30 10,28 Z",
        roots: "M16,32 L14,48 C14,50 15,52 16,52 L18,52 C19,52 20,50 20,48 L18,38 M22,32 L24,48 C24,50 25,52 26,52 L27,52 C28,52 29,50 29,48 L26,32",
        surface: "M14,16 L20,14 L26,16"
      },
      lower: {
        crown: "M10,18 L10,16 C10,14 12,12 14,12 L26,12 C28,12 30,14 30,16 L30,18 C30,24 28,28 26,30 C24,32 22,34 20,34 C18,34 16,32 14,30 C12,28 10,24 10,18 Z",
        roots: "M18,34 L16,50 C16,52 17,54 18,54 L22,54 C23,54 24,52 24,50 L22,34",
        surface: "M14,24 L20,22 L26,24"
      }
    },
    canine: {
      upper: {
        crown: "M12,22 C12,16 14,10 18,8 C19,7 21,7 22,8 C26,10 28,16 28,22 L28,28 C28,30 26,32 24,32 L16,32 C14,32 12,30 12,28 Z",
        roots: "M18,32 L16,52 C16,54 17,56 20,56 C23,56 24,54 24,52 L22,32",
        surface: ""
      },
      lower: {
        crown: "M12,18 L12,16 C12,14 14,12 16,12 L24,12 C26,12 28,14 28,16 L28,18 C28,24 26,28 24,30 C22,32 21,34 20,34 C19,34 18,32 16,30 C14,28 12,24 12,18 Z",
        roots: "M18,34 L16,52 C16,54 17,56 20,56 C23,56 24,54 24,52 L22,34",
        surface: ""
      }
    },
    incisor: {
      upper: {
        crown: "M14,20 C14,14 16,10 18,9 C19,8 21,8 22,9 C24,10 26,14 26,20 L26,28 C26,30 24,32 22,32 L18,32 C16,32 14,30 14,28 Z",
        roots: "M18,32 L17,50 C17,52 18,54 20,54 C22,54 23,52 23,50 L22,32",
        surface: ""
      },
      lower: {
        crown: "M14,18 L14,16 C14,14 16,12 18,12 L22,12 C24,12 26,14 26,16 L26,18 C26,24 24,28 22,30 C21,31 19,31 18,30 C16,28 14,24 14,18 Z",
        roots: "M18,30 L17,48 C17,50 18,52 20,52 C22,52 23,50 23,48 L22,30",
        surface: ""
      }
    }
  };

  const position = isUpper ? 'upper' : 'lower';
  const paths = toothPaths[type][position];

  return (
    <svg viewBox="0 0 40 60" className="w-full h-full">
      <defs>
        <linearGradient id={`toothFill-${type}-${isUpper}-${condition.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={isMissing ? "hsl(var(--muted))" : isHealthy ? "hsl(142 76% 95%)" : fillColor} stopOpacity={isHealthy ? 1 : 0.3} />
          <stop offset="100%" stopColor={isMissing ? "hsl(var(--muted))" : isHealthy ? "hsl(142 76% 90%)" : fillColor} stopOpacity={isHealthy ? 1 : 0.5} />
        </linearGradient>
        <filter id="toothShadow">
          <feDropShadow dx="0" dy="1" stdDeviation="1" floodOpacity="0.1"/>
        </filter>
      </defs>
      
      {/* Roots */}
      <path
        d={paths.roots}
        fill="none"
        stroke={strokeColor}
        strokeWidth={isSelected ? 2.5 : 1.5}
        strokeLinecap="round"
        opacity={isMissing ? 0.3 : 0.7}
      />
      
      {/* Crown */}
      <path
        d={paths.crown}
        fill={`url(#toothFill-${type}-${isUpper}-${condition.id})`}
        stroke={strokeColor}
        strokeWidth={isSelected ? 2.5 : 1.5}
        filter="url(#toothShadow)"
        className="transition-all duration-200"
      />
      
      {/* Surface detail lines */}
      {paths.surface && (
        <path
          d={paths.surface}
          fill="none"
          stroke={strokeColor}
          strokeWidth="0.8"
          opacity="0.4"
          strokeLinecap="round"
        />
      )}
      
      {/* Missing X mark */}
      {isMissing && (
        <g stroke="hsl(var(--muted-foreground))" strokeWidth="2" opacity="0.5" strokeLinecap="round">
          <line x1="14" y1="16" x2="26" y2="28" />
          <line x1="26" y1="16" x2="14" y2="28" />
        </g>
      )}
      
      {/* Condition indicator */}
      {!isHealthy && !isMissing && (
        <circle
          cx="20"
          cy="22"
          r="6"
          fill={condition.bgColor}
          stroke="white"
          strokeWidth="1.5"
          opacity="0.9"
        />
      )}
    </svg>
  );
};

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

  const renderTooth = (tooth: number | string, isUpper: boolean) => {
    const toothId = getToothNumber(tooth);
    const condition = getToothCondition(tooth);
    const toothType = getToothType(tooth);
    const isSelected = selectedTooth === toothId;
    const hasNotes = value[toothId]?.notes;
    const isMissing = condition.id === 'missing';

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
              "relative flex flex-col items-center transition-all duration-200 group",
              "w-7 h-16 sm:w-9 sm:h-20 md:w-10 md:h-24",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg",
              isSelected && "scale-110 z-10",
              !readOnly && "hover:scale-105 hover:z-10",
              readOnly && "cursor-default"
            )}
          >
            {/* Tooth SVG */}
            <div className={cn(
              "w-full flex-1 relative",
              isSelected && "drop-shadow-lg"
            )}>
              <RealisticToothSVG 
                type={toothType} 
                isUpper={isUpper} 
                condition={condition}
                isSelected={isSelected}
                isMissing={isMissing}
              />
              {/* Notes indicator */}
              {hasNotes && (
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-primary rounded-full border border-background shadow-sm" />
              )}
            </div>
            
            {/* Tooth number */}
            <span className={cn(
              "text-[9px] sm:text-[10px] md:text-xs font-semibold transition-colors mt-0.5",
              condition.id !== 'healthy' ? "text-foreground" : "text-muted-foreground",
              "group-hover:text-primary"
            )}>
              {tooth}
            </span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0 border-2 border-border/50 shadow-xl" align="center" side="top">
          <div className="p-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-20">
                <RealisticToothSVG 
                  type={toothType} 
                  isUpper={isUpper} 
                  condition={condition}
                  isSelected={false}
                  isMissing={isMissing}
                />
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

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-card rounded-xl border border-border/50 shadow-sm">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Label className="text-xs font-semibold text-muted-foreground">Notação</Label>
            <Select value={notation} onValueChange={(v: NotationSystem) => setNotation(v)}>
              <SelectTrigger className="w-[130px] h-9 text-sm bg-background border-border/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fdi">FDI/ISO</SelectItem>
                <SelectItem value="universal">Universal (ADA)</SelectItem>
                <SelectItem value="palmer">Palmer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {notation !== "palmer" && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background border border-border/50">
              <Switch
                checked={isPediatric}
                onCheckedChange={setIsPediatric}
                id="pediatric"
              />
              <Label htmlFor="pediatric" className="text-xs font-medium cursor-pointer">
                Dentição Decídua
              </Label>
            </div>
          )}
        </div>

        {totalAffected > 0 && (
          <Badge variant="secondary" className="text-xs px-3 py-1.5 font-medium">
            {totalAffected} alteraç{totalAffected === 1 ? 'ão' : 'ões'}
          </Badge>
        )}
      </div>

      {/* Odontogram Grid */}
      <div className="bg-card rounded-2xl border border-border/50 shadow-sm p-4 sm:p-6 overflow-x-auto">
        <div className="min-w-[320px]">
          {/* Upper Arch Label */}
          <div className="text-xs font-semibold text-success text-center mb-2 tracking-wide">
            ARCADA SUPERIOR
          </div>
          
          {/* Upper Teeth Row */}
          <div className="flex justify-center items-end gap-0.5 sm:gap-1">
            <div className="flex items-end gap-0.5 sm:gap-1">
              {(teeth.upperRight as (number | string)[]).map((tooth) => renderTooth(tooth, true))}
            </div>
            <div className="w-px h-20 bg-primary/20 mx-1 sm:mx-2 hidden sm:block" />
            <div className="flex items-end gap-0.5 sm:gap-1">
              {(teeth.upperLeft as (number | string)[]).map((tooth) => renderTooth(tooth, true))}
            </div>
          </div>

          {/* Center Divider with Linha Média */}
          <div className="flex items-center justify-center gap-4 my-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-success/30 to-transparent" />
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-success/10 border border-success/30">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-[11px] font-semibold text-success">Linha Média</span>
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-success/30 to-transparent" />
          </div>

          {/* Lower Teeth Row */}
          <div className="flex justify-center items-start gap-0.5 sm:gap-1">
            <div className="flex items-start gap-0.5 sm:gap-1">
              {(teeth.lowerRight as (number | string)[]).map((tooth) => renderTooth(tooth, false))}
            </div>
            <div className="w-px h-20 bg-primary/20 mx-1 sm:mx-2 hidden sm:block" />
            <div className="flex items-start gap-0.5 sm:gap-1">
              {(teeth.lowerLeft as (number | string)[]).map((tooth) => renderTooth(tooth, false))}
            </div>
          </div>
          
          {/* Lower Arch Label */}
          <div className="text-xs font-semibold text-success text-center mt-2 tracking-wide">
            ARCADA INFERIOR
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
        {conditions.map((cond) => (
          <div 
            key={cond.id}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card border border-border/50 shadow-sm"
          >
            <div
              className="w-4 h-4 rounded flex items-center justify-center text-white text-[9px] font-bold"
              style={{ backgroundColor: cond.bgColor }}
            >
              {cond.symbol}
            </div>
            <span className="text-xs font-medium text-muted-foreground">{cond.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
