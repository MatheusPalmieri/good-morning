import { useRouter } from 'expo-router';
import { useEffect } from 'react';

import { useAuthStore } from '@/features/auth';
import { Loading } from '@/shared/components';

export default function Index() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuthStore();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        router.replace('/quote');
      } else {
        router.replace('/login');
      }
    }
  }, [isAuthenticated, isLoading, router]);

  return <Loading message="Carregando..." />;
}
