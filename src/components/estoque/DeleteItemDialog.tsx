import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertTriangle, Package, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface DeleteItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: {
    id: number;
    name: string;
    quantity: number;
    unit: string;
  } | null;
}

export function DeleteItemDialog({ open, onOpenChange, item }: DeleteItemDialogProps) {
  if (!item) return null;

  const handleDelete = () => {
    toast.success(`Item "${item.name}" excluído com sucesso!`);
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-12 w-12 rounded-xl bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <AlertDialogTitle>Excluir Item do Estoque</AlertDialogTitle>
              <p className="text-sm text-muted-foreground mt-1">Esta ação não pode ser desfeita</p>
            </div>
          </div>
          
          <div className="p-4 rounded-xl bg-muted/30 border my-4">
            <div className="flex items-center gap-3">
              <Package className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-muted-foreground">
                  Quantidade atual: {item.quantity} {item.unit}
                </p>
              </div>
            </div>
          </div>

          <AlertDialogDescription>
            Ao excluir este item, todo o histórico de movimentações também será removido. 
            Você tem certeza que deseja continuar?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Excluir Item
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
