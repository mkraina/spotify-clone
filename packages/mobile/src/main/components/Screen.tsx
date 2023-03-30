import React, { PropsWithChildren } from 'react';
import {
  Button,
  FlatList,
  FlatListProps,
  ScrollView,
  ScrollViewProps,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useIsFirstInStack } from '../../navigation';
import { BottomTabBarPlaceholder, SafeArea, StatusBar, StyleSheet } from '../../ui';

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { alignSelf: 'stretch', flexDirection: 'row' },
});

type ListProps = { type: 'list' } & FlatListProps<unknown>;
type ScrollProps = { type?: 'scroll' | 'static' } & ScrollViewProps;

type Props = PropsWithChildren & {
  showHeader?: boolean;
  title?: string;
} & (ScrollProps | ListProps);

const colors = ['red', 'blue'];

export const Screen = React.memo<Props>(({ showHeader = true, title, ...restProps }) => {
  const hideBackButton = useIsFirstInStack();
  const { goBack } = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar />
      {showHeader && (
        <>
          <SafeArea.Top />
          <View style={styles.header}>
            {!hideBackButton && <Button onPress={goBack} title="go back" />}
            {!!title && <Text>{title}</Text>}
          </View>
        </>
      )}
      {restProps.type === 'list' ? (
        <FlatList {...restProps} />
      ) : (
        <ScrollView scrollEnabled={restProps.type !== 'static'} {...restProps}>
          {restProps.children ||
            new Array(50).fill(1).map((_, i) => (
              // eslint-disable-next-line react-memo/require-usememo, react-perf/jsx-no-new-object-as-prop
              <Text key={i} style={{ backgroundColor: colors[i % 2], height: 48 }}>
                {i + 1}
              </Text>
            ))}
          <BottomTabBarPlaceholder />
        </ScrollView>
      )}
    </View>
  );
});
