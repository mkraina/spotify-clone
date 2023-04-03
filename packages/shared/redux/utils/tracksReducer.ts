import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SimplifiedAlbum, SimplifiedArtist, Track } from 'spotify-types';

import { RepeatMode } from '../../trackplayer';

export type PlayerTrack = Pick<Track, 'id' | 'uri' | 'name'> & {
  album: Pick<SimplifiedAlbum, 'id' | 'name' | 'images'>;
  artists: Pick<SimplifiedArtist, 'id' | 'name'>[];
};
type Player = {
  context: {
    metadata: Record<string, unknown>;
    uri: null | string;
  };
  duration: number;
  paused: boolean;
  position: number;
  repeat_mode: RepeatMode;
  shuffle: boolean;
  timestamp: number;
  track_window: {
    current_track: PlayerTrack;
    next_tracks: PlayerTrack[];
    previous_tracks: PlayerTrack[];
  };
};

export type TracksState = {
  player?: Player;
};

const initialState: TracksState = {};

const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    onPlayerStateChange: (state, action: PayloadAction<Player | undefined>) => ({
      ...state,
      player: action.payload,
    }),
    updatePlayerPosition: (state, action: PayloadAction<number>) =>
      state.player
        ? {
            ...state,
            player: { ...state.player, position: action.payload },
          }
        : state,
  },
});

export const tracksActions = tracksSlice.actions;
export const tracksReducer = tracksSlice.reducer;
