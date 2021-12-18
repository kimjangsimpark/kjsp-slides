import { configureStore, createSelector, createSlice, Store } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment: state => state + 1,
    decrement: state => state - 1
  }
});

export function configureAppStore(): Store {
  const store: Store = configureStore({
    reducer: {
      counter: counterSlice.reducer,
    },
  });

  createSelector
  return store;
}

