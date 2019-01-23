import * as fromDetail from './detail.reducer';
import * as fromRoot from 'src/app/+state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DetailEffects } from './detail.effects';

// feature state
export interface AppState extends fromRoot.AppState {
  detail: fromDetail.State;
}

// feature reducer
export const reducer = fromDetail.reducer;

// feature seletors
export const detailSelector = createFeatureSelector('detail');
const alienSelector = createSelector(detailSelector, fromDetail.getAlien);
export const selectors = { alienSelector };

// feature effects
export const effects = [ DetailEffects ];
