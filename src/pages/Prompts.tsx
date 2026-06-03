import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, Check, MessageSquareTerminal } from "lucide-react";
import { promptsData, PromptItem } from "@/data/promptsData";

export default function Prompts() {
  const [selectedPrompt, setSelectedPrompt] = useState<PromptItem | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (selectedPrompt) {
      navigator.clipboard.writeText(selectedPrompt.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="animate-fade-in space-y-8 pb-10">
      <PageHeader
        title="Biblioteca de Prompts"
        description="Acesse 102 prompts engenharia avançada. Clique em um card para copiar e colar na sua IA favorita."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {promptsData.map((prompt) => (
          <div
            key={prompt.id}
            onClick={() => setSelectedPrompt(prompt)}
            className="group cursor-pointer rounded-3xl border border-border/50 bg-card p-6 flex flex-col shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden aspect-[4/3]"
          >
            {/* Decoração sutil de fundo */}
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors duration-500" />
            
            <div className="w-12 h-12 rounded-2xl bg-stone-100 flex items-center justify-center mb-4 border border-border/50 group-hover:bg-primary group-hover:border-primary transition-colors duration-300 shadow-sm shrink-0">
              <MessageSquareTerminal className="w-5 h-5 text-stone-600 group-hover:text-white transition-colors" />
            </div>

            <div className="mb-auto">
              <span className="text-[10px] font-black uppercase tracking-widest text-primary/70 mb-2 block">Prompt #{prompt.id}</span>
              <h3 className="font-bold text-foreground text-base leading-tight group-hover:text-primary transition-colors line-clamp-3">
                {prompt.title}
              </h3>
            </div>
            
            <div className="mt-4 pt-4 border-t border-border/50">
              <span className="text-xs font-bold text-muted-foreground group-hover:text-primary flex items-center gap-1 transition-colors uppercase tracking-widest">
                Visualizar Prompt &rarr;
              </span>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!selectedPrompt} onOpenChange={(open) => !open && setSelectedPrompt(null)}>
        <DialogContent className="sm:max-w-xl p-0 overflow-hidden border-0 rounded-[2rem] bg-background">
          {selectedPrompt && (
            <div className="flex flex-col h-full max-h-[85vh]">
              <div className="p-6 pb-4 bg-stone-100/50 border-b border-border/50">
                <DialogHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shrink-0">
                      <MessageSquareTerminal className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-primary block">Prompt #{selectedPrompt.id}</span>
                      <DialogTitle className="text-lg font-black text-foreground">{selectedPrompt.title}</DialogTitle>
                    </div>
                  </div>
                  <DialogDescription className="text-sm font-medium text-muted-foreground leading-relaxed mt-2">
                    {selectedPrompt.orientation}
                  </DialogDescription>
                </DialogHeader>
              </div>

              <div className="p-6 overflow-y-auto">
                <div className="relative">
                  <div className="absolute top-3 right-3">
                    <Button 
                      size="sm" 
                      variant={copied ? "default" : "secondary"}
                      className={`h-8 rounded-lg shadow-sm gap-1.5 transition-all ${copied ? 'bg-emerald-500 hover:bg-emerald-600 text-white' : ''}`}
                      onClick={handleCopy}
                    >
                      {copied ? (
                        <><Check className="w-3.5 h-3.5" /> Copiado</>
                      ) : (
                        <><Copy className="w-3.5 h-3.5" /> Copiar</>
                      )}
                    </Button>
                  </div>
                  <pre className="bg-[#1e1e1e] text-[#d4d4d4] p-5 pt-14 rounded-2xl overflow-x-auto text-sm font-mono leading-relaxed border border-stone-800 shadow-inner">
                    <code>{selectedPrompt.content}</code>
                  </pre>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <Button variant="outline" className="rounded-xl font-bold" onClick={() => setSelectedPrompt(null)}>
                    Fechar
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
