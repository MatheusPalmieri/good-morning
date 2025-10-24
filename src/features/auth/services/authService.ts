import { apiClient } from '@/shared/services/apiClient';

export interface LoginResponse {
  success: boolean;
  token?: string;
  message?: string;
}

export const authenticateUser = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await apiClient.post('/testeReact/autenticar', {
      username,
      password,
    });

    if (response.data?.return) {
      return {
        success: false,
        message: response.data.return,
      };
    }

    if (!response.data?.token || typeof response.data.token !== 'string') {
      console.error('Token inválido ou ausente na resposta:', response.data);
      return {
        success: false,
        message: 'Erro ao processar autenticação. Tente novamente.',
      };
    }

    return {
      success: true,
      token: response.data.token,
    };
  } catch (error) {
    console.error('Erro ao autenticar usuário:', error);

    if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
      return {
        success: false,
        message: 'Tempo de conexão esgotado. Tente novamente.',
      };
    }

    if (error.response?.status === 401) {
      return {
        success: false,
        message: 'Usuário ou senha incorretos.',
      };
    }

    return {
      success: false,
      message: 'Erro de conexão. Verifique sua internet.',
    };
  }
};
