import { PropsWithChildren } from 'react';
import Box from '@mui/material/Box';

import { Header } from './Header';

export const Page: React.FC<PropsWithChildren & { toolbarComponent?: React.ReactNode }> = ({
  children,
  toolbarComponent,
}) => {
  return (
    <Box flex={1} flexDirection="column">
      <Header>{toolbarComponent}</Header>
      {children}
    </Box>
  );
};
