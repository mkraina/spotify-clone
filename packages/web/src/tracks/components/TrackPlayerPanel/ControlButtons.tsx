import {
  PauseCircleFilledRounded,
  PlayCircleFilledRounded,
  RepeatOneRounded,
  RepeatRounded,
  ShuffleRounded,
  SkipNextRounded,
  SkipPreviousRounded,
} from '@mui/icons-material';
import { Box } from '@mui/material';
import { useAppSelector } from '@spotify-clone/shared/redux';
import { setRepeatMode, togglePlaybackShuffle } from '@spotify-clone/shared/trackplayer';

import { trackPlayer } from '../../utils';

import { PanelIcon } from './PanelIcon';

const PlayButton: React.FC = () => {
  const currentTrack = useAppSelector(s => s.tracks.player?.track_window.current_track);
  const isPaused = useAppSelector(s => s.tracks.player?.paused);
  return (
    <PanelIcon>
      {currentTrack ? (
        isPaused ? (
          <PlayCircleFilledRounded
            fontSize="large"
            onClick={() => trackPlayer.play(currentTrack.uri, true)}
          />
        ) : (
          <PauseCircleFilledRounded fontSize="large" onClick={trackPlayer.pause} />
        )
      ) : (
        <PauseCircleFilledRounded color="disabled" fontSize="large" />
      )}
    </PanelIcon>
  );
};

export const ControlButtons: React.FC = () => {
  const currentTrack = useAppSelector(s => s.tracks.player?.track_window.current_track);
  const hasPreviousTrack = useAppSelector(
    s => !!s.tracks.player?.track_window.previous_tracks.length
  );
  const hasNextTrack = useAppSelector(s => !!s.tracks.player?.track_window.next_tracks.length);
  const shuffle = useAppSelector(s => s.tracks.player?.shuffle);
  const repeatMode = useAppSelector(s => s.tracks.player?.repeat_mode);
  const toggleRepetMode = () => setRepeatMode(repeatMode ?? 'off');
  return (
    <Box alignItems="center" flexDirection="row" justifyContent="space-around">
      <PanelIcon>
        <ShuffleRounded
          color={shuffle ? 'primary' : currentTrack ? undefined : 'disabled'}
          onClick={currentTrack ? () => togglePlaybackShuffle(!shuffle) : undefined}
        />
      </PanelIcon>
      <PanelIcon>
        <SkipPreviousRounded
          color={hasPreviousTrack ? undefined : 'disabled'}
          onClick={hasPreviousTrack ? trackPlayer.previous : undefined}
        />
      </PanelIcon>
      <PlayButton />
      <PanelIcon>
        <SkipNextRounded
          color={hasNextTrack ? undefined : 'disabled'}
          onClick={hasNextTrack ? trackPlayer.next : undefined}
        />
      </PanelIcon>
      <PanelIcon>
        {repeatMode === 'track' ? (
          <RepeatOneRounded color="primary" onClick={toggleRepetMode} />
        ) : (
          <RepeatRounded
            color={repeatMode === 'context' ? 'primary' : currentTrack ? undefined : 'disabled'}
            onClick={currentTrack ? toggleRepetMode : undefined}
          />
        )}
      </PanelIcon>
    </Box>
  );
};
