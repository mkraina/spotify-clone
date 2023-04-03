import React, { useLayoutEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { BottomNavigation } from '@mui/material';
import { Box } from '@mui/system';
import { withSharedProvider } from '@spotify-clone/shared';
import { useAppSelector } from '@spotify-clone/shared/redux';

import { authService } from '../auth';
import { getLocale } from '../i18n/utils';
import { TrackPlayerPanel } from '../tracks';
import { trackPlayer } from '../tracks/utils';

import { MainDrawer } from './components/MainDrawer';
import AuthPage from './containers/AuthPage';
import { Router } from './containers/Router';

const App: React.FC = () => {
  useLayoutEffect(() => trackPlayer.init(), []);
  const accessToken = useAppSelector(s => s.auth.authorization?.accessToken);
  useLayoutEffect(() => {
    accessToken && trackPlayer.setToken(accessToken);
  }, [accessToken]);
  return (
    <BrowserRouter>
      <Box flexDirection="column" flexGrow={1} height="100vh">
        <Box flex={1} flexDirection="row">
          <MainDrawer />
          <Box flex={1} flexDirection="column">
            <Router />
            <BottomNavigation />
          </Box>
        </Box>
        <TrackPlayerPanel />
      </Box>
    </BrowserRouter>
  );
};

export default withSharedProvider(App, {
  getLocale,
  LoginPromptComponent: AuthPage,
  authService,
});
