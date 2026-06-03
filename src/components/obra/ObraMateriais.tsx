import { Card, CardContent } from '@/components/ui/card';
import { PackageSearch } from 'lucide-react';

export default function ObraMateriais({ obra }: { obra: any }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <PackageSearch className="h-5 w-5" />
        <h3 className="text-lg font-semibold">Controle de Materiais</h3>
      </div>
      
      <Card>
        <CardContent className="py-12 text-center text-muted-foreground">
          Controle o estoque e o uso dos materiais vinculados a este projeto.
          <br/>(Interface em desenvolvimento)
        </CardContent>
      </Card>
    </div>
  );
}
