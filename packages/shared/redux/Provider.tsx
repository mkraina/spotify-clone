import { PropsWithChildren, useRef } from 'react';
import { Provider } from 'react-redux';
import { Storage } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import localStorage from 'redux-persist/lib/storage';

import { prepareStore } from './utils';

export const ReduxProvider: React.FC<
  PropsWithChildren & { encryptedStorage?: Storage; storage?: Storage }
> = ({ children, storage = localStorage, encryptedStorage = storage }) => {
  const persistedStore = useRef(prepareStore(storage, encryptedStorage));
  return (
    <Provider store={persistedStore.current.store}>
      <PersistGate loading={null} persistor={persistedStore.current.persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};
