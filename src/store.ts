import { ActionCreatorWithoutPayload, configureStore, createAction } from '@reduxjs/toolkit';

const increment = createAction('INCREMENT');
const decrement = createAction('DECREMENT');

export const reducer = (
  state = 0,
  action: ActionCreatorWithoutPayload,
): number => {
  switch (action.type) {
    case increment.type:
      return state + 1;
    case decrement.type:
      return state - 1;
    default:
      return state;
  }
}

export const store = configureStore({
  reducer: reducer
});
