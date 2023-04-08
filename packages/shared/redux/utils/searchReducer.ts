import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchResultItem } from 'spotify-types';

export type SearchState = {
  recentSearches: SearchResultItem[];
};

const initialState: SearchState = { recentSearches: [] };

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    addRecentSearch: (state, action: PayloadAction<SearchResultItem>) => ({
      ...state,
      recentSearches: [
        action.payload,
        ...state.recentSearches.filter(s => s.id !== action.payload.id),
      ],
    }),
    removeRecentSearch: (state, action: PayloadAction<{ id: string }>) => ({
      ...state,
      recentSearches: state.recentSearches.filter(s => s.id !== action.payload.id),
    }),
  },
});

export const searchActions = searchSlice.actions;
export const searchReducer = searchSlice.reducer;
