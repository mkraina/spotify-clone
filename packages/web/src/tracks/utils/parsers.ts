import { PlayerTrack } from '@spotify-clone/shared/redux/utils/tracksReducer';
import { SpotifyWebPlaybackTrack } from 'spotify-web-playback';

const getIdFromUri = (uri: string) => uri.split(':').slice(-1)[0] ?? '';

export const parsePlayerTrack = ({
  id,
  uri,
  name,
  album,
  artists,
}: SpotifyWebPlaybackTrack): PlayerTrack => {
  return {
    id,
    uri,
    name,
    album: { ...album, id: getIdFromUri(album.uri) },
    artists: artists.map(a => {
      return { name: a.name, id: getIdFromUri(a.uri) };
    }),
  };
};
