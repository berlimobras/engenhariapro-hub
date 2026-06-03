import { Card, CardContent } from '@/components/ui/card';
import { CalendarDays } from 'lucide-react';

export default function ObraChecklistPresenca({ obra }: { obra: any }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <CalendarDays className="h-5 w-5" />
        <h3 className="text-lg font-semibold">Checklist de Presença Diária</h3>
      </div>
      
      <Card>
        <CardContent className="py-12 text-center text-muted-foreground">
          Selecione uma data para registrar a presença da equipe alocada.
          <br/>(Interface em desenvolvimento)
        </CardContent>
      </Card>
    </div>
  );
}
