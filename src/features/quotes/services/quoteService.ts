import { apiClient } from '@/shared/services/apiClient';

export interface QuoteResponse {
  success: boolean;
  quoteoftheday?: string;
  message?: string;
}

export const getQuoteOfTheDay = async (
  token: string
): Promise<QuoteResponse> => {
  if (!token || typeof token !== 'string') {
    return {
      success: false,
      message: 'Token de autenticação inválido',
    };
  }

  try {
    const response = await apiClient.get(
      '/18a8a172-0c9e-4dc3-9cf0-fe2c389e27eb/frasedodia',
      {
        headers: {
          token: token,
        },
      }
    );

    if (!Array.isArray(response.data)) {
      console.error('Formato de resposta inválido:', response.data);
      return {
        success: false,
        message: 'Erro ao processar resposta do servidor',
      };
    }

    if (response.data.length === 0) {
      return {
        success: false,
        message: 'Nenhuma frase disponível no momento',
      };
    }

    const quote = response.data[0];

    if (!quote || typeof quote.quoteoftheday !== 'string') {
      console.error('Frase inválida ou ausente:', quote);
      return {
        success: false,
        message: 'Frase do dia indisponível',
      };
    }

    if (quote.quoteoftheday.trim().length === 0) {
      return {
        success: false,
        message: 'Frase do dia vazia',
      };
    }

    return {
      success: true,
      quoteoftheday: quote.quoteoftheday,
    };
  } catch (error) {
    console.error('Erro ao buscar frase do dia:', error);

    if (error.response) {
      const status = error.response.status;

      if (status === 401 || status === 403) {
        return {
          success: false,
          message: 'Token de autenticação inválido ou expirado',
        };
      }

      if (status === 404) {
        return {
          success: false,
          message: 'Serviço temporariamente indisponível',
        };
      }

      if (status >= 500) {
        return {
          success: false,
          message: 'Erro no servidor. Tente novamente mais tarde.',
        };
      }

      return {
        success: false,
        message: error.response.data?.message || 'Erro ao buscar frase do dia',
      };
    }

    if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
      return {
        success: false,
        message: 'Tempo de conexão esgotado. Tente novamente.',
      };
    }

    return {
      success: false,
      message: 'Erro de conexão. Verifique sua internet.',
    };
  }
};
