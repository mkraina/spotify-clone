export const spacing = (value = 1) => value * 8;

export const palette = {
  mode: 'dark' as const,
  primary: {
    main: '#2da40a',
    light: 'rgb(87, 182, 59)',
    dark: 'rgb(31, 114, 7)',
    contrastText: '#fff',
  },
  secondary: {
    main: '#810AA4',
    light: 'rgb(154, 59, 182)',
    dark: 'rgb(90, 7, 114)',
    contrastText: '#fff',
  },
  common: { black: '#000', white: '#fff' },
  error: { main: '#f44336', light: '#e57373', dark: '#d32f2f', contrastText: '#fff' },
  warning: {
    main: '#ffa726',
    light: '#ffb74d',
    dark: '#f57c00',
    contrastText: 'rgba(0, 0, 0, 0.87)',
  },
  info: { main: '#29b6f6', light: '#4fc3f7', dark: '#0288d1', contrastText: 'rgba(0, 0, 0, 0.87)' },
  success: {
    main: '#66bb6a',
    light: '#81c784',
    dark: '#388e3c',
    contrastText: 'rgba(0, 0, 0, 0.87)',
  },
  grey: {
    '50': '#fafafa',
    '100': '#f5f5f5',
    '200': '#eeeeee',
    '300': '#e0e0e0',
    '400': '#bdbdbd',
    '500': '#9e9e9e',
    '600': '#757575',
    '700': '#616161',
    '800': '#424242',
    '900': '#212121',
    A100: '#f5f5f5',
    A200: '#eeeeee',
    A400: '#bdbdbd',
    A700: '#616161',
  },
  contrastThreshold: 3,
  tonalOffset: 0.2,
  text: {
    primary: '#fff',
    secondary: 'rgba(255, 255, 255, 0.7)',
    disabled: 'rgba(255, 255, 255, 0.5)',
    icon: 'rgba(255, 255, 255, 0.5)',
  },
  divider: 'rgba(255, 255, 255, 0.12)',
  background: { paper: '#121212', default: '#121212' },
  action: {
    active: '#fff',
    hover: 'rgba(255, 255, 255, 0.08)',
    hoverOpacity: 0.08,
    selected: 'rgba(255, 255, 255, 0.16)',
    selectedOpacity: 0.16,
    disabled: 'rgba(255, 255, 255, 0.3)',
    disabledBackground: 'rgba(255, 255, 255, 0.12)',
    disabledOpacity: 0.38,
    focus: 'rgba(255, 255, 255, 0.12)',
    focusOpacity: 0.12,
    activatedOpacity: 0.24,
  },
};
