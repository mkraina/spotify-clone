import React from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { withSharedProvider } from '@spotify-clone/shared';

import { authService } from '../auth';
import { getLocale } from '../i18n';
import { NavigationProvider } from '../navigation';
import { encryptedStorage, storage } from '../storage';

import { LoginScreen } from './containers/LoginScreen';
import { RootStack } from './containers/RootStack';

const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: 'red' } });

const App = React.memo(() => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <NavigationProvider>
        <RootStack />
      </NavigationProvider>
    </GestureHandlerRootView>
  );
});

export default withSharedProvider(App, {
  getLocale,
  LoginPromptComponent: LoginScreen,
  authService,
  storage,
  encryptedStorage,
});
