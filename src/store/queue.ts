import { document$, DocumentState, Queue } from './document';
import { ReducerFn, useReducer } from './reducible';

export interface CurrentQueueState {
  queue?: Queue;
}

export interface ChangeCurrentQueueAction {
  type: 'changeCurrentQueue';
  index: number;
}

export type CurrentQueueAction = ChangeCurrentQueueAction;

const reducer: ReducerFn<CurrentQueueState, CurrentQueueAction> = (state, action) => {
  switch (action.type) {
    case 'changeCurrentQueue':
      return {
        ...state,
        queue: documentState.queues[action.index],
      };
    default:
      throw new Error('Not Supported Current Queue Action');
  }
}

export const [
  currentQueue$,
  currentQueueReducer
] = useReducer<CurrentQueueState, CurrentQueueAction>({}, reducer);

let documentState: DocumentState;
document$.subscribe(state => {
  documentState = state;
  currentQueueReducer({
    type: 'changeCurrentQueue',
    index: 0
  });
});