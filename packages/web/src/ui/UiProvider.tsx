import React, { PropsWithChildren } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: { root: { borderRadius: 360 } },
      defaultProps: { variant: 'contained', disableElevation: true },
    },
  },
  palette: {
    mode: 'dark',
    primary: { main: '#2da40a' },
    secondary: { main: '#810AA4' },
  },
});

export const UiProvider: React.FC<PropsWithChildren> = ({ children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    {children}
  </ThemeProvider>
);
