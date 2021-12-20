import type { SelectorFn } from '@/app/hooks';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export function currentQueueRangeSelector(): SelectorFn<number[]> {
  return state => {
    const index = state.currentQueueIndex;
    const result: number[] = [];
    let start = Math.max(index - 2, 0);
    while (result.length < 5) {
      result.push(start++);
    }
    return result;
  };
}

export function currentQueueIndexSelector(): SelectorFn<number> {
  return state => state.currentQueueIndex;
}

export const queueIndexSlice = createSlice({
  initialState: 0,
  name: 'queue',
  reducers: {
    next: state => Math.max(state + 1, 0),
    set: (state, params: PayloadAction<number>) => Math.max(params.payload, 0),
    previous: state => Math.max(state - 1, 0),
  },
});
