import { useRef, useState, useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Pen, Trash2, Save, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SIGNATURE_STORAGE_KEY = "medical_professional_signature";

export const SignaturePad = () => {
  const { toast } = useToast();
  const signaturePadRef = useRef<SignatureCanvas>(null);
  const [savedSignature, setSavedSignature] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(SIGNATURE_STORAGE_KEY);
    if (stored) {
      setSavedSignature(stored);
    }
  }, []);

  const handleClear = () => {
    signaturePadRef.current?.clear();
  };

  const handleSave = () => {
    if (signaturePadRef.current?.isEmpty()) {
      toast({
        title: "Assinatura vazia",
        description: "Por favor, desenhe sua assinatura antes de salvar.",
        variant: "destructive",
      });
      return;
    }

    const dataURL = signaturePadRef.current?.toDataURL();
    if (dataURL) {
      localStorage.setItem(SIGNATURE_STORAGE_KEY, dataURL);
      setSavedSignature(dataURL);
      setIsOpen(false);
      toast({
        title: "Assinatura salva",
        description: "Sua assinatura foi salva com sucesso e será incluída nas prescrições.",
      });
    }
  };

  const handleRemove = () => {
    localStorage.removeItem(SIGNATURE_STORAGE_KEY);
    setSavedSignature(null);
    toast({
      title: "Assinatura removida",
      description: "Sua assinatura foi removida do sistema.",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Assinatura Digital</h3>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Pen className="h-4 w-4" />
              {savedSignature ? "Atualizar" : "Criar"} Assinatura
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Assinatura Digital</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Desenhe sua assinatura abaixo. Ela será salva e incluída automaticamente em todas as suas prescrições.
              </p>
              <Card className="border-2 border-dashed">
                <CardContent className="p-0">
                  <SignatureCanvas
                    ref={signaturePadRef}
                    canvasProps={{
                      className: "w-full h-48 cursor-crosshair",
                    }}
                    backgroundColor="#ffffff"
                  />
                </CardContent>
              </Card>
              <div className="flex items-center gap-2">
                <Button onClick={handleClear} variant="outline" className="gap-2">
                  <Trash2 className="h-4 w-4" />
                  Limpar
                </Button>
                <Button onClick={handleSave} className="gap-2 flex-1">
                  <Save className="h-4 w-4" />
                  Salvar Assinatura
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {savedSignature ? (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-muted/30 rounded-md p-3 flex items-center justify-center">
                <img 
                  src={savedSignature} 
                  alt="Assinatura salva" 
                  className="h-16 object-contain"
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1 text-xs text-green-600">
                  <Check className="h-3 w-3" />
                  <span>Salva</span>
                </div>
                <Button 
                  onClick={handleRemove} 
                  variant="ghost" 
                  size="sm"
                  className="h-7 gap-1 text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-3 w-3" />
                  Remover
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-dashed">
          <CardContent className="p-6 text-center text-sm text-muted-foreground">
            Nenhuma assinatura cadastrada
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export const getStoredSignature = (): string | null => {
  return localStorage.getItem(SIGNATURE_STORAGE_KEY);
};