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
    
    if(response.data.return) {
      return {
        success: false,
        message: response.data.return,
      }
    }

    return {
      success: true,
      token: response.data.token,
    };
  } catch (error: any) {
    console.error('Erro ao autenticar usuário:', error);
    return {
      success: false,
      message: 'Erro de conexão. Verifique sua internet.',
    };
  }
};
