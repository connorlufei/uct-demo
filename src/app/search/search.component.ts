import { Component, OnInit } from '@angular/core';
import { AliensService, Alien, GenderOptions } from '../+core';
import { SearchFilter } from './models/SearchFilter';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  aliens: Alien[];

  loading = false;

  searchFilter: SearchFilter = new SearchFilter(-1, true);

  constructor(private alienService: AliensService, private confirmService: ConfirmationService, private router: Router) { }

  ngOnInit() {
    this.search();
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
    this.loading = true;
    this.alienService.getAliens(this.searchFilter.name, this.searchFilter.gender, this.searchFilter.includeInactive).subscribe(aliens => {
      this.aliens = aliens;
      this.loading = false;
    });
  }

  deleteAlien(selectedAlien: Alien) {
    this.confirmService.confirm({
      message: 'Are you sure that you want to delete this alien?',
      accept: () => {
        this.alienService.deleteAlien({ ...selectedAlien }).subscribe(alien => {
          this.aliens = this.aliens.filter(item => item.id !== selectedAlien.id);
        });
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

