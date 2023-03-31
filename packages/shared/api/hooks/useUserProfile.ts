import { useQuery } from 'react-query';
import { PrivateUser } from 'spotify-types';

import { userQueryKey } from '../keyFactory';
import { api } from '../utils/api';

export const useUserProfile = () =>
  useQuery(userQueryKey.userProfile, async () => (await api.get<PrivateUser>('/me')).data);
