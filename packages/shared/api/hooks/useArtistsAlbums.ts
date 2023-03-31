import { useQuery } from 'react-query';
import { Album, Paging } from 'spotify-types';

import { artistsQueryKey } from '../keyFactory';
import { api } from '../utils/api';

export const useArtistsAlbums = (id: string) =>
  useQuery(
    artistsQueryKey.artistsAlbums(id),
    async ({ queryKey: [, , filters] }) =>
      (await api.get<Paging<Album>>(`/artists/${filters.id}/albums`)).data
  );
