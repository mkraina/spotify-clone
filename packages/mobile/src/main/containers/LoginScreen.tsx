import React, { useCallback } from 'react';
import { Button, SafeAreaView, StyleSheet } from 'react-native';
import { useAccessToken } from '@spotify-clone/shared/api';

import { auth } from '../../auth';

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center' },
});
export const LoginScreen = React.memo(() => {
  const [, setAccessToken] = useAccessToken();
  return (
    <SafeAreaView style={styles.container}>
      <Button
        onPress={useCallback(() => auth().then(setAccessToken), [setAccessToken])}
        title="authorize"
      />
    </SafeAreaView>
  );
});
