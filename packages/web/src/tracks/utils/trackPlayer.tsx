import { dispatch, getState } from '@spotify-clone/shared/redux';
import { tracksActions } from '@spotify-clone/shared/redux/utils/tracksReducer';
import SpotifyPlayer from 'spotify-web-playback';

const createTrackPlayer = (): Pick<SpotifyPlayer, 'play'> => {
  let connected = false;
  const player = new SpotifyPlayer('spotify-clone-web');
  player.addListener('state', state =>
    dispatch(
      tracksActions.onPlayerStateChange(
        state
          ? {
              ...state,
              track_window: { current_track: { id: state.track_window.current_track.id } },
            }
          : undefined
      )
    )
  );

  const connect = async () => {
    const token = getState().auth.authorization?.accessToken;
    if (connected || !token) return;
    try {
      await player.connect(token);
      connected = true;
    } catch (e) {
      console.log(e);
    }
    return;
  };

  return {
    play: async () => {
      await connect();
      return player.play();
    },
  };
};

export const trackPlayer = createTrackPlayer();
