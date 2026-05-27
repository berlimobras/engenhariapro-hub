import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

export default function Callback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      const { data } = await supabase.auth.getSession();

      if (data?.session) {
        navigate('/onboarding');
      } else {
        navigate('/auth/login');
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-accent" />
        <p className="mt-4 text-muted-foreground">Processando autenticação...</p>
      </div>
    </div>
  );
}
