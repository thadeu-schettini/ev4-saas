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
  color: string;
  fillColor: string;
  strokeColor: string;
  symbol: string;
}

const conditions: ToothCondition[] = [
  { id: "healthy", label: "Saudável", color: "hsl(var(--success))", fillColor: "#22c55e", strokeColor: "#16a34a", symbol: "✓" },
  { id: "caries", label: "Cárie", color: "hsl(var(--destructive))", fillColor: "#ef4444", strokeColor: "#dc2626", symbol: "C" },
  { id: "restored", label: "Restaurado", color: "hsl(var(--info))", fillColor: "#3b82f6", strokeColor: "#2563eb", symbol: "R" },
  { id: "missing", label: "Ausente", color: "hsl(var(--muted-foreground))", fillColor: "#9ca3af", strokeColor: "#6b7280", symbol: "X" },
  { id: "crown", label: "Coroa", color: "hsl(var(--warning))", fillColor: "#f59e0b", strokeColor: "#d97706", symbol: "C" },
  { id: "implant", label: "Implante", color: "#8b5cf6", fillColor: "#8b5cf6", strokeColor: "#7c3aed", symbol: "I" },
  { id: "rootCanal", label: "Canal", color: "#f97316", fillColor: "#f97316", strokeColor: "#ea580c", symbol: "E" },
  { id: "extraction", label: "Extração", color: "#dc2626", fillColor: "#dc2626", strokeColor: "#b91c1c", symbol: "!" },
  { id: "fracture", label: "Fratura", color: "#f43f5e", fillColor: "#f43f5e", strokeColor: "#e11d48", symbol: "F" },
  { id: "mobility", label: "Mobilidade", color: "#eab308", fillColor: "#eab308", strokeColor: "#ca8a04", symbol: "M" },
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

// SVG Tooth Shapes - Anatomically inspired
const ToothSVG = ({ 
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
  const baseColor = isMissing ? "#e5e7eb" : "#f0fdf4";
  const strokeColor = condition.id === 'healthy' ? "#22c55e" : condition.strokeColor;
  const fillColor = condition.id === 'healthy' ? baseColor : `${condition.fillColor}30`;
  
  // Different tooth shapes based on type
  const paths = {
    molar: isUpper 
      ? "M4,28 L4,10 C4,4 8,2 12,2 L28,2 C32,2 36,4 36,10 L36,28 C36,32 32,38 28,42 L24,48 L20,42 L16,48 L12,42 C8,38 4,32 4,28 Z"
      : "M4,12 C4,8 8,2 12,2 L16,8 L20,2 L24,8 L28,2 C32,2 36,8 36,12 L36,30 C36,36 32,42 28,42 L12,42 C8,42 4,36 4,30 Z",
    premolar: isUpper
      ? "M6,26 L6,12 C6,6 10,2 16,2 L24,2 C30,2 34,6 34,12 L34,26 C34,32 30,40 26,44 L20,48 L14,44 C10,40 6,32 6,26 Z"
      : "M6,14 C6,8 10,2 14,2 L20,6 L26,2 C30,2 34,8 34,14 L34,28 C34,36 30,42 24,42 L16,42 C10,42 6,36 6,28 Z",
    canine: isUpper
      ? "M8,24 L8,14 C8,6 12,2 20,2 C28,2 32,6 32,14 L32,24 C32,32 26,44 20,48 C14,44 8,32 8,24 Z"
      : "M8,16 C8,8 14,2 20,2 C26,2 32,8 32,16 L32,26 C32,34 28,42 20,42 C12,42 8,34 8,26 Z",
    incisor: isUpper
      ? "M10,22 L10,14 C10,6 14,2 20,2 C26,2 30,6 30,14 L30,22 C30,30 26,40 20,44 C14,40 10,30 10,22 Z"
      : "M10,18 C10,10 14,2 20,2 C26,2 30,10 30,18 L30,26 C30,34 26,42 20,42 C14,42 10,34 10,26 Z",
  };

  return (
    <svg viewBox="0 0 40 50" className="w-full h-full">
      <defs>
        <linearGradient id={`toothGrad-${type}-${isUpper}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={fillColor} />
          <stop offset="100%" stopColor={isMissing ? "#d1d5db" : fillColor} />
        </linearGradient>
        <filter id="toothShadow">
          <feDropShadow dx="0" dy="1" stdDeviation="1" floodOpacity="0.15"/>
        </filter>
      </defs>
      <path
        d={paths[type]}
        fill={`url(#toothGrad-${type}-${isUpper})`}
        stroke={strokeColor}
        strokeWidth={isSelected ? 3 : 2}
        filter="url(#toothShadow)"
        className="transition-all duration-200"
      />
      {/* Crown surface lines for molars/premolars */}
      {(type === 'molar' || type === 'premolar') && (
        <g stroke={strokeColor} strokeWidth="0.5" opacity="0.4">
          {isUpper ? (
            <>
              <line x1="14" y1="8" x2="26" y2="8" />
              <line x1="12" y1="14" x2="28" y2="14" />
            </>
          ) : (
            <>
              <line x1="14" y1="36" x2="26" y2="36" />
              <line x1="12" y1="30" x2="28" y2="30" />
            </>
          )}
        </g>
      )}
      {/* Condition symbol */}
      {condition.id !== 'healthy' && !isMissing && (
        <text
          x="20"
          y={isUpper ? "22" : "24"}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={condition.strokeColor}
          fontSize="12"
          fontWeight="bold"
        >
          {condition.symbol}
        </text>
      )}
      {/* Missing X */}
      {isMissing && (
        <g stroke="#9ca3af" strokeWidth="2" opacity="0.6">
          <line x1="12" y1="12" x2="28" y2="38" />
          <line x1="28" y1="12" x2="12" y2="38" />
        </g>
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
              "w-8 h-14 sm:w-10 sm:h-16",
              "focus:outline-none",
              isSelected && "scale-110 z-10",
              !readOnly && "hover:scale-105 hover:z-10",
              readOnly && "cursor-default"
            )}
          >
            {/* Tooth SVG */}
            <div className={cn(
              "w-full h-10 sm:h-12 relative",
              isSelected && "drop-shadow-lg"
            )}>
              <ToothSVG 
                type={toothType} 
                isUpper={isUpper} 
                condition={condition}
                isSelected={isSelected}
                isMissing={isMissing}
              />
              {/* Notes indicator */}
              {hasNotes && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-background shadow-sm" />
              )}
            </div>
            
            {/* Tooth number */}
            <span className={cn(
              "text-[10px] sm:text-xs font-semibold mt-0.5 transition-colors",
              condition.id !== 'healthy' ? "text-foreground" : "text-muted-foreground",
              "group-hover:text-primary"
            )}>
              {tooth}
            </span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0" align="center" side="top">
          <div className="p-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-14">
                <ToothSVG 
                  type={toothType} 
                  isUpper={isUpper} 
                  condition={condition}
                  isSelected={false}
                  isMissing={isMissing}
                />
              </div>
              <div>
                <h4 className="font-semibold">Dente {tooth}</h4>
                <Badge 
                  variant="secondary" 
                  className="mt-1"
                  style={{ backgroundColor: `${condition.fillColor}20`, color: condition.strokeColor }}
                >
                  {condition.label}
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-semibold">Condição</Label>
              <div className="grid grid-cols-5 gap-1">
                {conditions.map((cond) => (
                  <Tooltip key={cond.id}>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => setSelectedCondition(cond.id)}
                        className={cn(
                          "p-2 rounded-lg border-2 transition-all",
                          selectedCondition === cond.id
                            ? "border-primary bg-primary/10 scale-105"
                            : "border-transparent hover:border-border hover:bg-muted/50"
                        )}
                      >
                        <div
                          className="w-5 h-5 rounded-md flex items-center justify-center text-white text-[10px] font-bold"
                          style={{ backgroundColor: cond.fillColor }}
                        >
                          {cond.symbol}
                        </div>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="text-xs">
                      {cond.label}
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-semibold">Observações</Label>
              <Textarea
                placeholder="Notas sobre este dente..."
                value={value[toothId]?.notes || ""}
                onChange={(e) => updateToothNotes(toothId, e.target.value)}
                rows={2}
                className="text-sm resize-none"
              />
            </div>
          </div>

          <div className="border-t p-3 bg-muted/30">
            <Button
              size="sm"
              className="w-full"
              onClick={() => applyCondition(toothId, selectedCondition)}
            >
              Aplicar
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
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-gradient-to-r from-success/5 via-transparent to-transparent rounded-xl border border-border/50">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <Label className="text-xs font-semibold">Notação</Label>
            <Select value={notation} onValueChange={(v: NotationSystem) => setNotation(v)}>
              <SelectTrigger className="w-[130px] h-9 text-sm bg-background">
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
                Decídua
              </Label>
            </div>
          )}
        </div>

        {totalAffected > 0 && (
          <Badge variant="secondary" className="text-xs px-3 py-1">
            {totalAffected} alteraç{totalAffected === 1 ? 'ão' : 'ões'}
          </Badge>
        )}
      </div>

      {/* Odontogram Grid */}
      <div className="bg-gradient-to-b from-card via-card/50 to-transparent rounded-2xl border border-border/50 p-4 sm:p-6">
        {/* Upper Arch */}
        <div className="mb-2">
          <div className="text-[10px] font-medium text-muted-foreground text-center mb-2">
            Arcada Superior
          </div>
          <div className="flex justify-center items-end gap-0.5 sm:gap-1">
            {(teeth.upperRight as (number | string)[]).map((tooth) => renderTooth(tooth, true))}
            <div className="w-px h-12 bg-primary/30 mx-1 hidden sm:block" />
            {(teeth.upperLeft as (number | string)[]).map((tooth) => renderTooth(tooth, true))}
          </div>
        </div>

        {/* Center Line */}
        <div className="flex items-center justify-center gap-4 my-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-muted/50 border border-border/50">
            <div className="w-2 h-2 rounded-full bg-primary/50" />
            <span className="text-[11px] font-medium text-muted-foreground">Linha Média</span>
            <div className="w-2 h-2 rounded-full bg-primary/50" />
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

        {/* Lower Arch */}
        <div className="mt-2">
          <div className="flex justify-center items-start gap-0.5 sm:gap-1">
            {(teeth.lowerRight as (number | string)[]).map((tooth) => renderTooth(tooth, false))}
            <div className="w-px h-12 bg-primary/30 mx-1 hidden sm:block" />
            {(teeth.lowerLeft as (number | string)[]).map((tooth) => renderTooth(tooth, false))}
          </div>
          <div className="text-[10px] font-medium text-muted-foreground text-center mt-2">
            Arcada Inferior
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-2">
        {conditions.slice(0, 6).map((cond) => (
          <div 
            key={cond.id} 
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all",
              stats[cond.id] || cond.id === 'healthy'
                ? "bg-card border border-border/50 shadow-sm" 
                : "opacity-50"
            )}
          >
            <div
              className="w-4 h-4 rounded flex items-center justify-center text-white text-[9px] font-bold"
              style={{ backgroundColor: cond.fillColor }}
            >
              {cond.symbol}
            </div>
            <span className="text-xs font-medium">{cond.label}</span>
            {stats[cond.id] && (
              <Badge variant="secondary" className="h-5 px-1.5 text-[10px]">
                {stats[cond.id]}
              </Badge>
            )}
          </div>
        ))}
      </div>

      {/* Summary Cards */}
      {totalAffected > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {Object.entries(stats).map(([conditionId, count]) => {
            const cond = conditions.find(c => c.id === conditionId);
            if (!cond) return null;
            return (
              <div 
                key={conditionId} 
                className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-shadow"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-sm font-bold shrink-0"
                  style={{ backgroundColor: cond.fillColor }}
                >
                  {cond.symbol}
                </div>
                <div className="min-w-0">
                  <div className="text-xl font-bold">{count}</div>
                  <div className="text-[10px] text-muted-foreground truncate">{cond.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}