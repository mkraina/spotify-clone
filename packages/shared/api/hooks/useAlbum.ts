import { useQuery } from 'react-query';
import { Album } from 'spotify-types';

import { albumsQueryKey } from '../keyFactory';
import { api } from '../utils/api';

export const useAlbum = (id: string) =>
  useQuery(
    albumsQueryKey.album(id),
    async ({ queryKey: [, , filters] }) => (await api.get<Album>(`/albums/${filters.id}`)).data
  );
