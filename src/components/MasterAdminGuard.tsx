import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Loader2 } from 'lucide-react';

// Email exclusivo de administração
const MASTER_ADMIN_EMAIL = 'berlimobras@gmail.com';

export function MasterAdminGuard({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isMaster, setIsMaster] = useState(false);

  useEffect(() => {
    const checkMasterAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/login');
        return;
      }

      // Verifica se o email logado é o email mestre
      if (session.user.email?.toLowerCase() === MASTER_ADMIN_EMAIL.toLowerCase()) {
        setIsMaster(true);
      } else {
        // Redireciona para o painel comum de construtoras se tentar invadir
        navigate('/');
      }
      setLoading(false);
    };

    checkMasterAdmin();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50 text-orange-600">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!isMaster) {
    return null; // Will redirect
  }

  return <>{children}</>;
}
