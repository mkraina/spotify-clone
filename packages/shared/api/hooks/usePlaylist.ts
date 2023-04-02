import { useQuery } from 'react-query';
import { Playlist } from 'spotify-types';

import { playlistsQueryKey } from '../keyFactory';
import { api } from '../utils/api';

export const usePlaylist = (id: string) =>
  useQuery(
    playlistsQueryKey.playlist(id),
    async ({ queryKey: [, , filters] }) =>
      (await api.get<Playlist>(`/playlists/${filters.id}`)).data
  );
