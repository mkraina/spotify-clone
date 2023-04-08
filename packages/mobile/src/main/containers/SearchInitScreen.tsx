import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ListRenderItem,
  StickyHeaderComponentProps,
  useWindowDimensions,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useBrowseCategories } from '@spotify-clone/shared/api';
import { spacing } from '@spotify-clone/shared/ui';
import { Category } from 'spotify-types';

import { CategoryCard } from '../../categories';
import { AppScreenProps } from '../../navigation';
import {
  Appbar,
  SafeArea,
  StickyHeader,
  StyleSheet,
  Text,
  TouchableRipple,
  useStickyHeaderProps,
  useStyles,
} from '../../ui';
import { Screen } from '../components';

const themedStyles = StyleSheet.themed(theme => ({
  header: {
    zIndex: 100,
    backgroundColor: theme.colors.background,
    marginHorizontal: spacing(-0.5),
  },
  browseAllTitle: { padding: spacing(1.5) },
  contentContainer: { paddingHorizontal: spacing(0.5) },
  searchBarContainer: { padding: spacing(1.5), backgroundColor: theme.colors.background },
  searchBar: {
    backgroundColor: theme.colors.onBackground,
    height: spacing(6),
    padding: spacing(),
    justifyContent: 'center',
    borderRadius: spacing(0.5),
  },
  cardContainer: { padding: spacing() },
  card: { flexGrow: 1, aspectRatio: 1 },
}));

const Header: React.FC<StickyHeaderComponentProps> = props => {
  const { t } = useTranslation();
  const styles = useStyles(themedStyles);
  const { navigate } = useNavigation();

  return (
    <View style={styles.header}>
      <Appbar mode="medium">
        <Appbar.Content title={t('searchPageTitle')} />
      </Appbar>
      <StickyHeader {...props}>
        <View style={styles.searchBarContainer}>
          <TouchableRipple
            color="background"
            onPress={useCallback(() => navigate('search', {}), [navigate])}
            style={styles.searchBar}
          >
            <Text variant="titleMedium" color="background" fontWeight="bold">
              {t('searchInputPlaceholder')}
            </Text>
          </TouchableRipple>
        </View>
      </StickyHeader>
      <Text variant="titleMedium" style={styles.browseAllTitle} fontWeight="bold">
        {t('browseAllTitle')}
      </Text>
    </View>
  );
};

const itemStyle = (numColumns: number, styles: ReturnType<typeof themedStyles>) => [
  styles.cardContainer,
  { width: `${100 / numColumns}%` },
];

export const SearchInitScreen = React.memo<AppScreenProps<'searchInit'>>(() => {
  const categories = useBrowseCategories();
  const dimensions = useWindowDimensions();
  const numColumns = dimensions.width > dimensions.height ? 3 : 2;
  const styles = useStyles(themedStyles);

  return (
    <>
      <SafeArea.Top />
      <Screen
        {...useStickyHeaderProps(Header)}
        type="list"
        key={numColumns}
        numColumns={numColumns}
        loading={categories.isLoading}
        data={categories.data?.categories.items}
        renderItem={useCallback<ListRenderItem<Category>>(
          ({ item }) => (
            <View style={itemStyle(numColumns, styles)}>
              <CategoryCard style={styles.card} category={item} />
            </View>
          ),
          [numColumns, styles]
        )}
        contentContainerStyle={styles.contentContainer}
        renderPlaceholder={useCallback(
          () => (
            <View style={itemStyle(numColumns, styles)}>
              <CategoryCard.Placeholder style={styles.card} />
            </View>
          ),
          [numColumns, styles]
        )}
        isError={categories.isError}
        onRefresh={categories.refetch}
      />
    </>
  );
});
