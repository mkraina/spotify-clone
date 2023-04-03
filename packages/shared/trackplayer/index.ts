import { api } from '../api';

//TODO: add all player endpoints
export const repeatModes = ['off', 'context', 'track'] as const;
export type RepeatMode = (typeof repeatModes)[number];

export const setRepeatMode = (currentState: RepeatMode) =>
  api.put(
    '/me/player/repeat',
    {},
    { params: { state: repeatModes[(repeatModes.indexOf(currentState) + 1) % repeatModes.length] } }
  );
export const setPlaybackVolume = (volumePercent: number) =>
  api.put('/me/player/volume', {}, { params: { volume_percent: volumePercent } });
export const togglePlaybackShuffle = (state: boolean) =>
  api.put('/me/player/shuffle', {}, { params: { state } });
export const transferPlayback = (id: string, play?: boolean) =>
  api.put('/me/player', { device_ids: [id], play });
