import React from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { withSharedProvider } from '@spotify-clone/shared';

import { authService } from '../auth';
import { getLocale } from '../i18n';
import { NavigationProvider } from '../navigation/NavigationProvider';
import { encryptedStorage, storage } from '../storage';
import { SafeArea, StyleSheet, useStyles } from '../ui';
import { UiProvider } from '../ui/Provider';

import { AuthStack } from './containers/AuthStack';
import { RootStack } from './containers/RootStack';

const rootStyles = StyleSheet.create({ container: { flex: 1 } });
const appStyles = StyleSheet.themed(({ colors }) => ({
  container: { flex: 1, flexDirection: 'row', backgroundColor: colors.background },
}));
const App = withSharedProvider(
  () => {
    const styles = useStyles(appStyles);
    return (
      <View style={styles.container}>
        <SafeArea.Left />
        <RootStack />
        <SafeArea.Right />
      </View>
    );
  },
  {
    getLocale,
    LoginPromptComponent: AuthStack,
    authService,
    storage,
    encryptedStorage,
  }
);

export default React.memo(() => (
  <GestureHandlerRootView style={rootStyles.container}>
    <UiProvider>
      <NavigationProvider>
        <App />
      </NavigationProvider>
    </UiProvider>
  </GestureHandlerRootView>
));
