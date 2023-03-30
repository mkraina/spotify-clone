import React, { PropsWithChildren } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { navigationTheme } from '../ui/utils';

export const NavigationProvider = React.memo<PropsWithChildren>(({ children }) => (
  <NavigationContainer theme={navigationTheme}>{children}</NavigationContainer>
));
