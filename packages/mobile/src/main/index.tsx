import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button as RNButton,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {
  availableLanguages,
  changeLanguage,
  LocalizationProvider,
} from '@spotify-clone/shared/i18n';

import { auth } from '../auth';
import { getLocale } from '../i18n';

const styles = StyleSheet.create({
  content: { justifyContent: 'center', flex: 1, alignItems: 'center' },
});

const Button = React.memo<{ children: string }>(({ children }) => {
  return (
    <RNButton title={children} onPress={useCallback(() => changeLanguage(children), [children])} />
  );
});

const App = React.memo(() => {
  const isDarkMode = useColorScheme() === 'dark';
  const { t } = useTranslation();
  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.content}>
        <Text>{t('welcomeMessage')}</Text>
        {availableLanguages.map(lang => (
          <Button key={lang}>{lang}</Button>
        ))}
        <RNButton onPress={auth} title="authorize" />
      </View>
    </>
  );
});

export default () => (
  <LocalizationProvider detect={getLocale}>
    <App />
  </LocalizationProvider>
);
