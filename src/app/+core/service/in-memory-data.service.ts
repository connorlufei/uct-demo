import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService {

  constructor() { }

  createDb() {
    const aliens = [
      {
        code: 'AAA',
        name: 'AAA1',
        gender: 'male',
        active: true
      },
      {
        code: 'BBB',
        name: 'BBB1',
        gender: 'male',
        active: true
      },
      {
        code: 'CCC',
        name: 'CCC1',
        gender: 'male',
        active: true
      },
      {
        code: 'DDD',
        name: 'DDD1',
        gender: 'male',
        active: false
      },
      {
        code: 'EEE',
        name: 'EEE1',
        gender: 'male',
        active: false
      },
      {
        code: 'FFF',
        name: 'FFF1',
        gender: 'male',
        active: false
      },
      {
        code: 'GGG',
        name: 'GGG1',
        gender: 'male',
        active: false
      }
    ];
    return { aliens };
  }
}
