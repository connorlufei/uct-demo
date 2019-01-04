import { Component, OnInit } from '@angular/core';
import { AliensService, Alien, GenderOptions } from '../+core';
import { SearchFilter } from './models/SearchFilter';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private alienService: AliensService) { }

  aliens: Alien[];

  loading = false;

  searchFilter = new SearchFilter(-1, true);

  selected = false;

  genderOptions = GenderOptions;

  ngOnInit() {
    this.search();
  }

  search() {
    this.loading = true;
    this.alienService.getAliens(this.searchFilter.name, this.searchFilter.gender, this.searchFilter.includeInActive).subscribe(aliens => {
      this.aliens = aliens;
      this.loading = false;
    });
  }

  clear() {
    this.searchFilter.name = '';
    this.searchFilter.gender = -1;
    this.searchFilter.includeInActive = true;
  }

  formatGender(genderNum: number) {
    const genderOption = this.genderOptions.find(opt => opt.value === genderNum);
    if (genderOption) {
      return genderOption.name;
    }
    return '';
  }

  // actions new
  newAlien() {
    console.log('haha');
  }

}

