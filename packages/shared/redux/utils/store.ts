import { combineReducers, configureStore, Dispatch, Reducer } from '@reduxjs/toolkit';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { Persistor, persistReducer, persistStore, Storage } from 'redux-persist';

import { authActions, authReducer, AuthState } from './authReducer';
import { searchActions, searchReducer, SearchState } from './searchReducer';
import { tracksActions, tracksReducer, TracksState } from './tracksReducer';

export const appActions = { ...authActions, ...searchActions, ...tracksActions };

type AppActions = typeof appActions;
type AppAction = ReturnType<AppActions[keyof AppActions]>;
export type AppState = { auth: AuthState; search: SearchState; tracks: TracksState };
export type AppDispatch = Dispatch<AppAction>;

type Reducers = { [K in keyof AppState]: Reducer<AppState[K]> };
type ReducersConfig = {
  [K in keyof AppState]: {
    persist: boolean;
    reducer: Reducer<AppState[K]>;
    blacklist?: (keyof AppState[K])[];
    encrypt?: boolean;
  };
};

const reducersConfig: ReducersConfig = {
  auth: { reducer: authReducer, persist: true, encrypt: true },
  search: { reducer: searchReducer, persist: true },
  tracks: { reducer: tracksReducer, persist: false },
};

let persistedStore: { persistor: Persistor; store: ToolkitStore } | undefined;
export const prepareStore = (
  storage: Storage,
  encryptedStorage: Storage
): NonNullable<typeof persistedStore> => {
  if (persistedStore) return persistedStore;

  const reducers = Object.entries(reducersConfig).reduce(
    (acc, [key, { reducer, blacklist, persist, encrypt }]) => {
      return {
        ...acc,
        [key]: persist
          ? persistReducer<unknown>(
              { key, storage: encrypt ? encryptedStorage : storage, blacklist },
              reducer as Reducer<unknown>
            )
          : reducer,
      };
    },
    {} as Reducers
  );
  const rootReducer = combineReducers<AppState>(reducers);

  const store = configureStore({ reducer: rootReducer, middleware: [] });

  const persistor = persistStore(store);
  persistedStore = { store, persistor };
  return persistedStore;
};

const getStore = (): ToolkitStore => {
  if (!persistedStore) {
    throw Error('Store not initialized yet');
  }
  return persistedStore.store;
};

export const dispatch: AppDispatch = action => getStore().dispatch(action);
export const getState = (): AppState => getStore().getState();
