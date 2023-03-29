export type ScreenParamList = {
  account: undefined;
  artist: { id: string };
  collection: { type?: 'playlists' | 'podcasts' | 'artists' | 'albums' };
  home: undefined;
  search: { query?: string };
  track: { id: string };
};

export type ScreenName = keyof ScreenParamList;
