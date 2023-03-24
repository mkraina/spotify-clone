import React, { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { UserAuthorization } from '../types';
import { api, RefreshAuth } from '../utils/api';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * 60 * 1000,
      notifyOnChangeProps: 'tracked',
    },
  },
});

type UserAuthorizationContextProps = [
  UserAuthorization | undefined,
  React.Dispatch<React.SetStateAction<UserAuthorization | undefined>>
];
const UserAuthorizationContext = React.createContext<UserAuthorizationContextProps>(
  undefined as unknown as UserAuthorizationContextProps
);
export const useUserAuthorization = () => React.useContext(UserAuthorizationContext);

export const ApiProvider = React.memo<{
  LoginPromptComponent: React.FC;
  children: React.ReactNode;
  refreshAuthorization: RefreshAuth;
}>(({ children, LoginPromptComponent, refreshAuthorization }) => {
  const userAuthorizationState = useState<UserAuthorization | undefined>();
  const [userAuthorization] = userAuthorizationState;
  useEffect(() => {
    if (!userAuthorization) queryClient.resetQueries().catch(console.warn);
    api.setToken(userAuthorization);
    api.setRefreshAuthorization(refreshAuthorization);
  }, [refreshAuthorization, userAuthorization]);
  return (
    <UserAuthorizationContext.Provider value={userAuthorizationState}>
      <QueryClientProvider client={queryClient}>
        {userAuthorization ? children : <LoginPromptComponent />}
      </QueryClientProvider>
    </UserAuthorizationContext.Provider>
  );
});
