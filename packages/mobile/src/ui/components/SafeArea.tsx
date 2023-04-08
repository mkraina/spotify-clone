import React, { useMemo } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Inset = React.memo<{ height?: number; width?: number }>(({ width, height }) => (
  <View style={useMemo(() => ({ width, height }), [height, width])} />
));

const Top = React.memo(() => <Inset height={useSafeAreaInsets().top} />);
const Bottom = React.memo(() => <Inset height={useSafeAreaInsets().bottom} />);
const Left = React.memo(() => <Inset width={useSafeAreaInsets().left} />);
const Right = React.memo(() => <Inset width={useSafeAreaInsets().right} />);

export const SafeArea = { Top, Bottom, Left, Right };
