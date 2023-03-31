import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { spacing } from '@spotify-clone/shared/ui';

import { AppScreenProps } from '../../navigation';
import { SafeArea, StyleSheet, useStyles } from '../../ui';
import { Screen } from '../components';
import { Header } from '../components/Header';

const themedStyles = StyleSheet.themed(theme => ({
  searchBarContainer: { backgroundColor: theme.colors.background },
  searchBar: { backgroundColor: theme.colors.onBackground, height: 48, margin: spacing(2) },
}));

const stickyHeaderIndices = [1];

export const SearchScreen = React.memo<AppScreenProps<'search'>>(() => {
  const { t } = useTranslation();
  const styles = useStyles(themedStyles);
  return (
    <>
      <SafeArea.Top />
      <Screen stickyHeaderIndices={stickyHeaderIndices}>
        <Header title={t('searchPageTitle')} />
        <View style={styles.searchBarContainer}>
          <View style={styles.searchBar} />
        </View>
      </Screen>
    </>
  );
});
