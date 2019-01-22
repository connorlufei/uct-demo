import { Component, OnInit } from '@angular/core';
import { AliensService, Alien, GenderOptions } from '../+core';
import { SearchFilter } from './models/SearchFilter';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState, selectors } from './+state';
import { SearchAliensAction, DeleteAlienAction } from './+state/search.actions';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  aliens$: Observable<Alien[]>;
  loading$: Observable<boolean>;

  searchFilter: SearchFilter;

  constructor(private confirmService: ConfirmationService,
    private router: Router,
    private store: Store<AppState>) { }

  ngOnInit() {
    this.loading$ = this.store.pipe(select(selectors.isLoadingSelector));
    this.aliens$ = this.store.pipe(select(selectors.aliensSelector));
    this.store.pipe(select(selectors.searchFilterSelector)).subscribe(filter => this.searchFilter = filter);
    this.store.dispatch(new SearchAliensAction(this.searchFilter));
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
    this.router.navigate(['/detail/new']);
  }

  editAlien(alien: Alien) {
    this.router.navigate(['/detail/edit', alien.id]);
  }

  duplicateAlien(alien: Alien) {
    this.router.navigate(['/detail/duplicate', alien.id]);
  }

}

