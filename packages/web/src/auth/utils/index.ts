import {
  api,
  createAuthService,
  SPOTIFY_AUTH_CALLBACK_WEB,
  SPOTIFY_AUTH_SCOPES,
  SPOTIFY_AUTHORIZATION_URL,
  SPOTIFY_TOKEN_URL,
} from '@spotify-clone/shared/api';
import { UserAuthorization } from '@spotify-clone/shared/api/types';
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '@spotify-clone/shared/secrets';
import * as base64 from 'base-64';
import qs from 'qs';
import * as uuid from 'uuid';

const authCodeResultSuccess = 'auth-code-result-success';
const authCodeResultError = 'auth-code-result-error';
type AuthResult = {
  access_token: string;
  expires_in: number;
  refresh_token: string | undefined;
  scope: string;
  token_type: 'Bearer';
};
type AuthCodeResultSuccess = {
  code: string;
  state: string | undefined;
  type: typeof authCodeResultSuccess;
};
type AuthCodeResultError = { error: string; type: typeof authCodeResultError };
type AuthCodeResult = AuthCodeResultSuccess | AuthCodeResultError;

const isAuthCodeResult = (res: unknown): res is AuthCodeResult => {
  if (!res || typeof res !== 'object') return false;
  return 'type' in res && [authCodeResultSuccess, authCodeResultError].includes(res.type as string);
};

export const onAuthorizationCodeReceived = (search: string) => {
  if (!search) return;
  const { code, error, state } = qs.parse(search.substring(1));
  const result: AuthCodeResult =
    typeof code === 'string'
      ? {
          type: 'auth-code-result-success',
          code,
          state: typeof state === 'string' ? state : undefined,
        }
      : {
          type: 'auth-code-result-error',
          error: typeof error === 'string' ? error : 'UnspecifiedError',
        };
  window.opener?.postMessage(result);
};

const getAuthorization = async (
  token: string,
  grantType: 'authorization_code' | 'refresh_token'
): Promise<UserAuthorization> => {
  const authorization = `Basic ${base64.encode(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`)}`;
  const {
    data: { access_token, refresh_token },
  } = await api.post<AuthResult>(
    SPOTIFY_TOKEN_URL,
    {
      grant_type: grantType,
      [grantType === 'authorization_code' ? 'code' : 'refresh_token']: token,
      redirect_uri: SPOTIFY_AUTH_CALLBACK_WEB,
    },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: authorization,
      },
    }
  );
  return { accessToken: access_token, refreshToken: refresh_token };
};

const authorize = async (): Promise<UserAuthorization> => {
  const config = {
    response_type: 'code',
    client_id: SPOTIFY_CLIENT_ID,
    scope: SPOTIFY_AUTH_SCOPES.join(' '),
    redirect_uri: SPOTIFY_AUTH_CALLBACK_WEB,
    show_dialog: true,
    token_path: SPOTIFY_AUTHORIZATION_URL,
    state: uuid.v4(),
  } as const;
  const redirectUri = `${SPOTIFY_AUTHORIZATION_URL}?${qs.stringify(config)}`;
  const loginWindow = window.open(
    redirectUri,
    '_blank',
    qs.stringify({ width: 500, height: 500 }, { delimiter: ',' })
  );
  let onCodeRetrieveListener: ((event: MessageEvent) => void) | undefined;
  try {
    const { code } = await new Promise<AuthCodeResultSuccess>((resolve, reject) => {
      onCodeRetrieveListener = event => {
        if (!isAuthCodeResult(event.data)) return;
        loginWindow?.close();
        if (event.data.type === 'auth-code-result-error')
          return reject(new Error(event.data.error));
        if (event.data.state !== config.state) return reject(new Error('State mismatch'));
        return resolve(event.data);
      };
      window.addEventListener('message', onCodeRetrieveListener);
    });
    return getAuthorization(code, 'authorization_code');
  } finally {
    if (onCodeRetrieveListener) window.removeEventListener('message', onCodeRetrieveListener);
  }
};

export const authService = createAuthService({
  authorize,
  refresh: ({ refreshToken }) => getAuthorization(refreshToken, 'refresh_token'),
});
