import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export type TabType = 'favorites' | 'history';

interface TabSelectorProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  favoritesCount: number;
  historyCount: number;
}

export function TabSelector({
  activeTab,
  onTabChange,
  favoritesCount,
  historyCount,
}: TabSelectorProps) {
  return (
    <View style={styles.tabs}>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'favorites' && styles.activeTab]}
        onPress={() => onTabChange('favorites')}
        activeOpacity={0.7}
      >
        <Ionicons
          name="heart"
          size={20}
          color={activeTab === 'favorites' ? '#0EA5E9' : '#94A3B8'}
        />
        <Text
          style={[
            styles.tabText,
            activeTab === 'favorites' && styles.activeTabText,
          ]}
        >
          Favoritos ({favoritesCount})
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, activeTab === 'history' && styles.activeTab]}
        onPress={() => onTabChange('history')}
        activeOpacity={0.7}
      >
        <Ionicons
          name="time"
          size={20}
          color={activeTab === 'history' ? '#0EA5E9' : '#94A3B8'}
        />
        <Text
          style={[
            styles.tabText,
            activeTab === 'history' && styles.activeTabText,
          ]}
        >
          Histórico ({historyCount})
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#94A3B8',
  },
  activeTabText: {
    color: '#0EA5E9',
  },
});
