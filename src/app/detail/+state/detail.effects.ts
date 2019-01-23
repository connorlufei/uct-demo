import { Actions, Effect, ofType } from '@ngrx/effects';
import { AliensService, Alien } from 'src/app/+core';
import { Store, select } from '@ngrx/store';
import { AppState } from '.';
import { DetailActionType, LoadAction, LoadSuccessAction, LoadFailedAction, DetailActions } from './detail.actions';
import { switchMap, withLatestFrom, catchError, map } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { paramsSelectorFactory, urlPartsSelectorFactory } from 'src/app/+state';
@Injectable()
export class DetailEffects {

  @Effect()
  load$: Observable<DetailActions>;

  constructor(
    private actions$: Actions,
    private aliensService: AliensService,
    private store: Store<AppState>
    ) {
      this.load$ = this.actions$.pipe(
        ofType<LoadAction>(DetailActionType.LOAD),
        withLatestFrom(this.store.pipe(select(urlPartsSelectorFactory(), 1)), this.store.pipe(select(paramsSelectorFactory(), 'id'))),
        switchMap(([, ops, id]) => {
          console.log('test', ops, id);
          if (ops === 'edit' || ops === 'duplicate') {
            return this.aliensService.getAlienById(id).pipe(
              map(alien => ops === 'edit' ? new LoadSuccessAction(alien) :
                new LoadSuccessAction(Object.assign({}, alien, { code: `copy of ${alien.code}` }))),
              catchError(err => of(new LoadFailedAction(err)))
            );
          } else {
            return of(new LoadSuccessAction(new Alien()));
          }
        })
      );
    }
}
