import React from 'react';
import { Grid, GridProps, useMediaQuery } from '@mui/material';

import { useScrollEndReached } from '../hooks';

export type GridLayoutProps<T> = {
  data: T[] | undefined;
  keyExtractor: (item: T, index: number) => string | number;
  renderItem: (item: T, index: number) => React.ReactNode;
  fetchNextPage?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  isLoading?: boolean;
  maxColumns?: number;
  maxRows?: number;
  renderLoadingItem?: () => React.ReactNode;
} & Omit<GridProps, 'container' | 'item' | 'columns' | 'xs'>;

const Layout = <T,>({
  maxColumns = 7,
  maxRows,
  data,
  renderItem,
  keyExtractor,
  hasNextPage,
  fetchNextPage,
  isLoading,
  renderLoadingItem,
  isFetchingNextPage,
  ...gridProps
}: GridLayoutProps<T>): React.ReactElement | null => {
  const xs = useMediaQuery(theme => theme.breakpoints.down('xs'));
  const sm = useMediaQuery(theme => theme.breakpoints.down('sm'));
  const md = useMediaQuery(theme => theme.breakpoints.down('md'));
  const lg = useMediaQuery(theme => theme.breakpoints.down('lg'));
  const xl = useMediaQuery(theme => theme.breakpoints.down('xl'));
  const columns = Math.min(maxColumns, xs ? 1 : sm ? 2 : md ? 3 : lg ? 4 : xl ? 5 : 7);
  useScrollEndReached(() => hasNextPage && !isFetchingNextPage && fetchNextPage?.());

  return (
    <Grid columns={columns} container {...gridProps}>
      {data?.slice(0, maxRows ? maxRows * columns : data.length).map((item, index) => (
        <Grid key={keyExtractor(item, index)} item xs={1}>
          {renderItem(item, index)}
        </Grid>
      ))}
      {(isLoading || isFetchingNextPage) &&
        renderLoadingItem &&
        new Array(columns - ((data?.length || 0) % columns)).fill(1).map((_, i) => (
          <Grid key={i} item xs={1}>
            {renderLoadingItem()}
          </Grid>
        ))}
    </Grid>
  );
};

export const GridLayout = React.memo(Layout) as typeof Layout;
