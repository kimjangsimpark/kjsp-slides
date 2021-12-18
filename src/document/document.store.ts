import type { SelectorFn } from '@/provider/provider';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Document {
  documentName: string;
  rect: DocumentRect;
  objects: DocumentObject[];
}

export interface DocumentRect {
  width: number;
  height: number;
}

export enum ObjectType {
  TEXTAREA = 'textrea',
  CIRCLE = 'circle',
  RECTANGLE = 'rectangle',
}

export interface ObjectBaseEffect {
  index: number;
  type: string;
}

export interface ObjectCreateEffect extends ObjectBaseEffect {
  index: number;
  type: 'create';
}

export interface ObjectFadeInEffect extends ObjectBaseEffect {
  index: number;
  type: 'fade-in';
}

export interface ObjectTransitionEffect extends ObjectBaseEffect {
  index: number;
  type: 'transition';
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

export interface ObjectDeleteEffect extends ObjectBaseEffect {
  index: number;
  type: 'delete';
}

export interface ObjectRect {
  x: number;
  y: number;
  width: number;
  height: number;
  lineType: string;
  lineWidth: number;
  lineColor: string;
}

export interface ObjectText {
  innerText: string;
  textColor: string;
}

export type ObjectEffect =
  | ObjectCreateEffect
  | ObjectFadeInEffect
  | ObjectTransitionEffect
  | ObjectDeleteEffect;

export interface RectangleObject {
  type: ObjectType.RECTANGLE; // 개체 타입 (모양)
  uuid: string; // 개체 고유 아이디 (문서 내에서 중복 X)
  shape: ObjectRect; // 가로, 세로, 테두리, 테두리 색상, 배경 색상
  effects: ObjectEffect[];
  text?: ObjectText; // innerText, textColor
}

export interface CircleObject {
  type: ObjectType.CIRCLE;
  uuid: string;
  shape: ObjectRect;
  effects: ObjectEffect[];
  text?: ObjectText;
}

export interface TextareaObject {
  type: ObjectType.TEXTAREA;
  uuid: string;
  shape: ObjectRect;
  effects: ObjectEffect[];
  text: ObjectText;
}

export type DocumentObject = RectangleObject | TextareaObject;

export type DocumentState = Document | null;

export function documentSelector(): SelectorFn<DocumentState> {
  return state => state.document;
}

export const documentSlice = createSlice({
  name: 'document',
  initialState: null as DocumentState,
  reducers: {
    setDocument: (
      state,
      params: PayloadAction<DocumentState>,
    ) => {
      return params.payload;
    },
  }
});
