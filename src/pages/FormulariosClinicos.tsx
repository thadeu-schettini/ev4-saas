import { useState } from "react";
import { Search, Plus, FileText, Archive, ArchiveRestore, History, Copy, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageContainer, PageContent } from "@/components/ui/page-container";
import { PageHeader } from "@/components/ui/page-header";
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
  archived?: boolean;
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
    archived: false,
  },
  {
    id: "2",
    name: "Consulta odontológica inicial",
    specialty: "Odontologia",
    type: "Anamnese",
    fieldsCount: 12,
    sectionsCount: 4,
    status: "publicado",
    archived: false,
  },
  {
    id: "3",
    name: "Avaliação cardiológica",
    specialty: "Cardiologia",
    type: "SOAP",
    fieldsCount: 18,
    sectionsCount: 5,
    status: "rascunho",
    archived: false,
  },
];

export default function FormulariosClinicos() {
  const [searchQuery, setSearchQuery] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("todas");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [showArchived, setShowArchived] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [selectedForm, setSelectedForm] = useState<ClinicalForm | null>(null);
  const [historyFormId, setHistoryFormId] = useState<string | null>(null);

  const filteredForms = mockForms.filter((form) => {
    const matchesSearch = form.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = specialtyFilter === "todas" || form.specialty === specialtyFilter;
    const matchesStatus = statusFilter === "todos" || form.status === statusFilter;
    const matchesArchived = showArchived ? form.archived : !form.archived;
    return matchesSearch && matchesSpecialty && matchesStatus && matchesArchived;
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

  const handleArchiveForm = (formId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    console.log("Archive form:", formId);
  };

  const handleUnarchiveForm = (formId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    console.log("Unarchive form:", formId);
  };

  return (
    <PageContainer>
      <PageHeader
        title="Formulários Clínicos"
        description="Crie formulários personalizados para suas consultas"
        icon={ClipboardList}
        iconColor="from-teal-500 to-cyan-600"
      >
        <Button variant="outline" onClick={() => setCatalogOpen(true)} className="gap-2">
          <FileText className="h-4 w-4" />
          <span className="hidden sm:inline">Usar Modelo</span>
        </Button>
        <Button onClick={handleCreateNew} className="gap-2">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Criar do Zero</span>
        </Button>
      </PageHeader>

      <PageContent>
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
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
            <SelectTrigger className="w-full sm:w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="publicado">Publicado</SelectItem>
              <SelectItem value="rascunho">Rascunho</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant={showArchived ? "secondary" : "outline"}
            onClick={() => setShowArchived(!showArchived)}
            className="gap-2"
          >
            <Archive className="h-4 w-4" />
            <span className="hidden sm:inline">Arquivados</span>
          </Button>
        </div>

        {/* Forms Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredForms.map((form) => (
            <Card
              key={form.id}
              className="p-4 cursor-pointer hover:shadow-md hover:border-primary/20 transition-all group"
              onClick={() => handleEditForm(form)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                    {form.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{form.specialty}</p>
                </div>
                <Badge variant={form.status === "publicado" ? "default" : "secondary"}>
                  {form.status === "publicado" ? "Publicado" : "Rascunho"}
                </Badge>
              </div>

              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                <span>{form.sectionsCount} seções</span>
                <span>{form.fieldsCount} campos</span>
                <span>{form.type}</span>
              </div>

              <div className="flex items-center gap-1 pt-3 border-t border-border/50">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2"
                  onClick={(e) => handleDuplicateForm(form, e)}
                >
                  <Copy className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2"
                  onClick={(e) => handleViewHistory(form.id, e)}
                >
                  <History className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2"
                  onClick={(e) => form.archived ? handleUnarchiveForm(form.id, e) : handleArchiveForm(form.id, e)}
                >
                  {form.archived ? <ArchiveRestore className="h-3.5 w-3.5" /> : <Archive className="h-3.5 w-3.5" />}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {filteredForms.length === 0 && (
          <div className="text-center py-12">
            <ClipboardList className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="font-medium text-foreground mb-1">Nenhum formulário encontrado</h3>
            <p className="text-sm text-muted-foreground">
              Crie um novo formulário ou ajuste os filtros de busca.
            </p>
          </div>
        )}
      </PageContent>

      {/* Modals */}
      <CatalogModal open={catalogOpen} onOpenChange={setCatalogOpen} />
      <FormEditorModal
        open={editorOpen}
        onOpenChange={setEditorOpen}
        formData={selectedForm}
      />
      <FormHistoryModal
        open={historyFormId !== null}
        onOpenChange={() => setHistoryFormId(null)}
        formId={historyFormId || ""}
      />
      <FormHistoryModal
        open={historyFormId !== null}
        onOpenChange={() => setHistoryFormId(null)}
        formId={historyFormId || ""}
      />
    </PageContainer>
  );
}
