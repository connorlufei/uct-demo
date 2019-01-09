import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Alien, GenderOptions } from 'src/app/+core';


const genderOptions = GenderOptions;
@Component({
  selector: 'app-search-table',
  templateUrl: './search-table.component.html',
  styleUrls: ['./search-table.component.scss']
})
export class SearchTableComponent implements OnInit {

  constructor() { }

  @Input() loading: boolean;
  @Input() aliens: Alien[];

  @Output() newALien = new EventEmitter();
  @Output() editALien = new EventEmitter<Alien>();
  @Output() duplicateALien = new EventEmitter<Alien>();
  @Output() deleteAlien = new EventEmitter<Alien>();
  @Output() refreshAlien = new EventEmitter();

  selectedAlien: Alien;

  cols: any[] = [
    { field: 'code', header: 'Code'},
    { field: 'name', header: 'Name'},
    { field: 'gender', header: 'Gender'},
    { field: 'active', header: 'Active'}
  ];

  ngOnInit() {
  }


  // format gender to text based on its number
  formatGender(genderNum: number) {
    const genderOption = genderOptions.find(opt => opt.value === genderNum);
    if (genderOption) {
      return genderOption.name;
    }
    return '';
  }

  clickEdit(alien: Alien) {
    this.editALien.emit(alien);
  }

  clickNew() {
    this.newALien.emit();
  }

  clickDuplicate(alien: Alien) {
    this.duplicateALien.emit(alien);
  }

  clickDelete(alien: Alien) {
    this.deleteAlien.emit(alien);
  }

  refresh() {
    this.refreshAlien.emit();
  }

}
