import React from 'react';
import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom';
import { withSharedProvider } from '@spotify-clone/shared';

import { authService } from '../auth';
import { getLocale } from '../i18n/utils';
import { paths, routes } from '../navigation';

import AccountPage from './containers/AccountPage';
import ArtistPage from './containers/ArtistPage';
import AuthPage from './containers/AuthPage';
import HomePage from './containers/HomePage';
import SearchPage from './containers/SearchPage';
import TrackPage from './containers/TrackPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            {Object.entries(routes).map(([key, value]) => {
              return (
                <li key={key}>
                  <Link to={typeof value === 'string' ? value : value({ id: `${key}-id` })}>
                    {key}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <Routes>
          <Route Component={HomePage} index />
          <Route Component={AccountPage} path={paths.account} />
          <Route Component={ArtistPage} path={paths.artist} />
          <Route Component={SearchPage} path={paths.search} />
          <Route Component={TrackPage} path={paths.track} />
          <Route Component={AuthPage} path="oauth" />
          <Route element={<Navigate replace to={routes.home} />} path="*" />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default withSharedProvider(App, {
  getLocale,
  LoginPromptComponent: AuthPage,
  authService,
});
