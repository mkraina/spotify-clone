import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { spacing } from '@spotify-clone/shared/ui';

import { AppScreenProps } from '../../navigation';
import { SafeArea, StyleSheet, Touchable, useStyles } from '../../ui';
import { Screen } from '../components';
import { Header } from '../components/Header';

const themedStyles = StyleSheet.themed(theme => ({
  searchBarContainer: { backgroundColor: theme.colors.background, padding: spacing(2) },
  searchBar: { backgroundColor: theme.colors.onBackground, height: 48 },
}));

const stickyHeaderIndices = [1];

export const SearchInitScreen = React.memo<AppScreenProps<'searchInit'>>(
  ({ navigation: { navigate } }) => {
    const { t } = useTranslation();
    const styles = useStyles(themedStyles);
    return (
      <>
        <SafeArea.Top />
        <Screen stickyHeaderIndices={stickyHeaderIndices}>
          <Header title={t('searchPageTitle')} />
          <View style={styles.searchBarContainer}>
            <Touchable
              color="background"
              onPress={useCallback(() => navigate('search', {}), [navigate])}
            >
              <View style={styles.searchBar} />
            </Touchable>
          </View>
        </Screen>
      </>
    );
  }
);
