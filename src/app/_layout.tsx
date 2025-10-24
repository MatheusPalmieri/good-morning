import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Alert } from 'react-native';
import 'react-native-reanimated';

import { useAuthStore } from '@/features/auth';

export default function RootLayout() {
  const router = useRouter();
  const { loadToken } = useAuthStore();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await loadToken();
      } catch (error) {
        console.error('Erro ao carregar autenticação:', error);

        Alert.alert(
          'Erro ao Inicializar',
          'Houve um problema ao carregar suas credenciais. Você precisará fazer login novamente.',
          [
            {
              text: 'OK',
              onPress: () => router.replace('/login'),
            },
          ]
        );
      }
    };

    initializeAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="quote" />
        <Stack.Screen name="quoteoftheDay" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
