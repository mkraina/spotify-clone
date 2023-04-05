/* eslint-disable react/jsx-no-literals */
import React from 'react';

import { authService } from '../../auth';
import { AppScreenProps } from '../../navigation';
import { Appbar, Button, SafeArea } from '../../ui';
import { Screen } from '../components';

export const AccountScreen = React.memo<AppScreenProps<'account'>>(() => {
  return (
    <Screen>
      <SafeArea.Top />
      <Appbar>
        <Appbar.BackAction />
      </Appbar>
      <Button onPress={authService.logout} icon="dry-cleaning">
        log out
      </Button>
      <Button onPress={authService.logout}>logout</Button>
      <Button onPress={authService.refresh}>refresh</Button>
    </Screen>
  );
});
