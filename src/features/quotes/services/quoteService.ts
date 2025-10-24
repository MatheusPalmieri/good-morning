import { apiClient } from '@/shared/services/apiClient';

export interface QuoteResponse {
  success: boolean;
  quoteoftheday?: string;
  message?: string;
}

export const getQuoteOfTheDay = async (
  token: string
): Promise<QuoteResponse> => {
  try {
    const response = await apiClient.get(
      '/18a8a172-0c9e-4dc3-9cf0-fe2c389e27eb/frasedodia',
      {
        headers: {
          token: token,
        },
      }
    );

    if (Array.isArray(response.data)) {
      const quote = response.data[0];
      return {
        success: true,
        quoteoftheday: quote.quoteoftheday,
      };
    } else {
      return {
        success: false,
        message: 'Erro ao buscar frase do dia',
      };
    }
  } catch (error: any) {
    if (error.response) {
      return {
        success: false,
        message: error.response.data?.message || 'Erro ao buscar frase do dia',
      };
    }
    return {
      success: false,
      message: 'Erro de conexão. Verifique sua internet.',
    };
  }
};
