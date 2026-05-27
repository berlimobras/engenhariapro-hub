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

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const adminUser = {
    id: 'admin-001',
    email: 'admin@obradomestre.local',
    name: 'Administrador',
    companyId: 'company-001',
    companyName: 'ObraDoMestre Demo',
  };

  const [currentCompanyId, setCurrentCompanyId] = useState('company-001');

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
