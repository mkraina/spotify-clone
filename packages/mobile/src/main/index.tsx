import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { withSharedProvider } from '@spotify-clone/shared';

import { authService } from '../auth';
import { getLocale } from '../i18n';
import { NavigationProvider } from '../navigation';
import { encryptedStorage, storage } from '../storage';
import { StyleSheet } from '../ui';
import { UiProvider } from '../ui/Provider';

import { AuthStack } from './containers/AuthStack';
import { RootStack } from './containers/RootStack';

const styles = StyleSheet.create({ container: { flex: 1 } });

const App = withSharedProvider(
  React.memo(() => {
    return <RootStack />;
  }),
  {
    getLocale,
    LoginPromptComponent: AuthStack,
    authService,
    storage,
    encryptedStorage,
  }
);

export default React.memo(() => (
  <GestureHandlerRootView style={styles.container}>
    <UiProvider>
      <NavigationProvider>
        <App />
      </NavigationProvider>
    </UiProvider>
  </GestureHandlerRootView>
));
