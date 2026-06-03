import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAdmin } from '@/contexts/AdminContext';
import { useObras } from '@/hooks/useObras';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Printer } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

// Importaremos os componentes das abas em breve
import ObraVisaoGeral from '@/components/obra/ObraVisaoGeral';
import ObraProcessos from '@/components/obra/ObraProcessos';
import ObraEquipe from '@/components/obra/ObraEquipe';
import ObraChecklistPresenca from '@/components/obra/ObraChecklistPresenca';
import ObraMateriais from '@/components/obra/ObraMateriais';
import ObraFinanceiro from '@/components/obra/ObraFinanceiro';
import ObraDocumentos from '@/components/obra/ObraDocumentos';

export default function ObraDashboard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("visao-geral");
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportConfig, setReportConfig] = useState({
    detalhes: true,
    processos: true,
    equipe: true,
    financeiro: true
  });
  
  const { adminUser } = useAdmin();
  const { data: obras = [], isLoading } = useObras(adminUser.companyId);
  
  const obra = obras.find(o => o.id === id);

  if (isLoading) {
    return <div className="text-center py-12">Carregando obra...</div>;
  }

  if (!obra) {
    return (
      <div className="text-center py-12 space-y-4">
        <p className="text-muted-foreground">Obra não encontrada.</p>
        <Button onClick={() => navigate('/obras')} variant="outline">Voltar para Obras</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/obras')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <PageHeader
            title={obra.name}
            description={obra.client_name ? `Cliente: ${obra.client_name}` : 'Gestão completa do projeto'}
          />
        </div>
        <Button onClick={() => setShowReportModal(true)} className="gap-2 bg-stone-900 hover:bg-stone-800">
          <Printer className="h-4 w-4" />
          Gerar Relatório
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 md:grid-cols-7 w-full h-auto gap-2 p-1">
          <TabsTrigger value="visao-geral">Visão Geral</TabsTrigger>
          <TabsTrigger value="processos">Processos</TabsTrigger>
          <TabsTrigger value="equipe">Equipe</TabsTrigger>
          <TabsTrigger value="presenca">Presença</TabsTrigger>
          <TabsTrigger value="materiais">Materiais</TabsTrigger>
          <TabsTrigger value="financeiro">Financeiro</TabsTrigger>
          <TabsTrigger value="documentos">Documentos</TabsTrigger>
        </TabsList>
        
        <div className="mt-6">
          <TabsContent value="visao-geral">
            <ObraVisaoGeral obra={obra} setActiveTab={setActiveTab} />
          </TabsContent>
          
          <TabsContent value="processos">
            <ObraProcessos obra={obra} />
          </TabsContent>
          
          <TabsContent value="equipe">
            <ObraEquipe obra={obra} />
          </TabsContent>
          
          <TabsContent value="presenca">
            <ObraChecklistPresenca obra={obra} />
          </TabsContent>
          
          <TabsContent value="materiais">
            <ObraMateriais obra={obra} />
          </TabsContent>
          
          <TabsContent value="financeiro">
            <ObraFinanceiro obra={obra} />
          </TabsContent>

          <TabsContent value="documentos">
            <ObraDocumentos obra={obra} />
          </TabsContent>
        </div>
      </Tabs>

      <Dialog open={showReportModal} onOpenChange={setShowReportModal}>
        <DialogContent className="sm:max-w-[425px] rounded-2xl">
          <DialogHeader>
            <DialogTitle>Extrair Relatório</DialogTitle>
            <DialogDescription>Selecione as informações que deseja incluir no documento.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="r-detalhes" 
                checked={reportConfig.detalhes} 
                onCheckedChange={(c) => setReportConfig({...reportConfig, detalhes: !!c})} 
              />
              <Label htmlFor="r-detalhes">Detalhes da Obra e Progresso</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="r-processos" 
                checked={reportConfig.processos} 
                onCheckedChange={(c) => setReportConfig({...reportConfig, processos: !!c})} 
              />
              <Label htmlFor="r-processos">Checklist de Processos</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="r-equipe" 
                checked={reportConfig.equipe} 
                onCheckedChange={(c) => setReportConfig({...reportConfig, equipe: !!c})} 
              />
              <Label htmlFor="r-equipe">Equipe Alocada e Presenças</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="r-financeiro" 
                checked={reportConfig.financeiro} 
                onCheckedChange={(c) => setReportConfig({...reportConfig, financeiro: !!c})} 
              />
              <Label htmlFor="r-financeiro">Financeiro e Materiais</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReportModal(false)}>Cancelar</Button>
            <Button onClick={() => {
              setShowReportModal(false);
              const configQuery = encodeURIComponent(JSON.stringify(reportConfig));
              window.open(`/obras/${obra.id}/relatorio?config=${configQuery}`, '_blank');
            }}>
              <Printer className="h-4 w-4 mr-2" /> Gerar PDF / Imprimir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
