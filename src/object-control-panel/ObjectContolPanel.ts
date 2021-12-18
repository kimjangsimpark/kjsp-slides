import { createSlice, SliceCaseReducers } from '@reduxjs/toolkit';

export interface ObjectControlPanelPayload {
  type: string;
}

export const objectControlPanelSlice = createSlice<
  ObjectControlPanelPayload | null,
  SliceCaseReducers<ObjectControlPanelPayload | null>
>({
  name: 'objectControlPanel',
  initialState: null,
  reducers: {
    increment: (state, params) => {
      return state;
    },
    decrement: state => {
      return state;
    },
  },
});
