import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GenderOptions } from 'src/app/+core';
import { SearchFilter } from '../models/SearchFilter';

@Component({
  selector: 'app-search-area',
  templateUrl: './search-area.component.html',
  styleUrls: ['./search-area.component.scss']
})
export class SearchAreaComponent implements OnInit {

  @Output() search = new EventEmitter<SearchFilter>();

  searchFilter = new SearchFilter(-1, true);

  genderOptions = GenderOptions;

  constructor() { }

  ngOnInit() {
  }

  clickSearch() {
    this.search.emit(this.searchFilter);
  }

  clickClear() {
    this.searchFilter.name = '';
    this.searchFilter.gender = -1;
    this.searchFilter.includeInactive = true;
  }
}
