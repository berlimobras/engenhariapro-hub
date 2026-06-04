import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "./AuthContext";

type SubscriptionContextType = {
  isSubscribed: boolean;
  isLoading: boolean;
  checkSubscription: () => Promise<void>;
};

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  
  // Por enquanto, vamos manter como false por padrão para simular um usuário não pagante.
  // Depois de integrado com Supabase e Stripe, este estado será carregado do banco.
  const [isSubscribed, setIsSubscribed] = useState(false); 
  const [isLoading, setIsLoading] = useState(true);

  const checkSubscription = async () => {
    if (!user) {
      setIsSubscribed(false);
      setIsLoading(false);
      return;
    }

    try {
      // TODO: Buscar no Supabase a tabela 'subscriptions' para ver se o usuário atual tem plano ativo.
      // const { data } = await supabase.from('subscriptions').select('status').eq('user_id', user.id).single();
      // setIsSubscribed(data?.status === 'active');
      
      // Simulação temporária:
      setIsSubscribed(false);
    } catch (error) {
      console.error("Erro ao verificar assinatura", error);
      setIsSubscribed(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkSubscription();
  }, [user]);

  return (
    <SubscriptionContext.Provider value={{ isSubscribed, isLoading, checkSubscription }}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error("useSubscription must be used within a SubscriptionProvider");
  }
  return context;
}
