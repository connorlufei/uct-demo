export class SearchFilter {
  name: string;
  gender: number;
  includeInactive: boolean;

  constructor(gender: number, includeInactive: boolean) {
    this.gender = gender;
    this.includeInactive = includeInactive;
  }
}
