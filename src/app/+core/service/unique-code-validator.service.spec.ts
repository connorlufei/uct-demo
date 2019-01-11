import { TestBed } from '@angular/core/testing';

import { UniqueCodeValidatorService } from './unique-code-validator.service';

describe('UniqueCodeValidatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UniqueCodeValidatorService = TestBed.get(UniqueCodeValidatorService);
    expect(service).toBeTruthy();
  });
});
