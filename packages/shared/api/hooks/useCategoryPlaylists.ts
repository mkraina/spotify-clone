import { useQuery } from 'react-query';
import { Paging, SimplifiedPlaylist } from 'spotify-types';

import { playlistsQueryKey } from '../keyFactory';
import { api } from '../utils/api';

export const useCategoryPlaylists = (id: string) =>
  useQuery(
    playlistsQueryKey.categoryPlaylists(id),
    async ({ queryKey: [, , filters] }) =>
      (
        await api.get<{ playlists: Paging<SimplifiedPlaylist> }>(
          `/browse/categories/${filters.id}/playlists`
        )
      ).data
  );
