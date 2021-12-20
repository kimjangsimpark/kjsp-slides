import type { SelectorFn } from '@/app/hooks';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Document {
  documentName: string;
  rect: DocumentRect;
}

export interface DocumentRect {
  width: number;
  height: number;
}

export type DocumentState = Document | null;

export function documentSelector(): SelectorFn<DocumentState> {
  return state => state.document;
}

export const documentSlice = createSlice({
  name: 'document',
  initialState: null as DocumentState,
  reducers: {
    setDocument: (state, params: PayloadAction<DocumentState>) => {
      return params.payload;
    },
    renameDocument: (state, params: PayloadAction<string>) => {
      if (!state) {
        throw new Error('Document Not Loaded');
      }
      return {
        ...state,
        documentName: params.payload,
      }
    },
    resizeDocument: (state, params: PayloadAction<DocumentRect>) => {
      if (!state) {
        throw new Error('Document Not Loaded');
      }
      return {
        ...state,
        rect: params.payload,
      };
    }
  },
});
