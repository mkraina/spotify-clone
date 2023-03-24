import React from 'react';
import { Button, SafeAreaView, StyleSheet } from 'react-native';

import { authService } from '../../auth';

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center' },
});
export const LoginScreen = React.memo(() => {
  return (
    <SafeAreaView style={styles.container}>
      <Button onPress={authService.authorize} title="authorize" />
    </SafeAreaView>
  );
});
