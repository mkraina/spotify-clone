import { MouseEventHandler } from 'react';
import { Link } from '@mui/material';
import { SimplifiedAlbum } from 'spotify-types';

import { routes } from '../../navigation';
import { Card } from '../../ui';

const stopPropagation: MouseEventHandler<HTMLAnchorElement> &
  MouseEventHandler<HTMLSpanElement> = e => e.stopPropagation();

export const AlbumCard: React.FC<{ album: SimplifiedAlbum }> = ({ album }) => {
  return (
    <Card
      href={routes.album(album)}
      image={album.images[0]?.url}
      roundAvatar={false}
      subTitle={
        <>
          {/*eslint-disable-next-line react/jsx-no-literals*/}
          {new Date(album.release_date).getFullYear()}
          {` · `}
          {album.artists.map((a, i) => (
            <Link key={a.id} href={routes.artist(a)} underline="hover" onClick={stopPropagation}>
              {a.name}
            </Link>
          ))}
        </>
      }
      title={album.name}
    />
  );
};
