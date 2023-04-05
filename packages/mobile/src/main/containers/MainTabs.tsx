import React from 'react';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';

import { MainTabParamList } from '../../navigation';
import { TouchableRipple } from '../../ui';
import { TabBarBackground, TabBarIcon, TabBarLabel } from '../components/TabBarComponents';

import { CollectionsStack } from './CollectionsStack';
import { HomeStack } from './HomeStack';
import { SearchStack } from './SearchStack';

const Tab = createBottomTabNavigator<MainTabParamList>();

const options = ({
  route,
}: {
  route: RouteProp<MainTabParamList, keyof MainTabParamList>;
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
      <Tab.Screen name="homeStack" component={HomeStack} />
      <Tab.Screen name="searchStack" component={SearchStack} />
      <Tab.Screen name="collectionsStack" component={CollectionsStack} />
    </Tab.Navigator>
  );
});
