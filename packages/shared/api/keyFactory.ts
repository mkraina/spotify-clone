import { SearchType, TopItemsTimeRange, TopItemsType } from 'spotify-types';

const createQueryKeys = <T extends Record<string, unknown>>(
  root: string,
  keys: (all: [string]) => T
) => {
  return { all: [root], ...keys([root]) };
};

export const userQueryKey = createQueryKeys('user', all => ({
  userProfile: [...all, 'me'] as const,
  userTopItems: (type: TopItemsType, range: TopItemsTimeRange | undefined) =>
    [...all, 'top', { type, range }] as const,
  userPlaylists: [...all, 'playlists'] as const,
  followedArtists: [...all, 'followedArtists'] as const,
  savedTracks: [...all, 'savedTracks'] as const,
  savedAlbums: [...all, 'savedAlbums'] as const,
  recentlyPlayedTracks: (afterInDays?: number) =>
    [...all, 'recentlyPlayedTracks', { afterInDays }] as const,
}));

export const browseQueryKey = createQueryKeys('browse', all => ({
  categories: [...all, 'categories'] as const,
  recommendations: [...all, 'recommendatios'] as const,
  newAlbums: [...all, 'newAlbums'] as const,
}));

export const albumsQueryKey = createQueryKeys('albums', all => ({
  album: (id: string) => [...all, 'album', { id }] as const,
  albumTracks: (id: string) => [...all, 'recommendatios', { id }] as const,
}));

export const playlistsQueryKey = createQueryKeys('playlists', all => ({
  playlist: (id: string) => [...all, 'playlist', { id }] as const,
  playlistItems: (id: string) => [...all, 'playlistItems', { id }] as const,
  categoryPlaylists: (id: string) => [...all, 'categoryPlaylist', { id }] as const,
  featured: [...all, 'featured'] as const,
  user: (props: { id: string }) => [...all, 'user', props] as const,
}));

export const artistsQueryKey = createQueryKeys('artists', all => ({
  artist: (id: string) => [...all, 'artist', { id }] as const,
  artistsAlbums: (id: string) => [...all, 'artistsAlbums', { id }] as const,
  artistsTopTracks: (id: string) => [...all, 'artistsTopTracks', { id }] as const,
  artistsRelatedArtists: (id: string) => [...all, 'artistsRelatedArtists', { id }] as const,
}));

export const searchQueryKey = createQueryKeys('search', all => ({
  search: ({ q, type }: { q: string | undefined; type?: SearchType[] }) =>
    [...all, 'search', { q: q?.trim(), type }] as const,
}));
