import { useAppSelector } from '@spotify-clone/shared/redux';

import { isPlaying, trackPlayer } from '../utils';

export type PlaybackStatus = 'playing' | 'paused' | 'none';
export const usePlayback = ({ uri }: { uri?: string }) => {
  const isActive = useAppSelector(s => isPlaying(uri, s));
  const isPaused = useAppSelector(s => !!s.tracks.player?.paused);
  const status: PlaybackStatus = isActive ? (isPaused ? 'paused' : 'playing') : 'none';
  const toggle = () => {
    if (!uri) return;
    if (status === 'playing') return trackPlayer.pause();
    void trackPlayer.play(uri, isPaused);
  };
  return [status, toggle] as const;
};
