import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { GenderOptions } from 'src/app/+core';

@Component({
  selector: 'app-detail-form',
  templateUrl: './detail-form.component.html',
  styleUrls: ['./detail-form.component.scss']
})
export class DetailFormComponent implements OnInit {

  @Input() alienForm: FormGroup;

  genderOptions = GenderOptions;

  constructor() { }

  ngOnInit() {
  }

}
