import { Actions, Effect, ofType } from '@ngrx/effects';
import { AliensService, Alien } from 'src/app/+core';
import { Store, select, Action } from '@ngrx/store';
import { AppState } from '.';
import { DetailActionType, LoadAction, LoadSuccessAction,
  LoadFailedAction, SaveAction,
  SaveSuccessAction, SaveFailedAction, SaveNewAction, SaveCloseAction, ClearAction } from './detail.actions';
import { switchMap, withLatestFrom, catchError, map, mergeMap } from 'rxjs/operators';
import { of, Observable, from } from 'rxjs';
import { Injectable } from '@angular/core';
import { paramsSelectorFactory, urlPartsSelectorFactory, RouterGoAction } from 'src/app/+state';

@Injectable()
export class DetailEffects {

  @Effect() load$: Observable<Action>;
  @Effect() save$: Observable<Action>;
  @Effect() saveNew$: Observable<Action>;
  @Effect() saveClose$: Observable<Action>;

  constructor(
    private actions$: Actions,
    private aliensService: AliensService,
    private store: Store<AppState>
  ) {
    this.load$ = this.actions$.pipe(
      ofType<LoadAction>(DetailActionType.LOAD),
      withLatestFrom(this.store.pipe(select(urlPartsSelectorFactory(), 1)), this.store.pipe(select(paramsSelectorFactory(), 'id'))),
      switchMap(([, ops, id]) => {
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

    this.save$ = this.actions$.pipe(
      ofType(DetailActionType.SAVE),
      this.saveGo());
    this.saveNew$ = this.actions$.pipe(
      ofType(DetailActionType.SAVE_AND_NEW),
      this.saveGo(['/detail/new']));
    this.saveClose$ = this.actions$.pipe(
      ofType(DetailActionType.SAVE_AND_CLOSE),
      this.saveGo(['/search']));
  }

  private saveGo = (path?: any[]) =>
    (actions$: Observable<SaveAction | SaveNewAction | SaveCloseAction>) => {
      return actions$.pipe(
        withLatestFrom(this.store.pipe(select(urlPartsSelectorFactory(), 1))),
        switchMap(([action, ops]) => {
          const alien = action.payload;
          let obs: Observable<Alien>;
          if (ops === 'edit') {
            obs = this.aliensService.updateAlien(alien);
          } else if (ops === 'duplicate' || ops === 'new') {
            obs = this.aliensService.newAlien(alien);
          }
          const emitActions: Action[] = [new SaveSuccessAction(alien)];
          if (path) {
            emitActions.push(new RouterGoAction({ path }));
          }
          return obs.pipe(
            mergeMap(_ => from(emitActions)),
            catchError(err => {
              return of(new SaveFailedAction(err));
            })
          );
        })
      );
  }
}
