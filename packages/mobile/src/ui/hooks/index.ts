import { ColorKey, useTheme } from './useStyles';

export * from './useStyles';
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
export const useColor = (color: ColorKey) => useTheme().colors[color] ?? color;
