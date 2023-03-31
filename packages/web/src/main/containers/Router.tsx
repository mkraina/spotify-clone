import { Navigate, Route, Routes } from 'react-router-dom';

import { paths, routes } from '../../navigation';

import AccountPage from './AccountPage';
import ArtistPage from './ArtistPage';
import CollecionsPage from './CollecionsPage';
import HomePage from './HomePage';
import SearchPage from './SearchPage';
import TrackPage from './TrackPage';

export const Router: React.FC = () => (
  <Routes>
    <Route Component={HomePage} index />
    <Route Component={AccountPage} path={paths.account} />
    <Route Component={ArtistPage} path={paths.artist} />
    <Route Component={SearchPage} path={paths.search} />
    <Route Component={TrackPage} path={paths.track} />
    <Route Component={CollecionsPage} path={paths.collection} />
    <Route element={<Navigate replace to={routes.home} />} path="*" />
  </Routes>
);
