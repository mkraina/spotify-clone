import { useQuery } from 'react-query';
import { Category, Paging } from 'spotify-types';

import { browseQueryKey } from '../keyFactory';
import { api } from '../utils/api';

export const useBrowseCategories = () =>
  useQuery(
    browseQueryKey.categories,
    async () =>
      (
        await api.get<{ categories: Paging<Category> }>('/browse/categories', {
          params: { limit: 50 },
        })
      ).data
  );
