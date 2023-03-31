import { useQuery } from 'react-query';
import { Paging, SimplifiedPlaylist } from 'spotify-types';

import { playlistsQueryKey } from '../keyFactory';
import { api } from '../utils/api';

export const useUserPlaylists = (...args: Parameters<typeof playlistsQueryKey.user>) =>
  useQuery(
    playlistsQueryKey.user(...args),
    async ({ queryKey: [, , { id }] }) =>
      (await api.get<Paging<SimplifiedPlaylist>>(`/users/${id}/playlists`)).data
  );
