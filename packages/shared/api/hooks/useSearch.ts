import { useQuery } from 'react-query';
import { SearchContent, SearchType } from 'spotify-types';

import { searchQueryKey } from '../keyFactory';
import { api } from '../utils/api';

const defaultSearchTypes: SearchType[] = ['album', 'artist', 'track', 'show', 'episode'];
export const useSearch = (props: Parameters<(typeof searchQueryKey)['search']>[0]) =>
  useQuery(
    searchQueryKey.search(props),
    async ({ queryKey: [, , params] }) => {
      return (
        await api.get<SearchContent>('/search', {
          params: { ...params, type: params.type ?? defaultSearchTypes },
        })
      ).data;
    },
    { enabled: !!props.q }
  );
