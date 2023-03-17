import React, { PropsWithChildren } from 'react';
import { ButtonProps, Theme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, getOverlayAlpha, ThemeProvider } from '@mui/material/styles';
import { Color, palette, spacing } from '@spotify-clone/shared/ui';

const drawerWidth = 240;

const getHoverColor = (color: ButtonProps['color'] | 'default' = 'primary', theme: Theme) => {
  if (color === 'inherit' || color === 'default') return;
  const backgroundColor = theme.palette[color].main;
  return theme.palette[color][Color.isDark(backgroundColor) ? 'light' : 'dark'];
};

const darkTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ theme, ownerState: { color = 'primary' } }) => ({
          borderRadius: 360,
          fontWeight: 'normal',
          textTransform: 'none',
          ':hover': {
            backgroundColor: getHoverColor(color, theme),
          },
        }),
      },
      defaultProps: { size: 'large', variant: 'contained', disableElevation: true },
    },
    MuiCard: {
      defaultProps: { elevation: 1 },
      styleOverrides: {
        root: props => {
          const hoverColor = Color.alpha(
            props.theme.palette.mode === 'dark' ? '#fff' : 'black',
            getOverlayAlpha((props.ownerState.elevation ?? 1) * 2)
          );
          return {
            borderRadius: 8,
            ':hover':
              props.ownerState.component === 'a' || props.ownerState.onClick
                ? { backgroundImage: `linear-gradient(${hoverColor}, ${hoverColor})` }
                : undefined,
            textDecoration: 'none',
            boxShadow: props.theme.shadows[0],
          };
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        root: {
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        },
      },
    },
    MuiFab: {
      defaultProps: { color: 'primary' },
      styleOverrides: {
        root: ({ theme, ownerState: { color = 'primary' } }) => {
          return {
            color: theme.palette.background.paper,
            ':hover': {
              backgroundColor: getHoverColor(color, theme),
            },
          };
        },
      },
    },
  },
  palette,
  spacing: (value: number) => `${spacing(value)}px`,
});

export const UiProvider: React.FC<PropsWithChildren> = ({ children }) => (
  <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    {children}
  </ThemeProvider>
);
