export class SearchFilter {
  name: string;
  gender: number;
  includeInActive: boolean;

  constructor(gender: number, includeInactive: boolean) {
    this.gender = gender;
    this.includeInActive = includeInactive;
  }
}
