import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { create } from 'zustand';

const TOKEN_KEY = 'auth_token';

const saveToken = async (token: string): Promise<void> => {
  try {
    if (Platform.OS === 'web') {
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      await SecureStore.setItemAsync(TOKEN_KEY, token);
    }
  } catch (error) {
    console.error('Error saving token:', error);
    throw new Error('Falha ao salvar credenciais. Tente novamente.');
  }
};

const getToken = async (): Promise<string | null> => {
  try {
    if (Platform.OS === 'web') {
      return localStorage.getItem(TOKEN_KEY);
    } else {
      return await SecureStore.getItemAsync(TOKEN_KEY);
    }
  } catch (error) {
    console.error('Erro ao carregar token:', error);
    return null;
  }
};

const deleteToken = async (): Promise<void> => {
  try {
    if (Platform.OS === 'web') {
      localStorage.removeItem(TOKEN_KEY);
    } else {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
    }
  } catch (error) {
    console.error('Erro ao deletar token:', error);
  }
};

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  setToken: (token: string) => Promise<void>;
  loadToken: () => Promise<void>;
  logout: () => Promise<void>;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>(set => ({
  token: null,
  isAuthenticated: false,
  isLoading: true,

  setToken: async (token: string) => {
    try {
      await saveToken(token);
      set({ token, isAuthenticated: true });
    } catch (error) {
      console.error('Erro ao configurar token:', error);
      set({ token: null, isAuthenticated: false });
      throw error;
    }
  },

  loadToken: async () => {
    try {
      set({ isLoading: true });
      const token = await getToken();
      if (token) {
        set({ token, isAuthenticated: true });
      } else {
        set({ token: null, isAuthenticated: false });
      }
    } catch (error) {
      console.error('Erro ao carregar token:', error);
      set({ token: null, isAuthenticated: false });
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    await deleteToken();
    set({ token: null, isAuthenticated: false });
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },
}));
