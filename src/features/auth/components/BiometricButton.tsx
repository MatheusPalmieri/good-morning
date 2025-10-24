import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import {
  authenticateWithBiometric,
  getBiometricCredentials,
  getBiometricType,
  isBiometricAvailable,
  isBiometricEnabled,
} from '../services/biometricService';

interface BiometricButtonProps {
  onSuccess: (username: string, password: string) => void;
  onError: (message: string) => void;
}

export function BiometricButton({ onSuccess, onError }: BiometricButtonProps) {
  const [isAvailable, setIsAvailable] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [biometricType, setBiometricType] = useState('Biometria');

  useEffect(() => {
    checkBiometric();
  }, []);

  const checkBiometric = async () => {
    const available = await isBiometricAvailable();
    const enabled = await isBiometricEnabled();
    const type = await getBiometricType();

    setIsAvailable(available);
    setIsEnabled(enabled);
    setBiometricType(type);
  };

  const handleBiometricAuth = async () => {
    try {
      setIsLoading(true);

      const authenticated = await authenticateWithBiometric();

      if (!authenticated) {
        onError('Autenticação biométrica cancelada');
        return;
      }

      const credentials = await getBiometricCredentials();

      if (!credentials) {
        onError('Nenhuma credencial salva encontrada');
        return;
      }

      onSuccess(credentials.username, credentials.password);
    } catch (error) {
      console.error('Erro na autenticação biométrica:', error);
      onError('Erro ao autenticar com biometria');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAvailable || !isEnabled) {
    return null;
  }

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={handleBiometricAuth}
      disabled={isLoading}
      activeOpacity={0.7}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color="#0EA5E9" />
      ) : (
        <>
          <Ionicons name="finger-print" size={24} color="#0EA5E9" />
          <Text style={styles.buttonText}>Entrar com {biometricType}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF6FF',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    gap: 8,
  },
  buttonText: {
    color: '#0EA5E9',
    fontSize: 16,
    fontWeight: '600',
  },
});
