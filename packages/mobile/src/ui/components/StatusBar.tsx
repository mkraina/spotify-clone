import React from 'react';
import { Platform, StatusBar as RNStatusBar } from 'react-native';
import { useTheme } from 'react-native-paper';

const isIPhone = Platform.OS === 'ios';
const osVersion = isIPhone ? parseFloat(Platform.Version as string) : (Platform.Version as number);

const transparentBackgroundSupported = isIPhone || osVersion >= 23;

export const StatusBar = React.memo(() => {
  const darkContent = !useTheme().dark;
  return (
    <RNStatusBar
      backgroundColor={transparentBackgroundSupported ? 'transparent' : 'black'}
      barStyle={darkContent && transparentBackgroundSupported ? 'dark-content' : 'light-content'}
      translucent={transparentBackgroundSupported}
    />
  );
});
