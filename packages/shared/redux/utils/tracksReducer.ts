import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SimplifiedTrack } from 'spotify-types';

type Player = {
  bitrate: number;
  context: {
    metadata: Record<string, unknown>;
    uri: null | string;
  };
  disallows: {
    resuming: boolean;
    skipping_prev: boolean;
  };
  duration: number;
  paused: boolean;
  position: number;
  repeat_mode: number;
  restrictions: {
    disallow_resuming_reasons: [];
    disallow_skipping_prev_reasons: [];
  };
  shuffle: boolean;
  timestamp: number;
  track_window: {
    current_track: Pick<SimplifiedTrack, 'id' | 'uri'>;
    //next_tracks: SimplifiedTrack[];
    //previous_tracks: SimplifiedTrack[];
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
  },
});

export const tracksActions = tracksSlice.actions;
export const tracksReducer = tracksSlice.reducer;
