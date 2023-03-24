import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserAuthorization } from '../../api/types';

export type AuthState = {
  authorization?: UserAuthorization;
};

const initialState: AuthState = {};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthorization: (state, action: PayloadAction<UserAuthorization>) => ({
      ...state,
      authorization: action.payload,
    }),
    clearAuthorization: state => ({ ...state, authorization: undefined }),
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
