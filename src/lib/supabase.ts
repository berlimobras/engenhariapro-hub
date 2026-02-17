import { createClient } from "@supabase/supabase-js";

// FALLBACK DE SEGURANÇA: Credenciais Hardcoded para Deploy Automático no Lovable
// Isso garante que a tela não fique branca mesmo se as variáveis de ambiente falharem.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://viderenotpcoaoyrjzhk.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "sb_publishable_tihYdhTyNyIvX3WRTqY2NA_BP2bEdiV";

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Erro CRÍTICO: Credenciais Supabase não encontradas nem no .env nem no fallback.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
