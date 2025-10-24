import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';

import {
  clearHistory,
  getFavorites,
  getHistory,
  removeFavorite,
  SavedQuote,
} from '@/shared/services/storageService';

export function useFavorites() {
  const [favorites, setFavorites] = useState<SavedQuote[]>([]);
  const [history, setHistory] = useState<SavedQuote[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [favs, hist] = await Promise.all([getFavorites(), getHistory()]);
      setFavorites(favs);
      setHistory(hist);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleRemoveFavorite = useCallback(
    async (quote: string) => {
      Alert.alert(
        'Remover dos Favoritos',
        'Deseja remover esta frase dos favoritos?',
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Remover',
            style: 'destructive',
            onPress: async () => {
              await removeFavorite(quote);
              await loadData();
            },
          },
        ]
      );
    },
    [loadData]
  );

  const handleClearHistory = useCallback(() => {
    Alert.alert(
      'Limpar Histórico',
      'Deseja limpar todo o histórico? Esta ação não pode ser desfeita.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Limpar',
          style: 'destructive',
          onPress: async () => {
            await clearHistory();
            await loadData();
          },
        },
      ]
    );
  }, [loadData]);

  return {
    favorites,
    history,
    isLoading,
    handleRemoveFavorite,
    handleClearHistory,
    reload: loadData,
  };
}
