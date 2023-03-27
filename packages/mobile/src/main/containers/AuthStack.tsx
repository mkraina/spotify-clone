import React from 'react';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';

import { LoginScreen } from './LoginScreen';

const Stack = createStackNavigator();

const options: StackNavigationOptions = { headerShown: false };
export const AuthStack = React.memo(() => {
  return (
    <Stack.Navigator screenOptions={options}>
      <Stack.Screen name="login" component={LoginScreen} />
    </Stack.Navigator>
  );
});
