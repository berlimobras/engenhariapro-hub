import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface AdminContextType {
  adminUser: {
    id: string;
    email: string;
    name: string;
    companyId: string;
    companyName: string;
  } | null;
  currentCompanyId: string | null;
  setCurrentCompanyId: (id: string) => void;
  isLoading: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [adminUser, setAdminUser] = useState<AdminContextType['adminUser']>(null);
  const [currentCompanyId, setCurrentCompanyId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          // Buscar perfil
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          // Buscar empresa (pega a primeira que ele é dono ou membro)
          // No nosso MVP o usuário recém criado é dono.
          const { data: companies } = await supabase
            .from('companies')
            .select('*')
            .eq('owner_id', session.user.id);
            
          let userCompany = companies && companies.length > 0 ? companies[0] : null;

          // Se não for dono, busca como membro
          if (!userCompany) {
            const { data: members } = await supabase
              .from('company_members')
              .select('company_id, companies(*)')
              .eq('user_id', session.user.id);
            
            if (members && members.length > 0) {
              userCompany = members[0].companies;
            }
          }

          if (userCompany) {
            setAdminUser({
              id: session.user.id,
              email: session.user.email || '',
              name: profile?.full_name || session.user.email || '',
              companyId: userCompany.id,
              companyName: userCompany.name,
            });
            setCurrentCompanyId(userCompany.id);
          }
        } else {
          setAdminUser(null);
          setCurrentCompanyId(null);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      fetchUserData();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AdminContext.Provider value={{ adminUser, currentCompanyId, setCurrentCompanyId, isLoading }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
}
