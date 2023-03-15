import { useQuery, UseQueryOptions } from 'react-query';
import { Artist, Paging, PrivateUser, TopItemsTimeRange, TopItemsType, Track } from 'spotify-types';

import { useAccessToken } from '../components';
import { userQueryKey } from '../keyFactory';
import { api } from '../utils/api';

const useEnabledIfLoggedIn = (): Pick<UseQueryOptions, 'enabled'> => {
  const [accessToken] = useAccessToken();
  return { enabled: !!accessToken };
};

export const useUserProfile = () =>
  useQuery(userQueryKey.userProfile, async () => (await api.get<PrivateUser>('/v1/me')).data, {
    ...useEnabledIfLoggedIn(),
  });

export const useUserTop = <T extends TopItemsType>(topItemType: T, timeRange?: TopItemsTimeRange) =>
  useQuery(
    userQueryKey.userTop(topItemType, timeRange),
    async ({ queryKey: [, , { type, range }] }) =>
      (
        await api.get<Paging<T extends 'artists' ? Artist : Track>>(`/v1/me/top/${type}`, {
          params: { time_range: range },
        })
      ).data,
    {
      ...useEnabledIfLoggedIn(),
    }
  );
