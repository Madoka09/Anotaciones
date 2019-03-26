import { TestBed } from '@angular/core/testing';

import { PasserService } from './passer.service';

describe('PasserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PasserService = TestBed.get(PasserService);
    expect(service).toBeTruthy();
  });
});
