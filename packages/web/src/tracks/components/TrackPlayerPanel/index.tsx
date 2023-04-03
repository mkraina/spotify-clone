import React from 'react';
import { BottomNavigation, Box, Paper } from '@mui/material';
import styled from 'styled-components';

import { useTrackPlayerPositionUpdate } from '../../hooks';

import { ControlButtons } from './ControlButtons';
import { CurrentTrack } from './CurrentTrack';
import { ProgressSlider } from './ProgressSlider';
import { VolumeAndDevices } from './VolumeAndDevices';

const Container = styled(BottomNavigation)({ position: 'fixed', zIndex: 1000 });
const Content = styled(Paper)(({ theme }) => ({
  flex: 1,
  borderRadius: 0,
  backgroundColor: theme.palette.background.default,
}));

export const TrackPlayerPanel: React.FC = () => {
  useTrackPlayerPositionUpdate();
  return (
    <Container>
      <Content variant="outlined">
        <Box alignItems="center" flex={1} flexDirection="row">
          <CurrentTrack />
        </Box>
        <Box alignItems="center" flex={1} flexDirection="column" justifyContent="center">
          <ControlButtons />
          <ProgressSlider />
        </Box>
        <Box flex={1}>
          <VolumeAndDevices />
        </Box>
      </Content>
    </Container>
  );
};
