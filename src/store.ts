import { configureStore, createSlice, Store } from '@reduxjs/toolkit';
import { objectControlPanelSlice } from './object-control-panel/ObjectContolPanel';
import { objectPanelSlice } from './object-panel/ObjectPanel.store';

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
      objectPanel: objectPanelSlice.reducer,
      objectControlPanel: objectControlPanelSlice.reducer,
    },
  });
  return store;
}
