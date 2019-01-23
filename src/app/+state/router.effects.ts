import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { RouterActionTypes, RouterGoAction } from './router.actions';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class RouterEffects {

  constructor(private actions$: Actions, private router: Router) {}

  @Effect({ dispatch: false })
  go$ = this.actions$.pipe(
    ofType<RouterGoAction>(RouterActionTypes.GO),
    tap(action => {
      const { path, queryParams, extras } = action.payload;
      this.router.navigate(path, { queryParams, ...extras });
    })
  );
}
