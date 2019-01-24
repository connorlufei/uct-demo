import { Action } from '@ngrx/store';
import { Alien } from 'src/app/+core';

export enum DetailActionType {
  LOAD = '[detail] load alien',
  LOAD_SUCCESS = '[detail] load alien success',
  LOAD_FAILED = '[detail] load alien failed',
  SAVE = '[detail] save',
  SAVE_SUCCESS = '[detail] save alien success',
  SAVE_FAILED = '[detail] save alien failed',
  SAVE_AND_NEW = '[detail] save and new',
  SAVE_AND_CLOSE = '[detail] save and close',
  CANCEL = '[detail] cancel',
  CLEAR = '[detail] clear alien'
}

export class LoadAction implements Action {
  readonly type = DetailActionType.LOAD;
}

export class LoadSuccessAction implements Action {
  readonly type = DetailActionType.LOAD_SUCCESS;

  constructor(public payload: Alien) {}
}

export class LoadFailedAction implements Action {
  readonly type = DetailActionType.LOAD_FAILED;

  constructor(public payload: any) {}
}

export class SaveAction implements Action {
  readonly type = DetailActionType.SAVE;

  constructor(public payload: Alien) {}
}

export class SaveSuccessAction implements Action {
  readonly type = DetailActionType.SAVE_SUCCESS;

  constructor(public payload: Alien) {}
}

export class SaveFailedAction implements Action {
  readonly type = DetailActionType.SAVE_FAILED;

  constructor(public payload: any) {}
}

export class SaveNewAction implements Action {
  readonly type = DetailActionType.SAVE_AND_NEW;

  constructor(public payload: Alien) {}
}

export class SaveCloseAction implements Action {
  readonly type = DetailActionType.SAVE_AND_CLOSE;

  constructor(public payload: Alien) {}
}

export class CancelAction implements Action {
  readonly type = DetailActionType.CANCEL;
}

export class ClearAction implements Action {
  readonly type = DetailActionType.CLEAR;
}

export type DetailActions = LoadAction | LoadSuccessAction | LoadFailedAction |
  SaveAction | SaveNewAction | SaveCloseAction | CancelAction |
  SaveSuccessAction | SaveFailedAction | ClearAction;
