import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  id: number;

  alienForm = new FormGroup({
    code: new FormControl(''),
    name: new FormControl(''),
    gender: new FormControl(-1),
    active: new FormControl(false)
  });

  constructor(private route: ActivatedRoute, private location: Location, private alienService: AliensService, private router: Router) { }

  ngOnInit() {
    console.log(this.route.snapshot);
    this.extractInfo();
  }

  // extract infos from current route such as operation and duplicated id
  extractInfo() {
    this.actionName = this.route.snapshot.url[0].path;
    if (this.actionName === 'duplicate' || this.actionName === 'edit') {
      this.id = +this.route.snapshot.paramMap.get('id');
      this.alienService.getAlienById(this.id).subscribe(alien => {
        if (this.actionName === 'duplicate') {
          alien.code = `copy of ${alien.code}`;
        }
        this.alienForm.patchValue(alien);
      });
    }
  }

  cancel() {
    this.location.back();
  }

  newOrUpdate(): Observable<Alien> {
    const alien: Alien = { ...this.alienForm.value };
    alien.gender = +alien.gender;

    if (this.actionName === 'edit') {
      alien.id = this.id;
      return this.alienService.updateAlien(alien);
    } else if (this.actionName === 'new' || this.actionName === 'duplicate') {
      return this.alienService.newAlien(alien);
    }
  }

  save() {
    this.newOrUpdate().subscribe();
  }

  saveAndClose() {
    this.newOrUpdate().subscribe(() => {
      this.location.back();
    });
  }

  saveAndNew() {
    this.newOrUpdate().subscribe(() => {
      this.clearField();
      this.router.navigate(['detail/new']);
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
