import { useMemo } from 'react';
import { useNavigationState, useRoute } from '@react-navigation/native';

export const useRouteIndexInStack = (): number => {
  const routes = useNavigationState(s => s.routes);
  const route = useRoute();

  return useMemo(() => routes.findIndex(r => r.key === route.key), [route.key, routes]);
};
