import * as fromRoot from 'src/app/+state';
import * as fromSearch from './search.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Effects } from './search.effects';

// feature state
export interface AppState extends fromRoot.AppState {
  search: fromSearch.State;
}

// feature reducer
export const reducer = fromSearch.reducer;

// feature selector
const searchStateSeletor = createFeatureSelector<fromSearch.State>('search');
const aliensSelector = createSelector(searchStateSeletor, fromSearch.getAliens);
const searchFilterSelector = createSelector(searchStateSeletor, fromSearch.getSearchFilter);
const isLoadingSelector = createSelector(searchStateSeletor, fromSearch.getIsloading);
export const selectors = {
  searchStateSeletor, aliensSelector, searchFilterSelector, isLoadingSelector
};

// feature effects
export const effects = [Effects];
