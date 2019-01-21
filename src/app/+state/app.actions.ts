import { Alien } from '../+core';
import { SearchFilter } from '../search/models/SearchFilter';
import { Action } from '@ngrx/store';

export enum ActionTypes {
  GET_ALIENS = '[Alien] get aliens',
  GET_ALIENS_Failed = '[Alien] get aliens failed',
  ALIENS_GOT = '[Alien] get aliens success',
  DELETE_ALIEN = '[Alien] delete alien',
  DELETE_ALIEN_FAILED = '[Alien] delete alien failed',
  ALIEN_DELETED = '[Alien] delete alien success',
  NEW_ALIEN = '[Alien] new alien',
  NEW_ALIEN_FAILED = '[Alien] new alien failed',
  ALIEN_NEWED = '[Alien] new alien success',
  UPDATE_ALIEN = '[Alien] update alien',
  UPDATE_ALIEN_FAILED = '[Alien] update alien failed',
  ALIEN_UPDATED = '[Alien] update alien success'
}

export class GetAliens implements Action {
  readonly type = ActionTypes.GET_ALIENS;

  constructor(public payload: SearchFilter) {
  }
}

export class AliensGot implements Action {
  readonly type = ActionTypes.ALIENS_GOT;

  constructor(public payload: Alien[]) {
  }
}

export class GetAliensFailed implements Action {
  readonly type = ActionTypes.GET_ALIENS_Failed;

  constructor(public payload: any) {
  }
}

export class DeleteAlien implements Action {
  readonly type = ActionTypes.DELETE_ALIEN;

  constructor(public payload: number | Alien) {
  }
}

export class DeleteAlienFailed implements Action {
  readonly type = ActionTypes.DELETE_ALIEN_FAILED;

  constructor(public payload: string) {
  }
}

export class AlienDeleted implements Action {
  readonly type = ActionTypes.ALIEN_DELETED;

  constructor(public payload: number ) {
  }
}

export class NewAlien implements Action {
  readonly type = ActionTypes.NEW_ALIEN;

  constructor(public payload: Alien) {
  }
}

export class NewAlienFailed implements Action {
  readonly type = ActionTypes.NEW_ALIEN_FAILED;

  constructor(public payload: Alien) {
  }
}

export class AlienNewed implements Action {
  readonly type = ActionTypes.ALIEN_NEWED;

  constructor(public payload: Alien) {
  }
}

export class UpdateAlien implements Action {
  readonly type = ActionTypes.UPDATE_ALIEN;

  constructor(public payload: Alien) {
  }
}

export class UpdateAlienFailed implements Action {
  readonly type = ActionTypes.UPDATE_ALIEN_FAILED;

  constructor(public payload: Alien) {
  }
}

export class AlienUpdated implements Action {
  readonly type = ActionTypes.ALIEN_UPDATED;

  constructor(public payload: Alien) {
  }
}

export type AlienAction = GetAliens | DeleteAlien | NewAlien | UpdateAlien |
  AlienDeleted | AlienNewed | AlienUpdated | AliensGot |
  GetAliensFailed | DeleteAlienFailed | NewAlienFailed | UpdateAlienFailed;
