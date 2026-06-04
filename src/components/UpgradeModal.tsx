import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LockKeyhole, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureName: string;
}

export function UpgradeModal({ isOpen, onClose, featureName }: UpgradeModalProps) {
  const navigate = useNavigate();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md text-center">
        <DialogHeader>
          <div className="mx-auto w-12 h-12 bg-amber-500/10 text-amber-600 rounded-full flex items-center justify-center mb-4">
            <LockKeyhole className="w-6 h-6" />
          </div>
          <DialogTitle className="text-2xl font-bold mb-2">Recurso Premium</DialogTitle>
          <DialogDescription className="text-base text-muted-foreground">
            O recurso <strong className="text-foreground">{featureName}</strong> é exclusivo para assinantes dos planos Pro ou Enterprise.
          </DialogDescription>
        </DialogHeader>

        <div className="py-6 space-y-4">
          <p className="text-sm">
            Faça um upgrade agora para desbloquear todas as ferramentas, prompts infinitos e inteligência artificial técnica.
          </p>
          <Button 
            onClick={() => {
              onClose();
              navigate("/planos");
            }} 
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-12 text-lg rounded-xl flex items-center justify-center gap-2"
          >
            Ver Planos e Assinar <ArrowRight className="w-5 h-5" />
          </Button>
          <Button variant="ghost" onClick={onClose} className="w-full">
            Talvez mais tarde
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
