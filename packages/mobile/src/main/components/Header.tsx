import React, { PropsWithChildren } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { spacing } from '@spotify-clone/shared/ui';

import { useIsFirstInStack } from '../../navigation';
import { Icon, IconProps, StyleSheet, useStyles } from '../../ui';

const themedStyles = StyleSheet.themed(theme => ({
  container: {
    backgroundColor: theme.colors.background,
    alignSelf: 'stretch',
    flexDirection: 'row',
    padding: spacing(),
    paddingTop: spacing(4),
    alignItems: 'center',
  },
  title: { fontWeight: 'bold', padding: spacing() },
  endContent: { flex: 1, justifyContent: 'center', alignItems: 'flex-end' },
  icon: { padding: spacing(), borderRadius: 360, overflow: 'hidden' },
}));

export const headerIconSize = 24;
export const HeaderIcon = React.memo<Omit<IconProps, 'color' | 'style' | 'size'>>(props => {
  return <Icon {...props} style={useStyles(themedStyles).icon} size={headerIconSize} />;
});

export const Header = React.memo<
  PropsWithChildren & { startContent?: React.ReactNode; title?: string }
>(({ title, children, startContent }) => {
  const hideBackButton = useIsFirstInStack();
  const { goBack } = useNavigation();
  const styles = useStyles(themedStyles);
  return (
    <View style={styles.container}>
      {!hideBackButton && <HeaderIcon name="arrow-back-ios" onPress={goBack} />}
      {startContent}
      {!!title && (
        <Text style={styles.title} variant="titleLarge">
          {title}
        </Text>
      )}
      <View style={styles.endContent}>{children}</View>
    </View>
  );
});
