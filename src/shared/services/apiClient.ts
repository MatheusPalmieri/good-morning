import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

const API_BASE_URL = 'https://n8n.jrmendonca.com.br/webhook';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const MAX_RETRIES = 2;
const RETRY_DELAY = 1000;

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError) => {
    console.error('[API Request Error]', error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  response => {
    return response;
  },
  async (error: AxiosError) => {
    const config = error.config as InternalAxiosRequestConfig & {
      _retryCount?: number;
    };

    console.error(
      `[API Error] ${config?.method?.toUpperCase()} ${config?.url}`,
      error.response?.status || error.message
    );

    if (!config) {
      return Promise.reject(error);
    }

    config._retryCount = config._retryCount || 0;

    const shouldRetry =
      config._retryCount < MAX_RETRIES &&
      (error.code === 'ECONNABORTED' ||
        error.code === 'ERR_NETWORK' ||
        !error.response ||
        (error.response.status >= 500 && error.response.status < 600));

    if (shouldRetry) {
      config._retryCount += 1;
      await sleep(RETRY_DELAY * config._retryCount);
      return apiClient(config);
    }

    if (error.response) {
      const status = error.response.status;

      if (status === 401 || status === 403) {
        console.error('[API Auth Error] Token inválido ou expirado');
      } else if (status === 404) {
        console.error('[API Not Found] Endpoint não encontrado');
      } else if (status >= 500) {
        console.error('[API Server Error] Erro no servidor');
      }
    } else if (error.request) {
      console.error('[API Network Error] Sem resposta do servidor');
    } else {
      console.error(
        '[API Config Error] Erro ao configurar requisição:',
        error.message
      );
    }

    return Promise.reject(error);
  }
);
