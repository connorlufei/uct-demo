import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { AliensService, Alien } from '../+core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { Message } from 'primeng/api';
import { Store, select } from '@ngrx/store';
import { RouterGoAction, urlPartsSelectorFactory } from '../+state';
import { AppState } from './+state';
import { map } from 'rxjs/operators';
import { LoadAction, SaveAction, SaveCloseAction, SaveNewAction } from './+state/detail.actions';
import { selectors } from './+state';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {

  actionName$: Observable<string>;

  msgs: Message[] = [];

  alien: Alien;

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
    private store: Store<AppState>) {
    }

  ngOnInit() {
    this.store.dispatch(new LoadAction());
    this.sub = this.store.pipe(select(selectors.alienSelector)).subscribe(alien => {
      this.alien = alien;
      this.alienForm.patchValue(alien);
    });
    this.actionName$ = this.store.pipe(select(urlPartsSelectorFactory(), 1));
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
    if (this.alienForm.valid) {
      this.store.dispatch(new SaveAction({...this.alien, ...this.alienForm.value}));
    } else {
      this.showValidationMsg();
    }
  }

  saveAndNew() {
    if (this.alienForm.valid) {
      this.store.dispatch(new SaveNewAction({...this.alien, ...this.alienForm.value}));
    } else {
      this.showValidationMsg();
    }
  }

  saveAndClose() {
    if (this.alienForm.valid) {
      this.store.dispatch(new SaveCloseAction({...this.alien, ...this.alienForm.value}));
    } else {
      this.showValidationMsg();
    }
  }

  cancel() {
    this.store.dispatch(new RouterGoAction({path: ['/search']}));
  }
}
