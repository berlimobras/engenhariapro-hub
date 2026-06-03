import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export interface Funcionario {
  id: string;
  company_id: string;
  name: string;
  cpf?: string;
  phone?: string;
  email?: string;
  photo_url?: string;
  role?: string;
  salary?: number;
  hire_date?: string;
  payment_type?: string;
  status: 'ativo' | 'inativo' | 'ferias';
  created_at: string;
  updated_at: string;
}

export interface CreateFuncionarioInput {
  name: string;
  cpf?: string;
  phone?: string;
  email?: string;
  photo_url?: string;
  role?: string;
  salary?: number;
  hire_date?: string;
  payment_type?: string;
  status?: string;
}

export function useFuncionarios(companyId: string) {
  return useQuery({
    queryKey: ['funcionarios', companyId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('funcionarios')
        .select('*')
        .eq('company_id', companyId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Funcionario[];
    },
    enabled: !!companyId,
  });
}

export function useCreateFuncionario() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateFuncionarioInput & { company_id: string }) => {
      const { data, error } = await supabase
        .from('funcionarios')
        .insert([input])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['funcionarios', data.company_id] });
    },
  });
}

export function useUpdateFuncionario() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: { id: string; company_id: string } & Partial<CreateFuncionarioInput>) => {
      const { id, company_id, ...updates } = input;
      const { data, error } = await supabase
        .from('funcionarios')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['funcionarios', data.company_id] });
    },
  });
}

export function useDeleteFuncionario() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, company_id }: { id: string; company_id: string }) => {
      const { error } = await supabase
        .from('funcionarios')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return { id, company_id };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['funcionarios', data.company_id] });
    },
  });
}
