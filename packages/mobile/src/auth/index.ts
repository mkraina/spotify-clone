import { AuthConfiguration, authorize } from 'react-native-app-auth';
import { SPOTIFY_AUTH_SCOPES } from '@spotify-clone/shared/api';
import { SPOTIDY_CLIENT_SECRET, SPOTIFY_CLIENT_ID } from '@spotify-clone/shared/secrets';

const config: AuthConfiguration = {
  clientId: SPOTIFY_CLIENT_ID,
  clientSecret: SPOTIDY_CLIENT_SECRET,
  redirectUrl: 'com.mkraina.spotifyclone.auth:/oauth',
  scopes: SPOTIFY_AUTH_SCOPES,
  serviceConfiguration: {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
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
