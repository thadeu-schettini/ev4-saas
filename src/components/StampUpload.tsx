import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Trash2, Check, FileImage } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";

const STAMP_STORAGE_KEY = "medical_professional_stamp";

export const StampUpload = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [savedStamp, setSavedStamp] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STAMP_STORAGE_KEY);
    if (stored) {
      setSavedStamp(stored);
    }
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Arquivo inválido",
        description: "Por favor, selecione uma imagem (PNG, JPG, etc.).",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "Arquivo muito grande",
        description: "O carimbo deve ter no máximo 2MB.",
        variant: "destructive",
      });
      return;
    }

    // Convert to base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      localStorage.setItem(STAMP_STORAGE_KEY, base64String);
      setSavedStamp(base64String);
      toast({
        title: "Carimbo salvo",
        description: "Seu carimbo foi salvo com sucesso e será incluído nas prescrições.",
      });
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    localStorage.removeItem(STAMP_STORAGE_KEY);
    setSavedStamp(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    toast({
      title: "Carimbo removido",
      description: "Seu carimbo foi removido do sistema.",
    });
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold">Carimbo Digital</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Imagem PNG ou JPG (máx. 2MB)
          </p>
        </div>
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={handleUploadClick}
          >
            <Upload className="h-4 w-4" />
            {savedStamp ? "Atualizar" : "Fazer Upload"}
          </Button>
        </div>
      </div>

      {savedStamp ? (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-muted/30 rounded-md p-3 flex items-center justify-center">
                <img
                  src={savedStamp}
                  alt="Carimbo salvo"
                  className="max-h-24 max-w-full object-contain"
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1 text-xs text-green-600">
                  <Check className="h-3 w-3" />
                  <span>Salvo</span>
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
            <FileImage className="h-8 w-8 mx-auto mb-2 opacity-50" />
            Nenhum carimbo cadastrado
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export const getStoredStamp = (): string | null => {
  return localStorage.getItem(STAMP_STORAGE_KEY);
};