import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { ShareButton } from '@/features/quotes';
import { SavedQuote } from '@/shared/services/storageService';

import { formatDate } from '../utils/dateFormatter';

interface QuoteItemProps {
  item: SavedQuote;
  index: number;
  showRemoveButton?: boolean;
  onRemove?: (quote: string) => void;
}

export function QuoteItem({
  item,
  index,
  showRemoveButton = false,
  onRemove,
}: QuoteItemProps) {
  return (
    <Animated.View
      entering={FadeInDown.duration(400).delay(index * 50)}
      style={styles.quoteItem}
    >
      <View style={styles.quoteContent}>
        <Text style={styles.quoteText}>&quot;{item.text}&quot;</Text>
        <Text style={styles.quoteDate}>{formatDate(item.timestamp)}</Text>
      </View>
      <View style={styles.actions}>
        <ShareButton quote={item.text} />
        {showRemoveButton && onRemove && (
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => onRemove(item.text)}
            activeOpacity={0.7}
          >
            <Ionicons name="trash-outline" size={20} color="#EF4444" />
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  quoteItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quoteContent: {
    flex: 1,
    marginRight: 12,
  },
  quoteText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#1F2937',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  quoteDate: {
    fontSize: 12,
    color: '#94A3B8',
  },
  actions: {
    flexDirection: 'column',
    gap: 8,
  },
  removeButton: {
    backgroundColor: '#FEF2F2',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
