import { ReducerFn, useReducer } from './reducible';

export interface QueueAction {
  type: string;
}

export interface QueueObject {
  type: string;
}

export interface Queue {
  index: number;
  actions: QueueAction[];
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

export interface DocumentState {
  documentName: string;
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
  queues: [{
    index: 0,
    actions: [],
    objects: []
  }]
}, documentReducer);
