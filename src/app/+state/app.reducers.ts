import { ActionReducer, Action, ActionReducerMap } from '@ngrx/store';
import { ActionTypes, AliensGot, AlienDeleted, AlienUpdated, AlienAction } from './app.actions';
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

export const appReducer: ActionReducer<AppState> = (state: AppState = initialState, action: AlienAction): AppState => {
  switch (action.type) {
    case ActionTypes.ALIENS_GOT:
      return { ...state, aliens: action.payload, loading: false };

    case ActionTypes.ALIEN_DELETED:
      return { ...state, aliens: state.aliens.filter(item => action.payload !== item.id) };

    case ActionTypes.ALIEN_NEWED:
      return { ...state, aliens: [...state.aliens, action.payload] };

    case ActionTypes.ALIEN_UPDATED:
      return { ...state, aliens: [...state.aliens.filter(item => (<AlienUpdated>action).payload.id !== item.id),
        action.payload] };

    case ActionTypes.GET_ALIENS:
      return { ...state, loading: true };

    default:
      return state;
  }
};
