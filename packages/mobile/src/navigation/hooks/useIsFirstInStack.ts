import { useRouteIndexInStack } from './useRouteIndexInStack';

export const useIsFirstInStack = (): boolean => {
  return useRouteIndexInStack() === 0;
};
