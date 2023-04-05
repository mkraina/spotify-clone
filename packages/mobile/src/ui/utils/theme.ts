// eslint-disable-next-line no-restricted-imports
import { MD3DarkTheme } from 'react-native-paper';
import { InternalTheme } from 'react-native-paper/lib/typescript/src/types';
import { Theme as NavigationTheme } from '@react-navigation/native';
import { palette } from '@spotify-clone/shared/ui';

export const theme: InternalTheme = {
  ...MD3DarkTheme,
  dark: true,
  colors: {
    primary: palette.primary.main,
    onPrimary: palette.primary.contrastText,
    primaryContainer: palette.primary.dark,
    onPrimaryContainer: palette.primary.contrastText,
    secondary: palette.secondary.main,
    onSecondary: palette.secondary.contrastText,
    secondaryContainer: palette.secondary.dark,
    onSecondaryContainer: palette.secondary.contrastText,
    tertiary: 'rgb(160, 207, 209)', //TODO:
    onTertiary: 'rgb(0, 55, 57)', //TODO:
    tertiaryContainer: 'rgb(30, 78, 80)', //TODO:
    onTertiaryContainer: 'rgb(188, 235, 237)', //TODO:
    error: palette.error.main,
    onError: palette.error.contrastText,
    errorContainer: palette.error.dark,
    onErrorContainer: palette.error.contrastText,
    background: palette.background.default,
    onBackground: palette.grey[100],
    surface: palette.grey[900],
    onSurface: palette.grey[50],
    surfaceVariant: palette.grey[800],
    onSurfaceVariant: palette.grey[50],
    outline: palette.grey[500],
    outlineVariant: palette.grey[700],
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: palette.grey[50],
    inverseOnSurface: palette.grey[900],
    inversePrimary: palette.primary.dark,
    elevation: {
      level0: 'transparent',
      level1: palette.grey[900],
      level2: palette.grey[800],
      level3: palette.grey[700],
      level4: palette.grey[600],
      level5: palette.grey.A700,
    },
    surfaceDisabled: 'rgba(227, 227, 227, 0.12)',
    onSurfaceDisabled: 'rgba(227, 227, 227, 0.38)',
    backdrop: 'rgba(45, 45, 45, 0.4)',
  },
};

export const navigationTheme: NavigationTheme = {
  dark: true,
  colors: {
    primary: theme.colors.primary,
    background: theme.colors.background,
    card: theme.colors.background,
    text: theme.colors.onPrimary,
    border: theme.colors.outline,
    notification: theme.colors.secondary,
  },
};
