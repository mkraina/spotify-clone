import React from 'react';
import { FlatList, FlatListProps, ScrollView, ScrollViewProps, View } from 'react-native';

import { BottomTabBarPlaceholder, StatusBar, StyleSheet, Text } from '../../ui';

const styles = StyleSheet.create({
  container: { flex: 1 },
});

type ListProps<T> = { type: 'list' } & FlatListProps<T>;
type ScrollProps = { type?: 'scroll' | 'static' } & ScrollViewProps;

type Props<T> = ScrollProps | ListProps<T>;

const colors = ['red', 'blue'];

export const Screen = <T,>(props: Props<T>): React.ReactElement | null => {
  return (
    <View style={styles.container}>
      <StatusBar />
      {props.type === 'list' ? (
        <FlatList {...props} />
      ) : (
        <ScrollView scrollEnabled={props.type !== 'static'} {...props}>
          {props.children ||
            new Array(50).fill(1).map((_, i) => (
              // eslint-disable-next-line react-native/no-inline-styles
              <Text key={i} style={{ backgroundColor: colors[i % 2], height: 48 }}>
                {i + 1}
              </Text>
            ))}
          <BottomTabBarPlaceholder />
        </ScrollView>
      )}
    </View>
  );
};
