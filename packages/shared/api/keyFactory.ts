import { TopItemsTimeRange, TopItemsType } from 'spotify-types';

const userAll = ['user'] as const;

export const userQueryKey = {
  all: userAll,
  userProfile: [...userAll, 'me'] as const,
  userTop: (type: TopItemsType, range: TopItemsTimeRange | undefined) =>
    [...userAll, 'top', { type, range }] as const,
};
