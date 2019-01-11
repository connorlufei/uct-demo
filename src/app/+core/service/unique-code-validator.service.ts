import { Injectable } from '@angular/core';
import { AsyncValidator, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { AliensService } from './aliens.service';

@Injectable({
  providedIn: 'root'
})
export class UniqueCodeValidatorService implements AsyncValidator {

  constructor(private aliensService: AliensService) { }

  validate(ctrl: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    console.log('running');
    return this.aliensService.isAlienCodeTaken(ctrl.value).then(isTaken => {
      return isTaken ? { isTaken: true } : null;
    }).catch(err => null);
  }

}
