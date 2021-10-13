import type { Position, QueueObject } from './document';
import { ReducerFn, useReducer } from './reducible';

export interface CurrentQueueObjectChangeAction {
  type: 'changeCurrentQueueObject';
  state: QueueObject;
}

export interface CurrentQueueObjectPositionChangeAction {
  type: 'changeCurrentQueueObjectPosition';
  position: Position;
}

export interface CurrentQueueObjectResetAction {
  type: 'resetCurrentQueueObject';
}

export type CurrentQueObjectAction = CurrentQueueObjectChangeAction | CurrentQueueObjectPositionChangeAction | CurrentQueueObjectResetAction;

const reducer: ReducerFn<QueueObject | null, CurrentQueObjectAction> = (state, action) => {
  switch (action.type) {
    case 'changeCurrentQueueObject':
      return {
        ...action.state
      };
    case 'changeCurrentQueueObjectPosition':
      if (!state) {
        throw new Error('Current Queue Object Not Detected');
      } else {
        return {
          ...state,
          position: action.position,
        }
      }
    case 'resetCurrentQueueObject':
      return null;
    default:
      throw new Error('Not Supported Current Queue Object Action');
  }
}

export const [
  currentQueObject$,
  currentQueObjectReducer
] = useReducer<QueueObject | null, CurrentQueObjectAction>(null, reducer);
