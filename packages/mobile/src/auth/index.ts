import { AuthConfiguration, authorize } from 'react-native-app-auth';
import {
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

export const auth = async () => {
  try {
    const { accessToken } = await authorize(config);
    return accessToken;
  } catch (e) {
    console.warn(e);
  }
};
