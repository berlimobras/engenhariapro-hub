import { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { CalendarDays, CheckCircle2, Wallet, Building2, MapPin } from 'lucide-react';

export default function ObraRelatorio() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const configStr = searchParams.get('config');
  const config = configStr ? JSON.parse(configStr) : { detalhes: true, processos: true, equipe: true, financeiro: true };

  // Fetch all data
  const { data: obra, isLoading: load1 } = useQuery({
    queryKey: ['relatorio_obra', id],
    queryFn: async () => {
      const { data, error } = await supabase.from('obras').select('*').eq('id', id).single();
      if (error) throw error;
      return data;
    }
  });

  const { data: checklists = [], isLoading: load2 } = useQuery({
    queryKey: ['relatorio_checklists', id],
    queryFn: async () => {
      const { data, error } = await supabase.from('obra_checklists').select('*').eq('obra_id', id).order('created_at', { ascending: true });
      if (error) throw error;
      return data;
    },
    enabled: !!config.processos
  });

  const { data: equipe = [], isLoading: load3 } = useQuery({
    queryKey: ['relatorio_equipe', id],
    queryFn: async () => {
      const { data, error } = await supabase.from('obra_funcionarios').select('*, funcionario:funcionarios(*)').eq('obra_id', id);
      if (error) throw error;
      return data;
    },
    enabled: !!config.equipe || !!config.financeiro
  });

  const { data: presencas = [], isLoading: load4 } = useQuery({
    queryKey: ['relatorio_presencas', id],
    queryFn: async () => {
      const { data, error } = await supabase.from('obra_presencas').select('*').eq('obra_id', id);
      if (error) throw error;
      return data;
    },
    enabled: !!config.equipe || !!config.financeiro
  });

  const { data: materiais = [], isLoading: load5 } = useQuery({
    queryKey: ['relatorio_materiais', id],
    queryFn: async () => {
      const { data, error } = await supabase.from('obra_materiais').select('*, material:materiais(*)').eq('obra_id', id);
      if (error) throw error;
      return data;
    },
    enabled: !!config.financeiro
  });

  const { data: transacoes = [], isLoading: load6 } = useQuery({
    queryKey: ['relatorio_transacoes', id],
    queryFn: async () => {
      const { data, error } = await supabase.from('transacoes').select('*').eq('obra_id', id).eq('type', 'despesa');
      if (error) throw error;
      return data;
    },
    enabled: !!config.financeiro
  });

  const isLoading = load1 || load2 || load3 || load4 || load5 || load6;

  // Auto-print when loaded
  useEffect(() => {
    if (!isLoading && obra) {
      const timer = setTimeout(() => {
        window.print();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isLoading, obra]);

  if (isLoading || !obra) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-orange-600">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-600 mb-4"></div>
        <p className="font-medium text-lg">Preparando Relatório Profissional...</p>
      </div>
    );
  }

  // --- CALCS ---
  const completedTasks = checklists.filter((t: any) => t.is_completed).length;
  const progress = checklists.length === 0 ? 0 : Math.round((completedTasks / checklists.length) * 100);

  let custoEquipe = 0;
  presencas.forEach((p: any) => {
    if (p.status === 'falta') return;
    const alocacao = equipe.find((e: any) => e.funcionario_id === p.funcionario_id);
    if (alocacao) {
      let valorDiaria = alocacao.daily_rate || 0;
      if (p.status === 'meio_periodo') valorDiaria = valorDiaria / 2;
      custoEquipe += valorDiaria;
    }
  });

  const custoMateriais = materiais.reduce((acc: number, m: any) => acc + (m.quantity * m.unit_cost), 0);
  const custoTotal = custoEquipe + custoMateriais;

  return (
    <div className="bg-white text-stone-900 p-8 max-w-4xl mx-auto font-sans print:p-0 print:m-0 print:max-w-full relative">
      
      {/* 1. TOP HEADER (Logo e Ref) */}
      <div className="flex items-center justify-between border-b-[3px] border-orange-500 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Berlim Obras" className="h-12 object-contain" />
        </div>
        <div className="text-right">
          <h2 className="text-lg font-bold uppercase tracking-widest text-[#1e3a8a]">Relatório da Obra</h2>
          <p className="text-xs font-semibold text-stone-600 mt-0.5">Ref: {obra.id.split('-')[0].toUpperCase()}</p>
          <p className="text-[10px] text-stone-500 mt-1">Emitido em: {new Date().toLocaleDateString('pt-BR')} às {new Date().toLocaleTimeString('pt-BR')}</p>
        </div>
      </div>

      {/* 2. INFORMAÇÕES DA OBRA (CABEÇALHO) */}
      {config.detalhes && (
        <div className="mb-8 p-5 bg-stone-50 border border-stone-200 rounded-lg">
          <h2 className="text-xl font-bold text-[#1e3a8a] uppercase tracking-tight mb-4">{obra.name}</h2>
          
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-stone-600">
                <Building2 className="w-3.5 h-3.5 text-orange-600" />
                <strong>Cliente:</strong> {obra.client_name || 'Não informado'}
              </div>
              <div className="flex items-center gap-2 text-stone-600">
                <MapPin className="w-3.5 h-3.5 text-orange-600" />
                <strong>Endereço:</strong> {obra.address || 'Não informado'}
              </div>
            </div>
            <div className="space-y-1 text-stone-600 flex flex-col justify-center">
              <p>
                <strong className="text-[10px] uppercase text-stone-500">Início:</strong>{' '}
                <span className="font-semibold">{obra.start_date ? new Date(obra.start_date).toLocaleDateString('pt-BR') : 'N/A'}</span>
              </p>
              <p>
                <strong className="text-[10px] uppercase text-stone-500">Previsão:</strong>{' '}
                <span className="font-semibold">{obra.end_date ? new Date(obra.end_date).toLocaleDateString('pt-BR') : 'N/A'}</span>
              </p>
              <p>
                <strong className="text-[10px] uppercase text-stone-500">Orçamento:</strong>{' '}
                <span className="font-semibold text-[#1e3a8a]">R$ {obra.budget_estimated?.toLocaleString('pt-BR') || '0,00'}</span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* AVANÇO FÍSICO */}
      {config.processos && (
        <section className="mb-6">
          <div className="flex justify-between items-end mb-1">
            <strong className="text-[10px] font-bold uppercase text-[#1e3a8a]">Avanço Físico do Projeto</strong>
            <span className="font-bold text-lg text-orange-600 leading-none">{progress}%</span>
          </div>
          <div className="w-full bg-stone-200 rounded-full h-1.5 mb-1">
            <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="text-[9px] text-stone-500 font-medium text-right">
            {completedTasks} de {checklists.length} processos concluídos
          </p>
        </section>
      )}

      {/* PROCESSOS */}
      {config.processos && checklists.length > 0 && (
        <section className="mb-8">
          <h3 className="text-sm font-bold uppercase tracking-widest text-[#1e3a8a] border-b border-orange-500 pb-1 mb-3 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-orange-600" /> Etapas e Processos
          </h3>
          <div className="border border-stone-200 rounded">
            <table className="w-full text-[10px] border-collapse">
              <thead>
                <tr className="bg-stone-100 text-left">
                  <th className="p-2 font-bold uppercase text-stone-600 w-24 border-b border-stone-200">Status</th>
                  <th className="p-2 font-bold uppercase text-stone-600 border-b border-stone-200">Descrição da Tarefa</th>
                </tr>
              </thead>
              <tbody>
                {checklists.map((t: any, idx: number) => (
                  <tr key={t.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-stone-50'}>
                    <td className="p-2 border-b border-stone-100 font-bold uppercase text-[#1e3a8a]">
                      {t.is_completed ? 'Concluído' : <span className="text-orange-600">Pendente</span>}
                    </td>
                    <td className={`p-2 border-b border-stone-100 ${t.is_completed ? 'line-through text-stone-400' : 'text-stone-700 font-medium'}`}>
                      {t.task}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* EQUIPE E MATERIAL (MENORES LADO A LADO) */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* EQUIPE */}
        {config.equipe && equipe.length > 0 && (
          <section>
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#1e3a8a] border-b border-orange-500 pb-1 mb-3 flex items-center gap-1.5">
              <CalendarDays className="w-4 h-4 text-orange-600" /> Equipe Alocada
            </h3>
            <div className="border border-stone-200 rounded">
              <table className="w-full text-[10px] border-collapse">
                <thead>
                  <tr className="bg-stone-100 text-left">
                    <th className="p-2 font-bold uppercase text-stone-600 border-b border-stone-200">Profissional</th>
                    <th className="p-2 font-bold uppercase text-stone-600 border-b border-stone-200">Função</th>
                    <th className="p-2 font-bold uppercase text-stone-600 text-center border-b border-stone-200 w-16">Dias</th>
                  </tr>
                </thead>
                <tbody>
                  {equipe.map((e: any, idx: number) => {
                    const diasPresente = presencas.filter((p:any) => p.funcionario_id === e.funcionario_id && p.status !== 'falta').length;
                    return (
                      <tr key={e.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-stone-50'}>
                        <td className="p-2 border-b border-stone-100 font-medium text-[#1e3a8a]">{e.funcionario?.name}</td>
                        <td className="p-2 border-b border-stone-100 text-stone-500">{e.funcionario?.role}</td>
                        <td className="p-2 border-b border-stone-100 text-center font-semibold text-stone-700">{diasPresente}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* MATERIAL */}
        {config.financeiro && materiais.length > 0 && (
          <section>
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#1e3a8a] border-b border-orange-500 pb-1 mb-3">
              Materiais & Insumos
            </h3>
            <div className="border border-stone-200 rounded">
              <table className="w-full text-[10px] border-collapse">
                <thead>
                  <tr className="bg-stone-100 text-left">
                    <th className="p-2 font-bold uppercase text-stone-600 border-b border-stone-200">Material</th>
                    <th className="p-2 font-bold uppercase text-stone-600 text-right border-b border-stone-200 w-16">Qtd</th>
                    <th className="p-2 font-bold uppercase text-stone-600 text-right border-b border-stone-200 w-16">Usado</th>
                  </tr>
                </thead>
                <tbody>
                  {materiais.map((m: any, idx: number) => (
                    <tr key={m.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-stone-50'}>
                      <td className="p-2 border-b border-stone-100 font-medium text-[#1e3a8a]">{m.material?.name}</td>
                      <td className="p-2 border-b border-stone-100 text-right text-stone-600">{m.quantity}</td>
                      <td className="p-2 border-b border-stone-100 text-right text-orange-600 font-bold">{m.used_quantity || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>

      {/* FINANCEIRO - CUSTO TOTAL */}
      {config.financeiro && (
        <section className="mb-12 break-inside-avoid">
          <h3 className="text-sm font-bold uppercase tracking-widest text-[#1e3a8a] border-b border-orange-500 pb-1 mb-4 flex items-center gap-1.5">
            <Wallet className="w-4 h-4 text-orange-600" /> Custos Executados (Final)
          </h3>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="border border-stone-200 p-4 rounded-lg text-center bg-stone-50">
              <p className="text-[10px] uppercase text-stone-500 font-bold tracking-widest mb-1.5">Mão de Obra</p>
              <p className="text-base font-bold text-stone-700">R$ {custoEquipe.toLocaleString('pt-BR', {minimumFractionDigits:2})}</p>
            </div>
            <div className="border border-stone-200 p-4 rounded-lg text-center bg-stone-50">
              <p className="text-[10px] uppercase text-stone-500 font-bold tracking-widest mb-1.5">Materiais</p>
              <p className="text-base font-bold text-stone-700">R$ {custoMateriais.toLocaleString('pt-BR', {minimumFractionDigits:2})}</p>
            </div>
            <div className="border-2 border-orange-500 bg-orange-50 p-4 rounded-lg text-center shadow-sm">
              <p className="text-[10px] uppercase text-orange-600 font-black tracking-widest mb-1.5">Custo Total Apurado</p>
              <p className="text-2xl font-black text-[#1e3a8a]">R$ {custoTotal.toLocaleString('pt-BR', {minimumFractionDigits:2})}</p>
            </div>
          </div>
        </section>
      )}

      {/* FOOTER ASSINATURA */}
      <div className="mt-16 pt-8 border-t border-stone-300 flex justify-between items-end break-inside-avoid print:flex">
        <div className="text-[10px] text-stone-500">
          <p className="font-bold uppercase tracking-widest text-[#1e3a8a]">Berlim Obras e Engenharia</p>
          <p className="mt-0.5">Sistema de Gestão de Obras - Documento Confidencial</p>
        </div>
        <div className="text-center w-56 border-t border-stone-400 pt-2">
          <p className="text-[9px] uppercase tracking-widest font-bold text-stone-600">Assinatura do Responsável</p>
        </div>
      </div>

    </div>
  );
}
