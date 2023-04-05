import { colord } from 'colord';

export const Color = {
  lighten: (color: string, ratio: number) => colord(color).lighten(ratio).toRgbString(),
  darken: (color: string, ratio: number) => colord(color).darken(ratio).toRgbString(),
  alpha: (color: string, alpha: number | string) =>
    colord(color).alpha(Number(alpha)).toRgbString(),
  isDark: (color: string) => colord(color).isDark(),
  isLight: (color: string) => colord(color).isLight(),
  random: () => `rgb(${[255, 255, 255].map(h => h * Math.random()).join(',')})`,
};
