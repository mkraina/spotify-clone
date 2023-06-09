import { ComponentProps } from 'react';

import { ApiProvider } from '../api';
import { LocalizationProvider } from '../i18n';
import { ReduxProvider } from '../redux';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ProviderProps<T extends React.FC<any>> = Omit<ComponentProps<T>, 'children'>;

type Config = ProviderProps<typeof ReduxProvider> &
  ProviderProps<typeof ApiProvider> &
  ProviderProps<typeof LocalizationProvider>;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const withSharedProvider = (App: React.FC, config: Config) => {
  return () => (
    <ReduxProvider {...config}>
      <LocalizationProvider {...config}>
        <ApiProvider {...config}>
          <App />
        </ApiProvider>
      </LocalizationProvider>
    </ReduxProvider>
  );
};
