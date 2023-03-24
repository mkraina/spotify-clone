import { differenceInMilliseconds, parseISO } from 'date-fns';

import { appActions, dispatch, getState } from '../../redux';
import { UserAuthorization } from '../types';

type RefreshAuth = (userAuthorization: { refreshToken: string }) => Promise<UserAuthorization>;

type Config = {
  authorize: () => Promise<UserAuthorization>;
  refresh: RefreshAuth;
};

export type AuthService = {
  authorize: () => void;
  logout: () => void;
  refresh: () => Promise<UserAuthorization | undefined>;
};

const getRemainingTokenValidity = (): number => {
  const { authorization } = getState().auth;
  if (!authorization) return -1;
  const expirationTime =
    typeof authorization.accessTokenExpirationDate === 'string'
      ? parseISO(authorization.accessTokenExpirationDate)
      : authorization.accessTokenExpirationDate;
  return differenceInMilliseconds(expirationTime, Date.now());
};

export const createAuthService = ({ authorize, refresh }: Config): AuthService => ({
  authorize: () =>
    authorize()
      .then(res => dispatch(appActions.setAuthorization(res)))
      .catch(console.error),
  refresh: async () => {
    const currentAuth = getState().auth.authorization;
    try {
      if (!currentAuth?.refreshToken) throw Error('No refreshToken');
      const res = await refresh({ refreshToken: currentAuth.refreshToken });
      dispatch(appActions.setAuthorization(res));
      return res;
    } catch (e) {
      if (getRemainingTokenValidity() > 0) return currentAuth;
      dispatch(appActions.clearAuthorization());
    }
  },
  logout: () => {
    dispatch(appActions.clearAuthorization());
  },
});
