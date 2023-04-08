import { Link } from '@mui/material';
import { SimplifiedAlbum } from 'spotify-types';

import { routes, stopEventPropagation } from '../../navigation';
import { Card } from '../../ui';

export const AlbumCard: React.FC<{ album: SimplifiedAlbum }> = ({ album }) => {
  return (
    <Card
      href={routes.album(album)}
      image={album.images[0]?.url}
      roundAvatar={false}
      subTitle={
        <>
          {new Date(album.release_date).getFullYear()}
          {` · `}
          {album.artists.map((a, i) => (
            <Link
              key={a.id}
              href={routes.artist(a)}
              underline="hover"
              onClick={stopEventPropagation}
            >
              {a.name}
            </Link>
          ))}
        </>
      }
      title={album.name}
    />
  );
};
