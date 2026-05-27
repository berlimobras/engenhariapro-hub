import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireSubscription?: boolean;
}

export function ProtectedRoute({ children, requireSubscription = true }: ProtectedRouteProps) {
  const { session, loading } = useAuth();

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile', session?.user.id],
    queryFn: async () => {
      if (!session?.user.id) return null;
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
      return data;
    },
    enabled: !!session?.user.id,
  });

  // Still loading auth session
  if (loading || (!!session && isLoading)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-accent" />
          <p className="mt-4 text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (!session) {
    return <Navigate to="/auth/login" replace />;
  }

  // Check subscription if required
  if (requireSubscription && profile) {
    const isSubscriptionActive = profile.subscription_status === 'active';
    const isTrialing = profile.subscription_status === 'trialing';
    const trialEnded = profile.trial_ends_at && new Date(profile.trial_ends_at) < new Date();

    const hasActiveSubscription = isSubscriptionActive || (isTrialing && !trialEnded);

    if (!hasActiveSubscription) {
      return <Navigate to="/planos" replace />;
    }
  }

  return <>{children}</>;
}
