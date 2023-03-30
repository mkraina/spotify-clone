import { useNavigationState } from '@react-navigation/native';

import { useRouteIndexInStack } from './useRouteIndexInStack';

export const useIsFirstInStack = (): boolean => {
  const navigatorType = useNavigationState(state => state.type);
  return useRouteIndexInStack() === 0 || navigatorType === 'tab';
};
