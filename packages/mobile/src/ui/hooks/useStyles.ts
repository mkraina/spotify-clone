import { useMemo } from 'react';
import { StyleSheet as RNStyleSheet } from 'react-native';
// eslint-disable-next-line no-restricted-imports
import { MD3Theme, useTheme } from 'react-native-paper';

export type Theme = MD3Theme;
export type ColorKey = keyof Omit<Theme['colors'], 'elevation'>;
export { useTheme };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type NamedStyles<T> = RNStyleSheet.NamedStyles<T> | RNStyleSheet.NamedStyles<any>;

const themed = <T extends NamedStyles<T>>(stylesFc: (theme: Theme) => T): ((theme: Theme) => T) =>
  stylesFc;

export const StyleSheet = { ...RNStyleSheet, themed };

export const useStyles = <T extends NamedStyles<T>>(callback: (theme: Theme) => T): T => {
  const theme = useTheme<Theme>();
  return useMemo(() => RNStyleSheet.create(callback(theme)), [callback, theme]);
};
