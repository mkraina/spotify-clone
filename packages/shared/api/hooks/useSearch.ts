import { QueryFunctionContext, useInfiniteQuery } from 'react-query';
import { SearchContent, SearchType } from 'spotify-types';

import { PAGE_SIZE } from '../config';
import { searchQueryKey } from '../keyFactory';
import { api } from '../utils/api';

const defaultSearchTypes: SearchType[] = ['album', 'artist', 'track', 'show', 'episode'];
const searchTypeToResultFieldMap: Record<SearchType, keyof SearchContent> = {
  album: 'albums',
  artist: 'artists',
  track: 'tracks',
  show: 'shows',
  episode: 'episodes',
};

export type SearchResultItem = NonNullable<SearchContent[keyof SearchContent]>['items'][0];

export const useSearch = (props: Parameters<(typeof searchQueryKey)['search']>[0]) =>
  useInfiniteQuery(
    searchQueryKey.search(props),
    async ({
      queryKey: [, , { q, type = defaultSearchTypes }],
      pageParam = 0,
    }: QueryFunctionContext<ReturnType<typeof searchQueryKey.search>, number>) => {
      const params = { limit: PAGE_SIZE, offset: pageParam };
      const { data } = await api.get<SearchContent>('/search', {
        params: { ...params, type, q },
      });
      const [searchType, ...rest] = type;
      const nextOffset = pageParam + PAGE_SIZE;
      const dataForSearchType =
        rest.length === 0 ? searchType && data[searchTypeToResultFieldMap[searchType]] : undefined;
      const total = dataForSearchType?.total || 0;
      const hasNextPage = dataForSearchType?.items.length && total > nextOffset;
      return { ...data, nextOffset: hasNextPage ? nextOffset : undefined };
    },
    { enabled: !!props.q, getNextPageParam: d => d.nextOffset }
  );

export type SearchResult = ReturnType<typeof useSearch>['data'];
