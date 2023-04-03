import { AppState } from '@spotify-clone/shared/redux';

export const isPlaying = (uri: string | undefined, { tracks: { player } }: AppState) => {
  if (!uri) return;
  const playedUri = player?.context.uri || player?.track_window.current_track.uri;
  if (!playedUri) return;
  return playedUri === uri;
};
