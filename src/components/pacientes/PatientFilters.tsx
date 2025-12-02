import { useState } from "react";
import { Filter, X, Save, Bookmark, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface SavedFilter {
  id: string;
  name: string;
  filters: FilterState;
}

interface FilterState {
  status: string;
  financialStatus: string;
  ageRange: string;
  lastAppointmentRange: string;
}

interface PatientFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  activeFiltersCount: number;
}

const savedFiltersData: SavedFilter[] = [
  {
    id: "1",
    name: "Inativos há 6 meses",
    filters: { status: "inactive", financialStatus: "", ageRange: "", lastAppointmentRange: "6months" },
  },
  {
    id: "2",
    name: "Pendências financeiras",
    filters: { status: "", financialStatus: "overdue", ageRange: "", lastAppointmentRange: "" },
  },
  {
    id: "3",
    name: "Novos pacientes",
    filters: { status: "pending", financialStatus: "", ageRange: "", lastAppointmentRange: "" },
  },
];

export function PatientFilters({ filters, onFiltersChange, activeFiltersCount }: PatientFiltersProps) {
  const [savedFilters, setSavedFilters] = useState<SavedFilter[]>(savedFiltersData);
  const [filterName, setFilterName] = useState("");
  const [showSaveInput, setShowSaveInput] = useState(false);
  const [savedFiltersOpen, setSavedFiltersOpen] = useState(false);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({
      status: "",
      financialStatus: "",
      ageRange: "",
      lastAppointmentRange: "",
    });
  };

  const applySavedFilter = (savedFilter: SavedFilter) => {
    onFiltersChange(savedFilter.filters);
  };

  const saveCurrentFilter = () => {
    if (!filterName.trim()) return;
    const newFilter: SavedFilter = {
      id: Date.now().toString(),
      name: filterName,
      filters: { ...filters },
    };
    setSavedFilters([...savedFilters, newFilter]);
    setFilterName("");
    setShowSaveInput(false);
  };

  const deleteSavedFilter = (id: string) => {
    setSavedFilters(savedFilters.filter(f => f.id !== id));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="shrink-0 bg-card/50 backdrop-blur-sm gap-2">
          <Filter className="h-4 w-4" />
          <span className="hidden sm:inline">Filtros</span>
          {activeFiltersCount > 0 && (
            <Badge className="h-5 w-5 p-0 flex items-center justify-center text-xs">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4" align="end">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-sm">Filtros Avançados</h4>
            {activeFiltersCount > 0 && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="h-7 text-xs">
                <X className="h-3 w-3 mr-1" />
                Limpar
              </Button>
            )}
          </div>

          {/* Saved Filters */}
          <Collapsible open={savedFiltersOpen} onOpenChange={setSavedFiltersOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="w-full justify-between h-8 px-2">
                <div className="flex items-center gap-2">
                  <Bookmark className="h-3.5 w-3.5" />
                  <span className="text-xs">Filtros Salvos ({savedFilters.length})</span>
                </div>
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${savedFiltersOpen ? "rotate-180" : ""}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2 space-y-1">
              {savedFilters.map((sf) => (
                <div
                  key={sf.id}
                  className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 group"
                >
                  <button
                    onClick={() => applySavedFilter(sf)}
                    className="text-xs text-left flex-1 hover:text-primary transition-colors"
                  >
                    {sf.name}
                  </button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => deleteSavedFilter(sf.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>

          <div className="h-px bg-border" />

          {/* Filter Fields */}
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label className="text-xs">Status</Label>
              <Select value={filters.status} onValueChange={(v) => handleFilterChange("status", v)}>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="active">Ativo</SelectItem>
                  <SelectItem value="inactive">Inativo</SelectItem>
                  <SelectItem value="pending">Pendente</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs">Situação Financeira</Label>
              <Select value={filters.financialStatus} onValueChange={(v) => handleFilterChange("financialStatus", v)}>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Todas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="ok">OK</SelectItem>
                  <SelectItem value="pending">Pendente</SelectItem>
                  <SelectItem value="overdue">Em atraso</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs">Faixa Etária</Label>
              <Select value={filters.ageRange} onValueChange={(v) => handleFilterChange("ageRange", v)}>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Todas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="0-18">0 - 18 anos</SelectItem>
                  <SelectItem value="19-35">19 - 35 anos</SelectItem>
                  <SelectItem value="36-50">36 - 50 anos</SelectItem>
                  <SelectItem value="51-65">51 - 65 anos</SelectItem>
                  <SelectItem value="65+">65+ anos</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs">Última Consulta</Label>
              <Select value={filters.lastAppointmentRange} onValueChange={(v) => handleFilterChange("lastAppointmentRange", v)}>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Qualquer período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Qualquer período</SelectItem>
                  <SelectItem value="1month">Último mês</SelectItem>
                  <SelectItem value="3months">Últimos 3 meses</SelectItem>
                  <SelectItem value="6months">Últimos 6 meses</SelectItem>
                  <SelectItem value="1year">Último ano</SelectItem>
                  <SelectItem value="never">Nunca consultou</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="h-px bg-border" />

          {/* Save Filter */}
          {showSaveInput ? (
            <div className="flex gap-2">
              <Input
                placeholder="Nome do filtro"
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
                className="h-8 text-xs"
                onKeyDown={(e) => e.key === "Enter" && saveCurrentFilter()}
              />
              <Button size="sm" className="h-8 px-3" onClick={saveCurrentFilter}>
                <Save className="h-3.5 w-3.5" />
              </Button>
              <Button size="sm" variant="ghost" className="h-8 px-2" onClick={() => setShowSaveInput(false)}>
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="w-full h-8 text-xs"
              onClick={() => setShowSaveInput(true)}
              disabled={activeFiltersCount === 0}
            >
              <Save className="h-3.5 w-3.5 mr-1.5" />
              Salvar filtro atual
            </Button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
