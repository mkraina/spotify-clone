import { useQuery } from 'react-query';
import { Artist, Paging } from 'spotify-types';

import { userQueryKey } from '../keyFactory';
import { api } from '../utils/api';

export const useFollowedArtists = () =>
  useQuery(
    userQueryKey.followedArtists,
    async () =>
      (await api.get<{ artists: Paging<Artist> }>('/me/following', { params: { type: 'artist' } }))
        .data
  );
