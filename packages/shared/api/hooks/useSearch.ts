import { QueryFunctionContext, useInfiniteQuery } from 'react-query';
import { Paging, SearchContent, SearchResultItem, SearchType } from 'spotify-types';

import { PAGE_SIZE } from '../config';
import { searchQueryKey } from '../keyFactory';
import { api } from '../utils/api';

const defaultSearchTypes: SearchType[] = ['album', 'artist', 'track', 'show', 'episode'];

export type SearchResultData = {
  nextOffset: number | undefined;
  results: { [K in keyof SearchContent]?: Paging<SearchResultItem> };
};

export const useSearch = (props: Parameters<(typeof searchQueryKey)['search']>[0]) =>
  useInfiniteQuery(
    searchQueryKey.search(props),
    async ({
      queryKey: [, , { q, type = defaultSearchTypes }],
      pageParam = 0,
    }: QueryFunctionContext<
      ReturnType<typeof searchQueryKey.search>,
      number
    >): Promise<SearchResultData> => {
      const params = { limit: PAGE_SIZE, offset: pageParam };
      const { data } = await api.get<SearchResultData['results'] | undefined>('/search', {
        params: { ...params, type, q },
      });
      const nextOffset = pageParam + PAGE_SIZE;
      const total = Object.values(data || {}).reduce<number>((acc, cur) => acc + cur.total, 0);
      const hasNextPage = total > nextOffset;
      return { results: data || {}, nextOffset: hasNextPage ? nextOffset : undefined };
    },
    { enabled: !!props.q, getNextPageParam: d => d.nextOffset }
  );

export type SearchResult = ReturnType<typeof useSearch>['data'];
