import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { TabType } from './TabSelector';

interface EmptyStateProps {
  activeTab: TabType;
  isLoading?: boolean;
}

export function EmptyState({ activeTab, isLoading = false }: EmptyStateProps) {
  if (isLoading) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Carregando...</Text>
      </View>
    );
  }

  const isFavorites = activeTab === 'favorites';

  return (
    <View style={styles.emptyContainer}>
      <Ionicons
        name={isFavorites ? 'heart-outline' : 'time-outline'}
        size={64}
        color="#FFFFFF"
        style={styles.emptyIcon}
      />
      <Text style={styles.emptyText}>
        {isFavorites
          ? 'Nenhuma frase favoritada ainda'
          : 'Nenhuma frase no histórico'}
      </Text>
      <Text style={styles.emptySubtext}>
        {isFavorites
          ? 'Favorite frases para vê-las aqui'
          : 'Visualize frases para vê-las aqui'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 48,
  },
  emptyIcon: {
    marginBottom: 16,
    opacity: 0.7,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
    textAlign: 'center',
  },
});
