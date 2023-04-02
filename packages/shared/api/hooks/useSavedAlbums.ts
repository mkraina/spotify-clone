import { useQuery } from 'react-query';
import { Album, Paging } from 'spotify-types';

import { userQueryKey } from '../keyFactory';
import { api } from '../utils/api';

export const useSavedAlbums = () =>
  useQuery(
    userQueryKey.savedAlbums,
    async () => (await api.get<Paging<{ added_at: string; album: Album }>>('/me/albums')).data
  );
