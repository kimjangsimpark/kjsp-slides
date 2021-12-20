import type { SelectorFn } from '@/app/hooks';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export function currentQueueIndexSelector(): SelectorFn<number> {
  return state => state.currentQueueIndex;
}

export const queueIndexSlice = createSlice({
  initialState: 0,
  name: 'queue',
  reducers: {
    next: state => state + 1,
    set: (state, params: PayloadAction<number>) => params.payload,
    previous: state => state - 1,
  },
});
