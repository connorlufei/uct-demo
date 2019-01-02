import { TestBed } from '@angular/core/testing';

import { AliensService } from './aliens.service';

describe('AliensService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AliensService = TestBed.get(AliensService);
    expect(service).toBeTruthy();
  });
});
