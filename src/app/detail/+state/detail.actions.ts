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
  CANCEL = '[detail] cancel'
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
}

export class SaveCloseAction implements Action {
  readonly type = DetailActionType.SAVE_AND_CLOSE;
}

export class CancelAction implements Action {
  readonly type = DetailActionType.CANCEL;
}

export type DetailActions = LoadAction | LoadSuccessAction | LoadFailedAction |
  SaveAction | SaveNewAction | SaveCloseAction | CancelAction |
  SaveSuccessAction | SaveFailedAction;
