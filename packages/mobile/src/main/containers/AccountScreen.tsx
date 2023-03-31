/* eslint-disable react/jsx-no-literals */
import React, { useCallback } from 'react';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { authService } from '../../auth';
import { AppScreenProps } from '../../navigation';
import { SafeArea } from '../../ui';
import { Screen } from '../components';
import { Header } from '../components/Header';

export const AccountScreen = React.memo<AppScreenProps<'account'>>(() => {
  const { navigate } = useNavigation();

  return (
    <Screen>
      <SafeArea.Top />
      <Header />
      <Button mode="contained" onPress={authService.logout}>
        log out
      </Button>
      <Button mode="elevated" onPress={useCallback(() => navigate('search', {}), [navigate])}>
        search
      </Button>
      <Button onPress={authService.logout}>logout</Button>
      <Button onPress={authService.refresh}>refresh</Button>
    </Screen>
  );
});
