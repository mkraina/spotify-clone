import React from 'react';
import { Box, Link, Typography } from '@mui/material';
import { useAppSelector } from '@spotify-clone/shared/redux';
import { useTheme } from 'styled-components';

import { routes } from '../../../navigation';
import { AspectRatio } from '../../../ui';

export const CurrentTrack: React.FC = () => {
  const currentTrack = useAppSelector(s => s.tracks.player?.track_window.current_track);

  const avatarSize = useTheme().spacing(6);

  if (!currentTrack) return null;
  return (
    <>
      <AspectRatio height={avatarSize} margin={1.5} width={avatarSize}>
        <img src={currentTrack.album.images[0]?.url} />
      </AspectRatio>
      <Box flex={1} flexDirection="column" justifyContent="center">
        <Typography variant="h6">
          <Link href={routes.album({ id: currentTrack.album.id })} underline="hover">
            {currentTrack.name}
          </Link>
        </Typography>
        <Typography variant="caption">
          {currentTrack.artists.map((a, i) => (
            <React.Fragment key={a.id}>
              <Link key={a.id} href={routes.artist(a)} underline="hover">
                {a.name}
              </Link>
              {i < currentTrack.artists.length - 1 ? ', ' : ''}
            </React.Fragment>
          ))}
        </Typography>
      </Box>
    </>
  );
};
