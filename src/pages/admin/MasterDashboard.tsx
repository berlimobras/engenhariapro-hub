import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Users, HardHat, TrendingUp, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function MasterDashboard() {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState({
    companiesCount: 0,
    obrasCount: 0,
    usersCount: 0,
  });
  const [companies, setCompanies] = useState<any[]>([]);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        // Fetch companies
        const { data: companiesData } = await supabase.from('companies').select('*');
        if (companiesData) {
          setCompanies(companiesData);
          setMetrics(prev => ({ ...prev, companiesCount: companiesData.length }));
        }

        // Fetch obras
        const { count: obrasCount } = await supabase.from('obras').select('*', { count: 'exact', head: true });
        setMetrics(prev => ({ ...prev, obrasCount: obrasCount || 0 }));

        // Fetch profiles (users)
        const { count: usersCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
        setMetrics(prev => ({ ...prev, usersCount: usersCount || 0 }));

      } catch (error) {
        console.error('Error fetching master metrics', error);
      }
    };

    fetchMetrics();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="space-y-6 pb-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex justify-between items-center bg-card p-5 rounded-2xl shadow-sm border border-border">
          <div>
            <h1 className="text-xl lg:text-2xl font-black uppercase text-foreground tracking-tight">Portal Master</h1>
            <p className="text-sm text-muted-foreground font-medium mt-0.5">Gerenciamento global de Construtoras (SaaS)</p>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-none shadow-sm bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-1 pt-4">
              <CardTitle className="text-xs font-bold uppercase text-stone-500">Construtoras Ativas</CardTitle>
              <Building2 className="w-4 h-4 text-orange-600" />
            </CardHeader>
            <CardContent className="pb-4">
              <div className="text-2xl font-black text-stone-900">{metrics.companiesCount}</div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-1 pt-4">
              <CardTitle className="text-xs font-bold uppercase text-stone-500">Total de Obras</CardTitle>
              <HardHat className="w-4 h-4 text-orange-600" />
            </CardHeader>
            <CardContent className="pb-4">
              <div className="text-2xl font-black text-stone-900">{metrics.obrasCount}</div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-1 pt-4">
              <CardTitle className="text-xs font-bold uppercase text-stone-500">Usuários</CardTitle>
              <Users className="w-4 h-4 text-orange-600" />
            </CardHeader>
            <CardContent className="pb-4">
              <div className="text-2xl font-black text-stone-900">{metrics.usersCount}</div>
            </CardContent>
          </Card>
        </div>

        {/* List of Companies */}
        <Card className="border-none shadow-sm bg-white">
          <CardHeader className="py-4">
            <CardTitle className="text-sm font-bold uppercase text-stone-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-orange-600" /> 
              Relação de Clientes (Construtoras)
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 pb-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-stone-50 text-stone-500 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="px-4 py-2 rounded-tl-lg">ID</th>
                    <th className="px-4 py-2">Nome da Empresa</th>
                    <th className="px-4 py-2">Média de Obras</th>
                    <th className="px-4 py-2">Data de Cadastro</th>
                    <th className="px-4 py-2 rounded-tr-lg text-right">Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {companies.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-8 text-stone-500">
                        Nenhuma construtora cadastrada ainda.
                      </td>
                    </tr>
                  ) : (
                    companies.map(company => (
                      <tr key={company.id} className="border-b border-stone-100 last:border-0 hover:bg-stone-50 transition-colors">
                        <td className="px-4 py-2 font-mono text-[10px] text-stone-400">{company.id.split('-')[0]}...</td>
                        <td className="px-4 py-2 font-bold text-stone-900 text-xs">{company.name}</td>
                        <td className="px-4 py-2 text-stone-600 text-xs">{company.website?.replace('Média de Obras: ', '') || 'N/A'}</td>
                        <td className="px-4 py-2 text-stone-600 text-xs">{new Date(company.created_at).toLocaleDateString('pt-BR')}</td>
                        <td className="px-4 py-2 text-right">
                          <button className="text-[10px] font-bold text-stone-400 hover:text-orange-600 uppercase">
                            Gerenciar
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
