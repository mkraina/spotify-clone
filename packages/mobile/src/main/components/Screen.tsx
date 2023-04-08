import React, { createContext, useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FlatList,
  FlatListProps,
  RefreshControl,
  ScrollView,
  ScrollViewProps,
  SectionList,
  SectionListProps,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import { spacing } from '@spotify-clone/shared/ui';
import useEventCallback from 'use-event-callback';

import {
  BottomTabBarPlaceholder,
  Button,
  Icon,
  IconName,
  StatusBar,
  StyleSheet,
  Text,
  useTheme,
} from '../../ui';

const styles = StyleSheet.create({
  container: { flex: 1 },
  emptyScreenContentContainerStyle: { flexGrow: 1 },
  emptyComponent: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: spacing(2) },
  retryButton: { margin: spacing(3) },
  placeholderContainer: { flexDirection: 'row' },
});

type StylableComponent = React.FC<{ style?: StyleProp<ViewStyle> }>;
type WithId<T = unknown> = T & { id: string };
type InfiniteQueryProps = {
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
};
type ListPaginationProps =
  | InfiniteQueryProps
  | { [P in keyof InfiniteQueryProps]?: InfiniteQueryProps[P] };
type ListContextProps = {
  ListFooterComponent: StylableComponent | undefined;
  emptyIcon: IconName | undefined;
  emptyMessage: string | undefined;
  emptyTitle: string | undefined;
  fetchingNext: boolean | undefined;
  isError: boolean | undefined;
  loading: boolean | undefined;
  numColumns: number;
  onRefresh: FlatListProps<unknown>['onRefresh'] | undefined;
  refreshing: boolean | undefined;
  renderPlaceholder: (() => React.ReactNode) | undefined;
};
type ListProps<T extends WithId> = { type: 'list' } & Omit<
  FlatListProps<T>,
  'ListFooterComponent' | 'keyExtractor'
> &
  ListPaginationProps &
  Partial<ListContextProps>;
type SectionsProps<T extends WithId, S> = { type: 'sections' } & SectionListProps<T, S>;
type ScrollProps = { type?: 'scroll' | 'static' } & ScrollViewProps;

const array = (length: number) => new Array(length).fill(1);
const placeholderData: number[] = array(10);
const keyExtractor = (item: WithId, index: number) => `${item.id}-${index}`;
const ListContext = createContext<ListContextProps>(undefined as unknown as ListContextProps);

const ListFooter = () => {
  const { renderPlaceholder, ListFooterComponent, fetchingNext, loading, numColumns } =
    useContext(ListContext);
  return (
    <>
      {renderPlaceholder &&
        (loading ? placeholderData : fetchingNext ? placeholderData.slice(0, 2) : []).map(
          (_, i) => (
            <View style={numColumns > 1 && styles.placeholderContainer} key={i}>
              {array(numColumns).map((_, pIndex) => (
                <React.Fragment key={pIndex}>{renderPlaceholder()}</React.Fragment>
              ))}
            </View>
          )
        )}
      {ListFooterComponent && <ListFooterComponent />}
      <BottomTabBarPlaceholder />
    </>
  );
};

const EmptyDataComponent: React.FC = () => {
  const { t } = useTranslation();
  const {
    loading,
    refreshing,
    emptyTitle = t('defaultEmptyScreenTitle'),
    emptyMessage = t('defaultEmptyScreenMessage'),
    isError,
    onRefresh,
    emptyIcon,
  } = useContext(ListContext);

  if (loading || refreshing) {
    return null;
  }
  return (
    <View style={styles.emptyComponent}>
      <Icon
        name={isError ? 'alert-outline' : emptyIcon ?? 'info-outline'}
        color="onBackground"
        size={spacing(10)}
      />
      <Text variant="headlineMedium" fontWeight="bold" textAlign="center">
        {emptyTitle}
      </Text>
      <Text variant="bodyLarge" textAlign="center">
        {emptyMessage}
      </Text>
      {isError && onRefresh && (
        <Button style={styles.retryButton} onPress={onRefresh}>
          {t('retryButtonTitle')}
        </Button>
      )}
    </View>
  );
};

const RefreshComponent: React.FC = () => {
  const { refreshing, onRefresh } = useContext(ListContext);
  const { colors } = useTheme();
  if (!onRefresh || refreshing === undefined) {
    return null;
  }
  return (
    <RefreshControl refreshing={refreshing} tintColor={colors.onBackground} onRefresh={onRefresh} />
  );
};
const refreshControl = <RefreshComponent />;
const Div = () => null;

// eslint-disable-next-line max-lines-per-function
const ListScreen = <T extends WithId>({
  ListFooterComponent,
  renderPlaceholder,
  fetchingNext,
  loading,
  emptyMessage,
  emptyTitle,
  onRefresh,
  refreshing,
  isError,
  emptyIcon,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
  ListHeaderComponent = Div,
  ...props
}: ListProps<T>): React.ReactElement => {
  return (
    <ListContext.Provider
      value={{
        emptyMessage,
        emptyTitle,
        ListFooterComponent,
        renderPlaceholder,
        fetchingNext,
        loading,
        refreshing,
        onRefresh,
        isError,
        emptyIcon,
        numColumns: props.numColumns ?? 1,
      }}
    >
      <FlatList
        {...props}
        refreshControl={refreshControl}
        keyExtractor={keyExtractor}
        contentContainerStyle={useMemo(
          () => [props.contentContainerStyle, styles.emptyScreenContentContainerStyle],
          [props.contentContainerStyle]
        )}
        ListFooterComponent={ListFooter}
        ListEmptyComponent={EmptyDataComponent}
        onEndReached={useEventCallback(
          () => hasNextPage && !isFetchingNextPage && fetchNextPage?.()
        )}
        ListHeaderComponent={ListHeaderComponent}
      />
    </ListContext.Provider>
  );
};

type Props<T extends WithId, S> = ScrollProps | ListProps<T> | SectionsProps<T, S>;
export const Screen = <T extends WithId, S>(props: Props<T, S>): React.ReactElement | null => {
  return (
    <View style={styles.container}>
      <StatusBar />
      {props.type === 'list' ? (
        <ListScreen {...props} />
      ) : props.type === 'sections' ? (
        <SectionList {...props} />
      ) : (
        <ScrollView scrollEnabled={props.type !== 'static'} {...props}>
          {props.children}
          <BottomTabBarPlaceholder />
        </ScrollView>
      )}
    </View>
  );
};
