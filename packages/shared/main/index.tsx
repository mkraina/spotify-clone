import { ComponentProps } from 'react';

import { ApiProvider } from '../api';
import { LocalizationProvider } from '../i18n';

type Config = {
  getLocale: ComponentProps<typeof LocalizationProvider>['detect'];
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const withSharedProvider = (App: React.FC, config: Config) => {
  return () => (
    <ApiProvider>
      <LocalizationProvider detect={config.getLocale}>
        <App />
      </LocalizationProvider>
    </ApiProvider>
  );
};
