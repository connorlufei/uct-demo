import { Alien } from '../+core';

export interface AppState {
  aliens: Alien[];
  selectedAlien: Alien;
}

export const initialState: AppState = {
  aliens: [],
  selectedAlien: null
};
