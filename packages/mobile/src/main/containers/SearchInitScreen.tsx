import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { spacing } from '@spotify-clone/shared/ui';

import { AppScreenProps } from '../../navigation';
import { Appbar, SafeArea, StyleSheet, TouchableRipple, useStyles } from '../../ui';
import { Screen } from '../components';

const themedStyles = StyleSheet.themed(theme => ({
  searchBarContainer: { backgroundColor: theme.colors.background, padding: spacing(1.5) },
  searchBar: { backgroundColor: theme.colors.onBackground, height: spacing(6) },
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
          <Appbar mode="medium">
            <Appbar.Content title={t('searchPageTitle')} />
          </Appbar>
          <View style={styles.searchBarContainer}>
            <TouchableRipple
              color="background"
              onPress={useCallback(() => navigate('search', {}), [navigate])}
            >
              <View style={styles.searchBar} />
            </TouchableRipple>
          </View>
        </Screen>
      </>
    );
  }
);
