import { Alien } from '../+core';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState, appReducer } from './router.reducers';
import { RouterState } from '@angular/router';

export * from './router.reducers';
export * from './router.actions';
export * from './router.effects';

export interface State {
  router: RouterState;
}
