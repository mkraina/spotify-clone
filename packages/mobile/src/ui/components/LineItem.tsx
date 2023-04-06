import React, { PropsWithChildren, useContext } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { spacing } from '@spotify-clone/shared/ui';

import { StyleSheet, useStyles } from '../hooks';

import { Icon } from './Icon';
import { Avatar, Text, TouchableRipple } from './Paper';

const themedStyles = StyleSheet.themed(({ colors }) => ({
  content: { flexDirection: 'row', padding: spacing(0.5), alignItems: 'center' },
  imageRounded: { margin: spacing(0.5), borderRadius: 360 },
  imageSquare: { margin: spacing(0.5), borderRadius: 0 },
  labels: { padding: spacing(0.5), flex: 1 },
  subtitle: { color: colors.onSurfaceVariant },
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

export const LineItem = React.memo<Props>(props => {
  const imgSize = spacing(sizes[props.size ?? 'small']);
  const styles = useStyles(themedStyles);
  const { onClose, onOpen, style } = useContext(Context) || {};

  return (
    <TouchableRipple
      onPress={() => {
        props.onPress();
        onOpen?.();
      }}
    >
      <View style={[styles.content, style, props.style]}>
        <Avatar.Image
          size={imgSize}
          source={{ uri: props.image }}
          style={props.roundedAvatar ? styles.imageRounded : styles.imageSquare}
        />
        <View style={styles.labels}>
          <Text numberOfLines={1} variant="labelMedium">
            {props.title}
          </Text>
          {!!props.subTitle && (
            <Text numberOfLines={1} variant="labelSmall" style={styles.subtitle}>
              {props.subTitle}
            </Text>
          )}
        </View>
        {onClose && <Icon name="close" onPress={onClose} />}
      </View>
    </TouchableRipple>
  );
});
