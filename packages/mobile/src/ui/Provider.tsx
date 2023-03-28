import React, { PropsWithChildren } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

import { theme } from './utils';

export const UiProvider = React.memo<PropsWithChildren>(({ children }) => {
  return <PaperProvider theme={theme}>{children}</PaperProvider>;
});
