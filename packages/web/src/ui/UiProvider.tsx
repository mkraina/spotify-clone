import React, { PropsWithChildren } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { palette, spacing } from '@spotify-clone/shared/ui';

const drawerWidth = 240;

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: { root: { borderRadius: 360, fontWeight: 'normal', textTransform: 'none' } },
      defaultProps: { size: 'large', variant: 'contained', disableElevation: true },
    },
    MuiCard: {
      styleOverrides: { root: { borderRadius: 16 } },
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
  },
  palette,
  spacing: (value: number) => `${spacing(value)}px`,
});

export const UiProvider: React.FC<PropsWithChildren> = ({ children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    {children}
  </ThemeProvider>
);