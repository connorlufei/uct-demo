import { Action } from '@ngrx/store';
import { SearchFilter } from '../models/SearchFilter';
import { Alien } from 'src/app/+core';

export enum SearchActionTypes {
  SEARCH_ALIENS = '[Alien] get aliens',
  SEARCH_ALIENS_SUCCESS = '[Alien] get aliens success',
  SEARCH_ALIENS_Failed = '[Alien] get aliens failed',

  DELETE_ALIEN = '[Alien] delete alien',
  DELETE_ALIEN_SUCCESS = '[Alien] delete alien success',
  DELETE_ALIEN_FAILED = '[Alien] delete alien failed',
}

export class SearchAliensAction implements Action {
  readonly type = SearchActionTypes.SEARCH_ALIENS;

  constructor(public payload: SearchFilter) {
  }
}

export class SearchAliensSuccessAction implements Action {
  readonly type = SearchActionTypes.SEARCH_ALIENS_SUCCESS;

  constructor(public payload: {aliens: Alien[], searchFilter: SearchFilter}) {
  }
}

export class SearchAliensFailedAction implements Action {
  readonly type = SearchActionTypes.SEARCH_ALIENS_Failed;

  constructor(public payload: any) {
  }
}

export class DeleteAlienAction implements Action {
  readonly type = SearchActionTypes.DELETE_ALIEN;

  constructor(public payload: number | Alien) {
  }
}

export class DeleteAlienFailedAction implements Action {
  readonly type = SearchActionTypes.DELETE_ALIEN_FAILED;

  constructor(public payload: string) {
  }
}

export class DeleteAlienSuccessAction implements Action {
  readonly type = SearchActionTypes.DELETE_ALIEN_SUCCESS;

  constructor(public payload: number ) {
  }
}

export type SearchActions = SearchAliensAction | SearchAliensSuccessAction | SearchAliensFailedAction |
  DeleteAlienAction | DeleteAlienSuccessAction | DeleteAlienFailedAction;
