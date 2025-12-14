import { useState } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

interface PainScaleFieldProps {
  value: { level: number; notes: string };
  onChange: (value: { level: number; notes: string }) => void;
  readOnly?: boolean;
}

const painLevels = [
  { level: 0, emoji: "😊", label: "Sem Dor", color: "hsl(142 76% 36%)", bgClass: "bg-emerald-500" },
  { level: 1, emoji: "🙂", label: "Mínima", color: "hsl(142 76% 36%)", bgClass: "bg-emerald-400" },
  { level: 2, emoji: "😌", label: "Leve", color: "hsl(84 81% 44%)", bgClass: "bg-lime-500" },
  { level: 3, emoji: "😐", label: "Leve", color: "hsl(65 70% 50%)", bgClass: "bg-yellow-400" },
  { level: 4, emoji: "😕", label: "Moderada", color: "hsl(48 96% 53%)", bgClass: "bg-amber-400" },
  { level: 5, emoji: "😟", label: "Moderada", color: "hsl(38 92% 50%)", bgClass: "bg-orange-400" },
  { level: 6, emoji: "😣", label: "Moderada+", color: "hsl(25 95% 53%)", bgClass: "bg-orange-500" },
  { level: 7, emoji: "😖", label: "Intensa", color: "hsl(14 90% 50%)", bgClass: "bg-red-400" },
  { level: 8, emoji: "😫", label: "Intensa", color: "hsl(4 90% 58%)", bgClass: "bg-red-500" },
  { level: 9, emoji: "😭", label: "Severa", color: "hsl(0 84% 60%)", bgClass: "bg-red-600" },
  { level: 10, emoji: "🤯", label: "Insuportável", color: "hsl(0 72% 51%)", bgClass: "bg-red-700" },
];

export function PainScaleField({
  value = { level: 0, notes: "" },
  onChange,
  readOnly = false,
}: PainScaleFieldProps) {
  const [hoveredLevel, setHoveredLevel] = useState<number | null>(null);
  
  const currentLevel = painLevels[value.level] || painLevels[0];
  const displayLevel = hoveredLevel !== null ? painLevels[hoveredLevel] : currentLevel;

  const handleLevelChange = (level: number) => {
    if (readOnly) return;
    onChange({ ...value, level });
  };

  const getCategory = (level: number) => {
    if (level === 0) return "Sem dor";
    if (level <= 3) return "Dor Leve";
    if (level <= 6) return "Dor Moderada";
    if (level <= 9) return "Dor Intensa";
    return "Dor Insuportável";
  };

  return (
    <div className="space-y-6">
      {/* Main Display */}
      <div className="relative">
        <div 
          className="absolute inset-0 rounded-2xl opacity-10 transition-colors duration-300"
          style={{ backgroundColor: displayLevel.color }}
        />
        <div className="relative p-6 rounded-2xl border border-border/50 bg-gradient-to-br from-card/80 to-transparent">
          {/* Current Selection Display */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div 
              className="text-6xl sm:text-7xl transition-transform duration-300 hover:scale-110"
              style={{ filter: `drop-shadow(0 4px 12px ${displayLevel.color}40)` }}
            >
              {displayLevel.emoji}
            </div>
            <div className="text-left">
              <div className="text-4xl sm:text-5xl font-bold" style={{ color: displayLevel.color }}>
                {displayLevel.level}
              </div>
              <div className="text-sm text-muted-foreground">
                {displayLevel.label}
              </div>
            </div>
          </div>

          {/* Category Badge */}
          <div className="flex justify-center mb-6">
            <Badge 
              variant="secondary" 
              className="text-sm px-4 py-1"
              style={{ backgroundColor: displayLevel.color + '20', color: displayLevel.color }}
            >
              {getCategory(displayLevel.level)}
            </Badge>
          </div>

          {/* Scale Selector */}
          <div className="space-y-3">
            {/* Face Row */}
            <div className="flex justify-between px-1">
              {painLevels.map((level) => (
                <button
                  key={level.level}
                  onClick={() => handleLevelChange(level.level)}
                  onMouseEnter={() => setHoveredLevel(level.level)}
                  onMouseLeave={() => setHoveredLevel(null)}
                  disabled={readOnly}
                  className={cn(
                    "text-xl sm:text-2xl transition-all duration-200",
                    "hover:scale-125 focus:outline-none focus:scale-125",
                    value.level === level.level && "scale-125",
                    readOnly && "cursor-default hover:scale-100"
                  )}
                  style={{
                    filter: value.level === level.level 
                      ? `drop-shadow(0 4px 8px ${level.color}60)` 
                      : 'none',
                  }}
                  title={`${level.level} - ${level.label}`}
                >
                  {level.emoji}
                </button>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="relative h-3 rounded-full bg-muted overflow-hidden">
              <div 
                className="absolute inset-y-0 left-0 rounded-full transition-all duration-300"
                style={{ 
                  width: `${(value.level / 10) * 100}%`,
                  background: `linear-gradient(90deg, hsl(142 76% 36%), ${currentLevel.color})`,
                }}
              />
              {/* Markers */}
              <div className="absolute inset-0 flex justify-between px-0.5">
                {painLevels.map((level) => (
                  <button
                    key={level.level}
                    onClick={() => handleLevelChange(level.level)}
                    disabled={readOnly}
                    className={cn(
                      "w-2 h-full rounded-full transition-all",
                      value.level >= level.level 
                        ? "bg-white/60" 
                        : "bg-muted-foreground/20",
                      !readOnly && "hover:bg-white cursor-pointer"
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Number Row */}
            <div className="flex justify-between">
              {painLevels.map((level) => (
                <button
                  key={level.level}
                  onClick={() => handleLevelChange(level.level)}
                  disabled={readOnly}
                  className={cn(
                    "w-6 h-6 rounded-full text-xs font-bold transition-all",
                    "flex items-center justify-center",
                    value.level === level.level 
                      ? "text-white scale-110 shadow-lg" 
                      : "text-muted-foreground hover:text-foreground",
                    !readOnly && "cursor-pointer hover:scale-105"
                  )}
                  style={{
                    backgroundColor: value.level === level.level ? level.color : 'transparent',
                    boxShadow: value.level === level.level ? `0 4px 12px ${level.color}40` : 'none',
                  }}
                >
                  {level.level}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pain Description Guide */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
        <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
          <div className="font-medium text-emerald-600">0 - Sem Dor</div>
          <div className="text-muted-foreground">Ausência de desconforto</div>
        </div>
        <div className="p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
          <div className="font-medium text-yellow-600">1-3 - Leve</div>
          <div className="text-muted-foreground">Incômodo tolerável</div>
        </div>
        <div className="p-2 rounded-lg bg-orange-500/10 border border-orange-500/20">
          <div className="font-medium text-orange-600">4-6 - Moderada</div>
          <div className="text-muted-foreground">Interfere nas atividades</div>
        </div>
        <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20">
          <div className="font-medium text-red-600">7-10 - Intensa</div>
          <div className="text-muted-foreground">Incapacitante</div>
        </div>
      </div>

      {/* Notes */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Observações sobre a dor</Label>
        <Textarea
          placeholder="Descreva a localização, tipo (queimação, pontada, latejante), irradiação..."
          value={value.notes || ""}
          onChange={(e) => onChange({ ...value, notes: e.target.value })}
          rows={3}
          className="resize-none"
          disabled={readOnly}
        />
      </div>
    </div>
  );
}