import React, { PropsWithChildren } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { theme } from '../ui/utils';

export const NavigationProvider = React.memo<PropsWithChildren>(({ children }) => (
  <NavigationContainer theme={theme}>{children}</NavigationContainer>
));
