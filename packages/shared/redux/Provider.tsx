import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';

import { store } from './utils';

export const ReduxProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
