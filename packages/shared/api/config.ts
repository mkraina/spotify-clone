export const SPOTIFY_AUTH_CALLBACK_WEB = __DEV__ ? 'http://localhost:3000/oauth' : ''; //TODO:
export const SPOTIFY_AUTH_CALLBACK_MOBILE = 'com.mkraina.spotifyclone.auth:/oauth';
export const SPOTIFY_AUTHORIZATION_URL = 'https://accounts.spotify.com/authorize';
export const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';
export const SPOTIFY_AUTH_SCOPES = [
  'ugc-image-upload',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'app-remote-control',
  'streaming',
  'playlist-read-private',
  'playlist-read-collaborative',
  'playlist-modify-private',
  'playlist-modify-public',
  'user-follow-modify',
  'user-follow-read',
  'user-read-playback-position',
  'user-top-read',
  'user-read-recently-played',
  'user-library-modify',
  'user-library-read',
  'user-read-email',
  'user-read-private',
];

export const PAGE_SIZE = 20;
