import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './authReducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const dispatch: AppDispatch = store.dispatch;
export const getState: () => AppState = store.getState;
