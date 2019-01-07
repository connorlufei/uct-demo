import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GenderOptions, AliensService, Alien } from '../+core';
import { Location } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  actionName: string;

  genderOptions = GenderOptions;

  alienForm = new FormGroup({
    code: new FormControl(''),
    name: new FormControl(''),
    gender: new FormControl(-1),
    active: new FormControl(false)
  });

  constructor(private route: ActivatedRoute, private location: Location, private alienService: AliensService) { }

  ngOnInit() {
    console.log(this.route.snapshot);
    this.extractInfo();
  }

  // extract infos from current route such as operation and duplicated id
  extractInfo() {
    this.actionName = this.route.snapshot.url[0].path;
  }

  cancel() {
    this.location.back();
  }

  newAlien(): Observable<Alien> {
    const alien: Alien = { ...this.alienForm.value };
    alien.gender = +alien.gender;
    return this.alienService.newAlien(alien);
  }

  save() {
    this.newAlien().subscribe();
  }

  saveAndClose() {
    this.newAlien().subscribe(() => {
      this.location.back();
    });
  }

  saveAndNew() {
    this.newAlien().subscribe(() => {
      this.clearField();
    });
  }

  clearField() {
    this.alienForm.setValue({
      code: '',
      name: '',
      gender: -1,
      active: false
    });
  }
}
