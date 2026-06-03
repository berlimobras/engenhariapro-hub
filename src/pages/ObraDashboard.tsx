import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAdmin } from '@/contexts/AdminContext';
import { useObras } from '@/hooks/useObras';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Importaremos os componentes das abas em breve
import ObraVisaoGeral from '@/components/obra/ObraVisaoGeral';
import ObraEquipe from '@/components/obra/ObraEquipe';
import ObraChecklistPresenca from '@/components/obra/ObraChecklistPresenca';
import ObraMateriais from '@/components/obra/ObraMateriais';
import ObraDocumentos from '@/components/obra/ObraDocumentos';

export default function ObraDashboard() {
  const { id } = useParams();
  const navigate = useNavigate();
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
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/obras')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <PageHeader
          title={obra.name}
          description={obra.client_name ? `Cliente: ${obra.client_name}` : 'Gestão completa do projeto'}
        />
      </div>

      <Tabs defaultValue="visao-geral" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full h-auto gap-2 p-1">
          <TabsTrigger value="visao-geral">Visão Geral</TabsTrigger>
          <TabsTrigger value="equipe">Equipe</TabsTrigger>
          <TabsTrigger value="presenca">Presença</TabsTrigger>
          <TabsTrigger value="materiais">Materiais</TabsTrigger>
          <TabsTrigger value="documentos">Documentos</TabsTrigger>
        </TabsList>
        
        <div className="mt-6">
          <TabsContent value="visao-geral">
            <ObraVisaoGeral obra={obra} />
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
          
          <TabsContent value="documentos">
            <ObraDocumentos obra={obra} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
