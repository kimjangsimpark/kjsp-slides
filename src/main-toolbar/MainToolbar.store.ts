import { BehaviorSubject } from 'rxjs';

export interface MainToolbarState {
  type: 'open' | 'close';
}

export interface MainToolbarOpenAction {
  type: '' | '';
}

const MainToolbarSubject = new BehaviorSubject<any>(null);

export function mainToolbarReducer(): void {
  console.log(1);
}

export const MainToolbar$ = MainToolbarSubject.pipe();