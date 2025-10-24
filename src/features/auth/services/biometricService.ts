import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';

const BIOMETRIC_ENABLED_KEY = 'biometric_enabled';
const BIOMETRIC_CREDENTIALS_KEY = 'biometric_credentials';

export interface BiometricCredentials {
  username: string;
  password: string;
}

export const isBiometricAvailable = async (): Promise<boolean> => {
  try {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    return hasHardware && isEnrolled;
  } catch (error) {
    console.error('Erro ao verificar biometria:', error);
    return false;
  }
};

export const authenticateWithBiometric = async (): Promise<boolean> => {
  try {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Faça login com biometria',
      fallbackLabel: 'Usar senha',
      cancelLabel: 'Cancelar',
    });
    return result.success;
  } catch (error) {
    console.error('Erro na autenticação biométrica:', error);
    return false;
  }
};

export const saveBiometricCredentials = async (
  username: string,
  password: string
): Promise<void> => {
  try {
    const credentials: BiometricCredentials = { username, password };
    await SecureStore.setItemAsync(
      BIOMETRIC_CREDENTIALS_KEY,
      JSON.stringify(credentials)
    );
    await SecureStore.setItemAsync(BIOMETRIC_ENABLED_KEY, 'true');
  } catch (error) {
    console.error('Erro ao salvar credenciais:', error);
    throw error;
  }
};

export const getBiometricCredentials =
  async (): Promise<BiometricCredentials | null> => {
    try {
      const credentialsStr = await SecureStore.getItemAsync(
        BIOMETRIC_CREDENTIALS_KEY
      );
      if (!credentialsStr) return null;
      return JSON.parse(credentialsStr);
    } catch (error) {
      console.error('Erro ao recuperar credenciais:', error);
      return null;
    }
  };

export const isBiometricEnabled = async (): Promise<boolean> => {
  try {
    const enabled = await SecureStore.getItemAsync(BIOMETRIC_ENABLED_KEY);
    return enabled === 'true';
  } catch (error) {
    console.error('Erro ao verificar biometria habilitada:', error);
    return false;
  }
};

export const removeBiometricCredentials = async (): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync(BIOMETRIC_CREDENTIALS_KEY);
    await SecureStore.deleteItemAsync(BIOMETRIC_ENABLED_KEY);
  } catch (error) {
    console.error('Erro ao remover credenciais:', error);
  }
};

export const getBiometricType = async (): Promise<string> => {
  try {
    const types = await LocalAuthentication.supportedAuthenticationTypesAsync();

    if (
      types.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)
    ) {
      return 'Face ID';
    }
    if (types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
      return 'Digital';
    }
    if (types.includes(LocalAuthentication.AuthenticationType.IRIS)) {
      return 'Íris';
    }
    return 'Biometria';
  } catch (error) {
    console.error('Erro ao verificar tipo de biometria:', error);
    return 'Biometria';
  }
};
