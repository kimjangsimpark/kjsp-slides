import type { SelectorFn } from '@/app/hooks';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DocumentObject, objectsByUUIDSelector } from './object.store';

const selectedUUIDSelector: SelectorFn<string[]> = state => state.selectedObjects;

export const selectedObjectsSelector = (): SelectorFn<DocumentObject[]> => {
  return state => {
    const uuids = selectedUUIDSelector(state);
    const objects = objectsByUUIDSelector()(state);
    return uuids.map(uuid => {
      if (!objects[uuid]) {
        throw new Error(`UUID: ${uuid} object not found`);
      }
      return objects[uuid];
    });
  }
}

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

    set: (state, params: PayloadAction<string[]>) => {
      return [...params.payload];
    },

    reset: () => {
      return [];
    }
  }
});

