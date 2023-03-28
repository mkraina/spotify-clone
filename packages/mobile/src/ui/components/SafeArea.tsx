import React, { useMemo } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Inset = React.memo<{ size: number }>(({ size }) => (
  <View style={useMemo(() => ({ height: size }), [size])} />
));

const Top = React.memo(() => <Inset size={useSafeAreaInsets().top} />);
const Bottom = React.memo(() => <Inset size={useSafeAreaInsets().bottom} />);
const Left = React.memo(() => <Inset size={useSafeAreaInsets().left} />);
const Right = React.memo(() => <Inset size={useSafeAreaInsets().right} />);

export const SafeArea = { Top, Bottom, Left, Right };
