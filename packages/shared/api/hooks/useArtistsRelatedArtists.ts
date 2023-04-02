import { useQuery } from 'react-query';
import { Artist } from 'spotify-types';

import { artistsQueryKey } from '../keyFactory';
import { api } from '../utils/api';

export const useArtistsRelatedArtists = (id: string) =>
  useQuery(
    artistsQueryKey.artistsRelatedArtists(id),
    async ({ queryKey: [, , filters] }) =>
      (await api.get<{ artists: Artist[] }>(`/artists/${filters.id}/related-artists`)).data
  );
