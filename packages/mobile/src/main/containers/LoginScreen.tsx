import React, { useCallback } from 'react';
import { Button, SafeAreaView, StyleSheet } from 'react-native';
import { useUserAuthorization } from '@spotify-clone/shared/api';

import { auth } from '../../auth';

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center' },
});
export const LoginScreen = React.memo(() => {
  const [, setUserAuthorization] = useUserAuthorization();
  return (
    <SafeAreaView style={styles.container}>
      <Button
        onPress={useCallback(() => auth().then(setUserAuthorization), [setUserAuthorization])}
        title="authorize"
      />
    </SafeAreaView>
  );
});
