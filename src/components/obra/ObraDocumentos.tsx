import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, UploadCloud } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ObraDocumentos({ obra }: { obra: any }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Documentos e Contratos</h3>
        </div>
        <Button size="sm" className="rounded-full gap-2" variant="outline">
          <UploadCloud className="h-4 w-4" />
          Anexar Arquivo
        </Button>
      </div>

      <Card className="rounded-2xl border-dashed shadow-sm">
        <CardContent className="py-16 text-center text-muted-foreground">
          <FileText className="h-12 w-12 mx-auto text-muted-foreground opacity-20 mb-4" />
          <h4 className="text-foreground font-semibold mb-2">Área de Anexos</h4>
          <p className="text-sm max-w-md mx-auto">
            Faça upload de contratos, projetos arquitetônicos, orçamentos e comprovantes para manter tudo organizado em um só lugar.
          </p>
          <p className="text-[11px] mt-4 opacity-50">(Em desenvolvimento)</p>
        </CardContent>
      </Card>
    </div>
  );
}
