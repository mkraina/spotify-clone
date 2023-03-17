import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SearchType } from 'spotify-types';

import { TranslationKey } from '../../i18n';

const config: { labelKey: TranslationKey; type: SearchType[] | undefined }[] = [
  { type: undefined, labelKey: 'searchFilterAll' },
  { type: ['track'], labelKey: 'searchFilterTracks' },
  { type: ['artist'], labelKey: 'searchFilterArtists' },
  { type: ['album'], labelKey: 'searchFilterAlbums' },
  { type: ['show', 'episode'], labelKey: 'searchFilterPodcastsAndShows' },
];

export const useSearchFilters = () => {
  const [selectedFilter, setSelectedFilter] = useState<SearchType[]>();
  const { t } = useTranslation();
  return {
    selectedFilter,
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
  };
};
