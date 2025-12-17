import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Type,
  Image,
  Square,
  Minus,
  MousePointerClick,
  Share2,
  LayoutTemplate,
  GripVertical,
  Trash2,
  Copy,
  Eye,
  Code,
  Save,
  X,
  Plus,
  Settings,
  Palette,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
  Link,
  Smartphone,
  Monitor,
  Undo,
  Redo,
  Download,
  Send,
  Sparkles,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  SeparatorHorizontal,
  Mail,
  Building2,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
} from "lucide-react";
import { toast } from "sonner";

interface EmailTemplateEditorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  templateName?: string;
  templateType?: string;
}

interface EmailElement {
  id: string;
  type: string;
  content: any;
  styles: any;
}

const elementTypes = [
  { id: "header", name: "Cabeçalho", icon: LayoutTemplate, category: "layout" },
  { id: "text", name: "Texto", icon: Type, category: "content" },
  { id: "heading", name: "Título", icon: Heading1, category: "content" },
  { id: "image", name: "Imagem", icon: Image, category: "content" },
  { id: "button", name: "Botão", icon: MousePointerClick, category: "content" },
  { id: "divider", name: "Divisor", icon: Minus, category: "layout" },
  { id: "spacer", name: "Espaçador", icon: SeparatorHorizontal, category: "layout" },
  { id: "social", name: "Redes Sociais", icon: Share2, category: "content" },
  { id: "footer", name: "Rodapé", icon: Square, category: "layout" },
  { id: "columns", name: "Colunas", icon: LayoutTemplate, category: "layout" },
];

const defaultElementContent: Record<string, any> = {
  header: { logoUrl: "", title: "Clínica Demo", subtitle: "Cuidando da sua saúde" },
  text: { text: "Escreva seu texto aqui. Você pode personalizar fontes, cores e alinhamento." },
  heading: { text: "Título da Seção", level: "h2" },
  image: { url: "", alt: "Descrição da imagem", width: "100%" },
  button: { text: "Clique Aqui", url: "#", variant: "primary" },
  divider: { style: "solid", color: "#e5e7eb" },
  spacer: { height: 32 },
  social: { facebook: "", instagram: "", twitter: "", linkedin: "", youtube: "" },
  footer: { text: "© 2024 Clínica Demo. Todos os direitos reservados.", address: "", phone: "", email: "" },
  columns: { columns: 2, gap: 16 },
};

const defaultElementStyles: Record<string, any> = {
  header: { backgroundColor: "#3b82f6", padding: 24, textAlign: "center", textColor: "#ffffff" },
  text: { fontSize: 16, lineHeight: 1.6, textAlign: "left", textColor: "#374151", padding: 16 },
  heading: { fontSize: 24, fontWeight: "bold", textAlign: "left", textColor: "#111827", padding: 16 },
  image: { borderRadius: 8, padding: 16 },
  button: { backgroundColor: "#3b82f6", textColor: "#ffffff", borderRadius: 8, padding: 16, fontSize: 16 },
  divider: { margin: 16 },
  spacer: {},
  social: { iconSize: 32, iconColor: "#6b7280", padding: 16 },
  footer: { backgroundColor: "#f3f4f6", textColor: "#6b7280", fontSize: 12, padding: 24, textAlign: "center" },
  columns: { padding: 16 },
};

// Draggable Element Component
function DraggableElement({ element, type }: { element: typeof elementTypes[0]; type: "palette" | "canvas" }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: element.id,
    disabled: type === "palette",
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  if (type === "palette") {
    return (
      <div
        className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card hover:bg-muted/50 hover:border-primary/50 cursor-grab active:cursor-grabbing transition-all group"
        draggable
        onDragStart={(e) => {
          e.dataTransfer.setData("elementType", element.id);
        }}
      >
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          <element.icon className="h-5 w-5 text-primary" />
        </div>
        <span className="text-sm font-medium">{element.name}</span>
      </div>
    );
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <element.icon className="h-4 w-4" />
    </div>
  );
}

// Sortable Canvas Element
function SortableCanvasElement({
  element,
  isSelected,
  onSelect,
  onDelete,
  onDuplicate,
}: {
  element: EmailElement;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: element.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const elementType = elementTypes.find((t) => t.id === element.type);

  const renderElementPreview = () => {
    switch (element.type) {
      case "header":
        return (
          <div
            className="p-6 text-center rounded-lg"
            style={{ backgroundColor: element.styles.backgroundColor, color: element.styles.textColor }}
          >
            <h1 className="text-xl font-bold">{element.content.title}</h1>
            {element.content.subtitle && <p className="text-sm mt-1 opacity-80">{element.content.subtitle}</p>}
          </div>
        );
      case "text":
        return (
          <div
            className="p-4"
            style={{
              fontSize: element.styles.fontSize,
              lineHeight: element.styles.lineHeight,
              textAlign: element.styles.textAlign,
              color: element.styles.textColor,
            }}
          >
            {element.content.text}
          </div>
        );
      case "heading":
        return (
          <div
            className="p-4"
            style={{
              fontSize: element.styles.fontSize,
              fontWeight: element.styles.fontWeight,
              textAlign: element.styles.textAlign,
              color: element.styles.textColor,
            }}
          >
            {element.content.text}
          </div>
        );
      case "image":
        return (
          <div className="p-4 flex justify-center">
            {element.content.url ? (
              <img
                src={element.content.url}
                alt={element.content.alt}
                className="max-w-full rounded-lg"
                style={{ borderRadius: element.styles.borderRadius }}
              />
            ) : (
              <div className="w-full h-32 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                <Image className="h-8 w-8 text-muted-foreground" />
              </div>
            )}
          </div>
        );
      case "button":
        return (
          <div className="p-4 flex justify-center">
            <button
              className="px-6 py-3 font-medium rounded-lg transition-colors"
              style={{
                backgroundColor: element.styles.backgroundColor,
                color: element.styles.textColor,
                borderRadius: element.styles.borderRadius,
              }}
            >
              {element.content.text}
            </button>
          </div>
        );
      case "divider":
        return (
          <div className="px-4 py-2">
            <hr style={{ borderColor: element.content.color, borderStyle: element.content.style }} />
          </div>
        );
      case "spacer":
        return <div style={{ height: element.content.height }} className="bg-muted/30" />;
      case "social":
        return (
          <div className="p-4 flex justify-center gap-4">
            {element.content.facebook && <Facebook className="h-6 w-6 text-muted-foreground hover:text-primary cursor-pointer" />}
            {element.content.instagram && <Instagram className="h-6 w-6 text-muted-foreground hover:text-primary cursor-pointer" />}
            {element.content.twitter && <Twitter className="h-6 w-6 text-muted-foreground hover:text-primary cursor-pointer" />}
            {element.content.linkedin && <Linkedin className="h-6 w-6 text-muted-foreground hover:text-primary cursor-pointer" />}
            {element.content.youtube && <Youtube className="h-6 w-6 text-muted-foreground hover:text-primary cursor-pointer" />}
            {!element.content.facebook && !element.content.instagram && !element.content.twitter && !element.content.linkedin && !element.content.youtube && (
              <div className="flex gap-3">
                <Facebook className="h-6 w-6 text-muted-foreground" />
                <Instagram className="h-6 w-6 text-muted-foreground" />
                <Twitter className="h-6 w-6 text-muted-foreground" />
              </div>
            )}
          </div>
        );
      case "footer":
        return (
          <div
            className="p-6 text-center rounded-lg"
            style={{
              backgroundColor: element.styles.backgroundColor,
              color: element.styles.textColor,
              fontSize: element.styles.fontSize,
            }}
          >
            <p>{element.content.text}</p>
            {element.content.address && (
              <p className="mt-2 flex items-center justify-center gap-1">
                <MapPin className="h-3 w-3" /> {element.content.address}
              </p>
            )}
            <div className="mt-2 flex items-center justify-center gap-4">
              {element.content.phone && (
                <span className="flex items-center gap-1">
                  <Phone className="h-3 w-3" /> {element.content.phone}
                </span>
              )}
              {element.content.email && (
                <span className="flex items-center gap-1">
                  <Mail className="h-3 w-3" /> {element.content.email}
                </span>
              )}
            </div>
          </div>
        );
      default:
        const DefaultIcon = elementType?.icon || Square;
        return (
          <div className="p-4 text-center text-muted-foreground">
            <DefaultIcon className="h-6 w-6 mx-auto mb-2" />
            <span className="text-sm">{elementType?.name}</span>
          </div>
        );
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group rounded-lg border-2 transition-all ${
        isSelected ? "border-primary ring-2 ring-primary/20" : "border-transparent hover:border-border"
      }`}
      onClick={onSelect}
    >
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute -left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
      >
        <div className="p-1 rounded bg-muted">
          <GripVertical className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>

      {/* Actions */}
      <div className="absolute -right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1 z-10">
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7 bg-card shadow-sm"
          onClick={(e) => {
            e.stopPropagation();
            onDuplicate();
          }}
        >
          <Copy className="h-3 w-3" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7 bg-card shadow-sm text-destructive hover:text-destructive"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>

      {/* Element Preview */}
      <div className="bg-white rounded-lg overflow-hidden">{renderElementPreview()}</div>
    </div>
  );
}

export default function EmailTemplateEditorModal({
  open,
  onOpenChange,
  templateName = "Novo Template",
  templateType = "marketing",
}: EmailTemplateEditorModalProps) {
  const [elements, setElements] = useState<EmailElement[]>([
    {
      id: "header-1",
      type: "header",
      content: { ...defaultElementContent.header },
      styles: { ...defaultElementStyles.header },
    },
    {
      id: "text-1",
      type: "text",
      content: { text: "Olá {{nome}},\n\nEsperamos que esteja bem! Temos novidades incríveis para compartilhar com você." },
      styles: { ...defaultElementStyles.text },
    },
    {
      id: "button-1",
      type: "button",
      content: { text: "Agendar Consulta", url: "#" },
      styles: { ...defaultElementStyles.button },
    },
    {
      id: "footer-1",
      type: "footer",
      content: { ...defaultElementContent.footer },
      styles: { ...defaultElementStyles.footer },
    },
  ]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");
  const [viewMode, setViewMode] = useState<"edit" | "preview" | "code">("edit");
  const [name, setName] = useState(templateName);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (over && active.id !== over.id) {
      setElements((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const elementType = e.dataTransfer.getData("elementType");
    if (elementType) {
      const newElement: EmailElement = {
        id: `${elementType}-${Date.now()}`,
        type: elementType,
        content: { ...defaultElementContent[elementType] },
        styles: { ...defaultElementStyles[elementType] },
      };
      setElements([...elements, newElement]);
      setSelectedElement(newElement.id);
      toast.success("Elemento adicionado!");
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const deleteElement = (id: string) => {
    setElements(elements.filter((el) => el.id !== id));
    if (selectedElement === id) setSelectedElement(null);
    toast.success("Elemento removido");
  };

  const duplicateElement = (id: string) => {
    const element = elements.find((el) => el.id === id);
    if (element) {
      const newElement = {
        ...element,
        id: `${element.type}-${Date.now()}`,
        content: { ...element.content },
        styles: { ...element.styles },
      };
      const index = elements.findIndex((el) => el.id === id);
      const newElements = [...elements];
      newElements.splice(index + 1, 0, newElement);
      setElements(newElements);
      setSelectedElement(newElement.id);
      toast.success("Elemento duplicado");
    }
  };

  const updateElement = (id: string, updates: { content?: any; styles?: any }) => {
    setElements(
      elements.map((el) =>
        el.id === id
          ? {
              ...el,
              content: updates.content ? { ...el.content, ...updates.content } : el.content,
              styles: updates.styles ? { ...el.styles, ...updates.styles } : el.styles,
            }
          : el
      )
    );
  };

  const selectedElementData = elements.find((el) => el.id === selectedElement);

  const renderPropertiesPanel = () => {
    if (!selectedElementData) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center p-6">
          <Settings className="h-12 w-12 text-muted-foreground/30 mb-4" />
          <p className="text-sm text-muted-foreground">Selecione um elemento no canvas para editar suas propriedades</p>
        </div>
      );
    }

    const elementType = elementTypes.find((t) => t.id === selectedElementData.type);

    return (
      <div className="space-y-6 p-4">
        <div className="flex items-center gap-2 pb-3 border-b border-border">
          {elementType && <elementType.icon className="h-5 w-5 text-primary" />}
          <span className="font-semibold">{elementType?.name}</span>
        </div>

        <Tabs defaultValue="content" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="content" className="flex-1">Conteúdo</TabsTrigger>
            <TabsTrigger value="styles" className="flex-1">Estilos</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-4 mt-4">
            {selectedElementData.type === "header" && (
              <>
                <div className="space-y-2">
                  <Label>Título</Label>
                  <Input
                    value={selectedElementData.content.title}
                    onChange={(e) => updateElement(selectedElement!, { content: { title: e.target.value } })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Subtítulo</Label>
                  <Input
                    value={selectedElementData.content.subtitle}
                    onChange={(e) => updateElement(selectedElement!, { content: { subtitle: e.target.value } })}
                  />
                </div>
              </>
            )}

            {selectedElementData.type === "text" && (
              <div className="space-y-2">
                <Label>Texto</Label>
                <Textarea
                  value={selectedElementData.content.text}
                  onChange={(e) => updateElement(selectedElement!, { content: { text: e.target.value } })}
                  rows={6}
                />
                <p className="text-xs text-muted-foreground">Use {"{{nome}}"} para inserir variáveis dinâmicas</p>
              </div>
            )}

            {selectedElementData.type === "heading" && (
              <>
                <div className="space-y-2">
                  <Label>Texto do Título</Label>
                  <Input
                    value={selectedElementData.content.text}
                    onChange={(e) => updateElement(selectedElement!, { content: { text: e.target.value } })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Nível</Label>
                  <Select
                    value={selectedElementData.content.level}
                    onValueChange={(value) => updateElement(selectedElement!, { content: { level: value } })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="h1">H1 - Principal</SelectItem>
                      <SelectItem value="h2">H2 - Secundário</SelectItem>
                      <SelectItem value="h3">H3 - Terciário</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {selectedElementData.type === "image" && (
              <>
                <div className="space-y-2">
                  <Label>URL da Imagem</Label>
                  <Input
                    value={selectedElementData.content.url}
                    onChange={(e) => updateElement(selectedElement!, { content: { url: e.target.value } })}
                    placeholder="https://..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Texto Alternativo</Label>
                  <Input
                    value={selectedElementData.content.alt}
                    onChange={(e) => updateElement(selectedElement!, { content: { alt: e.target.value } })}
                  />
                </div>
              </>
            )}

            {selectedElementData.type === "button" && (
              <>
                <div className="space-y-2">
                  <Label>Texto do Botão</Label>
                  <Input
                    value={selectedElementData.content.text}
                    onChange={(e) => updateElement(selectedElement!, { content: { text: e.target.value } })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>URL do Link</Label>
                  <Input
                    value={selectedElementData.content.url}
                    onChange={(e) => updateElement(selectedElement!, { content: { url: e.target.value } })}
                    placeholder="https://..."
                  />
                </div>
              </>
            )}

            {selectedElementData.type === "divider" && (
              <>
                <div className="space-y-2">
                  <Label>Estilo da Linha</Label>
                  <Select
                    value={selectedElementData.content.style}
                    onValueChange={(value) => updateElement(selectedElement!, { content: { style: value } })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="solid">Sólida</SelectItem>
                      <SelectItem value="dashed">Tracejada</SelectItem>
                      <SelectItem value="dotted">Pontilhada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Cor</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={selectedElementData.content.color}
                      onChange={(e) => updateElement(selectedElement!, { content: { color: e.target.value } })}
                      className="w-12 h-10 p-1"
                    />
                    <Input
                      value={selectedElementData.content.color}
                      onChange={(e) => updateElement(selectedElement!, { content: { color: e.target.value } })}
                      className="flex-1 font-mono"
                    />
                  </div>
                </div>
              </>
            )}

            {selectedElementData.type === "spacer" && (
              <div className="space-y-2">
                <Label>Altura ({selectedElementData.content.height}px)</Label>
                <Slider
                  value={[selectedElementData.content.height]}
                  onValueChange={(value) => updateElement(selectedElement!, { content: { height: value[0] } })}
                  min={8}
                  max={100}
                  step={4}
                />
              </div>
            )}

            {selectedElementData.type === "social" && (
              <>
                <div className="space-y-2">
                  <Label>Facebook</Label>
                  <Input
                    value={selectedElementData.content.facebook}
                    onChange={(e) => updateElement(selectedElement!, { content: { facebook: e.target.value } })}
                    placeholder="https://facebook.com/..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Instagram</Label>
                  <Input
                    value={selectedElementData.content.instagram}
                    onChange={(e) => updateElement(selectedElement!, { content: { instagram: e.target.value } })}
                    placeholder="https://instagram.com/..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Twitter</Label>
                  <Input
                    value={selectedElementData.content.twitter}
                    onChange={(e) => updateElement(selectedElement!, { content: { twitter: e.target.value } })}
                    placeholder="https://twitter.com/..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>LinkedIn</Label>
                  <Input
                    value={selectedElementData.content.linkedin}
                    onChange={(e) => updateElement(selectedElement!, { content: { linkedin: e.target.value } })}
                    placeholder="https://linkedin.com/..."
                  />
                </div>
              </>
            )}

            {selectedElementData.type === "footer" && (
              <>
                <div className="space-y-2">
                  <Label>Texto do Rodapé</Label>
                  <Textarea
                    value={selectedElementData.content.text}
                    onChange={(e) => updateElement(selectedElement!, { content: { text: e.target.value } })}
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Endereço</Label>
                  <Input
                    value={selectedElementData.content.address}
                    onChange={(e) => updateElement(selectedElement!, { content: { address: e.target.value } })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Telefone</Label>
                  <Input
                    value={selectedElementData.content.phone}
                    onChange={(e) => updateElement(selectedElement!, { content: { phone: e.target.value } })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>E-mail</Label>
                  <Input
                    value={selectedElementData.content.email}
                    onChange={(e) => updateElement(selectedElement!, { content: { email: e.target.value } })}
                  />
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="styles" className="space-y-4 mt-4">
            {(selectedElementData.type === "header" ||
              selectedElementData.type === "button" ||
              selectedElementData.type === "footer") && (
              <div className="space-y-2">
                <Label>Cor de Fundo</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={selectedElementData.styles.backgroundColor}
                    onChange={(e) => updateElement(selectedElement!, { styles: { backgroundColor: e.target.value } })}
                    className="w-12 h-10 p-1"
                  />
                  <Input
                    value={selectedElementData.styles.backgroundColor}
                    onChange={(e) => updateElement(selectedElement!, { styles: { backgroundColor: e.target.value } })}
                    className="flex-1 font-mono"
                  />
                </div>
              </div>
            )}

            {(selectedElementData.type === "text" ||
              selectedElementData.type === "heading" ||
              selectedElementData.type === "header" ||
              selectedElementData.type === "button" ||
              selectedElementData.type === "footer") && (
              <div className="space-y-2">
                <Label>Cor do Texto</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={selectedElementData.styles.textColor}
                    onChange={(e) => updateElement(selectedElement!, { styles: { textColor: e.target.value } })}
                    className="w-12 h-10 p-1"
                  />
                  <Input
                    value={selectedElementData.styles.textColor}
                    onChange={(e) => updateElement(selectedElement!, { styles: { textColor: e.target.value } })}
                    className="flex-1 font-mono"
                  />
                </div>
              </div>
            )}

            {(selectedElementData.type === "text" || selectedElementData.type === "heading") && (
              <>
                <div className="space-y-2">
                  <Label>Tamanho da Fonte ({selectedElementData.styles.fontSize}px)</Label>
                  <Slider
                    value={[selectedElementData.styles.fontSize]}
                    onValueChange={(value) => updateElement(selectedElement!, { styles: { fontSize: value[0] } })}
                    min={10}
                    max={48}
                    step={1}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Alinhamento</Label>
                  <div className="flex gap-2">
                    {[
                      { value: "left", icon: AlignLeft },
                      { value: "center", icon: AlignCenter },
                      { value: "right", icon: AlignRight },
                    ].map((align) => (
                      <Button
                        key={align.value}
                        variant={selectedElementData.styles.textAlign === align.value ? "default" : "outline"}
                        size="icon"
                        onClick={() => updateElement(selectedElement!, { styles: { textAlign: align.value } })}
                      >
                        <align.icon className="h-4 w-4" />
                      </Button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {(selectedElementData.type === "button" || selectedElementData.type === "image") && (
              <div className="space-y-2">
                <Label>Arredondamento ({selectedElementData.styles.borderRadius}px)</Label>
                <Slider
                  value={[selectedElementData.styles.borderRadius]}
                  onValueChange={(value) => updateElement(selectedElement!, { styles: { borderRadius: value[0] } })}
                  min={0}
                  max={24}
                  step={2}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label>Padding ({selectedElementData.styles.padding || 16}px)</Label>
              <Slider
                value={[selectedElementData.styles.padding || 16]}
                onValueChange={(value) => updateElement(selectedElement!, { styles: { padding: value[0] } })}
                min={0}
                max={48}
                step={4}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    );
  };

  const generateHTML = () => {
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name}</title>
</head>
<body style="margin:0;padding:0;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;">
    ${elements
      .map((el) => {
        // Simplified HTML generation for preview
        return `<!-- ${el.type} element -->`;
      })
      .join("\n")}
  </table>
</body>
</html>`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] w-[1400px] h-[90vh] p-0 gap-0 bg-card/95 backdrop-blur-xl border-2 border-primary/20 rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/30">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
              <Mail className="h-5 w-5 text-white" />
            </div>
            <div>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-lg font-semibold bg-transparent border-none p-0 h-auto focus-visible:ring-0"
              />
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary">{templateType}</Badge>
                <span className="text-xs text-muted-foreground">{elements.length} elementos</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode */}
            <div className="flex items-center bg-muted rounded-lg p-1">
              <Button
                variant={viewMode === "edit" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("edit")}
                className="gap-1"
              >
                <Settings className="h-4 w-4" />
                Editar
              </Button>
              <Button
                variant={viewMode === "preview" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("preview")}
                className="gap-1"
              >
                <Eye className="h-4 w-4" />
                Preview
              </Button>
              <Button
                variant={viewMode === "code" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("code")}
                className="gap-1"
              >
                <Code className="h-4 w-4" />
                Código
              </Button>
            </div>

            {/* Preview Device */}
            {viewMode === "preview" && (
              <div className="flex items-center bg-muted rounded-lg p-1">
                <Button
                  variant={previewMode === "desktop" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setPreviewMode("desktop")}
                >
                  <Monitor className="h-4 w-4" />
                </Button>
                <Button
                  variant={previewMode === "mobile" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setPreviewMode("mobile")}
                >
                  <Smartphone className="h-4 w-4" />
                </Button>
              </div>
            )}

            <div className="h-6 w-px bg-border mx-2" />

            <Button variant="outline" size="sm" className="gap-1">
              <Send className="h-4 w-4" />
              Testar
            </Button>
            <Button
              size="sm"
              className="gap-1 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
              onClick={() => {
                toast.success("Template salvo com sucesso!");
                onOpenChange(false);
              }}
            >
              <Save className="h-4 w-4" />
              Salvar
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden">
          {viewMode === "edit" && (
            <>
              {/* Left Sidebar - Elements Palette */}
              <div className="w-64 border-r border-border bg-muted/20 flex flex-col">
                <div className="p-4 border-b border-border">
                  <h3 className="font-semibold text-sm flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Elementos
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">Arraste para adicionar</p>
                </div>
                <ScrollArea className="flex-1">
                  <div className="p-3 space-y-2">
                    {["layout", "content"].map((category) => (
                      <div key={category} className="space-y-2">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-1">
                          {category === "layout" ? "Layout" : "Conteúdo"}
                        </p>
                        {elementTypes
                          .filter((el) => el.category === category)
                          .map((element) => (
                            <DraggableElement key={element.id} element={element} type="palette" />
                          ))}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              {/* Center - Canvas */}
              <div className="flex-1 bg-muted/30 overflow-auto">
                <div className="p-8">
                  <div
                    className={`mx-auto bg-white rounded-xl shadow-xl overflow-hidden transition-all ${
                      previewMode === "mobile" ? "max-w-[375px]" : "max-w-[600px]"
                    }`}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                  >
                    <DndContext
                      sensors={sensors}
                      collisionDetection={closestCenter}
                      onDragStart={handleDragStart}
                      onDragEnd={handleDragEnd}
                    >
                      <SortableContext items={elements.map((el) => el.id)} strategy={verticalListSortingStrategy}>
                        {elements.length === 0 ? (
                          <div className="p-12 text-center border-2 border-dashed border-border rounded-lg m-4">
                            <Plus className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                            <p className="text-muted-foreground">Arraste elementos aqui para começar</p>
                          </div>
                        ) : (
                          <div className="p-4 space-y-2">
                            {elements.map((element) => (
                              <SortableCanvasElement
                                key={element.id}
                                element={element}
                                isSelected={selectedElement === element.id}
                                onSelect={() => setSelectedElement(element.id)}
                                onDelete={() => deleteElement(element.id)}
                                onDuplicate={() => duplicateElement(element.id)}
                              />
                            ))}
                          </div>
                        )}
                      </SortableContext>
                    </DndContext>
                  </div>
                </div>
              </div>

              {/* Right Sidebar - Properties */}
              <div className="w-80 border-l border-border bg-muted/20 flex flex-col">
                <div className="p-4 border-b border-border">
                  <h3 className="font-semibold text-sm flex items-center gap-2">
                    <Palette className="h-4 w-4" />
                    Propriedades
                  </h3>
                </div>
                <ScrollArea className="flex-1">{renderPropertiesPanel()}</ScrollArea>
              </div>
            </>
          )}

          {viewMode === "preview" && (
            <div className="flex-1 bg-muted/30 overflow-auto flex items-start justify-center p-8">
              <div
                className={`bg-white rounded-xl shadow-xl overflow-hidden transition-all ${
                  previewMode === "mobile" ? "max-w-[375px]" : "max-w-[600px]"
                } w-full`}
              >
                {elements.map((element) => (
                  <div key={element.id}>
                    {element.type === "header" && (
                      <div
                        className="p-6 text-center"
                        style={{ backgroundColor: element.styles.backgroundColor, color: element.styles.textColor }}
                      >
                        <h1 className="text-xl font-bold">{element.content.title}</h1>
                        {element.content.subtitle && <p className="text-sm mt-1 opacity-80">{element.content.subtitle}</p>}
                      </div>
                    )}
                    {element.type === "text" && (
                      <div
                        className="p-4"
                        style={{
                          fontSize: element.styles.fontSize,
                          lineHeight: element.styles.lineHeight,
                          textAlign: element.styles.textAlign,
                          color: element.styles.textColor,
                        }}
                      >
                        {element.content.text}
                      </div>
                    )}
                    {element.type === "button" && (
                      <div className="p-4 flex justify-center">
                        <button
                          className="px-6 py-3 font-medium"
                          style={{
                            backgroundColor: element.styles.backgroundColor,
                            color: element.styles.textColor,
                            borderRadius: element.styles.borderRadius,
                          }}
                        >
                          {element.content.text}
                        </button>
                      </div>
                    )}
                    {element.type === "footer" && (
                      <div
                        className="p-6 text-center"
                        style={{
                          backgroundColor: element.styles.backgroundColor,
                          color: element.styles.textColor,
                          fontSize: element.styles.fontSize,
                        }}
                      >
                        <p>{element.content.text}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {viewMode === "code" && (
            <div className="flex-1 bg-muted/30 overflow-auto p-8">
              <div className="max-w-4xl mx-auto">
                <div className="bg-zinc-900 rounded-xl overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-2 bg-zinc-800">
                    <span className="text-sm text-zinc-400">HTML</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-zinc-400 hover:text-white"
                      onClick={() => {
                        navigator.clipboard.writeText(generateHTML());
                        toast.success("Código copiado!");
                      }}
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      Copiar
                    </Button>
                  </div>
                  <pre className="p-4 text-sm text-zinc-300 overflow-auto max-h-[60vh]">
                    <code>{generateHTML()}</code>
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
