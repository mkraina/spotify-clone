import React, { useMemo } from 'react';
import { View } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

const useSafeBottomTabBarHeight = (): number => {
  try {
    return useBottomTabBarHeight();
  } catch (e) {
    return 0;
  }
};

export const BottomTabBarPlaceholder = React.memo(() => {
  const height = useSafeBottomTabBarHeight();
  return <View style={useMemo(() => ({ height }), [height])} />;
});
