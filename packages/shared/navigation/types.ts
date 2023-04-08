export type ScreenParamList = {
  account: undefined;
  album: { id: string };
  artist: { id: string };
  category: { id: string };
  collection: { type?: 'playlists' | 'podcasts' | 'artists' | 'albums' };
  episode: { id: string };
  home: undefined;
  playlist: { id: string };
  search: { query?: string };
  show: { id: string };
  track: { id: string };
};

export type ScreenName = keyof ScreenParamList;
