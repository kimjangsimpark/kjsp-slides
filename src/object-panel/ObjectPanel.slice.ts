import { createSlice, SliceCaseReducers } from '@reduxjs/toolkit';

export interface ObjectPanelPayload {
  type: string;
}

export const objectPanelSlice = createSlice<
  ObjectPanelPayload | null,
  SliceCaseReducers<ObjectPanelPayload | null>
>({
  name: 'objectPanel',
  initialState: null,
  reducers: {
    increment: (state, params) => {
      return state;
    },
    decrement: state => {
      return state;
    }
  }
});
