import { PropsWithChildren } from 'react';
import Box from '@mui/material/Box';

import { useScrollEndReached } from '../../ui';

import { Header } from './Header';

export const Page: React.FC<
  PropsWithChildren & {
    fetchNextPage?: () => void;
    hasNextPage?: boolean;
    isFetchingNextPage?: boolean;
    toolbarComponent?: React.ReactNode;
  }
> = ({ children, toolbarComponent, hasNextPage, isFetchingNextPage, fetchNextPage }) => {
  useScrollEndReached(() => hasNextPage && !isFetchingNextPage && fetchNextPage?.());

  return (
    <Box flex={1} flexDirection="column">
      <Header>{toolbarComponent}</Header>
      {children}
    </Box>
  );
};
