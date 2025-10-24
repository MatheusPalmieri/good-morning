import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuthStore } from '@/features/auth';
import {
  getQuoteOfTheDay,
  LoadingState,
  QuoteCard,
  QuoteError,
  QuoteHeader
} from '@/features/quotes';

export default function QuoteScreen() {
  const router = useRouter();
  const { token, logout, isAuthenticated } = useAuthStore();
  const [quote, setQuote] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [refreshing, setRefreshing] = useState(false);

  const handleLogout = useCallback(async () => {
    try {
      await logout();
      router.replace('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  }, [logout, router]);
  
  const fetchQuote = useCallback(async () => {
    if (!token) {
      router.replace('/login');
      return;
    }

    try {
      setError('');
      const response = await getQuoteOfTheDay(token);

      if (response.success && response.quoteoftheday) {
        setQuote(response.quoteoftheday);
      } else {
        setError(response.message || 'Erro ao buscar frase do dia');
        if (response.message?.includes('token') || response.message?.includes('autenticação')) {
          await handleLogout();
        }
      }
    } catch (error) {
      console.error('Erro ao buscar quote:', error);
      setError('Erro inesperado. Tente novamente.');
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  }, [token, router, handleLogout]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchQuote();
  }, [fetchQuote]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login');
      return;
    }
    fetchQuote();
  }, [fetchQuote, isAuthenticated, router]);

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <LinearGradient
      colors={['#0EA5E9', '#38BDF8', '#7DD3FC']}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          refreshControl={
            <RefreshControl 
              refreshing={refreshing} 
              onRefresh={onRefresh} 
              tintColor="#FFFFFF"
              colors={['#FFFFFF']}
            />
          }
          showsVerticalScrollIndicator={false}
        >
          <Animated.View entering={FadeIn.duration(600)}>
            <QuoteHeader onLogout={handleLogout} />
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(600).delay(200)} style={styles.cardContainer}>
            {error ? (
              <QuoteError message={error} onRetry={fetchQuote} />
            ) : (
              <QuoteCard quote={quote} />
            )}

            <View style={styles.hintContainer}>
              <Ionicons name="arrow-down" size={16} color="#FFFFFF" />
              <Text style={styles.hintText}>Arraste para atualizar</Text>
            </View>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -24,
  },
  hintContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  hintText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginLeft: 8,
    opacity: 0.9,
  },
});
