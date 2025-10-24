import AsyncStorage from '@react-native-async-storage/async-storage';

export interface SavedQuote {
  id: string;
  text: string;
  timestamp: number;
  isFavorite: boolean;
}

const FAVORITES_KEY = '@good_morning:favorites';
const HISTORY_KEY = '@good_morning:history';

export const getFavorites = async (): Promise<SavedQuote[]> => {
  try {
    const data = await AsyncStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Erro ao buscar favoritos:', error);
    return [];
  }
};

export const addFavorite = async (quote: string): Promise<void> => {
  try {
    const favorites = await getFavorites();
    const newFavorite: SavedQuote = {
      id: Date.now().toString(),
      text: quote,
      timestamp: Date.now(),
      isFavorite: true,
    };
    favorites.unshift(newFavorite);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('Erro ao adicionar favorito:', error);
    throw error;
  }
};

export const removeFavorite = async (quoteText: string): Promise<void> => {
  try {
    const favorites = await getFavorites();
    const filtered = favorites.filter(fav => fav.text !== quoteText);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Erro ao remover favorito:', error);
    throw error;
  }
};

export const isFavorite = async (quoteText: string): Promise<boolean> => {
  try {
    const favorites = await getFavorites();
    return favorites.some(fav => fav.text === quoteText);
  } catch (error) {
    console.error('Erro ao verificar favorito:', error);
    return false;
  }
};

export const getHistory = async (): Promise<SavedQuote[]> => {
  try {
    const data = await AsyncStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Erro ao buscar histórico:', error);
    return [];
  }
};

export const addToHistory = async (quote: string): Promise<void> => {
  try {
    const history = await getHistory();
    const filtered = history.filter(item => item.text !== quote);

    const newItem: SavedQuote = {
      id: Date.now().toString(),
      text: quote,
      timestamp: Date.now(),
      isFavorite: await isFavorite(quote),
    };

    filtered.unshift(newItem);
    const limited = filtered.slice(0, 50);

    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(limited));
  } catch (error) {
    console.error('Erro ao adicionar ao histórico:', error);
  }
};

export const clearHistory = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.error('Erro ao limpar histórico:', error);
    throw error;
  }
};
