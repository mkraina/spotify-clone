import { appActions, useAppDispatch, useAppSelector } from '@spotify-clone/shared/redux';
import { useInterval } from '@spotify-clone/shared/timers';
import useEventCallback from 'use-event-callback';

import { trackPlayer } from '../utils';

export const useTrackPlayerPositionUpdate = () => {
  const isPlaying = useAppSelector(({ tracks: { player } }) =>
    Boolean(player?.track_window.current_track && !player.paused)
  );
  const dispatch = useAppDispatch();

  useInterval(
    useEventCallback(() => {
      if (!isPlaying) return;
      trackPlayer
        .getState()
        .then(state => state && dispatch(appActions.updatePlayerPosition(state.progress_ms)))
        .catch(console.log);
    }),
    1000
  );
};
