
import * as fromRouter from './router.reducers';
export * from './router.actions';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterEffects } from './router.effects';

// root state shape
export interface AppState {
  router: fromRouter.RouterState;
}

// root reducer
export const reducers: ActionReducerMap<AppState> = {
  router: fromRouter.routerReducer
};

// root selectors
export const routeSelector = createFeatureSelector<fromRouter.RouterState>('router');
export const paramsSelectorFactory = () =>
  createSelector(routeSelector, (state: fromRouter.RouterState, props: string) => state.state.params[props]);
export const queryParamsSelectorFactory = () =>
  createSelector(routeSelector, (state: fromRouter.RouterState, props: string) => state.state.queryParams[props]);
export const urlSelector = createSelector(routeSelector, state => state.state.url);
export const urlPartsSelectorFactory = () => createSelector(routeSelector,
  (state: fromRouter.RouterState, props: number) => state.state.urlParts[props]);

// root effects
export const effects = [ RouterEffects ];
