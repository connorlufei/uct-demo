import { Component, OnInit } from '@angular/core';
import { AliensService, Alien, GenderOptions } from '../+core';
import { SearchFilter } from './models/SearchFilter';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState, GetAliens, DeleteAlien } from '../+state';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  aliens$: Observable<Alien[]>;

  loading$: Observable<boolean>;

  searchFilter: SearchFilter = new SearchFilter(-1, true);

  constructor(private alienService: AliensService,
    private confirmService: ConfirmationService,
    private router: Router,
    private store: Store<AppState>) { }

  ngOnInit() {
    this.aliens$ = this.store.select('app', 'aliens');
    this.loading$ = this.store.select('app', 'loading');
    // this.aliens$ = this.store.pipe(select(getAliens));
    this.store.dispatch(new GetAliens(new SearchFilter(-1, true)));
  }

  // sync parent and child component search filter
  syncFilter(filter?: SearchFilter) {
    if (filter) {
      Object.keys(filter).forEach(key => {
        this.searchFilter[key] = filter[key];
      });
    }
  }

  search(searchFilter?: SearchFilter) {
    this.syncFilter(searchFilter);
    this.store.dispatch(new GetAliens(searchFilter));
  }

  deleteAlien(selectedAlien: Alien) {
    this.confirmService.confirm({
      message: 'Are you sure that you want to delete this alien?',
      accept: () => {
        this.store.dispatch(new DeleteAlien(selectedAlien.id));
      }
    });
  }

  newAlien() {
    this.router.navigate(['/detail/new']);
  }

  editAlien(alien: Alien) {
    console.log('haha')
    this.router.navigate(['/detail/edit', alien.id]);
  }

  duplicateAlien(alien: Alien) {
    this.router.navigate(['/detail/duplicate', alien.id]);
  }

}

