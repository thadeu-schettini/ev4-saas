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

type NotationSystem = "fdi" | "universal" | "palmer";

interface ToothCondition {
  id: string;
  label: string;
  color: string;
  symbol?: string;
}

const conditions: ToothCondition[] = [
  { id: "healthy", label: "Saudável", color: "bg-emerald-500", symbol: "✓" },
  { id: "caries", label: "Cárie", color: "bg-red-500", symbol: "C" },
  { id: "restored", label: "Restaurado", color: "bg-blue-500", symbol: "R" },
  { id: "missing", label: "Ausente", color: "bg-muted", symbol: "X" },
  { id: "crown", label: "Coroa", color: "bg-amber-500", symbol: "CR" },
  { id: "implant", label: "Implante", color: "bg-violet-500", symbol: "I" },
  { id: "rootCanal", label: "Canal", color: "bg-orange-500", symbol: "E" },
  { id: "extraction", label: "Extração", color: "bg-destructive", symbol: "EX" },
  { id: "fracture", label: "Fratura", color: "bg-rose-400", symbol: "F" },
  { id: "mobility", label: "Mobilidade", color: "bg-yellow-500", symbol: "M" },
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

// Palmer notation uses symbols and position
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

  const renderTooth = (tooth: number | string, isUpper: boolean) => {
    const toothId = getToothNumber(tooth);
    const condition = conditions.find((c) => c.id === getToothCondition(tooth));
    const isSelected = selectedTooth === toothId;
    const hasNotes = value[toothId]?.notes;

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
              "relative w-8 h-12 sm:w-10 sm:h-14 flex flex-col items-center justify-center rounded-lg border-2 transition-all",
              "hover:scale-110 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/50",
              isSelected && "ring-2 ring-primary scale-110",
              condition?.id === "missing" && "opacity-40",
              readOnly && "cursor-default hover:scale-100"
            )}
            style={{
              borderColor: condition?.id !== "healthy" 
                ? `hsl(var(--${condition?.color.replace("bg-", "")}))`
                : "hsl(var(--border))",
            }}
          >
            {/* Tooth shape */}
            <div
              className={cn(
                "w-5 h-7 sm:w-6 sm:h-8 rounded-t-full rounded-b-lg border transition-colors",
                isUpper ? "rounded-t-lg rounded-b-full" : "rounded-t-full rounded-b-lg",
                condition?.color || "bg-card"
              )}
            >
              {condition?.symbol && (
                <span className="text-[8px] sm:text-[10px] font-bold text-white flex items-center justify-center h-full">
                  {condition.symbol}
                </span>
              )}
            </div>
            {/* Tooth number */}
            <span className="text-[8px] sm:text-[10px] font-medium text-muted-foreground mt-0.5">
              {tooth}
            </span>
            {/* Notes indicator */}
            {hasNotes && (
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-72 p-4" align="center">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">Dente {tooth}</h4>
              <Badge variant="outline" className={cn(condition?.color, "text-white")}>
                {condition?.label}
              </Badge>
            </div>

            <div className="space-y-2">
              <Label className="text-xs">Condição</Label>
              <div className="grid grid-cols-5 gap-1">
                {conditions.map((cond) => (
                  <button
                    key={cond.id}
                    onClick={() => setSelectedCondition(cond.id)}
                    className={cn(
                      "p-2 rounded-md border-2 transition-all text-xs",
                      selectedCondition === cond.id
                        ? "border-primary ring-2 ring-primary/30"
                        : "border-transparent hover:border-border"
                    )}
                    title={cond.label}
                  >
                    <div
                      className={cn(
                        "w-4 h-4 mx-auto rounded-full flex items-center justify-center text-white text-[8px] font-bold",
                        cond.color
                      )}
                    >
                      {cond.symbol}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs">Observações</Label>
              <Textarea
                placeholder="Notas sobre este dente..."
                value={value[toothId]?.notes || ""}
                onChange={(e) => updateToothNotes(toothId, e.target.value)}
                rows={2}
                className="text-sm"
              />
            </div>

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

  const renderQuadrant = (teethList: (number | string)[], label: string, isUpper: boolean) => (
    <div className="flex flex-col items-center">
      <span className="text-[10px] text-muted-foreground mb-1">{label}</span>
      <div className="flex gap-0.5 sm:gap-1">
        {teethList.map((tooth) => renderTooth(tooth, isUpper))}
      </div>
    </div>
  );

  const legendItems = conditions.filter((c) => 
    Object.values(value).some((v) => v.condition === c.id) || c.id === "healthy"
  );

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4 pb-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Label className="text-xs whitespace-nowrap">Sistema de Notação</Label>
          <Select value={notation} onValueChange={(v: NotationSystem) => setNotation(v)}>
            <SelectTrigger className="w-[140px] h-8 text-xs">
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
          <div className="flex items-center gap-2">
            <Switch
              checked={isPediatric}
              onCheckedChange={setIsPediatric}
              id="pediatric"
            />
            <Label htmlFor="pediatric" className="text-xs">
              Dentição decídua
            </Label>
          </div>
        )}
      </div>

      {/* Odontogram */}
      <div className="relative bg-gradient-to-b from-muted/30 to-transparent rounded-xl p-4 sm:p-6">
        {/* Center line labels */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10 pointer-events-none">
          <div className="text-[10px] font-medium text-muted-foreground bg-background px-2 py-0.5 rounded">
            Superior
          </div>
          <div className="h-8 w-px bg-border my-1" />
          <div className="text-[10px] font-medium text-muted-foreground bg-background px-2 py-0.5 rounded">
            Inferior
          </div>
        </div>

        {/* Upper Arch */}
        <div className="flex justify-center gap-2 sm:gap-4 mb-4">
          {renderQuadrant(teeth.upperRight as (number | string)[], "Q1", true)}
          <div className="w-px bg-border" />
          {renderQuadrant(teeth.upperLeft as (number | string)[], "Q2", true)}
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center my-2">
          <div className="flex-1 h-px bg-border" />
          <span className="px-4 text-xs text-muted-foreground">Linha Média</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Lower Arch */}
        <div className="flex justify-center gap-2 sm:gap-4 mt-4">
          {renderQuadrant(teeth.lowerRight as (number | string)[], "Q4", false)}
          <div className="w-px bg-border" />
          {renderQuadrant(teeth.lowerLeft as (number | string)[], "Q3", false)}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-2 pt-2">
        {legendItems.map((cond) => (
          <div key={cond.id} className="flex items-center gap-1.5">
            <div
              className={cn(
                "w-3 h-3 rounded-full flex items-center justify-center text-white text-[6px] font-bold",
                cond.color
              )}
            >
              {cond.symbol}
            </div>
            <span className="text-[10px] text-muted-foreground">{cond.label}</span>
          </div>
        ))}
      </div>

      {/* Summary */}
      {Object.keys(value).length > 0 && (
        <div className="bg-muted/30 rounded-lg p-3">
          <h5 className="text-xs font-medium mb-2">Resumo do Odontograma</h5>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
            {conditions.map((cond) => {
              const count = Object.values(value).filter((v) => v.condition === cond.id).length;
              if (count === 0) return null;
              return (
                <div key={cond.id} className="flex items-center gap-2">
                  <div className={cn("w-2 h-2 rounded-full", cond.color)} />
                  <span className="text-muted-foreground">
                    {cond.label}: <span className="font-medium text-foreground">{count}</span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
