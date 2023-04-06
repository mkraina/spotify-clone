import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Box, Chip, styled, Typography } from '@mui/material';
import { SearchResult, useBrowseCategories, useSearch } from '@spotify-clone/shared/api';
import { TranslationKey } from '@spotify-clone/shared/i18n';
import { useAppDispatch, useAppSelector } from '@spotify-clone/shared/redux';
import { searchActions } from '@spotify-clone/shared/redux/utils/searchReducer';
import { Filter, SelectedFilter, useSearchFilters } from '@spotify-clone/shared/search';
import { Category, SearchContent, SearchResultItem } from 'spotify-types';

import { AlbumCard } from '../../albums';
import { ArtistCard } from '../../artists';
import { CategoryCard } from '../../categories';
import { routes, withParams } from '../../navigation';
import { EpisodeCard, ShowCard } from '../../shows';
import { TracksList } from '../../tracks';
import { Card, CardProvider, GridLayout, GridLayoutProps, SearchBar } from '../../ui';
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

const ResultItem: React.FC<{
  item: SearchResultItem;
  isRecent?: boolean;
}> = ({ item, isRecent }) => {
  const dispatch = useAppDispatch();
  return (
    <CardProvider
      onClose={isRecent ? () => dispatch(searchActions.removeRecentSearch(item)) : undefined}
      onOpen={() => !isRecent && dispatch(searchActions.addRecentSearch(item))}
    >
      {(() => {
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
      })()}
    </CardProvider>
  );
};

const renderItem = (item: SearchResultItem) => <ResultItem item={item} />;
const renderRecentItem = (item: SearchResultItem) => <ResultItem isRecent item={item} />;
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
        (acc, cur) => [...acc, ...(cur.results[type]?.items || [])],
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

const EmptySearch: React.FC = () => {
  const categories = useBrowseCategories();
  const { t } = useTranslation();
  const recentSearches = useAppSelector(s => s.search.recentSearches);

  return (
    <>
      {!!recentSearches.length && (
        <Section
          data={recentSearches}
          keyExtractor={keyExtractor}
          maxRows={1}
          renderItem={renderRecentItem}
          title={t('recentSearchesTitle')}
        />
      )}
      <Section
        data={categories.data?.categories.items}
        keyExtractor={keyExtractor}
        renderItem={renderCategory}
        title={t('browseAllTitle')}
      />
    </>
  );
};

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
          onChange={query => navigate(routes.search({ query }), { replace: true })}
        />
      }
    >
      {params.query ? (
        <>
          <Filters filters={filters} />
          {shouldShowSection('tracks', selectedFilter) && (
            <>
              {selectedFilter.type !== 'tracks' && (
                <Typography paddingTop={1} paddingX={3} variant="h5">
                  {t('tracksTitle')}
                </Typography>
              )}
              <Box flexDirection="column" paddingX={1} paddingY={2}>
                <TracksList {...search} infiniteScroll={selectedFilter.type === 'tracks'} />
              </Box>
            </>
          )}
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
        <EmptySearch />
      )}
    </Page>
  );
});
