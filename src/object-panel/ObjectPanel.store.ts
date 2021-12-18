import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ObjectPanelPayload {
  type: string;
}

export type ObjectPanelStateType = ObjectPanelPayload | null;

export function objectPanelSelector() {
  return (state: any): ObjectPanelStateType => {
    return state.objectPanel as ObjectPanelStateType;
  }
}

export const objectPanelSlice = createSlice({
  name: 'objectPanel',
  initialState: null as ObjectPanelStateType,
  reducers: {
    create: (
      state,
      params: PayloadAction<ObjectPanelStateType>
    ) => {
      return {
        ...state,
        ...params,
      };
    },
  }
});
