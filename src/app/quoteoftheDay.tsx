import { useRouter } from 'expo-router';
import { useCallback, useEffect } from 'react';

import { useAuthStore } from '@/features/auth';
import { Loading } from '@/shared/components';

export default function QuoteOfTheDayDeepLink() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuthStore();

  const handleNavigation = useCallback(() => {
    if (!isLoading) {
      try {
        const targetRoute = isAuthenticated ? '/quote' : '/login';
        router.replace(targetRoute);
      } catch (error) {
        console.error('Erro ao navegar:', error);
      }
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    handleNavigation();
  }, [handleNavigation]);

  return <Loading message="Carregando..." />;
}
