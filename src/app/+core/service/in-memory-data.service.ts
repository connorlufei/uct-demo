import { Injectable } from '@angular/core';
import { Alien } from '../models/alien.model';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService {

  constructor() { }

  createDb() {
    const aliens: Alien[] = [
      {
        id: 11,
        code: 'AAA',
        name: 'AAA1',
        gender: 0,
        active: true
      },
      {
        id: 12,
        code: 'BBB',
        name: 'BBB1',
        gender: 0,
        active: true
      },
      {
        id: 13,
        code: 'CCC',
        name: 'CCC1',
        gender: 0,
        active: true
      },
      {
        id: 14,
        code: 'DDD',
        name: 'DDD1',
        gender: 0,
        active: false
      },
      {
        id: 15,
        code: 'EEE',
        name: 'EEE1',
        gender: 1,
        active: false
      },
      {
        id: 16,
        code: 'FFF',
        name: 'FFF1',
        gender: 1,
        active: false
      },
      {
        id: 17,
        code: 'GGG',
        name: 'GGG1',
        gender: 1,
        active: false
      }
    ];
    return { aliens };
  }

  // generate id for new item
  genId(aliens: Alien[]): number {
    return aliens.length > 0 ? Math.max(...aliens.map(hero => hero.id)) + 1 : 11;
  }
}
