import { ComponentProps } from 'react';

import { ApiProvider } from '../api';
import { LocalizationProvider } from '../i18n';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ProviderProps<T extends React.FC<any>> = Omit<ComponentProps<T>, 'children'>;

type Config = ProviderProps<typeof ApiProvider> & ProviderProps<typeof LocalizationProvider>;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const withSharedProvider = (App: React.FC, config: Config) => {
  return () => (
    <LocalizationProvider getLocale={config.getLocale}>
      <ApiProvider
        LoginPromptComponent={config.LoginPromptComponent}
        refreshAuthorization={config.refreshAuthorization}
      >
        <App />
      </ApiProvider>
    </LocalizationProvider>
  );
};
