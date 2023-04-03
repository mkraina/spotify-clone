import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useHover from 'react-use-hover';
import {
  ComputerRounded,
  Devices,
  PhoneRounded,
  QueueMusicRounded,
  SpeakerRounded,
  VolumeMuteRounded,
  VolumeUpRounded,
} from '@mui/icons-material';
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  styled,
} from '@mui/material';
import { useAvailableDevices } from '@spotify-clone/shared/api';
import { setPlaybackVolume, transferPlayback } from '@spotify-clone/shared/trackplayer';
import { Device } from 'spotify-types';

import { routes, usePathName } from '../../../navigation';
import { Slider } from '../../../ui';

import { PanelIcon } from './PanelIcon';

const DeviceLabel = styled(ListItemText)<{ $isActive: boolean }>(({ theme, $isActive }) => ({
  color: $isActive ? theme.palette.primary.main : undefined,
  fontWeight: 'bold',
}));

const DeviceItem: React.FC<Device> = props => (
  <ListItemButton
    disableRipple={props.is_active}
    onClick={() => props.id && transferPlayback(props.id)}
  >
    <ListItemIcon>
      {props.type.toLowerCase() === 'computer' ? (
        <ComputerRounded />
      ) : props.type.toLowerCase() === 'smartphone' ? (
        <PhoneRounded />
      ) : (
        <SpeakerRounded />
      )}
    </ListItemIcon>
    <DeviceLabel $isActive={props.is_active} disableTypography>
      {props.name}
    </DeviceLabel>
  </ListItemButton>
);

const DevicesList: React.FC = () => {
  const devices = useAvailableDevices();
  const [anchorEl, setAnchorEl] = useState<SVGSVGElement | null>(null);

  return (
    <>
      <PanelIcon>
        <Devices onClick={event => setAnchorEl(event.currentTarget)} />
      </PanelIcon>
      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={!!anchorEl}
        transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        onClose={() => setAnchorEl(null)}
      >
        <List disablePadding>
          {devices.data?.map(d => (
            <DeviceItem key={d.id} {...d} />
          ))}
        </List>
      </Popover>
    </>
  );
};

const VolumeSlider = styled(Slider)(({ theme }) => ({
  marginInline: theme.spacing(),
  maxWidth: theme.spacing(15),
}));
const Volume: React.FC = () => {
  const [isHovering, hoverProps] = useHover();
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const toggleMuted = () => {
    void setPlaybackVolume(muted ? volume : 0);
    setMuted(cur => !cur);
  };
  return (
    <>
      <PanelIcon {...hoverProps}>
        {(isHovering ? !muted : muted) ? (
          <VolumeMuteRounded onClick={toggleMuted} />
        ) : (
          <VolumeUpRounded onClick={toggleMuted} />
        )}
      </PanelIcon>
      <VolumeSlider
        max={100}
        value={muted ? 0 : volume}
        onValueChange={value => {
          setVolume(value);
          void setPlaybackVolume(value);
        }}
      />
    </>
  );
};

const Queue: React.FC = () => {
  const active = usePathName() === 'queue';
  const navigate = useNavigate();
  return (
    <PanelIcon>
      <QueueMusicRounded
        color={active ? 'primary' : undefined}
        onClick={() => {
          if (active) return navigate(-1);
          navigate(routes.queue);
        }}
      />
    </PanelIcon>
  );
};

export const VolumeAndDevices: React.FC = () => {
  return (
    <Box alignItems="center" flex={1} flexDirection="row" justifyContent="flex-end" padding={1.5}>
      <Queue />
      <DevicesList />
      <Volume />
    </Box>
  );
};
