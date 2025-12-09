import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, Send, Edit, Copy, Trash2 } from "lucide-react";

interface TemplatePreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  template: {
    id: number;
    name: string;
    questions: number;
    uses: number;
    category: string;
  } | null;
}

const mockQuestions = [
  { id: 1, text: "Você está sentindo alguma dor ou desconforto?", type: "Sim/Não" },
  { id: 2, text: "Qual o seu nível de dor de 0 a 10?", type: "Escala" },
  { id: 3, text: "Está tomando alguma medicação atualmente?", type: "Sim/Não" },
  { id: 4, text: "Liste as medicações em uso:", type: "Texto" },
  { id: 5, text: "Possui alguma alergia conhecida?", type: "Sim/Não" },
  { id: 6, text: "Descreva suas alergias:", type: "Texto" },
  { id: 7, text: "Já realizou alguma cirurgia?", type: "Sim/Não" },
  { id: 8, text: "Qual a última refeição que você fez?", type: "Texto" },
];

export function TemplatePreviewModal({ open, onOpenChange, template }: TemplatePreviewModalProps) {
  if (!template) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <DialogTitle>{template.name}</DialogTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline">{template.category}</Badge>
                  <span className="text-sm text-muted-foreground">{template.questions} perguntas</span>
                  <span className="text-sm text-muted-foreground">• {template.uses} usos</span>
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-3">
            {mockQuestions.map((question, index) => (
              <div key={question.id} className="p-4 rounded-xl bg-muted/30 border">
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{question.text}</p>
                    <Badge variant="outline" className="mt-2 text-xs">
                      {question.type}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Edit className="h-4 w-4" />
              Editar
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Copy className="h-4 w-4" />
              Duplicar
            </Button>
            <Button variant="outline" size="sm" className="gap-1 text-destructive">
              <Trash2 className="h-4 w-4" />
              Excluir
            </Button>
          </div>
          <Button className="gap-2">
            <Send className="h-4 w-4" />
            Usar Template
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
