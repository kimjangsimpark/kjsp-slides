import { ReducerFn, useReducer } from './reducible';

export interface QueueEffect {
  index: number;
  type: string;
}

/**
 * interface QueueAction
 * queueIndex / actionType
 * #1 생성
 * #1 페이드 인
 * #2 건들이지 않음
 * #3 삭제
 * #3 페이드 아웃
 */

 export interface Shape {
  width: number;
  height: number;
  lineWidth: number;
  lineColor?: string;
}

export interface Position {
  x: number;
  y: number;
}

export interface Text {
  innerText: string;
  textColor: string;
}

export interface QueueObject {
  type: string; // 개체 타입 (모양)
  effects: QueueEffect[];
  shape: Shape, // 가로, 세로, 테두리, 테두리 색상, 배경 색상
  position: Position, // (x, y) 포지션
  text?: Text, // innerText, textColor
}

export interface Queue {
  index: number;
  objects: QueueObject[];
}

export type DocumentAction = DocumentNameChangeAction | DocumentChangeAction;

export interface DocumentNameChangeAction {
  type: 'changeName';
  documentName: string;
}

export interface DocumentChangeAction {
  type: 'changeDocument';
  state: DocumentState;
}

export interface DocumentRect {
  width: number;
  height: number;
}

export interface DocumentState {
  documentName: string;
  rect: DocumentRect;
  queues: Queue[];
}

const documentReducer: ReducerFn<DocumentState, DocumentAction> = (state, action) => {
  switch (action.type) {
    case 'changeName':
      return {
        ...state,
        documentName: action.documentName,
      }
    case 'changeDocument':
      return {
        ...action.state,
      }
    default:
      throw new Error('Unsupported DocumentState Action');
  }
}

export const [document$, documenrReducer] = useReducer<DocumentState, DocumentAction>({
  documentName: 'Document Name',
  rect: {
    width: 1920,
    height: 1080
  },
  queues: Array.from(new Array(100)).map((item, index) => ({
    index: index,
    objects: [{
      type: 'rectangle',
      identifier: 'dk3nfjk3hnbcj3jh434',
      rect: {
        x: 100,
        y: 200,
        width: 500,
        height: 300
      },
      effects: [
        {
          type: 'create',
          index: 1,
        },
        {
          type: 'fade-in',
          index: 1,
        },
        {
          type: 'fade-in',
          index: 2,
        },
        {
          type: 'transition',
          index: 3,
        },
        {
          type: 'transition',
          index: 3,
        },
        {
          type: 'delete',
          index: 4,
        },
      ],
      shape: {
        width: 200,
        height: 100,
        lineWidth: 1,
      },
      position: {
        x: 0,
        y: 0,
      },
    }]
  })),
}, documentReducer);
