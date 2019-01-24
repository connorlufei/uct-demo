export class Alien {
  id: number;
  code: string;
  name: string;
  gender: number;
  active: boolean;

  constructor() {
    this.gender = -1;
    this.code = '';
    this.name = '';
    this.active = false;
  }
}

export const GenderOptions = [
  {
    name: 'male',
    value: 0
  },
  {
    name: 'female',
    value: 1
  },
  {
    name: 'other',
    value: 2
  }
];
