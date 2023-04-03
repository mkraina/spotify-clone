import { queryClient } from '@spotify-clone/shared/api';
import { playerQueryKey } from '@spotify-clone/shared/api/keyFactory';
import { appActions, dispatch, getState } from '@spotify-clone/shared/redux';
import { repeatModes } from '@spotify-clone/shared/trackplayer';
import { SimplifiedAlbum, SimplifiedArtist, SimplifiedTrack } from 'spotify-types';
import SpotifyPlayer, { SpotifyStateListener } from 'spotify-web-playback';

import app from '../../../package.json';

import { parsePlayerTrack } from './parsers';

export type TrackPlayerPlayContext = SimplifiedAlbum | SimplifiedArtist | SimplifiedTrack;

export interface TrackPlayer {
  connect: () => void;
  getState: SpotifyPlayer['getPlaybackState'];
  init: () => () => void;
  next: () => void;
  pause: () => void;
  play: (uri: string | undefined, resume: boolean) => void;
  previous: () => void;
  seekTo: (to: number) => void;
  setToken: (token: string) => void;
}

const onStateChange: SpotifyStateListener = state => {
  void queryClient.invalidateQueries(playerQueryKey.all);
  dispatch(
    appActions.onPlayerStateChange(
      state
        ? {
            ...state,
            repeat_mode: repeatModes[state.repeat_mode] ?? 'off',
            track_window: {
              current_track: parsePlayerTrack(state.track_window.current_track),
              previous_tracks: state.track_window.previous_tracks.map(parsePlayerTrack),
              next_tracks: state.track_window.next_tracks.map(parsePlayerTrack),
            },
          }
        : undefined
    )
  );
};

const createTrackPlayer = (): TrackPlayer => {
  let connected = false;
  const player = new SpotifyPlayer(app.name);

  const connect = async (onConnected?: () => void) => {
    const token = getState().auth.authorization?.accessToken;
    try {
      if (connected || !token) return;
      await player.connect(token);
      connected = new window.AudioContext().state === 'running';
      void queryClient.invalidateQueries(playerQueryKey.all);
    } catch (e) {
      console.log('error connecting', e);
    } finally {
      if (connected) onConnected?.();
    }
  };
  const init = () => {
    player.addListener('state', onStateChange);
    player.addListener('error', e => console.log(JSON.stringify(e, null, 2)));
    void connect();
    return () => player.removeListener('state', onStateChange);
  };

  return {
    init,
    setToken: player.setToken,
    play: (uri, resume) => {
      void connect(() => player.play(resume ? undefined : uri));
    },
    pause: () => {
      void connect(() => player.pause());
    },
    getState: () => player.getPlaybackState(),
    seekTo: to => {
      void connect(() => player.seek(to));
    },
    previous: () => player.previous(),
    next: () => player.next(),
    connect,
  };
};

export const trackPlayer = createTrackPlayer();
