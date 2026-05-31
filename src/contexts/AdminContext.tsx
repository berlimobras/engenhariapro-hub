import { createContext, useContext, useState } from 'react';

interface AdminContextType {
  adminUser: {
    id: string;
    email: string;
    name: string;
    companyId: string;
    companyName: string;
  };
  currentCompanyId: string;
  setCurrentCompanyId: (id: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// UUID válido para uso em modo teste
const DEMO_COMPANY_ID = '550e8400-e29b-41d4-a716-446655440000';
const DEMO_USER_ID = 'f0a4fcb1-fc54-4e42-b690-07ba6c90dc9b';

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const adminUser = {
    id: DEMO_USER_ID,
    email: 'admin@obradomestre.local',
    name: 'Administrador',
    companyId: DEMO_COMPANY_ID,
    companyName: 'ObraDoMestre Demo',
  };

  const [currentCompanyId, setCurrentCompanyId] = useState(DEMO_COMPANY_ID);

  return (
    <AdminContext.Provider value={{ adminUser, currentCompanyId, setCurrentCompanyId }}>
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
