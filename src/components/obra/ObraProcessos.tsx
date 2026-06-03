import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle2, Circle, Plus, Trash2, ListTodo } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export default function ObraProcessos({ obra }: { obra: any }) {
  const queryClient = useQueryClient();
  const [newTask, setNewTask] = useState('');

  const { data: checklists = [], isLoading } = useQuery({
    queryKey: ['obra_checklists', obra.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('obra_checklists')
        .select('*')
        .eq('obra_id', obra.id)
        .order('created_at', { ascending: true });
      if (error) throw error;
      return data;
    },
    enabled: !!obra.id
  });

  const addTask = useMutation({
    mutationFn: async (taskText: string) => {
      const { error } = await supabase
        .from('obra_checklists')
        .insert({ obra_id: obra.id, task: taskText, is_completed: false });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['obra_checklists', obra.id] });
      setNewTask('');
    },
    onError: (err: any) => toast.error('Erro ao adicionar processo: ' + err.message)
  });

  const toggleTask = useMutation({
    mutationFn: async ({ id, is_completed }: { id: string, is_completed: boolean }) => {
      const { error } = await supabase
        .from('obra_checklists')
        .update({ is_completed: !is_completed })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['obra_checklists', obra.id] });
    }
  });

  const deleteTask = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('obra_checklists')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['obra_checklists', obra.id] });
    }
  });

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    addTask.mutate(newTask);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <ListTodo className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Processos a Executar</h3>
      </div>

      <Card className="rounded-2xl border-0 shadow-sm bg-card flex flex-col max-w-3xl">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Cronograma e Tarefas</CardTitle>
          <p className="text-sm text-muted-foreground">Adicione e acompanhe as etapas para evoluir o progresso da obra.</p>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <form onSubmit={handleAddTask} className="flex gap-2 mb-6 shrink-0">
            <Input 
              placeholder="Nova etapa (ex: Fundação, Hidráulica)..." 
              value={newTask}
              onChange={e => setNewTask(e.target.value)}
              className="bg-background"
            />
            <Button type="submit" disabled={addTask.isPending}>
              <Plus className="h-4 w-4 mr-2" /> Adicionar Processo
            </Button>
          </form>

          <div className="flex-1 space-y-2">
            {isLoading ? (
              <p className="text-sm text-muted-foreground text-center py-4">Carregando processos...</p>
            ) : checklists.length === 0 ? (
              <div className="text-center py-12 border border-dashed rounded-xl">
                <ListTodo className="h-10 w-10 mx-auto text-muted-foreground opacity-20 mb-3" />
                <p className="text-sm text-muted-foreground">Nenhuma etapa adicionada. Comece criando o cronograma acima.</p>
              </div>
            ) : (
              checklists.map((task: any) => (
                <div key={task.id} className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors bg-background">
                  <button 
                    onClick={() => toggleTask.mutate({ id: task.id, is_completed: task.is_completed })}
                    className="flex items-center gap-3 flex-1 text-left"
                  >
                    {task.is_completed ? (
                      <CheckCircle2 className="h-6 w-6 text-emerald-500 shrink-0" />
                    ) : (
                      <Circle className="h-6 w-6 text-muted-foreground shrink-0" />
                    )}
                    <div>
                      <span className={`text-sm font-medium ${task.is_completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                        {task.task}
                      </span>
                      {task.updated_at && (
                        <p className="text-[10px] text-muted-foreground mt-0.5">Última alteração: {new Date(task.updated_at).toLocaleString('pt-BR')}</p>
                      )}
                    </div>
                  </button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => {
                      if(confirm('Apagar processo?')) deleteTask.mutate(task.id);
                    }}
                    className="h-8 w-8 text-muted-foreground hover:text-destructive shrink-0 ml-2"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
