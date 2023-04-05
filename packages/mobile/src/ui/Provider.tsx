import React, { PropsWithChildren } from 'react';
// eslint-disable-next-line no-restricted-imports
import { Provider as PaperProvider } from 'react-native-paper';
import { Settings } from 'react-native-paper/lib/typescript/src/core/settings';

import { Icon, IconName } from './components/Icon';
import { theme } from './utils';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNativePaper {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface IconSourceMap extends Record<IconName, unknown> {}
  }
}

const settings: Settings = {
  icon: props => <Icon {...props} name={props.name as IconName} color={props.color as undefined} />,
};

export const UiProvider = React.memo<PropsWithChildren>(({ children }) => {
  return (
    <PaperProvider theme={theme} settings={settings}>
      {children}
    </PaperProvider>
  );
});
