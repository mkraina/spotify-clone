import React from 'react';
import { FlatList, FlatListProps, ScrollView, ScrollViewProps, View } from 'react-native';

import { BottomTabBarPlaceholder, StatusBar, StyleSheet, Text } from '../../ui';

const styles = StyleSheet.create({
  container: { flex: 1 },
});

type ListProps = { type: 'list' } & FlatListProps<unknown>;
type ScrollProps = { type?: 'scroll' | 'static' } & ScrollViewProps;

type Props = ScrollProps | ListProps;

const colors = ['red', 'blue'];

export const Screen = React.memo<Props>(props => {
  return (
    <View style={styles.container}>
      <StatusBar />
      {props.type === 'list' ? (
        <FlatList {...props} />
      ) : (
        <ScrollView scrollEnabled={props.type !== 'static'} {...props}>
          {props.children ||
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
