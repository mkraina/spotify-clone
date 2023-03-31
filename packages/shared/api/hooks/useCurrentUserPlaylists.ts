import { useQuery } from 'react-query';
import { Paging, SimplifiedPlaylist } from 'spotify-types';

import { userQueryKey } from '../keyFactory';
import { api } from '../utils/api';

export const useCurrentUserPlaylists = () =>
  useQuery(
    userQueryKey.userPlaylists,
    async () => (await api.get<Paging<SimplifiedPlaylist>>('/me/playlists')).data
  );
