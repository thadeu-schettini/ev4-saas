import { useState } from "react";
import { Search, Plus, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CatalogModal } from "@/components/formularios/CatalogModal";
import { FormEditorModal } from "@/components/formularios/FormEditorModal";
import { FormHistoryModal } from "@/components/formularios/FormHistoryModal";



interface ClinicalForm {
  id: string;
  name: string;
  specialty: string;
  type: string;
  fieldsCount: number;
  sectionsCount: number;
  status: "publicado" | "rascunho";
}

const mockForms: ClinicalForm[] = [
  {
    id: "1",
    name: "Avaliação fisioterapêutica",
    specialty: "Fisioterapia",
    type: "Anamnese",
    fieldsCount: 15,
    sectionsCount: 3,
    status: "publicado",
  },
  {
    id: "2",
    name: "Consulta odontológica inicial",
    specialty: "Odontologia",
    type: "Anamnese",
    fieldsCount: 12,
    sectionsCount: 4,
    status: "publicado",
  },
  {
    id: "3",
    name: "Avaliação cardiológica",
    specialty: "Cardiologia",
    type: "SOAP",
    fieldsCount: 18,
    sectionsCount: 5,
    status: "rascunho",
  },
];

export default function FormulariosClinicos() {
  const [searchQuery, setSearchQuery] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("todas");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [selectedForm, setSelectedForm] = useState<ClinicalForm | null>(null);
  const [historyFormId, setHistoryFormId] = useState<string | null>(null);

  const filteredForms = mockForms.filter((form) => {
    const matchesSearch = form.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = specialtyFilter === "todas" || form.specialty === specialtyFilter;
    const matchesStatus = statusFilter === "todos" || form.status === statusFilter;
    return matchesSearch && matchesSpecialty && matchesStatus;
  });

  const handleEditForm = (form: ClinicalForm) => {
    setSelectedForm(form);
    setEditorOpen(true);
  };

  const handleCreateNew = () => {
    setSelectedForm(null);
    setEditorOpen(true);
  };

  const handleDuplicateForm = (form: ClinicalForm, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const duplicated = {
      ...form,
      id: Date.now().toString(),
      name: `${form.name} (Cópia)`,
      status: "rascunho" as const,
    };
    setSelectedForm(duplicated);
    setEditorOpen(true);
  };

  const handleViewHistory = (formId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setHistoryFormId(formId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2">
              Formulários Clínicos
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Crie formulários personalizados para suas consultas ou escolha modelos prontos do catálogo.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => setCatalogOpen(true)}
              className="w-full sm:w-auto"
            >
              <FileText className="mr-2 h-4 w-4" />
              Usar Modelo Pronto
            </Button>
            <Button onClick={handleCreateNew} className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Criar do Zero
            </Button>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Especialidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas</SelectItem>
                <SelectItem value="Fisioterapia">Fisioterapia</SelectItem>
                <SelectItem value="Odontologia">Odontologia</SelectItem>
                <SelectItem value="Cardiologia">Cardiologia</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[160px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="publicado">Publicado</SelectItem>
                <SelectItem value="rascunho">Rascunho</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Empty State */}
        {filteredForms.length === 0 && (
          <Card className="p-8 sm:p-12 text-center">
            <FileText className="h-10 sm:h-12 w-10 sm:w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-base sm:text-lg font-semibold mb-2">
              Nenhum formulário encontrado
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
              Comece escolhendo um modelo pronto ou criando um personalizado.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
              <Button variant="outline" onClick={() => setCatalogOpen(true)} className="w-full sm:w-auto">
                <FileText className="mr-2 h-4 w-4" />
                Ver Modelos
              </Button>
              <Button onClick={handleCreateNew} className="w-full sm:w-auto">
                <Plus className="mr-2 h-4 w-4" />
                Criar Novo
              </Button>
            </div>
          </Card>
        )}

        {/* Forms Display */}
        {filteredForms.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {filteredForms.map((form) => (
              <Card
                key={form.id}
                className="p-4 sm:p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                onClick={() => handleEditForm(form)}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm sm:text-base group-hover:text-primary transition-colors line-clamp-2">
                        {form.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-1 truncate">
                        {form.specialty}
                      </p>
                    </div>
                    <Badge
                      variant={form.status === "publicado" ? "default" : "secondary"}
                      className="text-xs shrink-0"
                    >
                      {form.status === "publicado" ? "Ativo" : "Rascunho"}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{form.sectionsCount} seções</span>
                    <span>·</span>
                    <span>{form.fieldsCount} campos</span>
                  </div>

                  <Badge variant="outline" className="text-xs">{form.type}</Badge>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      <CatalogModal open={catalogOpen} onOpenChange={setCatalogOpen} />
      <FormEditorModal
        open={editorOpen}
        onOpenChange={setEditorOpen}
        formData={selectedForm}
      />
      <FormHistoryModal
        formId={historyFormId}
        open={historyFormId !== null}
        onOpenChange={(open) => !open && setHistoryFormId(null)}
      />
    </div>
  );
}
