import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Box, Chip, styled, Typography, useMediaQuery } from '@mui/material';
import { useSearch } from '@spotify-clone/shared/api';
import { TranslationKey } from '@spotify-clone/shared/i18n';
import { useSearchFilters } from '@spotify-clone/shared/search';
import { SearchContent } from 'spotify-types';

import { AlbumCard } from '../../albums';
import { ArtistCard } from '../../artists';
import { routes, withParams } from '../../navigation';
import { ShowCard } from '../../shows';
import { EpisodeCard } from '../../shows/components/EpisodeCard';
import { SearchBar } from '../../ui';
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
  item: NonNullable<SearchContent[keyof SearchContent]>['items'][0];
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

const Section: React.FC<{ data: SearchContent; type: keyof SearchContent }> = ({ type, data }) => {
  const { t } = useTranslation();
  const xs = useMediaQuery(theme => theme.breakpoints.down('xs'));
  const sm = useMediaQuery(theme => theme.breakpoints.down('sm'));
  const md = useMediaQuery(theme => theme.breakpoints.down('md'));
  const lg = useMediaQuery(theme => theme.breakpoints.down('lg'));
  const xl = useMediaQuery(theme => theme.breakpoints.down('xl'));

  if (!data[type]?.items.length) {
    return null;
  }

  return (
    <Box flexDirection="column" padding={3}>
      <Typography variant="h5">{t(sectionTitleKeys[type])}</Typography>
      <Box margin={-1.5} marginTop={0}>
        {data[type]?.items.slice(0, xs ? 1 : sm ? 2 : md ? 3 : lg ? 4 : xl ? 5 : 7).map(i => (
          <Box key={i.id} flex={1} padding={1.5}>
            <ResultItem item={i} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

const Results: React.FC<{ data: SearchContent }> = ({ data }) => {
  return (
    <>
      <Section data={data} type="artists" />
      <Section data={data} type="albums" />
      <Section data={data} type="shows" />
      <Section data={data} type="episodes" />
    </>
  );
};

export default withParams<'search'>(({ params }) => {
  const { filters, selectedFilter } = useSearchFilters();
  const search = useSearch({ q: params.query, type: selectedFilter });
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
      <Box flexDirection="row" padding={2} paddingTop={1}>
        {filters.map(f => (
          <StyledChip key={f.label} label={f.label} selected={f.selected} onClick={f.onSelect} />
        ))}
      </Box>
      {search.data && <Results data={search.data} />}
    </Page>
  );
});
