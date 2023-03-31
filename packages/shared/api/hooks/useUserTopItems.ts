import { useQuery } from 'react-query';
import { Artist, Paging, TopItemsTimeRange, TopItemsType, Track } from 'spotify-types';

import { userQueryKey } from '../keyFactory';
import { api } from '../utils/api';

export const useUserTopItems = <T extends TopItemsType>(
  topItemType: T,
  timeRange?: TopItemsTimeRange
) =>
  useQuery(
    userQueryKey.userTopItems(topItemType, timeRange),
    async ({ queryKey: [, , { type, range }] }) =>
      (
        await api.get<Paging<T extends 'artists' ? Artist : Track>>(`/me/top/${type}`, {
          params: { time_range: range },
        })
      ).data
  );
