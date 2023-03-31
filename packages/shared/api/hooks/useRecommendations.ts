import { useQuery } from 'react-query';
import { RecommendationSeed, Track } from 'spotify-types';

import { browseQueryKey } from '../keyFactory';
import { api } from '../utils/api';

export const useRecommendations = () =>
  useQuery(
    browseQueryKey.recommendations,
    async () =>
      (
        await api.get<{
          seeds: RecommendationSeed[];
          tracks: Track[];
        }>('/recommendations', {
          params: {
            seed_artists: '4NHQUGzhtTLFvgF5SZesLK',
            seed_genres: 'classical, country',
            seed_tracks: '0c6xIDDpzE81m2q797ordA',
          },
        })
      ).data
  );
