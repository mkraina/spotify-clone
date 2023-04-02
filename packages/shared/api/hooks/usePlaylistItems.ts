import { useQuery } from 'react-query';
import { Paging, Track } from 'spotify-types';

import { playlistsQueryKey } from '../keyFactory';
import { api } from '../utils/api';

export const usePlaylistItems = (id: string) =>
  useQuery(
    playlistsQueryKey.playlistItems(id),
    async ({ queryKey: [, , filters] }) =>
      (
        await api.get<Paging<{ added_at: string; tracks: Track }>>(
          `/playlists/${filters.id}/tracks`
        )
      ).data
  );
