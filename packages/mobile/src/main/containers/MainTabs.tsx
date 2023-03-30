import React from 'react';
import { TouchableRipple } from 'react-native-paper';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';

import { MainTabParamList } from '../../navigation';
import { TabBarBackground, TabBarIcon, TabBarLabel } from '../components/TabBarComponents';

import { CollectionScreen } from './CollectionScreen';
import { HomeScreen } from './HomeScreen';
import { SearchScreen } from './SearchScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

const options = ({
  route,
}: {
  route: RouteProp<MainTabParamList, 'home' | 'search' | 'collection'>;
}): BottomTabNavigationOptions => ({
  headerShown: false,
  tabBarStyle: {
    position: 'absolute',
    backgroundColor: 'transparent',
    borderTopWidth: 0,
  },
  tabBarButton: props => <TouchableRipple {...props} />,
  tabBarIcon: props => <TabBarIcon {...props} route={route.name} />,
  tabBarLabel: props => <TabBarLabel {...props} route={route.name} />,
  tabBarBackground: () => <TabBarBackground />,
});

export const MainTabs = React.memo(() => {
  return (
    <Tab.Navigator screenOptions={options}>
      <Tab.Screen name="home" component={HomeScreen} />
      <Tab.Screen name="search" component={SearchScreen} />
      <Tab.Screen name="collection" component={CollectionScreen} />
    </Tab.Navigator>
  );
});
