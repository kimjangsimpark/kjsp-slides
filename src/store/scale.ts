import { BehaviorSubject } from 'rxjs';

export interface ScaleChangeAction {
  type: 'scaleChange',
  value: number;
}

const scale = new BehaviorSubject(0.6);

export const scaleReducer = (action: ScaleChangeAction): void => {
  const current = scale.getValue();
  if (current !== action.value) {
    scale.next(Math.max(action.value, 0));
  }
}

export const scale$ = scale.asObservable();