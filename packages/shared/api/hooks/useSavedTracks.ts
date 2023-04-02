import { useQuery } from 'react-query';
import { Paging, Track } from 'spotify-types';

import { userQueryKey } from '../keyFactory';
import { api } from '../utils/api';

export const useSavedTracks = () =>
  useQuery(
    userQueryKey.savedTracks,
    async () => (await api.get<Paging<{ added_at: string; track: Track }>>('/me/tracks')).data
  );
