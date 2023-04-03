/* eslint-disable max-lines-per-function */
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Box, Chip, styled, Typography } from '@mui/material';
import { SearchResult, useBrowseCategories, useSearch } from '@spotify-clone/shared/api';
import { TranslationKey } from '@spotify-clone/shared/i18n';
import { Filter, SelectedFilter, useSearchFilters } from '@spotify-clone/shared/search';
import { Category, SearchContent } from 'spotify-types';

import { AlbumCard } from '../../albums';
import { ArtistCard } from '../../artists';
import { CategoryCard } from '../../categories';
import { routes, withParams } from '../../navigation';
import { ShowCard } from '../../shows';
import { EpisodeCard } from '../../shows/components/EpisodeCard';
import { Card, GridLayout, GridLayoutProps, SearchBar } from '../../ui';
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
const renderCategory = (category: Category) => <CategoryCard category={category} />;
const keyExtractor = (item: SearchResultItem | Category) => item.id;

const Section = <T,>(props: { title: string | undefined } & GridLayoutProps<T>) => (
  <Box flexDirection="column" padding={3} paddingTop={0}>
    {!!props.title && <Typography variant="h5">{props.title}</Typography>}
    <GridLayout {...props} paddingY={1.5} spacing={2} />
  </Box>
);

const Results: React.FC<{
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
    <Section
      data={items}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      isLoading={isLoading}
      keyExtractor={keyExtractor}
      maxRows={showAll ? undefined : 1}
      renderItem={renderItem}
      renderLoadingItem={renderLoadingItem}
      title={showAll ? undefined : t(sectionTitleKeys[type])}
    />
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
  const categories = useBrowseCategories();
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
      {params.query ? (
        <>
          <Filters filters={filters} />
          {shouldShowSection('artists', selectedFilter) && (
            <Results {...search} showAll={selectedFilter.type === 'artists'} type="artists" />
          )}
          {shouldShowSection('albums', selectedFilter) && (
            <Results {...search} showAll={selectedFilter.type === 'albums'} type="albums" />
          )}
          {shouldShowSection('podcastsAndEpisodes', selectedFilter) && (
            <>
              <Results {...search} type="shows" />
              <Results {...search} type="episodes" />
            </>
          )}
        </>
      ) : (
        <Section
          data={categories.data?.categories.items}
          keyExtractor={keyExtractor}
          paddingY={1.5}
          renderItem={renderCategory}
          spacing={2}
          title={t('browseAllTitle')}
        />
      )}
    </Page>
  );
});
