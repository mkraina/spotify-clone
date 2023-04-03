import { Paths, Routes } from './types';

export const routes: Routes = {
  account: '/account',
  artist: ({ id }) => `/artist/${id}`,
  home: '/',
  search: ({ query }) => `/search/${query?.replace(/\s/g, '%20') ?? ''}`,
  track: ({ id }) => `/track/${id}`,
  collection: ({ type }) => `/collection/${type ?? ''}`,
  album: ({ id }) => `/album/${id}`,
  playlist: ({ id }) => `/playlist/${id}`,
  show: ({ id }) => `/show/${id}`,
  episode: ({ id }) => `/episode/${id}`,
  category: ({ id }) => `/category/${id}`,
};

export const paths: Paths = {
  category: '/category/:id',
  account: '/account',
  artist: '/artist/:id',
  home: '/',
  search: '/search/:query?',
  track: '/track/:id',
  collection: '/collection/:type?',
  album: '/album/:id',
  episode: '/episode/:id',
  show: '/show/:id',
  playlist: '/playlist/:id',
};
