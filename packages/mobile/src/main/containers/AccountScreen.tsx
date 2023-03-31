/* eslint-disable react/jsx-no-literals */
import React from 'react';
import { Button } from 'react-native-paper';

import { authService } from '../../auth';
import { AppScreenProps } from '../../navigation';
import { SafeArea } from '../../ui';
import { Screen } from '../components';
import { Header } from '../components/Header';

export const AccountScreen = React.memo<AppScreenProps<'account'>>(() => {
  return (
    <Screen>
      <SafeArea.Top />
      <Header />
      <Button mode="contained" onPress={authService.logout}>
        log out
      </Button>
      <Button onPress={authService.logout}>logout</Button>
      <Button onPress={authService.refresh}>refresh</Button>
    </Screen>
  );
});
