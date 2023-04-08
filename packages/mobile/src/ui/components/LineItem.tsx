import React, { PropsWithChildren, useContext, useRef } from 'react';
import { StyleProp, View, ViewProps, ViewStyle } from 'react-native';
import { spacing } from '@spotify-clone/shared/ui';

import { StyleSheet, useStyles } from '../hooks';

import { Icon } from './Icon';
import { Avatar, Text, TouchableRipple } from './Paper';
import { Skeleton } from './Skeleton';

const themedStyles = StyleSheet.themed(() => ({
  content: { flexDirection: 'row', padding: spacing(0.5), alignItems: 'center' },
  imageRounded: { margin: spacing(0.5), borderRadius: 360 },
  imageSquare: { margin: spacing(0.5), borderRadius: 0 },
  labels: { padding: spacing(0.5), flex: -1 },
  title: { marginVertical: spacing(0.25), alignSelf: 'flex-start' },
  subtitle: {
    marginVertical: spacing(0.25),
    opacity: 0.6,
    alignSelf: 'flex-start',
  },
  closeIcon: { marginStart: 'auto' },
}));

type Size = 'small' | 'large';
type Props = {
  image: string | undefined;
  onPress: () => void;
  title: string;
  isActive?: boolean;
  roundedAvatar?: boolean;
  size?: Size;
  style?: StyleProp<ViewStyle>;
  subTitle?: string;
};

const sizes: Record<Size, number> = { small: 5, large: 10 };

type ContextProps = {
  onClose?: () => void;
  onOpen?: () => void;
  showExtraInfo?: boolean;
  style?: StyleProp<ViewStyle>;
};

const Context = React.createContext<ContextProps | undefined>(undefined);

export const useLineItemContext = () => useContext(Context);

export const LineItemProvider: React.FC<PropsWithChildren<ContextProps>> = ({
  children,
  ...value
}) => <Context.Provider value={value}>{children}</Context.Provider>;

const Content: React.FC<Omit<Props, 'onPress'> & { onLayout?: ViewProps['onLayout'] }> = props => {
  const imgSize = spacing(sizes[props.size ?? 'small']);
  const { onClose, style } = useContext(Context) || {};
  const styles = useStyles(themedStyles);

  const avatarStyle = props.roundedAvatar ? styles.imageRounded : styles.imageSquare;
  return (
    <View style={[styles.content, style, props.style]} onLayout={props.onLayout}>
      <Avatar.Image size={imgSize} source={{ uri: props.image }} style={avatarStyle} />
      <View style={styles.labels}>
        <Text
          style={styles.title}
          numberOfLines={1}
          variant="labelMedium"
          fontWeight={props.isActive ? 'bold' : undefined}
          color={props.isActive ? 'primary' : undefined}
        >
          {props.title}
        </Text>
        {!!props.subTitle && (
          <Text numberOfLines={1} variant="labelSmall" style={styles.subtitle}>
            {props.subTitle}
          </Text>
        )}
      </View>
      {onClose && <Icon name="close" onPress={onClose} style={styles.closeIcon} />}
    </View>
  );
};

const Item = React.memo<Props>(props => {
  const { onOpen } = useContext(Context) || {};
  return (
    <TouchableRipple
      onPress={() => {
        props.onPress();
        onOpen?.();
      }}
    >
      <Content {...props} />
    </TouchableRipple>
  );
});

export const LineItem = Object.assign(Item as React.FC<Props>, {
  Placeholder: (props: Pick<Props, 'roundedAvatar' | 'size' | 'style'>) => {
    const title = useRef('');
    if (!title.current) {
      title.current = new Array(Math.floor(Math.random() * (60 - 20 + 1)) + 20).fill('a').join('');
    }
    return (
      <Skeleton>
        <Content
          title={title.current}
          subTitle={title.current.slice(0, title.current.length / 2)}
          image=""
          {...props}
        />
      </Skeleton>
    );
  },
});
