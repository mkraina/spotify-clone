import { AuthConfiguration, authorize, refresh as authRefresh } from 'react-native-app-auth';
import {
  createAuthService,
  SPOTIFY_AUTH_CALLBACK_MOBILE,
  SPOTIFY_AUTH_SCOPES,
  SPOTIFY_AUTHORIZATION_URL,
  SPOTIFY_TOKEN_URL,
} from '@spotify-clone/shared/api';
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '@spotify-clone/shared/secrets';

const config: AuthConfiguration = {
  clientId: SPOTIFY_CLIENT_ID,
  clientSecret: SPOTIFY_CLIENT_SECRET,
  redirectUrl: SPOTIFY_AUTH_CALLBACK_MOBILE,
  scopes: SPOTIFY_AUTH_SCOPES,
  serviceConfiguration: {
    authorizationEndpoint: SPOTIFY_AUTHORIZATION_URL,
    tokenEndpoint: SPOTIFY_TOKEN_URL,
  },
};

export const authService = createAuthService({
  authorize: () => authorize(config),
  refresh: async ({ refreshToken }) => {
    const result = await authRefresh(config, { refreshToken });
    return {
      refreshToken: result.refreshToken || undefined,
      accessToken: result.accessToken,
      accessTokenExpirationDate: result.accessTokenExpirationDate,
    };
  },
});
