import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  EmptyState,
  FavoritesHeader,
  QuoteItem,
  TabSelector,
  TabType,
  useFavorites,
} from '@/features/favorites';

export default function FavoritesScreen() {
  const [activeTab, setActiveTab] = useState<TabType>('favorites');
  const {
    favorites,
    history,
    isLoading,
    handleRemoveFavorite,
    handleClearHistory,
  } = useFavorites();

  const currentData = activeTab === 'favorites' ? favorites : history;
  const title = activeTab === 'favorites' ? 'Favoritos' : 'Histórico';

  return (
    <LinearGradient
      colors={['#0EA5E9', '#38BDF8', '#7DD3FC']}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <FavoritesHeader
          title={title}
          showClearButton={activeTab === 'history' && history.length > 0}
          onClear={handleClearHistory}
        />

        <TabSelector
          activeTab={activeTab}
          onTabChange={setActiveTab}
          favoritesCount={favorites.length}
          historyCount={history.length}
        />

        {isLoading || currentData.length === 0 ? (
          <EmptyState activeTab={activeTab} isLoading={isLoading} />
        ) : (
          <FlatList
            data={currentData}
            renderItem={({ item, index }) => (
              <QuoteItem
                item={item}
                index={index}
                showRemoveButton={activeTab === 'favorites'}
                onRemove={handleRemoveFavorite}
              />
            )}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}
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
  listContent: {
    padding: 24,
    paddingTop: 8,
  },
});
