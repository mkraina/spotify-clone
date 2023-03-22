import { useQuery } from 'react-query';
import { Artist, Paging, PrivateUser, TopItemsTimeRange, TopItemsType, Track } from 'spotify-types';

import { userQueryKey } from '../keyFactory';
import { api } from '../utils/api';

export const useUserProfile = () =>
  useQuery(userQueryKey.userProfile, async () => (await api.get<PrivateUser>('/v1/me')).data);

export const useUserTop = <T extends TopItemsType>(topItemType: T, timeRange?: TopItemsTimeRange) =>
  useQuery(
    userQueryKey.userTop(topItemType, timeRange),
    async ({ queryKey: [, , { type, range }] }) =>
      (
        await api.get<Paging<T extends 'artists' ? Artist : Track>>(`/v1/me/top/${type}`, {
          params: { time_range: range },
        })
      ).data
  );
