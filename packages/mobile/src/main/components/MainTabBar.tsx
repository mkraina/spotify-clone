import React, { useCallback } from 'react';
import { TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Text } from 'react-native-paper';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { TabNavigationState } from '@react-navigation/native';

import { MainTabParamList } from '../../navigation';
import { SafeArea, StyleSheet } from '../../ui';

const styles = StyleSheet.create({
  container: { position: 'absolute', left: 0, bottom: 0, right: 0, backgroundColor: 'blue' },
  content: { flexDirection: 'row', flex: 1 },
  tab: { flex: 1, alignItems: 'center', height: 56, justifyContent: 'center' },
  icon: { width: 32, aspectRatio: 1, backgroundColor: 'white', borderRadius: 360 },
});

export type MainTabBarProps = Omit<BottomTabBarProps, 'state'> & {
  state: TabNavigationState<MainTabParamList>;
};

export const TabBarButton = React.memo<{
  isFocused: boolean;
  navigation: MainTabBarProps['navigation'];
  route: MainTabBarProps['state']['routes'][0];
}>(props => {
  const { isFocused, route, navigation } = props;
  return (
    <TouchableOpacity
      style={styles.tab}
      onPress={useCallback(() => {
        navigation.emit({
          type: 'tabPress',
          target: route.key,
          canPreventDefault: true,
        });

        if (!isFocused) {
          navigation.navigate(route.name);
        }
      }, [isFocused, navigation, route.key, route.name])}
    >
      <View style={styles.icon} />
      <Text>{route.name}</Text>
    </TouchableOpacity>
  );
});

const gradient = [0, 0.8, 1].map(i => `rgba(0,0,0,${i})`);
const locations = undefined; // [0, 0.85];
export const MainTabBar = React.memo<MainTabBarProps>(({ state, navigation }) => (
  <LinearGradient colors={gradient} locations={locations} style={styles.container}>
    <View style={styles.content}>
      {state.routes.map((route, index) => (
        <TabBarButton
          navigation={navigation}
          route={route}
          key={route.key}
          isFocused={state.index === index}
        />
      ))}
    </View>
    <SafeArea.Bottom />
  </LinearGradient>
));
