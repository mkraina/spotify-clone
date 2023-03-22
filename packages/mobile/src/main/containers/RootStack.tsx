import React from 'react';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';

import { RootStackParamList } from '../../navigation';

import { AccountScreen } from './AccountScreen';
import { ArtistScreen } from './ArtistScreen';
import { HomeScreen } from './HomeScreen';
import { SearchScreen } from './SearchScreen';
import { TrackScreen } from './TrackScreen';

const Stack = createStackNavigator<RootStackParamList>();

const options: StackNavigationOptions = { headerShown: false };
export const RootStack = React.memo(() => {
  return (
    <Stack.Navigator screenOptions={options}>
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="track" component={TrackScreen} />
      <Stack.Screen name="search" component={SearchScreen} />
      <Stack.Screen name="artist" component={ArtistScreen} />
      <Stack.Screen name="account" component={AccountScreen} />
    </Stack.Navigator>
  );
});
