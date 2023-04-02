import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useHover from 'react-use-hover';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import { Avatar, Box, Card as MaterialCard, Fab, Link, Typography } from '@mui/material';
import styled from 'styled-components';

import { routes } from '../../navigation';

import { AspectRatio } from './AspectRatio';

const StyledAvatar = styled(Avatar)<{ rounded: boolean }>(({ theme, rounded }) => ({
  boxShadow: theme.shadows[8],
  borderRadius: rounded ? undefined : theme.shape.borderRadius,
}));

const StyledPaper = styled(MaterialCard)({ flex: 1, cursor: 'pointer' }) as typeof MaterialCard;

const Label = styled(Typography)<{ numOfLines?: number }>(({ numOfLines, theme }) => ({
  display: '-webkit-box',
  overflow: 'hidden',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: numOfLines,
  margin: theme.spacing(),
}));

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

export const Card: React.FC<{
  href: string;
  image: string | undefined;
  title: string;
  roundAvatar?: boolean;
  subTitle?: React.ReactNode;
  trackId?: string;
}> = props => {
  const [isHovering, hoverProps] = useHover();
  const navigate = useNavigate();
  return (
    <StyledPaper
      {...hoverProps}
      elevation={6}
      onClick={useCallback(() => navigate(props.href), [navigate, props.href])}
    >
      <Box flex={1} flexDirection="column" padding={1}>
        <AspectRatio margin={1}>
          <StyledAvatar rounded={!!props.roundAvatar} src={props.image} />
          {!!props.trackId && (
            <PlayButtonContainer visible={isHovering}>
              <Fab href={routes.track({ id: props.trackId })}>
                <PlayArrowRounded fontSize="large" />
              </Fab>
            </PlayButtonContainer>
          )}
        </AspectRatio>
        <Label numOfLines={1} variant="h6">
          <Link href={props.href} underline="none">
            {props.title}
          </Link>
        </Label>
        <Label numOfLines={2}>{props.subTitle}</Label>
      </Box>
    </StyledPaper>
  );
};
