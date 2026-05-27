import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';

const DEMO_COMPANY_ID = '550e8400-e29b-41d4-a716-446655440000';

export function useInitializeCompany() {
  useEffect(() => {
    const initializeCompany = async () => {
      try {
        // Verifica se a empresa já existe
        const { data, error } = await supabase
          .from('companies')
          .select('id')
          .eq('id', DEMO_COMPANY_ID)
          .single();

        if (error && error.code === 'PGRST116') {
          // Empresa não existe, criar
          const { error: createError } = await supabase
            .from('companies')
            .insert({
              id: DEMO_COMPANY_ID,
              name: 'ObraDoMestre Demo',
              slug: 'obradomestre-demo',
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            });

          if (createError) {
            console.error('Erro ao criar empresa demo:', createError);
          } else {
            console.log('✅ Empresa demo criada com sucesso');
          }
        } else if (error) {
          console.error('Erro ao verificar empresa:', error);
        } else {
          console.log('✅ Empresa demo já existe');
        }
      } catch (err) {
        console.error('Erro ao inicializar empresa:', err);
      }
    };

    initializeCompany();
  }, []);
}
