import type { SelectorFn } from '@/app/hooks';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { objectsByUUIDSelector } from './object.store';

const selectedUUIDSelector: SelectorFn<string[]> = state => state.selectedObjects;

export const selectedObjectsSelector = createSelector(
  [objectsByUUIDSelector(), selectedUUIDSelector],
  (objects, uuids) => {
    return uuids.map(uuid => {
      if (!objects[uuid]) {
        throw new Error(`UUID: ${uuid} object not found`);
      }
      return objects[uuid];
    })
  }
);

export const selectedObjectsSlice = createSlice({
  name: 'selectedObjects',
  initialState: [] as string[],
  reducers: {
    add: (state, params: PayloadAction<string>) => {
      const newState = [...state];
      newState.push(params.payload);
      return newState;
    },

    remove: (state, params: PayloadAction<string>) => {
      const newState = [...state];
      const index = newState.indexOf(params.payload);
      if (index !== -1) {
        newState.splice(index, 1);
      }
      return newState;
    },

    reset: () => {
      return [];
    }
  }
});

