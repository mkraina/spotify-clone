import React, { PropsWithChildren } from 'react';
import { StackNavigationState, TypedNavigator } from '@react-navigation/native';
import { StackNavigationEventMap, StackNavigationOptions } from '@react-navigation/stack';

import {
  AppParamList,
  CollectionsStackParamList,
  HomeStackParamList,
  screenOptions,
  SearchStackParamList,
} from '../../navigation';

import { AlbumScreen } from './AlbumScreen';
import { ArtistScreen } from './ArtistScreen';

type ParamList = HomeStackParamList | CollectionsStackParamList | SearchStackParamList;

type Stack<T extends ParamList> = TypedNavigator<
  T,
  StackNavigationState<AppParamList>,
  StackNavigationOptions,
  StackNavigationEventMap,
  React.ComponentType
>;

type Props<T extends ParamList> = PropsWithChildren & { Stack: Stack<T> };

export const SharedStack = React.memo<Props<ParamList>>(({ Stack, children }) => (
  <Stack.Navigator screenOptions={screenOptions.card}>
    {children}
    <Stack.Screen name="artist" component={ArtistScreen} />
    <Stack.Screen name="album" component={AlbumScreen} />
  </Stack.Navigator>
)) as <T extends ParamList>(props: Props<T>) => React.ReactElement;
