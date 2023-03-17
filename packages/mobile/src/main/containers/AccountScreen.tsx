import React from 'react';
import { Text } from 'react-native';
import { useUserProfile } from '@spotify-clone/shared/api';

import { AppScreenProps } from '../../navigation';
import { Screen } from '../components';

export const AccountScreen = React.memo<AppScreenProps<'account'>>(() => {
  const userProfile = useUserProfile();
  return (
    <Screen title="User Profile">
      <Text>{userProfile.data?.display_name}</Text>
    </Screen>
  );
});
