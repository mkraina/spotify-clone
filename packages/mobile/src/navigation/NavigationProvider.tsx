import React, { PropsWithChildren } from 'react';
import { NavigationContainer } from '@react-navigation/native';

export const NavigationProvider = React.memo<PropsWithChildren>(({ children }) => (
  <NavigationContainer>{children}</NavigationContainer>
));
