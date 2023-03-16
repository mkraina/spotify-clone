import { useCallback } from 'react';
import OAuth2Login from 'react-simple-oauth2-login';
import {
  SPOTIFY_AUTH_CALLBACK_WEB,
  SPOTIFY_AUTH_SCOPES,
  SPOTIFY_AUTHORIZATION_URL,
  useAccessToken,
} from '@spotify-clone/shared/api';
import { SPOTIFY_CLIENT_ID } from '@spotify-clone/shared/secrets';

export const AuthButton: React.FC = () => {
  const [, setAccessToken] = useAccessToken();
  return (
    <OAuth2Login
      authorizationUrl={SPOTIFY_AUTHORIZATION_URL}
      clientId={SPOTIFY_CLIENT_ID}
      redirectUri={SPOTIFY_AUTH_CALLBACK_WEB}
      responseType="token"
      scope={SPOTIFY_AUTH_SCOPES.join(' ')}
      onFailure={console.warn}
      onSuccess={useCallback(({ access_token }) => setAccessToken(access_token), [setAccessToken])}
    />
  );
};
