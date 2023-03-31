import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { AppScreenProps, SearchStackParamList } from '../../navigation';

import { SearchInitScreen } from './SearchInitScreen';
import { SearchScreen } from './SearchScreen';
import { SharedStack } from './SharedStack';

const Stack = createStackNavigator<SearchStackParamList>();

export const SearchStack = React.memo<AppScreenProps<'searchStack'>>(() => {
  return (
    <SharedStack Stack={Stack}>
      <Stack.Screen name="searchInit" component={SearchInitScreen} />
      <Stack.Screen name="search" component={SearchScreen} />
    </SharedStack>
  );
});
