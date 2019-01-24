import { Alien } from 'src/app/+core';
import { DetailActions, DetailActionType } from './detail.actions';

export interface State {
  alien: Alien;
}

const initialState: State = {
  alien: new Alien()
};

export function reducer(state = initialState, action: DetailActions): State {
  switch (action.type) {
    case DetailActionType.LOAD_SUCCESS:
    case DetailActionType.SAVE_SUCCESS:
      return {
        ...state,
        alien: action.payload
      };

    case DetailActionType.CLEAR:
      return {
        ...state,
        alien: new Alien()
      };

    default:
      return state;
  }
}

export const getAlien = (state: State) => state.alien;
