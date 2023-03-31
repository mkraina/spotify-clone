import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { AppScreenProps, HomeStackParamList } from '../../navigation';

import { HomeScreen } from './HomeScreen';
import { SharedStack } from './SharedStack';

const Stack = createStackNavigator<HomeStackParamList>();

export const HomeStack = React.memo<AppScreenProps<'homeStack'>>(() => {
  return (
    <SharedStack Stack={Stack}>
      <Stack.Screen name="home" component={HomeScreen} />
    </SharedStack>
  );
});
