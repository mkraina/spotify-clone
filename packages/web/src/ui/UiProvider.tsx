import React, { PropsWithChildren } from 'react';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import { ButtonProps, Theme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { LinkProps } from '@mui/material/Link';
import { createTheme, getOverlayAlpha, ThemeProvider } from '@mui/material/styles';
import { TypographyStyleOptions } from '@mui/material/styles/createTypography';
import { Color, palette, spacing } from '@spotify-clone/shared/ui';

const drawerWidth = 240;

const getHoverColor = (color: ButtonProps['color'] | 'default' = 'primary', theme: Theme) => {
  if (color === 'inherit' || color === 'default') return;
  const backgroundColor = theme.palette[color].main;
  return theme.palette[color][Color.isDark(backgroundColor) ? 'light' : 'dark'];
};

const LinkBehavior = React.forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }
>((props, ref) => {
  const { href, ...other } = props;
  // Map href (MUI) -> to (react-router)
  return <RouterLink ref={ref} to={href} {...other} />;
});

const headlineStyle: TypographyStyleOptions = { color: palette.grey[50], fontWeight: 'bold' };

const darkTheme = createTheme({
  typography: {
    allVariants: { color: palette.grey[400] },
    h1: headlineStyle,
    h2: headlineStyle,
    h3: headlineStyle,
    h4: headlineStyle,
    h5: headlineStyle,
    h6: { ...headlineStyle, fontSize: 16 },
    body1: { fontSize: 14 },
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
    MuiSkeleton: { defaultProps: { animation: 'wave' } },
    MuiLink: {
      defaultProps: { underline: 'none', color: 'inherit', component: LinkBehavior } as LinkProps,
    },
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
    MuiBottomNavigation: {
      styleOverrides: {
        root: { width: '100%', bottom: 0, height: 100, backgroundColor: 'transparent' },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: ({ theme }) => ({
          ':hover': {
            '& .MuiSlider-track': { backgroundColor: theme.palette.primary.main },
            '& .MuiSlider-thumb': {
              height: theme.spacing(1.5),
              width: theme.spacing(1.5),
              backgroundColor: theme.palette.common.white,
            },
          },
        }),
        thumb: { backgroundColor: 'transparent' },
        track: ({ theme }) => ({
          height: theme.spacing(0.5),
          backgroundColor: theme.palette.common.white,
        }),
        rail: ({ theme }) => ({
          opacity: 0.5,
          height: theme.spacing(0.5),
          backgroundColor: theme.palette.common.white,
        }),
      },
    },
    MuiDrawer: {
      styleOverrides: {
        root: {
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            zIndex: 1,
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
            transition: 'transform 0.5s;',
            ':hover': {
              backgroundColor: getHoverColor(color, theme),
              transform: 'scale(1.05)',
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
