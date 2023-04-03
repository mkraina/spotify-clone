import { PropsWithChildren } from 'react';
import Box from '@mui/material/Box';

import { trackPlayer } from '../../utils';

export const PanelIcon: React.FC<PropsWithChildren> = props => (
  <Box padding={0.5} onClick={() => trackPlayer.connect()} {...props} />
);
