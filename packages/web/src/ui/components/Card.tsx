import React, { PropsWithChildren, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import useHover from 'react-use-hover';
import { PauseRounded } from '@mui/icons-material';
import Close from '@mui/icons-material/Close';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import { Avatar, Box, Card as MaterialCard, Fab, Link, Skeleton, Typography } from '@mui/material';
import { Color } from '@spotify-clone/shared/ui';
import styled from 'styled-components';

import { stopEventPropagation } from '../../navigation';
import { usePlayback } from '../../tracks';
import { TrackPlayerPlayContext } from '../../tracks/utils';

import { AspectRatio } from './AspectRatio';

const StyledAvatar = styled(Avatar)<{ $rounded: boolean }>(({ theme, $rounded }) => ({
  boxShadow: theme.shadows[8],
  borderRadius: $rounded ? undefined : theme.shape.borderRadius,
  width: '100%',
  height: '100%',
}));

const StyledPaper = styled(MaterialCard)({ flex: 1, cursor: 'pointer' }) as typeof MaterialCard;

const Label = styled(Typography)<{ $numOfLines?: number }>(({ $numOfLines, theme }) => ({
  display: '-webkit-box',
  overflow: 'hidden',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: $numOfLines,
  margin: theme.spacing(),
}));

const PlayButtonContainer = styled.div<{ visible: boolean }>(({ theme, visible }) => ({
  position: 'absolute',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
  justifyContent: 'flex-end',
  alignItems: 'flex-end',
  pointerEvents: visible ? 'auto' : 'none',
  opacity: visible ? 1 : 0,
  transform: visible ? 'translateY(0px)' : 'translateY(20px)',
  transition: 'opacity 0.5s, transform 0.5s;',
}));

const CloseIcon = styled(Close)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  right: 0,
  backgroundColor: Color.alpha(theme.palette.background.default, 0.4),
  padding: theme.spacing(0.5),
  width: theme.spacing(3.5),
  height: theme.spacing(3.5),
  margin: theme.spacing(),
  borderRadius: 360,
  transition: 'transform 0.5s;',
  ':hover': { transform: 'scale(1.1)' },
}));

type Props = {
  href: string;
  image: string | undefined;
  title: string;
  isPlaceholder?: false;
  subTitle?: React.ReactNode;
  trackContext?: TrackPlayerPlayContext;
};

type PlaceholderProps = Partial<Omit<Props, 'isPlaceholder'>> & {
  isPlaceholder: true;
};

type ContextProps = { onClose?: () => void; onOpen?: () => void };

const Context = React.createContext<ContextProps | undefined>(undefined);

export const CardProvider: React.FC<PropsWithChildren<ContextProps>> = ({ children, ...value }) => (
  <Context.Provider value={value}>{children}</Context.Provider>
);

const PlayButton: React.FC<{ trackContext: TrackPlayerPlayContext; visible: boolean }> = ({
  trackContext,
  visible,
}) => {
  const [isPlaying, togglePlayback] = usePlayback(trackContext);
  return (
    <PlayButtonContainer visible={visible || isPlaying}>
      <Fab
        onClick={e => {
          stopEventPropagation(e);
          togglePlayback();
        }}
      >
        {isPlaying ? <PauseRounded fontSize="large" /> : <PlayArrowRounded fontSize="large" />}
      </Fab>
    </PlayButtonContainer>
  );
};

export const Card: React.FC<
  (Props | PlaceholderProps) & {
    roundAvatar?: boolean;
  }
  // eslint-disable-next-line max-lines-per-function
> = props => {
  const { onClose, onOpen } = useContext(Context) || {};
  const [isHovering, hoverProps] = useHover();
  const navigate = useNavigate();
  const openDetail = () => {
    if (props.isPlaceholder) return;
    onOpen?.();
    navigate(props.href);
  };
  return (
    <StyledPaper
      {...hoverProps}
      elevation={6}
      onClick={props.isPlaceholder ? undefined : openDetail}
    >
      <Box flex={1} flexDirection="column" padding={1} position="relative">
        <AspectRatio padding={1} width="100%">
          {props.isPlaceholder ? (
            <Skeleton
              height="100%"
              variant={props.roundAvatar ? 'circular' : 'rounded'}
              width="100%"
            />
          ) : (
            <StyledAvatar $rounded={!!props.roundAvatar} src={props.image} />
          )}
          {props.trackContext && (
            <PlayButton trackContext={props.trackContext} visible={isHovering} />
          )}
        </AspectRatio>
        <>
          <Label $numOfLines={1} variant="h6">
            {props.isPlaceholder ? (
              <Skeleton variant="text" />
            ) : (
              <Link href={props.href} underline="none">
                {props.title}
              </Link>
            )}
          </Label>
          <Label $numOfLines={2}>{props.subTitle}</Label>
        </>
        {onClose && (
          <CloseIcon
            onClick={e => {
              stopEventPropagation(e);
              onClose();
            }}
          />
        )}
      </Box>
    </StyledPaper>
  );
};
