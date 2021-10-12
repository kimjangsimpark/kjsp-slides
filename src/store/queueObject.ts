import type { QueueAction, QueueEffect } from './document';
import { ReducerFn, useReducer } from './reducible';

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

// 단일 개체 선택만 가능한 상태
export interface QueueObjectState {
  type: string; // 개체 타입 (모양)
  actions: QueueAction[];
  effect: QueueEffect[];
  shape: Shape, // 가로, 세로, 테두리, 테두리 색상, 배경 색상
  position: Position, // (x, y) 포지션
  text?: Text, // innerText, textColor
}

export interface CurrentQueueObjectChangeAction {
  type: 'changeCurrentQueueObject';
  state: QueueObjectState;
}

export interface CurrentQueueObjectPositionChangeAction {
  type: 'changeCurrentQueueObjectPosition';
  position: Position;
}

export type CurrentQueObjectAction = CurrentQueueObjectChangeAction | CurrentQueueObjectPositionChangeAction;

const reducer: ReducerFn<QueueObjectState, CurrentQueObjectAction> = (state, action) => {
  switch (action.type) {
    case 'changeCurrentQueueObject':
      return {
        ...action.state,
      }
    case 'changeCurrentQueueObjectPosition':
      return {
        ...state,
        position: action.position,
      }
    default:
      throw new Error('Not Supported Current Queue Object Action');
  }
}

export const [
  currentQueObject$,
  currentQueObjectReducer
] = useReducer<QueueObjectState, CurrentQueObjectAction>({
  // test 초기 데이터
  type: 'rectangle',
  actions: [
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
  effect: [{ type: 'create' }, { type: 'move' }],
  shape: {
    width: 200,
    height: 100,
    lineWidth: 1,
  },
  position: {
    x: 0,
    y: 0,
  },
}, reducer);
