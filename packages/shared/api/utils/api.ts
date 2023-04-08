import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import qs from 'qs';

import { getState } from '../../redux';

import { AuthService } from './auth';

type ApiInstance = AxiosInstance & {
  setAuthService: (service: AuthService) => void;
};

const createApi = (): ApiInstance => {
  let authService: AuthService | undefined;

  const getAuthorization = (): string => {
    const userAuthorization = getState().auth.authorization;
    return userAuthorization ? `Bearer ${userAuthorization.accessToken}` : '';
  };
  const getRetryConfig = async (error: AxiosError): Promise<AxiosRequestConfig | undefined> => {
    if (error.response?.status !== 401) return;
    const newAuth = await authService?.refresh();
    if (!newAuth) return;
    error.config?.headers.setAuthorization(getAuthorization());
    return error.config;
  };
  const api = axios.create({
    baseURL: 'https://api.spotify.com/v1',
    headers: { 'Content-Type': 'application/json' },
    timeout: 10000, // 10s
    paramsSerializer: { serialize: params => qs.stringify(params, { arrayFormat: 'comma' }) },
  });

  api.interceptors.request.use(
    config => {
      if (!config.headers.Authorization) config.headers.setAuthorization(getAuthorization());
      return config;
    },
    error => Promise.reject(error)
  );

  api.interceptors.response.use(
    async response => {
      if (__DEV__) await new Promise(resolve => setTimeout(resolve, 2500));
      return response;
    },
    async (error: AxiosError) => {
      try {
        const retryConfig = await getRetryConfig(error);
        if (retryConfig) return api.request(retryConfig);
      } catch (e) {
        console.log(`couldn't retrieve retryConfig ${error.config?.url}: ${(e as Error).message}`);
      }
      return Promise.reject(error);
    }
  );
  (api as ApiInstance).setAuthService = service => (authService = service);
  return api as ApiInstance;
};

export const api = createApi();
