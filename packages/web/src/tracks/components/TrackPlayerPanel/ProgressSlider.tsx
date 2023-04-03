import { Box, Typography } from '@mui/material';
import { useAppSelector } from '@spotify-clone/shared/redux';
import format from 'date-fns/format';
import styled from 'styled-components';

import { Slider } from '../../../ui';
import { trackPlayer } from '../../utils';

const StyledSlider = styled(Slider)(({ theme }) => ({ marginInline: theme.spacing() }));

export const ProgressSlider: React.FC = () => {
  const progress = useAppSelector(s => s.tracks.player?.position || 0);
  const trackDuration = useAppSelector(s => s.tracks.player?.duration || 0);
  return (
    <Box alignItems="center" flexDirection="row" width="100%">
      {!!trackDuration && <Typography variant="caption">{format(progress, 'mm:ss')}</Typography>}
      <StyledSlider
        disabled={!trackDuration}
        max={trackDuration}
        value={progress}
        onValueChange={value => trackPlayer.seekTo(value)}
      />
      {!!trackDuration && (
        <Typography variant="caption">{format(trackDuration, 'mm:ss')}</Typography>
      )}
    </Box>
  );
};
