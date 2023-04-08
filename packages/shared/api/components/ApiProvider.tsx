import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { useAppSelector } from '../../redux';
import { AuthService } from '../utils';
import { api } from '../utils/api';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      //staleTime: 30 * 60 * 1000,
      notifyOnChangeProps: 'tracked',
    },
  },
});

export const ApiProvider = React.memo<{
  LoginPromptComponent: React.FC;
  authService: AuthService;
  children: React.ReactNode;
}>(({ children, LoginPromptComponent, authService }) => {
  const userAuthorization = useAppSelector(state => state.auth.authorization);
  useEffect(() => {
    if (!userAuthorization) queryClient.resetQueries().catch(console.warn);
    api.setAuthService(authService);
  }, [authService, authService.refresh, userAuthorization]);
  return (
    <QueryClientProvider client={queryClient}>
      {userAuthorization ? children : <LoginPromptComponent />}
    </QueryClientProvider>
  );
});
