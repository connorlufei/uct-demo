import { Alien } from '../+core';
import { SearchFilter } from '../search/models/SearchFilter';
import { Action } from '@ngrx/store';

export enum ActionTypes {
  GET_ALIENS = 'get aliens',
  DELETE_ALIEN = 'delete alien',
  NEW_ALIEN = 'new alien',
  UPDATE_ALIEN = 'update alien'
}

export class GetAliens implements Action {
  readonly type = ActionTypes.GET_ALIENS;

  constructor(private payload: SearchFilter) {
  }
}

export class DeleteAlien implements Action {
  readonly type = ActionTypes.DELETE_ALIEN;

  constructor(private payload: string) {
  }
}

export class NewAlien implements Action {
  readonly type = ActionTypes.NEW_ALIEN;

  constructor(private payload: Alien) {
  }
}

export class UpdateAlien implements Action {
  readonly type = ActionTypes.UPDATE_ALIEN;

  constructor(private payload: Alien) {
  }
}

export type AlienAction = GetAliens | DeleteAlien | NewAlien | UpdateAlien;
