import React, { useLayoutEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Box } from '@mui/system';
import { withSharedProvider } from '@spotify-clone/shared';

import { authService } from '../auth';
import { getLocale } from '../i18n/utils';
import { trackPlayer } from '../tracks/utils';

import { MainDrawer } from './components/MainDrawer';
import AuthPage from './containers/AuthPage';
import { Router } from './containers/Router';

const App: React.FC = () => {
  useLayoutEffect(() => trackPlayer.init(), []);
  return (
    <BrowserRouter>
      <Box flexDirection="column" flexGrow={1} height="100vh">
        <Box flex={1} flexDirection="row">
          <MainDrawer />
          <Router />
        </Box>
      </Box>
    </BrowserRouter>
  );
};

export default withSharedProvider(App, {
  getLocale,
  LoginPromptComponent: AuthPage,
  authService,
});
