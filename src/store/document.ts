import { ReducerFn, useReducer } from './reducible';

export interface QueueAction {
  index: number;
  type: string;
}

export interface QueueObject {
  type: string;
  actions: QueueAction[];
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
    actions: [],
    objects: []
  })),
}, documentReducer);
