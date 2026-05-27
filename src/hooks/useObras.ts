import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

// Tipos
export interface Obra {
  id: string;
  company_id: string;
  name: string;
  address?: string;
  status: 'planejamento' | 'em_andamento' | 'pausada' | 'concluida' | 'cancelada';
  start_date?: string;
  end_date?: string;
  client_name?: string;
  client_phone?: string;
  client_email?: string;
  budget_estimated?: number;
  budget_actual?: number;
  description?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateObraInput {
  name: string;
  address?: string;
  status?: string;
  start_date?: string;
  end_date?: string;
  client_name?: string;
  client_phone?: string;
  budget_estimated?: number;
  description?: string;
}

// Hook para listar obras
export function useObras(companyId: string) {
  return useQuery({
    queryKey: ['obras', companyId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('obras')
        .select('*')
        .eq('company_id', companyId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Obra[];
    },
    enabled: !!companyId,
  });
}

// Hook para criar obra
export function useCreateObra() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateObraInput & { company_id: string }) => {
      const { data, error } = await supabase
        .from('obras')
        .insert([input])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['obras', data.company_id] });
    },
  });
}

// Hook para atualizar obra
export function useUpdateObra() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: { id: string; company_id: string } & Partial<CreateObraInput>) => {
      const { id, company_id, ...updates } = input;
      const { data, error } = await supabase
        .from('obras')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['obras', data.company_id] });
    },
  });
}

// Hook para deletar obra
export function useDeleteObra() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, company_id }: { id: string; company_id: string }) => {
      const { error } = await supabase
        .from('obras')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return { id, company_id };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['obras', data.company_id] });
    },
  });
}
