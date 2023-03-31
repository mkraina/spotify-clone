import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { TextStyle, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Text, useTheme } from 'react-native-paper';
import { TranslationKey } from '@spotify-clone/shared/i18n';
import { Color } from '@spotify-clone/shared/ui';

import { MainTabParamList } from '../../navigation';
import { Icon, IconName, StyleSheet } from '../../ui';

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '150%',
    overflow: 'visible',
  },
});

type RouteName = keyof MainTabParamList;

const icons: Record<RouteName, IconName> = {
  homeStack: 'home-outline',
  searchStack: 'search',
  collectionsStack: 'bookmark-outline',
};
const activeIcons: typeof icons = {
  homeStack: 'home',
  searchStack: 'search',
  collectionsStack: 'bookmark',
};
const labelKeys: Record<RouteName, TranslationKey> = {
  homeStack: 'mainNavigatorBarHome',
  searchStack: 'mainNavigatorBarSearch',
  collectionsStack: 'mainNavigatorBarCollections',
};

const useTabBarContentStyle = (focused: boolean) =>
  useMemo<ViewStyle | TextStyle>(
    () => ({ opacity: focused ? 1 : 0.85, fontWeight: focused ? 'bold' : undefined }),
    [focused]
  );

export const TabBarIcon = React.memo<{ focused: boolean; route: RouteName }>(props => {
  const icon = props.focused ? activeIcons[props.route] : icons[props.route];
  return <Icon name={icon} size={24} style={useTabBarContentStyle(props.focused)} />;
});

export const TabBarLabel = React.memo<{ focused: boolean; route: RouteName }>(props => {
  const { t } = useTranslation();
  return (
    <Text variant="bodySmall" style={useTabBarContentStyle(props.focused)}>
      {t(labelKeys[props.route])}
    </Text>
  );
});

export const TabBarBackground = React.memo(() => {
  const { background } = useTheme().colors;
  return (
    <LinearGradient
      colors={[0, 0.6, 0.85, 1].map(a => Color.alpha(background, a))}
      style={styles.background}
    />
  );
});
