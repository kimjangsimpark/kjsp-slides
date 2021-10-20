import type { DocumentResponse } from '@/http/document';
import { BehaviorSubject } from 'rxjs';

export type DocumentAction = DocumentNameChangeAction | DocumentChangeAction;

export interface DocumentNameChangeAction {
  type: 'changeName';
  documentName: string;
}

export interface DocumentChangeAction {
  type: 'changeDocument';
  state: DocumentState;
}

export type DocumentState = DocumentResponse;

const documentSubject = new BehaviorSubject<DocumentState>({
  documentName: 'Document Name',
  rect: {
    width: 1920,
    height: 1080
  },
  objects: [{
    type: 'rectangle',
    uuid: 'asdkfl3n3',
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
  }, {
    type: 'rectangle',
    uuid: 'asdf3d3g',
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
