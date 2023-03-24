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

export const createAuthService = ({ authorize, refresh }: Config): AuthService => ({
  authorize: () =>
    authorize()
      .then(res => dispatch(appActions.setAuthorization(res)))
      .catch(console.error),
  refresh: async () => {
    const currentAuth = getState().auth.authorization;
    if (!currentAuth?.refreshToken) {
      dispatch(appActions.clearAuthorization());
      return;
    }
    try {
      const res = await refresh({ refreshToken: currentAuth.refreshToken });
      dispatch(appActions.setAuthorization(res));
      return res;
    } catch (e) {
      // TODO: if !res && previous still valid return previous
    }
  },
  logout: () => {
    dispatch(appActions.clearAuthorization());
  },
});
