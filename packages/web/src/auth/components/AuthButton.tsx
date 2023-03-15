import { useCallback } from 'react';
import OAuth2Login from 'react-simple-oauth2-login';
import { SPOTIFY_AUTH_SCOPES, useAccessToken } from '@spotify-clone/shared/api';
import { SPOTIFY_CLIENT_ID } from '@spotify-clone/shared/secrets';

export const AuthButton: React.FC = () => {
  const [, setAccessToken] = useAccessToken();
  return (
    <OAuth2Login
      authorizationUrl="https://accounts.spotify.com/authorize"
      clientId={SPOTIFY_CLIENT_ID}
      redirectUri="http://localhost:3000/oauth"
      responseType="token"
      scope={SPOTIFY_AUTH_SCOPES.join(' ')}
      onFailure={console.warn}
      onSuccess={useCallback(({ access_token }) => setAccessToken(access_token), [setAccessToken])}
    />
  );
};
