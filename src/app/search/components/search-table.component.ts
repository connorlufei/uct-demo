import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Alien, GenderOptions } from 'src/app/+core';
import { Observable } from 'rxjs';
import { map, combineLatest } from 'rxjs/operators';


const genderOptions = GenderOptions;
@Component({
  selector: 'app-search-table',
  templateUrl: './search-table.component.html',
  styleUrls: ['./search-table.component.scss']
})
export class SearchTableComponent implements OnInit {

  constructor() { }

  alienCount$: Observable<number>;
  tableText$: Observable<string>;

  @Input() loading$: Observable<boolean>;
  @Input() aliens$: Observable<Alien[]>;

  @Output() newAlien = new EventEmitter();
  @Output() editAlien = new EventEmitter<Alien>();
  @Output() duplicateAlien = new EventEmitter<Alien>();
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
    this.alienCount$ = this.aliens$.pipe(map(aliens => aliens.length));
    this.tableText$ = this.loading$.pipe(combineLatest(this.alienCount$),
      map(([loading, alienCount]) => loading ? 'retrieving...' : `${alienCount} results`)
    );
  }

  // format gender to text based on its number
  formatGender(genderNum: number) {
    const genderOption = genderOptions.find(opt => opt.value === genderNum);
    if (genderOption) {
      return genderOption.name;
    }
    return '';
  }

  clickEdit() {
    this.editAlien.emit(this.selectedAlien);
  }

  clickNew() {
    this.newAlien.emit();
  }

  clickDuplicate() {
    this.duplicateAlien.emit(this.selectedAlien);
  }

  clickDelete() {
    this.deleteAlien.emit(this.selectedAlien);
  }

  refresh() {
    this.refreshAlien.emit();
  }

}
