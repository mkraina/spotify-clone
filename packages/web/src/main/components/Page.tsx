import { PropsWithChildren } from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';

import { Header } from './Header';

const colors = ['red', 'blue'];

const X = styled.div<{ index: number }>(({ index }) => ({
  backgroundColor: colors[index % 2],
  height: 64,
  overscrollBehavior: 'none',
}));

export const Page: React.FC<PropsWithChildren & { toolbarComponent?: React.ReactNode }> = ({
  children,
  toolbarComponent,
}) => {
  return (
    <Box flex={1} flexDirection="column">
      <Header>{toolbarComponent}</Header>
      {children}
      {new Array(200).fill(1).map((_, i) => (
        <X key={i} index={i}>
          {i + 1}
        </X>
      ))}
    </Box>
  );
};
