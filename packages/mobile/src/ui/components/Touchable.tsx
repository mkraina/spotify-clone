import React, { ComponentProps, useMemo } from 'react';
import { TouchableNativeFeedback } from 'react-native';
import { TouchableRipple, useTheme } from 'react-native-paper';

export const Touchable = React.memo<
  { color?: string } & Omit<ComponentProps<typeof TouchableRipple>, 'rippleColor' | 'underlayColor'>
>(props => {
  const theme = useTheme();
  const color = props.color ?? theme.colors.onBackground;
  return (
    <TouchableRipple
      background={useMemo(() => TouchableNativeFeedback.Ripple(color, true), [color])}
      {...props}
    />
  );
});
