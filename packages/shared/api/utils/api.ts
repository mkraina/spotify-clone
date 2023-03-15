import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

type ApiConfig = {
  getAccessToken: GetTokenFn;
  refresh?: () => Promise<boolean>;
};

export type GetTokenFn = () => string | undefined;
type SetTokenFn = (token: string | undefined) => void;
type ApiInstance = AxiosInstance & { setToken: SetTokenFn };

const createApi = (props?: ApiConfig): ApiInstance => {
  let accessToken: string | undefined;

  const getAuthorization = (): string => {
    return accessToken ? `Bearer ${accessToken}` : '';
  };
  const getRetryConfig = async (error: AxiosError): Promise<AxiosRequestConfig | undefined> => {
    if (error.response?.status !== 401 || !(await props?.refresh?.())) return;
    error.config?.headers.setAuthorization(getAuthorization());
    return error.config;
  };
  const api = axios.create({
    baseURL: 'https://api.spotify.com',
    headers: { 'Content-Type': 'application/json' },
    timeout: 10000, // 10s
  });

  api.interceptors.request.use(
    config => {
      config.headers.setAuthorization(getAuthorization());
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
  (api as ApiInstance).setToken = token => (accessToken = token);
  return api as ApiInstance;
};

export const api = createApi();
