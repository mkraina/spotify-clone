import React, { ComponentProps, useMemo } from 'react';
import { TouchableNativeFeedback } from 'react-native';
import { TouchableRipple, useTheme } from 'react-native-paper';

import { ColorKey } from '../hooks';

export const Touchable = React.memo<
  { color?: ColorKey } & Omit<
    ComponentProps<typeof TouchableRipple>,
    'rippleColor' | 'underlayColor'
  >
>(props => {
  const theme = useTheme();
  const color = theme.colors[props.color ?? 'onBackground'];
  return (
    <TouchableRipple
      background={useMemo(() => TouchableNativeFeedback.Ripple(color, true), [color])}
      {...props}
    />
  );
});
