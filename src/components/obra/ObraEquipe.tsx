import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Plus, Trash2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAdmin } from '@/contexts/AdminContext';
import { toast } from 'sonner';

export default function ObraEquipe({ obra }: { obra: any }) {
  const { adminUser } = useAdmin();
  const [showAdd, setShowAdd] = useState(false);

  const { data: equipe = [], refetch } = useQuery({
    queryKey: ['obra_equipe', obra.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('obra_funcionarios')
        .select('*, funcionario:funcionarios(*)')
        .eq('obra_id', obra.id);
      if (error) throw error;
      return data;
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Users className="h-5 w-5" /> Equipe Alocada
        </h3>
        <Button onClick={() => toast.info('Funcionalidade de alocar funcionário em desenvolvimento')} size="sm">
          <Plus className="h-4 w-4 mr-1" /> Adicionar Membro
        </Button>
      </div>

      <div className="grid gap-4">
        {equipe.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              Nenhum funcionário alocado nesta obra ainda.
            </CardContent>
          </Card>
        ) : (
          equipe.map((membro: any) => (
            <Card key={membro.id}>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <div className="font-semibold">{membro.funcionario?.name}</div>
                  <div className="text-sm text-muted-foreground">Cargo: {membro.funcionario?.role || 'Não definido'}</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right text-sm">
                    <div className="text-muted-foreground">Diária: R$ {membro.daily_rate}</div>
                    <div className="text-emerald-600">Extra: R$ {membro.extra_value || 0}</div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
