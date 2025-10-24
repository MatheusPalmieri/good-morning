import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useAuthStore } from '@/features/auth';

export default function RootLayout() {
  const { loadToken } = useAuthStore();

  useEffect(() => {
    loadToken();
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
