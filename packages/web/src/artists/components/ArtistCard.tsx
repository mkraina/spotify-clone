import useHover from 'react-use-hover';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import { Avatar, Box, Card, Fab } from '@mui/material';
import { Artist } from 'spotify-types';
import styled from 'styled-components';

import { routes } from '../../navigation';
import { AspectRatio } from '../../ui';

const StyledAvatar = styled(Avatar)(({ theme }) => ({ boxShadow: theme.shadows[8] }));
const StyledPaper = styled(Card)({ flex: 1 }) as typeof Card;

const PlayButtonContainer = styled.div<{ visible: boolean }>(({ theme, visible }) => ({
  position: 'absolute',
  justifyContent: 'flex-end',
  alignItems: 'flex-end',
  padding: theme.spacing(0.5),
  pointerEvents: visible ? 'auto' : 'none',
  opacity: visible ? 1 : 0,
  transform: visible ? 'translateY(0px)' : 'translateY(20px)',
  transition: 'opacity 0.5s, transform 0.5s;',
}));

export const ArtistCard: React.FC<{ artist: Artist }> = ({ artist }) => {
  const [isHovering, hoverProps] = useHover();

  return (
    <StyledPaper {...hoverProps} component="a" elevation={6} href={routes.artist(artist)}>
      <Box flex={1} flexDirection="column" padding={2}>
        <AspectRatio>
          <StyledAvatar src={artist.images[0]?.url} />
          <PlayButtonContainer visible={isHovering}>
            <Fab href={routes.track({ id: artist.id })}>
              <PlayArrowRounded fontSize="large" />
            </Fab>
          </PlayButtonContainer>
        </AspectRatio>
        <h4>{artist.name}</h4>
      </Box>
    </StyledPaper>
  );
};
