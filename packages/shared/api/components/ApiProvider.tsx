import React, { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { api } from '../utils/api';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * 60 * 1000,
      notifyOnChangeProps: 'tracked',
    },
  },
});

type AccessTokenContextProps = [
  string | undefined,
  React.Dispatch<React.SetStateAction<string | undefined>>
];
const AccessTokenContext = React.createContext<AccessTokenContextProps>(
  undefined as unknown as AccessTokenContextProps
);
export const useAccessToken = () => React.useContext(AccessTokenContext);

export const ApiProvider = React.memo<{ children: React.ReactNode }>(({ children }) => {
  const accessTokenState = useState<string | undefined>();
  const [accessToken] = accessTokenState;
  useEffect(() => {
    if (!accessToken) queryClient.resetQueries().catch(console.warn);
    api.setToken(accessToken);
  }, [accessToken]);
  return (
    <AccessTokenContext.Provider value={accessTokenState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </AccessTokenContext.Provider>
  );
});
