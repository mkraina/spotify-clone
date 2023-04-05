/* eslint-disable react-memo/require-usememo */
/* eslint-disable react-perf/jsx-no-new-object-as-prop */
/* eslint-disable react-memo/require-memo */
import React, { ComponentProps, useMemo } from 'react';
import { TouchableNativeFeedback } from 'react-native';
import FastImage from 'react-native-fast-image';
// eslint-disable-next-line no-restricted-imports
import * as Paper from 'react-native-paper';
import { spacing } from '@spotify-clone/shared/ui';

import { navigationRef } from '../../navigation';
import { ColorKey, StyleSheet, Theme, useStyles, useTheme } from '../hooks';

import { IconName } from './Icon';

type WrappedComponentRef<T> = InstanceType<React.ComponentClass<T>>;

type MergedProps<T, R extends Partial<T>> = Pick<T, Exclude<keyof T, keyof R>> & {
  [K in keyof R]?: R[K];
};

const themedStyles = StyleSheet.themed(theme => ({
  appBarLarge: {
    paddingTop: spacing(4),
    backgroundColor: theme.colors.background,
  },
  appBarContentTitle: { fontWeight: 'bold', padding: spacing() },
}));

type GetPropsCallback<T, R extends Partial<T>> = (
  props: MergedProps<T, R>,
  extras: { styles: ReturnType<typeof themedStyles>; theme: Theme }
) => R;
const assignDefaultProps = <T, R extends Partial<T>>(
  // eslint-disable-next-line @typescript-eslint/naming-convention
  WrappedComponent: React.ComponentClass<T> | React.FC<T>,
  defaultProps?: GetPropsCallback<T, R>,
  propsOverwrite?: GetPropsCallback<T, R>
) => {
  return React.forwardRef<WrappedComponentRef<T>, MergedProps<T, R>>((_props, ref) => {
    const styles = useStyles(themedStyles);
    const theme = useTheme();
    const props = { ...defaultProps?.(_props, { styles, theme }), ...(_props as T) };
    return (
      <WrappedComponent
        ref={ref}
        {...props}
        {...propsOverwrite?.(props as MergedProps<T, R>, { styles, theme })}
      />
    );
  });
};

export const Appbar = Object.assign(
  assignDefaultProps(Paper.Appbar, ({ mode }, { styles }) => ({
    style: mode === 'medium' ? styles.appBarLarge : undefined,
  })),
  {
    // @component ./AppbarContent.tsx
    Content: assignDefaultProps(Paper.Appbar.Content, undefined, ({ title }, { styles }) => ({
      title:
        typeof title === 'string' ? (
          <Paper.Text style={styles.appBarContentTitle} variant="titleLarge">
            {title}
          </Paper.Text>
        ) : (
          title
        ),
    })),
    Action: Paper.Appbar.Action,
    BackAction: assignDefaultProps(Paper.Appbar.Action, () => ({
      onPress: () => navigationRef.current?.goBack(),
      icon: 'arrow-back' as IconName,
      isLeading: true,
    })),
    Header: Paper.Appbar.Header,
  }
);

export const Button = assignDefaultProps(
  Paper.Button,
  () => ({ mode: 'contained' } as Paper.ButtonProps)
);

export const TouchableRipple = React.memo<
  { color?: ColorKey } & Omit<
    ComponentProps<typeof Paper.TouchableRipple>,
    'rippleColor' | 'underlayColor'
  >
>(props => {
  const theme = useTheme();
  const color = theme.colors[props.color ?? 'onBackground'];
  return (
    <Paper.TouchableRipple
      background={useMemo(() => TouchableNativeFeedback.Ripple(color, true), [color])}
      {...props}
    />
  );
});
export const Text = Paper.Text;
export const TextInput = Paper.TextInput;
export const Card = Paper.Card;

const AvatarText = assignDefaultProps(Paper.Avatar.Text, (_, { theme }) => ({
  theme: { colors: { primary: theme.colors.elevation.level4 } },
}));
const AvatarIcon = assignDefaultProps(Paper.Avatar.Icon, (_, { theme }) => ({
  theme: { colors: { primary: theme.colors.elevation.level4 } },
}));
const AvatarImage = assignDefaultProps(Paper.Avatar.Image, undefined, ({ source }, { theme }) => {
  return {
    theme: { colors: { primary: theme.colors.elevation.level4 } },
    source:
      typeof source === 'function' || Array.isArray(source) || typeof source === 'number'
        ? source
        : ({ size }) => {
            if (!source?.uri) {
              return <AvatarIcon icon="account" size={size} />;
            }
            return (
              <FastImage
                source={{ uri: source.uri }}
                style={{ width: size, height: size, borderRadius: size / 2 }}
              />
            );
          },
  };
});
export const Avatar = {
  Text: AvatarText,
  Icon: AvatarIcon,
  Image: AvatarImage,
};
