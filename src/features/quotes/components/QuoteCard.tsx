import { StyleSheet, Text, View } from 'react-native';

interface QuoteCardProps {
  quote: string;
}

export function QuoteCard({ quote }: QuoteCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <View style={styles.iconBackground}>
          <Text style={styles.iconEmoji}>💭</Text>
        </View>
      </View>

      <Text style={styles.cardTitle}>Frase do Dia</Text>

      <Text style={styles.quoteText}>&quot;{quote}&quot;</Text>
      <View style={styles.divider} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
    minHeight: 300,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  iconBackground: {
    backgroundColor: '#EFF6FF',
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconEmoji: {
    fontSize: 40,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0EA5E9',
    textAlign: 'center',
    marginBottom: 24,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  quoteText: {
    fontSize: 22,
    lineHeight: 34,
    color: '#1F2937',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 24,
  },
  divider: {
    width: 60,
    height: 4,
    backgroundColor: '#0EA5E9',
    borderRadius: 2,
    alignSelf: 'center',
  },
});
