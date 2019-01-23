import { Action } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

export enum RouterActionTypes {
  GO = '[Router] go'
}

export class RouterGoAction implements Action {
  readonly type = RouterActionTypes.GO;

  constructor(public payload: {
    path: any[],
    queryParams?: object,
    extras?: NavigationExtras
  }) {}
}

export type RouterActions = RouterGoAction;
