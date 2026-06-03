import { Card, CardContent } from '@/components/ui/card';
import { FileText, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ObraDocumentos({ obra }: { obra: any }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="h-5 w-5" />
        <h3 className="text-lg font-semibold">Documentos & Relatórios Automáticos</h3>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent className="p-6 space-y-4">
            <h4 className="font-semibold">Relatório Completo (PDF)</h4>
            <p className="text-sm text-muted-foreground">Gera um relatório nativo compilando equipe, financeiro e andamento da obra.</p>
            <Button className="w-full gap-2">
              <Printer className="h-4 w-4" /> Imprimir / Salvar PDF
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 space-y-4">
            <h4 className="font-semibold">Gerar Contrato Padrão</h4>
            <p className="text-sm text-muted-foreground">Puxa os dados da obra e cliente e formata um contrato inteligente para assinatura.</p>
            <Button variant="secondary" className="w-full gap-2">
              <FileText className="h-4 w-4" /> Visualizar Contrato
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
