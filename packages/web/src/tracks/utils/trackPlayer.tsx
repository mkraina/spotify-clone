import { appActions, dispatch, getState } from '@spotify-clone/shared/redux';
import { SimplifiedAlbum, SimplifiedArtist, SimplifiedTrack } from 'spotify-types';
import SpotifyPlayer from 'spotify-web-playback';

import app from '../../../package.json';

export type TrackPlayerPlayContext = SimplifiedAlbum | SimplifiedArtist | SimplifiedTrack;

export interface TrackPlayer {
  init: () => void;
  pause: () => void;
  play: (uri: string) => void;
  setToken: (token: string) => void;
}

const createTrackPlayer = (): TrackPlayer => {
  let connected = false;
  const player = new SpotifyPlayer(app.name);
  const connect = async (onConnected?: () => void) => {
    const token = getState().auth.authorization?.accessToken;
    try {
      if (connected || !token) return;
      await player.connect(token);

      connected = new window.AudioContext().state === 'running';
    } catch (e) {
      console.log('error connecting', e);
    } finally {
      if (connected) onConnected?.();
    }
  };
  const init = () => {
    player.addListener('state', state =>
      dispatch(
        appActions.onPlayerStateChange(
          state
            ? {
                ...state,
                track_window: { current_track: state.track_window.current_track },
              }
            : undefined
        )
      )
    );
    void connect();
  };

  return {
    init,
    setToken: player.setToken,
    play: (uri: string) => {
      console.warn(uri);
      void connect(() => player.play(uri));
    },
    pause: () => {
      void connect(player.pause);
    },
  };
};

export const trackPlayer = createTrackPlayer();
