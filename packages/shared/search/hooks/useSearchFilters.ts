import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SearchType } from 'spotify-types';

import { TranslationKey } from '../../i18n';

type Type = 'all' | 'artists' | 'tracks' | 'albums' | 'podcastsAndEpisodes';
type Config = { labelKey: TranslationKey; type: Type };
const filtersMap: Record<Type, SearchType[] | undefined> = {
  all: undefined,
  tracks: ['track'],
  artists: ['artist'],
  albums: ['album'],
  podcastsAndEpisodes: ['show', 'episode'],
};
const config: Config[] = [
  { type: 'all', labelKey: 'searchFilterAll' },
  { type: 'tracks', labelKey: 'searchFilterTracks' },
  { type: 'artists', labelKey: 'searchFilterArtists' },
  { type: 'albums', labelKey: 'searchFilterAlbums' },
  { type: 'podcastsAndEpisodes', labelKey: 'searchFilterPodcastsAndShows' },
];

export const useSearchFilters = () => {
  const [selectedFilter, setSelectedFilter] = useState<Type>('all');
  const { t } = useTranslation();
  return {
    selectedFilter: { type: selectedFilter, value: filtersMap[selectedFilter] },
    filters: useMemo(
      () =>
        config.map(c => ({
          type: c.type,
          label: t(c.labelKey),
          onSelect: () => setSelectedFilter(c.type),
          selected: c.type === selectedFilter,
        })),
      [selectedFilter, t]
    ),
    clearFilters: () => setSelectedFilter('all'),
  };
};

export type Filter = ReturnType<typeof useSearchFilters>['filters'][0];
export type SelectedFilter = ReturnType<typeof useSearchFilters>['selectedFilter'];
