import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AliensService, Alien, GenderOptions } from '../+core';
import { SearchFilter } from './models/SearchFilter';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  aliens: Alien[];

  loading = false;

  searchFilter = new SearchFilter(-1, true);

  genderOptions = GenderOptions;

  selectedAlien: Alien;

  cols: any[] = [
    { field: 'code', header: 'Code'},
    { field: 'name', header: 'Name'},
    { field: 'gender', header: 'Gender'},
    { field: 'active', header: 'Active'}
  ];

  constructor(private alienService: AliensService, private confirmService: ConfirmationService) { }

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

  deleteAlien() {
    this.confirmService.confirm({
      message: 'Are you sure that you want to delete this alien?',
      accept: () => {
        this.alienService.deleteAlien({ ...this.selectedAlien }).subscribe(alien => {
          this.aliens = this.aliens.filter(item => item.id !== this.selectedAlien.id);
        });
      }
    });
  }

  clear() {
    this.searchFilter.name = '';
    this.searchFilter.gender = -1;
    this.searchFilter.includeInActive = true;
  }

  // format gender to text based on its number
  formatGender(genderNum: number) {
    const genderOption = this.genderOptions.find(opt => opt.value === genderNum);
    if (genderOption) {
      return genderOption.name;
    }
    return '';
  }

}

