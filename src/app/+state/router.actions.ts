import { Action } from '@ngrx/store';

export enum RouterActionTypes {
  GO = '[Router] navigating'
}

export class RouterGoAction implements Action {
  readonly type = RouterActionTypes.GO;

  constructor(public payload: string) {}
}

export type RouterActions = RouterGoAction;
