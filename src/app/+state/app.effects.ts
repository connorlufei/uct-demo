import { Injectable } from '@angular/core';
import { AliensService } from '../+core';
import { Observable, of } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ActionTypes, AlienAction, AliensGot, GetAliensFailed, GetAliens,
  UpdateAlien, AlienUpdated, UpdateAlienFailed, NewAlien, AlienNewed, NewAlienFailed,
  DeleteAlien, AlienDeleted, DeleteAlienFailed } from './app.actions';
import { switchMap, map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Effects {
  constructor(private alienService: AliensService, private actions$: Actions) {}

  @Effect()
  searchAliens$: Observable<AlienAction> = this.actions$.pipe(
    ofType<GetAliens>(ActionTypes.GET_ALIENS),
    switchMap(action => {
      const { name, gender, includeInactive } = action.payload;
      return this.alienService.getAliens(name, gender, includeInactive).pipe(
        map(aliens => new AliensGot(aliens)),
        catchError(err => of(new GetAliensFailed(err)))
      );
    })
  );

  @Effect()
  updateAliens$: Observable<AlienAction> = this.actions$.pipe(
    ofType<UpdateAlien>(ActionTypes.UPDATE_ALIEN),
    switchMap(action => this.alienService.updateAlien(action.payload).pipe(
        map(alien => new AlienUpdated(alien)),
        catchError(err => of(new UpdateAlienFailed(err)))
      )
    )
  );

  @Effect()
  newAlien$: Observable<AlienAction> = this.actions$.pipe(
    ofType<NewAlien>(ActionTypes.NEW_ALIEN),
    switchMap(action => this.alienService.newAlien(action.payload).pipe(
        map(alien => new AlienNewed(alien)),
        catchError(err => of(new NewAlienFailed(err)))
      )
    )
  );

  @Effect()
  deleteAlien$: Observable<AlienAction> = this.actions$.pipe(
    ofType<DeleteAlien>(ActionTypes.DELETE_ALIEN),
    switchMap(action => this.alienService.deleteAlien(action.payload).pipe(
        map(() => new AlienDeleted(typeof action.payload === 'number' ? action.payload : action.payload.id)),
        catchError(err => of(new DeleteAlienFailed(err)))
      )
    )
  );
}
