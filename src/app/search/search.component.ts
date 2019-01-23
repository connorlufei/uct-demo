import { Component, OnInit, OnDestroy } from '@angular/core';
import { AliensService, Alien, GenderOptions } from '../+core';
import { SearchFilter } from './models/SearchFilter';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState, selectors } from './+state';
import { SearchAliensAction, DeleteAlienAction } from './+state/search.actions';
import { RouterGoAction } from '../+state';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  aliens$: Observable<Alien[]>;
  loading$: Observable<boolean>;

  searchFilter: SearchFilter;
  sub: Subscription;

  constructor(private confirmService: ConfirmationService,
    private store: Store<AppState>) { }

  ngOnInit() {
    this.loading$ = this.store.pipe(select(selectors.isLoadingSelector));
    this.aliens$ = this.store.pipe(select(selectors.aliensSelector));
    this.sub = this.store.pipe(select(selectors.searchFilterSelector)).subscribe(filter => this.searchFilter = filter);
    this.store.dispatch(new SearchAliensAction(this.searchFilter));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  search(searchFilter: SearchFilter) {
    this.store.dispatch(new SearchAliensAction(searchFilter));
  }

  deleteAlien(selectedAlien: Alien) {
    this.confirmService.confirm({
      message: 'Are you sure that you want to delete this alien?',
      accept: () => {
        this.store.dispatch(new DeleteAlienAction(selectedAlien.id));
      }
    });
  }

  newAlien() {
    this.store.dispatch(new RouterGoAction({
      path: ['/detail/new']
    }));
  }

  editAlien(alien: Alien) {
    this.store.dispatch(new RouterGoAction({
      path: ['/detail/edit', alien.id]
    }));
  }

  duplicateAlien(alien: Alien) {
    this.store.dispatch(new RouterGoAction({
      path: ['/detail/duplicate', alien.id]
    }));
  }

}

