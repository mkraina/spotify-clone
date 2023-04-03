import { useQuery } from 'react-query';
import { Device } from 'spotify-types';

import { playerQueryKey } from '../keyFactory';
import { api } from '../utils';

export const useAvailableDevices = () =>
  useQuery(
    playerQueryKey.devices,
    async () => (await api.get<{ devices: Device[] }>('/me/player/devices')).data.devices
  );
