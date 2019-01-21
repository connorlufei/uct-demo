import { Alien } from '../+core';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState, appReducer } from './app.reducers';

export * from './app.reducers';
export * from './app.actions';
export * from './app.effects';

export interface State {
  app: AppState;
}

export const reducers: ActionReducerMap<State> = {
  app: appReducer
};

const getAppState = createFeatureSelector<AppState>('app');
const getAliens = createSelector(getAppState, state => state.aliens);

export const selectors =  { getAppState, getAliens };
