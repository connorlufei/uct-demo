import { Alien } from 'src/app/+core';
import { SearchFilter } from '../models/SearchFilter';
import { ActionReducer } from '@ngrx/store';
import { SearchActions, SearchActionTypes } from './search.actions';

export interface State {
  aliens: Alien[];
  searchFilter: SearchFilter;
  isLoading: boolean;
}

export const initialState: State = {
  aliens: [],
  searchFilter: new SearchFilter(-1, true),
  isLoading: false
};

export const getAliens = (state: State): Alien[] => state.aliens;
export const getSearchFilter = (state: State): SearchFilter => state.searchFilter;
export const getIsloading = (state: State): boolean => state.isLoading;

export const reducer: ActionReducer<State, SearchActions> = (state = initialState, action: SearchActions): State => {
  switch (action.type) {
    case SearchActionTypes.SEARCH_ALIENS:
      return { ...state, isLoading: true };

    case SearchActionTypes.SEARCH_ALIENS_SUCCESS:
      return { ...state, aliens: action.payload.aliens, searchFilter: action.payload.searchFilter, isLoading: false };

    case SearchActionTypes.SEARCH_ALIENS_Failed:
      return { ...state, isLoading: false };

    case SearchActionTypes.DELETE_ALIEN_SUCCESS:
      return { ...state, aliens: state.aliens.filter(alien => alien.id !== action.payload) };

    default:
      return state;
  }
};
