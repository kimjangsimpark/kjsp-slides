import { BehaviorSubject } from 'rxjs';

export interface QueueCreateEffect {
  index: number;
  type: 'create';
}

export interface QueueFadeInEffect {
  index: number;
  type: 'fade-in';
}

export interface QueueTransitionEffect {
  index: number;
  type: 'transition';
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

export interface QueueDeleteEffect {
  index: number;
  type: 'delete';
}

export type QueueEffect = QueueCreateEffect | QueueFadeInEffect | QueueTransitionEffect | QueueDeleteEffect;

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
  x: number;
  y: number;
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
  objects: QueueObject[];
}

const documentSubject = new BehaviorSubject<DocumentState>({
  documentName: 'Document Name',
  rect: {
    width: 1920,
    height: 1080
  },
  objects: [{
    type: 'rectangle',
    effects: [
      {
        type: 'create',
        index: 0,
      },
      {
        type: 'transition',
        index: 1,
        x: 50,
        y: 100,
        width: 500
      },
      {
        type: 'transition',
        index: 2,
        x: 50,
        y: 100,
      },
      {
        type: 'transition',
        index: 3,
        x: 50,
        y: 100,
      },
      {
        type: 'transition',
        index: 4,
        x: 110,
        y: 210,
        width: 300,
        height: 200
      },
      {
        type: 'delete',
        index: 5,
      },
    ],
    shape: {
      x: 100,
      y: 200,
      width: 200,
      height: 100,
      lineWidth: 1,
      lineColor: '#000000',
    },
    position: {
      x: 0,
      y: 0,
    },
  }, {
    type: 'rectangle',
    effects: [
      {
        type: 'create',
        index: 0,
      },
      {
        type: 'transition',
        index: 1,
        x: 900,
        y: 500,
      },
      {
        type: 'transition',
        index: 2,
        x: 1000,
        y: 300,
        width: 300,
        height: 200
      },
      {
        type: 'delete',
        index: 3,
      },
    ],
    shape: {
      x: 800,
      y: 600,
      width: 50,
      height: 50,
      lineWidth: 1,
      lineColor: '#000000',
    },
    position: {
      x: 0,
      y: 0,
    },
  }]
});

export const documentReducer = (action: DocumentAction): void => {
  const current = documentSubject.getValue();
  switch (action.type) {
    case 'changeName':
      documentSubject.next({
        ...current,
        documentName: action.documentName,
      });
      return;
    case 'changeDocument':
      documentSubject.next({
        ...action.state,
      });
      return;
    default:
      throw new Error('Unsupported DocumentState Action');
  }
}

export const document$ = documentSubject;
