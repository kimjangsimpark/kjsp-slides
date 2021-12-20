import type { SelectorFn } from '@/app/hooks';
import { createSlice } from '@reduxjs/toolkit';

export const scaleSelector = (): SelectorFn<number> => {
  return state => state.scale;
}

export const scaleSlice = createSlice({
  name: 'scale',
  initialState: 1,
  reducers: {
    increase: (state) => {
      return state += 0.1;
    },
    decrease: (state) => {
      return Math.max(state - + 0.1, 0.1);
    }
  }
})