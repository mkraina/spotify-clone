import React, { PropsWithChildren } from 'react';
import {
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useIsFirstInStack } from '../../navigation';

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { alignSelf: 'stretch', flexDirection: 'row' },
});

export const Screen = React.memo<PropsWithChildren & { title?: string }>(({ children, title }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const hideBackButton = useIsFirstInStack();
  const { goBack } = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.header}>
        {!hideBackButton && <Button onPress={goBack} title="go back" />}
        {!!title && <Text>{title}</Text>}
      </View>
      <View style={styles.container}>{children}</View>
    </SafeAreaView>
  );
});
