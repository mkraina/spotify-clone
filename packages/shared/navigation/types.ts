export type ScreenParamList = {
  account: undefined;
  artist: { id: string };
  home: undefined;
  search: { query?: string };
  track: { id: string };
};

export type ScreenName = keyof ScreenParamList;
