import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AliensService, Alien } from '../+core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, Subscriber } from 'rxjs';
import { UniqueCodeValidatorService } from '../+core/service/unique-code-validator.service';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  actionName: string;

  id: number;

  msgs: Message[] = [];

  alienForm = new FormGroup({
    code: new FormControl('', {
      validators: Validators.required,
      asyncValidators: this.validate.bind(this),
      updateOn: 'blur'
    }),
    name: new FormControl('', [Validators.required]),
    gender: new FormControl(-1, this.validateGender.bind(this)),
    active: new FormControl(false)
  });

  constructor(private route: ActivatedRoute,
    private location: Location,
    private alienService: AliensService,
    private router: Router) { }

  ngOnInit() {
    console.log(this.route.snapshot);
    this.extractInfo();
  }

  validateGender(ctrl: AbstractControl): ValidationErrors | null {
    if (ctrl.value === -1) {
      return { empty: true };
    } else {
      return null;
    }
  }

  validate(ctrl: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.alienService.isAlienCodeTaken(ctrl.value).then(isTaken => {
      return isTaken ? { isTaken: true } : null;
    }).catch(err => null);
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

  // call aliens service method "new" or "update" based on action extracted from current route.
  newOrUpdate(): Observable<Alien> {
    if (this.alienForm.valid) {
      const alien: Alien = { ...this.alienForm.value };
      alien.gender = +alien.gender;

      if (this.actionName === 'edit') {
        alien.id = this.id;
        return this.alienService.updateAlien(alien);
      } else if (this.actionName === 'new' || this.actionName === 'duplicate') {
        return this.alienService.newAlien(alien);
      }
    } else {
      this.showValidationMsg();
      return Observable.create(suber => {
        suber.complete();
      });
    }
  }

  // hide "validation failed" message when user is about to input.
  focus() {
    this.hideValidationMsg();
  }

  showValidationMsg() {
    this.msgs = [{ severity: 'error', summary: 'validation failed' }];
  }

  hideValidationMsg() {
    this.msgs = [];
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
