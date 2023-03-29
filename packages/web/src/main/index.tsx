import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { withSharedProvider } from '@spotify-clone/shared';

import { authService } from '../auth';
import { getLocale } from '../i18n/utils';

import { MainDrawer } from './components/MainDrawer';
import AuthPage from './containers/AuthPage';
import { Router } from './containers/Router';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <MainDrawer />
      <Router />
    </BrowserRouter>
  );
};

export default withSharedProvider(App, {
  getLocale,
  LoginPromptComponent: AuthPage,
  authService,
});
