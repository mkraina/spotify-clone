import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import qs from 'qs';

import { UserAuthorization } from '../types';

export type RefreshAuth = (userAuthorization: {
  refreshToken: string;
}) => Promise<UserAuthorization>;
type ApiInstance = AxiosInstance & {
  setRefreshAuthorization: (refresh: RefreshAuth) => void;
  setToken: (token: UserAuthorization | undefined) => void;
};

const createApi = (): ApiInstance => {
  let userAuthorization: UserAuthorization | undefined;
  let refreshAuthorization: RefreshAuth | undefined;

  const getAuthorization = (): string => {
    return userAuthorization ? `Bearer ${userAuthorization.accessToken}` : '';
  };
  const getRetryConfig = async (error: AxiosError): Promise<AxiosRequestConfig | undefined> => {
    if (error.response?.status !== 401 || !userAuthorization?.refreshToken) return;
    const newAuth = await refreshAuthorization?.({ refreshToken: userAuthorization.refreshToken });
    if (!newAuth) return;
    error.config?.headers.setAuthorization(getAuthorization());
    return error.config;
  };
  const api = axios.create({
    baseURL: 'https://api.spotify.com',
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
    response => response,
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
  (api as ApiInstance).setToken = userAuth => (userAuthorization = userAuth);
  (api as ApiInstance).setRefreshAuthorization = refresh => (refreshAuthorization = refresh);
  return api as ApiInstance;
};

export const api = createApi();
