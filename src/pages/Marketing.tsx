import { useState, useRef } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Upload, AlertCircle, LayoutTemplate } from "lucide-react";
import { toast } from "sonner";
import html2canvas from "html2canvas";
import { marketingPhrases } from "@/data/marketingPhrases";

export default function Marketing() {
  const [title, setTitle] = useState("A Casa dos Seus Sonhos Existe.");
  const [phrase, setPhrase] = useState("Da ideia inicial ao acabamento final, estamos com você para construir o seu lar.");
  const [contact, setContact] = useState("www.berlimobras.com.br | @berlimobras");
  const [primaryColor, setPrimaryColor] = useState("#f97316"); // Orange
  const [secondaryColor, setSecondaryColor] = useState("#1c1917"); // Dark stone
  const [bgImage, setBgImage] = useState("https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80");
  const [logoImage, setLogoImage] = useState("");
  const [template, setTemplate] = useState("1");
  const [selectedCategory, setSelectedCategory] = useState(marketingPhrases[0].name);

  const previewRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!previewRef.current) return;
    
    try {
      toast.info("Gerando imagem, aguarde...");
      const canvas = await html2canvas(previewRef.current, {
        scale: 2, // High resolution
        useCORS: true,
        allowTaint: true,
        backgroundColor: null
      });
      
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = `post-marketing-${Date.now()}.png`;
      link.click();
      toast.success("Imagem baixada com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao gerar imagem. Tente usar imagens com links públicos ou faça upload direto do seu PC.");
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setter(url);
    }
  };

  const applyPhrase = (t: string, p: string) => {
    setTitle(t);
    setPhrase(p);
    toast.success("Frase aplicada ao post!");
  };

  return (
    <div className="animate-fade-in space-y-8 pb-10">
      <PageHeader
        title="Gerador de Posts (Instagram)"
        description="Crie artes profissionais e baixe instantaneamente para suas redes sociais."
      />

      <div className="flex items-start gap-3 bg-amber-500/10 border border-amber-500/20 text-amber-600 p-4 rounded-2xl">
        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
        <div className="text-sm font-medium">
          <strong>Aviso de Privacidade:</strong> Este gerador roda 100% no seu navegador para ser ultra-rápido. As imagens e textos que você alterar aqui <strong>não são salvas na nuvem</strong>. Ao atualizar a página, o gerador voltará ao padrão. Certifique-se de clicar em "Baixar Imagem" assim que finalizar sua arte!
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* LEFT PANEL: CONTROLS */}
        <div className="xl:col-span-7 space-y-8">
          
          <div className="bg-card p-6 rounded-3xl border border-border/50 shadow-sm space-y-6">
            <h3 className="text-lg font-black flex items-center gap-2">
              <LayoutTemplate className="w-5 h-5 text-primary" />
              1. Estilo & Cores
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Layout (Template)</Label>
                <Select value={template} onValueChange={setTemplate}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Modelo 1 (Caixa Flutuante)</SelectItem>
                    <SelectItem value="2">Modelo 2 (Sólido & Forma)</SelectItem>
                    <SelectItem value="3">Modelo 3 (Clean Branco)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Cor Primária</Label>
                <div className="flex gap-2">
                  <Input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="w-12 h-10 p-1 cursor-pointer" />
                  <Input type="text" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="font-mono text-xs uppercase" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Cor Secundária</Label>
                <div className="flex gap-2">
                  <Input type="color" value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} className="w-12 h-10 p-1 cursor-pointer" />
                  <Input type="text" value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} className="font-mono text-xs uppercase" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card p-6 rounded-3xl border border-border/50 shadow-sm space-y-6">
            <h3 className="text-lg font-black flex items-center gap-2">
              <Upload className="w-5 h-5 text-primary" />
              2. Imagens
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label>Foto de Fundo (Obra)</Label>
                <div className="flex items-center gap-2">
                  <Label htmlFor="bg-upload" className="cursor-pointer bg-secondary text-secondary-foreground hover:bg-secondary/80 px-4 py-2 rounded-lg font-medium text-sm transition-colors flex-1 text-center">
                    Fazer Upload (PC)
                  </Label>
                  <input id="bg-upload" type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, setBgImage)} />
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 flex items-center left-3">
                    <span className="text-xs text-muted-foreground font-bold uppercase">Ou URL:</span>
                  </div>
                  <Input type="text" value={bgImage} onChange={(e) => setBgImage(e.target.value)} className="pl-16 text-xs" placeholder="Cole o link da imagem..." />
                </div>
              </div>

              <div className="space-y-3">
                <Label>Sua Logo (Opcional, fundo transparente)</Label>
                <div className="flex items-center gap-2">
                  <Label htmlFor="logo-upload" className="cursor-pointer bg-secondary text-secondary-foreground hover:bg-secondary/80 px-4 py-2 rounded-lg font-medium text-sm transition-colors flex-1 text-center">
                    Fazer Upload (PC)
                  </Label>
                  <input id="logo-upload" type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, setLogoImage)} />
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 flex items-center left-3">
                    <span className="text-xs text-muted-foreground font-bold uppercase">Ou URL:</span>
                  </div>
                  <Input type="text" value={logoImage} onChange={(e) => setLogoImage(e.target.value)} className="pl-16 text-xs" placeholder="Link da logo PNG..." />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card p-6 rounded-3xl border border-border/50 shadow-sm space-y-6">
            <h3 className="text-lg font-black flex items-center gap-2">
              <LayoutTemplate className="w-5 h-5 text-primary" />
              3. Textos do Post
            </h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Título Chamativo</Label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ex: Obras de luxo feitas para caber no seu bolso!" />
              </div>
              <div className="space-y-2">
                <Label>Frase / Subtítulo</Label>
                <Input value={phrase} onChange={(e) => setPhrase(e.target.value)} placeholder="Ex: Achou que projetos de luxo são inacessíveis? Pense de novo." />
              </div>
              <div className="space-y-2">
                <Label>Contato (Rodapé)</Label>
                <Input value={contact} onChange={(e) => setContact(e.target.value)} placeholder="www.seusite.com.br | @instagram" />
              </div>
            </div>

            <div className="pt-6 border-t border-border/50">
              <Label className="text-muted-foreground mb-4 block">Precisando de inspiração? Clique em uma frase abaixo:</Label>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="mb-4 bg-stone-50">
                  <SelectValue placeholder="Categoria de Frases" />
                </SelectTrigger>
                <SelectContent>
                  {marketingPhrases.map(cat => (
                    <SelectItem key={cat.name} value={cat.name}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="space-y-3">
                {marketingPhrases.find(c => c.name === selectedCategory)?.phrases.map((p, i) => (
                  <div 
                    key={i} 
                    onClick={() => applyPhrase(p.title, p.text)}
                    className="p-3 rounded-xl border border-border/50 hover:border-primary/50 hover:bg-primary/5 cursor-pointer transition-colors group"
                  >
                    <strong className="block text-sm text-foreground group-hover:text-primary transition-colors">{p.title}</strong>
                    <span className="text-xs text-muted-foreground mt-1 block">{p.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT PANEL: PREVIEW */}
        <div className="xl:col-span-5 space-y-6">
          <div className="sticky top-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-black">Preview do Post</h3>
              <Button onClick={handleDownload} className="rounded-xl font-bold gap-2 bg-primary text-white hover:bg-primary/90">
                <Download className="w-4 h-4" />
                Baixar Imagem
              </Button>
            </div>

            <div className="bg-stone-100 rounded-[2.5rem] p-4 flex items-center justify-center border border-border/50 shadow-inner overflow-hidden">
              {/* O Container do Canvas - Forçado em 1080x1080 e escalonado com CSS para caber na tela */}
              <div 
                className="relative bg-white shadow-xl origin-top-left overflow-hidden" 
                style={{ 
                  width: '1080px', 
                  height: '1080px', 
                  transform: 'scale(0.35)', 
                  marginBottom: '-702px', // (1080 - 1080*0.35) compensação de escala
                  marginRight: '-702px'
                }}
              >
                {/* O elemento que será printado */}
                <div ref={previewRef} className="w-full h-full relative flex flex-col font-sans bg-white overflow-hidden" style={{ letterSpacing: '-0.02em' }}>
                  
                  {/* TEMPLATE 1: CAIXA FLUTUANTE */}
                  {template === "1" && (
                    <>
                      <img src={bgImage} alt="Fundo" className="absolute inset-0 w-full h-full object-cover" crossOrigin="anonymous" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                      
                      {/* Caixa de Texto Esquerda */}
                      <div className="absolute left-16 top-1/4 w-[450px] flex flex-col items-start z-10">
                        <div className="p-12 shadow-2xl" style={{ backgroundColor: secondaryColor }}>
                          <h1 className="text-6xl font-black text-white leading-[1.1] mb-6">
                            {title.split(' ').map((word, i) => (
                              i === 2 || i === 5 ? <span key={i} style={{ color: primaryColor }}>{word} </span> : <span key={i}>{word} </span>
                            ))}
                          </h1>
                          <p className="text-2xl text-white/80 leading-snug border-l-4 pl-4" style={{ borderColor: primaryColor }}>
                            {phrase}
                          </p>
                        </div>
                      </div>

                      {/* Decoração Geométrica */}
                      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full mix-blend-multiply opacity-80" style={{ backgroundColor: primaryColor }} />
                    </>
                  )}

                  {/* TEMPLATE 2: SÓLIDO & FORMA (CASA) */}
                  {template === "2" && (
                    <>
                      <div className="absolute inset-0 w-full h-full" style={{ backgroundColor: primaryColor }} />
                      
                      {/* Fundo com imagem em um clip-path estilo casa */}
                      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[600px]" style={{ clipPath: 'polygon(50% 0%, 100% 38%, 100% 100%, 0 100%, 0% 38%)' }}>
                        <img src={bgImage} alt="Fundo" className="w-full h-full object-cover" crossOrigin="anonymous" />
                        <div className="absolute inset-0 bg-black/20" />
                      </div>

                      {/* Caixa de texto sobrepondo a imagem */}
                      <div className="absolute top-[480px] left-1/2 -translate-x-1/2 w-[600px] p-10 shadow-2xl text-center" style={{ backgroundColor: secondaryColor }}>
                        <h1 className="text-5xl font-black text-white leading-tight mb-4">
                          {title}
                        </h1>
                        <p className="text-xl text-white/80">
                          {phrase}
                        </p>
                      </div>
                    </>
                  )}

                  {/* TEMPLATE 3: CLEAN BRANCO */}
                  {template === "3" && (
                    <>
                      <div className="absolute inset-0 bg-white" />
                      
                      <div className="absolute top-0 left-0 w-full h-[55%]">
                        <img src={bgImage} alt="Fundo" className="w-full h-full object-cover" crossOrigin="anonymous" />
                      </div>

                      <div className="absolute bottom-32 left-16 right-16 z-10 flex flex-col items-center text-center">
                        <div className="p-4 px-8 inline-block rounded-full mb-6" style={{ backgroundColor: primaryColor }}>
                          <span className="text-white font-bold text-xl uppercase tracking-widest">Destaque</span>
                        </div>
                        <h1 className="text-6xl font-black leading-tight mb-6" style={{ color: secondaryColor }}>
                          {title}
                        </h1>
                        <p className="text-2xl font-medium max-w-[800px]" style={{ color: secondaryColor, opacity: 0.7 }}>
                          {phrase}
                        </p>
                      </div>
                    </>
                  )}

                  {/* RODAPÉ E LOGO (COMUM A TODOS) */}
                  <div className="absolute bottom-0 left-0 w-full h-24 flex items-center justify-between px-16 z-20" style={{ backgroundColor: template === "3" ? secondaryColor : "rgba(0,0,0,0.4)" }}>
                    {logoImage ? (
                      <img src={logoImage} alt="Logo" className="h-12 object-contain" crossOrigin="anonymous" />
                    ) : (
                      <div className="flex items-center gap-3">
                        <LayoutTemplate className="w-8 h-8 text-white" />
                        <span className="text-2xl font-black text-white tracking-widest uppercase">Sua Logo</span>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-4 bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm">
                      <span className="text-white font-bold text-lg tracking-wide">{contact}</span>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            
            <p className="text-xs text-center text-muted-foreground mt-4 font-medium px-4">
              Dica: O preview está reduzido para caber na tela. O download será feito na resolução profissional 1080x1080px do Instagram.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
