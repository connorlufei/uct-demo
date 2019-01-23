import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { AliensService, Alien } from '../+core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { Message } from 'primeng/api';
import { Store, select } from '@ngrx/store';
import { AppState, RouterGoAction } from '../+state';
import { map } from 'rxjs/operators';
import { LoadAction } from './+state/detail.actions';
import { selectors } from './+state';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {

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

  sub: Subscription;

  constructor(
    private alienService: AliensService,
    private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(new LoadAction());
    this.sub = this.store.pipe(select(selectors.alienSelector)).subscribe(alien => {
      this.alienForm.patchValue(alien);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  validateGender(ctrl: AbstractControl): ValidationErrors | null {
    if (ctrl.value === -1) {
      return { empty: true };
    } else {
      return null;
    }
  }

  validate(ctrl: AbstractControl): Observable<ValidationErrors | null> {
    return this.alienService.isAlienCodeTaken(ctrl.value).pipe(map(isTaken => isTaken ? { isTaken: true } : null));
  }

  cancel() {
    this.store.dispatch(new RouterGoAction({
      path: ['/search']
    }));
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
  }

  saveAndNew() {
    this.newOrUpdate().subscribe(() => {
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
