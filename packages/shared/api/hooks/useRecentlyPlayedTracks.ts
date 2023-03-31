import { useQuery } from 'react-query';
import { subDays } from 'date-fns';
import { Paging, PlayHistory } from 'spotify-types';

import { userQueryKey } from '../keyFactory';
import { api } from '../utils';

type Result = Paging<PlayHistory>;

export const useRecentlyPlayedTracks = <T = Result>(props?: {
  afterInDays?: number;
  select?: (data: Result) => T;
}) =>
  useQuery(
    userQueryKey.recentlyPlayedTracks(props?.afterInDays),
    async ({ queryKey: [, , filters] }) =>
      (
        await api.get<Result>('/me/player/recently-played', {
          params: {
            after: filters.afterInDays && subDays(Date.now(), filters.afterInDays).getTime(),
          },
        })
      ).data,
    { select: props?.select }
  );
