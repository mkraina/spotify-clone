import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { RootStackParamList, screenOptions } from '../../navigation';

import { AccountScreen } from './AccountScreen';
import { MainTabs } from './MainTabs';
import { TrackScreen } from './TrackScreen';

const Stack = createStackNavigator<RootStackParamList>();

export const RootStack = React.memo(() => {
  return (
    <Stack.Navigator screenOptions={screenOptions.card}>
      <Stack.Screen name="mainTabs" component={MainTabs} />
      <Stack.Screen name="track" component={TrackScreen} />
      <Stack.Screen name="account" component={AccountScreen} />
    </Stack.Navigator>
  );
});
