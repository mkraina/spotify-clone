import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { AppScreenProps, CollectionsStackParamList } from '../../navigation';

import { CollectionScreen } from './CollectionScreen';
import { SharedStack } from './SharedStack';

const Stack = createStackNavigator<CollectionsStackParamList>();

export const CollectionsStack = React.memo<AppScreenProps<'collectionsStack'>>(() => {
  return (
    <SharedStack Stack={Stack}>
      <Stack.Screen name="collection" component={CollectionScreen} />
    </SharedStack>
  );
});
