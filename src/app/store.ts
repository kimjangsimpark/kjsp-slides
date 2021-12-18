import { configureStore, createSlice } from '@reduxjs/toolkit';
import { documentSlice } from '../document/document.store';
import { objectControlPanelSlice } from '../object-control-panel/ObjectContolPanel';
import { objectPanelSlice } from '../object-panel/ObjectPanel.store';

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
    },
  },
});

export const store = configureStore({
  reducer: {
    document: documentSlice.reducer,
    counter: counterSlice.reducer,
    objectPanel: objectPanelSlice.reducer,
    objectControlPanel: objectControlPanelSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
