import React, { ComponentProps, useMemo } from 'react';
import { TextStyle, TouchableNativeFeedback } from 'react-native';
import FastImage from 'react-native-fast-image';
// eslint-disable-next-line no-restricted-imports
import * as Paper from 'react-native-paper';
import { spacing } from '@spotify-clone/shared/ui';

import { navigationRef } from '../../navigation';
import { ColorKey, StyleSheet, Theme, useColor, useStyles, useTheme } from '../hooks';

import { IconName } from './Icon';
import { addBackgroundInSkeleton } from './Skeleton';

type WrappedComponentRef<T> = InstanceType<React.ComponentClass<T>>;

type MergedProps<T, R extends Partial<T>> = Pick<T, Exclude<keyof T, keyof R>> & {
  [K in keyof R]?: R[K];
};

const themedStyles = StyleSheet.themed(theme => ({
  appBarLarge: {
    paddingTop: spacing(4),
    backgroundColor: theme.colors.background,
  },
  appBarContentTitle: { padding: spacing() },
  chip: { borderRadius: 360 },
  chipSelected: {
    borderRadius: 360,
    backgroundColor: theme.colors.primaryContainer,
    borderColor: theme.colors.primary,
  },
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

export const Text = addBackgroundInSkeleton(
  ({
    fontWeight,
    textAlign,
    ...props
  }: ComponentProps<typeof Paper.Text> &
    Pick<TextStyle, 'fontWeight' | 'textAlign'> & { color?: ColorKey }) => {
    const color = useColor(props.color ?? 'onBackground');
    return (
      <Paper.Text
        {...props}
        style={
          fontWeight || textAlign || color
            ? [props.style, { fontWeight, textAlign, color }]
            : props.style
        }
      />
    );
  }
);

export const Appbar = Object.assign(
  assignDefaultProps(Paper.Appbar, ({ mode }, { styles }) => ({
    style: mode === 'medium' ? styles.appBarLarge : undefined,
  })),
  {
    // @component ./AppbarContent.tsx
    Content: assignDefaultProps(Paper.Appbar.Content, undefined, ({ title }, { styles }) => ({
      title:
        typeof title === 'string' ? (
          <Text style={styles.appBarContentTitle} variant="titleLarge" fontWeight="bold">
            {title}
          </Text>
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
  const color = useColor(props.color ?? 'onBackground');
  return (
    <Paper.TouchableRipple
      background={useMemo(() => TouchableNativeFeedback.Ripple(color, true), [color])}
      {...props}
    />
  );
});
export const TextInput = Paper.TextInput;
export const Card = Paper.Card;
export const Chip = assignDefaultProps(
  Paper.Chip,
  ({ mode = 'outlined' }) => ({ mode }),
  (props, { styles }) => ({
    ...props,
    style: [props.selected ? styles.chipSelected : styles.chip, props.style],
    selected: undefined,
  })
);
const AvatarText = assignDefaultProps(Paper.Avatar.Text, (_, { theme }) => ({
  theme: { colors: { primary: theme.colors.elevation.level4 } },
}));
const AvatarIcon = assignDefaultProps(Paper.Avatar.Icon, (_, { theme }) => ({
  theme: { colors: { primary: theme.colors.elevation.level4 } },
}));
const AvatarImage = assignDefaultProps(
  Paper.Avatar.Image,
  undefined,
  ({ source, style, onLayout }, { theme }) => {
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
                  style={{
                    width: size,
                    height: size,
                    borderRadius: StyleSheet.flatten(style || {}).borderRadius ?? size / 2,
                  }}
                  onLayout={onLayout}
                />
              );
            },
    };
  }
);
export const Avatar = {
  Text: AvatarText,
  Icon: AvatarIcon,
  Image: AvatarImage,
};
