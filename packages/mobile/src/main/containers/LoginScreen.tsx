import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Card, Text } from 'react-native-paper';
import { spacing } from '@spotify-clone/shared/ui';

import { authService } from '../../auth';
import { SafeArea, StyleSheet } from '../../ui';
import { Screen } from '../components';

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center' },
  card: { paddingVertical: spacing(), margin: spacing(2), alignItems: 'center' },
  title: { fontWeight: 'bold', padding: spacing(), textAlign: 'center' },
  button: { margin: spacing(), alignSelf: 'center' },
});

export const LoginScreen = React.memo(() => {
  const { t } = useTranslation();
  return (
    <Screen showHeader={false} contentStyle={styles.container}>
      <SafeArea.Top />
      <Card style={styles.card}>
        <Text variant="titleLarge" style={styles.title}>
          {t('loginScreenMessage')}
        </Text>
        <Button style={styles.button} mode="contained" onPress={authService.authorize}>
          {t('loginButton')}
        </Button>
      </Card>
      <SafeArea.Bottom />
    </Screen>
  );
});
