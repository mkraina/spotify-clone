import { useQuery } from 'react-query';
import { Paging, Track } from 'spotify-types';

import { albumsQueryKey } from '../keyFactory';
import { api } from '../utils/api';

export const useAlbumTracks = (id: string) =>
  useQuery(
    albumsQueryKey.albumTracks(id),
    async ({ queryKey: [, , filters] }) =>
      (await api.get<Paging<Track>>(`/albums/${filters.id}/tracks`)).data
  );
