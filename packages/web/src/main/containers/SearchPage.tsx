import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Box, Chip, styled, Typography } from '@mui/material';
import { SearchResult, useSearch } from '@spotify-clone/shared/api';
import { TranslationKey } from '@spotify-clone/shared/i18n';
import { Filter, SelectedFilter, useSearchFilters } from '@spotify-clone/shared/search';
import { SearchContent } from 'spotify-types';

import { AlbumCard } from '../../albums';
import { ArtistCard } from '../../artists';
import { routes, withParams } from '../../navigation';
import { ShowCard } from '../../shows';
import { EpisodeCard } from '../../shows/components/EpisodeCard';
import { Card, GridLayout, SearchBar } from '../../ui';
import { Page } from '../components/Page';

const StyledChip = styled(Chip)<{ selected: boolean }>(({ selected, theme }) => ({
  marginInline: theme.spacing(1),
  backgroundColor: selected ? theme.palette.grey[100] : undefined,
  color: selected ? theme.palette.background.default : undefined,
}));

const sectionTitleKeys: Record<keyof SearchContent, TranslationKey> = {
  episodes: 'episodesTitle',
  albums: 'albumsTitle',
  artists: 'artistsTitle',
  shows: 'showsTitle',
  tracks: 'tracksTitle',
};

type SearchResultItem = NonNullable<SearchContent[keyof SearchContent]>['items'][0];
const ResultItem: React.FC<{
  item: SearchResultItem;
}> = ({ item }) => {
  switch (item.type) {
    case 'artist':
      return <ArtistCard artist={item} />;
    case 'album':
      return <AlbumCard album={item} />;
    case 'episode':
      return <EpisodeCard episode={item} />;
    case 'show':
      return <ShowCard show={item} />;
    default:
      return null;
  }
};

const renderItem = (item: SearchResultItem) => <ResultItem item={item} />;
const keyExtractor = (item: SearchResultItem) => item.id;
const Section: React.FC<{
  data: SearchResult;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
  isLoading: boolean;
  type: keyof SearchContent;
  hasNextPage?: boolean;
  showAll?: boolean;
}> = ({ type, data, showAll, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading }) => {
  const { t } = useTranslation();
  const renderLoadingItem = useCallback(
    () => <Card isPlaceholder roundAvatar={type === 'artists'} />,
    [type]
  );
  const items = useMemo(
    () =>
      data?.pages.reduce<SearchResultItem[]>(
        (acc, cur) => [...acc, ...(cur[type]?.items || [])],
        []
      ),
    [data?.pages, type]
  );

  if (!items?.length && !isLoading) return null;

  return (
    <Box flexDirection="column" padding={3} paddingTop={0}>
      {!showAll && <Typography variant="h5">{t(sectionTitleKeys[type])}</Typography>}
      <GridLayout
        data={items}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        isLoading={isLoading}
        keyExtractor={keyExtractor}
        maxRows={showAll ? undefined : 1}
        paddingY={1.5}
        renderItem={renderItem}
        renderLoadingItem={renderLoadingItem}
        spacing={2}
      />
    </Box>
  );
};

const Filters: React.FC<{ filters: Filter[] }> = ({ filters }) => (
  <Box flexDirection="row" padding={2} paddingTop={1} position="sticky" top={0}>
    {filters.map(f => (
      <StyledChip key={f.label} label={f.label} selected={f.selected} onClick={f.onSelect} />
    ))}
  </Box>
);
const shouldShowSection = (type: SelectedFilter['type'], selectedFilter: SelectedFilter) =>
  selectedFilter.type === 'all' || selectedFilter.type === type;

export default withParams<'search'>(({ params }) => {
  const { filters, selectedFilter } = useSearchFilters();
  const search = useSearch({ q: params.query, type: selectedFilter.value });
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <Page
      toolbarComponent={
        <SearchBar
          placeholder={t('searchInputPlaceholder')}
          value={params.query || ''}
          onChange={useCallback(
            (query: string) => navigate(routes.search({ query }), { replace: true }),
            [navigate]
          )}
        />
      }
    >
      <Filters filters={filters} />
      {shouldShowSection('artists', selectedFilter) && (
        <Section {...search} showAll={selectedFilter.type === 'artists'} type="artists" />
      )}
      {shouldShowSection('albums', selectedFilter) && (
        <Section {...search} showAll={selectedFilter.type === 'albums'} type="albums" />
      )}
      {shouldShowSection('podcastsAndEpisodes', selectedFilter) && (
        <>
          <Section {...search} type="shows" />
          <Section {...search} type="episodes" />
        </>
      )}
    </Page>
  );
});
