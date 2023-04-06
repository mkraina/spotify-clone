import React, {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
} from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, ListRenderItem } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useSearch } from '@spotify-clone/shared/api';
import { appActions, useAppDispatch, useAppSelector } from '@spotify-clone/shared/redux';
import { Filter, useSearchFilters } from '@spotify-clone/shared/search';
import { spacing } from '@spotify-clone/shared/ui';
import { SearchResultItem } from 'spotify-types';
import useEventCallback from 'use-event-callback';

import { AlbumLineItem } from '../../albums';
import { ArtistLineItem } from '../../artists';
import { AppParamList, AppScreenProps } from '../../navigation';
import { EpisodeLineItem, ShowLineItem } from '../../shows';
import { TrackLineItem } from '../../tracks';
import {
  Appbar,
  BottomTabBarPlaceholder,
  Chip,
  LineItemProvider,
  SafeArea,
  StyleSheet,
  Text,
  TextInput,
  useStyles,
  useTheme,
} from '../../ui';
import { Screen } from '../components';

const themedStyles = StyleSheet.themed(({ colors }) => ({
  header: {
    backgroundColor: colors.elevation.level2,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing(),
  },
  input: { flex: 1, padding: 0, backgroundColor: 'transparent' },
  inputContent: { paddingStart: 0 },
  inputUnderline: { height: 0 },
  chipsContainer: {
    backgroundColor: colors.background,
    borderBottomColor: colors.elevation.level1,
    borderBottomWidth: 1,
  },
  chipsContentContainer: { paddingVertical: spacing(0.5), padding: spacing() },
  recentItemsHeading: {
    paddingHorizontal: spacing(2),
    paddingBottom: spacing(),
    fontWeight: 'bold',
    paddingTop: spacing(3),
  },
  item: { paddingHorizontal: spacing(2) },
  chip: { margin: spacing() },
}));

const SelectedFilterContext = createContext(false);

const Item = React.memo<{ item: SearchResultItem; isRecent?: boolean }>(({ item, isRecent }) => {
  const dispatch = useAppDispatch();
  const removeFromRecent = useCallback(
    () => dispatch(appActions.removeRecentSearch({ id: item.id })),
    [dispatch, item.id]
  );
  const addToRecent = useCallback(
    () => dispatch(appActions.addRecentSearch(item)),
    [dispatch, item]
  );
  const styles = useStyles(themedStyles);
  const hasSelectedFilter = useContext(SelectedFilterContext);
  return (
    <LineItemProvider
      style={styles.item}
      showExtraInfo={!hasSelectedFilter}
      onClose={isRecent ? removeFromRecent : undefined}
      onOpen={addToRecent}
    >
      {((): React.ReactElement | null => {
        switch (item.type) {
          case 'artist':
            return <ArtistLineItem {...item} />;
          case 'album':
            return <AlbumLineItem {...item} />;
          case 'track':
            return <TrackLineItem {...item} />;
          case 'episode':
            return <EpisodeLineItem {...item} />;
          case 'show':
            return <ShowLineItem {...item} />;
          default:
            return null;
        }
      })()}
    </LineItemProvider>
  );
});

const renderItem: ListRenderItem<SearchResultItem> = ({ item }) => <Item item={item} />;
const renderRecentItem: ListRenderItem<SearchResultItem> = ({ item }) => (
  <Item item={item} isRecent />
);

const Filters = React.memo<{ filters: Filter[] }>(({ filters }) => {
  const styles = useStyles(themedStyles);
  const flatList = useRef<FlatList>(null);

  const resetFilters = useEventCallback(() => filters[0]?.onSelect());
  useLayoutEffect(() => () => resetFilters(), [resetFilters]);

  return (
    <FlatList
      ref={flatList}
      data={filters}
      renderItem={useCallback<ListRenderItem<Filter>>(
        ({ item, index }) => (
          <Chip
            selected={item.selected}
            style={styles.chip}
            key={item.label}
            onPress={() => {
              item.onSelect();
              flatList.current?.scrollToIndex({ index, animated: true });
            }}
          >
            {item.label}
          </Chip>
        ),
        [styles.chip]
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.chipsContentContainer}
      style={styles.chipsContainer}
    />
  );
});

const RecentItemsHeading: React.FC = () => {
  const { t } = useTranslation();
  const styles = useStyles(themedStyles);
  return (
    <Text variant="titleMedium" style={styles.recentItemsHeading}>
      {t('recentSearchesTitle')}
    </Text>
  );
};

const Header: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { setParams } = useNavigation();
  const query = useRoute<RouteProp<Pick<AppParamList, 'search'>>>().params.query;
  const onValueChange = (val: string) => setParams({ query: val });
  const styles = useStyles(themedStyles);

  return (
    <>
      <SafeArea.Top />
      <Appbar>
        <Appbar.BackAction />
        <TextInput
          style={styles.input}
          underlineStyle={styles.inputUnderline}
          contentStyle={styles.inputContent}
          autoCorrect={false}
          placeholderTextColor={theme.colors.outline}
          value={query}
          placeholder={t('searchInputPlaceholder')}
          onChangeText={onValueChange}
          right={
            query ? <TextInput.Icon icon="close" onPress={() => onValueChange('')} /> : undefined
          }
        />
      </Appbar>
    </>
  );
};

const stickyHeaderIndices = [0];
export const SearchScreen = React.memo<AppScreenProps<'search'>>(
  ({ route: { params: { query } = {} } }) => {
    const { selectedFilter, filters } = useSearchFilters();
    const search = useSearch({ q: query, type: selectedFilter.value });
    const recentItems = useAppSelector(s => s.search.recentSearches);
    const items = useMemo<SearchResultItem[] | undefined>(
      () =>
        search.data?.pages.reduce<SearchResultItem[]>(
          (acc, cur) => [
            ...acc,
            ...Object.values(cur.results).reduce<SearchResultItem[]>(
              (a, c) => [...a, ...c.items],
              []
            ),
          ],
          []
        ),
      [search.data?.pages]
    );

    const FiltersComponent = useMemo(() => <Filters filters={filters} />, [filters]);

    return (
      <SelectedFilterContext.Provider value={!!selectedFilter.value}>
        <Header />
        <Screen
          type="list"
          stickyHeaderIndices={query ? stickyHeaderIndices : undefined}
          stickyHeaderHiddenOnScroll
          data={query ? items : recentItems}
          renderItem={query ? renderItem : renderRecentItem}
          ListHeaderComponent={query ? FiltersComponent : RecentItemsHeading}
          ListFooterComponent={BottomTabBarPlaceholder}
        />
      </SelectedFilterContext.Provider>
    );
  }
);
