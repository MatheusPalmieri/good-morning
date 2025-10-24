import axios from 'axios';

const API_BASE_URL = 'https://n8n.jrmendonca.com.br/webhook';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

