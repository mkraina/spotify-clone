import { useQuery } from 'react-query';
import { FeaturedPlaylists } from 'spotify-types';

import { playlistsQueryKey } from '../keyFactory';
import { api } from '../utils/api';

export const useFeaturedPlaylists = () =>
  useQuery(
    playlistsQueryKey.featured,
    async () =>
      (
        await api.get<FeaturedPlaylists>('/browse/featured-playlists', {
          params: { country: 'US', locale: 'en_US' },
        })
      ).data
  );
