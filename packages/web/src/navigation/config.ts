import { Paths, Routes } from './types';

export const routes: Routes = {
  account: '/account',
  artist: ({ id }) => `/artist/${id}`,
  home: '/',
  search: ({ query }) => `/search/${query ?? ''}`,
  track: ({ id }) => `/track/${id}`,
};

export const paths: Paths = {
  account: '/account',
  artist: '/artist/:id',
  home: '/',
  search: '/search/:query?',
  track: '/track/:id',
};
