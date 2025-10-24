import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {
  addFavorite,
  isFavorite,
  removeFavorite,
} from '@/shared/services/storageService';

interface FavoriteButtonProps {
  quote: string;
}

export function FavoriteButton({ quote }: FavoriteButtonProps) {
  const [isFav, setIsFav] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkFavorite = async () => {
      if (!quote) {
        setIsLoading(false);
        return;
      }
      try {
        const result = await isFavorite(quote);
        setIsFav(result);
      } catch (error) {
        console.error('Erro ao verificar favorito:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkFavorite();
  }, [quote]);

  const handleToggleFavorite = async () => {
    if (!quote || isLoading) return;

    try {
      setIsLoading(true);

      try {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      } catch {}

      if (isFav) {
        await removeFavorite(quote);
        setIsFav(false);
      } else {
        await addFavorite(quote);
        setIsFav(true);
      }
    } catch (error) {
      console.error('Erro ao favoritar:', error);
      Alert.alert('Erro', 'Não foi possível favoritar a frase');
    } finally {
      setIsLoading(false);
    }
  };

  if (!quote) {
    return null;
  }

  return (
    <TouchableOpacity
      style={styles.favoriteButton}
      onPress={handleToggleFavorite}
      disabled={isLoading}
      activeOpacity={0.7}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color="#EF4444" />
      ) : (
        <Ionicons
          name={isFav ? 'heart' : 'heart-outline'}
          size={24}
          color={isFav ? '#EF4444' : '#94A3B8'}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  favoriteButton: {
    backgroundColor: '#FEF2F2',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
