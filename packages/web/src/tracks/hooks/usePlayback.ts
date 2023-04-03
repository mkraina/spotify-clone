import { useAppSelector } from '@spotify-clone/shared/redux';

import { trackPlayer } from '../utils';

export const usePlayback = ({ uri }: { uri?: string }) => {
  const isPlaying = useAppSelector(
    s => (s.tracks.player?.context.uri || s.tracks.player?.track_window.current_track.uri) === uri
  );
  const toggle = () => {
    if (!uri) return;
    if (isPlaying) return trackPlayer.pause();
    void trackPlayer.play(uri);
  };
  return [isPlaying, toggle] as const;
};
