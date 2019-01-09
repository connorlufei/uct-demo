import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-detail-action',
  templateUrl: './detail-action.component.html',
  styleUrls: ['./detail-action.component.scss']
})
export class DetailActionComponent implements OnInit {

  @Output() saveAlien = new EventEmitter();
  @Output() saveNewAlien = new EventEmitter();
  @Output() saveCloseAlien = new EventEmitter();
  @Output() cancelAlien = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  save() {
    this.saveAlien.emit();
  }

  saveAndClose() {
    this.saveCloseAlien.emit();
  }

  saveAndNew() {
    this.saveNewAlien.emit();
  }

  cancel() {
    this.cancelAlien.emit();
  }
}
