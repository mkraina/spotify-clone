import { useQuery } from 'react-query';
import { Track } from 'spotify-types';

import { artistsQueryKey } from '../keyFactory';
import { api } from '../utils/api';

export const useArtistsTopTracks = (id: string) =>
  useQuery(
    artistsQueryKey.artistsTopTracks(id),
    async ({ queryKey: [, , filters] }) =>
      (await api.get<{ tracks: Track }>(`/artists/${filters.id}/top-tracks`)).data
  );
