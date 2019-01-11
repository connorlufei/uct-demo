import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GenderOptions } from 'src/app/+core';

@Component({
  selector: 'app-detail-form',
  templateUrl: './detail-form.component.html',
  styleUrls: ['./detail-form.component.scss']
})
export class DetailFormComponent implements OnInit {

  @Input() alienForm: FormGroup;

  @Output() receiveFocus = new EventEmitter();

  genderOptions = GenderOptions;

  constructor() { }

  ngOnInit() {
  }

  focus() {
    this.receiveFocus.emit();
  }
}
