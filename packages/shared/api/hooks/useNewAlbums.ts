import { useQuery } from 'react-query';
import { Album, Paging } from 'spotify-types';

import { browseQueryKey } from '../keyFactory';
import { api } from '../utils';

export const useNewAlbums = () =>
  useQuery(
    browseQueryKey.newAlbums,
    async () => (await api.get<{ albums: Paging<Album> }>('/browse/new-releases')).data
  );
