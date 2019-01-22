import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { AliensService } from 'src/app/+core';
import { SearchActions, SearchActionTypes, SearchAliensAction,
  SearchAliensSuccessAction, SearchAliensFailedAction, DeleteAlienAction,
  DeleteAlienSuccessAction, DeleteAlienFailedAction } from './search.actions';

@Injectable()
export class Effects {
  constructor(private alienService: AliensService, private actions$: Actions) {}

  @Effect()
  searchAliens$: Observable<SearchActions> = this.actions$.pipe(
    ofType<SearchAliensAction>(SearchActionTypes.SEARCH_ALIENS),
    switchMap(action => {
      const { name, gender, includeInactive } = action.payload;
      return this.alienService.getAliens(name, gender, includeInactive).pipe(
        map(aliens => new SearchAliensSuccessAction({ aliens, searchFilter: action.payload })),
        catchError(err => of(new SearchAliensFailedAction(err)))
      );
    })
  );

  @Effect()
  deleteAlien$: Observable<SearchActions> = this.actions$.pipe(
    ofType<DeleteAlienAction>(SearchActionTypes.DELETE_ALIEN),
    switchMap(action => this.alienService.deleteAlien(action.payload).pipe(
        map(() => new DeleteAlienSuccessAction(typeof action.payload === 'number' ? action.payload : action.payload.id)),
        catchError(err => of(new DeleteAlienFailedAction(err)))
      )
    )
  );
}
