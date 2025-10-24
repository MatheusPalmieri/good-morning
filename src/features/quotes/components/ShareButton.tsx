import { Ionicons } from '@expo/vector-icons';
import * as Sharing from 'expo-sharing';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Platform,
  Share,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

interface ShareButtonProps {
  quote: string;
}

export function ShareButton({ quote }: ShareButtonProps) {
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    if (!quote) return;

    try {
      setIsSharing(true);

      const message = `"${quote}"\n\n📱 Good Morning App`;

      if (Platform.OS === 'web') {
        if ('share' in navigator) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          await (navigator as any).share({
            title: 'Frase do Dia',
            text: message,
          });
        } else {
          Alert.alert('Sucesso', 'Frase copiada para a área de transferência!');
        }
        return;
      }

      const canShare = await Sharing.isAvailableAsync();

      if (canShare) {
        await Share.share({
          message,
          title: 'Frase do Dia',
        });
      } else {
        Alert.alert(
          'Erro',
          'Compartilhamento não disponível neste dispositivo'
        );
      }
    } catch (error) {
      if (error.message !== 'User did not share') {
        console.error('Erro ao compartilhar:', error);
        Alert.alert('Erro', 'Não foi possível compartilhar a frase');
      }
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <TouchableOpacity
      style={styles.shareButton}
      onPress={handleShare}
      disabled={isSharing}
      activeOpacity={0.7}
    >
      {isSharing ? (
        <ActivityIndicator size="small" color="#0EA5E9" />
      ) : (
        <Ionicons name="share-social-outline" size={24} color="#0EA5E9" />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  shareButton: {
    backgroundColor: '#EFF6FF',
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
