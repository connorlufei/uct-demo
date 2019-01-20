import { ActionReducer, Action } from '@ngrx/store';
import { AppState } from '.';

export const reducers: ActionReducer<AppState> = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    default:
      return state;
  }
};
