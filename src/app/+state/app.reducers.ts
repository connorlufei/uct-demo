import { ActionReducer, Action, ActionReducerMap } from '@ngrx/store';
import { ActionTypes, AliensGot, AlienDeleted, AlienUpdated } from './app.actions';
import { Alien } from '../+core';



export interface AppState {
  aliens: Alien[];
  selectedAlien: Alien;
  loading: boolean;
}

export const initialState: AppState = {
  aliens: [],
  selectedAlien: null,
  loading: false
};

export const appReducer: ActionReducer<AppState> = (state: AppState = initialState, action: Action): AppState => {
  switch (action.type) {
    case ActionTypes.ALIENS_GOT:
      const nState = Object.assign({}, state, { aliens: (<AliensGot>action).payload, loading: false });
      return nState;
    case ActionTypes.ALIEN_DELETED:
      return Object.assign({}, state, { aliens: state.aliens.filter(item => (<AlienDeleted>action).payload !== item.id) });
    case ActionTypes.ALIEN_NEWED:
      return Object.assign({}, state, { aliens: [...state.aliens, (<AliensGot>action).payload] });
    case ActionTypes.ALIEN_UPDATED:
      return Object.assign({}, state, { aliens: [state.aliens.filter(item => (<AlienUpdated>action).payload.id !== item.id),
        (<AliensGot>action).payload] });
    case ActionTypes.GET_ALIENS:
      return { ...state, loading: true };
    default:
      return state;
  }
};
