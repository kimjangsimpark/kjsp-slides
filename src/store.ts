import { configureStore, createSelector, createSlice, Store } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment: state => {
      console.log('mutated', state);
      return state + 1;
    },
    decrement: state => {
      return state - 1;
    }
  }
});

export function configureAppStore(): Store {
  const store: Store = configureStore({
    reducer: {
      counter: counterSlice.reducer,
    },
  });
  return store;
}
