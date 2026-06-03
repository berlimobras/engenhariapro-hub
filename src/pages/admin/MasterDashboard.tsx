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
    <div className="min-h-screen bg-stone-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-stone-200">
          <div>
            <h1 className="text-3xl font-black uppercase text-stone-900 tracking-tight">Portal Master</h1>
            <p className="text-stone-500 font-medium mt-1">Gerenciamento global de Construtoras (SaaS)</p>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-stone-500 hover:text-red-600 transition-colors font-semibold bg-stone-50 px-4 py-2 rounded-lg border border-stone-200"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-none shadow-sm bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-bold uppercase text-stone-500">Construtoras Ativas</CardTitle>
              <Building2 className="w-5 h-5 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black text-stone-900">{metrics.companiesCount}</div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-bold uppercase text-stone-500">Total de Obras</CardTitle>
              <HardHat className="w-5 h-5 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black text-stone-900">{metrics.obrasCount}</div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-bold uppercase text-stone-500">Usuários Cadastrados</CardTitle>
              <Users className="w-5 h-5 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black text-stone-900">{metrics.usersCount}</div>
            </CardContent>
          </Card>
        </div>

        {/* List of Companies */}
        <Card className="border-none shadow-sm bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-bold uppercase text-stone-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-orange-600" /> 
              Relação de Clientes (Construtoras)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-stone-50 text-stone-500 font-bold uppercase text-xs">
                  <tr>
                    <th className="px-4 py-3 rounded-tl-lg">ID</th>
                    <th className="px-4 py-3">Nome da Empresa</th>
                    <th className="px-4 py-3">Média de Obras</th>
                    <th className="px-4 py-3">Data de Cadastro</th>
                    <th className="px-4 py-3 rounded-tr-lg text-right">Ação</th>
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
                        <td className="px-4 py-4 font-mono text-xs text-stone-400">{company.id.split('-')[0]}...</td>
                        <td className="px-4 py-4 font-bold text-stone-900">{company.name}</td>
                        <td className="px-4 py-4 text-stone-600">{company.website?.replace('Média de Obras: ', '') || 'N/A'}</td>
                        <td className="px-4 py-4 text-stone-600">{new Date(company.created_at).toLocaleDateString('pt-BR')}</td>
                        <td className="px-4 py-4 text-right">
                          <button className="text-xs font-bold text-stone-400 hover:text-orange-600 uppercase">
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
