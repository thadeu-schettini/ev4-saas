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
import { Check, Info, X, CircleDot, Crown, Wrench, Zap, AlertTriangle, Move } from "lucide-react";

type NotationSystem = "fdi" | "universal" | "palmer";

interface ToothCondition {
  id: string;
  label: string;
  color: string;
  bgClass: string;
  borderClass: string;
  icon: React.ReactNode;
}

const conditions: ToothCondition[] = [
  { id: "healthy", label: "Saudável", color: "hsl(var(--success))", bgClass: "bg-success/10", borderClass: "border-success/40", icon: <Check className="w-3 h-3" /> },
  { id: "caries", label: "Cárie", color: "hsl(var(--destructive))", bgClass: "bg-destructive/10", borderClass: "border-destructive/40", icon: <CircleDot className="w-3 h-3" /> },
  { id: "restored", label: "Restaurado", color: "hsl(var(--info))", bgClass: "bg-info/10", borderClass: "border-info/40", icon: <Wrench className="w-3 h-3" /> },
  { id: "missing", label: "Ausente", color: "hsl(var(--muted-foreground))", bgClass: "bg-muted/30", borderClass: "border-muted-foreground/30", icon: <X className="w-3 h-3" /> },
  { id: "crown", label: "Coroa", color: "hsl(var(--warning))", bgClass: "bg-warning/10", borderClass: "border-warning/40", icon: <Crown className="w-3 h-3" /> },
  { id: "implant", label: "Implante", color: "hsl(142 76% 36%)", bgClass: "bg-emerald-500/10", borderClass: "border-emerald-500/40", icon: <Zap className="w-3 h-3" /> },
  { id: "rootCanal", label: "Canal", color: "hsl(24 95% 53%)", bgClass: "bg-orange-500/10", borderClass: "border-orange-500/40", icon: <Zap className="w-3 h-3" /> },
  { id: "extraction", label: "Extração", color: "hsl(var(--destructive))", bgClass: "bg-destructive/20", borderClass: "border-destructive/60", icon: <AlertTriangle className="w-3 h-3" /> },
  { id: "fracture", label: "Fratura", color: "hsl(346 77% 50%)", bgClass: "bg-rose-500/10", borderClass: "border-rose-500/40", icon: <AlertTriangle className="w-3 h-3" /> },
  { id: "mobility", label: "Mobilidade", color: "hsl(45 93% 47%)", bgClass: "bg-yellow-500/10", borderClass: "border-yellow-500/40", icon: <Move className="w-3 h-3" /> },
];

// FDI/ISO notation (most common in Brazil)
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

interface ToothData {
  condition: string;
  notes: string;
  surfaces?: {
    mesial?: string;
    distal?: string;
    oclusal?: string;
    vestibular?: string;
    lingual?: string;
  };
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

  const applyCondition = (toothId: string, conditionId: string, notes?: string) => {
    const newValue = {
      ...value,
      [toothId]: {
        ...value[toothId],
        condition: conditionId,
        notes: notes || value[toothId]?.notes || "",
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
    return value[toothId]?.condition || "healthy";
  };

  const getConditionData = (conditionId: string) => {
    return conditions.find((c) => c.id === conditionId) || conditions[0];
  };

  // Tooth shape SVG - more realistic tooth representation
  const ToothShape = ({ isUpper, condition, toothNumber }: { isUpper: boolean; condition: ToothCondition; toothNumber: string | number }) => {
    const isMolar = typeof toothNumber === 'number' && (
      (toothNumber >= 14 && toothNumber <= 18) || 
      (toothNumber >= 24 && toothNumber <= 28) ||
      (toothNumber >= 34 && toothNumber <= 38) ||
      (toothNumber >= 44 && toothNumber <= 48)
    );
    
    return (
      <svg viewBox="0 0 24 32" className="w-full h-full">
        {/* Tooth root(s) */}
        <defs>
          <linearGradient id={`toothGrad-${toothNumber}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: condition.id === 'missing' ? 'hsl(var(--muted))' : 'hsl(var(--background))', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: condition.id === 'missing' ? 'hsl(var(--muted))' : 'hsl(var(--accent))', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        
        {isUpper ? (
          <>
            {/* Upper tooth - roots at top */}
            {isMolar ? (
              <path d="M8 0 L6 10 L4 10 L2 0 M16 0 L18 10 L20 10 L22 0" 
                className="stroke-border" 
                fill="none" 
                strokeWidth="1.5" 
                opacity={condition.id === 'missing' ? 0.3 : 0.6} 
              />
            ) : (
              <path d="M12 0 L12 8" 
                className="stroke-border" 
                strokeWidth="2" 
                opacity={condition.id === 'missing' ? 0.3 : 0.6} 
              />
            )}
            {/* Crown */}
            <rect 
              x="2" y="10" 
              width="20" height="20" 
              rx="3" 
              fill={`url(#toothGrad-${toothNumber})`}
              className={cn("stroke-2", condition.borderClass)}
              style={{ stroke: condition.color }}
            />
          </>
        ) : (
          <>
            {/* Crown */}
            <rect 
              x="2" y="2" 
              width="20" height="20" 
              rx="3" 
              fill={`url(#toothGrad-${toothNumber})`}
              className={cn("stroke-2", condition.borderClass)}
              style={{ stroke: condition.color }}
            />
            {/* Lower tooth - roots at bottom */}
            {isMolar ? (
              <path d="M8 32 L6 22 L4 22 L2 32 M16 32 L18 22 L20 22 L22 32" 
                className="stroke-border" 
                fill="none" 
                strokeWidth="1.5" 
                opacity={condition.id === 'missing' ? 0.3 : 0.6} 
              />
            ) : (
              <path d="M12 32 L12 24" 
                className="stroke-border" 
                strokeWidth="2" 
                opacity={condition.id === 'missing' ? 0.3 : 0.6} 
              />
            )}
          </>
        )}
      </svg>
    );
  };

  const renderTooth = (tooth: number | string, isUpper: boolean) => {
    const toothId = getToothNumber(tooth);
    const conditionData = getConditionData(getToothCondition(tooth));
    const isSelected = selectedTooth === toothId;
    const hasNotes = value[toothId]?.notes;
    const hasCondition = value[toothId]?.condition && value[toothId]?.condition !== 'healthy';

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
              "relative w-7 h-10 sm:w-9 sm:h-12 flex flex-col items-center transition-all duration-200 group",
              "hover:scale-110 hover:z-10 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg",
              isSelected && "scale-110 z-10",
              conditionData.id === "missing" && "opacity-50",
              readOnly && "cursor-default hover:scale-100"
            )}
          >
            {/* Tooth shape */}
            <div className={cn(
              "w-full h-8 sm:h-10 relative transition-all",
              hasCondition && conditionData.bgClass,
              "rounded-md"
            )}>
              <ToothShape isUpper={isUpper} condition={conditionData} toothNumber={tooth} />
              
              {/* Condition indicator */}
              {hasCondition && (
                <div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: conditionData.color, color: 'white' }}
                >
                  {conditionData.icon}
                </div>
              )}
            </div>
            
            {/* Tooth number */}
            <span className={cn(
              "text-[9px] sm:text-[10px] font-medium mt-0.5 transition-colors",
              hasCondition ? "text-foreground" : "text-muted-foreground",
              "group-hover:text-primary"
            )}>
              {tooth}
            </span>
            
            {/* Notes indicator */}
            {hasNotes && (
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-primary rounded-full ring-2 ring-background" />
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0" align="center">
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: conditionData.color + '20', color: conditionData.color }}
                >
                  {conditionData.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Dente {tooth}</h4>
                  <span className="text-xs text-muted-foreground">{conditionData.label}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-medium">Condição</Label>
              <div className="grid grid-cols-5 gap-1.5">
                {conditions.map((cond) => (
                  <Tooltip key={cond.id}>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => setSelectedCondition(cond.id)}
                        className={cn(
                          "p-2 rounded-lg border-2 transition-all",
                          selectedCondition === cond.id
                            ? "border-primary ring-2 ring-primary/20 scale-105"
                            : "border-transparent hover:border-border hover:bg-muted/50"
                        )}
                      >
                        <div
                          className="w-5 h-5 mx-auto rounded-md flex items-center justify-center text-white"
                          style={{ backgroundColor: cond.color }}
                        >
                          {cond.icon}
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
              <Label className="text-xs font-medium">Observações</Label>
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
              <Check className="w-4 h-4 mr-2" />
              Aplicar Condição
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    );
  };

  const renderArch = (leftTeeth: (number | string)[], rightTeeth: (number | string)[], label: string, isUpper: boolean) => (
    <div className="relative">
      {/* Arch label */}
      <div className="absolute -left-8 top-1/2 -translate-y-1/2 hidden sm:block">
        <span className="text-[10px] font-medium text-muted-foreground writing-mode-vertical transform -rotate-180"
          style={{ writingMode: 'vertical-rl' }}>
          {label}
        </span>
      </div>
      
      {/* Arch curve background */}
      <div className={cn(
        "absolute inset-x-4 h-1/2 rounded-full border border-dashed border-muted-foreground/20",
        isUpper ? "bottom-2 border-t-0 rounded-t-none" : "top-2 border-b-0 rounded-b-none"
      )} />
      
      {/* Teeth */}
      <div className="flex justify-center items-center gap-0.5 sm:gap-1 py-2">
        {rightTeeth.map((tooth) => renderTooth(tooth, isUpper))}
        <div className="w-px h-8 bg-primary/20 mx-1 hidden sm:block" />
        {leftTeeth.map((tooth) => renderTooth(tooth, isUpper))}
      </div>
    </div>
  );

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
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-gradient-to-r from-muted/50 to-transparent rounded-xl border border-border/50">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <Label className="text-xs font-medium whitespace-nowrap">Notação</Label>
            <Select value={notation} onValueChange={(v: NotationSystem) => setNotation(v)}>
              <SelectTrigger className="w-[130px] h-8 text-xs bg-background">
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
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background border border-border/50">
              <Switch
                checked={isPediatric}
                onCheckedChange={setIsPediatric}
                id="pediatric"
                className="scale-90"
              />
              <Label htmlFor="pediatric" className="text-xs font-medium cursor-pointer">
                Decidídua
              </Label>
            </div>
          )}
        </div>

        {totalAffected > 0 && (
          <Badge variant="secondary" className="text-xs">
            {totalAffected} {totalAffected === 1 ? 'alteração' : 'alterações'}
          </Badge>
        )}
      </div>

      {/* Odontogram */}
      <div className="relative bg-gradient-to-b from-card/80 via-card/40 to-transparent rounded-2xl p-4 sm:p-6 border border-border/50 backdrop-blur-sm">
        {/* Upper Arch */}
        {renderArch(
          teeth.upperLeft as (number | string)[],
          teeth.upperRight as (number | string)[],
          "Arcada Superior",
          true
        )}

        {/* Midline */}
        <div className="flex items-center justify-center gap-3 my-3">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-muted/50 border border-border/50">
            <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
            <span className="text-[10px] font-medium text-muted-foreground">Linha Média</span>
            <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

        {/* Lower Arch */}
        {renderArch(
          teeth.lowerLeft as (number | string)[],
          teeth.lowerRight as (number | string)[],
          "Arcada Inferior",
          false
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-2">
        {conditions.slice(0, 6).map((cond) => (
          <div 
            key={cond.id} 
            className={cn(
              "flex items-center gap-1.5 px-2 py-1 rounded-md text-xs transition-all",
              stats[cond.id] ? "bg-muted border border-border/50" : "opacity-60"
            )}
          >
            <div
              className="w-3.5 h-3.5 rounded flex items-center justify-center text-white"
              style={{ backgroundColor: cond.color }}
            >
              {cond.icon}
            </div>
            <span className="text-muted-foreground">{cond.label}</span>
            {stats[cond.id] && (
              <Badge variant="secondary" className="h-4 px-1.5 text-[10px] ml-1">
                {stats[cond.id]}
              </Badge>
            )}
          </div>
        ))}
      </div>

      {/* Summary */}
      {totalAffected > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {Object.entries(stats).map(([conditionId, count]) => {
            const condition = getConditionData(conditionId);
            return (
              <div 
                key={conditionId} 
                className={cn(
                  "flex items-center gap-2 p-3 rounded-xl border transition-all hover:scale-[1.02]",
                  condition.bgClass, condition.borderClass
                )}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0"
                  style={{ backgroundColor: condition.color }}
                >
                  {condition.icon}
                </div>
                <div className="min-w-0">
                  <div className="text-lg font-bold leading-none">{count}</div>
                  <div className="text-[10px] text-muted-foreground truncate">{condition.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}