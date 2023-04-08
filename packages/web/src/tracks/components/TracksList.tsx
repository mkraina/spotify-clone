import { UseInfiniteQueryResult } from 'react-query';
import { PlayArrowRounded } from '@mui/icons-material';
import { Box, Link, List, ListItemButton, Skeleton, Typography } from '@mui/material';
import { SearchResultData } from '@spotify-clone/shared/api';
import { Color, PropsWithPlaceholder } from '@spotify-clone/shared/ui';
import format from 'date-fns/format';
import { Track } from 'spotify-types';
import styled, { useTheme } from 'styled-components';

import { routes, stopEventPropagation } from '../../navigation';
import { AspectRatio } from '../../ui';

const PlayButtonOverlayContainer = styled(PlayArrowRounded)(({ theme }) => ({
  width: '100%',
  height: '100%',
  position: 'absolute',
  padding: theme.spacing(),
  backgroundColor: Color.alpha(theme.palette.common.black, 0.7),
  color: theme.palette.common.white,
  opacity: 0,
  transition: 'opacity 0.5s',
  ':hover': { opacity: 1 },
}));

const Item: React.FC<PropsWithPlaceholder<Track>> = props => {
  return (
    <ListItemButton disableRipple>
      <Box alignItems="center" flexDirection="row" width="100%">
        <AspectRatio width={useTheme().spacing(6)}>
          {props.isPlaceholder ? (
            <Skeleton height="100%" variant="rectangular" width="100%" />
          ) : (
            <>
              <img src={props.album.images[0]?.url ?? props.artists[0]?.images[0]?.url} />
              <PlayButtonOverlayContainer />
            </>
          )}
        </AspectRatio>
        <Box flexDirection="column" flexGrow={1} paddingX={2}>
          {props.isPlaceholder ? <Skeleton /> : <Typography variant="h6">{props.name}</Typography>}
          {props.isPlaceholder ? (
            <Skeleton />
          ) : (
            <Typography>
              {props.artists.map((a, i) => (
                <Link
                  key={a.id}
                  href={routes.artist(a)}
                  underline="hover"
                  onClick={stopEventPropagation}
                >
                  {a.name}
                </Link>
              ))}
            </Typography>
          )}
        </Box>
        {!props.isPlaceholder && (
          <Typography marginLeft="auto">{format(props.duration_ms, 'mm:ss')}</Typography>
        )}
      </Box>
    </ListItemButton>
  );
};

const numToDisplay = 4;
export const TracksList: React.FC<
  UseInfiniteQueryResult<SearchResultData> & { infiniteScroll?: boolean }
> = ({ data, isLoading, isFetchingNextPage, infiniteScroll, fetchNextPage }) => {
  const placeholdersCount = isLoading ? numToDisplay : isFetchingNextPage ? 1 : 0;
  const pages = infiniteScroll ? data?.pages : [data?.pages[0]];
  return (
    <List disablePadding>
      {pages?.map(page => {
        const itemsToDisplay = infiniteScroll
          ? (page?.results.tracks?.items.length || 1) - 1
          : numToDisplay;
        return page?.results.tracks?.items
          .slice(0, itemsToDisplay)
          .map(i => (i.type === 'track' ? <Item key={i.id} {...i} /> : null));
      })}
      {new Array(placeholdersCount).fill(1).map((_, i) => (
        <Item key={i} isPlaceholder />
      ))}
    </List>
  );
};
