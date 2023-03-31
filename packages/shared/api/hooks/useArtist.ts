import { useQuery } from 'react-query';
import { Artist } from 'spotify-types';

import { artistsQueryKey } from '../keyFactory';
import { api } from '../utils/api';

export const useArtist = (id: string) =>
  useQuery(
    artistsQueryKey.artist(id),
    async ({ queryKey: [, , filters] }) => (await api.get<Artist>(`/artists/${filters.id}`)).data
  );
