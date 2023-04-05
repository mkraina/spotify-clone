import React, { PropsWithChildren } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { navigationTheme } from '../ui/utils';

import { navigationRef } from './utils';

export const NavigationProvider = React.memo<PropsWithChildren>(({ children }) => (
  <NavigationContainer ref={navigationRef} theme={navigationTheme}>
    {children}
  </NavigationContainer>
));
